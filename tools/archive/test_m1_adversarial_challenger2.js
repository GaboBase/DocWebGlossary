/**
 * DOCWEB MULTIGLOSSARY — Milestone 1 Empirical Adversarial Challenge Test Suite
 * Agent: challenger_m1_2 (Empirical Adversarial Challenger)
 * Focus:
 *   - Term count vs mouseinteractivo source (177 source terms accounted for, indexes 1-177 preserved)
 *   - Category distribution across all 13 categories (no empty categories, no undefined)
 *   - Field completeness (no empty strings for definition, title, slug, components, applications, examples)
 *   - Backward compatibility (Render-3D-Animations, VideoImage, catalog.json preservation)
 *   - Adversarial stress tests (self-relations, duplicate relations, slug boundaries, offline autonomy)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { ROOT_DIR, TestRunner } = require('./test_utils');

function runChallenger2Tests() {
  const runner = new TestRunner('Challenger M1-2: Completeness, Boundaries & Backward Compatibility Suite');
  console.log(`\n=== Running ${runner.suiteName} ===`);

  // Paths
  const catalogPath = path.join(ROOT_DIR, 'app', 'data', 'catalog.json');
  const avTermsPath = path.join(ROOT_DIR, 'AudiovisualProduction', 'data', 'terms.json');
  const avGlossaryPath = path.join(ROOT_DIR, 'AudiovisualProduction', 'data', 'glossary.json');
  const r3dTermsPath = path.join(ROOT_DIR, 'Render-3D-Animations', 'data', 'terms.json');
  const viTermsPath = path.join(ROOT_DIR, 'VideoImage', 'data', 'terms.json');
  const r3dGlossaryPath = path.join(ROOT_DIR, 'Render-3D-Animations', 'data', 'glossary.json');
  const viGlossaryPath = path.join(ROOT_DIR, 'VideoImage', 'data', 'glossary.json');
  const srcEnrichedPath = path.join(ROOT_DIR, '.agents', 'teamwork', 'spec_miner_terms', 'catalog_177_enriched.json');

  // Load JSON artifacts
  let catalog, avTermsData, avGlossary, r3dTermsData, viTermsData, r3dGlossary, viGlossary, srcEnriched;

  try {
    catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
    avTermsData = JSON.parse(fs.readFileSync(avTermsPath, 'utf8'));
    avGlossary = JSON.parse(fs.readFileSync(avGlossaryPath, 'utf8'));
    r3dTermsData = JSON.parse(fs.readFileSync(r3dTermsPath, 'utf8'));
    viTermsData = JSON.parse(fs.readFileSync(viTermsPath, 'utf8'));
    r3dGlossary = JSON.parse(fs.readFileSync(r3dGlossaryPath, 'utf8'));
    viGlossary = JSON.parse(fs.readFileSync(viGlossaryPath, 'utf8'));
    srcEnriched = JSON.parse(fs.readFileSync(srcEnrichedPath, 'utf8'));
  } catch (err) {
    runner.assert(false, `Critical failure loading JSON artifacts: ${err.message}`, { feature: 'F24', tier: 1 });
    return runner.printReport();
  }

  const avTerms = avTermsData.canonicalTerms || [];
  const r3dTerms = r3dTermsData.canonicalTerms || [];
  const viTerms = viTermsData.canonicalTerms || [];

  // =========================================================================
  // SECTION 1: SOURCE CONTINUITY & TERM COUNT (177 SOURCE TERMS + INDEXES 1-177)
  // =========================================================================
  console.log('\n--- Section 1: Source Continuity & Term Count (177 Terms + Indexes 1-177) ---');

  runner.assertEqual(
    srcEnriched.length,
    177,
    'Authoritative source catalog contains exactly 177 terms',
    { feature: 'F3', tier: 1 }
  );

  runner.assertEqual(
    avTerms.length,
    185,
    'AudiovisualProduction canonicalTerms contains exactly 185 terms (177 base + 8 expanded)',
    { feature: 'F3', tier: 1 }
  );

  // Map AV terms by sourceIndex and slug
  const avByIndex = new Map();
  const avBySlug = new Map();
  const duplicateSourceIndexes = [];
  const duplicateSlugs = [];

  for (const t of avTerms) {
    // Slug uniqueness
    if (avBySlug.has(t.slug)) {
      duplicateSlugs.push(t.slug);
    } else {
      avBySlug.set(t.slug, t);
    }

    // Source index uniqueness
    if (t.metadata && typeof t.metadata.sourceIndex === 'number') {
      const idx = t.metadata.sourceIndex;
      if (avByIndex.has(idx)) {
        duplicateSourceIndexes.push({ idx, slug1: avByIndex.get(idx).slug, slug2: t.slug });
      } else {
        avByIndex.set(idx, t);
      }
    }
  }

  runner.assertEqual(
    duplicateSlugs.length,
    0,
    'Zero duplicate slugs across AudiovisualProduction terms',
    { feature: 'F3', tier: 1 }
  );

  runner.assertEqual(
    duplicateSourceIndexes.length,
    0,
    'Zero duplicate sourceIndex values across AudiovisualProduction terms',
    { feature: 'F3', tier: 1 }
  );

  // Assert all 177 source indexes 1..177 are preserved
  const missingSourceIndexes = [];
  for (let i = 1; i <= 177; i++) {
    if (!avByIndex.has(i)) {
      missingSourceIndexes.push(i);
    }
  }

  runner.assertEqual(
    missingSourceIndexes.length,
    0,
    `All 177 source indexes (1 through 177) are strictly preserved (missing: ${missingSourceIndexes.length})`,
    { feature: 'F3', tier: 1 }
  );

  // Check 1-to-1 match of source terms from catalog_177_enriched
  let sourceMappingFailures = 0;
  for (const s of srcEnriched) {
    const avTerm = avByIndex.get(s.index);
    if (!avTerm) {
      sourceMappingFailures++;
    } else {
      if (avTerm.metadata.source !== 'mouseinteractivo') {
        sourceMappingFailures++;
      }
    }
  }

  runner.assertEqual(
    sourceMappingFailures,
    0,
    'All 177 source terms map to an existing term with metadata.source === "mouseinteractivo"',
    { feature: 'F3', tier: 2 }
  );

  // Assert the 8 expanded terms occupy indexes 178 through 185
  const expandedTerms = avTerms.filter(t => t.metadata && t.metadata.sourceIndex > 177);
  runner.assertEqual(
    expandedTerms.length,
    8,
    'Exactly 8 expanded terms present with sourceIndex > 177',
    { feature: 'F7', tier: 1 }
  );

  const missingExpandedIndexes = [];
  for (let i = 178; i <= 185; i++) {
    if (!avByIndex.has(i)) {
      missingExpandedIndexes.push(i);
    }
  }
  runner.assertEqual(
    missingExpandedIndexes.length,
    0,
    'Expanded AI video terms strictly occupy contiguous indexes 178 through 185',
    { feature: 'F7', tier: 2 }
  );

  for (const exp of expandedTerms) {
    runner.assert(
      exp.metadata.source === 'ai_video_taxonomy_expansion',
      `Expanded term "${exp.slug}" has metadata.source === "ai_video_taxonomy_expansion"`,
      { feature: 'F7', tier: 2 }
    );
  }

  // =========================================================================
  // SECTION 2: DISCREPANCY & DUPLICATE RECONCILIATION (#18/#132, #51/#145)
  // =========================================================================
  console.log('\n--- Section 2: Duplicate Reconciliation Stress-Test ---');

  // Pair 1: #18 camara-lenta vs #132 slow-motion
  const t18 = avByIndex.get(18);
  const t132 = avByIndex.get(132);

  runner.assert(
    Boolean(t18 && t132),
    'Both terms in duplicate pair 1 (#18 camara-lenta and #132 slow-motion) exist',
    { feature: 'F4', tier: 2 }
  );

  if (t18 && t132) {
    runner.assert(
      t18.slug !== t132.slug && t18.id !== t132.id,
      'Duplicate pair 1 has distinct slugs and distinct URNs',
      { feature: 'F4', tier: 2 }
    );
    runner.assert(
      t18.definition !== t132.definition,
      'Duplicate pair 1 terms have distinct, nuanced definitions',
      { feature: 'F4', tier: 2 }
    );
    const t18LinksTo132 = (t18.relations || []).some(r => r.type === 'alternativeTo' && r.target === t132.id);
    const t132LinksTo18 = (t132.relations || []).some(r => r.type === 'alternativeTo' && r.target === t18.id);
    runner.assert(
      t18LinksTo132 && t132LinksTo18,
      'Duplicate pair 1 terms mutually reference each other via "alternativeTo"',
      { feature: 'F4', tier: 2 }
    );
  }

  // Pair 2: #51 fps-frame-rate vs #145 tasa-de-fotogramas
  const t51 = avByIndex.get(51);
  const t145 = avByIndex.get(145);

  runner.assert(
    Boolean(t51 && t145),
    'Both terms in duplicate pair 2 (#51 fps-frame-rate and #145 tasa-de-fotogramas) exist',
    { feature: 'F4', tier: 2 }
  );

  if (t51 && t145) {
    runner.assert(
      t51.slug !== t145.slug && t51.id !== t145.id,
      'Duplicate pair 2 has distinct slugs and distinct URNs',
      { feature: 'F4', tier: 2 }
    );
    runner.assert(
      t51.definition !== t145.definition,
      'Duplicate pair 2 terms have distinct, nuanced definitions',
      { feature: 'F4', tier: 2 }
    );
    const t51LinksTo145 = (t51.relations || []).some(r => r.type === 'alternativeTo' && r.target === t145.id);
    const t145LinksTo51 = (t145.relations || []).some(r => r.type === 'alternativeTo' && r.target === t51.id);
    runner.assert(
      t51LinksTo145 && t145LinksTo51,
      'Duplicate pair 2 terms mutually reference each other via "alternativeTo"',
      { feature: 'F4', tier: 2 }
    );
  }

  // =========================================================================
  // SECTION 3: CATEGORY DISTRIBUTION ACROSS ALL 13 CATEGORIES
  // =========================================================================
  console.log('\n--- Section 3: Category Distribution Across All 13 Categories ---');

  const EXPECTED_13_CATEGORIES = [
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

  runner.assertEqual(
    avGlossary.categories.length,
    13,
    'AudiovisualProduction/data/glossary.json defines exactly 13 categories',
    { feature: 'F14', tier: 1 }
  );

  const avCatalogEntry = catalog.canonicalGlossaries.find(g => g.id === 'audiovisual-production');
  runner.assert(
    Boolean(avCatalogEntry),
    'audiovisual-production registered in catalog.json',
    { feature: 'F8', tier: 1 }
  );

  if (avCatalogEntry) {
    runner.assertEqual(
      avCatalogEntry.categories.length,
      13,
      'catalog.json audiovisual-production entry lists exactly 13 categories',
      { feature: 'F8', tier: 1 }
    );

    const catalogMatchesGlossary = EXPECTED_13_CATEGORIES.every(c => avCatalogEntry.categories.includes(c));
    runner.assert(
      catalogMatchesGlossary,
      'catalog.json categories match the 13 canonical category slugs',
      { feature: 'F8', tier: 2 }
    );
  }

  // Check category completeness and distribution
  const termCategoryCounts = {};
  for (const c of EXPECTED_13_CATEGORIES) {
    termCategoryCounts[c] = 0;
  }

  let termsWithInvalidCategory = 0;
  let termsWithUndefinedCategory = 0;

  for (const t of avTerms) {
    if (!t.category) {
      termsWithUndefinedCategory++;
    } else if (!EXPECTED_13_CATEGORIES.includes(t.category)) {
      termsWithInvalidCategory++;
    } else {
      termCategoryCounts[t.category]++;
    }
  }

  runner.assertEqual(
    termsWithUndefinedCategory,
    0,
    'Zero terms have undefined or missing category',
    { feature: 'F14', tier: 1 }
  );

  runner.assertEqual(
    termsWithInvalidCategory,
    0,
    'Zero terms have an uncanonical or unknown category',
    { feature: 'F14', tier: 1 }
  );

  // Verify no category is empty
  let emptyCategoryCount = 0;
  for (const [cat, count] of Object.entries(termCategoryCounts)) {
    if (count === 0) {
      emptyCategoryCount++;
    }
  }

  runner.assertEqual(
    emptyCategoryCount,
    0,
    'All 13 categories have at least one term assigned (no empty/orphan categories)',
    { feature: 'F14', tier: 2 }
  );

  // Robustness check: each category has >= 5 terms
  let thinCategoryCount = 0;
  for (const [cat, count] of Object.entries(termCategoryCounts)) {
    if (count < 5) {
      thinCategoryCount++;
    }
  }

  runner.assertEqual(
    thinCategoryCount,
    0,
    'Every single category contains at least 5 terms for robust navigation',
    { feature: 'F14', tier: 3 }
  );

  // =========================================================================
  // SECTION 4: EXHAUSTIVE FIELD COMPLETENESS & SCHEMA BOUNDARY AUDIT
  // =========================================================================
  console.log('\n--- Section 4: Exhaustive Field Completeness & Schema Boundaries ---');

  let emptyTitleCount = 0;
  let emptySlugCount = 0;
  let malformedSlugCount = 0;
  let mismatchedIdSlugCount = 0;
  let emptyDefCount = 0;
  let shortDefCount = 0;
  let emptyExtDefCount = 0;
  let missingComponentsCount = 0;
  let emptyComponentsCount = 0;
  let emptyComponentItemCount = 0;
  let missingApplicationsCount = 0;
  let emptyApplicationsCount = 0;
  let missingExamplesCount = 0;
  let emptyExamplesCount = 0;
  let invalidAiTokensCount = 0;
  let missingMetadataCount = 0;

  for (const t of avTerms) {
    const slug = t.slug || '';
    // Title
    if (!t.title || typeof t.title !== 'string' || t.title.trim().length === 0) {
      emptyTitleCount++;
    }

    // Slug
    if (!t.slug || typeof t.slug !== 'string' || t.slug.trim().length === 0) {
      emptySlugCount++;
    } else if (!/^[a-z0-9-]+$/.test(t.slug)) {
      malformedSlugCount++;
    }

    // URN id
    if (t.id !== `urn:term:audiovisual-production:${t.slug}`) {
      mismatchedIdSlugCount++;
    }

    // Definition
    if (!t.definition || typeof t.definition !== 'string' || t.definition.trim().length === 0) {
      emptyDefCount++;
    } else if (t.definition.trim().length < 30) {
      shortDefCount++;
    }

    // Extended Definition
    if (!t.extendedDefinition || typeof t.extendedDefinition !== 'string' || t.extendedDefinition.trim().length === 0) {
      emptyExtDefCount++;
    }

    // Components
    if (!t.components || !Array.isArray(t.components)) {
      missingComponentsCount++;
    } else if (t.components.length === 0) {
      emptyComponentsCount++;
    } else {
      for (const c of t.components) {
        if (!c || typeof c !== 'string' || c.trim().length === 0) {
          emptyComponentItemCount++;
        }
      }
    }

    // Applications
    if (!t.applications || !Array.isArray(t.applications)) {
      missingApplicationsCount++;
    } else if (t.applications.length === 0) {
      emptyApplicationsCount++;
    }

    // Examples
    if (!t.examples || !Array.isArray(t.examples)) {
      missingExamplesCount++;
    } else if (t.examples.length === 0) {
      emptyExamplesCount++;
    }

    // AI Prompt Guidance
    if (!t.aiPromptGuidance || !Array.isArray(t.aiPromptGuidance.promptTokens) || t.aiPromptGuidance.promptTokens.length === 0) {
      invalidAiTokensCount++;
    }

    // Metadata
    if (!t.metadata || !t.metadata.source || typeof t.metadata.sourceIndex !== 'number' || !t.metadata.verified) {
      missingMetadataCount++;
    }
  }

  runner.assertEqual(emptyTitleCount, 0, 'Zero terms with empty title', { feature: 'F3', tier: 1 });
  runner.assertEqual(emptySlugCount, 0, 'Zero terms with empty slug', { feature: 'F3', tier: 1 });
  runner.assertEqual(malformedSlugCount, 0, 'All slugs match strict URL-safe pattern /^[a-z0-9-]+$/', { feature: 'F3', tier: 2 });
  runner.assertEqual(mismatchedIdSlugCount, 0, '100% of terms conform to URN id === "urn:term:audiovisual-production:<slug>"', { feature: 'F3', tier: 1 });
  runner.assertEqual(emptyDefCount, 0, 'Zero terms with empty definition', { feature: 'F5', tier: 1 });
  runner.assertEqual(shortDefCount, 0, 'All definitions satisfy minimum length requirement (>= 30 characters)', { feature: 'F5', tier: 2 });
  runner.assertEqual(emptyExtDefCount, 0, 'Zero terms with empty extendedDefinition', { feature: 'F5', tier: 2 });
  runner.assertEqual(missingComponentsCount, 0, '100% of terms have components array', { feature: 'F5', tier: 2 });
  runner.assertEqual(emptyComponentsCount, 0, 'Zero terms have empty components array', { feature: 'F5', tier: 2 });
  runner.assertEqual(emptyComponentItemCount, 0, 'Zero component items are empty strings', { feature: 'F5', tier: 2 });
  runner.assertEqual(missingApplicationsCount, 0, '100% of terms have applications array', { feature: 'F5', tier: 2 });
  runner.assertEqual(emptyApplicationsCount, 0, 'Zero terms have empty applications array', { feature: 'F5', tier: 2 });
  runner.assertEqual(missingExamplesCount, 0, '100% of terms have examples array', { feature: 'F5', tier: 2 });
  runner.assertEqual(emptyExamplesCount, 0, 'Zero terms have empty examples array', { feature: 'F5', tier: 2 });
  runner.assertEqual(invalidAiTokensCount, 0, '100% of terms have aiPromptGuidance with non-empty promptTokens', { feature: 'F7', tier: 2 });
  runner.assertEqual(missingMetadataCount, 0, '100% of terms have verified non-navigable metadata provenance', { feature: 'F6', tier: 1 });

  // =========================================================================
  // SECTION 5: RELATIONAL GRAPH INTEGRITY & CROSS-GLOSSARY RESOLUTION
  // =========================================================================
  console.log('\n--- Section 5: Relational Graph Integrity & Cross-Glossary Links ---');

  const allKnownUrns = new Set([
    ...avTerms.map(t => t.id),
    ...r3dTerms.map(t => t.id),
    ...viTerms.map(t => t.id)
  ]);

  let totalRelations = 0;
  let brokenRelationTargets = [];
  let selfReferencingRelations = [];
  let exactDuplicateRelations = [];
  let crossLinksVideoImage = 0;
  let crossLinksRender3D = 0;

  for (const t of avTerms) {
    const seenEdges = new Set();
    for (const r of (t.relations || [])) {
      totalRelations++;

      // Check broken target
      if (!allKnownUrns.has(r.target)) {
        brokenRelationTargets.push({ from: t.slug, target: r.target, type: r.type });
      }

      // Check self reference
      if (r.target === t.id) {
        selfReferencingRelations.push({ from: t.slug, target: r.target });
      }

      // Check exact duplicate edge
      const edgeKey = `${r.type}:::${r.target}`;
      if (seenEdges.has(edgeKey)) {
        exactDuplicateRelations.push({ from: t.slug, edgeKey });
      }
      seenEdges.add(edgeKey);

      // Cross-glossary tallies
      if (r.target.startsWith('urn:term:video-image:')) crossLinksVideoImage++;
      if (r.target.startsWith('urn:term:render-3d-animations:')) crossLinksRender3D++;
    }
  }

  runner.assert(
    totalRelations >= 800,
    `Total relations in AudiovisualProduction exceeds 800 (found: ${totalRelations})`,
    { feature: 'F10', tier: 2 }
  );

  runner.assertEqual(
    brokenRelationTargets.length,
    0,
    `Zero broken target references in relations (dangling URNs: ${brokenRelationTargets.length})`,
    { feature: 'F10', tier: 2 }
  );

  runner.assertEqual(
    selfReferencingRelations.length,
    0,
    'Zero self-referencing relations (terms pointing to themselves)',
    { feature: 'F10', tier: 2 }
  );

  runner.assertEqual(
    exactDuplicateRelations.length,
    0,
    'Zero duplicate relation edges on the same term',
    { feature: 'F10', tier: 2 }
  );

  runner.assert(
    crossLinksVideoImage > 0,
    `Audiovisual terms cross-link to VideoImage (found: ${crossLinksVideoImage} links)`,
    { feature: 'F9', tier: 2 }
  );

  runner.assert(
    crossLinksRender3D > 0,
    `Audiovisual terms cross-link to Render-3D-Animations (found: ${crossLinksRender3D} links)`,
    { feature: 'F9', tier: 2 }
  );

  // =========================================================================
  // SECTION 6: BACKWARD COMPATIBILITY & REPOSITORY INTEGRITY
  // =========================================================================
  console.log('\n--- Section 6: Backward Compatibility & Repository Preservation ---');

  // Verify catalog.json has 3 glossaries
  runner.assertEqual(
    catalog.canonicalGlossaries.length,
    3,
    'catalog.json canonicalGlossaries contains exactly 3 glossaries',
    { feature: 'F8', tier: 1 }
  );

  // Verify Render-3D-Animations & VideoImage data structures
  runner.assertEqual(
    r3dTerms.length,
    10,
    'Render-3D-Animations preserves all 10 canonical terms',
    { feature: 'F1', tier: 1 }
  );

  runner.assertEqual(
    viTerms.length,
    10,
    'VideoImage preserves all 10 canonical terms',
    { feature: 'F1', tier: 1 }
  );

  // Check git status against HEAD for existing files
  const preservedFiles = [
    'index.html',
    'audit_autonomy.js',
    'app/css/app.css',
    'app/js/app.js',
    'app/js/semantic-engine.js',
    'app/js/storage.js',
    'Render-3D-Animations/data/glossary.json',
    'Render-3D-Animations/data/terms.json',
    'VideoImage/data/glossary.json',
    'VideoImage/data/terms.json'
  ];

  let modifiedPreservedFiles = 0;
  for (const file of preservedFiles) {
    try {
      const diff = execSync(`git diff HEAD -- ${file}`, { encoding: 'utf8' }).trim();
      if (diff.length > 0) {
        modifiedPreservedFiles++;
      }
    } catch (e) {
      // Git command error
    }
  }

  runner.assertEqual(
    modifiedPreservedFiles,
    0,
    'All 10 pre-existing core files are strictly unmodified compared to git HEAD',
    { feature: 'F1', tier: 1 }
  );

  // Check that the two preexisting entries in catalog.json are byte-for-byte identical to HEAD
  try {
    const headCatalog = JSON.parse(execSync('git show HEAD:app/data/catalog.json', { encoding: 'utf8' }));
    const headR3d = headCatalog.canonicalGlossaries.find(g => g.id === 'render-3d-animations');
    const currR3d = catalog.canonicalGlossaries.find(g => g.id === 'render-3d-animations');
    const headVi = headCatalog.canonicalGlossaries.find(g => g.id === 'video-image');
    const currVi = catalog.canonicalGlossaries.find(g => g.id === 'video-image');

    runner.assertDeepEqual(
      currR3d,
      headR3d,
      'Preexisting "render-3d-animations" catalog entry matches HEAD exactly',
      { feature: 'F1', tier: 2 }
    );

    runner.assertDeepEqual(
      currVi,
      headVi,
      'Preexisting "video-image" catalog entry matches HEAD exactly',
      { feature: 'F1', tier: 2 }
    );
  } catch (err) {
    runner.assert(false, `Git HEAD catalog comparison failed: ${err.message}`, { feature: 'F1', tier: 2 });
  }

  // =========================================================================
  // SECTION 7: 100% OFFLINE AUTONOMY GUARANTEE (NO REMOTE URLS)
  // =========================================================================
  console.log('\n--- Section 7: 100% Offline Autonomy Guarantee ---');

  const termsRaw = fs.readFileSync(avTermsPath, 'utf8');
  const glossaryRaw = fs.readFileSync(avGlossaryPath, 'utf8');
  const catalogRaw = fs.readFileSync(catalogPath, 'utf8');

  // Check for any http:// or https:// in terms, glossary, catalog
  const urlRegex = /(https?:\/\/[^\s\"\'<>]+)/g;
  const termsUrls = termsRaw.match(urlRegex) || [];
  const glossaryUrls = glossaryRaw.match(urlRegex) || [];
  const catalogUrls = catalogRaw.match(urlRegex) || [];

  runner.assertEqual(
    termsUrls.length,
    0,
    `Zero external URLs found in AudiovisualProduction/data/terms.json (found: ${termsUrls.length})`,
    { feature: 'F2', tier: 1 }
  );

  runner.assertEqual(
    glossaryUrls.length,
    0,
    `Zero external URLs found in AudiovisualProduction/data/glossary.json (found: ${glossaryUrls.length})`,
    { feature: 'F2', tier: 1 }
  );

  runner.assertEqual(
    catalogUrls.length,
    0,
    `Zero external URLs found in app/data/catalog.json (found: ${catalogUrls.length})`,
    { feature: 'F2', tier: 1 }
  );

  return runner.printReport();
}

if (require.main === module) {
  const summary = runChallenger2Tests();
  process.exit(summary.failed > 0 ? 1 : 0);
}

module.exports = { runChallenger2Tests };
