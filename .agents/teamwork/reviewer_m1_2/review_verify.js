const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..', '..', '..');

console.log('=== REVIEWER 2 INDEPENDENT ADVERSARIAL VERIFICATION ===');
console.log('Root Directory:', ROOT_DIR);

let passes = 0;
let failures = 0;
let warnings = 0;

function assert(condition, message, details = '') {
  if (condition) {
    passes++;
    console.log(`[PASS] ${message}`);
  } else {
    failures++;
    console.error(`[FAIL] ${message} - ${details}`);
  }
}

function warn(message, details = '') {
  warnings++;
  console.warn(`[WARN] ${message} - ${details}`);
}

// 1. Check Paths
const catalogPath = path.join(ROOT_DIR, 'app', 'data', 'catalog.json');
const glossaryPath = path.join(ROOT_DIR, 'AudiovisualProduction', 'data', 'glossary.json');
const termsPath = path.join(ROOT_DIR, 'AudiovisualProduction', 'data', 'terms.json');
const viPath = path.join(ROOT_DIR, 'VideoImage', 'data', 'terms.json');
const r3dPath = path.join(ROOT_DIR, 'Render-3D-Animations', 'data', 'terms.json');
const sourcePath = path.join(ROOT_DIR, '.agents', 'teamwork', 'spec_miner_terms', 'catalog_177_enriched.json');

assert(fs.existsSync(catalogPath), 'catalog.json exists');
assert(fs.existsSync(glossaryPath), 'glossary.json exists');
assert(fs.existsSync(termsPath), 'terms.json exists');

const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const glossary = JSON.parse(fs.readFileSync(glossaryPath, 'utf8'));
const termsData = JSON.parse(fs.readFileSync(termsPath, 'utf8'));
const viData = JSON.parse(fs.readFileSync(viPath, 'utf8'));
const r3dData = JSON.parse(fs.readFileSync(r3dPath, 'utf8'));
const sourceTerms = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));

const terms = termsData.canonicalTerms || [];
assert(terms.length === 185, `Total terms count is exactly 185 (found ${terms.length})`);
assert(glossary.termCount === 185, `glossary.json termCount matches 185 (found ${glossary.termCount})`);

// 2. Multi-glossary catalog registration
const avCatalogEntry = catalog.canonicalGlossaries.find(g => g.id === 'audiovisual-production');
assert(Boolean(avCatalogEntry), 'audiovisual-production registered in catalog.json');
assert(catalog.canonicalGlossaries.length === 3, 'catalog preserves all 3 glossaries');
assert(avCatalogEntry && avCatalogEntry.categories.length === 13, 'catalog declares 13 categories');

// 3. Glossary categories
assert(glossary.categories.length === 13, 'glossary.json declares exactly 13 categories');
const categoryKeys = Object.keys(glossary.categoryDetails || {});
assert(categoryKeys.length === 13, 'glossary.json categoryDetails has 13 detailed entries');

// 4. Term schema and unique constraints
const slugSet = new Set();
const idSet = new Set();
const sourceIndexSet = new Set();
const validCategories = new Set(glossary.categories);

let invalidUrns = 0;
let invalidCategories = 0;
let emptyFields = 0;
let placeholderDefs = 0;
let totalPromptTokens = 0;
let termsWithAiGuidance = 0;
let termsWithMetadata = 0;
let termsWithSMPTE = 0;
let circularRelations = 0;
let duplicateRelations = 0;
let termsWithComponents = 0;
let termsWithApplications = 0;
let termsWithExamples = 0;
let termsWithSynonyms = 0;

const allKnownIds = new Set([
  ...terms.map(t => t.id),
  ...(viData.canonicalTerms || []).map(t => t.id),
  ...(r3dData.canonicalTerms || []).map(t => t.id)
]);

let totalRelationsCount = 0;
let brokenTargets = [];
let crossViCount = 0;
let crossR3dCount = 0;

// Relation graph tracking
const incomingRelations = new Map();
const outgoingRelations = new Map();

allKnownIds.forEach(id => {
  incomingRelations.set(id, 0);
  outgoingRelations.set(id, 0);
});

