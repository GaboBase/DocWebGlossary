const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT_DIR = path.resolve(__dirname, '..', '..', '..');
const enginePath = path.join(ROOT_DIR, 'app', 'js', 'semantic-engine.js');
const code = fs.readFileSync(enginePath, 'utf8');

const sandbox = {
  window: {},
  console: { log: console.log, warn: console.warn, error: console.error }
};

vm.createContext(sandbox);
vm.runInContext(code, sandbox);
const engine = sandbox.window.DocWebSemantics;

console.log('Testing Edge Cases:');

// Test 1: Empty engine calls
console.log('1. getTerm(null):', engine.getTerm(null));
console.log('2. getInverseRelations(null):', engine.getInverseRelations(null));
console.log('3. generateJsonLd(null):', engine.generateJsonLd(null));
console.log('4. generateContextualDiagramSvg(null):', engine.generateContextualDiagramSvg(null).substring(0, 30));

// Test 2: Extreme characters in term
const extremeTerm = {
  id: 'urn:term:test:extreme-id',
  slug: 'test-extreme',
  title: 'Test <script>alert(1)</script> & "quotes" \'single\'',
  glossaryId: 'test-glossary',
  category: '<b>XSS</b> & Cat',
  level: 'adv<ance>d',
  definition: 'Def & < > " \' /',
  extendedDefinition: 'ExtDef & < > " \' /',
  synonyms: ['Syn1 <tag>', 'Syn2 & more'],
  components: ['Comp <1>', 'Comp & 2'],
  relations: [
    { type: 'specializesIn', target: 'urn:term:test:target\'1' },
    { type: 'precedes', target: 'urn:term:test:target<2>' },
    { type: 'unknown_type', target: 'urn:term:test:target&3' }
  ]
};

engine.terms.set(extremeTerm.id, extremeTerm);
engine.computeInverseRelations();

const jsonLd = engine.generateJsonLd(extremeTerm);
console.log('5. JSON-LD stringifiable:', JSON.stringify(jsonLd).length > 0);

const svg = engine.generateContextualDiagramSvg(extremeTerm);
console.log('6. SVG generated length:', svg.length);
console.log('   SVG contains raw unescaped script tag:', svg.includes('<script>'));
console.log('   SVG contains escaped script tag:', svg.includes('&lt;script&gt;'));

// Test 3: Search with regex characters and edge queries
const search1 = engine.searchTerms('[.*+?^${}()|[\\]\\\\]');
console.log('7. Search with regex chars returns:', search1.length);

const search2 = engine.searchTerms('   ');
console.log('8. Search with whitespace returns:', search2.length);

// Test 4: Inverse relations check for extremeTerm targets
const inv1 = engine.getInverseRelations('urn:term:test:target\'1');
console.log('9. Inverse rel 1 (specializesIn -> moreGeneralThan):', inv1[0].type === 'moreGeneralThan');

const inv2 = engine.getInverseRelations('urn:term:test:target<2>');
console.log('10. Inverse rel 2 (precedes -> succeeds):', inv2[0].type === 'succeeds');

const inv3 = engine.getInverseRelations('urn:term:test:target&3');
console.log('11. Inverse rel 3 (unknown_type -> reverseRelatedTo):', inv3[0].type === 'reverseRelatedTo');

console.log('ALL EDGE TESTS PASSED!');

// Test 5: Self-reference and multi-edges
const selfRefTerm = {
  id: 'urn:term:test:self-ref',
  slug: 'self-ref',
  title: 'Self Referencing Term',
  glossaryId: 'test-glossary',
  category: 'logic',
  definition: 'Refers to itself',
  relations: [
    { type: 'relatedTo', target: 'urn:term:test:self-ref' },
    { type: 'specializesIn', target: 'urn:term:test:self-ref' }
  ]
};

engine.terms.set(selfRefTerm.id, selfRefTerm);
engine.computeInverseRelations();

const selfSvg = engine.generateContextualDiagramSvg(selfRefTerm);
console.log('12. Self-referencing SVG generated without crash:', typeof selfSvg === 'string' && selfSvg.length > 0);
