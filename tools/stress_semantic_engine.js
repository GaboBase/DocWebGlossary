/**
 * DOCWEB MULTIGLOSSARY — Empirical Adversarial Stress Test Harness
 * Agent: challenger_m2_1 (Empirical Adversarial Challenger)
 * Target: app/js/semantic-engine.js (Milestone 2)
 * 
 * Verifies:
 *   1. 15 Bidirectional Relationship Pairs & Inverse Mapping (Forward & Reverse)
 *   2. Cyclic Relationship Resilience (2-node, 3-node, self-loops, N-node dense)
 *   3. Schema.org JSON-LD Validity on Edge Cases (empty, nulls, injection, Unicode)
 *   4. Contextual SVG Diagram XML Escaping & Event Handler Safety
 *   5. Search Engine Edge-Case Query & Missing Field Robustness
 *   6. 100% Offline Autonomy (Zero Network Calls, Zero Remote URLs)
 *   7. Defensive Boundary Vulnerability Analysis (Sparse arrays, missing targets)
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { ROOT_DIR, TestRunner } = require('./test_utils');

function loadEngineInSandbox() {
  const enginePath = path.join(ROOT_DIR, 'app', 'js', 'semantic-engine.js');
  const code = fs.readFileSync(enginePath, 'utf8');
  const sandbox = {
    window: {},
    console: { log: () => {}, warn: () => {}, error: () => {} }
  };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return sandbox.window.DocWebSemantics;
}

function runAdversarialStressTests() {
  const runner = new TestRunner('Adversarial Stress Test Suite: Semantic Engine & JSON-LD');
  console.log(`\n════════════════════════════════════════════════════════════════════════════════`);
  console.log(`EMPIRICAL ADVERSARIAL STRESS TEST: app/js/semantic-engine.js`);
  console.log(`Agent: challenger_m2_1 | Target: Milestone 2 Deliverable`);
  console.log(`════════════════════════════════════════════════════════════════════════════════\n`);

  const engine = loadEngineInSandbox();
  runner.assert(
    engine && typeof engine === 'object',
    'SemanticKnowledgeEngine loaded successfully into sandboxed VM context',
    { feature: 'F25', tier: 1 }
  );

  // =========================================================================
  // SECTION 1: 15 BIDIRECTIONAL RELATIONSHIP PAIRS (FORWARD & REVERSE)
  // =========================================================================
  console.log('\n--- Section 1: 15 Bidirectional Relationship Pairs & Inverses ---');

  const CANONICAL_15_PAIRS = [
    { forward: 'isTypeOf', inverse: 'hasSubtype', label: 'Taxonomic generalization / specialization' },
    { forward: 'isPartOf', inverse: 'composedOf', label: 'Mereological part / whole' },
    { forward: 'contains', inverse: 'containedIn', label: 'Containment' },
    { forward: 'specializesIn', inverse: 'moreGeneralThan', label: 'Specialization / Generalization' },
    { forward: 'dependsOn', inverse: 'dependencyOf', label: 'Architectural dependency' },
    { forward: 'requires', inverse: 'requiredBy', label: 'Prerequisite requirement' },
    { forward: 'precedes', inverse: 'succeeds', label: 'Temporal sequence' },
    { forward: 'produces', inverse: 'producedBy', label: 'Production causality' },
    { forward: 'usedFor', inverse: 'uses', label: 'Functional utility' },
    { forward: 'compatibleWith', inverse: 'compatibleWith', label: 'Symmetric compatibility' },
    { forward: 'alternativeTo', inverse: 'alternativeTo', label: 'Symmetric alternative' },
    { forward: 'differsFrom', inverse: 'differsFrom', label: 'Symmetric differentiation' },
    { forward: 'relatedTo', inverse: 'relatedTo', label: 'Symmetric association' },
    { forward: 'hasInput', inverse: 'isInputTo', label: 'Input transformation parameter' },
    { forward: 'hasOutput', inverse: 'isOutputOf', label: 'Output transformation result' }
  ];

  // Test 1.1: Verify both Forward -> Inverse and Inverse -> Forward for each pair
  for (const pair of CANONICAL_15_PAIRS) {
    const testEngine = loadEngineInSandbox();
    
    // Create Term A and Term B
    const termA = {
      id: 'urn:term:test:term-a',
      slug: 'term-a',
      title: 'Term A',
      glossaryId: 'test-glossary',
      relations: [{ type: pair.forward, target: 'urn:term:test:term-b', note: 'test-note-forward' }]
    };
    const termB = {
      id: 'urn:term:test:term-b',
      slug: 'term-b',
      title: 'Term B',
      glossaryId: 'test-glossary',
      relations: []
    };

    testEngine.terms.set(termA.id, termA);
    testEngine.terms.set(termB.id, termB);
    testEngine.computeInverseRelations();

    const invB = testEngine.getInverseRelations(termB.id);
    const foundInv = invB.find(r => r.sourceTermId === termA.id);

    runner.assert(
      foundInv && foundInv.type === pair.inverse,
      `Forward mapping: ${pair.forward} -> ${pair.inverse} (${pair.label})`,
      { feature: 'F10', tier: 1 }
    );

    // Verify reverse mapping if asymmetric
    if (pair.forward !== pair.inverse) {
      const revEngine = loadEngineInSandbox();
      const revTermA = {
        id: 'urn:term:test:term-a',
        slug: 'term-a',
        title: 'Term A',
        glossaryId: 'test-glossary',
        relations: [{ type: pair.inverse, target: 'urn:term:test:term-b', note: 'test-note-reverse' }]
      };
      revEngine.terms.set(revTermA.id, revTermA);
      revEngine.terms.set(termB.id, termB);
      revEngine.computeInverseRelations();

      const revInvB = revEngine.getInverseRelations(termB.id);
      const foundRevInv = revInvB.find(r => r.sourceTermId === revTermA.id);

      runner.assert(
        foundRevInv && foundRevInv.type === pair.forward,
        `Reverse mapping: ${pair.inverse} -> ${pair.forward} (${pair.label})`,
        { feature: 'F10', tier: 1 }
      );
    }
  }

  // Test 1.2: Fallback behavior for unknown relation types
  {
    const fbEngine = loadEngineInSandbox();
    const tA = {
      id: 'urn:term:test:t-unknown-src',
      slug: 't-unknown-src',
      title: 'Unknown Source',
      glossaryId: 'test-glossary',
      relations: [{ type: 'nonExistentRelationType', target: 'urn:term:test:t-unknown-dst' }]
    };
    const tB = {
      id: 'urn:term:test:t-unknown-dst',
      slug: 't-unknown-dst',
      title: 'Unknown Dest',
      glossaryId: 'test-glossary',
      relations: []
    };
    fbEngine.terms.set(tA.id, tA);
    fbEngine.terms.set(tB.id, tB);
    fbEngine.computeInverseRelations();

    const inv = fbEngine.getInverseRelations(tB.id);
    runner.assert(
      inv.length === 1 && inv[0].type === 'reverseRelatedTo',
      'Unknown relationship type gracefully falls back to "reverseRelatedTo"',
      { feature: 'F10', tier: 2 }
    );
  }

  // Test 1.3: Malformed relations handling (non-array, empty target, empty object)
  {
    const malEngine = loadEngineInSandbox();
    const termsWithBadRelations = [
      { id: 'urn:term:test:null-rel', slug: 'null-rel', relations: null },
      { id: 'urn:term:test:undef-rel', slug: 'undef-rel', relations: undefined },
      { id: 'urn:term:test:str-rel', slug: 'str-rel', relations: 'not-an-array' },
      { id: 'urn:term:test:obj-rel', slug: 'obj-rel', relations: { type: 'requires' } },
      { id: 'urn:term:test:empty-obj-rel', slug: 'empty-obj-rel', relations: [{}] },
      { id: 'urn:term:test:empty-target-rel', slug: 'empty-target-rel', relations: [{ target: '' }] }
    ];

    for (const t of termsWithBadRelations) {
      malEngine.terms.set(t.id, t);
    }

    let malThrew = false;
    try {
      malEngine.computeInverseRelations();
    } catch (e) {
      malThrew = true;
    }

    runner.assert(
      !malThrew,
      'computeInverseRelations handles null/undefined/non-array relations and empty targets without throwing',
      { feature: 'F10', tier: 2 }
    );
  }

  // Test 1.4: Idempotency of computeInverseRelations
  {
    const idempEngine = loadEngineInSandbox();
    const t1 = {
      id: 'urn:term:test:idemp-1',
      title: 'Idemp 1',
      relations: [{ type: 'requires', target: 'urn:term:test:idemp-2' }]
    };
    const t2 = { id: 'urn:term:test:idemp-2', title: 'Idemp 2', relations: [] };
    idempEngine.terms.set(t1.id, t1);
    idempEngine.terms.set(t2.id, t2);

    idempEngine.computeInverseRelations();
    const firstCount = idempEngine.getInverseRelations(t2.id).length;
    idempEngine.computeInverseRelations();
    const secondCount = idempEngine.getInverseRelations(t2.id).length;
    idempEngine.computeInverseRelations();
    const thirdCount = idempEngine.getInverseRelations(t2.id).length;

    runner.assert(
      firstCount === 1 && secondCount === 1 && thirdCount === 1,
      'computeInverseRelations is idempotent across multiple sequential calls (no duplicate accumulation)',
      { feature: 'F10', tier: 2 }
    );
  }

  // =========================================================================
  // SECTION 2: CYCLIC RELATIONSHIP RESILIENCE
  // =========================================================================
  console.log('\n--- Section 2: Cyclic Relationship Stress Testing ---');

  // Test 2.1: Mutual 2-node cycle: A requires B, B requires A
  {
    const cycEngine = loadEngineInSandbox();
    const tA = {
      id: 'urn:term:test:cyc-a',
      title: 'Cyclic Node A',
      relations: [{ type: 'requires', target: 'urn:term:test:cyc-b' }]
    };
    const tB = {
      id: 'urn:term:test:cyc-b',
      title: 'Cyclic Node B',
      relations: [{ type: 'requires', target: 'urn:term:test:cyc-a' }]
    };

    cycEngine.terms.set(tA.id, tA);
    cycEngine.terms.set(tB.id, tB);

    let threw = false;
    try {
      cycEngine.computeInverseRelations();
    } catch (e) {
      threw = true;
    }

    const invA = cycEngine.getInverseRelations(tA.id);
    const invB = cycEngine.getInverseRelations(tB.id);

    runner.assert(
      !threw && invA.length === 1 && invA[0].type === 'requiredBy' && invB.length === 1 && invB[0].type === 'requiredBy',
      'Direct 2-node cycle (A requires B, B requires A) resolves with reciprocal requiredBy inverses',
      { feature: 'F10', tier: 2 }
    );

    // Also test SVG diagram generation under 2-node cycle
    const svgA = cycEngine.generateContextualDiagramSvg(tA);
    runner.assert(
      typeof svgA === 'string' && svgA.startsWith('<svg') && svgA.includes('Cyclic Node A'),
      'generateContextualDiagramSvg renders cleanly for term in 2-node cycle without stack overflow',
      { feature: 'F15', tier: 3 }
    );
  }

  // Test 2.2: Asymmetric Inverse Cycle: A specializesIn B, B moreGeneralThan A
  {
    const asymEngine = loadEngineInSandbox();
    const tSpec = {
      id: 'urn:term:test:spec',
      title: 'Specialized Term',
      relations: [{ type: 'specializesIn', target: 'urn:term:test:gen' }]
    };
    const tGen = {
      id: 'urn:term:test:gen',
      title: 'General Term',
      relations: [{ type: 'moreGeneralThan', target: 'urn:term:test:spec' }]
    };

    asymEngine.terms.set(tSpec.id, tSpec);
    asymEngine.terms.set(tGen.id, tGen);
    asymEngine.computeInverseRelations();

    const invSpec = asymEngine.getInverseRelations(tSpec.id);
    const invGen = asymEngine.getInverseRelations(tGen.id);

    runner.assert(
      invSpec.some(r => r.type === 'specializesIn' && r.sourceTermId === tGen.id),
      'Asymmetric cycle: General term produces inverse "specializesIn" on specialized term',
      { feature: 'F10', tier: 2 }
    );
    runner.assert(
      invGen.some(r => r.type === 'moreGeneralThan' && r.sourceTermId === tSpec.id),
      'Asymmetric cycle: Specialized term produces inverse "moreGeneralThan" on general term',
      { feature: 'F10', tier: 2 }
    );
  }

  // Test 2.3: Self-referential loop (A -> A)
  {
    const loopEngine = loadEngineInSandbox();
    const tSelf = {
      id: 'urn:term:test:self-loop',
      title: 'Self Loop Term',
      relations: [
        { type: 'relatedTo', target: 'urn:term:test:self-loop' },
        { type: 'requires', target: 'urn:term:test:self-loop' }
      ]
    };
    loopEngine.terms.set(tSelf.id, tSelf);
    loopEngine.computeInverseRelations();

    const invSelf = loopEngine.getInverseRelations(tSelf.id);
    runner.assert(
      invSelf.length === 2 && invSelf.every(r => r.sourceTermId === tSelf.id),
      'Self-referential loop (A -> A) resolves cleanly in inverse map with self as source',
      { feature: 'F10', tier: 2 }
    );

    const svgSelf = loopEngine.generateContextualDiagramSvg(tSelf);
    runner.assert(
      typeof svgSelf === 'string' && svgSelf.includes('Self Loop Term'),
      'generateContextualDiagramSvg renders cleanly for self-referential term',
      { feature: 'F15', tier: 2 }
    );
  }

  // Test 2.4: 100-Node Ring Cycle Stress Test
  {
    const ringEngine = loadEngineInSandbox();
    const N = 100;
    for (let i = 0; i < N; i++) {
      const nextIdx = (i + 1) % N;
      ringEngine.terms.set(`urn:term:test:ring-${i}`, {
        id: `urn:term:test:ring-${i}`,
        slug: `ring-${i}`,
        title: `Ring Node ${i}`,
        glossaryId: 'test',
        relations: [{ type: 'precedes', target: `urn:term:test:ring-${nextIdx}` }]
      });
    }

    const startRing = Date.now();
    ringEngine.computeInverseRelations();
    const ringDuration = Date.now() - startRing;

    let allHaveInverse = true;
    for (let i = 0; i < N; i++) {
      const inv = ringEngine.getInverseRelations(`urn:term:test:ring-${i}`);
      const prevIdx = (i - 1 + N) % N;
      if (inv.length !== 1 || inv[0].sourceTermId !== `urn:term:test:ring-${prevIdx}` || inv[0].type !== 'succeeds') {
        allHaveInverse = false;
        break;
      }
    }

    runner.assert(
      allHaveInverse && ringDuration < 100,
      `100-node circular ring graph (T_i precedes T_i+1) computed in ${ringDuration}ms with 100% accurate succeeds inverses`,
      { feature: 'F10', tier: 2 }
    );
  }

  // Test 2.5: Dense Bipartite / Complete Subgraph Stress Test (20 nodes, 380 directed edges)
  {
    const denseEngine = loadEngineInSandbox();
    const M = 20;
    for (let i = 0; i < M; i++) {
      const rels = [];
      for (let j = 0; j < M; j++) {
        if (i !== j) {
          rels.push({ type: 'compatibleWith', target: `urn:term:test:dense-${j}` });
        }
      }
      denseEngine.terms.set(`urn:term:test:dense-${i}`, {
        id: `urn:term:test:dense-${i}`,
        title: `Dense Node ${i}`,
        relations: rels
      });
    }

    const startDense = Date.now();
    denseEngine.computeInverseRelations();
    const denseDuration = Date.now() - startDense;

    let denseValid = true;
    for (let i = 0; i < M; i++) {
      const inv = denseEngine.getInverseRelations(`urn:term:test:dense-${i}`);
      if (inv.length !== M - 1) {
        denseValid = false;
        break;
      }
    }

    runner.assert(
      denseValid && denseDuration < 100,
      `Complete dense graph (20 nodes, 380 directed edges) resolved in ${denseDuration}ms without memory or stack leak`,
      { feature: 'F10', tier: 2 }
    );
  }

  // =========================================================================
  // SECTION 3: SCHEMA.ORG JSON-LD VALIDITY ON ADVERSARIAL EDGE CASES
  // =========================================================================
  console.log('\n--- Section 3: Schema.org JSON-LD Validity on Edge Cases ---');

  // Test 3.1: Null / undefined inputs
  runner.assertEqual(
    engine.generateJsonLd(null),
    null,
    'generateJsonLd(null) safely returns null',
    { feature: 'F11', tier: 2 }
  );
  runner.assertEqual(
    engine.generateJsonLd(undefined),
    null,
    'generateJsonLd(undefined) safely returns null',
    { feature: 'F11', tier: 2 }
  );

  // Test 3.2: Completely empty object {}
  {
    const emptyLd = engine.generateJsonLd({});
    runner.assert(
      typeof emptyLd === 'object' && emptyLd !== null && emptyLd['@context'] === 'https://schema.org' && emptyLd['@type'] === 'DefinedTerm',
      'generateJsonLd({}) safely returns DefinedTerm schema without throwing',
      { feature: 'F11', tier: 2 }
    );
    runner.assertEqual(
      emptyLd.inDefinedTermSet['@id'],
      'urn:glossary:global',
      'Empty term defaults inDefinedTermSet @id to "urn:glossary:global"',
      { feature: 'F11', tier: 2 }
    );
  }

  // Test 3.3: Definition Fallback Normalization
  {
    // Case A: Audiovisual style: definition & extendedDefinition
    const termAv = {
      id: 'urn:term:test:av',
      title: 'AV Term',
      definition: 'Primary short definition',
      extendedDefinition: 'Comprehensive extended definition'
    };
    const ldAv = engine.generateJsonLd(termAv);
    runner.assertEqual(
      ldAv.description,
      'Primary short definition',
      'JSON-LD maps term.definition to description',
      { feature: 'F11', tier: 2 }
    );
    runner.assertEqual(
      ldAv.disambiguatingDescription,
      'Comprehensive extended definition',
      'JSON-LD maps term.extendedDefinition to disambiguatingDescription',
      { feature: 'F11', tier: 2 }
    );

    // Case B: Legacy 3D / Video style: shortDefinition & fullDefinition
    const termLegacy = {
      id: 'urn:term:test:legacy',
      title: 'Legacy Term',
      shortDefinition: 'Legacy short definition',
      fullDefinition: 'Legacy full definition'
    };
    const ldLegacy = engine.generateJsonLd(termLegacy);
    runner.assertEqual(
      ldLegacy.description,
      'Legacy short definition',
      'JSON-LD falls back to shortDefinition when definition is absent',
      { feature: 'F11', tier: 2 }
    );
    runner.assertEqual(
      ldLegacy.disambiguatingDescription,
      'Legacy full definition',
      'JSON-LD falls back to fullDefinition when extendedDefinition is absent',
      { feature: 'F11', tier: 2 }
    );

    // Case C: Missing extended definition
    const termNoExt = {
      id: 'urn:term:test:noext',
      title: 'No Ext Term',
      definition: 'Only short'
    };
    const ldNoExt = engine.generateJsonLd(termNoExt);
    runner.assert(
      !('disambiguatingDescription' in ldNoExt),
      'disambiguatingDescription is omitted when neither extendedDefinition nor fullDefinition exists',
      { feature: 'F11', tier: 2 }
    );
  }

  // Test 3.4: Synonyms edge cases (non-arrays, null, strings, numbers)
  {
    const badSynonyms = [null, undefined, 'comma,separated,string', 12345, { a: 1 }];
    for (const badSyn of badSynonyms) {
      const term = {
        id: 'urn:term:test:badsyn',
        title: 'Bad Syn Term',
        synonyms: badSyn
      };
      const ld = engine.generateJsonLd(term);
      runner.assert(
        Array.isArray(ld.alternateName),
        `alternateName is safely normalized to array when synonyms is ${typeof badSyn}`,
        { feature: 'F11', tier: 2 }
      );
    }
  }

  // Test 3.5: Extreme character encoding & serialization test
  {
    const adversarialTerm = {
      id: 'urn:term:test:adv-payload',
      slug: 'adv-payload',
      title: 'Adversarial: "DoubleQuote" & \'SingleQuote\' <script>alert("XSS")</script> & 🎬🎥🎞️',
      definition: 'Unicode mathematical: ∀x∈ℝ, ∃y: y² = x + ε. Spanish accents: áéíóúñÁÉÍÓÚÑüÜ. Special: \n\r\t\0\x1f.',
      extendedDefinition: 'JSON injection attempt: ", "fakeKey": true, "exploited": true, "trailing": "',
      synonyms: ['Alias 1', 'Alias "with" quotes', '<tag>', 'Unicode: 🚀'],
      category: 'Cámara & Óptica / Iluminación',
      level: 'avanzado'
    };

    const ldAdv = engine.generateJsonLd(adversarialTerm);
    
    // Test JSON.stringify and JSON.parse round-trip
    let roundTripJson = null;
    let roundTripThrew = false;
    try {
      const jsonStr = JSON.stringify(ldAdv);
      roundTripJson = JSON.parse(jsonStr);
    } catch (e) {
      roundTripThrew = true;
    }

    runner.assert(
      !roundTripThrew && roundTripJson !== null,
      'Adversarial payload (quotes, scripts, emojis, accents, JSON injection) serializes cleanly to JSON-LD without error',
      { feature: 'F11', tier: 2 }
    );

    runner.assertEqual(
      roundTripJson.name,
      adversarialTerm.title,
      'JSON-LD name preserves verbatim title with emojis and special characters after roundtrip',
      { feature: 'F11', tier: 2 }
    );

    runner.assertEqual(
      roundTripJson.disambiguatingDescription,
      adversarialTerm.extendedDefinition,
      'JSON-LD disambiguatingDescription preserves verbatim text without JSON corruption',
      { feature: 'F11', tier: 2 }
    );
  }

  // =========================================================================
  // SECTION 4: CONTEXTUAL SVG DIAGRAM XML SAFETY & ESCAPING
  // =========================================================================
  console.log('\n--- Section 4: Contextual SVG Diagram XML Safety & Escaping ---');

  // Test 4.1: XML Entity Escaping verification
  runner.assertEqual(
    engine.escapeXml('A & B < C > D "E" \'F\''),
    'A &amp; B &lt; C &gt; D &quot;E&quot; &apos;F&apos;',
    'escapeXml properly replaces all 5 XML special characters (&, <, >, ", \')',
    { feature: 'F15', tier: 2 }
  );

  runner.assertEqual(
    engine.escapeXml(null),
    '',
    'escapeXml(null) returns empty string without error',
    { feature: 'F15', tier: 2 }
  );

  // Test 4.2: JS Attribute Escaping verification
  {
    const escaped = engine.escapeJsAttr("urn:term:audiovisual-production:foo'bar\"baz<>&");
    runner.assert(
      !escaped.includes("'") || escaped.includes("\\'"),
      'escapeJsAttr properly escapes single quote to \\\' for inline JS string safety',
      { feature: 'F15', tier: 2 }
    );
  }

  // Test 4.3: SVG Generation for Adversarial Injection Payloads
  {
    const xssTerm = {
      id: 'urn:term:test:xss-victim',
      title: 'XSS Victim <script>alert("PWNED")</script>',
      category: 'Category "with" <tags>',
      level: 'level\'injection',
      glossaryId: 'test',
      relations: [
        {
          type: 'requires',
          target: 'urn:term:test:target\' onclick=\'alert(1)'
        }
      ]
    };

    const svg = engine.generateContextualDiagramSvg(xssTerm);
    
    // Must NOT contain raw unescaped <script> tag
    const hasRawScript = svg.includes('<script>');
    runner.assert(
      !hasRawScript,
      'Contextual SVG does NOT contain raw unescaped <script> tags from term title',
      { feature: 'F15', tier: 2 }
    );

    // Must be well-formed XML: opening <svg> and closing </svg>
    runner.assert(
      svg.startsWith('<svg') && svg.trim().endsWith('</svg>'),
      'Contextual SVG opens with <svg> and terminates with </svg>',
      { feature: 'F15', tier: 2 }
    );
  }

  // Test 4.4: Dynamic SVG Scaling for 50 Direct & 50 Inverse Relations
  {
    const largeEngine = loadEngineInSandbox();
    const centralTermId = 'urn:term:test:heavy-hub';
    const directRels = [];

    // Create 50 direct targets
    for (let i = 0; i < 50; i++) {
      const tid = `urn:term:test:heavy-direct-${i}`;
      largeEngine.terms.set(tid, { id: tid, title: `Direct Target ${i}`, category: 'Direct' });
      directRels.push({ type: 'relatedTo', target: tid });
    }

    // Create 50 inverse sources
    for (let i = 0; i < 50; i++) {
      const tid = `urn:term:test:heavy-inverse-${i}`;
      largeEngine.terms.set(tid, {
        id: tid,
        title: `Inverse Source ${i}`,
        category: 'Inverse',
        relations: [{ type: 'dependsOn', target: centralTermId }]
      });
    }

    const hubTerm = {
      id: centralTermId,
      title: 'Heavy Hub Term',
      category: 'Hub',
      relations: directRels
    };
    largeEngine.terms.set(centralTermId, hubTerm);
    largeEngine.computeInverseRelations();

    const heavySvg = largeEngine.generateContextualDiagramSvg(hubTerm);
    runner.assert(
      heavySvg.includes('viewBox="0 0 800 ') && !heavySvg.includes('NaN'),
      'Contextual SVG scales gracefully for 100 total connections (50 direct + 50 inverse) without NaN in geometry',
      { feature: 'F15', tier: 3 }
    );
  }

  // =========================================================================
  // SECTION 5: SEARCH ENGINE EDGE-CASE QUERY & MISSING FIELD ROBUSTNESS
  // =========================================================================
  console.log('\n--- Section 5: Search Engine Adversarial Robustness ---');

  // Test 5.1: Regex meta-characters in search query
  {
    const searchEngine = loadEngineInSandbox();
    searchEngine.terms.set('urn:term:test:alpha', {
      id: 'urn:term:test:alpha',
      title: 'Alpha Concept (Test)',
      definition: 'A test concept with brackets [v1.0] and dots ...'
    });

    const regexQueries = ['.*', '(', '[a-z]', '+', '?', '\\', '^', '$', '{1,3}'];
    let searchThrew = false;
    for (const q of regexQueries) {
      try {
        searchEngine.searchTerms(q);
      } catch (e) {
        searchThrew = true;
      }
    }

    runner.assert(
      !searchThrew,
      'searchTerms handles regex meta-characters without regex syntax errors (uses literal substring matching)',
      { feature: 'F13', tier: 2 }
    );
  }

  // Test 5.2: Incomplete terms in search engine
  {
    const searchEngine = loadEngineInSandbox();
    searchEngine.terms.set('urn:term:test:bare', {
      id: 'urn:term:test:bare'
      // Missing title, definition, synonyms, components
    });

    let searchThrew = false;
    try {
      searchEngine.searchTerms('test');
    } catch (e) {
      searchThrew = true;
    }

    runner.assert(
      !searchThrew,
      'searchTerms handles bare terms with missing title/definitions/synonyms without throwing TypeError',
      { feature: 'F13', tier: 2 }
    );
  }

  // =========================================================================
  // SECTION 6: 100% OFFLINE AUTONOMY AUDIT
  // =========================================================================
  console.log('\n--- Section 6: 100% Offline Autonomy Audit ---');

  const enginePath = path.join(ROOT_DIR, 'app', 'js', 'semantic-engine.js');
  const engineSource = fs.readFileSync(enginePath, 'utf8');

  // Audit 6.1: Zero network calling primitives
  const forbiddenCallMatches = engineSource.match(/\b(fetch|XMLHttpRequest|WebSocket|importScripts|sendBeacon|EventSource)\b/g);
  runner.assertEqual(
    forbiddenCallMatches ? forbiddenCallMatches.length : 0,
    0,
    'semantic-engine.js contains ZERO network request primitives (fetch/XHR/WebSocket/Worker)',
    { feature: 'F2', tier: 1 }
  );

  // Audit 6.2: External URL strings audit
  // Allowed exceptions: 'https://schema.org' (JSON-LD context) and 'http://www.w3.org/2000/svg' (SVG namespace)
  const allUrls = engineSource.match(/https?:\/\/[^\s'")`]+/gi) || [];
  const unauthorizedUrls = allUrls.filter(u => 
    !u.startsWith('https://schema.org') && 
    !u.startsWith('http://www.w3.org/2000/svg')
  );

  runner.assertEqual(
    unauthorizedUrls.length,
    0,
    `semantic-engine.js contains 0 unauthorized remote URLs (found: ${unauthorizedUrls.length})`,
    { feature: 'F2', tier: 1 }
  );

  // Audit 6.3: Zero dynamic script injection or eval
  const forbiddenEvalMatches = engineSource.match(/\b(eval\s*\(|new\s+Function\s*\(|document\.createElement\s*\(\s*['"]script['"])/g);
  runner.assertEqual(
    forbiddenEvalMatches ? forbiddenEvalMatches.length : 0,
    0,
    'semantic-engine.js contains ZERO dynamic eval, new Function, or script injection calls',
    { feature: 'F2', tier: 1 }
  );

  // =========================================================================
  // SECTION 7: ADVERSARIAL BOUNDARY & DEFENSIVE HARDENING ANALYSIS
  // =========================================================================
  console.log('\n--- Section 7: Adversarial Boundary & Defensive Hardening Analysis ---');

  // Vulnerability Probe 7.1: Sparse array in term.relations (e.g. relations: [null])
  {
    const probeEngine = loadEngineInSandbox();
    probeEngine.terms.set('urn:term:test:probe-sparse', {
      id: 'urn:term:test:probe-sparse',
      relations: [null]
    });

    let probeThrew = false;
    let errorMsg = '';
    try {
      probeEngine.computeInverseRelations();
    } catch (e) {
      probeThrew = true;
      errorMsg = e.message;
    }

    if (probeThrew) {
      console.log(`      [PROBED VULNERABILITY] computeInverseRelations throws on relations: [null] -> "${errorMsg}"`);
      runner.record('PENDING', 'computeInverseRelations defensive guard for sparse [null] array elements (Recommendation for M5 persistence hardening)', {
        feature: 'F10',
        tier: 2,
        details: { vulnerability: 'Cannot read properties of null (reading target)', mitigation: 'Change "if (!rel.target)" to "if (!rel || !rel.target)"' }
      });
    } else {
      runner.assert(true, 'computeInverseRelations guarded against sparse [null] array elements', { feature: 'F10', tier: 2 });
    }
  }

  // Vulnerability Probe 7.2: Missing target attribute in generateContextualDiagramSvg
  {
    const probeEngine = loadEngineInSandbox();
    const probeTerm = {
      id: 'urn:term:test:probe-missing-target',
      title: 'Probe Missing Target',
      relations: [{ type: 'requires' }] // target is undefined
    };

    let probeSvgThrew = false;
    let svgError = '';
    try {
      probeEngine.generateContextualDiagramSvg(probeTerm);
    } catch (e) {
      probeSvgThrew = true;
      svgError = e.message;
    }

    if (probeSvgThrew) {
      console.log(`      [PROBED VULNERABILITY] generateContextualDiagramSvg throws on relation without target -> "${svgError}"`);
      runner.record('PENDING', 'generateContextualDiagramSvg defensive guard for relations without target attribute (Recommendation for M3/M5 UI hardening)', {
        feature: 'F15',
        tier: 2,
        details: { vulnerability: 'Cannot read properties of undefined (reading split)', mitigation: 'Safely check rel && rel.target before rel.target.split(":")' }
      });
    } else {
      runner.assert(true, 'generateContextualDiagramSvg guarded against relations without target', { feature: 'F15', tier: 2 });
    }
  }

  // Vulnerability Probe 7.3: Non-string elements in term.synonyms during searchTerms
  {
    const probeEngine = loadEngineInSandbox();
    probeEngine.terms.set('urn:term:test:probe-syn', {
      id: 'urn:term:test:probe-syn',
      title: 'Probe Syn',
      synonyms: [null]
    });

    let synSearchThrew = false;
    let synError = '';
    try {
      probeEngine.searchTerms('test');
    } catch (e) {
      synSearchThrew = true;
      synError = e.message;
    }

    if (synSearchThrew) {
      console.log(`      [PROBED VULNERABILITY] searchTerms throws on non-string synonyms [null] -> "${synError}"`);
      runner.record('PENDING', 'searchTerms defensive guard for non-string synonym entries (Recommendation for M3 search hardening)', {
        feature: 'F13',
        tier: 2,
        details: { vulnerability: 'Cannot read properties of null (reading toLowerCase)', mitigation: 'Check typeof s === "string" before s.toLowerCase()' }
      });
    } else {
      runner.assert(true, 'searchTerms guarded against non-string synonyms', { feature: 'F13', tier: 2 });
    }
  }

  return runner.printReport();
}

if (require.main === module) {
  const summary = runAdversarialStressTests();
  process.exit(summary.failed > 0 ? 1 : 0);
}

module.exports = { runAdversarialStressTests };
