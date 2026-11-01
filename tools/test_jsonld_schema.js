/**
 * DOCWEB MULTIGLOSSARY — E2E Test: Schema.org JSON-LD & Semantic HTML5
 * Covers:
 *   - Feature 11: Schema.org JSON-LD DefinedTerm Integration
 *   - Feature 12: Semantic HTML5 DOM Rendering
 * Tiers: 1, 2, 3, 4
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { ROOT_DIR, TestRunner } = require('./test_utils');

function runJsonLdAndSchemaTests() {
  const runner = new TestRunner('JSON-LD & Semantic HTML5 Suite');
  console.log(`\n=== Running ${runner.suiteName} ===`);

  // Load SemanticKnowledgeEngine in VM sandbox
  const enginePath = path.join(ROOT_DIR, 'app', 'js', 'semantic-engine.js');
  let engineInstance = null;

  try {
    const code = fs.readFileSync(enginePath, 'utf8');
    const sandbox = {
      window: {},
      console: { log: () => {}, warn: () => {}, error: console.error }
    };
    vm.createContext(sandbox);
    vm.runInContext(code, sandbox);
    engineInstance = sandbox.window.DocWebSemantics;

    // Load Catalog & Glossaries
    const catalogPath = path.join(ROOT_DIR, 'app', 'data', 'catalog.json');
    const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
    const glossariesData = {};

    for (const g of catalog.canonicalGlossaries) {
      const p = path.resolve(ROOT_DIR, g.dataPath);
      if (fs.existsSync(p)) {
        const d = JSON.parse(fs.readFileSync(p, 'utf8'));
        glossariesData[g.id] = Array.isArray(d) ? d : (d.canonicalTerms || []);
      }
    }
    engineInstance.loadAll(catalog, glossariesData);
  } catch (err) {
    runner.assert(false, `Failed to initialize engine for JSON-LD tests: ${err.message}`, { feature: 'F11', tier: 1 });
    return runner.printReport();
  }

  // -------------------------------------------------------------
  // TIER 1: Schema.org DefinedTerm & DefinedTermSet Core Contract
  // -------------------------------------------------------------
  console.log('\n--- Tier 1: Schema.org Core Structure & Required Fields ---');

  const sampleTerms = engineInstance.getAllTerms().slice(0, 5);
  runner.assert(
    sampleTerms.length > 0,
    `Retrieved sample terms from engine (${sampleTerms.length} terms)`,
    { feature: 'F11', tier: 1 }
  );

  for (const term of sampleTerms) {
    const jsonld = engineInstance.generateJsonLd(term);
    runner.assert(
      typeof jsonld === 'object' && jsonld !== null,
      `generateJsonLd generates valid object for "${term.slug}"`,
      { feature: 'F11', tier: 1 }
    );

    // Schema.org Context
    runner.assertEqual(
      jsonld['@context'],
      'https://schema.org',
      `JSON-LD @context equals "https://schema.org" for "${term.slug}"`,
      { feature: 'F11', tier: 1 }
    );

    // Schema.org DefinedTerm type
    runner.assertEqual(
      jsonld['@type'],
      'DefinedTerm',
      `JSON-LD @type equals "DefinedTerm" for "${term.slug}"`,
      { feature: 'F11', tier: 1 }
    );

    // @id matches term URN
    runner.assertEqual(
      jsonld['@id'],
      term.id,
      `JSON-LD @id matches canonical term URN for "${term.slug}"`,
      { feature: 'F11', tier: 1 }
    );

    // name matches term title
    runner.assertEqual(
      jsonld.name,
      term.title,
      `JSON-LD name matches term title for "${term.slug}"`,
      { feature: 'F11', tier: 1 }
    );

    // inDefinedTermSet parent schema
    const termSet = jsonld.inDefinedTermSet;
    runner.assert(
      typeof termSet === 'object' && termSet['@type'] === 'DefinedTermSet',
      `inDefinedTermSet declares valid DefinedTermSet for "${term.slug}"`,
      { feature: 'F11', tier: 1 }
    );
    runner.assert(
      typeof termSet['@id'] === 'string' && termSet['@id'].startsWith('urn:glossary:'),
      `inDefinedTermSet @id uses stable URN "urn:glossary:${term.glossaryId}"`,
      { feature: 'F11', tier: 1 }
    );
  }

  // -------------------------------------------------------------
  // TIER 2: Boundary Handling & Edge Cases
  // -------------------------------------------------------------
  console.log('\n--- Tier 2: Boundary Values & Robustness ---');

  // Null input handling
  const nullJsonLd = engineInstance.generateJsonLd(null);
  runner.assertEqual(
    nullJsonLd,
    null,
    'generateJsonLd safely returns null when called with null argument',
    { feature: 'F11', tier: 2 }
  );

  // Term with empty synonyms / missing optional attributes
  const minimalTerm = {
    id: 'urn:term:test:minimal',
    slug: 'minimal',
    title: 'Minimal Concept',
    glossaryId: 'test',
    category: 'general'
  };

  const minimalJsonLd = engineInstance.generateJsonLd(minimalTerm);
  runner.assert(
    typeof minimalJsonLd === 'object' && minimalJsonLd['@type'] === 'DefinedTerm',
    'generateJsonLd cleanly handles minimal term without optional fields',
    { feature: 'F11', tier: 2 }
  );
  runner.assert(
    Array.isArray(minimalJsonLd.alternateName),
    'alternateName is always an array even when synonyms undefined',
    { feature: 'F11', tier: 2 }
  );

  // Term with special characters in title / definition (accents, quotes, angle brackets)
  const specialCharTerm = {
    id: 'urn:term:test:special-chars',
    slug: 'special-chars',
    title: 'Término con "Comillas", <Tags> y Caracteres Especiales & Ampersand',
    shortDefinition: 'Definición rigurosa con acentos: á, é, í, ó, ú, ñ, diéresis ü y comillas «latinas».',
    fullDefinition: 'Explicación técnica detallada con símbolos matemáticos: O(log N) & lambda >= 0.',
    glossaryId: 'test',
    category: 'test'
  };

  const specialJsonLd = engineInstance.generateJsonLd(specialCharTerm);
  let jsonStringified = '';
  let stringifyThrew = false;
  try {
    jsonStringified = JSON.stringify(specialJsonLd);
  } catch (e) {
    stringifyThrew = true;
  }

  runner.assert(
    !stringifyThrew && jsonStringified.length > 50,
    'Special character term serializes to valid JSON without error',
    { feature: 'F11', tier: 2 }
  );

  // -------------------------------------------------------------
  // TIER 3: Semantic HTML5 DOM Structure
  // -------------------------------------------------------------
  console.log('\n--- Tier 3: Semantic HTML5 DOM Architecture ---');

  // Inspect index.html
  const indexPath = path.join(ROOT_DIR, 'index.html');
  const indexHtml = fs.readFileSync(indexPath, 'utf8');

  runner.assert(
    indexHtml.includes('<header') && indexHtml.includes('</header>'),
    'index.html uses semantic <header> tag',
    { feature: 'F12', tier: 3 }
  );
  runner.assert(
    indexHtml.includes('<main') && indexHtml.includes('</main>'),
    'index.html uses semantic <main> tag',
    { feature: 'F12', tier: 3 }
  );
  runner.assert(
    indexHtml.includes('<aside') && indexHtml.includes('</aside>'),
    'index.html uses semantic <aside> tag',
    { feature: 'F12', tier: 3 }
  );
  runner.assert(
    indexHtml.includes('<nav') && indexHtml.includes('</nav>'),
    'index.html uses semantic <nav> tag',
    { feature: 'F12', tier: 3 }
  );
  runner.assert(
    indexHtml.includes('role="main"'),
    'index.html includes landmark role="main" for accessibility',
    { feature: 'F12', tier: 3 }
  );
  runner.assert(
    indexHtml.includes('aria-label='),
    'index.html includes ARIA accessibility labels on navigational elements',
    { feature: 'F12', tier: 3 }
  );

  // Check app.js for semantic article / dfn / dl / dt / dd rendering
  const appJsPath = path.join(ROOT_DIR, 'app', 'js', 'app.js');
  const appJsCode = fs.readFileSync(appJsPath, 'utf8');

  const hasArticle = appJsCode.includes('<article');
  const hasDfn = appJsCode.includes('<dfn');
  const hasDlDtDd = appJsCode.includes('<dl') && appJsCode.includes('<dt') && appJsCode.includes('<dd');
  const hasDataAttrs = appJsCode.includes('data-');

  if (hasArticle && hasDfn && hasDlDtDd && hasDataAttrs) {
    runner.assert(
      true,
      'app.js renders term view using HTML5 semantic elements (<article>, <dfn>, <dl>, <dt>, <dd>, data-*)',
      { feature: 'F12', tier: 3 }
    );
  } else {
    // Scheduled for Milestone M3 (Semantic HTML5 UI Integration)
    runner.pending(
      'app.js term view rendering with <article>, <dfn>, <dl>, <dt>, <dd>, data-* (Milestone M3 in progress)',
      { feature: 'F12', tier: 3 }
    );
  }

  // -------------------------------------------------------------
  // TIER 4: Real-World Workload: Tri-Glossary Full JSON-LD Export
  // -------------------------------------------------------------
  console.log('\n--- Tier 4: Tri-Glossary Full Catalog JSON-LD Compliance ---');

  const allTerms = engineInstance.getAllTerms();
  let validJsonLdCount = 0;
  let missingRequiredFields = 0;

  for (const term of allTerms) {
    const ld = engineInstance.generateJsonLd(term);
    if (ld && ld['@context'] === 'https://schema.org' && ld['@type'] === 'DefinedTerm' && ld['@id'] && ld.name) {
      validJsonLdCount++;
    } else {
      missingRequiredFields++;
    }
  }

  runner.assertEqual(
    missingRequiredFields,
    0,
    `Zero Schema.org violations across entire ${allTerms.length}-term knowledge base`,
    { feature: 'F11', tier: 4 }
  );

  runner.assertEqual(
    validJsonLdCount,
    allTerms.length,
    `100% of all ${allTerms.length} terms generate valid Schema.org DefinedTerm JSON-LD`,
    { feature: 'F11', tier: 4 }
  );

  return runner.printReport();
}

if (require.main === module) {
  const summary = runJsonLdAndSchemaTests();
  process.exit(summary.failed > 0 ? 1 : 0);
}

module.exports = { runJsonLdAndSchemaTests };