terms.forEach((t, i) => {
  if (slugSet.has(t.slug)) assert(false, `Duplicate slug found: ${t.slug}`);
  slugSet.add(t.slug);

  if (idSet.has(t.id)) assert(false, `Duplicate ID found: ${t.id}`);
  idSet.add(t.id);

  if (!t.id.startsWith('urn:term:audiovisual-production:')) invalidUrns++;

  if (!validCategories.has(t.category)) {
    invalidCategories++;
    console.error(`Invalid category: ${t.category} in term ${t.slug}`);
  }

  if (!t.title || !t.definition || !t.extendedDefinition) emptyFields++;

  if (/\b(TODO|TBD|FIXME|XXX)\b/.test(t.definition) || /\blorem\s+ipsum\b/i.test(t.definition)) placeholderDefs++;

  if (t.components && t.components.length > 0) termsWithComponents++;
  if (t.applications && t.applications.length > 0) termsWithApplications++;
  if (t.examples && t.examples.length > 0) termsWithExamples++;
  if (t.synonyms && t.synonyms.length > 0) termsWithSynonyms++;

  // Metadata
  if (t.metadata) {
    termsWithMetadata++;
    if (t.metadata.sourceIndex) sourceIndexSet.add(t.metadata.sourceIndex);
    if (t.metadata.curationStatus === 'original_editorial_smpte_ebu') termsWithSMPTE++;
  }

  // AI Guidance
  if (t.aiPromptGuidance) {
    termsWithAiGuidance++;
    const tokens = t.aiPromptGuidance.promptTokens || [];
    totalPromptTokens += tokens.length;
  }

  // Relations
  if (t.relations) {
    const seenTargets = new Set();
    t.relations.forEach(r => {
      totalRelationsCount++;
      outgoingRelations.set(t.id, (outgoingRelations.get(t.id) || 0) + 1);

      if (r.target === t.id) {
        circularRelations++;
        console.warn(`Circular self-relation on ${t.id}`);
      }

      const relKey = `${r.type}::${r.target}`;
      if (seenTargets.has(relKey)) {
        duplicateRelations++;
        console.warn(`Duplicate relation in ${t.id}: ${relKey}`);
      }
      seenTargets.add(relKey);

      if (!allKnownIds.has(r.target)) {
        brokenTargets.push({ source: t.id, target: r.target });
      } else {
        incomingRelations.set(r.target, (incomingRelations.get(r.target) || 0) + 1);
      }

      if (r.target.startsWith('urn:term:video-image:')) crossViCount++;
      if (r.target.startsWith('urn:term:render-3d-animations:')) crossR3dCount++;
    });
  }
});

assert(invalidUrns === 0, `All 185 terms have valid canonical URNs (found ${invalidUrns} invalid)`);
assert(invalidCategories === 0, `All 185 terms belong to valid declared categories (found ${invalidCategories} invalid)`);
assert(emptyFields === 0, `Zero empty title/definition/extendedDefinition (found ${emptyFields})`);
assert(placeholderDefs === 0, `Zero placeholder definitions (found ${placeholderDefs})`);
assert(termsWithComponents === 185, `All 185 terms have structured components`);
assert(termsWithApplications === 185, `All 185 terms have practical applications`);
assert(termsWithExamples === 185, `All 185 terms have documented examples`);
assert(termsWithSynonyms === 185, `All 185 terms have synonyms`);
assert(termsWithMetadata === 185, `All 185 terms contain provenance metadata`);
assert(termsWithSMPTE === 185, `All 185 terms marked with curationStatus: original_editorial_smpte_ebu`);
assert(sourceIndexSet.size === 185, `All 185 source indexes are unique and present (found ${sourceIndexSet.size})`);
assert(termsWithAiGuidance === 185, `All 185 terms contain AI prompt guidance`);
assert(totalPromptTokens >= 300, `Total AI prompt tokens exceeds 300 (found ${totalPromptTokens})`);

// 5. Relations integrity
assert(brokenTargets.length === 0, `Zero broken relationship targets (found ${brokenTargets.length})`);
assert(crossViCount > 0, `Cross-glossary relations to VideoImage exist (found ${crossViCount})`);
assert(crossR3dCount > 0, `Cross-glossary relations to Render-3D exist (found ${crossR3dCount})`);
assert(circularRelations === 0, `Zero circular self-referential relations (found ${circularRelations})`);
assert(duplicateRelations === 0, `Zero duplicate relations inside terms (found ${duplicateRelations})`);

