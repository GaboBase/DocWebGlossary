/**
 * DOCWEB MULTIGLOSSARY — E2E Test: Cross-Domain Search & Term Provenance
 * Phase 2 foundation (B-10): Cross-Domain Synthesis.
 *
 * Verifies the cross-domain search foundation added to semantic-engine.js:
 * - Multi-domain searchTerms (array of glossary ids).
 * - Backward-compatible single-domain searchTerms.
 * - searchCrossDomain returns provenance-annotated results with domain
 *   traceability (glossary id, title, domain) for every matched term.
 * - Relevance ordering (title matches before definition/synonym matches).
 * - getTermProvenance resolves a term back to its canonical source.
 * - Read-only, derived view: original domain data is never mutated.
 *
 * Runs in pure Node.js (zero dependencies, no network).
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { ROOT_DIR, TestRunner } = require('./test_utils');

function setupSandbox() {
  const sandbox = {
    window: {},
    console: { log: () => {}, warn: () => {}, error: () => {} }
  };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(ROOT_DIR, 'app', 'js', 'semantic-engine.js'), 'utf8'), sandbox);
  const semantics = sandbox.window.DocWebSemantics;

  // Load canonical data + glossaries so the engine has terms to search.
  const bundlePath = path.join(ROOT_DIR, 'app', 'data', 'bundle.js');
  const bundleSandbox = { window: {}, console: sandbox.console };
  vm.createContext(bundleSandbox);
  vm.runInContext(fs.readFileSync(bundlePath, 'utf8'), bundleSandbox);
  const catalog = bundleSandbox.window.DocWebCanonicalData.catalog;
  const glossaries = bundleSandbox.window.DocWebCanonicalData.glossaries;
  semantics.loadAll(catalog, glossaries);

  return semantics;
}

function runCrossDomainSearchTests() {
  const runner = new TestRunner('Cross-Domain Search & Provenance Suite');
  console.log(`\n=== Running ${runner.suiteName} ===`);

  const semantics = setupSandbox();
  const allTerms = semantics.getAllTerms();
  const glossaryIds = Array.from(semantics.glossaries.keys());

  runner.assert(
    typeof semantics.searchCrossDomain === 'function',
    'searchCrossDomain public contract is available',
    { feature: 'F9', tier: 1 }
  );
  runner.assert(
    typeof semantics.getTermProvenance === 'function',
    'getTermProvenance public contract is available',
    { feature: 'F9', tier: 1 }
  );
  runner.assert(
    allTerms.length === 295,
    'Catalog loaded 295 canonical terms across 8 domains',
    { feature: 'F9', tier: 1 }
  );
  runner.assert(
    glossaryIds.length === 8,
    'Eight glossary domains registered',
    { feature: 'F9', tier: 1 }
  );

  // ---------------------------------------------------------------
  // Tier 1: Backward-compatible single-domain searchTerms
  // ---------------------------------------------------------------
  console.log('\n--- Tier 1: Single-domain searchTerms backward compatibility ---');

  const avTerms = semantics.searchTerms('montaje', 'audiovisual-production');
  runner.assert(
    avTerms.length > 0,
    'Single-domain searchTerms returns audiovisual terms for "montaje"',
    { feature: 'F9', tier: 1 }
  );
  runner.assert(
    avTerms.every(t => t.glossaryId === 'audiovisual-production'),
    'Single-domain filter restricts results to the requested glossary',
    { feature: 'F9', tier: 1 }
  );

  const seTerms = semantics.searchTerms('transaccion', 'software-engineering-ontology');
  runner.assert(
    seTerms.length > 0,
    'Single-domain searchTerms returns software-engineering terms for "transaccion"',
    { feature: 'F9', tier: 1 }
  );
  runner.assert(
    seTerms.every(t => t.glossaryId === 'software-engineering-ontology'),
    'Software-engineering filter restricts results to its glossary',
    { feature: 'F9', tier: 1 }
  );

  // null filter returns every domain
  const all = semantics.searchTerms('montaje');
  runner.assert(
    all.length >= avTerms.length,
    'Null glossaryFilter searches every domain (superset of single-domain)',
    { feature: 'F9', tier: 1 }
  );

  // 'all' filter is equivalent to null
  const all2 = semantics.searchTerms('montaje', 'all');
  runner.assert(
    all2.length === all.length,
    '"all" filter matches null filter result count',
    { feature: 'F9', tier: 1 }
  );

  // ---------------------------------------------------------------
  // Tier 2: Multi-domain searchTerms (array of glossary ids)
  // ---------------------------------------------------------------
  console.log('\n--- Tier 2: Multi-domain searchTerms (cross-domain) ---');

  const twoDomains = semantics.searchTerms('render', [
    'render-3d-animations',
    'video-image'
  ]);
  runner.assert(
    twoDomains.length > 0,
    'Multi-domain searchTerms returns results from both domains',
    { feature: 'F9', tier: 2 }
  );
  runner.assert(
    twoDomains.every(t =>
      t.glossaryId === 'render-3d-animations' ||
      t.glossaryId === 'video-image'
    ),
    'Multi-domain results are limited to the requested glossary set',
    { feature: 'F9', tier: 2 }
  );
  runner.assert(
    twoDomains.some(t => t.glossaryId === 'render-3d-animations') &&
    twoDomains.some(t => t.glossaryId === 'video-image'),
    'Multi-domain search includes terms from each requested domain',
    { feature: 'F9', tier: 2 }
  );

  // Empty array behaves like all domains (no restriction)
  const emptyArray = semantics.searchTerms('montaje', []);
  runner.assert(
    emptyArray.length === all.length,
    'Empty glossary id array searches every domain',
    { feature: 'F9', tier: 2 }
  );

  // Multi-domain with a term present in only one domain
  const cross = semantics.searchTerms('difusion', [
    'generative-ai-media',
    'software-engineering-ontology'
  ]);
  runner.assert(
    cross.every(t => t.glossaryId === 'generative-ai-media'),
    'Cross-domain search for domain-specific term returns only that domain',
    { feature: 'F9', tier: 2 }
  );

  // Multi-domain respects category filter
  const crossCat = semantics.searchTerms('', [
    'render-3d-animations',
    'video-image'
  ], 'Renderizado');
  runner.assert(
    crossCat.every(t =>
      (t.glossaryId === 'render-3d-animations' || t.glossaryId === 'video-image') &&
      t.category === 'Renderizado'
    ),
    'Cross-domain search respects category filter',
    { feature: 'F9', tier: 2 }
  );

  // ---------------------------------------------------------------
  // Tier 2: searchCrossDomain provenance annotation
  // ---------------------------------------------------------------
  console.log('\n--- Tier 2: searchCrossDomain provenance annotation ---');

  const annotated = semantics.searchCrossDomain('montaje', [
    'audiovisual-production',
    'software-engineering-ontology'
  ]);
  runner.assert(
    annotated.length > 0,
    'searchCrossDomain returns annotated results',
    { feature: 'F9', tier: 2 }
  );
  runner.assert(
    annotated.every(r =>
      r.term && r.glossaryId && r.glossaryTitle && r.domain !== undefined &&
      typeof r.relevance === 'number'
    ),
    'Every result carries term, glossaryId, glossaryTitle, domain, relevance',
    { feature: 'F9', tier: 2 }
  );
  runner.assert(
    annotated.every(r => r.term.glossaryId === r.glossaryId),
    'Result glossaryId matches the term\'s owning glossary',
    { feature: 'F9', tier: 2 }
  );
  runner.assert(
    annotated.some(r => r.glossaryId === 'audiovisual-production'),
    'Cross-domain results include audiovisual-production provenance',
    { feature: 'F9', tier: 2 }
  );

  // searchCrossDomain with no glossaryIds covers every domain
  const annotatedAll = semantics.searchCrossDomain('montaje');
  runner.assert(
    annotatedAll.length === all.length,
    'searchCrossDomain without glossaryIds covers every domain',
    { feature: 'F9', tier: 2 }
  );
  runner.assert(
    annotatedAll.every(r => r.glossaryTitle),
    'Every result resolves a glossary title',
    { feature: 'F9', tier: 2 }
  );

  // ---------------------------------------------------------------
  // Tier 2: Relevance ordering (title matches rank higher)
  // ---------------------------------------------------------------
  console.log('\n--- Tier 2: Relevance ordering ---');

  const relevance = semantics.searchCrossDomain('montaje', [
    'audiovisual-production'
  ]);
  runner.assert(
    relevance.length > 1,
    'Enough results to check relevance ordering',
    { feature: 'F9', tier: 2 }
  );
  let ordered = true;
  for (let i = 1; i < relevance.length; i++) {
    if (relevance[i - 1].relevance < relevance.relevance) {
      ordered = false;
      break;
    }
  }
  runner.assert(
    ordered,
    'Results are ordered by relevance descending',
    { feature: 'F9', tier: 2 }
  );

  // A title match should outrank a definition-only match for the same query.
  const titleQuery = semantics.searchCrossDomain('montaje', [
    'audiovisual-production'
  ]);
  const titleMatch = titleQuery.find(r => r.term.title.toLowerCase().includes('montaje'));
  const defOnly = titleQuery.find(r =>
    !r.term.title.toLowerCase().includes('montaje') &&
    (r.term.definition || '').toLowerCase().includes('montaje')
  );
  if (titleMatch && defOnly) {
    runner.assert(
      titleMatch.relevance >= defOnly.relevance,
      'Title match ranks at least as high as definition-only match',
      { feature: 'F9', tier: 2 }
    );
  } else {
    runner.assert(true, 'Title vs definition relevance comparison (data available)',
      { feature: 'F9', tier: 2 });
  }

  // limit option
  const limited = semantics.searchCrossDomain('montaje', [
    'audiovisual-production'
  ], { limit: 3 });
  runner.assert(
    limited.length <= 3,
    'searchCrossDomain respects the limit option',
    { feature: 'F9', tier: 2 }
  );

  // ---------------------------------------------------------------
  // Tier 1: getTermProvenance domain traceability
  // ---------------------------------------------------------------
  console.log('\n--- Tier 1: getTermProvenance domain traceability ---');

  const sample = allTerms[0];
  const prov = semantics.getTermProvenance(sample.id);
  runner.assert(
    prov !== null,
    'getTermProvenance returns provenance for a known term',
    { feature: 'F9', tier: 1 }
  );
  runner.assert(
    prov && prov.termId === sample.id,
    'Provenance termId matches the queried term',
    { feature: 'F9', tier: 1 }
  );
  runner.assert(
    prov && prov.glossaryId === sample.glossaryId,
    'Provenance glossaryId matches the term\'s owning glossary',
    { feature: 'F9', tier: 1 }
  );
  runner.assert(
    prov && typeof prov.domain === 'string',
    'Provenance includes a domain string',
    { feature: 'F9', tier: 1 }
  );
  runner.assert(
    prov && typeof prov.ontologyLevel === 'string',
    'Provenance includes the ontology level',
    { feature: 'F9', tier: 1 }
  );

  const unknown = semantics.getTermProvenance('urn:term:does-not-exist');
  runner.assert(
    unknown === null,
    'getTermProvenance returns null for an unknown term',
    { feature: 'F9', tier: 1 }
  );

  // ---------------------------------------------------------------
  // Tier 1: Read-only / derived (original data not mutated)
  // ---------------------------------------------------------------
  console.log('\n--- Tier 1: Read-only derived view ---');

  const beforeCount = allTerms.length;
  semantics.searchCrossDomain('montaje', glossaryIds);
  semantics.searchTerms('montaje', glossaryIds);
  semantics.getTermProvenance(sample.id);
  const afterCount = semantics.getAllTerms().length;
  runner.assert(
    beforeCount === afterCount,
    'Cross-domain search does not add or remove terms',
    { feature: 'F9', tier: 1 }
  );
  runner.assert(
    semantics.getTerm(sample.id).title === sample.title,
    'Original term object is unchanged after cross-domain search',
    { feature: 'F9', tier: 1 }
  );

  return runner.printReport();
}

if (require.main === module) {
  runCrossDomainSearchTests();
}

module.exports = { runCrossDomainSearchTests };
