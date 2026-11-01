/**
 * DOCWEB MULTIGLOSSARY — Test de Paridad y Sincronización Determinista de Datos
 * Previene el estado de "Split-Brain": Falla de inmediato si algún archivo de
 * <Domain>/data/*.json difiere del empaquetado en app/data/bundle.js o catalog.json.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const vm = require('vm');
const { ROOT_DIR, TestRunner } = require('./test_utils');

function runDataParityTests() {
  const runner = new TestRunner('Data Parity & Freshness Suite');
  console.log(`\n=== Running ${runner.suiteName} ===`);

  const catalogPath = path.join(ROOT_DIR, 'app', 'data', 'catalog.json');
  const bundlePath = path.join(ROOT_DIR, 'app', 'data', 'bundle.js');

  runner.assert(
    fs.existsSync(catalogPath),
    'app/data/catalog.json exists on disk',
    { feature: 'F8', tier: 1 }
  );

  runner.assert(
    fs.existsSync(bundlePath),
    'app/data/bundle.js exists on disk',
    { feature: 'F1', tier: 1 }
  );

  if (!fs.existsSync(catalogPath) || !fs.existsSync(bundlePath)) {
    return runner.printReport();
  }

  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

  // 1. Calcular hash SHA-256 en vivo de los 10 archivos fuente en disco
  const hash = crypto.createHash('sha256');
  let liveTermsCount = 0;

  for (const g of catalog.canonicalGlossaries) {
    const termsPath = path.resolve(ROOT_DIR, g.dataPath);
    const metaPath = path.resolve(ROOT_DIR, g.metadataPath);

    runner.assert(
      fs.existsSync(termsPath),
      `Domain terms file exists for ${g.id}: ${g.dataPath}`,
      { feature: 'F1', tier: 2 }
    );
    runner.assert(
      fs.existsSync(metaPath),
      `Domain metadata file exists for ${g.id}: ${g.metadataPath}`,
      { feature: 'F1', tier: 2 }
    );

    if (fs.existsSync(termsPath) && fs.existsSync(metaPath)) {
      const metaRaw = fs.readFileSync(metaPath, 'utf8');
      const termsRaw = fs.readFileSync(termsPath, 'utf8');

      hash.update(`${g.id}:meta:${metaRaw}`);
      hash.update(`${g.id}:terms:${termsRaw}`);

      const termsJson = JSON.parse(termsRaw);
      const termsArr = Array.isArray(termsJson) ? termsJson : (termsJson.canonicalTerms || []);
      liveTermsCount += termsArr.length;

      runner.assertEqual(
        termsArr.length,
        g.termCount,
        `Catalog termCount matches live terms count for ${g.id} (${termsArr.length})`,
        { feature: 'F8', tier: 2 }
      );
    }
  }

  const computedHash = hash.digest('hex');

  // 2. Extraer datos del bundle.js evaluándolo en un contexto seguro
  const bundleRaw = fs.readFileSync(bundlePath, 'utf8');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  try {
    vm.runInContext(bundleRaw, sandbox);
  } catch (err) {
    runner.assert(false, `app/data/bundle.js evaluation failed: ${err.message}`, { feature: 'F1', tier: 1 });
    return runner.printReport();
  }

  const bundleData = sandbox.window.DocWebCanonicalData;
  runner.assert(
    typeof bundleData === 'object' && bundleData !== null,
    'window.DocWebCanonicalData is initialized in bundle.js',
    { feature: 'F1', tier: 1 }
  );

  // 3. Verificación de Hash SHA-256: bundle vs archivos en disco
  const bundleHash = bundleData._dataHash;
  const catalogHash = catalog._dataHash;

  runner.assertEqual(
    catalogHash,
    computedHash,
    `catalog.json _dataHash matches live source files SHA-256 (${computedHash.slice(0, 12)}...)`,
    { feature: 'F21', tier: 2 }
  );

  runner.assertEqual(
    bundleHash,
    computedHash,
    `bundle.js _dataHash matches live source files SHA-256 (${computedHash.slice(0, 12)}...)`,
    { feature: 'F21', tier: 2 }
  );

  // 4. Paridad profunda de datos: bundle vs archivos en disco
  let deepParityMatches = true;
  for (const g of catalog.canonicalGlossaries) {
    const inBundle = bundleData.glossaries[g.id] || [];
    const diskPath = path.resolve(ROOT_DIR, g.dataPath);
    if (fs.existsSync(diskPath)) {
      const diskData = JSON.parse(fs.readFileSync(diskPath, 'utf8'));
      const diskTerms = Array.isArray(diskData) ? diskData : (diskData.canonicalTerms || []);
      if (JSON.stringify(inBundle) !== JSON.stringify(diskTerms)) {
        deepParityMatches = false;
        console.error(`  [PARITY MISMATCH] Glossario ${g.id} difiere entre disco y bundle.js`);
      }
    }
  }

  runner.assert(
    deepParityMatches,
    `100% deep equality bit-a-bit between disk JSONs and bundle.js across all ${catalog.canonicalGlossaries.length} glossaries`,
    { feature: 'F23', tier: 3 }
  );

  runner.assertEqual(
    bundleData._totalTerms || liveTermsCount,
    272,
    `Total terms count verified at exactly 272 across all 5 domains`,
    { feature: 'F3', tier: 2 }
  );

  return runner.printReport();
}

if (require.main === module) {
  runDataParityTests();
}

module.exports = { runDataParityTests };
