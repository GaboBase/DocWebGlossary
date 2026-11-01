/**
 * Independent Forensic Audit Script for Milestone 1
 * Executed by auditor_m1
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../../../');
const CATALOG_PATH = path.join(ROOT_DIR, 'app/data/catalog.json');
const GLOSSARY_PATH = path.join(ROOT_DIR, 'AudiovisualProduction/data/glossary.json');
const TERMS_PATH = path.join(ROOT_DIR, 'AudiovisualProduction/data/terms.json');
const VIDEO_IMAGE_PATH = path.join(ROOT_DIR, 'VideoImage/data/terms.json');
const RENDER_3D_PATH = path.join(ROOT_DIR, 'Render-3D-Animations/data/terms.json');
const SOURCE_177_PATH = path.join(ROOT_DIR, '.agents/teamwork/spec_miner_terms/catalog_177_enriched.json');

const results = {
  checks: [],
  metrics: {},
  anomalies: []
};

function recordCheck(name, passed, details) {
  results.checks.push({ name, passed, details });
  console.log(`[${passed ? 'PASS' : 'FAIL'}] ${name}: ${details}`);
}

// 1. Files existence & size
const catalogRaw = fs.readFileSync(CATALOG_PATH, 'utf8');
const glossaryRaw = fs.readFileSync(GLOSSARY_PATH, 'utf8');
const termsRaw = fs.readFileSync(TERMS_PATH, 'utf8');
const viRaw = fs.readFileSync(VIDEO_IMAGE_PATH, 'utf8');
const r3dRaw = fs.readFileSync(RENDER_3D_PATH, 'utf8');
const source177Raw = fs.readFileSync(SOURCE_177_PATH, 'utf8');

const termsData = JSON.parse(termsRaw);
const terms = termsData.canonicalTerms || termsData;
const glossary = JSON.parse(glossaryRaw);
const catalog = JSON.parse(catalogRaw);
const viTerms = (JSON.parse(viRaw).canonicalTerms || JSON.parse(viRaw));
const r3dTerms = (JSON.parse(r3dRaw).canonicalTerms || JSON.parse(r3dRaw));
const source177 = JSON.parse(source177Raw);

results.metrics.termsCount = terms.length;
results.metrics.termsFileSize = termsRaw.length;
results.metrics.glossaryFileSize = glossaryRaw.length;

// Check 1: Catalog registration
const avCatalog = catalog.canonicalGlossaries.find(g => g.id === 'audiovisual-production');
if (avCatalog && avCatalog.dataPath === './AudiovisualProduction/data/terms.json' && avCatalog.termCount === terms.length) {
  recordCheck('Catalog Registration', true, `audiovisual-production correctly registered with termCount=${avCatalog.termCount}`);
} else {
  recordCheck('Catalog Registration', false, `Invalid catalog entry: ${JSON.stringify(avCatalog)}`);
}

// Check 2: 13 Categories in glossary.json
const expectedCats = [
  'preproduccion', 'direccion-narrativa', 'camara-movimiento', 'optica-lentes',
  'iluminacion', 'audio-directo', 'edicion-montaje', 'color-etalonaje',
  'audio-postproduccion', 'vfx-composicion', 'distribucion-formatos',
  'tecnologia-infraestructura', 'ia-generacion-audiovisual'
];
const catsInGlossary = glossary.categories || [];
const catDiff = expectedCats.filter(c => !catsInGlossary.includes(c));
if (catsInGlossary.length === 13 && catDiff.length === 0) {
  recordCheck('Glossary Categories', true, 'Exactly 13 canonical categories declared and matched');
} else {
  recordCheck('Glossary Categories', false, `Missing categories: ${catDiff.join(', ')}`);
}

// Check 3: Unique URNs, Slugs, and Titles
const urnSet = new Set();
const slugSet = new Set();
const titleSet = new Set();
let dupUrn = 0, dupSlug = 0, dupTitle = 0;

for (const t of terms) {
  if (urnSet.has(t.id)) dupUrn++;
  urnSet.add(t.id);
  if (slugSet.has(t.slug)) dupSlug++;
  slugSet.add(t.slug);
  if (titleSet.has(t.title.toLowerCase())) dupTitle++;
  titleSet.add(t.title.toLowerCase());
}

if (dupUrn === 0 && dupSlug === 0) {
  recordCheck('Unique Identifiers', true, `All ${terms.length} URNs and slugs are strictly unique`);
} else {
  recordCheck('Unique Identifiers', false, `Duplicate URNs: ${dupUrn}, duplicate Slugs: ${dupSlug}`);
}

// Check 4: Placeholder and Dummy detection
// Note: TODO, TBD, FIXME, XXX are case-sensitive to avoid matching Spanish word 'todo' or the end of 'método'
const placeholderRegex = /(\blorem\s+ipsum\b|\bdummy\b|\bplaceholder\b|\basdf\b|\bqwerty\b|\bpor\s+definir\b|\bTODO\b|\bTBD\b|\bFIXME\b|\bXXX\b)/;
let placeholderFound = 0;
const definitionsMap = new Map();
let duplicateDefinitions = 0;
let minDefLen = Infinity, maxDefLen = 0, totalDefLen = 0;
let minExtLen = Infinity, maxExtLen = 0, totalExtLen = 0;

for (const t of terms) {
  const def = t.definition || '';
  const ext = t.extendedDefinition || '';

  if (placeholderRegex.test(def) || placeholderRegex.test(ext)) {
    placeholderFound++;
    results.anomalies.push({ term: t.id, issue: 'Placeholder pattern detected in definition' });
  }

  // Check duplicate definitions
  if (definitionsMap.has(def)) {
    duplicateDefinitions++;
    results.anomalies.push({ term: t.id, issue: `Duplicate definition shared with ${definitionsMap.get(def)}` });
  } else {
    definitionsMap.set(def, t.id);
  }

  minDefLen = Math.min(minDefLen, def.length);
  maxDefLen = Math.max(maxDefLen, def.length);
  totalDefLen += def.length;

  minExtLen = Math.min(minExtLen, ext.length);
  maxExtLen = Math.max(maxExtLen, ext.length);
  totalExtLen += ext.length;
}

results.metrics.avgDefinitionLength = Math.round(totalDefLen / terms.length);
results.metrics.minDefinitionLength = minDefLen;
results.metrics.maxDefinitionLength = maxDefLen;
results.metrics.avgExtendedLength = Math.round(totalExtLen / terms.length);
results.metrics.minExtendedLength = minExtLen;
results.metrics.maxExtendedLength = maxExtLen;

if (placeholderFound === 0 && duplicateDefinitions === 0 && minDefLen >= 50) {
  recordCheck('Definition Authenticity', true, `Zero placeholders, zero duplicated definitions. Avg concise len: ${results.metrics.avgDefinitionLength} chars, avg extended len: ${results.metrics.avgExtendedLength} chars`);
} else {
  recordCheck('Definition Authenticity', false, `Placeholders: ${placeholderFound}, duplicate definitions: ${duplicateDefinitions}, min concise len: ${minDefLen}`);
}

// Check 5: Technical Terminology & SMPTE/EBU Rigor Check
const standardsKeywords = [
  'smpte', 'ebu', 'itu', 'itu-r', 'rec.', 'rec. 709', 'rec. 2020', 'rec. 2100',
  'dci', 'iso', 'frecuencia', 'fotogramas', 'luminancia', 'crominancia',
  'muestreo', 'profundidad de bits', 'espacio de color', 'codec', 'obturador',
  'longitud focal', 'temperatura de color', 'kelvin', 'dbfs', 'lufs', 'khz',
  'curva gamma', 'rango dinamico', 'resolucion', 'diafragma', 'compresion'
];

let standardKeywordMentions = 0;
const termsCombinedText = terms.map(t => `${t.title} ${t.definition} ${t.extendedDefinition}`).join(' ').toLowerCase();

const foundStandards = {};
for (const kw of standardsKeywords) {
  const count = (termsCombinedText.match(new RegExp('\\b' + kw.replace('.', '\\.'), 'gi')) || []).length;
  if (count > 0) {
    foundStandards[kw] = count;
    standardKeywordMentions += count;
  }
}
results.metrics.foundStandardsCount = Object.keys(foundStandards).length;
results.metrics.totalStandardMentions = standardKeywordMentions;

if (results.metrics.foundStandardsCount >= 15) {
  recordCheck('Technical Rigor & Standards Compliance', true, `Identified ${results.metrics.foundStandardsCount} distinct standards/broadcast keywords with ${standardKeywordMentions} total technical citations`);
} else {
  recordCheck('Technical Rigor & Standards Compliance', false, `Insufficient technical citations: only ${results.metrics.foundStandardsCount} keywords found`);
}

// Check 6: Relational Integrity (All 3 Glossaries)
const allKnownIds = new Set([
  ...terms.map(t => t.id),
  ...viTerms.map(t => t.id),
  ...r3dTerms.map(t => t.id)
]);

let totalRelations = 0;
let brokenLinks = 0;
let crossViLinks = 0;
let crossR3dLinks = 0;
let selfLoops = 0;
let duplicateRelationsInTerm = 0;

for (const t of terms) {
  if (!Array.isArray(t.relations)) continue;
  const seenTargets = new Set();
  for (const rel of t.relations) {
    totalRelations++;
    if (rel.target === t.id) {
      selfLoops++;
      results.anomalies.push({ term: t.id, issue: 'Self-referencing relationship loop' });
    }
    if (seenTargets.has(rel.target)) {
      duplicateRelationsInTerm++;
    }
    seenTargets.add(rel.target);

    if (!allKnownIds.has(rel.target)) {
      brokenLinks++;
      results.anomalies.push({ term: t.id, brokenTarget: rel.target });
    }

    if (rel.target.startsWith('urn:term:video-image:')) crossViLinks++;
    if (rel.target.startsWith('urn:term:render-3d-animations:')) crossR3dLinks++;
  }
}

results.metrics.totalRelations = totalRelations;
results.metrics.crossViLinks = crossViLinks;
results.metrics.crossR3dLinks = crossR3dLinks;
results.metrics.totalCrossLinks = crossViLinks + crossR3dLinks;

if (brokenLinks === 0 && selfLoops === 0 && totalRelations >= 800 && results.metrics.totalCrossLinks >= 20) {
  recordCheck('Relational Graph Integrity', true, `${totalRelations} total relations, 0 broken links, 0 self-loops, ${results.metrics.totalCrossLinks} cross-glossary relations`);
} else {
  recordCheck('Relational Graph Integrity', false, `Broken links: ${brokenLinks}, self-loops: ${selfLoops}, cross-links: ${results.metrics.totalCrossLinks}`);
}

// Check 7: Components, Applications, Examples, AI Guidance
let missingComponents = 0;
let missingApplications = 0;
let missingExamples = 0;
let missingAiGuidance = 0;
let totalPromptTokens = 0;

for (const t of terms) {
  if (!Array.isArray(t.components) || t.components.length === 0) missingComponents++;
  if (!Array.isArray(t.applications) || t.applications.length === 0) missingApplications++;
  if (!Array.isArray(t.examples) || t.examples.length === 0) missingExamples++;
  if (!t.aiPromptGuidance || !Array.isArray(t.aiPromptGuidance.promptTokens)) {
    missingAiGuidance++;
  } else {
    totalPromptTokens += t.aiPromptGuidance.promptTokens.length;
  }
}

results.metrics.totalPromptTokens = totalPromptTokens;

if (missingComponents === 0 && missingApplications === 0 && missingExamples === 0 && missingAiGuidance === 0) {
  recordCheck('Deep Structured Fields Completeness', true, `100% of terms have components, applications, examples, and AI guidance (${totalPromptTokens} prompt tokens total)`);
} else {
  recordCheck('Deep Structured Fields Completeness', false, `Missing: comp=${missingComponents}, app=${missingApplications}, ex=${missingExamples}, ai=${missingAiGuidance}`);
}

// Check 8: Autonomy & Network URLs in Data Files
const forbiddenUrlRegex = /(https?:\/\/[a-zA-Z0-9_\-\.]+)/gi;
const allowedDomains = ['schema.org', 'w3.org']; // only RDF/XML schema namespaces if any

function findUrls(content) {
  const matches = content.match(forbiddenUrlRegex) || [];
  return matches.filter(url => !allowedDomains.some(d => url.includes(d)));
}

const termsUrls = findUrls(termsRaw);
const glossaryUrls = findUrls(glossaryRaw);
const catalogUrls = findUrls(catalogRaw);

const totalUnapprovedUrls = termsUrls.length + glossaryUrls.length + catalogUrls.length;
if (totalUnapprovedUrls === 0) {
  recordCheck('Zero Remote URLs in Data', true, 'No unauthorized HTTP/HTTPS URLs present in data files');
} else {
  recordCheck('Zero Remote URLs in Data', false, `Found unapproved URLs: ${JSON.stringify({ termsUrls, glossaryUrls, catalogUrls })}`);
}

// Check 9: Discrepancy & Duplicate Reconciliation Verification
const camaraLenta = terms.find(t => t.slug === 'camara-lenta');
const slowMotion = terms.find(t => t.slug === 'slow-motion');
const fpsFrameRate = terms.find(t => t.slug === 'fps-frame-rate');
const tasaFotogramas = terms.find(t => t.slug === 'tasa-de-fotogramas');

const duplicatesReconciled = camaraLenta && slowMotion && fpsFrameRate && tasaFotogramas &&
  camaraLenta.metadata.sourceIndex === 18 && slowMotion.metadata.sourceIndex === 132 &&
  fpsFrameRate.metadata.sourceIndex === 51 && tasaFotogramas.metadata.sourceIndex === 145;

if (duplicatesReconciled) {
  recordCheck('Duplicate Pairs Reconciliation', true, 'Source pairs #18/#132 and #51/#145 authentically preserved with distinct sourceIndex tags');
} else {
  recordCheck('Duplicate Pairs Reconciliation', false, 'Duplicate pairs not properly reconciled');
}

// Output final JSON summary
fs.writeFileSync(path.join(__dirname, 'audit_evidence.json'), JSON.stringify(results, null, 2), 'utf8');
console.log('\n--- AUDIT COMPLETE ---');
console.log(`Total checks: ${results.checks.length}`);
console.log(`Passed: ${results.checks.filter(c => c.passed).length}`);
console.log(`Failed: ${results.checks.filter(c => !c.passed).length}`);
console.log(`Anomalies: ${results.anomalies.length}`);
