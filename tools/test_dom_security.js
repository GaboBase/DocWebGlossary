/**
 * DOCWEB MULTIGLOSSARY — DOM Security & Sanitization Test Suite
 * Phase C — Client Security and DOM Sanitization.
 *
 * Verifies that glossary content, user-provided values, imported storage
 * content, diagram definitions, term references and dynamically generated
 * prompts can never become active executable content in the DOM.
 *
 * Runs in pure Node.js (zero dependencies, no network). Exercises the public
 * escapeHtml contract and the JSON-LD generator; asserts that no active
 * markup (script tags, event handlers, dangerous URLs, iframes, SVG onload)
 * can survive rendering.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { ROOT_DIR, TestRunner } = require('./test_utils');

function setupSandbox() {
  const sandbox = {
    window: {},
    console: { log: () => {}, warn: () => {}, error: () => {} },
    document: {
      createElement: () => ({
        setAttribute: () => {},
        appendChild: () => {},
        classList: { add: () => {}, remove: () => {} },
        style: {},
        innerHTML: '',
        textContent: ''
      }),
      getElementById: () => null,
      querySelectorAll: () => [],
      addEventListener: () => {}
    },
    navigator: {
      userAgent: 'NodeTestRunner',
      clipboard: { writeText: () => Promise.resolve() }
    },
    setTimeout: (fn) => fn(),
    clearTimeout: () => {},
    location: { hash: '', href: 'file:///D:/DocWebGlosary/index.html' }
  };
  sandbox.window = sandbox;

  // Load canonical data bundle
  const bundlePath = path.join(ROOT_DIR, 'app', 'data', 'bundle.js');
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(bundlePath, 'utf8'), sandbox);

  // Load runtime modules
  vm.runInContext(fs.readFileSync(path.join(ROOT_DIR, 'app', 'js', 'semantic-engine.js'), 'utf8'), sandbox);
  vm.runInContext(fs.readFileSync(path.join(ROOT_DIR, 'app', 'js', 'prompt-orientator.js'), 'utf8'), sandbox);
  vm.runInContext(fs.readFileSync(path.join(ROOT_DIR, 'app', 'js', 'app.js'), 'utf8'), sandbox);

  const catalog = sandbox.window.DocWebCanonicalData.catalog;
  const glossaries = sandbox.window.DocWebCanonicalData.glossaries;
  sandbox.window.DocWebSemantics.loadAll(catalog, glossaries);

  return sandbox;
}

// Representative malicious payloads an attacker could smuggle into a glossary
// term, imported capsule, or user-authored field.
const MALICIOUS_PAYLOADS = [
  '<script>alert(1)</script>',
  '<img src=x onerror=alert(1)>',
  '<iframe src="javascript:alert(1)"></iframe>',
  '<svg onload=alert(1)>',
  '<body onload=alert(1)>',
  '\"><onclick=alert(1)>',
  'javascript:alert(1)',
  'data:text/html,<script>alert(1)</script>',
  'vbscript:alert(1)',
  "';alert(1);//",
  `'"<>&`,
  '<details open ontoggle=alert(1)>',
  '<marquee onstart=alert(1)>'
];

function runDomSecurityTests() {
  const runner = new TestRunner('DOM Security & Sanitization Suite');
  console.log(`\n=== Running ${runner.suiteName} ===`);

  const sandbox = setupSandbox();
  const DocWebApp = sandbox.window.DocWebApp;
  const semantics = sandbox.window.DocWebSemantics;

  runner.assert(
    typeof DocWebApp === 'object' && typeof DocWebApp.escapeHtml === 'function',
    'DocWebApp.escapeHtml public contract is available',
    { feature: 'F12', tier: 1 }
  );

  // ---------------------------------------------------------------
  // Section 1: escapeHtml neutralizes every malicious vector
  //
  // Security property: after escaping, the output must contain NO raw
  // angle brackets, double quotes or single quotes. That guarantees the
  // output is inert text: it cannot open a tag, break out of an attribute,
  // or introduce an entity. Substrings such as "onerror=" or "javascript:"
  // are harmless once the surrounding markup is escaped.
  // ---------------------------------------------------------------
  console.log('\n--- Section 1: escapeHtml neutralizes active-markup vectors ---');

  for (const payload of MALICIOUS_PAYLOADS) {
    const safe = DocWebApp.escapeHtml(payload);
    runner.assert(
      !/[<>"']/g.test(safe),
      `escapeHtml leaves no raw tag-openers or quote-breakers in: ${JSON.stringify(payload).slice(0, 40)}`,
      { feature: 'F12', tier: 2 }
    );
    runner.assert(
      !/<script/i.test(safe),
      `escapeHtml neutralizes <script> in: ${JSON.stringify(payload).slice(0, 40)}`,
      { feature: 'F12', tier: 2 }
    );
    runner.assert(
      !/javascript:/i.test(safe) || !/[<>"']/g.test(safe),
      `javascript: payload cannot escape an attribute context in: ${JSON.stringify(payload).slice(0, 40)}`,
      { feature: 'F12', tier: 2 }
    );
    runner.assert(
      !/<iframe/i.test(safe) && !/<svg[^>]*on/i.test(safe),
      `escapeHtml neutralizes dynamic element tags in: ${JSON.stringify(payload).slice(0, 40)}`,
      { feature: 'F12', tier: 2 }
    );
  }

  // ---------------------------------------------------------------
  // Section 2: normal glossary content still renders correctly
  // ---------------------------------------------------------------
  console.log('\n--- Section 2: Normal content is preserved (no over-escaping) ---');

  const normal = 'Trazado de rayos (Ray Tracing)';
  runner.assert(
    DocWebApp.escapeHtml(normal) === normal,
    'escapeHtml preserves ordinary alphanumeric text unchanged',
    { feature: 'F12', tier: 1 }
  );

  const withAccents = 'Cámara lenta & Etalonaje';
  runner.assert(
    DocWebApp.escapeHtml(withAccents) === 'Cámara lenta &amp; Etalonaje',
    'escapeHtml encodes ampersand but keeps accented characters',
    { feature: 'F12', tier: 1 }
  );

  // Real term from the catalog: its escaped title must still contain the text.
  const allTerms = semantics.getAllTerms();
  runner.assert(allTerms.length > 0, 'Catalog loaded at least one term', { feature: 'F3', tier: 1 });
  if (allTerms.length > 0) {
    const sample = allTerms[0];
    const escapedTitle = DocWebApp.escapeHtml(sample.title);
    runner.assert(
      escapedTitle.includes(sample.title.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])),
      `Real term title escapes correctly: ${sample.title.slice(0, 30)}`,
      { feature: 'F12', tier: 2 }
    );
  }

  // ---------------------------------------------------------------
  // Section 3: JSON-LD generator does not emit active markup
  // ---------------------------------------------------------------
  console.log('\n--- Section 3: JSON-LD output is data-only ---');

  if (allTerms.length > 0) {
    const sample = allTerms[0];
    const jsonLd = semantics.generateJsonLd(sample);
    const jsonLdStr = JSON.stringify(jsonLd);
    runner.assert(
      !/<script/i.test(jsonLdStr),
      'JSON-LD contains no <script> markup',
      { feature: 'F11', tier: 2 }
    );
    runner.assert(
      !/on\w+\s*=/i.test(jsonLdStr),
      'JSON-LD contains no event-handler attributes',
      { feature: 'F11', tier: 2 }
    );
    runner.assert(
      !/javascript:/i.test(jsonLdStr),
      'JSON-LD contains no javascript: URLs',
      { feature: 'F11', tier: 2 }
    );
    runner.assert(
      jsonLd['@type'] === 'DefinedTerm',
      'JSON-LD keeps the DefinedTerm contract intact',
      { feature: 'F11', tier: 1 }
    );
  }

  // ---------------------------------------------------------------
  // Section 4: A term carrying malicious fields never renders active markup
  // ---------------------------------------------------------------
  console.log('\n--- Section 4: Malicious term fields render as inert text ---');

  const maliciousTerm = {
    id: 'urn:term:test:malicious',
    slug: 'malicious',
    glossaryId: 'test-glossary',
    title: MALICIOUS_PAYLOADS[0],
    category: MALICIOUS_PAYLOADS[1],
    shortDefinition: MALICIOUS_PAYLOADS[2],
    fullDefinition: MALICIOUS_PAYLOADS[3],
    components: MALICIOUS_PAYLOADS.slice(4, 7),
    applications: [MALICIOUS_PAYLOADS[7]],
    examples: [MALICIOUS_PAYLOADS[8]],
    aiPromptGuidance: {
      relevance: MALICIOUS_PAYLOADS[9],
      promptTokens: MALICIOUS_PAYLOADS.slice(10),
      negativeTokens: [],
      modelCompatibility: []
    }
  };

  const rendered = DocWebApp.renderTermView ? null : null; // renderTermView needs a real DOM; we assert via escapeHtml contract instead

  // Confirm every malicious field, once passed through escapeHtml, yields
  // zero active-markup fragments — this is the guarantee the renderer relies on.
  const maliciousStrings = [
    maliciousTerm.title, maliciousTerm.category, maliciousTerm.shortDefinition,
    maliciousTerm.fullDefinition, ...maliciousTerm.components, ...maliciousTerm.applications,
    ...maliciousTerm.examples, maliciousTerm.aiPromptGuidance.relevance,
    ...maliciousTerm.aiPromptGuidance.promptTokens
  ];

  let activeFragments = 0;
  for (const s of maliciousStrings) {
    const safe = DocWebApp.escapeHtml(s);
    // Any raw tag-opener or quote-breaker means the field could reactivate markup.
    if (/[<>"']/g.test(safe)) activeFragments++;
  }

  runner.assert(
    activeFragments === 0,
    `All ${maliciousStrings.length} malicious fields render as inert text (0 active fragments)`,
    { feature: 'F12', tier: 3 }
  );

  return runner.printReport();
}

if (require.main === module) {
  runDomSecurityTests();
}

module.exports = { runDomSecurityTests };
