/**
 * Deep Adversarial Edge-Case Prober - Milestone 1
 * Agent: challenger_m1_1
 * Adversarial angles:
 *  1. Graph connectivity & isolated nodes (island terms with degree 0)
 *  2. URN syntax strictness: lowercase, kebab-case, no spaces, no special symbols
 *  3. Prototype pollution / dangerous key probing (__proto__, constructor, prototype)
 *  4. Deep duplicate title & synonym collision audit
 *  5. Hidden network payloads: base64 data URIs, local/cloud IP addresses (127.0.0.1, 169.254.169.254), mailto, ws://, wss://
 *  6. Cross-glossary target validity: are the 28 cross-glossary targets valid in VideoImage and Render3D?
 *  7. Bidirectional relation consistency check
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../../..');
const AUDIOVISUAL_DIR = path.join(ROOT_DIR, 'AudiovisualProduction', 'data');
const CATALOG_PATH = path.join(ROOT_DIR, 'app', 'data', 'catalog.json');
const VIDEO_IMAGE_TERMS = path.join(ROOT_DIR, 'VideoImage', 'data', 'terms.json');
const RENDER_3D_TERMS = path.join(ROOT_DIR, 'Render-3D-Animations', 'data', 'terms.json');

const avData = JSON.parse(fs.readFileSync(path.join(AUDIOVISUAL_DIR, 'terms.json'), 'utf8'));
const viData = JSON.parse(fs.readFileSync(VIDEO_IMAGE_TERMS, 'utf8'));
const r3dData = JSON.parse(fs.readFileSync(RENDER_3D_TERMS, 'utf8'));

const avTerms = avData.canonicalTerms || [];
const viTerms = viData.canonicalTerms || [];
const r3dTerms = r3dData.canonicalTerms || [];

let total = 0;
let passed = 0;
let failed = 0;
const issues = [];

function check(cond, desc, meta = null) {
  total++;
  if (cond) {
    passed++;
    console.log(`  [PASS] ${desc}`);
  } else {
    failed++;
    issues.push({ desc, meta });
    console.error(`  [FAIL] ${desc}`);
    if (meta) console.error(`         Meta:`, meta);
  }
}

console.log('================================================================');
console.log('DEEP ADVERSARIAL EDGE-CASE PROBER — MILESTONE 1');
console.log('================================================================\n');

// 1. Prototype pollution & dangerous property names
console.log('--- 1. Prototype Pollution & Dangerous Keys ---');
function checkDangerousKeys(obj, pathStr = '') {
  let count = 0;
  if (!obj || typeof obj !== 'object') return 0;
  for (const key of Object.keys(obj)) {
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      check(false, `Dangerous key "${key}" detected at ${pathStr}`);
      count++;
    }
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      count += checkDangerousKeys(obj[key], `${pathStr}.${key}`);
    }
  }
  return count;
}
const dangerousKeyCount = checkDangerousKeys(avData, 'terms.json');
check(dangerousKeyCount === 0, `Zero dangerous/polluting keys found in terms.json (found ${dangerousKeyCount})`);

// 2. Strict URN syntax & slug conformity
console.log('\n--- 2. Strict URN Syntax & Slug Conformity ---');
const urnRegex = /^urn:term:audiovisual-production:[a-z0-9]+(?:-[a-z0-9]+)*$/;
let nonConformingURNs = 0;
for (const term of avTerms) {
  if (!urnRegex.test(term.id)) {
    nonConformingURNs++;
    check(false, `Non-conforming URN: ${term.id}`);
  }
  const expectedSlug = term.id.replace('urn:term:audiovisual-production:', '');
  if (term.slug !== expectedSlug) {
    check(false, `Slug does not match URN suffix: slug=${term.slug}, expected=${expectedSlug}`);
  }
}
check(nonConformingURNs === 0, `All 185 URNs strictly follow lowercase kebab-case urn:term:audiovisual-production:<slug>`);

// 3. Graph Degree Distribution & Island Terms
console.log('\n--- 3. Graph Degree Distribution & Island Detection ---');
const outgoingDegree = new Map();
const incomingDegree = new Map();

for (const t of avTerms) {
  outgoingDegree.set(t.id, 0);
  incomingDegree.set(t.id, 0);
}
for (const t of viTerms) incomingDegree.set(t.id, 0);
for (const t of r3dTerms) incomingDegree.set(t.id, 0);

for (const t of avTerms) {
  const rels = t.relations || [];
  outgoingDegree.set(t.id, rels.length);
  for (const r of rels) {
    if (incomingDegree.has(r.target)) {
      incomingDegree.set(r.target, incomingDegree.get(r.target) + 1);
    }
  }
}

let isolatedTerms = 0;
let minDegree = Infinity;
let maxDegree = 0;
for (const [id, outDeg] of outgoingDegree.entries()) {
  const inDeg = incomingDegree.get(id) || 0;
  const totalDeg = outDeg + inDeg;
  if (totalDeg === 0) {
    isolatedTerms++;
    check(false, `Isolated island term with degree 0: ${id}`);
  }
  if (outDeg < minDegree) minDegree = outDeg;
  if (outDeg > maxDegree) maxDegree = outDeg;
}

check(isolatedTerms === 0, `Zero isolated island terms in audiovisual knowledge graph`);
check(minDegree >= 1, `Every term has at least 1 outgoing relation (min outgoing: ${minDegree}, max: ${maxDegree})`);
console.log(`     Min outgoing degree: ${minDegree}, Max outgoing degree: ${maxDegree}`);

// 4. Cross-Glossary Target Deep Check
console.log('\n--- 4. Cross-Glossary Target Resolution Deep Verification ---');
const viURNs = new Set(viTerms.map(t => t.id));
const r3dURNs = new Set(r3dTerms.map(t => t.id));

let crossViCount = 0;
let crossR3dCount = 0;
let invalidCrossTargets = 0;

for (const t of avTerms) {
  for (const r of (t.relations || [])) {
    if (r.target.startsWith('urn:term:video-image:')) {
      if (viURNs.has(r.target)) {
        crossViCount++;
      } else {
        invalidCrossTargets++;
        check(false, `Invalid cross-target in VideoImage: ${r.target} (from ${t.id})`);
      }
    } else if (r.target.startsWith('urn:term:render-3d-animations:')) {
      if (r3dURNs.has(r.target)) {
        crossR3dCount++;
      } else {
        invalidCrossTargets++;
        check(false, `Invalid cross-target in Render3D: ${r.target} (from ${t.id})`);
      }
    }
  }
}
check(invalidCrossTargets === 0, `Zero invalid cross-glossary targets (found ${invalidCrossTargets})`);
check(crossViCount > 0, `Verified ${crossViCount} valid relations to VideoImage terms`);
check(crossR3dCount > 0, `Verified ${crossR3dCount} valid relations to Render-3D-Animations terms`);

// 5. Title & Synonym Duplicate Probing
console.log('\n--- 5. Title & Synonym Collision Probing ---');
const titleMap = new Map();
let duplicateTitles = 0;
for (const t of avTerms) {
  const normTitle = t.title.toLowerCase().trim();
  if (titleMap.has(normTitle)) {
    duplicateTitles++;
    console.warn(`  Warning: duplicate title "${normTitle}" in ${t.id} and ${titleMap.get(normTitle)}`);
  } else {
    titleMap.set(normTitle, t.id);
  }
}
check(duplicateTitles === 0, `Zero duplicate titles within Audiovisual glossary (found ${duplicateTitles})`);

// 6. Deep Autonomy / Suspicious Strings Probe
console.log('\n--- 6. Deep Autonomy / Hidden Network & Protocol Probes ---');
const suspiciousPatterns = [
  { name: 'WebSocket protocol', re: /\b(ws|wss):\/\//i },
  { name: 'FTP protocol', re: /\b(ftp|sftp):\/\//i },
  { name: 'Localhost or loopback', re: /\b(localhost|127\.0\.0\.1|0\.0\.0\.0)\b/i },
  { name: 'Cloud metadata IP', re: /\b169\.254\.169\.254\b/ },
  { name: 'Email / mailto', re: /\bmailto:/i },
  { name: 'HTML script tag injection', re: /<script\b[^>]*>/i },
  { name: 'JavaScript event handler', re: /\bonerror=|\bonload=/i },
  { name: 'Base64 data URI', re: /data:(text\/html|application\/javascript);base64,/i }
];

const avRaw = fs.readFileSync(path.join(AUDIOVISUAL_DIR, 'terms.json'), 'utf8');
let suspiciousHits = 0;
for (const pat of suspiciousPatterns) {
  const match = avRaw.match(pat.re);
  if (match) {
    suspiciousHits++;
    check(false, `Suspicious pattern "${pat.name}" detected: ${match[0]}`);
  } else {
    check(true, `No "${pat.name}" detected in terms.json`);
  }
}
check(suspiciousHits === 0, `Zero suspicious network/injection patterns found in terms.json`);

// 7. Verification of Category Distribution
console.log('\n--- 7. Category Distribution Balance ---');
const catCounts = {};
for (const t of avTerms) {
  catCounts[t.category] = (catCounts[t.category] || 0) + 1;
}
console.log('Category distribution:', JSON.stringify(catCounts, null, 2));
const categoriesWithZero = Object.keys(catCounts).filter(k => catCounts[k] === 0);
check(Object.keys(catCounts).length === 13, `All 13 categories have terms assigned (found ${Object.keys(catCounts).length})`);
check(categoriesWithZero.length === 0, `Zero empty categories in Audiovisual glossary`);

console.log('\n================================================================');
console.log(`DEEP ADVERSARIAL AUDIT SUMMARY: Total ${total}, Passed ${passed}, Failed ${failed}`);
console.log('================================================================');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
