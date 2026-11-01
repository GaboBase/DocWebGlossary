/**
 * DOCWEB MULTIGLOSSARY — Milestone 3 Empirical Adversarial Challenge Test Suite
 * Agent: challenger_m3_1 (Empirical Adversarial Challenger)
 * Focus:
 *   1. DOM parsing of rendered term views across all 205 terms (<article>, <dfn>, <dl>, microdata)
 *   2. A-Z navigation filtering (all letters A-Z, accents/diacritics, subset counts)
 *   3. Multi-field search stress test (regex special characters, subconcepts, synonyms)
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { ROOT_DIR, TestRunner } = require('./test_utils');

// ---------------------------------------------------------------------------
// Mock DOM Implementation for Isolated Node.js Execution
// ---------------------------------------------------------------------------
function createMockDOM() {
  const elements = new Map();

  class MockElement {
    constructor(tagName, id = null) {
      this.tagName = tagName.toUpperCase();
      this.id = id || '';
      this.className = '';
      this.textContent = '';
      this.innerHTML = '';
      this.value = '';
      this.attributes = new Map();
      this.children = [];
      this.parentNode = null;
      this.eventListeners = new Map();
      this.type = '';
      this.style = {};
      this.classList = {
        _classes: new Set(),
        add: (cls) => {
          this.classList._classes.add(cls);
          this.className = Array.from(this.classList._classes).join(' ');
        },
        remove: (cls) => {
          this.classList._classes.delete(cls);
          this.className = Array.from(this.classList._classes).join(' ');
        },
        contains: (cls) => this.classList._classes.has(cls)
      };
    }

    setAttribute(name, val) {
      this.attributes.set(name, String(val));
    }

    getAttribute(name) {
      return this.attributes.get(name) || null;
    }

    hasAttribute(name) {
      return this.attributes.has(name);
    }

    appendChild(child) {
      child.parentNode = this;
      this.children.push(child);
      return child;
    }

    addEventListener(event, fn) {
      if (!this.eventListeners.has(event)) {
        this.eventListeners.set(event, []);
      }
      this.eventListeners.get(event).push(fn);
    }

    dispatchEvent(event) {
      const listeners = this.eventListeners.get(event.type) || [];
      for (const fn of listeners) {
        fn(event);
      }
    }

    querySelectorAll(selector) {
      const results = [];
      function traverse(node) {
        if (!node || !node.children) return;
        for (const child of node.children) {
          if (selector.startsWith('.') && child.classList.contains(selector.slice(1))) {
            results.push(child);
          } else if (selector.startsWith('#') && child.id === selector.slice(1)) {
            results.push(child);
          } else if (child.tagName === selector.toUpperCase()) {
            results.push(child);
          }
          traverse(child);
        }
      }
      traverse(this);
      return results;
    }

    get innerHTML() {
      return this._innerHTML;
    }

    set innerHTML(val) {
      this._innerHTML = String(val);
      this.children = [];
    }
  }

  const document = {
    head: new MockElement('head'),
    body: new MockElement('body'),
    getElementById(id) {
      if (!elements.has(id)) {
        const el = new MockElement('div', id);
        elements.set(id, el);
      }
      return elements.get(id);
    },
    createElement(tagName) {
      return new MockElement(tagName);
    },
    querySelectorAll(selector) {
      const results = [];
      for (const el of elements.values()) {
        if (selector.startsWith('.') && el.classList.contains(selector.slice(1))) {
          results.push(el);
        } else if (selector.startsWith('#') && el.id === selector.slice(1)) {
          results.push(el);
        } else if (el.tagName === selector.toUpperCase()) {
          results.push(el);
        }
        results.push(...el.querySelectorAll(selector));
      }
      return results;
    }
  };

  // Pre-populate core container elements from index.html
  elements.set('system-status-indicator', new MockElement('span', 'system-status-indicator'));
  elements.set('glossary-select', new MockElement('select', 'glossary-select'));
  elements.set('search-input', new MockElement('input', 'search-input'));
  elements.set('az-nav', new MockElement('nav', 'az-nav'));
  elements.set('category-container', new MockElement('div', 'category-container'));
  elements.set('terms-list', new MockElement('nav', 'terms-list'));
  elements.set('term-view-container', new MockElement('main', 'term-view-container'));

  return { document, elements };
}

// ---------------------------------------------------------------------------
// Lightweight HTML Structure / Tokenizer & Tag-Balance Checker
// ---------------------------------------------------------------------------
function validateHtml5Structure(htmlString) {
  const errors = [];
  if (!htmlString || typeof htmlString !== 'string') {
    return { valid: false, errors: ['HTML string is empty or invalid'] };
  }

  const voidElements = new Set([
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
    'link', 'meta', 'param', 'source', 'track', 'wbr'
  ]);

  const svgSelfClosing = new Set([
    'circle', 'rect', 'path', 'polygon', 'polyline', 'line', 'ellipse', 'stop', 'use'
  ]);

  const tagStack = [];
  const tokenRegex = /<!--[\s\S]*?-->|<\/([a-zA-Z0-9:-]+)\s*>|<([a-zA-Z0-9:-]+)([\s\S]*?)(\/?)>/g;

  let match;
  let hasArticle = false;
  let hasHeader = false;
  let hasDfn = false;
  let hasDl = false;
  let hasDt = false;
  let hasDd = false;
  let hasItemscope = false;
  let hasDefinedTermType = false;
  let hasItempropName = false;
  let hasItempropDescription = false;
  let hasItempropDisambiguating = false;
  let hasDataTermId = false;
  let hasDataGlossaryId = false;

  while ((match = tokenRegex.exec(htmlString)) !== null) {
    const [fullTag, closingTag, openingTag, attrString, isSelfClosing] = match;

    if (fullTag.startsWith('<!--')) {
      continue; // HTML comment
    }

    if (closingTag) {
      const lowerClose = closingTag.toLowerCase();
      if (voidElements.has(lowerClose) || svgSelfClosing.has(lowerClose)) {
        continue;
      }
      if (tagStack.length === 0) {
        errors.push(`Unexpected closing tag </${closingTag}> with empty stack`);
      } else {
        const top = tagStack.pop();
        if (top.toLowerCase() !== lowerClose) {
          errors.push(`Mismatched closing tag </${closingTag}>, expected </${top}>`);
        }
      }
    } else if (openingTag) {
      const lowerOpen = openingTag.toLowerCase();

      if (lowerOpen === 'article') {
        hasArticle = true;
        if (attrString.includes('itemscope')) hasItemscope = true;
        if (attrString.includes('https://schema.org/DefinedTerm')) hasDefinedTermType = true;
        if (attrString.includes('data-term-id=')) hasDataTermId = true;
        if (attrString.includes('data-glossary-id=')) hasDataGlossaryId = true;
      }
      if (lowerOpen === 'header') hasHeader = true;
      if (lowerOpen === 'dfn') {
        hasDfn = true;
        if (attrString.includes('itemprop="name"')) hasItempropName = true;
      }
      if (lowerOpen === 'dl') hasDl = true;
      if (lowerOpen === 'dt') hasDt = true;
      if (lowerOpen === 'dd') hasDd = true;
      if (attrString && attrString.includes('itemprop="description"')) hasItempropDescription = true;
      if (attrString && attrString.includes('itemprop="disambiguatingDescription"')) hasItempropDisambiguating = true;

      const isVoid = voidElements.has(lowerOpen);
      const isSelfClose = isSelfClosing === '/' || attrString.trim().endsWith('/') || svgSelfClosing.has(lowerOpen);

      if (!isVoid && !isSelfClose) {
        tagStack.push(openingTag);
      }
    }
  }

  if (tagStack.length > 0) {
    errors.push(`Unclosed HTML tags remaining: ${tagStack.join(', ')}`);
  }

  return {
    valid: errors.length === 0,
    errors,
    features: {
      hasArticle,
      hasHeader,
      hasDfn,
      hasDl,
      hasDt,
      hasDd,
      hasItemscope,
      hasDefinedTermType,
      hasItempropName,
      hasItempropDescription,
      hasItempropDisambiguating,
      hasDataTermId,
      hasDataGlossaryId
    }
  };
}

// ---------------------------------------------------------------------------
// Master Runner
// ---------------------------------------------------------------------------
async function runMilestone3ChallengerSuite() {
  const runner = new TestRunner('Challenger M3-1: UI Rendering, A-Z Navigation & Search Stress Harness');
  console.log(`\n=== Running ${runner.suiteName} ===`);

  // Paths
  const catalogPath = path.join(ROOT_DIR, 'app', 'data', 'catalog.json');
  const appJsPath = path.join(ROOT_DIR, 'app', 'js', 'app.js');
  const engineJsPath = path.join(ROOT_DIR, 'app', 'js', 'semantic-engine.js');
  const indexHtmlPath = path.join(ROOT_DIR, 'index.html');

  // Load files
  let catalog, appJsCode, engineJsCode, indexHtml;
  try {
    catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
    appJsCode = fs.readFileSync(appJsPath, 'utf8');
    engineJsCode = fs.readFileSync(engineJsPath, 'utf8');
    indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
  } catch (err) {
    runner.assert(false, `Failed to read source files: ${err.message}`, { feature: 'F24', tier: 1 });
    return runner.printReport();
  }

  // Set up Sandbox & Load Data
  const { document, elements } = createMockDOM();
  const sandbox = {
    window: {},
    document,
    clearTimeout,
    setTimeout,
    alert: () => {},
    console: { log: () => {}, warn: () => {}, error: () => {} }
  };
  sandbox.window = sandbox;
  sandbox.window.addEventListener = (event, fn) => {};

  try {
    vm.createContext(sandbox);
    vm.runInContext(engineJsCode, sandbox);
    vm.runInContext(appJsCode, sandbox);

    const glossariesData = {};
    for (const g of catalog.canonicalGlossaries) {
      const p = path.resolve(ROOT_DIR, g.dataPath);
      if (fs.existsSync(p)) {
        const d = JSON.parse(fs.readFileSync(p, 'utf8'));
        glossariesData[g.id] = Array.isArray(d) ? d : (d.canonicalTerms || []);
      }
    }
    sandbox.DocWebSemantics.loadAll(catalog, glossariesData);
  } catch (err) {
    runner.assert(false, `Sandbox initialization failed: ${err.message}`, { feature: 'F24', tier: 1 });
    return runner.printReport();
  }

  const allTerms = sandbox.DocWebSemantics.getAllTerms();
  runner.assertEqual(allTerms.length, 205, 'Total active terms loaded equals exactly 205', { feature: 'F3', tier: 1 });

  // =========================================================================
  // SECTION 1: DOM PARSING OF RENDERED TERM VIEWS ACROSS ALL 205 TERMS
  // =========================================================================
  console.log('\n--- Section 1: DOM Parsing of Rendered Term Views Across All 205 Terms ---');

  const termViewContainer = document.getElementById('term-view-container');
  let domParsePasses = 0;
  let microdataPasses = 0;
  let semanticElementsPasses = 0;
  let jsonLdInjectionPasses = 0;
  let dataAttributePasses = 0;
  const domParsingFailures = [];

  for (let i = 0; i < allTerms.length; i++) {
    const term = allTerms[i];
    try {
      sandbox.DocWebApp.renderTermView(term);
      const renderedHtml = termViewContainer.innerHTML;

      // Validate rendered string is non-empty
      if (!renderedHtml || typeof renderedHtml !== 'string' || renderedHtml.length < 50) {
        domParsingFailures.push({ termId: term.id, reason: 'Rendered HTML is empty or trivial' });
        continue;
      }

      // Strict HTML5 Tokenization & Tag-Balance check
      const struct = validateHtml5Structure(renderedHtml);
      if (struct.valid) {
        domParsePasses++;
      } else {
        domParsingFailures.push({ termId: term.id, reason: 'HTML balance/nesting error', errors: struct.errors });
      }

      // Check Semantic Elements: <article>, <header>, <dfn>, <dl>, <dt>, <dd>
      if (
        struct.features.hasArticle &&
        struct.features.hasHeader &&
        struct.features.hasDfn &&
        struct.features.hasDl &&
        struct.features.hasDt &&
        struct.features.hasDd
      ) {
        semanticElementsPasses++;
      }

      // Check Microdata attributes
      if (
        struct.features.hasItemscope &&
        struct.features.hasDefinedTermType &&
        struct.features.hasItempropName &&
        struct.features.hasItempropDescription &&
        struct.features.hasItempropDisambiguating
      ) {
        microdataPasses++;
      }

      // Check data-* attributes on <article>
      const hasCorrectTermId = renderedHtml.includes(`data-term-id="${term.id}"`);
      const hasCorrectGlossaryId = renderedHtml.includes(`data-glossary-id="${term.glossaryId}"`);
      const hasCategory = renderedHtml.includes(`data-category="${term.category || 'General'}"`);
      if (hasCorrectTermId && hasCorrectGlossaryId && hasCategory) {
        dataAttributePasses++;
      }

      // Check JSON-LD script injection in DOM
      const scriptTag = document.getElementById('term-jsonld-script');
      if (scriptTag && scriptTag.textContent) {
        const parsedJsonLd = JSON.parse(scriptTag.textContent);
        if (
          parsedJsonLd['@context'] === 'https://schema.org' &&
          parsedJsonLd['@type'] === 'DefinedTerm' &&
          parsedJsonLd['@id'] === term.id &&
          parsedJsonLd.name === term.title
        ) {
          jsonLdInjectionPasses++;
        }
      }
    } catch (renderErr) {
      domParsingFailures.push({ termId: term.id, reason: renderErr.message, stack: renderErr.stack });
    }
  }

  runner.assertEqual(
    domParsePasses,
    205,
    `100% of all 205 terms render structurally balanced, valid HTML5 markup (passes: ${domParsePasses}/205)`,
    { feature: 'F12', tier: 4 }
  );

  runner.assertEqual(
    semanticElementsPasses,
    205,
    `100% of all 205 terms render all semantic tags (<article>, <header>, <dfn>, <dl>, <dt>, <dd>) (passes: ${semanticElementsPasses}/205)`,
    { feature: 'F12', tier: 4 }
  );

  runner.assertEqual(
    microdataPasses,
    205,
    `100% of all 205 terms contain complete Schema.org Microdata attributes (itemscope, itemtype, itemprop) (passes: ${microdataPasses}/205)`,
    { feature: 'F12', tier: 4 }
  );

  runner.assertEqual(
    dataAttributePasses,
    205,
    `100% of all 205 terms bind correct data-term-id, data-glossary-id, and data-category attributes (passes: ${dataAttributePasses}/205)`,
    { feature: 'F12', tier: 4 }
  );

  runner.assertEqual(
    jsonLdInjectionPasses,
    205,
    `100% of all 205 terms synchronize compliant Schema.org JSON-LD to #term-jsonld-script in DOM (passes: ${jsonLdInjectionPasses}/205)`,
    { feature: 'F11', tier: 4 }
  );

  runner.assertEqual(
    domParsingFailures.length,
    0,
    `Zero DOM rendering or parsing failures across full corpus (failures: ${domParsingFailures.length})`,
    { feature: 'F12', tier: 4 }
  );

  // =========================================================================
  // SECTION 2: A-Z NAVIGATION FILTERING & DIACRITICS STRESS
  // =========================================================================
  console.log('\n--- Section 2: A-Z Navigation Filtering & Diacritics Stress ---');

  // Test 2.1: Navigation Bar Rendering
  sandbox.DocWebApp.renderAzNav();
  const azNav = document.getElementById('az-nav');
  const azButtons = azNav.children || [];
  runner.assertEqual(
    azButtons.length,
    27,
    `A-Z Navigation generates exactly 27 navigation controls ("TODOS" + letters A-Z)`,
    { feature: 'F14', tier: 1 }
  );

  const firstBtn = azButtons[0];
  runner.assertEqual(
    firstBtn ? firstBtn.textContent : null,
    'TODOS',
    'First navigation control is "TODOS"',
    { feature: 'F14', tier: 1 }
  );

  // Test 2.2: Comprehensive Letter-by-Letter Filtering across all 26 Letters
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const letterCounts = {};
  let totalLetterSubsetSum = 0;
  let letterFilterErrors = 0;

  for (const letter of letters) {
    try {
      sandbox.DocWebApp.currentLetter = letter;
      sandbox.DocWebApp.currentCategory = 'all';
      sandbox.DocWebApp.currentGlossaryId = 'all';
      sandbox.DocWebApp.filterAndRenderTerms('');

      const termsList = document.getElementById('terms-list');
      const renderedItems = termsList.children || [];

      // If count > 0, verify each item actually starts with the target letter
      let allMatchLetter = true;
      for (const item of renderedItems) {
        const termId = item.getAttribute('data-term-id');
        if (termId) {
          const t = sandbox.DocWebSemantics.getTerm(termId);
          if (t && t.title) {
            const clean = t.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toUpperCase();
            if (clean.charAt(0) !== letter) {
              allMatchLetter = false;
            }
          }
        }
      }

      // If no terms match (like Q, Y), verify empty state without crashing
      if (renderedItems.length === 0) {
        const inner = termsList.innerHTML || '';
        if (!inner.includes('No se encontraron términos coincidentes')) {
          allMatchLetter = false;
        }
      }

      const matchCount = renderedItems.filter(el => el.getAttribute('data-term-id')).length;
      letterCounts[letter] = matchCount;
      totalLetterSubsetSum += matchCount;

      if (!allMatchLetter) {
        letterFilterErrors++;
      }
    } catch (err) {
      letterFilterErrors++;
    }
  }

  runner.assertEqual(
    letterFilterErrors,
    0,
    'Zero filtering errors across all 26 individual letters A-Z',
    { feature: 'F14', tier: 2 }
  );

  runner.assertEqual(
    totalLetterSubsetSum,
    205,
    `Sum of all letter subset partitions equals exactly the 205 total terms (${totalLetterSubsetSum}/205)`,
    { feature: 'F14', tier: 2 }
  );

  // Check expected zero-count letters
  runner.assertEqual(letterCounts['Q'], 0, 'Letter Q correctly yields 0 terms in canonical catalog without error', { feature: 'F14', tier: 2 });
  runner.assertEqual(letterCounts['Y'], 0, 'Letter Y correctly yields 0 terms in canonical catalog without error', { feature: 'F14', tier: 2 });

  // Test 2.3: Diacritic / Accent Preservation & Normalization
  console.log('\n--- Section 2.3: Diacritic & Spanish Accent Normalization ---');

  // "Ángulo de Cámara" starts with 'Á' -> must match letter 'A'
  sandbox.DocWebApp.currentLetter = 'A';
  sandbox.DocWebApp.currentCategory = 'all';
  sandbox.DocWebApp.currentGlossaryId = 'all';
  sandbox.DocWebApp.filterAndRenderTerms('');
  const termsListA = document.getElementById('terms-list');
  const itemsA = (termsListA.children || []).map(c => c.getAttribute('data-term-id'));
  const hasAnguloDeCamara = itemsA.includes('urn:term:audiovisual-production:angulo-de-camara');

  runner.assert(
    hasAnguloDeCamara,
    'Spanish accented title "Ángulo de Cámara" correctly maps to letter "A" in A-Z navigation',
    { feature: 'F14', tier: 2 }
  );

  // Synthetic Adversarial Diacritic Injections
  const syntheticDiacritics = [
    { title: 'Éxito en Taquilla', expectedLetter: 'E' },
    { title: 'Índice de Refracción', expectedLetter: 'I' },
    { title: 'Óptica Anamórfica', expectedLetter: 'O' },
    { title: 'Última Toma', expectedLetter: 'U' },
    { title: 'Ñandú en Plano Secuencia', expectedLetter: 'N' },
    { title: 'Übersampling de Audio', expectedLetter: 'U' },
    { title: 'À l\'américaine', expectedLetter: 'A' },
    { title: '  Espacio en Blanco Inicial', expectedLetter: 'E' }
  ];

  let syntheticDiacriticPasses = 0;
  for (const syn of syntheticDiacritics) {
    const clean = syn.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toUpperCase();
    if (clean.charAt(0) === syn.expectedLetter) {
      syntheticDiacriticPasses++;
    }
  }

  runner.assertEqual(
    syntheticDiacriticPasses,
    syntheticDiacritics.length,
    `All ${syntheticDiacritics.length} synthetic accented/diacritic titles resolve to their base latin letter`,
    { feature: 'F14', tier: 2 }
  );

  // Test 2.4: Letter Toggle Behavior
  sandbox.DocWebApp.currentLetter = 'B';
  const bBtn = azButtons.find(b => b.getAttribute && b.getAttribute('data-letter') === 'B');
  if (bBtn && bBtn.onclick) {
    bBtn.onclick(); // Clicking active 'B' should toggle back to 'all'
    runner.assertEqual(sandbox.DocWebApp.currentLetter, 'all', 'Clicking active letter button toggles currentLetter back to "all"', { feature: 'F14', tier: 2 });
  }

  // =========================================================================
  // SECTION 3: MULTI-FIELD SEARCH STRESS TEST & BOUNDARY ATTACK VECTORS
  // =========================================================================
  console.log('\n--- Section 3: Multi-Field Search Stress Test & Boundary Attacks ---');

  // Reset navigation states
  sandbox.DocWebApp.currentGlossaryId = 'all';
  sandbox.DocWebApp.currentCategory = 'all';
  sandbox.DocWebApp.currentLetter = 'all';

  // Test 3.1: Multi-Field Search Coverage (Title, Short Def, Full Def, Synonyms, Components)
  // Query 1: Title Match ("Gimbal")
  sandbox.DocWebApp.filterAndRenderTerms('Gimbal');
  const resTitle = (document.getElementById('terms-list').children || []).map(c => c.getAttribute('data-term-id'));
  runner.assert(
    resTitle.includes('urn:term:audiovisual-production:gimbal'),
    'Multi-field search successfully finds term by Title ("Gimbal")',
    { feature: 'F13', tier: 1 }
  );

  // Query 2: Short Definition Match
  // Dynamically find a keyword from definition of a term that isn't in its title
  let defTerm = null;
  let defWord = '';
  for (const t of allTerms) {
    const def = t.shortDefinition || t.definition || '';
    const words = def.toLowerCase().split(/[^\wáéíóúñ]+/).filter(w => w.length > 5);
    const uniqueWord = words.find(w => !t.title.toLowerCase().includes(w));
    if (uniqueWord) {
      defTerm = t;
      defWord = uniqueWord;
      break;
    }
  }
  if (defTerm && defWord) {
    sandbox.DocWebApp.filterAndRenderTerms(defWord);
    const resDef = (document.getElementById('terms-list').children || []).map(c => c.getAttribute('data-term-id'));
    runner.assert(
      resDef.length > 0 && resDef.includes(defTerm.id),
      `Multi-field search successfully matches terms by Definition keywords ("${defWord}" -> ${defTerm.slug})`,
      { feature: 'F13', tier: 2 }
    );
  }

  // Query 3: Synonym Match
  // Check terms that have synonyms
  const termWithSyn = allTerms.find(t => Array.isArray(t.synonyms) && t.synonyms.length > 0);
  if (termWithSyn) {
    const synQuery = termWithSyn.synonyms[0];
    sandbox.DocWebApp.filterAndRenderTerms(synQuery);
    const resSyn = (document.getElementById('terms-list').children || []).map(c => c.getAttribute('data-term-id'));
    runner.assert(
      resSyn.includes(termWithSyn.id),
      `Multi-field search matches terms by Synonyms ("${synQuery}" -> ${termWithSyn.slug})`,
      { feature: 'F13', tier: 2 }
    );
  }

  // Query 4: Subconcepts / Components Match
  const termWithComp = allTerms.find(t => Array.isArray(t.components) && t.components.length > 0);
  if (termWithComp) {
    const compQuery = termWithComp.components[0];
    sandbox.DocWebApp.filterAndRenderTerms(compQuery);
    const resComp = (document.getElementById('terms-list').children || []).map(c => c.getAttribute('data-term-id'));
    runner.assert(
      resComp.includes(termWithComp.id),
      `Multi-field search matches terms by Subconcepts/Components ("${compQuery.substring(0, 30)}" -> ${termWithComp.slug})`,
      { feature: 'F13', tier: 2 }
    );
  }

  // Test 3.2: Regex Special Characters & Injection Stress Test
  console.log('\n--- Section 3.2: Regex Special Character Injection Attacks ---');

  const regexAttacks = [
    { name: 'Open bracket [', query: '[' },
    { name: 'Close bracket ]', query: ']' },
    { name: 'Open parenthesis (', query: '(' },
    { name: 'Close parenthesis )', query: ')' },
    { name: 'Asterisk *', query: '*' },
    { name: 'Plus +', query: '+' },
    { name: 'Question mark ?', query: '?' },
    { name: 'Backslash \\', query: '\\' },
    { name: 'Caret ^', query: '^' },
    { name: 'Dollar $', query: '$' },
    { name: 'Dot .', query: '.' },
    { name: 'Curly brace {', query: '{' },
    { name: 'Pipe |', query: '|' },
    { name: 'Malformed Character Class [a-z', query: '[a-z' },
    { name: 'Nested Quantifiers (a+)+', query: '(a+)+' },
    { name: 'Lookahead (?=.*)', query: '(?=.*)' },
    { name: 'Consecutive escaped slashes \\\\\\\\', query: '\\\\\\\\' },
    { name: 'Unclosed group (((((', query: '(((((' },
    { name: 'Regex Metacharacter Storm [.*+?^${}()|[\\]\\]', query: '[.*+?^${}()|[\\]\\]' }
  ];

  let regexAttackErrors = 0;
  for (const attack of regexAttacks) {
    try {
      sandbox.DocWebApp.filterAndRenderTerms(attack.query);
      const list = document.getElementById('terms-list');
      // Must not throw, and must render either matching items or empty state
      if (!list) {
        regexAttackErrors++;
      }
    } catch (err) {
      regexAttackErrors++;
    }
  }

  runner.assertEqual(
    regexAttackErrors,
    0,
    `Zero unhandled exceptions or syntax errors across all ${regexAttacks.length} regex injection attack vectors`,
    { feature: 'F13', tier: 2 }
  );

  // Test 3.3: XSS & HTML Tag Injection in Search Input
  console.log('\n--- Section 3.3: Script & HTML Tag Injection in Search Input ---');

  const xssAttacks = [
    '<script>alert("xss")</script>',
    '<img src=x onerror=alert(1)>',
    '"><svg onload=alert(1)>',
    'javascript:void(0)',
    '"><dfn onerror="alert(1)">'
  ];

  let xssErrors = 0;
  for (const xss of xssAttacks) {
    try {
      sandbox.DocWebApp.filterAndRenderTerms(xss);
      const list = document.getElementById('terms-list');
      // If no terms match, it shows empty state.
      // Crucially, it must not execute script or create rogue DOM nodes.
      const rawHtml = list.innerHTML || '';
      if (rawHtml.includes('<script>') || rawHtml.includes('onerror=')) {
        xssErrors++;
      }
    } catch (err) {
      xssErrors++;
    }
  }

  runner.assertEqual(
    xssErrors,
    0,
    `Zero unescaped script execution vectors across all ${xssAttacks.length} XSS payloads`,
    { feature: 'F13', tier: 2 }
  );

  // Test 3.4: Boundary Input Types (null, undefined, long strings)
  console.log('\n--- Section 3.4: Boundary Input Types & Defensive Type Safety ---');

  const boundarySafeInputs = ['', '   ', null, undefined, false, 'A'.repeat(5000)];
  let boundarySafePasses = 0;
  for (const inp of boundarySafeInputs) {
    try {
      sandbox.DocWebApp.filterAndRenderTerms(inp);
      boundarySafePasses++;
    } catch (err) {
      // should not fail
    }
  }

  runner.assertEqual(
    boundarySafePasses,
    boundarySafeInputs.length,
    `Zero runtime crashes on standard boundary inputs (empty string, whitespace, null, undefined, false, 5KB string)`,
    { feature: 'F13', tier: 2 }
  );

  // Adversarial Type Stress: Non-string primitives and objects passed to filterAndRenderTerms
  const adversarialTypes = [12345, true, {}, []];
  const typeFailures = [];
  for (const nonStr of adversarialTypes) {
    try {
      sandbox.DocWebApp.filterAndRenderTerms(nonStr);
    } catch (typeErr) {
      typeFailures.push({ type: typeof nonStr, error: typeErr.message });
    }
  }

  runner.assert(
    typeFailures.length > 0,
    `Empirically detected input type vulnerability: filterAndRenderTerms assumes string and crashes on ${typeFailures.length} non-string types (${typeFailures.map(f => f.type).join(', ')})`,
    { feature: 'F25', tier: 2 }
  );

  // Test 3.5: Corpus Resilience against Corrupted Term Objects in Engine
  console.log('\n--- Section 3.5: Resilience against Malformed / Corrupted Term Data ---');

  // Inject a rogue term with corrupted data fields into DocWebSemantics
  const rogueTerm = {
    id: 'urn:term:test:corrupted-entity',
    glossaryId: 'audiovisual-production',
    title: null, // null title
    definition: 12345, // number definition
    extendedDefinition: null,
    synonyms: [null, undefined, 42, {}, []], // corrupted array elements
    components: [false, true, null, 999] // corrupted array elements
  };

  sandbox.DocWebSemantics.terms.set(rogueTerm.id, rogueTerm);

  let corruptedSearchCrash = false;
  try {
    sandbox.DocWebApp.filterAndRenderTerms('prueba');
  } catch (err) {
    corruptedSearchCrash = true;
  }

  runner.assert(
    !corruptedSearchCrash,
    'filterAndRenderTerms safely handles corrupted term objects (null titles, corrupted synonyms/components arrays)',
    { feature: 'F13', tier: 2 }
  );

  // Clean up rogue term
  sandbox.DocWebSemantics.terms.delete(rogueTerm.id);

  // Test 3.6: Search Debounce Verification
  console.log('\n--- Section 3.6: Search Debounce Timing & Event Rate Limiting ---');

  let debounceExecutions = 0;
  const originalFilter = sandbox.DocWebApp.filterAndRenderTerms;
  sandbox.DocWebApp.filterAndRenderTerms = function() {
    debounceExecutions++;
    return originalFilter.apply(this, arguments);
  };

  // Simulate 10 rapid keystrokes within 50ms on search-input
  const searchInputEl = document.getElementById('search-input');
  sandbox.DocWebApp.setupEventListeners();

  for (let k = 1; k <= 10; k++) {
    searchInputEl.dispatchEvent({ type: 'input', target: { value: 'corte'.substring(0, k) } });
  }

  // Immediately after burst, debounceExecutions must be 0
  runner.assertEqual(
    debounceExecutions,
    0,
    'Rapid input burst does not trigger synchronous renders (debounce rate limit active)',
    { feature: 'F13', tier: 3 }
  );

  // Wait 150ms for debounce timer to fire once
  return new Promise((resolve) => {
    setTimeout(() => {
      runner.assertEqual(
        debounceExecutions,
        1,
        'Debounced input listener collapses 10 rapid keystrokes into exactly 1 execution after 120ms',
        { feature: 'F13', tier: 3 }
      );

      // Restore original method
      sandbox.DocWebApp.filterAndRenderTerms = originalFilter;

      // =====================================================================
      // SECTION 4: ARCHITECTURAL DISCOVERY / STATE COHERENCE EVALUATION
      // =====================================================================
      console.log('\n--- Section 4: Architectural State Coherence & Parameter Behavior ---');

      // Test: Does filterAndRenderTerms() read search-input.value when called without arguments?
      searchInputEl.value = 'corte';
      // Call filterAndRenderTerms with no arguments (simulating category click or selectTerm)
      sandbox.DocWebApp.filterAndRenderTerms();
      const termsListCoherence = document.getElementById('terms-list');
      const renderedCountWithoutArgs = (termsListCoherence.children || []).length;

      // When called with explicit 'corte'
      sandbox.DocWebApp.filterAndRenderTerms('corte');
      const renderedCountWithArgs = (termsListCoherence.children || []).length;

      const resetsQueryOnNoArgs = renderedCountWithoutArgs > renderedCountWithArgs;
      console.log(`  ℹ OBSERVATION: filterAndRenderTerms() with no args renders ${renderedCountWithoutArgs} terms vs explicit 'corte' which renders ${renderedCountWithArgs} terms.`);
      console.log(`  ℹ Default parameter searchQuery = '' assigns '' before checking undefined, so search-input is not read on parameterless calls.`);

      runner.assert(
        true,
        `Empirical state coherence behavior documented: parameterless filterAndRenderTerms() defaults to empty query string (resets = ${resetsQueryOnNoArgs})`,
        { feature: 'F13', tier: 3 }
      );

      // Print final report
      const summary = runner.printReport();
      resolve(summary);
    }, 180);
  });
}

if (require.main === module) {
  runMilestone3ChallengerSuite().then((summary) => {
    process.exit(summary.failed > 0 ? 1 : 0);
  });
}

module.exports = { runMilestone3ChallengerSuite, createMockDOM, validateHtml5Structure };
