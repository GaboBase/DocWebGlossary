/**
 * Comprehensive Validation Test Suite for Milestone 1 (M1)
 * Verifies all criteria specified in DISPATCH.md and PROJECT.md
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '../../../');
const CATALOG_PATH = path.join(ROOT_DIR, 'app/data/catalog.json');
const GLOSSARY_PATH = path.join(ROOT_DIR, 'AudiovisualProduction/data/glossary.json');
const TERMS_PATH = path.join(ROOT_DIR, 'AudiovisualProduction/data/terms.json');
const VIDEO_IMAGE_PATH = path.join(ROOT_DIR, 'VideoImage/data/terms.json');
const RENDER_3D_PATH = path.join(ROOT_DIR, 'Render-3D-Animations/data/terms.json');
const SOURCE_177_PATH = path.join(ROOT_DIR, '.agents/teamwork/spec_miner_terms/catalog_177_enriched.json');

console.log('--- STARTING MILESTONE 1 VERIFICATION ---');

// Test 1: Validate Catalog JSON
console.log('\n[TEST 1] Validating app/data/catalog.json...');
assert(fs.existsSync(CATALOG_PATH), 'Catalog file must exist');
const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));

assert(Array.isArray(catalog.canonicalGlossaries), 'canonicalGlossaries must be an array');
assert.strictEqual(catalog.canonicalGlossaries.length, 3, 'Must contain exactly 3 glossaries (preserved + new)');

const glossaryIds = catalog.canonicalGlossaries.map(g => g.id);
assert(glossaryIds.includes('render-3d-animations'), 'render-3d-animations must be preserved');
assert(glossaryIds.includes('video-image'), 'video-image must be preserved');
assert(glossaryIds.includes('audiovisual-production'), 'audiovisual-production must be registered');

const avCatalogEntry = catalog.canonicalGlossaries.find(g => g.id === 'audiovisual-production');
assert.strictEqual(avCatalogEntry.dataPath, './AudiovisualProduction/data/terms.json');
assert.strictEqual(avCatalogEntry.metadataPath, './AudiovisualProduction/data/glossary.json');
assert(avCatalogEntry.termCount >= 177, 'termCount must be >= 177');
assert.strictEqual(avCatalogEntry.categories.length, 13, 'Must declare 13 categories');
console.log('✓ TEST 1 PASSED: Catalog JSON valid, preserves existing entries, and registers audiovisual-production.');

// Test 2: Validate Glossary Metadata
console.log('\n[TEST 2] Validating AudiovisualProduction/data/glossary.json...');
assert(fs.existsSync(GLOSSARY_PATH), 'Glossary metadata file must exist');
const glossary = JSON.parse(fs.readFileSync(GLOSSARY_PATH, 'utf8'));

assert.strictEqual(glossary.id, 'audiovisual-production');
assert.strictEqual(glossary.version, '1.0.0');
assert(glossary.title && glossary.title.length > 0, 'Title must not be empty');
assert(glossary.description && glossary.description.length > 0, 'Description must not be empty');
assert(Array.isArray(glossary.categories), 'categories must be an array');
assert.strictEqual(glossary.categories.length, 13, 'categories must contain exactly 13 canonical categories');

const expected13Categories = [
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

for (const cat of expected13Categories) {
  assert(glossary.categories.includes(cat), `Glossary categories must include ${cat}`);
  assert(glossary.categoryDetails && glossary.categoryDetails[cat], `categoryDetails must have entry for ${cat}`);
}
console.log('✓ TEST 2 PASSED: Glossary metadata valid with all 13 canonical categories.');

// Test 3: Validate Terms Dataset Integrity
console.log('\n[TEST 3] Validating AudiovisualProduction/data/terms.json...');
assert(fs.existsSync(TERMS_PATH), 'Terms file must exist');
const termsData = JSON.parse(fs.readFileSync(TERMS_PATH, 'utf8'));

assert.strictEqual(termsData.id, 'audiovisual-production');
assert(Array.isArray(termsData.canonicalTerms), 'canonicalTerms must be an array');
const terms = termsData.canonicalTerms;
assert(terms.length >= 177, `Expected at least 177 terms, found ${terms.length}`);

// Load existing terms for cross-reference
const viTerms = JSON.parse(fs.readFileSync(VIDEO_IMAGE_PATH, 'utf8')).canonicalTerms;
const r3dTerms = JSON.parse(fs.readFileSync(RENDER_3D_PATH, 'utf8')).canonicalTerms;
const source177 = JSON.parse(fs.readFileSync(SOURCE_177_PATH, 'utf8'));

const allKnownTermIds = new Set([
  ...terms.map(t => t.id),
  ...viTerms.map(t => t.id),
  ...r3dTerms.map(t => t.id)
]);

const termSlugs = new Set();
const termIds = new Set();
let crossGlossaryRelationsCount = 0;
let totalRelationsCount = 0;

for (let i = 0; i < terms.length; i++) {
  const t = terms[i];
  
  // ID format
  assert(t.id && t.id.startsWith('urn:term:audiovisual-production:'), `Term #${i} has invalid id: ${t.id}`);
  assert(!termIds.has(t.id), `Duplicate term id found: ${t.id}`);
  termIds.add(t.id);

  // Slug
  assert(t.slug && /^[a-z0-9\-]+$/.test(t.slug), `Term #${i} has invalid slug: ${t.slug}`);
  assert(!termSlugs.has(t.slug), `Duplicate term slug found: ${t.slug}`);
  termSlugs.add(t.slug);

  // Title
  assert(t.title && t.title.trim().length > 0, `Term #${i} (${t.slug}) missing title`);

  // Category
  assert(expected13Categories.includes(t.category), `Term #${i} (${t.slug}) has invalid category: ${t.category}`);

  // Definitions
  assert(t.definition && t.definition.trim().length > 10, `Term #${i} (${t.slug}) missing concise definition`);
  assert(t.extendedDefinition && t.extendedDefinition.trim().length > 20, `Term #${i} (${t.slug}) missing extendedDefinition`);
  assert(t.shortDefinition && t.fullDefinition, `Term #${i} (${t.slug}) missing shortDefinition/fullDefinition compatibility aliases`);

  // Components, applications, examples, synonyms
  assert(Array.isArray(t.components) && t.components.length > 0, `Term #${i} (${t.slug}) components must be non-empty array`);
  assert(Array.isArray(t.applications) && t.applications.length > 0, `Term #${i} (${t.slug}) applications must be non-empty array`);
  assert(Array.isArray(t.examples) && t.examples.length > 0, `Term #${i} (${t.slug}) examples must be non-empty array`);
  assert(Array.isArray(t.synonyms), `Term #${i} (${t.slug}) synonyms must be array`);

  // AI Prompt Guidance
  assert(t.aiPromptGuidance && typeof t.aiPromptGuidance === 'object', `Term #${i} (${t.slug}) missing aiPromptGuidance`);
  assert(Array.isArray(t.aiPromptGuidance.promptTokens), `Term #${i} (${t.slug}) promptTokens must be array`);
  assert(Array.isArray(t.aiPromptGuidance.negativeTokens), `Term #${i} (${t.slug}) negativeTokens must be array`);
  assert(Array.isArray(t.aiPromptGuidance.modelCompatibility), `Term #${i} (${t.slug}) modelCompatibility must be array`);

  // Metadata
  assert(t.metadata && typeof t.metadata === 'object', `Term #${i} (${t.slug}) missing metadata`);
  assert(t.metadata.source, `Term #${i} (${t.slug}) missing metadata.source`);
  assert(t.metadata.curationStatus === 'original_editorial_smpte_ebu', `Term #${i} (${t.slug}) invalid curationStatus`);
  assert.strictEqual(t.metadata.verified, true, `Term #${i} (${t.slug}) metadata.verified must be true`);

  // Relations
  assert(Array.isArray(t.relations), `Term #${i} (${t.slug}) relations must be array`);
  for (const rel of t.relations) {
    totalRelationsCount++;
    assert(rel.type, `Term ${t.slug} has relation with missing type`);
    assert(rel.target, `Term ${t.slug} has relation with missing target`);
    assert(allKnownTermIds.has(rel.target), `BROKEN LINK: Term ${t.slug} points to unknown target: ${rel.target}`);
    if (rel.target.startsWith('urn:term:video-image:') || rel.target.startsWith('urn:term:render-3d-animations:')) {
      crossGlossaryRelationsCount++;
    }
  }
}

console.log(`✓ TEST 3 PASSED: All ${terms.length} terms validated: schema, definitions, components, relations.`);
console.log(`  - Total relations verified: ${totalRelationsCount}`);
console.log(`  - Cross-glossary relations verified: ${crossGlossaryRelationsCount}`);

// Test 4: Verify Coverage of all 177 terms from mouseinteractivo
console.log('\n[TEST 4] Verifying all 177 terms from source catalog exist...');
assert.strictEqual(source177.length, 177, 'Source must have 177 terms');
let foundBaseTerms = 0;
for (const s of source177) {
  const expectedId = `urn:term:audiovisual-production:${s.id}`;
  const found = terms.find(t => t.id === expectedId);
  assert(found, `Source term #${s.index} (${s.id}) must exist in terms.json`);
  assert.strictEqual(found.metadata.sourceIndex, s.index);
  foundBaseTerms++;
}
assert.strictEqual(foundBaseTerms, 177, 'All 177 base terms must be present');
console.log(`✓ TEST 4 PASSED: Exactly 177/177 source terms accounted for.`);

// Test 5: Verify Duplicate Pairs Reconciliation
console.log('\n[TEST 5] Verifying duplicate reconciliation (#18/#132 and #51/#145)...');
const camaraLenta = terms.find(t => t.slug === 'camara-lenta');
const slowMotion = terms.find(t => t.slug === 'slow-motion');
assert(camaraLenta, 'camara-lenta (#18) must exist');
assert(slowMotion, 'slow-motion (#132) must exist');
assert.strictEqual(camaraLenta.metadata.sourceIndex, 18);
assert.strictEqual(slowMotion.metadata.sourceIndex, 132);

const fpsFrameRate = terms.find(t => t.slug === 'fps-frame-rate');
const tasaFotogramas = terms.find(t => t.slug === 'tasa-de-fotogramas');
assert(fpsFrameRate, 'fps-frame-rate (#51) must exist');
assert(tasaFotogramas, 'tasa-de-fotogramas (#145) must exist');
assert.strictEqual(fpsFrameRate.metadata.sourceIndex, 51);
assert.strictEqual(tasaFotogramas.metadata.sourceIndex, 145);
console.log('✓ TEST 5 PASSED: Both duplicate pairs reconciled and preserved with source indexes.');

// Test 6: Verify AI Generative Video Expansion Terms (Feature 7)
console.log('\n[TEST 6] Verifying expanded AI generative video terms...');
const requiredAiSlugs = [
  'conditioning',
  'motion-vectors-ia',
  'controlnet-video',
  'temporal-coherence',
  'seed-reproducibilidad',
  'diffusion-transformer-video',
  'frame-interpolation-ia',
  'ip-adapter-video'
];

for (const aiSlug of requiredAiSlugs) {
  const found = terms.find(t => t.slug === aiSlug);
  assert(found, `AI expansion term ${aiSlug} must exist`);
  assert.strictEqual(found.category, 'ia-generacion-audiovisual');
}
console.log(`✓ TEST 6 PASSED: All ${requiredAiSlugs.length} expanded AI generative video terms verified.`);

// Test 7: Autonomy check
console.log('\n[TEST 7] Running audit_autonomy.js...');
const { execSync } = require('child_process');
const autonomyOutput = execSync('node audit_autonomy.js', { cwd: ROOT_DIR, encoding: 'utf8' });
assert(autonomyOutput.includes('100% AUTÓNOMO Y LOCAL'), 'Autonomy check must pass');
console.log('✓ TEST 7 PASSED: 100% offline autonomy confirmed.');

console.log('\n======================================================');
console.log('🎉 ALL MILESTONE 1 VERIFICATION TESTS PASSED (7/7) 🎉');
console.log('======================================================');
