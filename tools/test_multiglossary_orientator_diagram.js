/**
 * DOCWEB MULTIGLOSSARY — Verification Suite: Dynamic AI Prompt Orientator & Expanded Diagram Views
 * Tests:
 *   - Dynamic Glossary Adaptation of Orientator (Audiovisual, 3D Render, Video Image, All)
 *   - Product-Specific Determinant Attributes (tailored schemas per objective product)
 *   - Action Verbs for Generative AI Prompt Directives
 *   - Phased Workflow Tasks & Activities (Preproduction, Production, Postproduction)
 *   - Expanded Contextual Diagram View Modes: Focal, Hierarchy L1-L6, Pipeline, Atlas (All Terms)
 *   - Diagram Filters (Family & Level) and Scaling/Zoom Integrity
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { ROOT_DIR, TestRunner } = require('./test_utils');

function runMultiGlossaryOrientatorDiagramTests() {
  const runner = new TestRunner('Dynamic Orientator & Expanded Diagram Views Suite');
  console.log(`\n=== Running ${runner.suiteName} ===`);

  // 1. Load prompt-orientator.js in VM sandbox
  const orientatorPath = path.join(ROOT_DIR, 'app', 'js', 'prompt-orientator.js');
  const orientatorCode = fs.readFileSync(orientatorPath, 'utf8');
  const sandboxOrientator = {
    window: {},
    console: console
  };
  vm.createContext(sandboxOrientator);
  vm.runInContext(orientatorCode, sandboxOrientator);
  const orientator = sandboxOrientator.window.DocWebPromptOrientator;

  runner.assert(!!orientator, 'Orientator module loaded into VM', { feature: 'F18', tier: 1 });

  // --- Suite 1: Dynamic Adaptation per Glossary ---
  console.log('\n--- Section 1: Dynamic Glossary Adaptation ---');
  const avProducts = orientator.getProductList('audiovisual-production');
  runner.assert(avProducts.length === 14, 'Audiovisual production returns exactly 14 products', { feature: 'F16', tier: 1 });
  runner.assert(avProducts.some(p => p.id === 'trailer'), 'Audiovisual production includes trailer', { feature: 'F16', tier: 1 });
  runner.assert(avProducts.some(p => p.id === 'export-formats'), 'Audiovisual production includes export-formats', { feature: 'F16', tier: 1 });

  const render3dProducts = orientator.getProductList('render-3d-animations');
  runner.assert(render3dProducts.length >= 6, 'Render 3D & Animations returns at least 6 specialized products', { feature: 'F16', tier: 1 });
  runner.assert(render3dProducts.some(p => p.id === '3d-character-asset'), 'Render 3D includes 3d-character-asset', { feature: 'F16', tier: 1 });
  runner.assert(render3dProducts.some(p => p.id === 'environment-scene-3d'), 'Render 3D includes environment-scene-3d', { feature: 'F16', tier: 1 });
  runner.assert(render3dProducts.some(p => p.id === 'vfx-simulation-pass'), 'Render 3D includes vfx-simulation-pass', { feature: 'F16', tier: 1 });

  const videoImgProducts = orientator.getProductList('video-image');
  runner.assert(videoImgProducts.length >= 5, 'Video & Image returns at least 5 specialized products', { feature: 'F16', tier: 1 });
  runner.assert(videoImgProducts.some(p => p.id === 'color-grading-showreel'), 'Video & Image includes color-grading-showreel', { feature: 'F16', tier: 1 });
  runner.assert(videoImgProducts.some(p => p.id === 'hdr-master-delivery'), 'Video & Image includes hdr-master-delivery', { feature: 'F16', tier: 1 });
  runner.assert(videoImgProducts.some(p => p.id === 'generative-ai-video'), 'Video & Image includes generative-ai-video', { feature: 'F16', tier: 1 });

  const allProducts = orientator.getProductList('all');
  runner.assert(allProducts.length === 25, 'All products aggregates 25 items across all catalogs', { feature: 'F16', tier: 1 });

  const fallbackProducts = orientator.getProductList('unknown-glossary-id');
  runner.assert(fallbackProducts.length === 25, 'Unknown glossary falls back gracefully to all products', { feature: 'F16', tier: 2 });

  // --- Suite 2: Product-Specific Determinant Attributes ---
  console.log('\n--- Section 2: Product-Specific Determinant Attributes ---');
  const trailerAttrs = orientator.getProductAttributes('trailer');
  runner.assert(Array.isArray(trailerAttrs) && trailerAttrs.length >= 8, 'Trailer has determinant attributes array', { feature: 'F17', tier: 1 });
  runner.assert(trailerAttrs.some(a => a.key === 'duration') && trailerAttrs.some(a => a.key === 'aspectRatio'), 'Trailer attributes include duration and aspectRatio', { feature: 'F17', tier: 1 });

  const char3dAttrs = orientator.getProductAttributes('3d-character-asset');
  runner.assert(Array.isArray(char3dAttrs) && char3dAttrs.length >= 5, '3D Character Asset has specialized determinant attributes', { feature: 'F17', tier: 1 });
  runner.assert(char3dAttrs.some(a => a.key === 'polyCountBudget'), '3D Character Asset includes polyCountBudget', { feature: 'F17', tier: 1 });
  runner.assert(char3dAttrs.some(a => a.key === 'topologyType'), '3D Character Asset includes topologyType', { feature: 'F17', tier: 1 });
  runner.assert(char3dAttrs.some(a => a.key === 'riggingFramework'), '3D Character Asset includes riggingFramework', { feature: 'F17', tier: 1 });
  runner.assert(char3dAttrs.some(a => a.key === 'texturingPBRWorkflow'), '3D Character Asset includes texturingPBRWorkflow', { feature: 'F17', tier: 1 });

  const colorAttrs = orientator.getProductAttributes('color-grading-showreel');
  runner.assert(Array.isArray(colorAttrs) && colorAttrs.length >= 5, 'Color Grading Showreel has specialized determinant attributes', { feature: 'F17', tier: 1 });
  runner.assert(colorAttrs.some(a => a.key === 'colorSpaceInput'), 'Color Grading includes colorSpaceInput', { feature: 'F17', tier: 1 });
  runner.assert(colorAttrs.some(a => a.key === 'colorSpaceOutput'), 'Color Grading includes colorSpaceOutput', { feature: 'F17', tier: 1 });
  runner.assert(colorAttrs.some(a => a.key === 'splitScreenBeforeAfter'), 'Color Grading includes splitScreenBeforeAfter', { feature: 'F17', tier: 1 });

  // --- Suite 3: Action Verbs for Prompt Directives ---
  console.log('\n--- Section 3: Action Verbs for Prompt Directives ---');
  const charProduct = orientator.getProduct('3d-character-asset');
  runner.assert(Array.isArray(charProduct.actionVerbs) && charProduct.actionVerbs.length >= 4, '3D Character has defined actionVerbs array', { feature: 'F18', tier: 1 });
  runner.assert(charProduct.actionVerbs.some(v => v.includes('Esculpir') || v.includes('Retopologizar')), 'Action verbs contain 3D technical operations', { feature: 'F18', tier: 1 });

  const spec3D = orientator.buildSpecification('3d-character-asset', {
    polyCountBudget: '80,000 tris (optimized for real-time LOD0)',
    texturingPBRWorkflow: 'Metálico/Rugosidad (Metallic/Roughness)',
    riggingFramework: 'Esqueleto con cinemática inversa (IK/FK) y blendshapes faciales'
  });
  runner.assert(typeof spec3D.positivePrompt === 'string' && spec3D.positivePrompt.length > 50, 'Generated 3D spec contains positivePrompt', { feature: 'F18', tier: 1 });
  runner.assert(Array.isArray(spec3D.actionDirectives) && spec3D.actionDirectives.length > 0, 'Generated 3D spec contains actionDirectives array', { feature: 'F18', tier: 1 });
  runner.assert(spec3D.actionDirectives.some(d => d.includes('geometría') || d.includes('UV') || d.includes('FACS')), 'Action directives include 3D specific production directives', { feature: 'F18', tier: 1 });

  // --- Suite 4: Phased Workflow Tasks & Activities ---
  console.log('\n--- Section 4: Phased Workflow Tasks & Activities ---');
  runner.assert(typeof spec3D.workflowTasks === 'object' && spec3D.workflowTasks !== null, '3D Character spec contains workflowTasks object', { feature: 'F18', tier: 1 });
  runner.assert(Array.isArray(spec3D.workflowTasks.preproduction) && spec3D.workflowTasks.preproduction.length > 0, 'Workflow has Preproducción tasks', { feature: 'F18', tier: 1 });
  runner.assert(Array.isArray(spec3D.workflowTasks.production) && spec3D.workflowTasks.production.length > 0, 'Workflow has Producción tasks', { feature: 'F18', tier: 1 });
  runner.assert(Array.isArray(spec3D.workflowTasks.postproduction) && spec3D.workflowTasks.postproduction.length > 0, 'Workflow has Postproducción tasks', { feature: 'F18', tier: 1 });

  const all3DTasks = [
    ...spec3D.workflowTasks.preproduction,
    ...spec3D.workflowTasks.production,
    ...spec3D.workflowTasks.postproduction
  ];
  runner.assert(all3DTasks.every(t => t.name && t.description), 'Every workflow task has name and description', { feature: 'F18', tier: 1 });
  runner.assert(all3DTasks.some(t => t.termId && t.termId.startsWith('urn:term:')), 'Workflow tasks link to canonical glossary URNs', { feature: 'F19', tier: 1 });

  // --- Suite 5: Semantic Engine Expanded Diagram Modes ---
  console.log('\n--- Section 5: Semantic Engine Expanded Diagram Views ---');
  const enginePath = path.join(ROOT_DIR, 'app', 'js', 'semantic-engine.js');
  const engineCode = fs.readFileSync(enginePath, 'utf8');
  const sandboxEngine = {
    window: {},
    console: console
  };
  vm.createContext(sandboxEngine);
  vm.runInContext(engineCode, sandboxEngine);
  const engine = sandboxEngine.window.DocWebSemantics;

  runner.assert(!!engine, 'Semantic engine loaded into VM', { feature: 'F10', tier: 1 });

  // Load catalog and glossaries
  const catalogPath = path.join(ROOT_DIR, 'app', 'data', 'catalog.json');
  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  const glossariesData = {};
  for (const g of catalog.canonicalGlossaries) {
    const tPath = path.join(ROOT_DIR, g.dataPath);
    glossariesData[g.id] = JSON.parse(fs.readFileSync(tPath, 'utf8')).canonicalTerms || [];
  }
  engine.loadAll(catalog, glossariesData);

  runner.assert(engine.getAllTerms().length >= 200, 'Catalog loaded terms count >= 200', { feature: 'F8', tier: 1 });

  const testTerm = engine.getAllTerms()[0];
  runner.assert(!!testTerm, 'Selected test term exists', { feature: 'F15', tier: 1 });

  // Mode 1: Focal View
  const focalSvg = engine.generateContextualDiagramSvg(testTerm, { viewMode: 'focal' });
  runner.assert(focalSvg.startsWith('<svg') && focalSvg.endsWith('</svg>'), 'Focal view returns valid SVG XML', { feature: 'F15', tier: 1 });
  runner.assert(focalSvg.includes('id="diagram-center-node"') || focalSvg.includes('focal-node'), 'Focal view contains central node', { feature: 'F15', tier: 1 });

  // Mode 2: Hierarchy L1-L6 View
  const hierarchySvg = engine.generateContextualDiagramSvg(testTerm, { viewMode: 'hierarchy' });
  runner.assert(hierarchySvg.startsWith('<svg') && hierarchySvg.endsWith('</svg>'), 'Hierarchy view returns valid SVG XML', { feature: 'F15', tier: 1 });
  runner.assert(hierarchySvg.includes('L1') || hierarchySvg.includes('L2') || hierarchySvg.includes('Dominio') || hierarchySvg.includes('Categoría') || hierarchySvg.includes('hierarchy-node'), 'Hierarchy view renders ontological levels', { feature: 'F15', tier: 1 });

  // Mode 3: Pipeline View
  const pipelineSvg = engine.generateContextualDiagramSvg(testTerm, { viewMode: 'pipeline' });
  runner.assert(pipelineSvg.startsWith('<svg') && pipelineSvg.endsWith('</svg>'), 'Pipeline view returns valid SVG XML', { feature: 'F15', tier: 1 });
  runner.assert(pipelineSvg.includes('Pipeline') || pipelineSvg.includes('Flujo') || pipelineSvg.includes('Fase') || pipelineSvg.includes('pipeline-node'), 'Pipeline view renders sequence flow', { feature: 'F15', tier: 1 });

  // Mode 4: Atlas View (All Terms)
  const atlasSvg = engine.generateContextualDiagramSvg(testTerm, { viewMode: 'atlas' });
  runner.assert(atlasSvg.startsWith('<svg') && atlasSvg.endsWith('</svg>'), 'Atlas view returns valid SVG XML', { feature: 'F15', tier: 1 });
  runner.assert(atlasSvg.includes('atlas-node') || atlasSvg.includes('data-urn'), 'Atlas view renders term elements across clusters', { feature: 'F15', tier: 1 });
  runner.assert(atlasSvg.includes('cluster') || atlasSvg.includes('categor') || atlasSvg.includes('atlas-cluster'), 'Atlas view contains multiple category clusters', { feature: 'F15', tier: 1 });

  // Zoom scaling
  const zoomedSvg = engine.generateContextualDiagramSvg(testTerm, { viewMode: 'atlas', zoom: 1.5 });
  runner.assert(zoomedSvg.includes('transform="scale(1.5)') || zoomedSvg.includes('viewBox='), 'Zoomed SVG contains scaling transform or adjusted viewBox', { feature: 'F15', tier: 2 });
  runner.assert(!zoomedSvg.includes('NaN'), 'Zoomed SVG does NOT produce NaN in geometry', { feature: 'F15', tier: 2 });

  // Family and level filters
  const filteredFamilySvg = engine.generateContextualDiagramSvg(testTerm, { viewMode: 'hierarchy', filterFamily: 'taxonomy' });
  runner.assert(filteredFamilySvg.startsWith('<svg') && !filteredFamilySvg.includes('NaN'), 'Filtered family SVG renders without error', { feature: 'F15', tier: 2 });

  const filteredLevelSvg = engine.generateContextualDiagramSvg(testTerm, { viewMode: 'hierarchy', filterLevel: 'L3' });
  runner.assert(filteredLevelSvg.startsWith('<svg') && !filteredLevelSvg.includes('NaN'), 'Filtered level SVG renders without error', { feature: 'F15', tier: 2 });

  // Adversarial edge cases
  const nullTermSvg = engine.generateContextualDiagramSvg(null, { viewMode: 'atlas' });
  runner.assert(nullTermSvg.startsWith('<svg'), 'generateContextualDiagramSvg handles null term without throwing', { feature: 'F15', tier: 2 });

  const emptyOptionsSvg = engine.generateContextualDiagramSvg(testTerm, {});
  runner.assert(emptyOptionsSvg.startsWith('<svg'), 'generateContextualDiagramSvg handles empty options without throwing', { feature: 'F15', tier: 2 });

  return runner.printReport();
}

if (require.main === module) {
  runMultiGlossaryOrientatorDiagramTests();
}

module.exports = { runMultiGlossaryOrientatorDiagramTests };