// 6. Graph Connectivity & Orphan Detection
let orphanCount = 0;
terms.forEach(t => {
  const outCount = outgoingRelations.get(t.id) || 0;
  const inCount = incomingRelations.get(t.id) || 0;
  if (outCount === 0 && inCount === 0) {
    orphanCount++;
    console.warn(`Orphan term with 0 relations: ${t.id}`);
  }
});
assert(orphanCount === 0, `Zero completely isolated orphan terms in graph (found ${orphanCount})`);

// 7. Duplicate reconciliation deep check
const cl = terms.find(t => t.slug === 'camara-lenta');
const sm = terms.find(t => t.slug === 'slow-motion');
const fps = terms.find(t => t.slug === 'fps-frame-rate');
const tf = terms.find(t => t.slug === 'tasa-de-fotogramas');

assert(Boolean(cl && sm), 'Both camara-lenta and slow-motion exist as distinct canonical entities');
assert(cl && cl.metadata && cl.metadata.sourceIndex === 18, 'camara-lenta preserves source index #18');
assert(sm && sm && sm.metadata.sourceIndex === 132, 'slow-motion preserves source index #132');
assert(cl && sm && cl.definition !== sm.definition, 'camara-lenta and slow-motion have distinct technical definitions');
const clHasSmRel = cl && cl.relations.some(r => r.target === sm.id && r.type === 'alternativeTo');
const smHasClRel = sm && sm.relations.some(r => r.target === cl.id && r.type === 'alternativeTo');
assert(clHasSmRel && smHasClRel, 'camara-lenta and slow-motion are linked bidirectionally via alternativeTo');

assert(Boolean(fps && tf), 'Both fps-frame-rate and tasa-de-fotogramas exist as distinct canonical entities');
assert(fps && fps.metadata && fps.metadata.sourceIndex === 51, 'fps-frame-rate preserves source index #51');
assert(tf && tf && tf.metadata.sourceIndex === 145, 'tasa-de-fotogramas preserves source index #145');
assert(fps && tf && fps.definition !== tf.definition, 'fps-frame-rate and tasa-de-fotogramas have distinct definitions');
const fpsHasTfRel = fps && fps.relations.some(r => r.target === tf.id && r.type === 'alternativeTo');
const tfHasFpsRel = tf && tf.relations.some(r => r.target === fps.id && r.type === 'alternativeTo');
assert(fpsHasTfRel && tfHasFpsRel, 'fps-frame-rate and tasa-de-fotogramas are linked bidirectionally via alternativeTo');

// 8. 8 AI Generative Video Terms Deep Check
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

let foundAiSlugs = 0;
expectedAiSlugs.forEach(slug => {
  const t = terms.find(term => term.slug === slug);
  if (t) {
    foundAiSlugs++;
    if (t.category !== 'ia-generacion-audiovisual') {
      console.error(`AI term ${slug} has wrong category: ${t.category}`);
    }
  } else {
    console.error(`Missing AI term: ${slug}`);
  }
});
assert(foundAiSlugs === 8, `All 8 expanded AI generative video terms exist (found ${foundAiSlugs}/8)`);

// 9. Autonomy & Zero Remote URLs
function checkNoRemoteUrls(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Match http:// or https:// outside of metadata source_url or schema.org
  const lines = content.split('\n');
  let violations = 0;
  lines.forEach((line, idx) => {
    // If it's metadata source_url, it's allowed provenance attribution
    if (line.includes('"source_url":') || line.includes('"source":') || line.includes('mouseinteractivo.com')) {
      return;
    }
    if (/https?:\/\/(?!schema\.org)/i.test(line)) {
      violations++;
      console.warn(`Possible remote URL in ${path.basename(filePath)}:${idx + 1}: ${line.trim()}`);
    }
  });
  return violations;
}

assert(checkNoRemoteUrls(catalogPath) === 0, 'Zero remote URLs in app/data/catalog.json');
assert(checkNoRemoteUrls(glossaryPath) === 0, 'Zero remote URLs in glossary.json');
assert(checkNoRemoteUrls(termsPath) === 0, 'Zero remote URLs in terms.json');

console.log('\n======================================================');
console.log(`TOTAL PASSES: ${passes}`);
console.log(`TOTAL FAILURES: ${failures}`);
console.log(`TOTAL WARNINGS: ${warnings}`);
console.log('======================================================');

if (failures > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
