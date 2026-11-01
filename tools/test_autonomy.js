/**
 * DOCWEB MULTIGLOSSARY — E2E Test: Autonomy & Preservation
 * Covers:
 *   - Feature 1: Non-invasive Codebase Preservation
 *   - Feature 2: 100% Offline Autonomy Guarantee
 * Tiers: 1, 2, 3, 4
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { ROOT_DIR, TestRunner } = require('./test_utils');

function runAutonomyTests() {
  const runner = new TestRunner('Autonomy & Preservation Suite');
  console.log(`\n=== Running ${runner.suiteName} ===`);

  // Disallowed remote CDN and script domains
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

  // Whitelisted literal namespaces that do not trigger network calls
  const ALLOWED_NAMESPACES = [
    'http://www.w3.org/2000/svg',
    'http://www.w3.org/1999/xhtml',
    'https://schema.org',
    'http://schema.org'
  ];

  // -------------------------------------------------------------
  // TIER 1: Unit & Smoke Checks for Primary Application Files
  // -------------------------------------------------------------
  console.log('\n--- Tier 1: Primary File Autonomy & Preservation ---');

  // F1: Codebase preservation: audit_autonomy.js exists
  const auditAutonomyPath = path.join(ROOT_DIR, 'audit_autonomy.js');
  runner.assert(
    fs.existsSync(auditAutonomyPath),
    'audit_autonomy.js exists and is preserved',
    { feature: 'F1', tier: 1 }
  );

  // F1: index.html exists
  const indexPath = path.join(ROOT_DIR, 'index.html');
  runner.assert(
    fs.existsSync(indexPath),
    'index.html entry point exists',
    { feature: 'F1', tier: 1 }
  );

  // F1: app/css/app.css exists
  const appCssPath = path.join(ROOT_DIR, 'app', 'css', 'app.css');
  runner.assert(
    fs.existsSync(appCssPath),
    'app/css/app.css stylesheet exists',
    { feature: 'F1', tier: 1 }
  );

  // F1: app/js/app.js exists
  const appJsPath = path.join(ROOT_DIR, 'app', 'js', 'app.js');
  runner.assert(
    fs.existsSync(appJsPath),
    'app/js/app.js UI controller exists',
    { feature: 'F1', tier: 1 }
  );

  // F1: app/js/semantic-engine.js exists
  const semanticEnginePath = path.join(ROOT_DIR, 'app', 'js', 'semantic-engine.js');
  runner.assert(
    fs.existsSync(semanticEnginePath),
    'app/js/semantic-engine.js ontology engine exists',
    { feature: 'F1', tier: 1 }
  );

  // F1: app/js/storage.js exists
  const storageJsPath = path.join(ROOT_DIR, 'app', 'js', 'storage.js');
  runner.assert(
    fs.existsSync(storageJsPath),
    'app/js/storage.js persistence module exists',
    { feature: 'F1', tier: 1 }
  );

  // F2: index.html has no remote scripts, remote links, or remote iframes
  if (fs.existsSync(indexPath)) {
    const indexHtml = fs.readFileSync(indexPath, 'utf8');
    const remoteScripts = (indexHtml.match(/<script[^>]+src=['"]https?:\/\/[^'"]+['"]/gi) || []);
    const remoteLinks = (indexHtml.match(/<link[^>]+href=['"]https?:\/\/[^'"]+['"]/gi) || []);
    const remoteIframes = (indexHtml.match(/<iframe[^>]+src=['"]https?:\/\/[^'"]+['"]/gi) || []);
    const remoteImages = (indexHtml.match(/<img[^>]+src=['"]https?:\/\/[^'"]+['"]/gi) || []);

    runner.assertEqual(
      remoteScripts.length,
      0,
      `index.html contains 0 remote script tags (found: ${remoteScripts.length})`,
      { feature: 'F2', tier: 1 }
    );
    runner.assertEqual(
      remoteLinks.length,
      0,
      `index.html contains 0 remote stylesheet link tags (found: ${remoteLinks.length})`,
      { feature: 'F2', tier: 1 }
    );
    runner.assertEqual(
      remoteIframes.length,
      0,
      `index.html contains 0 remote iframe tags (found: ${remoteIframes.length})`,
      { feature: 'F2', tier: 1 }
    );
    runner.assertEqual(
      remoteImages.length,
      0,
      `index.html contains 0 remote img tags (found: ${remoteImages.length})`,
      { feature: 'F2', tier: 1 }
    );
  }

  // F2: app.css has no remote @import or remote url()
  if (fs.existsSync(appCssPath)) {
    const appCss = fs.readFileSync(appCssPath, 'utf8');
    const remoteImports = (appCss.match(/@import\s+(?:url\(['"]?)?https?:\/\/[^'")\s]+/gi) || []);
    const remoteUrls = (appCss.match(/url\(['"]?https?:\/\/[^'")\s]+/gi) || []);

    runner.assertEqual(
      remoteImports.length,
      0,
      `app.css contains 0 remote @import declarations (found: ${remoteImports.length})`,
      { feature: 'F2', tier: 1 }
    );
    runner.assertEqual(
      remoteUrls.length,
      0,
      `app.css contains 0 remote url() resource references (found: ${remoteUrls.length})`,
      { feature: 'F2', tier: 1 }
    );
  }

  // F2: app.js, semantic-engine.js, storage.js have no remote network fetch
  const coreScripts = [
    { name: 'app.js', path: appJsPath },
    { name: 'semantic-engine.js', path: semanticEnginePath },
    { name: 'storage.js', path: storageJsPath }
  ];

  for (const cs of coreScripts) {
    if (fs.existsSync(cs.path)) {
      const code = fs.readFileSync(cs.path, 'utf8');
      const remoteFetch = (code.match(/fetch\s*\(\s*['"`]https?:\/\//gi) || []);
      const xhrRemote = (code.match(/\.open\s*\(\s*['"`][A-Z]+['"`]\s*,\s*['"`]https?:\/\//gi) || []);
      const wsRemote = (code.match(/new\s+WebSocket\s*\(\s*['"`]wss?:\/\//gi) || []);

      runner.assertEqual(
        remoteFetch.length + xhrRemote.length + wsRemote.length,
        0,
        `${cs.name} contains 0 remote network calls (fetch/XHR/WS)`,
        { feature: 'F2', tier: 1 }
      );
    }
  }

  // -------------------------------------------------------------
  // TIER 2: Boundary Value, CDN Blacklist & Recursive Crawl
  // -------------------------------------------------------------
  console.log('\n--- Tier 2: Boundary Analysis & Recursive Repository Crawl ---');

  // F1: Pre-existing datasets preservation
  const preExistingDatasets = [
    path.join(ROOT_DIR, 'Render-3D-Animations', 'data', 'glossary.json'),
    path.join(ROOT_DIR, 'Render-3D-Animations', 'data', 'terms.json'),
    path.join(ROOT_DIR, 'VideoImage', 'data', 'glossary.json'),
    path.join(ROOT_DIR, 'VideoImage', 'data', 'terms.json'),
    path.join(ROOT_DIR, 'app', 'data', 'catalog.json'),
    path.join(ROOT_DIR, 'README.md')
  ];

  for (const targetPath of preExistingDatasets) {
    const rel = path.relative(ROOT_DIR, targetPath);
    const exists = fs.existsSync(targetPath);
    runner.assert(
      exists,
      `Pre-existing asset is preserved: ${rel}`,
      { feature: 'F1', tier: 2 }
    );

    if (exists && targetPath.endsWith('.json')) {
      try {
        const parsed = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
        runner.assert(
          typeof parsed === 'object' && parsed !== null,
          `Pre-existing JSON parsed cleanly: ${rel}`,
          { feature: 'F1', tier: 2 }
        );
      } catch (err) {
        runner.assert(
          false,
          `Pre-existing JSON failed parsing: ${rel} (${err.message})`,
          { feature: 'F1', tier: 2 }
        );
      }
    }
  }

  // F2: Recursive scanner across all project files (excluding .git and .agents)
  function scanDirectory(dir, fileList = []) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      if (item === '.git' || item === '.agents' || item === 'tools' || item === 'node_modules') continue;
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        scanDirectory(fullPath, fileList);
      } else {
        const ext = path.extname(fullPath).toLowerCase();
        if (['.html', '.js', '.css', '.json', '.svg', '.md'].includes(ext)) {
          fileList.push(fullPath);
        }
      }
    }
    return fileList;
  }

  const allProjectFiles = scanDirectory(ROOT_DIR);
  runner.assert(
    allProjectFiles.length >= 10,
    `Recursive repository crawler identified ${allProjectFiles.length} project files`,
    { feature: 'F2', tier: 2 }
  );

  let cdnViolations = 0;
  let unauthorizedRemoteCalls = 0;

  for (const filePath of allProjectFiles) {
    const relPath = path.relative(ROOT_DIR, filePath);
    const content = fs.readFileSync(filePath, 'utf8');

    // Check for forbidden CDN domains
    for (const cdn of FORBIDDEN_CDNS) {
      if (content.includes(cdn)) {
        console.error(`      [CDN VIOLATION] ${relPath} references forbidden CDN: ${cdn}`);
        cdnViolations++;
      }
    }

    // In JS/HTML files, look for unauthorized network calls
    if (filePath.endsWith('.js') || filePath.endsWith('.html')) {
      const fetchMatches = content.match(/fetch\s*\(\s*['"`](https?:\/\/[^'"`]+)['"`]/gi) || [];
      for (const m of fetchMatches) {
        const urlMatch = m.match(/https?:\/\/[^'"`]+/);
        const url = urlMatch ? urlMatch[0] : '';
        if (!ALLOWED_NAMESPACES.some(ns => url.startsWith(ns))) {
          unauthorizedRemoteCalls++;
          console.error(`      [REMOTE CALL VIOLATION] in ${relPath}: ${m}`);
        }
      }
    }
  }

  runner.assertEqual(
    cdnViolations,
    0,
    `Zero forbidden CDN references across all ${allProjectFiles.length} project files`,
    { feature: 'F2', tier: 2 }
  );

  runner.assertEqual(
    unauthorizedRemoteCalls,
    0,
    `Zero unauthorized network fetches across all JS and HTML files`,
    { feature: 'F2', tier: 2 }
  );

  // -------------------------------------------------------------
  // TIER 3: Pairwise Integration & Local Reference Resolution
  // -------------------------------------------------------------
  console.log('\n--- Tier 3: Pairwise Integration & Local Reference Resolution ---');

  // Verify audit_autonomy.js executes cleanly as reference oracle
  let auditExitCode = -1;
  let auditOutput = '';
  try {
    auditOutput = execSync(`node "${auditAutonomyPath}"`, {
      cwd: ROOT_DIR,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe']
    });
    auditExitCode = 0;
  } catch (err) {
    auditExitCode = err.status || 1;
    auditOutput = (err.stdout || '') + (err.stderr || '');
  }

  runner.assertEqual(
    auditExitCode,
    0,
    'Execution of reference oracle audit_autonomy.js exited with code 0',
    { feature: 'F2', tier: 3 }
  );

  runner.assertMatch(
    auditOutput,
    /100%\s+AUTÓNOMO/i,
    'audit_autonomy.js output confirms 100% autonomous local status',
    { feature: 'F2', tier: 3 }
  );

  // Verify all local link and script tags in index.html resolve to actual existing files
  if (fs.existsSync(indexPath)) {
    const html = fs.readFileSync(indexPath, 'utf8');
    const localLinkHrefs = Array.from(html.matchAll(/<link[^>]+href=['"](\.[^'"]+)['"]/gi)).map(m => m[1]);
    const localScriptSrcs = Array.from(html.matchAll(/<script[^>]+src=['"](\.[^'"]+)['"]/gi)).map(m => m[1]);

    for (const href of localLinkHrefs) {
      const resolved = path.resolve(ROOT_DIR, href);
      runner.assert(
        fs.existsSync(resolved),
        `HTML link href "${href}" resolves to existing local file: ${path.relative(ROOT_DIR, resolved)}`,
        { feature: 'F1', tier: 3 }
      );
    }

    for (const src of localScriptSrcs) {
      const resolved = path.resolve(ROOT_DIR, src);
      runner.assert(
        fs.existsSync(resolved),
        `HTML script src "${src}" resolves to existing local file: ${path.relative(ROOT_DIR, resolved)}`,
        { feature: 'F1', tier: 3 }
      );
    }
  }

  // -------------------------------------------------------------
  // TIER 4: Real-World Scenario: Air-Gapped Simulation
  // -------------------------------------------------------------
  console.log('\n--- Tier 4: Real-World Air-Gapped Simulation ---');

  // Scenario 3 (from TEST_INFRA.md): Offline Field Filmmaking Air-Gapped Verification
  // In an air-gapped machine without Internet connectivity:
  // 1. All assets load from filesystem
  // 2. All files are UTF-8 encoded
  // 3. Size of index.html and stylesheets are non-zero
  // 4. Catalog is fully reachable without DNS
  let airGappedPassed = true;
  for (const p of [indexPath, appCssPath, appJsPath, storageJsPath, semanticEnginePath]) {
    if (!fs.existsSync(p) || fs.statSync(p).size === 0) {
      airGappedPassed = false;
    }
  }

  runner.assert(
    airGappedPassed,
    'Scenario 3: Field Air-gapped readiness verified — all core runtime dependencies exist locally and are non-empty',
    { feature: 'F2', tier: 4 }
  );

  return runner.printReport();
}

if (require.main === module) {
  const summary = runAutonomyTests();
  process.exit(summary.failed > 0 ? 1 : 0);
}

module.exports = { runAutonomyTests };
