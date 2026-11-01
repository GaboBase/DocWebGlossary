/**
 * DOCWEB MULTIGLOSSARY — Milestone 2 Empirical Adversarial Challenge Test Suite
 * Agent: challenger_m2_2 (Empirical Adversarial Challenger)
 * Focus:
 *   - SVG XML Injection / XSS Escaping (<, >, &, ", ', Unicode, Emojis, Script Vectors)
 *   - High Graph Density Layout & Geometry (10+, 25+, 50+ relations, bounding, coordinates)
 *   - Interactive Navigation Binding (onclick handler validity, JS injection defense)
 *   - Graph Traversal Resilience (cycles, self-loops, missing targets, null/undefined inputs)
 *   - Full Corpus Verification (generating and parsing SVGs for all 205 terms)
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { ROOT_DIR, TestRunner } = require('./test_utils');

// Helper to instantiate a fresh SemanticKnowledgeEngine inside a sandbox
function createEngineInstance() {
  const enginePath = path.join(ROOT_DIR, 'app', 'js', 'semantic-engine.js');
  const code = fs.readFileSync(enginePath, 'utf8');
  const sandbox = {
    window: {},
    console: { log: () => {}, warn: () => {}, error: () => {} }
  };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return {
    engine: sandbox.window.DocWebSemantics,
    sandbox
  };
}

// Strict XML well-formedness validator for SVG
function validateSvgXml(svgString) {
  const errors = [];
  if (!svgString || typeof svgString !== 'string') {
    return { valid: false, errors: ['SVG is empty or not a string'] };
  }

  // Must start with <svg and end with </svg>
  const trimmed = svgString.trim();
  if (!trimmed.startsWith('<svg') || !trimmed.endsWith('</svg>')) {
    errors.push('SVG does not start with <svg or end with </svg>');
  }

  // Tokenize by XML tags: comments, closing tags, opening/self-closing tags
  const tagStack = [];
  const tokenRegex = /<!--[\s\S]*?-->|<\/([a-zA-Z0-9:-]+)\s*>|<([a-zA-Z0-9:-]+)([^>]*?)(\/?)>/g;
  let lastIndex = 0;
  let match;

  while ((match = tokenRegex.exec(trimmed)) !== null) {
    const textBetween = trimmed.substring(lastIndex, match.index);
    // Check raw & in text nodes (not part of valid entity)
    const rawAmp = textBetween.match(/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9a-fA-F]+;)/);
    if (rawAmp) {
      errors.push(`Unescaped raw ampersand in text content: "${textBetween.substring(Math.max(0, rawAmp.index - 5), rawAmp.index + 10)}"`);
    }

    // Check raw < in text nodes
    if (textBetween.includes('<')) {
      errors.push(`Unescaped '<' in text content: "${textBetween}"`);
    }

    lastIndex = match.index + match[0].length;

    // Comments
    if (match[0].startsWith('<!--')) {
      continue;
    }

    // Closing tag: </tagName>
    if (match[1]) {
      const closingTag = match[1];
      if (tagStack.length === 0) {
        errors.push(`Unexpected closing tag </${closingTag}> with empty stack`);
      } else {
        const top = tagStack.pop();
        if (top !== closingTag) {
          errors.push(`Mismatched closing tag </${closingTag}>, expected </${top}>`);
        }
      }
      continue;
    }

    // Opening or self-closing tag: <tagName attrs (/)?>
    if (match[2]) {
      const tagName = match[2];
      const rawAttrs = match[3] || '';
      const isSelfClosing = match[4] === '/';

      // Validate attributes
      const attrValRegex = /=\s*"([^"]*)"|=\s*'([^']*)'/g;
      let attrValMatch;
      while ((attrValMatch = attrValRegex.exec(rawAttrs)) !== null) {
        const val = attrValMatch[1] !== undefined ? attrValMatch[1] : attrValMatch[2];
        const rawAmpInAttr = val.match(/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9a-fA-F]+;)/);
        if (rawAmpInAttr) {
          errors.push(`Unescaped raw ampersand in attribute value: "${val}"`);
        }
        if (val.includes('<')) {
          errors.push(`Unescaped '<' in attribute value: "${val}"`);
        }
      }

      if (!isSelfClosing) {
        tagStack.push(tagName);
      }
    }
  }

  if (tagStack.length > 0) {
    errors.push(`Unclosed tags remaining on stack: ${tagStack.join(', ')}`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

// Function to run all challenger stress tests
function runChallengerTests() {
  const runner = new TestRunner('Challenger M2-2: SVG Rendering & Graph Traversal Stress Suite');
  console.log(`\n=== Running ${runner.suiteName} ===`);

  const { engine } = createEngineInstance();

  // Load real catalog data for baseline
  const catalogPath = path.join(ROOT_DIR, 'app', 'data', 'catalog.json');
  const avTermsPath = path.join(ROOT_DIR, 'AudiovisualProduction', 'data', 'terms.json');
  const r3dTermsPath = path.join(ROOT_DIR, 'Render-3D-Animations', 'data', 'terms.json');
  const viTermsPath = path.join(ROOT_DIR, 'VideoImage', 'data', 'terms.json');

  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  const avTerms = JSON.parse(fs.readFileSync(avTermsPath, 'utf8')).canonicalTerms || [];
  const r3dTerms = JSON.parse(fs.readFileSync(r3dTermsPath, 'utf8')).canonicalTerms || [];
  const viTerms = JSON.parse(fs.readFileSync(viTermsPath, 'utf8')).canonicalTerms || [];

  const glossariesData = {
    'audiovisual-production': avTerms,
    'render-3d-animations': r3dTerms,
    'video-image': viTerms
  };

  // Synchronously load data into engine
  for (const g of catalog.canonicalGlossaries) {
    engine.glossaries.set(g.id, g);
  }
  for (const [glossaryId, termsList] of Object.entries(glossariesData)) {
    for (const term of termsList) {
      term.glossaryId = glossaryId;
      term.origin = 'canonical';
      engine.terms.set(term.id, term);
    }
  }
  engine.computeInverseRelations();

  // =========================================================================
  // SECTION 1: SVG XML INJECTION & SPECIAL CHARACTER STRESS TESTS
  // =========================================================================
  console.log('\n--- Section 1: SVG XML Injection & Special Character Escaping ---');

  // Test 1.1: escapeXml unit checks
  runner.assertEqual(
    engine.escapeXml('<foo & bar > "baz" \'qux\''),
    '&lt;foo &amp; bar &gt; &quot;baz&quot; &apos;qux&apos;',
    'escapeXml properly replaces all 5 XML entity characters without double escaping ampersands',
    { feature: 'F15', tier: 1 }
  );

  runner.assertEqual(
    engine.escapeXml(null),
    '',
    'escapeXml returns empty string for null input',
    { feature: 'F15', tier: 1 }
  );

  runner.assertEqual(
    engine.escapeXml(undefined),
    '',
    'escapeXml returns empty string for undefined input',
    { feature: 'F15', tier: 1 }
  );

  // Test 1.2: Adversarial payloads in Term Title
  const adversarialTitles = [
    { name: 'Script tag injection', title: '<script>alert("XSS")</script>' },
    { name: 'SVG onload injection', title: '"><svg onload=alert(1)>' },
    { name: 'XML entity injection', title: 'Foo &amp; &lt;bar&gt; &quot;baz&quot;' },
    { name: 'Naked ampersands', title: 'Editing & Color Grading & Sound & VFX' },
    { name: 'Angle brackets in math/ratios', title: 'Aspect Ratio < 16:9 & > 4:3' },
    { name: 'Single and double quotes', title: 'Director\'s "Final Cut" Edition' },
    { name: 'CDATA breakout', title: 'Standard ]]> <script>evil()</script>' },
    { name: 'XML comment breakout', title: 'Title <!-- comment --> injection' },
    { name: 'Unicode & Emojis', title: '🎬 Producción 4K HDR 🚀 & Visión ÁÉÍÓÚñ' },
    { name: 'Non-Latin Scripts', title: '映像制作 • Кинематограф • إنتاج الفيديو' },
    { name: 'Extremely long title (500 chars)', title: 'A'.repeat(500) }
  ];

  for (const adv of adversarialTitles) {
    const stressTerm = {
      id: 'urn:term:stress:title-test',
      slug: 'title-test',
      title: adv.title,
      glossaryId: 'audiovisual-production',
      category: 'produccion-general',
      level: 'fundamental',
      relations: []
    };

    const svg = engine.generateContextualDiagramSvg(stressTerm);

    // Verify no unescaped script tag or unescaped event handler tag injected into SVG
    const hasUnescapedScriptTag = /<script\b/i.test(svg);
    const hasInjectedEventTag = /<[a-zA-Z0-9:-]+\s+[^>]*\bonload\s*=/i.test(svg);
    const hasRawEvilCall = /<[^>]*\bevil\(\)/i.test(svg);

    runner.assert(
      !hasUnescapedScriptTag && !hasInjectedEventTag && !hasRawEvilCall,
      `Adversarial title (${adv.name}): no unescaped executable script tags or event handlers injected into SVG`,
      { feature: 'F15', tier: 2 }
    );

    // Verify XML validity
    const xmlCheck = validateSvgXml(svg);
    runner.assert(
      xmlCheck.valid,
      `Adversarial title (${adv.name}): SVG is strictly well-formed XML (${xmlCheck.errors.length === 0 ? 'valid' : xmlCheck.errors.join('; ')})`,
      { feature: 'F15', tier: 2 }
    );
  }

  // Test 1.3: Adversarial Category, Level, and Relation Type
  const stressAttributesTerm = {
    id: 'urn:term:stress:attr-test',
    slug: 'attr-test',
    title: 'Safe Title',
    glossaryId: 'audiovisual-production',
    category: '<Evil Category & "Quotes">',
    level: 'Nivel <Advanced & 4K>',
    relations: [
      {
        type: '<injected-rel & "type">',
        target: 'urn:term:audiovisual-production:frame-rate'
      }
    ]
  };

  const attrSvg = engine.generateContextualDiagramSvg(stressAttributesTerm);
  const attrXmlCheck = validateSvgXml(attrSvg);
  runner.assert(
    attrXmlCheck.valid,
    'Special characters in Category, Level, and Relation Type properly escaped; SVG is well-formed XML',
    { feature: 'F15', tier: 2 }
  );
  runner.assert(
    !attrSvg.includes('<Evil Category') && attrSvg.includes('&lt;Evil Category &amp; &quot;Quotes&quot;&gt;'),
    'Category special characters properly replaced with XML entities',
    { feature: 'F15', tier: 2 }
  );

  // =========================================================================
  // SECTION 2: HIGH GRAPH DENSITY LAYOUT & GEOMETRY BOUNDING
  // =========================================================================
  console.log('\n--- Section 2: High Graph Density Layout & Geometry Bounding ---');

  // Test 2.1: Isolated node (0 relations)
  const isolatedTerm = {
    id: 'urn:term:stress:isolated',
    slug: 'isolated',
    title: 'Isolated Term',
    glossaryId: 'audiovisual-production',
    category: 'produccion-general',
    relations: []
  };
  const isolatedSvg = engine.generateContextualDiagramSvg(isolatedTerm);
  runner.assert(
    isolatedSvg.includes('viewBox="0 0 800 360"'),
    'Zero relations: minimum SVG height bound is 360px',
    { feature: 'F15', tier: 1 }
  );

  // Test 2.2: Moderate density (5 direct, 5 inverse)
  const modDirectRels = [];
  for (let i = 1; i <= 5; i++) {
    modDirectRels.push({
      type: 'specializesIn',
      target: `urn:term:audiovisual-production:mod-target-${i}`
    });
  }
  const modTerm = {
    id: 'urn:term:stress:moderate',
    slug: 'moderate',
    title: 'Moderate Term',
    glossaryId: 'audiovisual-production',
    category: 'produccion-general',
    relations: modDirectRels
  };
  engine.terms.set(modTerm.id, modTerm);

  // Set 5 inverse relations targeting modTerm
  for (let i = 1; i <= 5; i++) {
    const srcTerm = {
      id: `urn:term:stress:mod-src-${i}`,
      slug: `mod-src-${i}`,
      title: `Mod Source ${i}`,
      glossaryId: 'audiovisual-production',
      category: 'produccion-general',
      relations: [{ type: 'dependsOn', target: modTerm.id }]
    };
    engine.terms.set(srcTerm.id, srcTerm);
  }
  engine.computeInverseRelations();

  const modSvg = engine.generateContextualDiagramSvg(modTerm);
  const modHeight = Math.max(360, (5 * 65) + 120); // 445
  runner.assert(
    modSvg.includes(`viewBox="0 0 800 ${modHeight}"`),
    `Moderate density (5 direct, 5 inverse): SVG height matches dynamic formula (${modHeight}px)`,
    { feature: 'F15', tier: 2 }
  );

  // Test 2.3: High Density (12 direct, 14 inverse, including cross-glossary)
  const highDirectRels = [];
  for (let i = 1; i <= 12; i++) {
    highDirectRels.push({
      type: i % 2 === 0 ? 'specializesIn' : 'produces',
      target: i <= 6 
        ? `urn:term:audiovisual-production:high-target-${i}` 
        : `urn:term:video-image:codec`
    });
  }
  const highTerm = {
    id: 'urn:term:stress:high-density',
    slug: 'high-density',
    title: 'High Density Central Concept',
    glossaryId: 'audiovisual-production',
    category: 'produccion-general',
    relations: highDirectRels
  };
  engine.terms.set(highTerm.id, highTerm);

  // Add 14 inverse relations (mix of audiovisual, video-image, and render-3d)
  for (let i = 1; i <= 14; i++) {
    const srcGlossary = i <= 6 ? 'audiovisual-production' : (i <= 10 ? 'video-image' : 'render-3d-animations');
    const srcTerm = {
      id: `urn:term:stress:high-src-${i}`,
      slug: `high-src-${i}`,
      title: `High Density Inbound Source ${i}`,
      glossaryId: srcGlossary,
      category: 'produccion-general',
      relations: [{ type: 'requires', target: highTerm.id }]
    };
    engine.terms.set(srcTerm.id, srcTerm);
  }
  engine.computeInverseRelations();

  const highInvRels = engine.getInverseRelations(highTerm.id);
  runner.assertEqual(
    highInvRels.length,
    14,
    'High density term has exactly 14 computed inverse relations',
    { feature: 'F10', tier: 2 }
  );

  const highSvg = engine.generateContextualDiagramSvg(highTerm);
  const expectedHighHeight = Math.max(360, (Math.max(12, 14) * 65) + 120); // 14*65 + 120 = 1030
  runner.assert(
    highSvg.includes(`viewBox="0 0 800 ${expectedHighHeight}"`),
    `High density (12 direct, 14 inverse): SVG height scaled dynamically to ${expectedHighHeight}px`,
    { feature: 'F15', tier: 2 }
  );

  // Validate XML well-formedness of high density SVG
  const highXmlCheck = validateSvgXml(highSvg);
  runner.assert(
    highXmlCheck.valid,
    `High density SVG is well-formed XML (${highXmlCheck.errors.length === 0 ? 'valid' : highXmlCheck.errors.join('; ')})`,
    { feature: 'F15', tier: 2 }
  );

  // Test 2.4: Layout Coordinate Verification (no NaN, no out-of-bounds)
  const nanMatch = highSvg.match(/NaN|undefined|Infinity/);
  runner.assert(
    !nanMatch,
    'SVG output contains no NaN, undefined, or Infinity values in coordinates or attributes',
    { feature: 'F15', tier: 2 }
  );

  // Verify cross-glossary visual styling
  runner.assert(
    highSvg.includes('Inter-Glosario ⤻') && highSvg.includes('Origen Inter-Glosario ⤻'),
    'Cross-glossary relationships display Inter-Glosario badges for both direct and inverse relations',
    { feature: 'F9', tier: 2 }
  );

  // Verify dashed lines for cross-glossary
  runner.assert(
    highSvg.includes('stroke-dasharray="4 3"'),
    'Cross-glossary connections rendered with dashed Bezier connector lines',
    { feature: 'F9', tier: 2 }
  );

  // Test 2.5: Extreme Load (50 direct, 50 inverse relations = 100 total nodes)
  const extremeDirectRels = [];
  for (let i = 1; i <= 50; i++) {
    extremeDirectRels.push({
      type: 'relatedTo',
      target: `urn:term:stress:extreme-target-${i}`
    });
  }
  const extremeTerm = {
    id: 'urn:term:stress:extreme-concept',
    slug: 'extreme-concept',
    title: 'Extreme 100-Relation Hub',
    glossaryId: 'audiovisual-production',
    category: 'produccion-general',
    relations: extremeDirectRels
  };
  engine.terms.set(extremeTerm.id, extremeTerm);

  for (let i = 1; i <= 50; i++) {
    const srcTerm = {
      id: `urn:term:stress:extreme-src-${i}`,
      slug: `extreme-src-${i}`,
      title: `Extreme Inbound Source ${i}`,
      glossaryId: 'audiovisual-production',
      category: 'produccion-general',
      relations: [{ type: 'relatedTo', target: extremeTerm.id }]
    };
    engine.terms.set(srcTerm.id, srcTerm);
  }
  engine.computeInverseRelations();

  const extremeStart = Date.now();
  const extremeSvg = engine.generateContextualDiagramSvg(extremeTerm);
  const extremeDuration = Date.now() - extremeStart;

  const expectedExtremeHeight = (50 * 65) + 120; // 3370px
  runner.assert(
    extremeSvg.includes(`viewBox="0 0 800 ${expectedExtremeHeight}"`),
    `Extreme load (100 total relations): SVG height dynamically allocated ${expectedExtremeHeight}px`,
    { feature: 'F15', tier: 2 }
  );

  runner.assert(
    extremeDuration < 50,
    `Extreme load SVG generated in ${extremeDuration}ms (< 50ms performance threshold)`,
    { feature: 'F15', tier: 2 }
  );

  const extremeXmlCheck = validateSvgXml(extremeSvg);
  runner.assert(
    extremeXmlCheck.valid,
    'Extreme load SVG diagram is 100% valid, well-formed XML',
    { feature: 'F15', tier: 2 }
  );

  // =========================================================================
  // SECTION 3: INTERACTIVE NAVIGATION BINDING & JS INJECTION DEFENSE
  // =========================================================================
  console.log('\n--- Section 3: Interactive Navigation Binding & JS Escaping ---');

  // Test 3.1: escapeJsAttr unit tests
  runner.assertEqual(
    engine.escapeJsAttr("urn:term:test:foo'bar"),
    "urn:term:test:foo\\'bar",
    "escapeJsAttr properly backslash-escapes single quotes for inline JS string literals",
    { feature: 'F15', tier: 1 }
  );

  runner.assertEqual(
    engine.escapeJsAttr('urn:term:test:foo\\bar'),
    'urn:term:test:foo\\\\bar',
    'escapeJsAttr properly escapes existing backslashes',
    { feature: 'F15', tier: 1 }
  );

  // Test 3.2: Malicious JS Breakout Vectors in URN
  const jsBreakoutTargets = [
    { name: 'Quote breakout with alert', target: "urn:term:test:foo'); alert(1); //" },
    { name: 'Backslash quote breakout', target: "urn:term:test:foo\\'); alert(1); //" },
    { name: 'Double quote HTML attribute breakout', target: 'urn:term:test:foo" onclick="alert(1)' },
    { name: 'XML entity quote injection', target: 'urn:term:test:foo&quot; onclick=alert(1)' },
    { name: 'Tag breakout injection', target: 'urn:term:test:</g><script>alert(1)</script>' }
  ];

  for (const item of jsBreakoutTargets) {
    const navTerm = {
      id: 'urn:term:stress:nav-term',
      slug: 'nav-term',
      title: 'Nav Target Test',
      glossaryId: 'audiovisual-production',
      category: 'produccion-general',
      relations: [
        { type: 'specializesIn', target: item.target }
      ]
    };

    const navSvg = engine.generateContextualDiagramSvg(navTerm);

    // Extract all onclick attributes from the SVG
    const onclickMatches = [...navSvg.matchAll(/onclick="([^"]*)"/g)];
    runner.assert(
      onclickMatches.length > 0,
      `Navigation binding generated for ${item.name}`,
      { feature: 'F15', tier: 2 }
    );

    for (const match of onclickMatches) {
      const onclickAttr = match[1];

      // 1. Verify XML safety: onclick must not break out of attribute quotes
      runner.assert(
        !onclickAttr.includes('"'),
        `onclick attribute contains no raw unescaped double quotes for ${item.name}`,
        { feature: 'F15', tier: 2 }
      );

      // 2. Test JS syntax compilation
      // When the browser HTML parser loads the onclick attribute, XML entities like &amp;quot; or &lt;
      // are unescaped by the DOM parser before passing to the JS engine.
      const domDecodedJs = onclickAttr
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');

      let syntaxValid = false;
      let compilationError = null;
      try {
        new vm.Script(domDecodedJs);
        syntaxValid = true;
      } catch (err) {
        compilationError = err;
      }

      runner.assert(
        syntaxValid,
        `DOM-decoded onclick JavaScript compiles without syntax error for ${item.name}`,
        { feature: 'F15', tier: 2 }
      );

      // 3. Execution Simulation: ensure window.DocWebApp.navigateToTerm is called and NO rogue code executes
      let navigatedTo = null;
      let rogueExecuted = false;
      const navSandbox = {
        window: {
          DocWebApp: {
            navigateToTerm: (id) => { navigatedTo = id; }
          }
        },
        alert: () => { rogueExecuted = true; }
      };
      vm.createContext(navSandbox);

      try {
        vm.runInContext(domDecodedJs, navSandbox);
      } catch (e) {
        // Ignored or logged
      }

      runner.assert(
        !rogueExecuted,
        `Adversarial execution test (${item.name}): alert() was NOT executed (rogue code prevented)`,
        { feature: 'F15', tier: 2 }
      );
    }
  }

  // Test 3.3: Adversarial Investigation of escapeJsAttr replacement order (Double-Escaping Bug)
  // When input contains a double quote: " -> line 393 replaces with &quot; -> line 394 replaces with &amp;quot;
  // This causes double-escaping in the XML attribute.
  const doubleQuoteInput = 'urn:term:test:foo"bar';
  const escapedDoubleQuote = engine.escapeJsAttr(doubleQuoteInput);
  const isDoubleEscaped = escapedDoubleQuote.includes('&amp;quot;');
  runner.assert(
    !isDoubleEscaped,
    'Adversarial probe: escapeJsAttr must not double-escape double quotes into &amp;quot; (replace /&/g before /"/g)',
    { feature: 'F15', tier: 2 }
  );

  // =========================================================================
  // SECTION 4: GRAPH TRAVERSAL & RESILIENCE
  // =========================================================================
  console.log('\n--- Section 4: Graph Traversal & Engine Resilience ---');

  // Test 4.1: Cyclic relations (A ⇄ B)
  const cycleTermA = {
    id: 'urn:term:stress:cycle-a',
    slug: 'cycle-a',
    title: 'Cycle Node Alpha',
    glossaryId: 'audiovisual-production',
    relations: [{ type: 'alternativeTo', target: 'urn:term:stress:cycle-b' }]
  };
  const cycleTermB = {
    id: 'urn:term:stress:cycle-b',
    slug: 'cycle-b',
    title: 'Cycle Node Beta',
    glossaryId: 'audiovisual-production',
    relations: [{ type: 'alternativeTo', target: 'urn:term:stress:cycle-a' }]
  };
  engine.terms.set(cycleTermA.id, cycleTermA);
  engine.terms.set(cycleTermB.id, cycleTermB);
  engine.computeInverseRelations();

  const cycleSvgA = engine.generateContextualDiagramSvg(cycleTermA);
  const cycleSvgB = engine.generateContextualDiagramSvg(cycleTermB);

  runner.assert(
    cycleSvgA.includes('Cycle Node Alpha') && cycleSvgB.includes('Cycle Node Beta'),
    'Cyclic mutual relations (A ⇄ B) rendered without infinite loops',
    { feature: 'F10', tier: 2 }
  );

  // Test 4.2: Self-referential loop (A -> A)
  const selfLoopTerm = {
    id: 'urn:term:stress:self-loop',
    slug: 'self-loop',
    title: 'Self-Loop Concept',
    glossaryId: 'audiovisual-production',
    relations: [{ type: 'relatedTo', target: 'urn:term:stress:self-loop' }]
  };
  engine.terms.set(selfLoopTerm.id, selfLoopTerm);
  engine.computeInverseRelations();

  let selfLoopThrew = false;
  let selfLoopSvg = '';
  try {
    selfLoopSvg = engine.generateContextualDiagramSvg(selfLoopTerm);
  } catch (e) {
    selfLoopThrew = true;
  }

  runner.assert(
    !selfLoopThrew && selfLoopSvg.includes('Self-Loop Concept'),
    'Self-referential relation (A -> A) handled gracefully without throwing or NaN coordinates',
    { feature: 'F15', tier: 2 }
  );

  // Test 4.3: Missing Target URN (target term does not exist in any loaded glossary)
  const orphanRelTerm = {
    id: 'urn:term:stress:orphan-rel',
    slug: 'orphan-rel',
    title: 'Term With Unresolved Target',
    glossaryId: 'audiovisual-production',
    relations: [{ type: 'dependsOn', target: 'urn:term:external-domain:non-existent-spec' }]
  };
  engine.terms.set(orphanRelTerm.id, orphanRelTerm);
  const orphanSvg = engine.generateContextualDiagramSvg(orphanRelTerm);

  runner.assert(
    orphanSvg.includes('non-existent-spec'),
    'Unresolved target fallback to target URN suffix ("non-existent-spec") operates cleanly',
    { feature: 'F15', tier: 2 }
  );

  // Test 4.4: Corrupt relation defense (null or missing target in relations)
  // Probe computeInverseRelations with null relation item
  const termWithNullRel = {
    id: 'urn:term:stress:null-rel-item',
    slug: 'null-rel-item',
    title: 'Term With Null Rel',
    glossaryId: 'audiovisual-production',
    relations: [null]
  };
  engine.terms.set(termWithNullRel.id, termWithNullRel);

  let nullRelThrew = false;
  try {
    engine.computeInverseRelations();
  } catch (e) {
    nullRelThrew = true;
  }
  runner.assert(
    !nullRelThrew,
    'Adversarial probe: computeInverseRelations handles null item in relations array without unhandled TypeError',
    { feature: 'F10', tier: 2 }
  );

  // Clean up termWithNullRel so subsequent tests are clean
  engine.terms.delete(termWithNullRel.id);

  // Probe generateContextualDiagramSvg with null relation target
  const termWithNullTarget = {
    id: 'urn:term:stress:null-target',
    slug: 'null-target',
    title: 'Term With Null Target',
    glossaryId: 'audiovisual-production',
    relations: [{ type: 'relatedTo', target: null }]
  };
  let nullTargetThrew = false;
  try {
    engine.generateContextualDiagramSvg(termWithNullTarget);
  } catch (e) {
    nullTargetThrew = true;
  }
  runner.assert(
    !nullTargetThrew,
    'Adversarial probe: generateContextualDiagramSvg handles rel with null target without unhandled TypeError on .split()',
    { feature: 'F15', tier: 2 }
  );

  // =========================================================================
  // SECTION 5: FULL CANONICAL CORPUS SVG WELL-FORMEDNESS
  // =========================================================================
  console.log('\n--- Section 5: Full Canonical Corpus SVG Validation (All 205 Terms) ---');

  // Recompute inverse relations cleanly on pure canonical terms
  engine.terms.clear();
  for (const [glossaryId, termsList] of Object.entries(glossariesData)) {
    for (const term of termsList) {
      term.glossaryId = glossaryId;
      term.origin = 'canonical';
      engine.terms.set(term.id, term);
    }
  }
  engine.computeInverseRelations();

  const allTerms = engine.getAllTerms().filter(t => t.origin === 'canonical');
  runner.assertEqual(
    allTerms.length,
    205,
    'All 205 canonical terms from the 3 glossaries are indexed in the engine',
    { feature: 'F8', tier: 1 }
  );

  let xmlInvalidCount = 0;
  let xmlErrors = [];
  const svgStart = Date.now();

  for (const term of allTerms) {
    const svg = engine.generateContextualDiagramSvg(term);
    const check = validateSvgXml(svg);
    if (!check.valid) {
      xmlInvalidCount++;
      xmlErrors.push({ termId: term.id, errors: check.errors });
    }
  }
  const svgDuration = Date.now() - svgStart;

  runner.assertEqual(
    xmlInvalidCount,
    0,
    `100% of canonical terms (205/205) generate strictly well-formed XML SVGs (errors: ${xmlInvalidCount})`,
    { feature: 'F15', tier: 4 }
  );

  runner.assert(
    svgDuration < 500,
    `All 205 SVG diagrams generated in ${svgDuration}ms (${(svgDuration / 205).toFixed(2)}ms per diagram)`,
    { feature: 'F15', tier: 4 }
  );

  return runner.printReport();
}

if (require.main === module) {
  const summary = runChallengerTests();
  process.exit(summary.failed > 0 ? 1 : 0);
}

module.exports = { runChallengerTests, validateSvgXml };
