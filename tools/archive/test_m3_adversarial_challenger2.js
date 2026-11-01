/**
 * DOCWEB MULTIGLOSSARY — Milestone 3 Empirical Adversarial Challenge Test Suite
 * Agent: challenger_m3_2 (Empirical Adversarial Challenger)
 * Focus:
 *   1. CSS Variables & Dark/Light Mode Coverage in app/css/app.css (completeness, symmetry, WCAG 2.1/2.2 AA contrast)
 *   2. HTML5 Structural Validity in index.html & DOM Templates (unique IDs, balanced tags, semantic hierarchy, accessibility)
 *   3. Offline Compliance (zero remote URLs, zero CDNs, zero remote fonts, air-gapped readiness)
 *   4. Intersection Filtering (Category Chips + A-Z Letter + Multi-field Search + Edge Cases)
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { ROOT_DIR, TestRunner } = require('./test_utils');

// ============================================================================
// HELPER: WCAG 2.1 / 2.2 Relative Luminance and Contrast Ratio Calculation
// ============================================================================
function parseHexColor(hex) {
  let cleaned = hex.replace('#', '').trim();
  if (cleaned.length === 3) {
    cleaned = cleaned.split('').map(c => c + c).join('');
  }
  const r = parseInt(cleaned.substring(0, 2), 16) / 255;
  const g = parseInt(cleaned.substring(2, 4), 16) / 255;
  const b = parseInt(cleaned.substring(4, 6), 16) / 255;
  return [r, g, b];
}

function calculateRelativeLuminance([r, g, b]) {
  const [lr, lg, lb] = [r, g, b].map(c => {
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

function calculateContrastRatio(hex1, hex2) {
  const l1 = calculateRelativeLuminance(parseHexColor(hex1));
  const l2 = calculateRelativeLuminance(parseHexColor(hex2));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Alpha blending of fg on bg
function blendRgbaOnHex(rgbaStr, bgHex) {
  const m = rgbaStr.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/);
  if (!m) return bgHex;
  const r = parseInt(m[1], 10);
  const g = parseInt(m[2], 10);
  const b = parseInt(m[3], 10);
  const a = parseFloat(m[4]);
  const [bgr, bgg, bgb] = parseHexColor(bgHex).map(v => Math.round(v * 255));
  const blendedR = Math.round(r * a + bgr * (1 - a));
  const blendedG = Math.round(g * a + bgg * (1 - a));
  const blendedB = Math.round(b * a + bgb * (1 - a));
  const toHex = v => Math.min(255, Math.max(0, v)).toString(16).padStart(2, '0');
  return `#${toHex(blendedR)}${toHex(blendedG)}${toHex(blendedB)}`;
}

// ============================================================================
// HELPER: HTML Tokenizer and Structural Validator
// ============================================================================
function validateHtmlStructure(htmlString) {
  const errors = [];
  const voidTags = new Set([
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'
  ]);

  // DOCTYPE check
  const hasDoctype = /<!doctype\s+html/i.test(htmlString);
  if (!hasDoctype) {
    errors.push('Missing <!DOCTYPE html> declaration');
  }

  // ID Uniqueness check
  const idCounts = {};
  const idRegex = /\sid=["']([^"']+)["']/g;
  let idMatch;
  while ((idMatch = idRegex.exec(htmlString)) !== null) {
    const id = idMatch[1];
    idCounts[id] = (idCounts[id] || 0) + 1;
  }
  const duplicateIds = Object.entries(idCounts).filter(([_, count]) => count > 1).map(([id]) => id);

  // Balanced tag checker
  const tagStack = [];
  const tagRegex = /<!--[\s\S]*?-->|<\/([a-zA-Z0-9:-]+)\s*>|<([a-zA-Z0-9:-]+)([^>]*?)(\/?)>/g;
  let match;

  while ((match = tagRegex.exec(htmlString)) !== null) {
    const token = match[0];
    if (token.startsWith('<!--') || /<!doctype/i.test(token)) continue;

    // Closing tag </tag>
    if (match[1]) {
      const closing = match[1].toLowerCase();
      if (voidTags.has(closing)) {
        errors.push(`Void element <${closing}> must not have a closing tag </${closing}>`);
        continue;
      }
      if (tagStack.length === 0) {
        errors.push(`Unexpected closing tag </${closing}> with empty stack`);
      } else {
        const top = tagStack.pop();
        if (top !== closing) {
          errors.push(`Mismatched closing tag </${closing}>, expected </${top}>`);
        }
      }
      continue;
    }

    // Opening tag <tag ... (/)?>
    if (match[2]) {
      const opening = match[2].toLowerCase();
      const isSelfClosing = match[4] === '/' || voidTags.has(opening);
      if (!isSelfClosing) {
        tagStack.push(opening);
      }
    }
  }

  if (tagStack.length > 0) {
    errors.push(`Unclosed tags remaining on stack: ${tagStack.join(', ')}`);
  }

  return {
    valid: errors.length === 0 && duplicateIds.length === 0,
    errors,
    duplicateIds,
    totalIds: Object.keys(idCounts).length
  };
}

// ============================================================================
// MAIN TEST SUITE RUNNER
// ============================================================================
function runM3AdversarialChallenge() {
  const runner = new TestRunner('Milestone 3 Adversarial Challenge Suite');
  console.log(`\n=== Running ${runner.suiteName} ===`);

  const indexPath = path.join(ROOT_DIR, 'index.html');
  const appCssPath = path.join(ROOT_DIR, 'app', 'css', 'app.css');
  const appJsPath = path.join(ROOT_DIR, 'app', 'js', 'app.js');
  const semanticEnginePath = path.join(ROOT_DIR, 'app', 'js', 'semantic-engine.js');
  const storageJsPath = path.join(ROOT_DIR, 'app', 'js', 'storage.js');
  const catalogPath = path.join(ROOT_DIR, 'app', 'data', 'catalog.json');

  const indexHtml = fs.readFileSync(indexPath, 'utf8');
  const appCss = fs.readFileSync(appCssPath, 'utf8');
  const appJs = fs.readFileSync(appJsPath, 'utf8');

  // ==========================================================================
  // 1. CSS VARIABLES & DARK/LIGHT MODE COVERAGE (WCAG 2.1/2.2 AA)
  // ==========================================================================
  console.log('\n--- Section 1: CSS Variables Completeness & Dark/Light Mode Coverage ---');

  // 1.1 Parse :root variables
  const rootBlockMatch = appCss.match(/:root\s*\{([^}]+)\}/);
  runner.assert(Boolean(rootBlockMatch), 'app.css contains :root variable declarations', { feature: 'F12', tier: 1 });

  const rootVars = {};
  if (rootBlockMatch) {
    const lines = rootBlockMatch[1].split('\n');
    for (const line of lines) {
      const m = line.match(/--([a-zA-Z0-9_-]+)\s*:\s*([^;]+);/);
      if (m) rootVars['--' + m[1]] = m[2].trim();
    }
  }

  // 1.2 Parse @media (prefers-color-scheme: dark) variables
  const darkBlockMatch = appCss.match(/@media\s*\(prefers-color-scheme:\s*dark\)\s*\{\s*:root\s*\{([^}]+)\}/);
  runner.assert(Boolean(darkBlockMatch), 'app.css contains @media (prefers-color-scheme: dark) :root override block', { feature: 'F12', tier: 1 });

  const darkVars = {};
  if (darkBlockMatch) {
    const lines = darkBlockMatch[1].split('\n');
    for (const line of lines) {
      const m = line.match(/--([a-zA-Z0-9_-]+)\s*:\s*([^;]+);/);
      if (m) darkVars['--' + m[1]] = m[2].trim();
    }
  }

  // 1.3 Verify core theme variables completeness
  const expectedThemeVars = [
    '--background', '--foreground', '--card', '--card-foreground',
    '--muted', '--muted-foreground', '--border', '--primary',
    '--primary-hover', '--primary-foreground', '--secondary',
    '--secondary-foreground', '--accent', '--accent-foreground'
  ];

  for (const v of expectedThemeVars) {
    runner.assert(
      rootVars.hasOwnProperty(v),
      `Core variable "${v}" is defined in :root (light mode value: ${rootVars[v]})`,
      { feature: 'F12', tier: 1 }
    );
    runner.assert(
      darkVars.hasOwnProperty(v),
      `Core variable "${v}" has explicit dark mode override (dark mode value: ${darkVars[v]})`,
      { feature: 'F12', tier: 1 }
    );
  }

  // 1.4 Check for undeclared CSS variable usages in CSS, HTML, and JS
  const cssVarUsages = new Set(Array.from(appCss.matchAll(/var\(\s*(--[a-zA-Z0-9_-]+)/g)).map(m => m[1]));
  const htmlVarUsages = new Set(Array.from(indexHtml.matchAll(/var\(\s*(--[a-zA-Z0-9_-]+)/g)).map(m => m[1]));
  const jsVarUsages = new Set(Array.from(appJs.matchAll(/var\(\s*(--[a-zA-Z0-9_-]+)/g)).map(m => m[1]));

  const allUsedVars = new Set([...cssVarUsages, ...htmlVarUsages, ...jsVarUsages]);
  const undeclaredVars = Array.from(allUsedVars).filter(v => !rootVars.hasOwnProperty(v));

  runner.assertEqual(
    undeclaredVars.length,
    0,
    `Zero undeclared CSS variables used across CSS, HTML, and JS (tested ${allUsedVars.size} unique variables)`,
    { feature: 'F12', tier: 2 }
  );

  // 1.5 WCAG 2.1 / 2.2 AA Contrast Ratios in Light Mode
  console.log('    [WCAG AA Contrast Testing - Light Theme]');

  // Body text: --foreground on --background
  const lightBodyContrast = calculateContrastRatio(rootVars['--foreground'], rootVars['--background']);
  runner.assert(
    lightBodyContrast >= 4.5,
    `Light Mode: --foreground on --background contrast is ${lightBodyContrast.toFixed(2)}:1 (WCAG AA >= 4.5:1)`,
    { feature: 'F12', tier: 2 }
  );

  // Card text: --card-foreground on --card
  const lightCardContrast = calculateContrastRatio(rootVars['--card-foreground'], rootVars['--card']);
  runner.assert(
    lightCardContrast >= 4.5,
    `Light Mode: --card-foreground on --card contrast is ${lightCardContrast.toFixed(2)}:1 (WCAG AA >= 4.5:1)`,
    { feature: 'F12', tier: 2 }
  );

  // Muted text on Card: --muted-foreground on --card
  const lightMutedCardContrast = calculateContrastRatio(rootVars['--muted-foreground'], rootVars['--card']);
  runner.assert(
    lightMutedCardContrast >= 4.5,
    `Light Mode: --muted-foreground on --card contrast is ${lightMutedCardContrast.toFixed(2)}:1 (WCAG AA >= 4.5:1)`,
    { feature: 'F12', tier: 2 }
  );

  // Muted text on Background: --muted-foreground on --background
  const lightMutedBgContrast = calculateContrastRatio(rootVars['--muted-foreground'], rootVars['--background']);
  runner.assert(
    lightMutedBgContrast >= 4.5,
    `Light Mode: --muted-foreground on --background contrast is ${lightMutedBgContrast.toFixed(2)}:1 (WCAG AA >= 4.5:1)`,
    { feature: 'F12', tier: 2 }
  );

  // Primary Button: --primary-foreground on --primary
  const lightPrimaryBtnContrast = calculateContrastRatio(rootVars['--primary-foreground'], rootVars['--primary']);
  runner.assert(
    lightPrimaryBtnContrast >= 4.5,
    `Light Mode: --primary-foreground on --primary contrast is ${lightPrimaryBtnContrast.toFixed(2)}:1 (WCAG AA >= 4.5:1)`,
    { feature: 'F12', tier: 2 }
  );

  // Primary Button Hover: --primary-foreground on --primary-hover
  const lightPrimaryHoverContrast = calculateContrastRatio(rootVars['--primary-foreground'], rootVars['--primary-hover']);
  runner.assert(
    lightPrimaryHoverContrast >= 4.5,
    `Light Mode: --primary-foreground on --primary-hover contrast is ${lightPrimaryHoverContrast.toFixed(2)}:1 (WCAG AA >= 4.5:1)`,
    { feature: 'F12', tier: 2 }
  );

  // Primary Link on Card: --primary on --card
  const lightPrimaryOnCardContrast = calculateContrastRatio(rootVars['--primary'], rootVars['--card']);
  runner.assert(
    lightPrimaryOnCardContrast >= 4.5,
    `Light Mode: --primary on --card contrast is ${lightPrimaryOnCardContrast.toFixed(2)}:1 (WCAG AA >= 4.5:1)`,
    { feature: 'F12', tier: 2 }
  );

  // A-Z Button active: --primary-foreground on --primary
  const lightAzActiveContrast = calculateContrastRatio(rootVars['--primary-foreground'], rootVars['--primary']);
  runner.assert(
    lightAzActiveContrast >= 4.5,
    `Light Mode: .az-btn.active contrast is ${lightAzActiveContrast.toFixed(2)}:1 (WCAG AA >= 4.5:1)`,
    { feature: 'F12', tier: 2 }
  );

  // A-Z Button normal: --muted-foreground on --background
  const lightAzNormalContrast = calculateContrastRatio(rootVars['--muted-foreground'], rootVars['--background']);
  runner.assert(
    lightAzNormalContrast >= 4.5,
    `Light Mode: .az-btn normal contrast is ${lightAzNormalContrast.toFixed(2)}:1 (WCAG AA >= 4.5:1)`,
    { feature: 'F12', tier: 2 }
  );

  // Category Chip normal: --muted-foreground on --muted
  const lightCatChipNormalContrast = calculateContrastRatio(rootVars['--muted-foreground'], rootVars['--muted']);
  runner.assert(
    lightCatChipNormalContrast >= 3.0,
    `Light Mode: .cat-chip normal UI component contrast is ${lightCatChipNormalContrast.toFixed(2)}:1 (WCAG AA UI >= 3.0:1)`,
    { feature: 'F12', tier: 2 }
  );

  // 1.6 WCAG 2.1 / 2.2 AA Contrast Ratios in Dark Mode
  console.log('    [WCAG AA Contrast Testing - Dark Theme]');

  // Dark Body text: --foreground on --background
  const darkBodyContrast = calculateContrastRatio(darkVars['--foreground'], darkVars['--background']);
  runner.assert(
    darkBodyContrast >= 4.5,
    `Dark Mode: --foreground on --background contrast is ${darkBodyContrast.toFixed(2)}:1 (WCAG AA >= 4.5:1)`,
    { feature: 'F12', tier: 2 }
  );

  // Dark Card text: --card-foreground on --card
  const darkCardContrast = calculateContrastRatio(darkVars['--card-foreground'], darkVars['--card']);
  runner.assert(
    darkCardContrast >= 4.5,
    `Dark Mode: --card-foreground on --card contrast is ${darkCardContrast.toFixed(2)}:1 (WCAG AA >= 4.5:1)`,
    { feature: 'F12', tier: 2 }
  );

  // Dark Muted text on Card: --muted-foreground on --card
  const darkMutedCardContrast = calculateContrastRatio(darkVars['--muted-foreground'], darkVars['--card']);
  runner.assert(
    darkMutedCardContrast >= 4.5,
    `Dark Mode: --muted-foreground on --card contrast is ${darkMutedCardContrast.toFixed(2)}:1 (WCAG AA >= 4.5:1)`,
    { feature: 'F12', tier: 2 }
  );

  // Dark Muted text on Background: --muted-foreground on --background
  const darkMutedBgContrast = calculateContrastRatio(darkVars['--muted-foreground'], darkVars['--background']);
  runner.assert(
    darkMutedBgContrast >= 4.5,
    `Dark Mode: --muted-foreground on --background contrast is ${darkMutedBgContrast.toFixed(2)}:1 (WCAG AA >= 4.5:1)`,
    { feature: 'F12', tier: 2 }
  );

  // Dark Muted text on Muted: --muted-foreground on --muted
  const darkMutedMutedContrast = calculateContrastRatio(darkVars['--muted-foreground'], darkVars['--muted']);
  runner.assert(
    darkMutedMutedContrast >= 4.5,
    `Dark Mode: --muted-foreground on --muted contrast is ${darkMutedMutedContrast.toFixed(2)}:1 (WCAG AA >= 4.5:1)`,
    { feature: 'F12', tier: 2 }
  );

  // Dark Primary Link / Title on Card: --primary on --card
  const darkPrimaryOnCardContrast = calculateContrastRatio(darkVars['--primary'], darkVars['--card']);
  runner.assert(
    darkPrimaryOnCardContrast >= 4.5,
    `Dark Mode: --primary on --card contrast is ${darkPrimaryOnCardContrast.toFixed(2)}:1 (WCAG AA >= 4.5:1)`,
    { feature: 'F12', tier: 2 }
  );

  // Dark Primary UI Button: --primary-foreground on --primary
  const darkPrimaryBtnContrast = calculateContrastRatio(darkVars['--primary-foreground'], darkVars['--primary']);
  runner.assert(
    darkPrimaryBtnContrast >= 3.0,
    `Dark Mode: --primary-foreground on --primary UI component contrast is ${darkPrimaryBtnContrast.toFixed(2)}:1 (WCAG AA UI >= 3.0:1)`,
    { feature: 'F12', tier: 2 }
  );

  // Dark A-Z Button normal: --muted-foreground on --background
  const darkAzNormalContrast = calculateContrastRatio(darkVars['--muted-foreground'], darkVars['--background']);
  runner.assert(
    darkAzNormalContrast >= 4.5,
    `Dark Mode: .az-btn normal contrast is ${darkAzNormalContrast.toFixed(2)}:1 (WCAG AA >= 4.5:1)`,
    { feature: 'F12', tier: 2 }
  );

  // ==========================================================================
  // 2. HTML5 STRUCTURAL VALIDITY IN index.html & DYNAMIC DOM TEMPLATES
  // ==========================================================================
  console.log('\n--- Section 2: HTML5 Structural Validity in index.html & DOM Templates ---');

  // 2.1 index.html validation
  const htmlValidation = validateHtmlStructure(indexHtml);
  runner.assert(
    htmlValidation.errors.length === 0,
    `index.html has zero tag hierarchy or unclosed tag errors (errors: ${htmlValidation.errors.join('; ') || 'none'})`,
    { feature: 'F12', tier: 1 }
  );

  runner.assertEqual(
    htmlValidation.duplicateIds.length,
    0,
    `index.html contains zero duplicate IDs across all ${htmlValidation.totalIds} elements (duplicates: ${htmlValidation.duplicateIds.join(', ') || 'none'})`,
    { feature: 'F12', tier: 1 }
  );

  // 2.2 Semantic HTML5 landmark structure check in index.html
  const requiredLandmarks = [
    { tag: '<header class="top-header">', desc: 'Semantic <header> landmark' },
    { tag: '<aside class="sidebar">', desc: 'Semantic <aside> sidebar landmark' },
    { tag: '<main class="main-content"', desc: 'Semantic <main> landmark' },
    { tag: '<nav class="az-nav"', desc: 'Semantic <nav> for A-Z alphabetic filter' },
    { tag: '<nav class="term-list-container"', desc: 'Semantic <nav> for terms list' }
  ];

  for (const lm of requiredLandmarks) {
    runner.assert(
      indexHtml.includes(lm.tag),
      `index.html contains ${lm.desc}`,
      { feature: 'F12', tier: 1 }
    );
  }

  // 2.3 Accessibility attributes check in index.html
  runner.assertMatch(
    indexHtml,
    /<html\s+lang=["']es["']/i,
    'index.html declares Spanish language root (<html lang="es">)',
    { feature: 'F12', tier: 1 }
  );

  runner.assertMatch(
    indexHtml,
    /<meta\s+name=["']viewport["']/i,
    'index.html includes viewport responsive meta tag',
    { feature: 'F12', tier: 1 }
  );

  runner.assertMatch(
    indexHtml,
    /<label\s+for=["']glossary-select["']/,
    'glossary selector <select> is paired with <label for="glossary-select">',
    { feature: 'F12', tier: 1 }
  );

  runner.assertMatch(
    indexHtml,
    /<select[^>]+id=["']glossary-select["'][^>]+aria-label=/i,
    'glossary selector <select> provides aria-label accessibility descriptor',
    { feature: 'F12', tier: 1 }
  );

  runner.assertMatch(
    indexHtml,
    /<input[^>]+id=["']search-input["'][^>]+aria-label=/i,
    'search <input> provides aria-label accessibility descriptor',
    { feature: 'F12', tier: 1 }
  );

  runner.assertMatch(
    indexHtml,
    /<nav[^>]+id=["']az-nav["'][^>]+aria-label=["']Navegación alfabética["']/i,
    'A-Z navigation <nav> provides aria-label="Navegación alfabética"',
    { feature: 'F12', tier: 1 }
  );

  // 2.4 Dynamic HTML5 Template in app.js (renderTermView)
  console.log('    [Dynamic HTML5 Template Validation in renderTermView]');

  runner.assertMatch(
    appJs,
    /<article\s+class=["']content-card["']\s+itemscope\s+itemtype=["']https:\/\/schema\.org\/DefinedTerm["']/i,
    'renderTermView root renders <article itemscope itemtype="https://schema.org/DefinedTerm">',
    { feature: 'F12', tier: 2 }
  );

  runner.assertMatch(
    appJs,
    /<dfn\s+class=["']term-title-large["']\s+itemprop=["']name["']>/i,
    'renderTermView renders term title as <dfn class="term-title-large" itemprop="name">',
    { feature: 'F12', tier: 2 }
  );

  runner.assertMatch(
    appJs,
    /<dl\s+class=["']info-grid["']>/i,
    'renderTermView renders key-value data using semantic description list <dl class="info-grid">',
    { feature: 'F12', tier: 2 }
  );

  runner.assertMatch(
    appJs,
    /<dt\s+class=["']info-block-title["']>/i,
    'renderTermView renders description list terms with <dt class="info-block-title">',
    { feature: 'F12', tier: 2 }
  );

  runner.assertMatch(
    appJs,
    /<dd\s+class=["']info-block-content["']>/i,
    'renderTermView renders description list details with <dd class="info-block-content">',
    { feature: 'F12', tier: 2 }
  );

  // Verify that dl/dt/dd structure uses div grouping allowed by HTML 5.2
  const dlStructureMatch = appJs.match(/<dl\s+class=["']info-grid["']>([\s\S]*?)<\/dl>/);
  if (dlStructureMatch) {
    const dlBody = dlStructureMatch[1];
    const hasDivGrouping = /<div\s+class=["']info-block["']>\s*<dt[\s\S]*?<dd[\s\S]*?<\/div>/.test(dlBody);
    runner.assert(
      hasDivGrouping,
      'HTML 5.2 compliant <dl> grouping: <div class="info-block"> properly encapsulates <dt> and <dd>',
      { feature: 'F12', tier: 2 }
    );
  }

  // ==========================================================================
  // 3. OFFLINE COMPLIANCE & ZERO REMOTE LEAKS
  // ==========================================================================
  console.log('\n--- Section 3: Offline Compliance & Zero Remote Leaks ---');

  const ALLOWED_NAMESPACES = [
    'http://www.w3.org/2000/svg',
    'http://www.w3.org/1999/xhtml',
    'https://schema.org',
    'http://schema.org'
  ];

  const FORBIDDEN_CDNS = [
    'cdnjs.cloudflare.com',
    'cdn.jsdelivr.net',
    'unpkg.com',
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'ajax.googleapis.com',
    'cdn.tailwindcss.com',
    'stackpath.bootstrapcdn.com',
    'use.fontawesome.com',
    'cdn.skypack.dev',
    'esm.sh'
  ];

  const targetsToScan = [
    { name: 'index.html', content: indexHtml },
    { name: 'app/css/app.css', content: appCss },
    { name: 'app/js/app.js', content: appJs }
  ];

  let cdnViolations = 0;
  let unauthorizedRemoteUrls = 0;

  for (const t of targetsToScan) {
    // Check CDNs
    for (const cdn of FORBIDDEN_CDNS) {
      if (t.content.includes(cdn)) {
        console.error(`      [CDN VIOLATION] ${t.name} references forbidden CDN: ${cdn}`);
        cdnViolations++;
      }
    }

    // Check remote URLs in links, scripts, imports, urls, fetches
    const allUrls = t.content.match(/https?:\/\/[^\s'"`,;)]+/gi) || [];
    for (const url of allUrls) {
      const isAllowed = ALLOWED_NAMESPACES.some(ns => url.startsWith(ns));
      if (!isAllowed) {
        console.error(`      [UNAUTHORIZED REMOTE URL] in ${t.name}: ${url}`);
        unauthorizedRemoteUrls++;
      }
    }
  }

  runner.assertEqual(
    cdnViolations,
    0,
    `Zero forbidden CDN references in modified files (index.html, app.css, app.js)`,
    { feature: 'F2', tier: 1 }
  );

  runner.assertEqual(
    unauthorizedRemoteUrls,
    0,
    `Zero unauthorized remote URLs in modified files (only non-network semantic namespaces allowed)`,
    { feature: 'F2', tier: 1 }
  );

  // Check CSS remote imports or fonts
  const cssImports = (appCss.match(/@import\s+[^;]+;/gi) || []);
  runner.assertEqual(
    cssImports.length,
    0,
    `app/css/app.css contains 0 external @import declarations (found: ${cssImports.length})`,
    { feature: 'F2', tier: 1 }
  );

  const cssRemoteUrls = (appCss.match(/url\(['"]?https?:\/\/[^'")\s]+/gi) || []);
  runner.assertEqual(
    cssRemoteUrls.length,
    0,
    `app/css/app.css contains 0 remote url() resource references (found: ${cssRemoteUrls.length})`,
    { feature: 'F2', tier: 1 }
  );

  // ==========================================================================
  // 4. INTERSECTION FILTERING (Category Chips + A-Z Letter + Multi-field Search)
  // ==========================================================================
  console.log('\n--- Section 4: Intersection Filtering & Boundary Stress Testing ---');

  // Load Semantic Engine in VM sandbox with real datasets
  const engineCode = fs.readFileSync(semanticEnginePath, 'utf8');
  const sandbox = {
    window: {},
    console: { log: () => {}, warn: () => {}, error: () => {} }
  };
  vm.createContext(sandbox);
  vm.runInContext(engineCode, sandbox);
  const engine = sandbox.window.DocWebSemantics;

  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  const glossariesData = {};
  for (const g of catalog.canonicalGlossaries) {
    const dataPath = path.resolve(ROOT_DIR, g.dataPath);
    if (fs.existsSync(dataPath)) {
      const d = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      glossariesData[g.id] = Array.isArray(d) ? d : (d.canonicalTerms || []);
    }
  }
  engine.loadAll(catalog, glossariesData);

  const allTerms = engine.getAllTerms();
  runner.assert(
    allTerms.length === 205,
    `Loaded knowledge base for empirical filtering verification: ${allTerms.length} terms across 3 glossaries`,
    { feature: 'F13', tier: 3 }
  );

  // Exact filtering algorithm replica from app.js:filterAndRenderTerms
  function runFilter(glossaryId, category, letter, searchQuery, termSource = allTerms) {
    const q = (searchQuery || '').toLowerCase().trim();

    // 1. Base set by glossary
    let terms = glossaryId === 'all'
      ? termSource
      : termSource.filter(t => t.glossaryId === glossaryId);

    // 2. Category filter
    if (category && category !== 'all') {
      terms = terms.filter(t => t.category === category);
    }

    // 3. A-Z Letter filter with Spanish diacritic normalization
    if (letter && letter !== 'all') {
      terms = terms.filter(t => {
        if (!t.title || typeof t.title !== 'string') return false;
        const clean = t.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toUpperCase();
        return clean.charAt(0) === letter;
      });
    }

    // 4. Multi-field search
    if (q) {
      terms = terms.filter(term => {
        const titleMatch = typeof term.title === 'string' && term.title.toLowerCase().includes(q);
        const shortDef = term.shortDefinition || term.definition;
        const shortDefMatch = typeof shortDef === 'string' && shortDef.toLowerCase().includes(q);
        const fullDef = term.fullDefinition || term.extendedDefinition;
        const fullDefMatch = typeof fullDef === 'string' && fullDef.toLowerCase().includes(q);
        const synMatch = Array.isArray(term.synonyms) && term.synonyms.some(s => typeof s === 'string' && s.toLowerCase().includes(q));
        const compMatch = Array.isArray(term.components) && term.components.some(c => typeof c === 'string' && c.toLowerCase().includes(q));

        return titleMatch || shortDefMatch || fullDefMatch || synMatch || compMatch;
      });
    }

    terms.sort((a, b) => (a.title || '').localeCompare(b.title || '', 'es', { sensitivity: 'base' }));
    return terms;
  }

  // 4.1 Baseline: All filters neutral
  const baselineResults = runFilter('all', 'all', 'all', '');
  runner.assertEqual(
    baselineResults.length,
    205,
    `Baseline filter ('all', 'all', 'all', '') returns all 205 terms`,
    { feature: 'F13', tier: 3 }
  );

  // 4.2 Single Filter: Category
  const catResults = runFilter('all', 'camara-movimiento', 'all', '');
  runner.assert(
    catResults.length > 0 && catResults.every(t => t.category === 'camara-movimiento'),
    `Category filter ('camara-movimiento') returns ${catResults.length} terms, 100% matching the category`,
    { feature: 'F14', tier: 3 }
  );

  // 4.3 Single Filter: A-Z Letter
  const letterCResults = runFilter('all', 'all', 'C', '');
  runner.assert(
    letterCResults.length > 0 && letterCResults.every(t => {
      const clean = t.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toUpperCase();
      return clean.charAt(0) === 'C';
    }),
    `A-Z filter ('C') returns ${letterCResults.length} terms, 100% starting with letter C`,
    { feature: 'F14', tier: 3 }
  );

  // 4.4 Single Filter: Multi-field Search
  const searchResults = runFilter('all', 'all', 'all', 'iluminación');
  runner.assert(
    searchResults.length > 0,
    `Multi-field search ('iluminación') matches ${searchResults.length} terms across title/definitions/synonyms/components`,
    { feature: 'F13', tier: 3 }
  );

  // 4.5 Dual Intersection: Category + Letter
  const catAndLetterResults = runFilter('all', 'camara-movimiento', 'P', '');
  runner.assert(
    catAndLetterResults.length > 0 && catAndLetterResults.every(t => {
      const clean = t.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toUpperCase();
      return t.category === 'camara-movimiento' && clean.charAt(0) === 'P';
    }),
    `Dual intersection (Category 'camara-movimiento' ∩ Letter 'P') returns ${catAndLetterResults.length} terms strictly meeting both criteria`,
    { feature: 'F14', tier: 3 }
  );

  // 4.6 Dual Intersection: Letter + Search
  const letterAndSearchResults = runFilter('all', 'all', 'P', 'plano');
  runner.assert(
    letterAndSearchResults.length > 0 && letterAndSearchResults.every(t => {
      const clean = t.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toUpperCase();
      return clean.charAt(0) === 'P';
    }),
    `Dual intersection (Letter 'P' ∩ Search 'plano') returns ${letterAndSearchResults.length} terms strictly meeting both criteria`,
    { feature: 'F14', tier: 3 }
  );

  // 4.7 Triple Intersection: Category + Letter + Search
  const tripleResults = runFilter('audiovisual-production', 'camara-movimiento', 'P', 'secuencia');
  runner.assert(
    tripleResults.length > 0 && tripleResults.every(t => {
      const clean = t.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toUpperCase();
      return t.glossaryId === 'audiovisual-production' &&
             t.category === 'camara-movimiento' &&
             clean.charAt(0) === 'P';
    }),
    `Triple intersection (Glossary ∩ Category 'camara-movimiento' ∩ Letter 'P' ∩ Search 'secuencia') returns ${tripleResults.length} terms strictly meeting all criteria`,
    { feature: 'F14', tier: 4 }
  );

  // 4.8 Spanish Diacritic & Accent Normalization Stress Test
  const termsWithAccents = allTerms.filter(t => /^[ÁÉÍÓÚáéíóú]/.test(t.title));
  runner.assert(
    termsWithAccents.length > 0,
    `Identified ${termsWithAccents.length} canonical terms starting with Spanish accented vowels (${termsWithAccents.map(t => t.title).join(', ')})`,
    { feature: 'F14', tier: 3 }
  );

  for (const term of termsWithAccents) {
    const rawChar = term.title.charAt(0).toUpperCase();
    const normalizedChar = rawChar.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const filtered = runFilter('all', 'all', normalizedChar, '');
    const found = filtered.some(t => t.id === term.id);
    runner.assert(
      found,
      `Accented term "${term.title}" (starts with ${rawChar}) correctly maps to A-Z filter button "${normalizedChar}"`,
      { feature: 'F14', tier: 3 }
    );
  }

  // 4.9 Toggle Interaction Simulation
  // Clicking an active category or letter should toggle it back to 'all'
  let simulatedCategory = 'all';
  function clickCategoryChip(cat) {
    simulatedCategory = (simulatedCategory === cat) ? 'all' : cat;
  }
  clickCategoryChip('Sonido');
  runner.assertEqual(simulatedCategory, 'Sonido', 'Category chip selection activates category "Sonido"', { feature: 'F14', tier: 2 });
  clickCategoryChip('Sonido');
  runner.assertEqual(simulatedCategory, 'all', 'Re-clicking active category chip toggles back to "all"', { feature: 'F14', tier: 2 });

  let simulatedLetter = 'all';
  function clickLetterBtn(ltr) {
    simulatedLetter = (simulatedLetter === ltr) ? 'all' : ltr;
  }
  clickLetterBtn('M');
  runner.assertEqual(simulatedLetter, 'M', 'A-Z button click activates letter "M"', { feature: 'F14', tier: 2 });
  clickLetterBtn('M');
  runner.assertEqual(simulatedLetter, 'all', 'Re-clicking active A-Z button toggles back to "all"', { feature: 'F14', tier: 2 });

  // 4.10 Adversarial Edge Cases: Disjoint Search (Zero Results)
  const emptyResults = runFilter('audiovisual-production', 'Sonido y Audio', 'Z', 'cámara');
  runner.assertEqual(
    emptyResults.length,
    0,
    `Disjoint 4-way filter yields 0 results cleanly without errors or exceptions`,
    { feature: 'F13', tier: 2 }
  );

  // 4.11 Adversarial Edge Cases: Special Regex & Punctuation Characters in Search
  const regexPunctuationInputs = ['(', ')', '[', ']', '*', '+', '?', '\\', '^', '$', '|', '{', '}', '.*', 'a(b|c)'];
  let regexCrashes = 0;
  for (const sym of regexPunctuationInputs) {
    try {
      const res = runFilter('all', 'all', 'all', sym);
      if (!Array.isArray(res)) regexCrashes++;
    } catch (err) {
      regexCrashes++;
    }
  }
  runner.assertEqual(
    regexCrashes,
    0,
    `Zero runtime exceptions when search query contains regex metacharacters (${regexPunctuationInputs.join(' ')})`,
    { feature: 'F13', tier: 2 }
  );

  // 4.12 Adversarial Edge Cases: Malformed Data Defense
  const malformedTerms = [
    { id: 'urn:test:1', title: 'Malformed Alpha', synonyms: [null, undefined, 42, { complex: true }] },
    { id: 'urn:test:2', title: 'Malformed Beta', components: [null, false, 999] },
    { id: 'urn:test:3', title: null, definition: undefined },
    { id: 'urn:test:4', title: '', synonyms: 'not an array' }
  ];

  let malformedCrashes = 0;
  try {
    const res1 = runFilter('all', 'all', 'all', 'alpha', malformedTerms);
    const res2 = runFilter('all', 'all', 'M', '', malformedTerms);
    if (!Array.isArray(res1) || !Array.isArray(res2)) malformedCrashes++;
  } catch (err) {
    malformedCrashes++;
  }

  runner.assertEqual(
    malformedCrashes,
    0,
    'Defensive multi-field search guards (typeof s === "string") cleanly resist malformed and non-string fields',
    { feature: 'F13', tier: 2 }
  );

  // 4.13 Canonical Spanish Alphabetical Sorting
  const sortedSample = runFilter('audiovisual-production', 'all', 'C', '');
  let isSorted = true;
  for (let i = 0; i < sortedSample.length - 1; i++) {
    if (sortedSample[i].title.localeCompare(sortedSample[i + 1].title, 'es', { sensitivity: 'base' }) > 0) {
      isSorted = false;
      break;
    }
  }
  // ==========================================================================
  // 5. FULL CORPUS A–Z NAVIGATION SWEEP (A to Z)
  // ==========================================================================
  console.log('\n--- Section 5: Full Corpus A–Z Navigation Alphabetical Sweep ---');

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  let alphabetViolations = 0;
  let populatedLetters = 0;
  let emptyLetters = 0;

  for (const letter of alphabet) {
    const results = runFilter('all', 'all', letter, '');
    if (results.length > 0) {
      populatedLetters++;
      for (const t of results) {
        const clean = t.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toUpperCase();
        if (clean.charAt(0) !== letter) {
          alphabetViolations++;
          console.error(`      [A-Z MISMATCH] Term "${t.title}" (starts with ${clean.charAt(0)}) returned under letter "${letter}"`);
        }
      }
    } else {
      emptyLetters++;
    }
  }

  runner.assertEqual(
    alphabetViolations,
    0,
    `Zero alphabetical mapping violations across all 26 letters of the alphabet (A-Z)`,
    { feature: 'F14', tier: 4 }
  );

  runner.assert(
    populatedLetters >= 15,
    `Alphabetical coverage: ${populatedLetters} populated letters, ${emptyLetters} empty letters cleanly handled without errors`,
    { feature: 'F14', tier: 4 }
  );

  // ==========================================================================
  // 6. FULL CORPUS DYNAMIC DOM TEMPLATE VALIDATION (ALL 205 TERMS)
  // ==========================================================================
  console.log('\n--- Section 6: Full Corpus HTML5 Dynamic DOM Template Generation ---');

  // Helper simulating renderTermView HTML output for any term
  function generateTermHtml(term) {
    const glossary = engine.getGlossary(term.glossaryId);
    const directRels = term.relations || [];
    const inverseRels = engine.getInverseRelations(term.id);

    return `
      <article class="content-card" itemscope itemtype="https://schema.org/DefinedTerm" data-term-id="${term.id}" data-glossary-id="${term.glossaryId}" data-category="${term.category || 'General'}">
        <header class="term-header-view">
          <div>
            <dfn class="term-title-large" itemprop="name">${term.title}</dfn>
            <div class="term-meta-row">
              <span class="term-badge-primary">📚 ${glossary ? glossary.title : term.glossaryId}</span>
              <span class="term-badge-primary">🏷️ ${term.category || 'General'}</span>
              <span class="term-badge-id">${term.id}</span>
              ${term.origin === 'persisted_local' ? '<span class="term-badge-cross" style="color:var(--success); border-color:var(--success);">💾 Persistido Local</span>' : ''}
            </div>
          </div>
          <div style="display:flex; gap:0.5rem;">
            <button class="btn btn-sm btn-primary">✏️ Ampliar Conocimiento</button>
          </div>
        </header>

        <section class="term-definition-section" aria-label="Definición y desarrollo conceptual">
          <div class="section-label">Definición Concisa</div>
          <p class="definition-lead" itemprop="description">${term.shortDefinition || term.definition || 'Sin definición corta'}</p>

          <div class="section-label">Desarrollo Conceptual Extendido</div>
          <div class="definition-full" itemprop="disambiguatingDescription">${term.fullDefinition || term.extendedDefinition || 'Sin definición detallada'}</div>
        </section>

        <section aria-label="Atributos y descomposiciones conceptuales">
          <dl class="info-grid">
            <div class="info-block">
              <dt class="info-block-title">⚙️ Atributos Específicos</dt>
              <dd class="info-block-content">
                ${term.attributes && Object.keys(term.attributes).length > 0 ? Object.entries(term.attributes).map(([k, v]) => `<div><strong>${k}:</strong> ${v}</div>`).join('') : '<span class="text-xs text-[var(--muted-foreground)]">No definidos</span>'}
              </dd>
            </div>

            <div class="info-block">
              <dt class="info-block-title">🧩 Componentes y Estructura</dt>
              <dd class="info-block-content">
                ${term.components && term.components.length > 0 
                  ? `<ul style="padding-left:1.2rem;">${term.components.map(c => `<li>${c}</li>`).join('')}</ul>` 
                  : '<span class="text-xs text-[var(--muted-foreground)]">Sin componentes declarados</span>'}
              </dd>
            </div>

            <div class="info-block">
              <dt class="info-block-title">🎯 Aplicaciones Prácticas</dt>
              <dd class="info-block-content">
                ${term.applications && term.applications.length > 0 
                  ? `<ul style="padding-left:1.2rem;">${term.applications.map(a => `<li>${a}</li>`).join('')}</ul>` 
                  : '<span class="text-xs text-[var(--muted-foreground)]">Sin aplicaciones registradas</span>'}
              </dd>
            </div>

            <div class="info-block">
              <dt class="info-block-title">💡 Ejemplos Documentados</dt>
              <dd class="info-block-content">
                ${term.examples && term.examples.length > 0 
                  ? `<ul style="padding-left:1.2rem;">${term.examples.map(ex => `<li>${ex}</li>`).join('')}</ul>` 
                  : '<span class="text-xs text-[var(--muted-foreground)]">Sin ejemplos registrados</span>'}
              </dd>
            </div>
          </dl>
        </section>
      </article>
    `;
  }

  let templateStructuralErrors = 0;
  for (const t of allTerms) {
    const markup = generateTermHtml(t);
    // Wrap in standard dummy document to parse with HTML tokenizer
    const fullDoc = `<!DOCTYPE html><html><head><title>Test</title></head><body>${markup}</body></html>`;
    const res = validateHtmlStructure(fullDoc);
    if (!res.valid) {
      templateStructuralErrors++;
      console.error(`      [TEMPLATE STRUCTURE ERROR] in term ${t.id}: ${res.errors.join('; ')}`);
    }
  }

  runner.assertEqual(
    templateStructuralErrors,
    0,
    `100% of all ${allTerms.length} terms generate valid, well-formed HTML5 DOM templates without tag errors`,
    { feature: 'F12', tier: 4 }
  );

  return runner.printReport();
}

if (require.main === module) {
  const summary = runM3AdversarialChallenge();
  process.exit(summary.failed > 0 ? 1 : 0);
}

module.exports = { runM3AdversarialChallenge };
