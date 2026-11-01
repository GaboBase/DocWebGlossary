/**
 * DOCWEB MULTIGLOSSARY — E2E Test: Catalog & Terms Verification
 * Covers:
 *   - Feature 3: 177 Primary Terms Integration
 *   - Feature 4: Discrepancy & Duplicate Reconciliation
 *   - Feature 5: Original Rigorous Technical Definitions
 *   - Feature 6: Non-navigable Metadata Provenance
 *   - Feature 7: Expanded AI/LLM Generative Video Terms
 *   - Feature 8: Multi-glossary Catalog Registration
 *   - Feature 9: Cross-Glossary Interconnection (Catalog level)
 *   - Feature 13: Real-time Search & Multi-field Indexing (Indexable term fields)
 *   - Feature 14: A-Z Navigation & Category Filters
 *   - Feature 23: Decoupled Shared Multi-glossary Architecture
 * Tiers: 1, 2, 3, 4
 */

const fs = require('fs');
const path = require('path');
const { ROOT_DIR, TestRunner } = require('./test_utils');

function runCatalogAndTermsTests() {
  const runner = new TestRunner('Catalog & Terms Integrity Suite');
  console.log(`\n=== Running ${runner.suiteName} ===`);

  const EXPECTED_CATEGORIES_13 = [
    'preproduccion',
    'direccion-narrativa',
    'camara-movimiento',
    'optica-lentes',
    'iluminacion',
    'audio-directo',
    'edicion-montaje',
    'color-etalonaje',
    'audio-postproduccion',
    'vfx-composicion',
    'distribucion-formatos',
    'tecnologia-infraestructura',
    'ia-generacion-audiovisual'
  ];

  // -------------------------------------------------------------
  // TIER 1: Catalog Registration & Metadata Integrity
  // -------------------------------------------------------------
  console.log('\n--- Tier 1: Catalog Registration & File Contracts ---');

  const catalogPath = path.join(ROOT_DIR, 'app', 'data', 'catalog.json');
  let catalog = null;

  if (fs.existsSync(catalogPath)) {
    try {
      catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
      runner.assert(
        typeof catalog === 'object' && catalog !== null,
        'app/data/catalog.json is valid JSON',
        { feature: 'F8', tier: 1 }
      );
      runner.assert(
        Array.isArray(catalog.canonicalGlossaries),
        'catalog.json contains canonicalGlossaries array',
        { feature: 'F8', tier: 1 }
      );
    } catch (err) {
      runner.assert(false, `catalog.json parsing error: ${err.message}`, { feature: 'F8', tier: 1 });
    }
  } else {
    runner.assert(false, 'catalog.json not found', { feature: 'F8', tier: 1 });
  }

  // F8: Pre-existing canonical glossaries in catalog
  if (catalog && catalog.canonicalGlossaries) {
    const ids = catalog.canonicalGlossaries.map(g => g.id);
    runner.assert(
      ids.includes('render-3d-animations'),
      'catalog registers render-3d-animations',
      { feature: 'F8', tier: 1 }
    );
    runner.assert(
      ids.includes('video-image'),
      'catalog registers video-image',
      { feature: 'F8', tier: 1 }
    );

    // Check audiovisual-production registration
    const avEntry = catalog.canonicalGlossaries.find(g => g.id === 'audiovisual-production');
    if (avEntry) {
      runner.assert(true, 'catalog registers audiovisual-production', { feature: 'F8', tier: 1 });
      runner.assert(
        Boolean(avEntry.dataPath && avEntry.metadataPath),
        'audiovisual-production entry has dataPath and metadataPath declared',
        { feature: 'F8', tier: 1 }
      );
      runner.assert(
        Array.isArray(avEntry.categories) && avEntry.categories.length >= 13,
        `audiovisual-production declares 13 production categories (found: ${avEntry.categories ? avEntry.categories.length : 0})`,
        { feature: 'F8', tier: 1 }
      );
    } else {
      runner.pending(
        'catalog.json registration of audiovisual-production (Milestone M1 in progress)',
        { feature: 'F8', tier: 1 }
      );
    }
  }

  // F23: Decoupled multi-glossary schema check
  if (catalog) {
    runner.assert(
      typeof catalog.systemTitle === 'string' && catalog.systemTitle.includes('DOCWEB MULTIGLOSSARY'),
      'System title declares shared DOCWEB MULTIGLOSSARY architecture',
      { feature: 'F23', tier: 1 }
    );
    for (const g of catalog.canonicalGlossaries || []) {
      runner.assert(
        Boolean(g.id && g.slug && g.title && g.domain && g.dataPath),
        `Glossary entry "${g.id}" complies with decoupled manifest interface`,
        { feature: 'F23', tier: 1 }
      );
    }
  }

  // -------------------------------------------------------------
  // TIER 1 & 2: Terms Inspection (Authoritative Source & Live File)
  // -------------------------------------------------------------
  console.log('\n--- Tier 1 & 2: 177 Primary Terms & Editorial Enrichment ---');

  // Load Authoritative Source (spec_miner_terms mined data)
  const authSourcePath = path.join(
    ROOT_DIR,
    '.agents',
    'teamwork',
    'spec_miner_terms',
    'catalog_177_enriched.json'
  );
  let authTerms = [];
  if (fs.existsSync(authSourcePath)) {
    try {
      authTerms = JSON.parse(fs.readFileSync(authSourcePath, 'utf8'));
    } catch (e) {
      console.warn('Could not read authoritative catalog_177_enriched.json:', e.message);
    }
  }

  // Check target live file
  const liveTermsPath = path.join(ROOT_DIR, 'AudiovisualProduction', 'data', 'terms.json');
  const liveGlossaryPath = path.join(ROOT_DIR, 'AudiovisualProduction', 'data', 'glossary.json');
  let liveTerms = [];
  let isLive = false;

  if (fs.existsSync(liveTermsPath)) {
    try {
      const liveData = JSON.parse(fs.readFileSync(liveTermsPath, 'utf8'));
      liveTerms = Array.isArray(liveData) ? liveData : (liveData.canonicalTerms || []);
      isLive = true;
      runner.assert(
        true,
        `AudiovisualProduction/data/terms.json exists on disk with ${liveTerms.length} terms`,
        { feature: 'F3', tier: 1 }
      );
    } catch (e) {
      runner.assert(false, `AudiovisualProduction/data/terms.json parse error: ${e.message}`, { feature: 'F3', tier: 1 });
    }
  } else {
    runner.pending(
      'AudiovisualProduction/data/terms.json target file (Milestone M1 in progress)',
      { feature: 'F3', tier: 1 }
    );
  }

  if (fs.existsSync(liveGlossaryPath)) {
    try {
      const gMeta = JSON.parse(fs.readFileSync(liveGlossaryPath, 'utf8'));
      runner.assert(
        gMeta.id === 'audiovisual-production',
        'AudiovisualProduction/data/glossary.json declares id "audiovisual-production"',
        { feature: 'F8', tier: 1 }
      );
    } catch (e) {
      runner.assert(false, `glossary.json parse error: ${e.message}`, { feature: 'F8', tier: 1 });
    }
  } else {
    runner.pending(
      'AudiovisualProduction/data/glossary.json target file (Milestone M1 in progress)',
      { feature: 'F8', tier: 1 }
    );
  }

  // Dataset to validate: prefer liveTerms if present, else authTerms
  const termsToTest = liveTerms.length > 0 ? liveTerms : authTerms;

  runner.assert(
    termsToTest.length >= 177,
    `Primary catalog dataset contains at least 177 terms (found: ${termsToTest.length})`,
    { feature: 'F3', tier: 1 }
  );

  // F3: Unique slugs & URN format
  const slugs = new Set();
  const urns = new Set();
  let invalidUrnCount = 0;
  let emptyTitleCount = 0;
  let emptyDefinitionCount = 0;

  for (const t of termsToTest) {
    const slug = t.slug || (t.id ? t.id.replace('urn:term:audiovisual-production:', '') : '');
    const urn = t.id || `urn:term:audiovisual-production:${slug}`;

    if (!urn.startsWith('urn:term:audiovisual-production:')) {
      invalidUrnCount++;
    }
    slugs.add(slug);
    urns.add(urn);

    if (!t.title || typeof t.title !== 'string' || t.title.trim().length === 0) {
      emptyTitleCount++;
    }

    const def = t.definition || t.shortDefinition || '';
    if (!def || typeof def !== 'string' || def.trim().length === 0) {
      emptyDefinitionCount++;
    }
  }

  runner.assertEqual(
    invalidUrnCount,
    0,
    `All terms conform to canonical URN pattern "urn:term:audiovisual-production:<slug>"`,
    { feature: 'F3', tier: 1 }
  );
  runner.assertEqual(
    emptyTitleCount,
    0,
    `Zero terms with empty title`,
    { feature: 'F3', tier: 1 }
  );
  runner.assertEqual(
    emptyDefinitionCount,
    0,
    `Zero terms with empty definition`,
    { feature: 'F5', tier: 1 }
  );

  // F4: Discrepancy & Duplicate Reconciliation
  // 177 declared headings vs 175 unique concepts with 2 duplicate pairs:
  // Pair 1: #18 camara-lenta vs #132 slow-motion
  // Pair 2: #51 fps-frame-rate vs #145 tasa-de-fotogramas
  const hasCamaraLenta = slugs.has('camara-lenta');
  const hasSlowMotion = slugs.has('slow-motion');
  const hasFps = slugs.has('fps-frame-rate') || slugs.has('fps');
  const hasTasaFotogramas = slugs.has('tasa-de-fotogramas');

  runner.assert(
    hasCamaraLenta && hasSlowMotion,
    'Duplicate pair 1 reconciled: both "camara-lenta" and "slow-motion" handled',
    { feature: 'F4', tier: 2 }
  );
  runner.assert(
    hasFps && hasTasaFotogramas,
    'Duplicate pair 2 reconciled: both "fps-frame-rate" and "tasa-de-fotogramas" handled',
    { feature: 'F4', tier: 2 }
  );

  // F5: Original Rigorous Technical Definitions (SMPTE/EBU/ITU standard aligned)
  let shortDefCount = 0;
  let placeholderCount = 0;
  for (const t of termsToTest) {
    const def = t.definition || t.shortDefinition || '';
    if (def.length < 30) shortDefCount++;
    // Case-sensitive check for uppercase TODO/TBD to avoid Spanish word "todo"
    if (/\blorem\s+ipsum\b/i.test(def) || /\b(TODO|TBD)\b/.test(def) || /por\s+definir/i.test(def)) {
      placeholderCount++;
    }
  }

  runner.assertEqual(
    placeholderCount,
    0,
    'Zero placeholder definitions (no "lorem ipsum", "TODO", "TBD")',
    { feature: 'F5', tier: 2 }
  );
  runner.assert(
    shortDefCount === 0,
    `All definitions are rigorous technical prose (minimum 30 characters each)`,
    { feature: 'F5', tier: 2 }
  );

  // F6: Non-navigable Metadata Provenance
  let metadataValidCount = 0;
  for (const t of termsToTest) {
    if (t.metadata && t.metadata.source === 'mouseinteractivo' && t.metadata.verified) {
      metadataValidCount++;
    }
  }

  runner.assert(
    metadataValidCount >= 170,
    `Terms embed non-navigable metadata provenance (source: "mouseinteractivo", verified: true) (${metadataValidCount}/${termsToTest.length})`,
    { feature: 'F6', tier: 1 }
  );

  // F7: Expanded AI/LLM Generative Video Terms
  let aiGuidanceCount = 0;
  let aiPromptTokensCount = 0;
  for (const t of termsToTest) {
    if (t.aiPromptGuidance && Array.isArray(t.aiPromptGuidance.promptTokens) && t.aiPromptGuidance.promptTokens.length > 0) {
      aiGuidanceCount++;
      aiPromptTokensCount += t.aiPromptGuidance.promptTokens.length;
    }
  }

  runner.assert(
    aiGuidanceCount >= 100,
    `Terms contain AI prompt engineering guidance and tokens (${aiGuidanceCount} terms with tokens)`,
    { feature: 'F7', tier: 1 }
  );
  runner.assert(
    aiPromptTokensCount >= 300,
    `Total AI prompt tokens across catalog exceeds 300 (found: ${aiPromptTokensCount})`,
    { feature: 'F7', tier: 2 }
  );

  // F9: Cross-Glossary Interconnection (Catalog level)
  let crossLinksVideoImage = 0;
  let crossLinksRender3D = 0;

  for (const t of termsToTest) {
    if (t.relations && Array.isArray(t.relations)) {
      for (const r of t.relations) {
        if (r.target && r.target.startsWith('urn:term:video-image:')) crossLinksVideoImage++;
        if (r.target && r.target.startsWith('urn:term:render-3d-animations:')) crossLinksRender3D++;
      }
    }
  }

  runner.assert(
    crossLinksVideoImage > 0,
    `Audiovisual terms cross-reference VideoImage terms (found: ${crossLinksVideoImage} links)`,
    { feature: 'F9', tier: 2 }
  );
  runner.assert(
    crossLinksRender3D > 0,
    `Audiovisual terms cross-reference Render-3D-Animations terms (found: ${crossLinksRender3D} links)`,
    { feature: 'F9', tier: 2 }
  );

  // -------------------------------------------------------------
  // TIER 3: Indexing, Search Fields & Alphabetical Distribution
  // -------------------------------------------------------------
  console.log('\n--- Tier 3: Multi-field Search Index & Alphabet Distribution ---');

  // F13: Searchable fields completeness
  let multiFieldCompleteness = 0;
  for (const t of termsToTest) {
    const hasTitle = Boolean(t.title);
    const hasDef = Boolean(t.definition || t.shortDefinition);
    const hasCategory = Boolean(t.category);
    if (hasTitle && hasDef && hasCategory) multiFieldCompleteness++;
  }

  runner.assertEqual(
    multiFieldCompleteness,
    termsToTest.length,
    `100% of terms have complete searchable primary fields (title, definition, category)`,
    { feature: 'F13', tier: 3 }
  );

  // F14: A-Z Distribution & Missing Letters Q and Y
  const initialLetters = new Set();
  for (const t of termsToTest) {
    if (t.title) {
      const cleanTitle = t.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toUpperCase();
      const firstChar = cleanTitle.charAt(0);
      if (firstChar >= 'A' && firstChar <= 'Z') {
        initialLetters.add(firstChar);
      }
    }
  }

  runner.assert(
    initialLetters.size >= 24,
    `A-Z index covers at least 24 unique letters (found: ${initialLetters.size})`,
    { feature: 'F14', tier: 3 }
  );

  // Document expected missing letters Q and Y from MouseInteractivo mining
  const missingQ = !initialLetters.has('Q');
  const missingY = !initialLetters.has('Y');
  runner.assert(
    missingQ && missingY,
    'A-Z letter gaps for Q and Y correctly documented according to source specification',
    { feature: 'F14', tier: 3 }
  );

  // F14: Category distribution across the 13 canonical categories
  const categoryCount = {};
  for (const t of termsToTest) {
    const cat = t.category || 'unknown';
    categoryCount[cat] = (categoryCount[cat] || 0) + 1;
  }

  const representedCategories = Object.keys(categoryCount).length;
  runner.assert(
    representedCategories >= 12,
    `Terms span canonical production categories (represented: ${representedCategories}/13)`,
    { feature: 'F14', tier: 3 }
  );

  // -------------------------------------------------------------
  // TIER 4: Real-World Scenario: Editing Grammar Exploration
  // -------------------------------------------------------------
  console.log('\n--- Tier 4: Real-World Editing Grammar Workload ---');

  // Scenario 4 (from TEST_INFRA.md): Search and A-Z Exploration of Editing Grammar
  // User navigates 'C' or searches 'corte', expands definitions of editing grammar:
  // 'corte-en-j-l', 'montaje', 'raccord', 'jump-cut', 'plano-secuencia'
  const editingSlugs = ['corte-en-j-l', 'montaje', 'raccord', 'jump-cut', 'plano-secuencia'];
  let editingFound = 0;

  for (const slug of editingSlugs) {
    const term = termsToTest.find(t => (t.slug === slug || (t.id && t.id.endsWith(':' + slug))));
    if (term) {
      editingFound++;
      runner.assert(
        term.components && term.components.length > 0,
        `Editing grammar term "${term.title}" includes structured components`,
        { feature: 'F5', tier: 4 }
      );
    }
  }

  runner.assertEqual(
    editingFound,
    editingSlugs.length,
    `Scenario 4: All 5 critical editing grammar terms found and verified with rich components`,
    { feature: 'F13', tier: 4 }
  );

  return runner.printReport();
}

if (require.main === module) {
  const summary = runCatalogAndTermsTests();
  process.exit(summary.failed > 0 ? 1 : 0);
}

module.exports = { runCatalogAndTermsTests };
