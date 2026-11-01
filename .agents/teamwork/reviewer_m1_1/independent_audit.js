/**
 * Independent Reviewer Audit Script for Milestone 1
 * Written by reviewer_m1_1
 * Performs exhaustive adversarial validation of all M1 artifacts.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../../..');
const GLOSSARY_PATH = path.join(ROOT_DIR, 'AudiovisualProduction/data/glossary.json');
const TERMS_PATH = path.join(ROOT_DIR, 'AudiovisualProduction/data/terms.json');
const CATALOG_PATH = path.join(ROOT_DIR, 'app/data/catalog.json');
const VIDEO_IMAGE_PATH = path.join(ROOT_DIR, 'VideoImage/data/terms.json');
const RENDER_3D_PATH = path.join(ROOT_DIR, 'Render-3D-Animations/data/terms.json');
const SOURCE_177_PATH = path.join(ROOT_DIR, '.agents/teamwork/spec_miner_terms/catalog_177_enriched.json');

const CANONICAL_CATEGORIES = [
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

const CANONICAL_RELATION_TYPES = [
  'isTypeOf', 'hasSubtype',
  'isPartOf', 'composedOf',
  'contains', 'containedIn',
  'specializesIn', 'moreGeneralThan',
  'dependsOn', 'dependencyOf',
  'requires', 'requiredBy',
  'precedes', 'succeeds',
  'produces', 'producedBy',
  'usedFor', 'uses',
  'compatibleWith',
  'alternativeTo',
  'differsFrom',
  'relatedTo',
  'hasInput', 'isInputTo',
  'hasOutput', 'isOutputOf'
];

const results = {
  passed: 0,
  failed: 0,
  findings: []
};

function assert(condition, message, details = null) {
  if (condition) {
    results.passed++;
    console.log(`[PASS] ${message}`);
  } else {
    results.failed++;
    const finding = { message, details };
    results.findings.push(finding);
    console.error(`[FAIL] ${message}`, details ? JSON.stringify(details) : '');
  }
}

console.log('====================================================');
console.log('   INDEPENDENT AUDIT: MILESTONE 1 VERIFICATION     ');
console.log('====================================================\n');

// 1. Audit catalog.json
console.log('--- 1. AUDITING app/data/catalog.json ---');
assert(fs.existsSync(CATALOG_PATH), 'catalog.json exists');
const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
assert(Array.isArray(catalog.canonicalGlossaries), 'canonicalGlossaries is an array');
assert(catalog.canonicalGlossaries.length === 3, `canonicalGlossaries has exactly 3 glossaries (found: ${catalog.canonicalGlossaries.length})`);

const catIds = catalog.canonicalGlossaries.map(g => g.id);
assert(catIds.includes('render-3d-animations'), 'catalog preserves render-3d-animations');
assert(catIds.includes('video-image'), 'catalog preserves video-image');
assert(catIds.includes('audiovisual-production'), 'catalog registers audiovisual-production');

const avEntry = catalog.canonicalGlossaries.find(g => g.id === 'audiovisual-production');
if (avEntry) {
  assert(avEntry.slug === 'audiovisual-production', 'audiovisual-production slug is valid');
  assert(fs.existsSync(path.join(ROOT_DIR, avEntry.dataPath)), `dataPath exists: ${avEntry.dataPath}`);
  assert(fs.existsSync(path.join(ROOT_DIR, avEntry.metadataPath)), `metadataPath exists: ${avEntry.metadataPath}`);
  assert(avEntry.termCount === 185, `termCount matches 185 (found: ${avEntry.termCount})`);
  assert(Array.isArray(avEntry.categories) && avEntry.categories.length === 13, `declared categories has 13 items (found: ${avEntry.categories.length})`);
}

// 2. Audit glossary.json
console.log('\n--- 2. AUDITING AudiovisualProduction/data/glossary.json ---');
assert(fs.existsSync(GLOSSARY_PATH), 'glossary.json exists');
const glossary = JSON.parse(fs.readFileSync(GLOSSARY_PATH, 'utf8'));
assert(glossary.id === 'audiovisual-production', 'glossary ID is audiovisual-production');
assert(glossary.slug === 'audiovisual-production', 'glossary slug is audiovisual-production');
assert(glossary.termCount === 185, `glossary termCount is 185 (found: ${glossary.termCount})`);
assert(Array.isArray(glossary.categories), 'categories is an array');
assert(glossary.categories.length === 13, `exactly 13 categories declared (found: ${glossary.categories.length})`);

const missingCats = CANONICAL_CATEGORIES.filter(c => !glossary.categories.includes(c));
assert(missingCats.length === 0, 'all 13 canonical categories are present', { missingCats });

assert(typeof glossary.categoryDetails === 'object' && glossary.categoryDetails !== null, 'categoryDetails object present');
const detailKeys = Object.keys(glossary.categoryDetails || {});
assert(detailKeys.length === 13, `categoryDetails has details for all 13 categories (found: ${detailKeys.length})`);
for (const cat of CANONICAL_CATEGORIES) {
  const cd = glossary.categoryDetails[cat];
  assert(cd && typeof cd.name === 'string' && cd.name.length > 0, `categoryDetails[${cat}] has non-empty name`);
  assert(cd && typeof cd.description === 'string' && cd.description.length > 0, `categoryDetails[${cat}] has non-empty description`);
}

// 3. Audit External/Preexisting IDs for Relation Targets
console.log('\n--- 3. LOADING KNOWN ENTITY IDS ---');
assert(fs.existsSync(VIDEO_IMAGE_PATH), 'VideoImage terms.json exists');
assert(fs.existsSync(RENDER_3D_PATH), 'Render-3D-Animations terms.json exists');
const viData = JSON.parse(fs.readFileSync(VIDEO_IMAGE_PATH, 'utf8'));
const r3dData = JSON.parse(fs.readFileSync(RENDER_3D_PATH, 'utf8'));

const knownViIds = new Set(viData.canonicalTerms.map(t => t.id));
const knownR3dIds = new Set(r3dData.canonicalTerms.map(t => t.id));
console.log(`VideoImage IDs loaded: ${knownViIds.size}`);
console.log(`Render3D IDs loaded: ${knownR3dIds.size}`);

// 4. Audit terms.json Structure and Terms
console.log('\n--- 4. AUDITING AudiovisualProduction/data/terms.json ---');
assert(fs.existsSync(TERMS_PATH), 'terms.json exists');
const termsObj = JSON.parse(fs.readFileSync(TERMS_PATH, 'utf8'));
assert(typeof termsObj === 'object' && termsObj !== null, 'terms.json is a valid JSON object');
assert(termsObj.id === 'audiovisual-production', 'termsObj.id is audiovisual-production');
assert(Array.isArray(termsObj.canonicalTerms), 'termsObj.canonicalTerms is an array');
const terms = termsObj.canonicalTerms;
assert(terms.length === 185, `canonicalTerms count is exactly 185 (found: ${terms.length})`);

const avIds = new Set();
const avSlugs = new Set();
let invalidUrns = [];
let mismatchedSlugs = [];
let emptyTitles = [];
let emptyDefinitions = [];
let shortDefinitions = [];
let emptyExtended = [];
let invalidCategories = [];
let missingComponents = [];
let missingApplications = [];
let missingExamples = [];
let missingAiGuidance = [];
let lowTokenCount = [];
let invalidRelationTypes = [];
let brokenRelationTargets = [];
let selfLoopRelations = [];
let totalRelationsCount = 0;
let crossViCount = 0;
let crossR3dCount = 0;
let forbiddenUrlsFound = [];

// Regex to detect external network URLs
const urlRegex = /(https?:\/\/[^\s"']+)/g;

for (const t of terms) {
  // Check ID & URN
  if (!t.id || !t.id.startsWith('urn:term:audiovisual-production:')) {
    invalidUrns.push({ id: t.id, title: t.title });
  }
  const expectedUrn = `urn:term:audiovisual-production:${t.slug}`;
  if (t.id !== expectedUrn) {
    mismatchedSlugs.push({ id: t.id, slug: t.slug });
  }

  if (avIds.has(t.id)) {
    assert(false, `Duplicate term ID found: ${t.id}`);
  }
  avIds.add(t.id);
  avSlugs.add(t.slug);

  // Check Title
  if (!t.title || typeof t.title !== 'string' || t.title.trim().length === 0) {
    emptyTitles.push(t.id);
  }

  // Check Category
  if (!CANONICAL_CATEGORIES.includes(t.category)) {
    invalidCategories.push({ id: t.id, category: t.category });
  }

  // Check Definition
  const def = t.definition || t.shortDefinition;
  if (!def || typeof def !== 'string' || def.trim().length === 0) {
    emptyDefinitions.push(t.id);
  } else if (def.trim().length < 30) {
    shortDefinitions.push({ id: t.id, length: def.trim().length });
  }

  // Check Extended Definition
  const extDef = t.extendedDefinition || t.fullDefinition;
  if (!extDef || typeof extDef !== 'string' || extDef.trim().length < 50) {
    emptyExtended.push(t.id);
  }

  // Check Components, Applications, Examples
  if (!Array.isArray(t.components) || t.components.length === 0) {
    missingComponents.push(t.id);
  }
  if (!Array.isArray(t.applications) || t.applications.length === 0) {
    missingApplications.push(t.id);
  }
  if (!Array.isArray(t.examples) || t.examples.length === 0) {
    missingExamples.push(t.id);
  }

  // Check AI Prompt Guidance
  if (!t.aiPromptGuidance || !Array.isArray(t.aiPromptGuidance.promptTokens)) {
    missingAiGuidance.push(t.id);
  } else if (t.aiPromptGuidance.promptTokens.length === 0) {
    lowTokenCount.push(t.id);
  }

  // Check Relations
  if (Array.isArray(t.relations)) {
    for (const r of t.relations) {
      totalRelationsCount++;
      if (!CANONICAL_RELATION_TYPES.includes(r.type)) {
        invalidRelationTypes.push({ from: t.id, type: r.type, target: r.target });
      }
      if (r.target === t.id) {
        selfLoopRelations.push({ from: t.id, target: r.target });
      }
      if (r.target.startsWith('urn:term:video-image:')) {
        crossViCount++;
        if (!knownViIds.has(r.target)) {
          brokenRelationTargets.push({ from: t.id, target: r.target, error: 'Target not in VideoImage' });
        }
      } else if (r.target.startsWith('urn:term:render-3d-animations:')) {
        crossR3dCount++;
        if (!knownR3dIds.has(r.target)) {
          brokenRelationTargets.push({ from: t.id, target: r.target, error: 'Target not in Render-3D-Animations' });
        }
      } else if (r.target.startsWith('urn:term:audiovisual-production:')) {
        // Will check internal targets after loop
      } else {
        brokenRelationTargets.push({ from: t.id, target: r.target, error: 'Unknown URN domain' });
      }
    }
  }

  // Check URL leaks in term text
  const termStr = JSON.stringify(t);
  const urls = termStr.match(urlRegex);
  if (urls) {
    // Filter out urn: or schema.org if harmless
    for (const u of urls) {
      if (!u.includes('schema.org')) {
        forbiddenUrlsFound.push({ id: t.id, url: u });
      }
    }
  }
}

// Check internal relations resolution
for (const t of terms) {
  if (Array.isArray(t.relations)) {
    for (const r of t.relations) {
      if (r.target.startsWith('urn:term:audiovisual-production:')) {
        if (!avIds.has(r.target)) {
          brokenRelationTargets.push({ from: t.id, target: r.target, error: 'Target not in AudiovisualProduction' });
        }
      }
    }
  }
}

assert(invalidUrns.length === 0, 'all terms have valid URN format', { invalidUrns });
assert(mismatchedSlugs.length === 0, 'all term IDs match slug', { mismatchedSlugs });
assert(emptyTitles.length === 0, 'all terms have non-empty titles', { emptyTitles });
assert(emptyDefinitions.length === 0, 'all terms have non-empty definitions', { emptyDefinitions });
assert(shortDefinitions.length === 0, 'all definitions >= 30 chars', { shortDefinitions });
assert(emptyExtended.length === 0, 'all extendedDefinitions >= 50 chars', { emptyExtended });
assert(invalidCategories.length === 0, 'all terms belong to canonical categories', { invalidCategories });
assert(missingComponents.length === 0, 'all terms have components array', { missingComponents });
assert(missingApplications.length === 0, 'all terms have applications array', { missingApplications });
assert(missingExamples.length === 0, 'all terms have examples array', { missingExamples });
assert(missingAiGuidance.length === 0, 'all terms have aiPromptGuidance with promptTokens', { missingAiGuidance });
assert(lowTokenCount.length === 0, 'all terms have at least 1 promptToken', { lowTokenCount });
assert(invalidRelationTypes.length === 0, 'all relations use canonical relation types', { invalidRelationTypes });
assert(selfLoopRelations.length === 0, 'zero self-loop relations', { selfLoopRelations });
assert(brokenRelationTargets.length === 0, 'zero broken relation targets', { brokenRelationTargets });
assert(forbiddenUrlsFound.length === 0, 'zero external network URLs found in terms data', { forbiddenUrlsFound });

console.log(`\nRelation Metrics:`);
console.log(`- Total relations: ${totalRelationsCount}`);
console.log(`- Cross-glossary to VideoImage: ${crossViCount}`);
console.log(`- Cross-glossary to Render-3D: ${crossR3dCount}`);
console.log(`- Total cross-glossary relations: ${crossViCount + crossR3dCount}`);
assert(crossViCount > 0, `cross-relations to VideoImage exist (${crossViCount})`);
assert(crossR3dCount > 0, `cross-relations to Render-3D exist (${crossR3dCount})`);

// 5. Audit 177 Source Terms from spec_miner
console.log('\n--- 5. AUDITING 177 SOURCE TERMS COVERAGE ---');
assert(fs.existsSync(SOURCE_177_PATH), 'catalog_177_enriched.json exists');
const rawSourceTerms = JSON.parse(fs.readFileSync(SOURCE_177_PATH, 'utf8'));
assert(rawSourceTerms.length === 177, `rawSourceTerms count is exactly 177 (found: ${rawSourceTerms.length})`);

let missingSourceTerms = [];
for (const raw of rawSourceTerms) {
  const found = terms.find(t => t.metadata && t.metadata.sourceIndex === raw.index);
  if (!found) {
    missingSourceTerms.push({ index: raw.index, id: raw.id, title: raw.source_title });
  }
}
assert(missingSourceTerms.length === 0, 'all 177 source terms are accounted for by sourceIndex', { missingSourceTerms });

// Check duplicate reconciliation: #18/#132 and #51/#145
const term18 = terms.find(t => t.metadata && t.metadata.sourceIndex === 18);
const term132 = terms.find(t => t.metadata && t.metadata.sourceIndex === 132);
const term51 = terms.find(t => t.metadata && t.metadata.sourceIndex === 51);
const term145 = terms.find(t => t.metadata && t.metadata.sourceIndex === 145);

assert(Boolean(term18), 'term #18 exists (camara-lenta)');
assert(Boolean(term132), 'term #132 exists (slow-motion)');
assert(Boolean(term51), 'term #51 exists (fps-frame-rate)');
assert(Boolean(term145), 'term #145 exists (tasa-de-fotogramas)');

if (term18 && term132) {
  assert(term18.slug === 'camara-lenta', 'term #18 slug is camara-lenta');
  assert(term132.slug === 'slow-motion', 'term #132 slug is slow-motion');
  console.log(`Duplicate Pair 1 reconciled: "${term18.title}" (#18) & "${term132.title}" (#132)`);
}

if (term51 && term145) {
  assert(term51.slug === 'fps-frame-rate', 'term #51 slug is fps-frame-rate');
  assert(term145.slug === 'tasa-de-fotogramas', 'term #145 slug is tasa-de-fotogramas');
  console.log(`Duplicate Pair 2 reconciled: "${term51.title}" (#51) & "${term145.title}" (#145)`);
}

// 6. Audit 8 Expanded AI Terms
console.log('\n--- 6. AUDITING 8 EXPANDED AI VIDEO TERMS ---');
const expectedAiSlugs = [
  'conditioning',
  'motion-vectors-ia',
  'controlnet-video',
  'temporal-coherence',
  'seed-reproducibilidad',
  'diffusion-transformer-video',
  'frame-interpolation-ia',
  'ip-adapter-video'
];

let missingAiTerms = [];
for (const slug of expectedAiSlugs) {
  const found = terms.find(t => t.slug === slug);
  if (!found) {
    missingAiTerms.push(slug);
  } else {
    assert(found.category === 'ia-generacion-audiovisual', `Expanded term "${slug}" has category "ia-generacion-audiovisual"`);
    assert(found.metadata && found.metadata.source === 'ai_video_taxonomy_expansion', `Expanded term "${slug}" metadata source is ai_video_taxonomy_expansion`);
  }
}
assert(missingAiTerms.length === 0, 'all 8 expanded AI terms are present', { missingAiTerms });

// 7. Audit Category Distribution
console.log('\n--- 7. AUDITING CATEGORY DISTRIBUTION ---');
const catCounts = {};
for (const t of terms) {
  catCounts[t.category] = (catCounts[t.category] || 0) + 1;
}
for (const c of CANONICAL_CATEGORIES) {
  const cnt = catCounts[c] || 0;
  assert(cnt > 0, `category "${c}" has at least 1 term (found: ${cnt})`);
}
console.log('Category term counts:', catCounts);

// 8. Audit Definition Quality & Grammar Spot-Check
console.log('\n--- 8. AUDITING DEFINITION QUALITY AND TECHNICAL RIGOR ---');
const sampleSlugs = [
  'guion-literario-y-tecnico',
  'plano-secuencia',
  'profundidad-de-campo',
  'iluminacion-de-tres-puntos',
  'microfono-boom-shotgun',
  'raccord',
  'lut-look-up-table',
  'foley',
  'chroma-key',
  'codec',
  'diffusion-transformer-video',
  'controlnet-video'
];

for (const slug of sampleSlugs) {
  const t = terms.find(item => item.slug === slug);
  if (t) {
    console.log(`\n[TERM SPOT-CHECK: ${t.title}]`);
    console.log(`- Slug: ${t.slug}`);
    console.log(`- Category: ${t.category} (${t.categoryLabel})`);
    console.log(`- Definition: ${t.definition}`);
    console.log(`- Components (${t.components.length}): ${t.components[0]}`);
    console.log(`- Applications (${t.applications.length}): ${t.applications[0]}`);
    console.log(`- Relations (${t.relations.length}): ${t.relations.map(r => `${r.type} -> ${r.target}`).join(' | ')}`);
    console.log(`- AI Tokens (${t.aiPromptGuidance.promptTokens.length}): ${t.aiPromptGuidance.promptTokens.join(', ')}`);
  }
}

// 9. Summary & Exit
console.log('\n====================================================');
console.log(`AUDIT FINISHED: Passed: ${results.passed}, Failed: ${results.failed}`);
if (results.findings.length > 0) {
  console.log(`Findings: ${JSON.stringify(results.findings, null, 2)}`);
}
console.log('====================================================');

process.exit(results.failed > 0 ? 1 : 0);
