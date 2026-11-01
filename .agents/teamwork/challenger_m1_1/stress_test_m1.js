/**
 * Empirical Adversarial Challenger Test Suite - Milestone 1
 * Agent: challenger_m1_1
 * Focus:
 *  - JSON syntax, UTF-8 byte integrity, BOM, control characters
 *  - URN collisions across all 3 glossaries (Audiovisual, VideoImage, Render-3D)
 *  - URN target resolution: verify EVERY relation target resolves to a real term
 *  - Autonomy: regex check for remote URLs, CDNs, external fetches
 *  - Contract conformance with PROJECT.md and catalog.json
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../../..');
const AUDIOVISUAL_DIR = path.join(ROOT_DIR, 'AudiovisualProduction', 'data');
const CATALOG_PATH = path.join(ROOT_DIR, 'app', 'data', 'catalog.json');
const VIDEO_IMAGE_TERMS = path.join(ROOT_DIR, 'VideoImage', 'data', 'terms.json');
const RENDER_3D_TERMS = path.join(ROOT_DIR, 'Render-3D-Animations', 'data', 'terms.json');
const SOURCE_177_PATH = path.join(ROOT_DIR, '.agents', 'teamwork', 'spec_miner_terms', 'catalog_177_enriched.json');

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

const CANONICAL_RELATION_TYPES = new Set([
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
]);

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];
const observations = [];

function assert(condition, message, details = null) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  [PASS] ${message}`);
  } else {
    failedTests++;
    const err = { message, details };
    failures.push(err);
    console.error(`  [FAIL] ${message}`);
    if (details) {
      console.error(`         Details:`, JSON.stringify(details).slice(0, 300));
    }
  }
}

console.log('================================================================');
console.log('EMPIRICAL ADVERSARIAL STRESS TEST SUITE — MILESTONE 1');
console.log('Agent: challenger_m1_1 | Date: ' + new Date().toISOString());
console.log('================================================================\n');

// -----------------------------------------------------------------------------
// TEST 1: RAW BUFFER & UTF-8 ENCODING INTEGRITY
// -----------------------------------------------------------------------------
console.log('--- TEST GROUP 1: Raw Buffer & UTF-8 Encoding Integrity ---');

const filesToAudit = [
  path.join(AUDIOVISUAL_DIR, 'glossary.json'),
  path.join(AUDIOVISUAL_DIR, 'terms.json'),
  CATALOG_PATH,
  VIDEO_IMAGE_TERMS,
  RENDER_3D_TERMS
];

for (const filePath of filesToAudit) {
  const relPath = path.relative(ROOT_DIR, filePath);
  assert(fs.existsSync(filePath), `File exists: ${relPath}`);
  if (!fs.existsSync(filePath)) continue;

  const rawBuffer = fs.readFileSync(filePath);
  
  // Check for UTF-8 Byte Order Mark (BOM) [0xEF, 0xBB, 0xBF]
  const hasBOM = rawBuffer.length >= 3 && rawBuffer[0] === 0xEF && rawBuffer[1] === 0xBB && rawBuffer[2] === 0xBF;
  assert(!hasBOM, `No UTF-8 BOM in ${relPath}`);

  // Check UTF-16 BOMs
  const hasUtf16LE = rawBuffer.length >= 2 && rawBuffer[0] === 0xFF && rawBuffer[1] === 0xFE;
  const hasUtf16BE = rawBuffer.length >= 2 && rawBuffer[0] === 0xFE && rawBuffer[1] === 0xFF;
  assert(!hasUtf16LE && !hasUtf16BE, `No UTF-16 BOM in ${relPath}`);

  const text = rawBuffer.toString('utf8');

  // Check for Unicode replacement character U+FFFD (indicates decoding error)
  const hasReplacementChar = text.includes('\uFFFD');
  assert(!hasReplacementChar, `No Unicode replacement character (U+FFFD) in ${relPath}`);

  // Check for null bytes or illegal ASCII control chars (excluding \t, \r, \n)
  let illegalControlChars = 0;
  for (let i = 0; i < rawBuffer.length; i++) {
    const b = rawBuffer[i];
    if (b < 32 && b !== 9 && b !== 10 && b !== 13) {
      illegalControlChars++;
    }
  }
  assert(illegalControlChars === 0, `Zero illegal ASCII control chars in ${relPath} (found ${illegalControlChars})`);

  // Check strict JSON.parse
  let parsed = null;
  let parseError = null;
  try {
    parsed = JSON.parse(text);
  } catch (e) {
    parseError = e.message;
  }
  assert(parseError === null, `Strict JSON.parse succeeds for ${relPath}`, parseError);
}

// -----------------------------------------------------------------------------
// TEST 2: CATALOG REGISTRATION & MULTI-GLOSSARY PRESERVATION
// -----------------------------------------------------------------------------
console.log('\n--- TEST GROUP 2: Catalog Multi-Glossary Registration & Preservation ---');

const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
assert(Array.isArray(catalog.canonicalGlossaries), 'catalog.json has canonicalGlossaries array');

const catalogGlossaries = catalog.canonicalGlossaries || [];
assert(catalogGlossaries.length === 3, `Catalog registers exactly 3 glossaries (found ${catalogGlossaries.length})`);

const glossaryMap = new Map();
for (const g of catalogGlossaries) {
  glossaryMap.set(g.id, g);
}

// Check preservation of render-3d-animations
const render3D = glossaryMap.get('render-3d-animations');
assert(!!render3D, 'Glossary "render-3d-animations" is present in catalog');
if (render3D) {
  const fullDataPath = path.resolve(ROOT_DIR, render3D.dataPath);
  assert(fs.existsSync(fullDataPath), `render-3d-animations dataPath exists: ${render3D.dataPath}`);
  assert(render3D.termCount === 10, `render-3d-animations termCount is 10 (got ${render3D.termCount})`);
}

// Check preservation of video-image
const videoImg = glossaryMap.get('video-image');
assert(!!videoImg, 'Glossary "video-image" is present in catalog');
if (videoImg) {
  const fullDataPath = path.resolve(ROOT_DIR, videoImg.dataPath);
  assert(fs.existsSync(fullDataPath), `video-image dataPath exists: ${videoImg.dataPath}`);
  assert(videoImg.termCount === 10, `video-image termCount is 10 (got ${videoImg.termCount})`);
}

// Check registration of audiovisual-production
const avProd = glossaryMap.get('audiovisual-production');
assert(!!avProd, 'Glossary "audiovisual-production" is present in catalog');
if (avProd) {
  const avDataPath = path.resolve(ROOT_DIR, avProd.dataPath);
  const avMetaPath = path.resolve(ROOT_DIR, avProd.metadataPath);
  assert(fs.existsSync(avDataPath), `audiovisual-production dataPath exists: ${avProd.dataPath}`);
  assert(fs.existsSync(avMetaPath), `audiovisual-production metadataPath exists: ${avProd.metadataPath}`);
  assert(avProd.termCount === 185, `audiovisual-production termCount is 185 (got ${avProd.termCount})`);
  assert(Array.isArray(avProd.categories) && avProd.categories.length === 13, `audiovisual-production has 13 categories declared in catalog`);
}

// -----------------------------------------------------------------------------
// TEST 3: AUDIOVISUAL METADATA & 13 CANONICAL CATEGORIES
// -----------------------------------------------------------------------------
console.log('\n--- TEST GROUP 3: Glossary Metadata & 13 Canonical Categories ---');

const glossaryMetaPath = path.join(AUDIOVISUAL_DIR, 'glossary.json');
const glossaryMeta = JSON.parse(fs.readFileSync(glossaryMetaPath, 'utf8'));

assert(glossaryMeta.id === 'audiovisual-production', 'glossary.json id matches "audiovisual-production"');
assert(glossaryMeta.termCount === 185, `glossary.json termCount matches 185 (got ${glossaryMeta.termCount})`);
assert(Array.isArray(glossaryMeta.categories), 'glossary.json categories is an array');
assert(glossaryMeta.categories.length === 13, `glossary.json categories has exactly 13 categories (got ${glossaryMeta.categories.length})`);

// Check category alignment
const missingCategories = CANONICAL_CATEGORIES.filter(c => !glossaryMeta.categories.includes(c));
assert(missingCategories.length === 0, 'All 13 canonical categories are present in glossary.json', missingCategories);

assert(typeof glossaryMeta.categoryDetails === 'object' && glossaryMeta.categoryDetails !== null, 'categoryDetails object present');
const detailKeys = Object.keys(glossaryMeta.categoryDetails || {});
assert(detailKeys.length === 13, `categoryDetails has exactly 13 entries (got ${detailKeys.length})`);
for (const cat of CANONICAL_CATEGORIES) {
  const detail = glossaryMeta.categoryDetails[cat];
  assert(detail && typeof detail.name === 'string' && detail.name.length > 0, `Category detail for "${cat}" has non-empty name`);
  assert(detail && typeof detail.description === 'string' && detail.description.length > 0, `Category detail for "${cat}" has non-empty description`);
}

// -----------------------------------------------------------------------------
// TEST 4: URN REGISTRATION & COLLISION AUDIT ACROSS ALL 3 GLOSSARIES
// -----------------------------------------------------------------------------
console.log('\n--- TEST GROUP 4: URN Collisions & Global Term Registry ---');

const avData = JSON.parse(fs.readFileSync(path.join(AUDIOVISUAL_DIR, 'terms.json'), 'utf8'));
const viData = JSON.parse(fs.readFileSync(VIDEO_IMAGE_TERMS, 'utf8'));
const r3dData = JSON.parse(fs.readFileSync(RENDER_3D_TERMS, 'utf8'));

assert(avData.id === 'audiovisual-production', 'terms.json root id is "audiovisual-production"');
assert(avData.version === '1.0.0', 'terms.json version is "1.0.0"');
assert(Array.isArray(avData.canonicalTerms), `Audiovisual terms has canonicalTerms array (length: ${avData.canonicalTerms?.length})`);
assert(avData.canonicalTerms?.length === 185, `Audiovisual canonicalTerms array has exactly 185 terms (got ${avData.canonicalTerms?.length})`);

const avTerms = avData.canonicalTerms || [];
const viTerms = viData.canonicalTerms || [];
const r3dTerms = r3dData.canonicalTerms || [];

const allGlossaryTerms = [
  { namespace: 'audiovisual-production', terms: avTerms, prefix: 'urn:term:audiovisual-production:' },
  { namespace: 'video-image', terms: viTerms, prefix: 'urn:term:video-image:' },
  { namespace: 'render-3d-animations', terms: r3dTerms, prefix: 'urn:term:render-3d-animations:' }
];

const globalURNSet = new Set();
const globalSlugMap = new Map(); // slug -> [URNs]
const duplicateURNs = [];
let malformedURNs = 0;

for (const group of allGlossaryTerms) {
  for (const term of group.terms) {
    if (!term.id || typeof term.id !== 'string') {
      malformedURNs++;
      continue;
    }

    if (!term.id.startsWith(group.prefix)) {
      assert(false, `Term ID ${term.id} does not start with expected prefix ${group.prefix}`);
      malformedURNs++;
    }

    if (globalURNSet.has(term.id)) {
      duplicateURNs.push(term.id);
    } else {
      globalURNSet.add(term.id);
    }

    const slug = term.slug || term.id.replace(group.prefix, '');
    if (!globalSlugMap.has(slug)) {
      globalSlugMap.set(slug, []);
    }
    globalSlugMap.get(slug).push(term.id);
  }
}

assert(malformedURNs === 0, `Zero malformed URNs across all 3 glossaries (found ${malformedURNs})`);
assert(duplicateURNs.length === 0, `Zero duplicate URN collisions across all 3 glossaries (collisions: ${duplicateURNs.length})`, duplicateURNs);
assert(globalURNSet.size === 205, `Total global unique URN registry size is exactly 205 (185 AV + 10 VI + 10 R3D) (got ${globalURNSet.size})`);

// -----------------------------------------------------------------------------
// TEST 5: AUDIOVISUAL PRODUCTION TERM CONTRACT & SCHEMA
// -----------------------------------------------------------------------------
console.log('\n--- TEST GROUP 5: Audiovisual Term Schema & Contract Integrity ---');

let termContractViolations = 0;
let emptyDefinitions = 0;
let categoryMismatches = 0;
let termsWithComponents = 0;
let termsWithAI = 0;
let totalPromptTokens = 0;

for (let i = 0; i < avTerms.length; i++) {
  const term = avTerms[i];
  const termId = term.id || `term[${i}]`;

  // Required properties
  if (!term.id || !term.slug || !term.title || !term.category) {
    termContractViolations++;
    console.error(`Missing core field in ${termId}`);
  }

  // Slug consistency
  const expectedId = `urn:term:audiovisual-production:${term.slug}`;
  if (term.id !== expectedId) {
    termContractViolations++;
    console.error(`ID / Slug mismatch: id=${term.id}, slug=${term.slug}`);
  }

  // Category validity
  if (!CANONICAL_CATEGORIES.includes(term.category)) {
    categoryMismatches++;
    console.error(`Invalid category "${term.category}" in ${termId}`);
  }

  // Definition checks (support both definition/extendedDefinition and shortDefinition/fullDefinition for UI compatibility)
  const def = term.definition || term.shortDefinition;
  const extDef = term.extendedDefinition || term.fullDefinition;
  if (!def || typeof def !== 'string' || def.trim().length < 15) {
    emptyDefinitions++;
    console.error(`Definition missing or too short in ${termId}`);
  }
  if (!extDef || typeof extDef !== 'string' || extDef.trim().length < 30) {
    emptyDefinitions++;
    console.error(`Extended definition missing or too short in ${termId}`);
  }

  // Optional arrays
  if (Array.isArray(term.components) && term.components.length > 0) {
    termsWithComponents++;
  }

  // AI prompt guidance
  if (term.aiPromptGuidance) {
    termsWithAI++;
    if (Array.isArray(term.aiPromptGuidance.promptTokens)) {
      totalPromptTokens += term.aiPromptGuidance.promptTokens.length;
    }
  }

  // Relations array check
  if (!Array.isArray(term.relations)) {
    termContractViolations++;
    console.error(`Relations is not an array in ${termId}`);
  }
}

assert(termContractViolations === 0, `Zero contract violations across 185 terms (found ${termContractViolations})`);
assert(emptyDefinitions === 0, `All 185 terms have rigorous definition & extendedDefinition (failures: ${emptyDefinitions})`);
assert(categoryMismatches === 0, `All 185 terms map to valid 13 canonical categories (mismatches: ${categoryMismatches})`);
assert(termsWithComponents >= 150, `Subconcepts/components populated across vast majority of terms (${termsWithComponents}/185)`);
assert(termsWithAI >= 170, `AI Prompt Guidance populated across terms (${termsWithAI}/185)`);
assert(totalPromptTokens >= 300, `Rich prompt tokens volume across catalog (found ${totalPromptTokens} tokens, required >= 300)`);

// -----------------------------------------------------------------------------
// TEST 6: URN RELATION TARGET RESOLUTION (ZERO BROKEN LINKS EMPIRICAL VERIFICATION)
// -----------------------------------------------------------------------------
console.log('\n--- TEST GROUP 6: URN Relation Target Resolution & Cross-Glossary Graph ---');

let totalRelations = 0;
let brokenLinks = 0;
const brokenLinkDetails = [];
let crossGlossaryRelations = 0;
let internalRelations = 0;
let unknownTypes = 0;
const unknownTypeSet = new Set();
let selfReferences = 0;

for (const term of avTerms) {
  if (!Array.isArray(term.relations)) continue;

  for (const rel of term.relations) {
    totalRelations++;

    if (!rel.type || typeof rel.type !== 'string') {
      unknownTypes++;
    } else if (!CANONICAL_RELATION_TYPES.has(rel.type)) {
      unknownTypes++;
      unknownTypeSet.add(rel.type);
    }

    if (!rel.target || typeof rel.target !== 'string') {
      brokenLinks++;
      brokenLinkDetails.push({ from: term.id, target: rel.target, reason: 'missing_or_empty' });
      continue;
    }

    if (rel.target === term.id) {
      selfReferences++;
    }

    // STRICT RESOLUTION CHECK AGAINST GLOBAL URN POOL
    if (!globalURNSet.has(rel.target)) {
      brokenLinks++;
      brokenLinkDetails.push({ from: term.id, target: rel.target, reason: 'target_not_found' });
    } else {
      if (rel.target.startsWith('urn:term:audiovisual-production:')) {
        internalRelations++;
      } else {
        crossGlossaryRelations++;
      }
    }
  }
}

assert(brokenLinks === 0, `ZERO broken links across all relations in terms.json (broken: ${brokenLinks})`, brokenLinkDetails);
assert(totalRelations >= 800, `High graph connectivity: total relations verified >= 800 (found ${totalRelations})`);
assert(crossGlossaryRelations >= 20, `Cross-glossary relations verified (found ${crossGlossaryRelations})`);
assert(unknownTypes === 0, `All relation types match 15 canonical pairs (unknown types: ${unknownTypes})`, Array.from(unknownTypeSet));
assert(selfReferences === 0, `Zero self-referencing relations (found ${selfReferences})`);

observations.push(`Total Relations Checked: ${totalRelations}`);
observations.push(`Internal AV Relations: ${internalRelations}`);
observations.push(`Cross-Glossary Relations: ${crossGlossaryRelations}`);
observations.push(`Broken Links: ${brokenLinks}`);

// -----------------------------------------------------------------------------
// TEST 7: AUTONOMY & OFFLINE VERIFICATION (ZERO REMOTE URLS)
// -----------------------------------------------------------------------------
console.log('\n--- TEST GROUP 7: Autonomy & Strict Offline Regex Scan ---');

// Scan all files under AudiovisualProduction/ and app/data/
function scanDirectoryForUrls(dirPath, disallowedPatterns) {
  const matches = [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      matches.push(...scanDirectoryForUrls(fullPath, disallowedPatterns));
    } else if (entry.isFile() && (entry.name.endsWith('.json') || entry.name.endsWith('.js') || entry.name.endsWith('.html'))) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');

      for (let lineNum = 0; lineNum < lines.length; lineNum++) {
        const line = lines[lineNum];
        for (const { name, regex, allowedInContext } of disallowedPatterns) {
          const match = line.match(regex);
          if (match) {
            // Check if allowed in context (e.g. metadata.source string "mouseinteractivo")
            if (allowedInContext && allowedInContext(line, fullPath)) {
              continue;
            }
            matches.push({
              file: path.relative(ROOT_DIR, fullPath),
              line: lineNum + 1,
              pattern: name,
              matchedText: match[0],
              snippet: line.trim().slice(0, 100)
            });
          }
        }
      }
    }
  }
  return matches;
}

const disallowedUrlPatterns = [
  {
    name: 'HTTP URL',
    regex: /http:\/\/[^\s"'>]+/i,
    allowedInContext: (line) => false // Zero tolerance in data
  },
  {
    name: 'HTTPS URL',
    regex: /https:\/\/[^\s"'>]+/i,
    allowedInContext: (line, file) => {
      // In terms.json or glossary.json, verify if any external URL is used
      return false;
    }
  },
  {
    name: 'Protocol-relative URL',
    regex: /\/\/[a-z0-9]+(\.[a-z0-9]+)+/i,
    allowedInContext: (line) => line.includes('//') && (line.includes('// ') || line.includes('/**') || line.includes('*'))
  }
];

const dataScanDirs = [
  path.join(ROOT_DIR, 'AudiovisualProduction'),
  path.join(ROOT_DIR, 'app', 'data')
];

let totalUrlMatches = [];
for (const dir of dataScanDirs) {
  if (fs.existsSync(dir)) {
    const results = scanDirectoryForUrls(dir, disallowedUrlPatterns);
    totalUrlMatches.push(...results);
  }
}

assert(totalUrlMatches.length === 0, `Zero remote URLs found in AudiovisualProduction/ and app/data/ (found ${totalUrlMatches.length})`, totalUrlMatches);

// -----------------------------------------------------------------------------
// TEST 8: SOURCE 177 TERMS ACCOUNTING & DUPLICATE RECONCILIATION
// -----------------------------------------------------------------------------
console.log('\n--- TEST GROUP 8: Source 177 Accounting & Duplicate Reconciliation ---');

const source177 = JSON.parse(fs.readFileSync(SOURCE_177_PATH, 'utf8'));
assert(Array.isArray(source177), `Source catalog is an array (length: ${source177.length})`);
assert(source177.length === 177, `Source catalog has exactly 177 terms (got ${source177.length})`);

// Find duplicate pairs from source
// #18/#132: camara-rapida-slow-motion and slow-motion-camara-lenta
// #51/#145: guion-tecnico and storyboard-guion-grafico
const term18 = source177.find(t => t.index === 18);
const term132 = source177.find(t => t.index === 132);
const term51 = source177.find(t => t.index === 51);
const term145 = source177.find(t => t.index === 145);

assert(!!term18 && !!term132, 'Source terms #18 and #132 found in source dataset');
assert(!!term51 && !!term145, 'Source terms #51 and #145 found in source dataset');

// Verify how they are represented in avTerms
const avTermSlugs = new Set(avTerms.map(t => t.slug));
const avTermSources = new Map();
for (const t of avTerms) {
  if (t.metadata && t.metadata.sourceIndex) {
    if (Array.isArray(t.metadata.sourceIndex)) {
      for (const idx of t.metadata.sourceIndex) {
        avTermSources.set(idx, t.slug);
      }
    } else {
      avTermSources.set(t.metadata.sourceIndex, t.slug);
    }
  }
}

// Check coverage of all 177 source indexes
const missingSourceIndexes = [];
for (let idx = 1; idx <= 177; idx++) {
  if (!avTermSources.has(idx)) {
    missingSourceIndexes.push(idx);
  }
}

assert(missingSourceIndexes.length === 0, `All 177 source indexes (1-177) accounted for in terms.json (missing: ${missingSourceIndexes.length})`, missingSourceIndexes);

// -----------------------------------------------------------------------------
// TEST 9: EXPANDED AI GENERATIVE VIDEO TERMS
// -----------------------------------------------------------------------------
console.log('\n--- TEST GROUP 9: AI Generative Video Term Expansion ---');

const expectedAITerms = [
  'conditioning',
  'motion-vectors-ia',
  'controlnet-video',
  'temporal-coherence',
  'seed-reproducibilidad',
  'diffusion-transformer-video',
  'frame-interpolation-ia',
  'ip-adapter-video'
];

let missingAITerms = [];
for (const aiSlug of expectedAITerms) {
  if (!avTermSlugs.has(aiSlug)) {
    missingAITerms.push(aiSlug);
  }
}

assert(missingAITerms.length === 0, `All 8 expanded AI generative video terms exist in terms.json`, missingAITerms);

// -----------------------------------------------------------------------------
// FINAL SUMMARY
// -----------------------------------------------------------------------------
console.log('\n================================================================');
console.log('FINAL STRESS TEST SUMMARY');
console.log(`Total Assertions: ${totalTests}`);
console.log(`Passed:           ${passedTests}`);
console.log(`Failed:           ${failedTests}`);
console.log(`Success Rate:     ${((passedTests / totalTests) * 100).toFixed(2)}%`);
console.log('================================================================');

if (failedTests > 0) {
  console.error('\nFAILURES ENCOUNTERED:');
  failures.forEach((f, idx) => {
    console.error(`  ${idx + 1}. ${f.message}`);
    if (f.details) console.error(`     Details:`, f.details);
  });
  process.exit(1);
} else {
  console.log('\nALL EMPIRICAL ADVERSARIAL STRESS TESTS PASSED CLEANLY.');
  process.exit(0);
}
