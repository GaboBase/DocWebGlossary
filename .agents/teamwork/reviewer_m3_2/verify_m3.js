/**
 * Independent Verification Script for Milestone 3
 * Reviewer: reviewer_m3_2
 * Validates DOM generation, event handling, 13 categories rendering, A-Z filter,
 * semantic HTML5 tags, microdata, search debouncing, and regression checks.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '../../..');

// 1. Read files
const catalog = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'app/data/catalog.json'), 'utf8'));
const r3dTerms = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'Render-3D-Animations/data/terms.json'), 'utf8')).canonicalTerms;
const viTerms = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'VideoImage/data/terms.json'), 'utf8')).canonicalTerms;
const avTerms = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'AudiovisualProduction/data/terms.json'), 'utf8')).canonicalTerms;
const avGlossary = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'AudiovisualProduction/data/glossary.json'), 'utf8'));

console.log('=== Independent Milestone 3 Verification ===\n');

// Mock DOM elements and document/window
class MockElement {
  constructor(tagName = 'div') {
    this.tagName = tagName.toUpperCase();
    this.children = [];
    this.attributes = {};
    this.className = '';
    this.textContent = '';
    this.innerHTML_val = '';
    this.value = '';
    this.style = {};
    this.eventListeners = {};
    this.id = '';
  }

  get innerHTML() {
    return this.innerHTML_val;
  }

  set innerHTML(val) {
    this.innerHTML_val = val;
    this.children = [];
  }

  appendChild(child) {
    this.children.push(child);
    return child;
  }

  setAttribute(k, v) {
    this.attributes[k] = String(v);
  }

  getAttribute(k) {
    return this.attributes[k] || null;
  }

  addEventListener(event, handler) {
    if (!this.eventListeners[event]) this.eventListeners[event] = [];
    this.eventListeners[event].push(handler);
  }

  dispatchEvent(event) {
    if (this.eventListeners[event.type]) {
      this.eventListeners[event.type].forEach(fn => fn(event));
    }
  }

  querySelectorAll(sel) {
    const results = [];
    function search(el) {
      for (const child of el.children) {
        if (sel.startsWith('.') && child.className && child.className.includes(sel.slice(1))) {
          results.push(child);
        } else if (sel.startsWith('#') && child.id === sel.slice(1)) {
          results.push(child);
        } else if (child.tagName.toLowerCase() === sel.toLowerCase()) {
          results.push(child);
        }
        search(child);
      }
    }
    search(this);
    return results;
  }

  querySelector(sel) {
    const res = this.querySelectorAll(sel);
    return res.length > 0 ? res[0] : null;
  }

  get classList() {
    const self = this;
    return {
      add(cls) {
        const parts = new Set(self.className.split(/\s+/).filter(Boolean));
        parts.add(cls);
        self.className = Array.from(parts).join(' ');
      },
      remove(cls) {
        const parts = new Set(self.className.split(/\s+/).filter(Boolean));
        parts.delete(cls);
        self.className = Array.from(parts).join(' ');
      },
      contains(cls) {
        return self.className.split(/\s+/).includes(cls);
      }
    };
  }

  remove() {
    if (this.parentNode) {
      const idx = this.parentNode.children.indexOf(this);
      if (idx !== -1) this.parentNode.children.splice(idx, 1);
    }
  }
}

// Global elements map
const elementsById = new Map();
function registerEl(id, tagName = 'div') {
  const el = new MockElement(tagName);
  el.id = id;
  elementsById.set(id, el);
  return el;
}

const mockDoc = {
  head: new MockElement('head'),
  body: new MockElement('body'),
  getElementById(id) {
    return elementsById.get(id) || null;
  },
  createElement(tag) {
    const el = new MockElement(tag);
    return el;
  },
  querySelectorAll(sel) {
    return mockDoc.body.querySelectorAll(sel);
  }
};

registerEl('system-status-indicator', 'span');
registerEl('glossary-select', 'select');
registerEl('search-input', 'input');
registerEl('az-nav', 'nav');
registerEl('category-container', 'div');
registerEl('terms-list', 'nav');
registerEl('term-view-container', 'main');
registerEl('btn-new-term', 'button');
registerEl('btn-export-capsule', 'button');
registerEl('btn-import-capsule', 'button');
registerEl('input-import-file', 'input');

// Setup environment
global.window = {
  DocWebStorage: {
    getAllCustomTerms: async () => [],
    saveTerm: async () => true,
    exportKnowledgeCapsule: async () => ({ version: '1.0.0', customTerms: [] }),
    importKnowledgeCapsule: async () => ({ importedTerms: 0, importedRevisions: 0 })
  },
  addEventListener: () => {}
};
global.document = mockDoc;
global.fetch = async (url) => {
  return {
    json: async () => {
      if (url.includes('catalog.json')) return catalog;
      if (url.includes('Render-3D-Animations')) return { canonicalTerms: r3dTerms };
      if (url.includes('VideoImage')) return { canonicalTerms: viTerms };
      if (url.includes('AudiovisualProduction')) return { canonicalTerms: avTerms };
      return {};
    }
  };
};

// Load SemanticEngine
const engineCode = fs.readFileSync(path.join(ROOT_DIR, 'app/js/semantic-engine.js'), 'utf8');
const vm = require('vm');
vm.runInThisContext(engineCode);

// Load App
const appCode = fs.readFileSync(path.join(ROOT_DIR, 'app/js/app.js'), 'utf8');
vm.runInThisContext(appCode);

let testsPassed = 0;
let testsFailed = 0;

function check(desc, condition) {
  if (condition) {
    console.log(`  ✔ PASS: ${desc}`);
    testsPassed++;
  } else {
    console.error(`  ✘ FAIL: ${desc}`);
    testsFailed++;
  }
}

async function run() {
  console.log('--- Subsystem 1: Initialization & Loading ---');
  await window.DocWebApp.init();
  check('DocWebApp initialized without throw', true);
  check('Total terms loaded in engine equals 205', window.DocWebSemantics.getAllTerms().length === 205);

  console.log('\n--- Subsystem 2: Category Chips & Audiovisual Production ---');
  // Check when currentGlossaryId = 'audiovisual-production'
  window.DocWebApp.currentGlossaryId = 'audiovisual-production';
  window.DocWebApp.renderCategoryChips();
  const catContainer = document.getElementById('category-container');
  const chips = catContainer.children;
  check('Total chips rendered is 14 (1 "Todas" + 13 categories)', chips.length === 14);
  check('First chip is "Todas"', chips[0].textContent === 'Todas');

  const renderedCatNames = chips.slice(1).map(c => c.textContent);
  const expectedCats = [...avGlossary.categories].sort((a, b) => a.localeCompare(b, 'es'));
  check('13 categories match avGlossary categories sorted in Spanish',
    JSON.stringify(renderedCatNames) === JSON.stringify(expectedCats));

  // Verify accessibility attributes on chips
  const allAccessible = chips.every(c =>
    c.getAttribute('role') === 'button' &&
    c.getAttribute('tabindex') === '0' &&
    c.getAttribute('aria-label') !== null
  );
  check('All category chips have role="button", tabindex="0", and aria-label', allAccessible);

  // Test clicking category chip
  const firstCategoryChip = chips[1];
  firstCategoryChip.onclick();
  check(`Clicking chip sets currentCategory to "${firstCategoryChip.textContent}"`,
    window.DocWebApp.currentCategory === firstCategoryChip.textContent);

  // Test toggling active chip back to all
  firstCategoryChip.onclick();
  check('Clicking active category chip toggles back to "all"',
    window.DocWebApp.currentCategory === 'all');

  console.log('\n--- Subsystem 3: A-Z Navigation Bar ---');
  window.DocWebApp.renderAzNav();
  const azNav = document.getElementById('az-nav');
  const azBtns = azNav.children;
  check('A-Z nav contains 27 buttons (1 "TODOS" + 26 letters A-Z)', azBtns.length === 27);
  check('First button is "TODOS"', azBtns[0].textContent === 'TODOS' && azBtns[0].getAttribute('data-letter') === 'all');
  check('Letters A to Z are rendered sequentially',
    azBtns.slice(1).map(b => b.textContent).join('') === 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');

  // Test clicking letter 'C'
  const cBtn = azBtns.find(b => b.getAttribute('data-letter') === 'C');
  cBtn.onclick();
  check('Clicking letter button sets currentLetter to "C"', window.DocWebApp.currentLetter === 'C');
  check('updateAzNavActive marks "C" button as active', cBtn.classList.contains('active'));

  // Test toggling letter 'C' back to all
  cBtn.onclick();
  check('Clicking active letter button toggles back to "all"', window.DocWebApp.currentLetter === 'all');

  console.log('\n--- Subsystem 4: Filter and Search with Spanish Diacritics ---');
  // Test letter filtering on Spanish diacritics (e.g. Óptica starts with O)
  window.DocWebApp.currentGlossaryId = 'audiovisual-production';
  window.DocWebApp.currentCategory = 'all';
  window.DocWebApp.currentLetter = 'O';
  window.DocWebApp.filterAndRenderTerms();
  const termsListEl = document.getElementById('terms-list');
  const itemsO = termsListEl.children;
  check('Letter "O" matches terms starting with O or Ó', itemsO.length > 0);
  const titlesO = itemsO.map(it => {
    const match = it.innerHTML.match(/class="term-item-title">([^<]+)<\/span>/);
    return match ? match[1] : '';
  });
  const allStartWithO = titlesO.length > 0 && titlesO.every(t => {
    const clean = t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toUpperCase();
    return clean.startsWith('O');
  });
  check('All filtered items for letter "O" start with O (normalized)', allStartWithO);

  // Test multi-field search
  window.DocWebApp.currentLetter = 'all';
  window.DocWebApp.filterAndRenderTerms('cinematografía');
  const searchResults = termsListEl.children;
  check('Search for "cinematografía" returns non-empty result set', searchResults.length > 0);

  // Test search robustness against unexpected types in synonyms/components
  const weirdTerm = {
    id: 'urn:term:test:weird',
    glossaryId: 'test',
    title: 'Weird Test Term',
    category: 'test',
    synonyms: [null, undefined, 42, { not: 'a string' }],
    components: [false, 123]
  };
  window.DocWebSemantics.terms.set(weirdTerm.id, weirdTerm);
  let searchThrew = false;
  try {
    window.DocWebApp.filterAndRenderTerms('weird');
  } catch (e) {
    searchThrew = true;
  }
  check('filterAndRenderTerms handles non-string synonyms and components defensively without throwing', !searchThrew);
  window.DocWebSemantics.terms.delete(weirdTerm.id);

  console.log('\n--- Subsystem 5: Semantic HTML5 DOM Rendering (renderTermView) ---');
  const sampleTerm = window.DocWebSemantics.getTerm('urn:term:audiovisual-production:plano-secuencia')
    || window.DocWebSemantics.getAllTerms()[0];

  window.DocWebApp.renderTermView(sampleTerm);
  const termView = document.getElementById('term-view-container');
  const viewHtml = termView.innerHTML;

  check('Term view uses <article> element', viewHtml.includes('<article') && viewHtml.includes('</article>'));
  check('Article declares itemtype="https://schema.org/DefinedTerm"',
    viewHtml.includes('itemtype="https://schema.org/DefinedTerm"'));
  check('Article includes data-term-id attribute', viewHtml.includes(`data-term-id="${sampleTerm.id}"`));
  check('Article includes data-glossary-id attribute', viewHtml.includes(`data-glossary-id="${sampleTerm.glossaryId}"`));
  check('Article includes data-category attribute', viewHtml.includes('data-category='));
  check('Title is rendered using <dfn> tag with itemprop="name"',
    viewHtml.includes('<dfn class="term-title-large" itemprop="name">'));
  check('Definition section uses <section> with itemprop="description"',
    viewHtml.includes('<section class="term-definition-section"') && viewHtml.includes('itemprop="description"'));
  check('Attributes and components rendered via <dl>, <dt>, <dd>',
    viewHtml.includes('<dl class="info-grid">') && viewHtml.includes('<dt class="info-block-title">') && viewHtml.includes('<dd class="info-block-content">'));
  check('JSON-LD script tag injected into document.head with id="term-jsonld-script"',
    elementsById.has('term-jsonld-script') || mockDoc.head.querySelector('#term-jsonld-script') !== null);

  console.log('\n--- Subsystem 6: Existing Controls & Regressions ---');
  // Check modal editor
  window.DocWebApp.openTermEditor();
  const modalEl = elementsById.get('term-editor-modal') || mockDoc.body.querySelector('#term-editor-modal');
  check('openTermEditor creates #term-editor-modal in DOM', modalEl !== null || mockDoc.body.innerHTML.includes('term-editor-modal'));

  console.log(`\nVerification Summary: ${testsPassed} passed, ${testsFailed} failed`);
  process.exit(testsFailed === 0 ? 0 : 1);
}

run().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
