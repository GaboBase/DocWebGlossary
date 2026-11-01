/**
 * DOCWEB MULTIGLOSSARY — Suite de Verificación Adversarial para Hitos 4, 5 y 6
 * 
 * Reconstrucción técnica rigurosa de la red de seguridad adversarial:
 * - Hito 4: Ontología de Sistemas e Ingeniería de Software (L1-L6), relaciones cruzadas y ciclos.
 * - Hito 5: Coexistencia de 5 glosarios en memoria, estrés de búsqueda y resiliencia de almacenamiento.
 * - Hito 6: Orientador dinámico multi-glosario (33 productos) y diagramas contextuales sin geometrías NaN.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { ROOT_DIR, TestRunner } = require('./test_utils');

function setupSandbox() {
  const sandbox = {
    window: {},
    console: {
      log: () => {},
      warn: () => {},
      error: () => {}
    },
    document: {
      createElement: () => ({ setAttribute: () => {}, appendChild: () => {}, classList: { add: () => {}, remove: () => {} } }),
      getElementById: () => null,
      querySelectorAll: () => [],
      addEventListener: () => {}
    },
    navigator: { userAgent: 'NodeTestRunner' },
    setTimeout: (fn) => fn(),
    clearTimeout: () => {}
  };
  sandbox.window = sandbox;

  // Cargar bundle.js
  const bundlePath = path.join(ROOT_DIR, 'app', 'data', 'bundle.js');
  const bundleCode = fs.readFileSync(bundlePath, 'utf8');
  vm.createContext(sandbox);
  vm.runInContext(bundleCode, sandbox);

  // Cargar semantic-engine.js
  const semanticEnginePath = path.join(ROOT_DIR, 'app', 'js', 'semantic-engine.js');
  const semanticEngineCode = fs.readFileSync(semanticEnginePath, 'utf8');
  vm.runInContext(semanticEngineCode, sandbox);

  // Cargar prompt-orientator.js
  const promptOrientatorPath = path.join(ROOT_DIR, 'app', 'js', 'prompt-orientator.js');
  const promptOrientatorCode = fs.readFileSync(promptOrientatorPath, 'utf8');
  vm.runInContext(promptOrientatorCode, sandbox);

  // Inicializar motor semántico con catálogo y glosarios
  const catalog = sandbox.window.DocWebCanonicalData.catalog;
  const glossaries = sandbox.window.DocWebCanonicalData.glossaries;
  sandbox.window.DocWebSemantics.loadAll(catalog, glossaries);

  return sandbox;
}

function runM4M6AdversarialTests() {
  const runner = new TestRunner('Adversarial Hardening Suite: Milestones 4, 5 & 6');
  console.log(`\n=== Running ${runner.suiteName} ===`);

  const sandbox = setupSandbox();
  const semantics = sandbox.window.DocWebSemantics;
  const orientator = sandbox.window.DocWebPromptOrientator;

  // -------------------------------------------------------------
  // SECCIÓN 1: HITO 4 ADVERSARIAL — Ontología de Software & Niveles L1-L6
  // -------------------------------------------------------------
  console.log('\n--- Section 1: Milestone 4 Adversarial (Software Ontology & L1-L6 Layers) ---');

  const swTerms = semantics.getTermsByGlossary('software-engineering-ontology');
  runner.assert(
    swTerms.length === 30,
    `Software Engineering Ontology contains exactly 30 terms (found: ${swTerms.length})`,
    { feature: 'F8', tier: 1 }
  );

  // Verificar presencia de niveles ontológicos mediante getAdditiveFacets
  const swLevels = new Set();
  for (const t of swTerms) {
    const facets = semantics.getAdditiveFacets(t);
    if (facets && facets.ontologicalLevel) {
      const match = facets.ontologicalLevel.match(/L[1-6]/);
      if (match) swLevels.add(match[0]);
    }
  }

  runner.assert(
    swLevels.size >= 4,
    `Software Engineering Ontology spans multiple ontological levels (found: ${Array.from(swLevels).sort().join(', ')})`,
    { feature: 'F10', tier: 2 }
  );

  const allLevels = new Set();
  for (const t of semantics.getAllTerms()) {
    const facets = semantics.getAdditiveFacets(t);
    if (facets && facets.ontologicalLevel) {
      const match = facets.ontologicalLevel.match(/L[1-6]/);
      if (match) allLevels.add(match[0]);
    }
  }

  const validLevels = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'];
  for (const lvl of validLevels) {
    runner.assert(
      allLevels.has(lvl),
      `Ontological Level ${lvl} is represented across system terms`,
      { feature: 'F10', tier: 2 }
    );
  }

  // Estrés de relaciones ontológicas complejas en software
  let totalSwRelations = 0;
  let selfRefRelations = 0;
  for (const t of swTerms) {
    if (Array.isArray(t.relations)) {
      totalSwRelations += t.relations.length;
      for (const r of t.relations) {
        if (r.target === t.id) selfRefRelations++;
      }
    }
  }

  runner.assert(
    totalSwRelations >= 60,
    `Software Engineering Ontology has rich relationship network (>= 60 relations, found: ${totalSwRelations})`,
    { feature: 'F10', tier: 2 }
  );

  runner.assertEqual(
    selfRefRelations,
    0,
    'Zero self-referencing relations in SoftwareEngineeringOntology terms',
    { feature: 'F10', tier: 2 }
  );

  // -------------------------------------------------------------
  // SECCIÓN 2: HITO 5 ADVERSARIAL — Coexistencia de 5 Glosarios & Búsqueda Extrema
  // -------------------------------------------------------------
  console.log('\n--- Section 2: Milestone 5 Adversarial (5-Glossary Coexistence & Search Stress) ---');

  const allTerms = semantics.getAllTerms();
  runner.assertEqual(
    allTerms.length,
    272,
    `Total terms loaded across all 5 glossaries is exactly 272`,
    { feature: 'F8', tier: 1 }
  );

  // Verificar que ningún slug colisiona o se sobreescribe entre glosarios
  const fullUrns = new Set();
  let duplicateUrns = 0;
  for (const t of allTerms) {
    if (fullUrns.has(t.id)) duplicateUrns++;
    fullUrns.add(t.id);
  }

  runner.assertEqual(
    duplicateUrns,
    0,
    'Zero colliding or duplicate URN identifiers across all 272 terms in 5 glossaries',
    { feature: 'F3', tier: 2 }
  );

  // Búsqueda adversarial con casos extremos (inyecciones, tildes, nulls, caracteres especiales)
  const adversarialQueries = [
    '<script>alert("xss")</script>',
    'SELECT * FROM terms WHERE 1=1',
    '${process.env.SECRET}',
    '\\x00\\n\\r',
    '🚀 🎬 🤖 📐 💡',
    'cámara lenta', // tildes y diacríticos
    'RASTERIZACIÓN', // mayúsculas sostenidas
    '       ',      // espacios puros
    'a',            // letra individual
    'nonexistent_term_supercalifragilistic' // sin coincidencia
  ];

  for (const q of adversarialQueries) {
    let result = null;
    let didThrow = false;
    try {
      result = semantics.searchTerms(q, 'all');
    } catch (e) {
      didThrow = true;
    }
    runner.assert(
      !didThrow && Array.isArray(result),
      `searchTerms handles extreme query without crashing: "${q.slice(0, 25)}"`,
      { feature: 'F13', tier: 2 }
    );
  }

  // -------------------------------------------------------------
  // SECCIÓN 3: HITO 6 ADVERSARIAL — Orientador Multi-Glosario & Robustez de Diagramas
  // -------------------------------------------------------------
  console.log('\n--- Section 3: Milestone 6 Adversarial (Multi-Glossary Orientator & Diagram SVG Safety) ---');

  const allProducts = orientator.getProductList ? orientator.getProductList('all') : [];
  runner.assert(
    allProducts.length >= 30,
    `Dynamic Orientator provides comprehensive product suite (found: ${allProducts.length} >= 30 products)`,
    { feature: 'F16', tier: 1 }
  );

  // Probar especificación de cada producto asegurando cero fallos
  let specFailures = 0;
  for (const prod of allProducts) {
    try {
      const spec = orientator.buildSpecification(prod.id, {});
      if (!spec || !spec.positivePrompt || !spec.workflowTasks) {
        specFailures++;
      }
    } catch (e) {
      specFailures++;
    }
  }

  runner.assertEqual(
    specFailures,
    0,
    `100% of ${allProducts.length} products generate valid production specifications without throwing`,
    { feature: 'F18', tier: 2 }
  );

  // Robustez de generación de Diagramas SVG: Comprobar que no hay 'NaN' en atributos geométricos
  const sampleTerms = [
    swTerms[0],
    allTerms.find(t => t.id.includes('audiovisual-production')),
    allTerms.find(t => t.id.includes('render-3d-animations')),
    allTerms.find(t => t.id.includes('generative-ai-media')),
    allTerms.find(t => t.id.includes('video-image'))
  ].filter(Boolean);

  for (const term of sampleTerms) {
    const views = ['focal', 'hierarchy', 'pipeline', 'atlas'];
    for (const view of views) {
      let svg = '';
      let threw = false;
      try {
        svg = semantics.generateContextualDiagramSvg(term, { viewMode: view, zoom: 1.25 });
      } catch (e) {
        threw = true;
      }

      runner.assert(
        !threw && typeof svg === 'string' && svg.includes('<svg') && svg.includes('</svg>'),
        `SVG diagram for "${term.title.slice(0, 16)}" [${view}] generates valid XML`,
        { feature: 'F15', tier: 2 }
      );

      runner.assert(
        !svg.includes('NaN'),
        `SVG diagram for "${term.title.slice(0, 16)}" [${view}] has ZERO NaN geometry errors`,
        { feature: 'F15', tier: 2 }
      );
    }
  }

  return runner.printReport();
}

if (require.main === module) {
  runM4M6AdversarialTests();
}

module.exports = { runM4M6AdversarialTests };
