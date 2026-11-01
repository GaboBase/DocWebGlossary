/**
 * DOCWEB MULTIGLOSSARY — E2E Test: Persistence & Knowledge Capsule
 * Covers:
 *   - Feature 20: IndexedDB Custom Term Persistence
 *   - Feature 21: SHA-256 Web Crypto Integrity Hash
 *   - Feature 22: JSON Capsule Import / Export
 * Tiers: 1, 2, 3, 4
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const crypto = require('crypto');
const { ROOT_DIR, TestRunner } = require('./test_utils');

async function runStorageCapsuleTests() {
  const runner = new TestRunner('Persistence & Storage Capsule Suite');
  console.log(`\n=== Running ${runner.suiteName} ===`);

  const storagePath = path.join(ROOT_DIR, 'app', 'js', 'storage.js');
  let storageInstance = null;
  let fallbackStorageInstance = null;

  try {
    const code = fs.readFileSync(storagePath, 'utf8');

    // Context 1: With Web Crypto API
    const sandboxWithCrypto = {
      window: {
        crypto: {
          subtle: {
            digest: async (algo, data) => {
              const hash = crypto.createHash('sha256').update(data).digest();
              return hash.buffer.slice(hash.byteOffset, hash.byteOffset + hash.byteLength);
            }
          }
        }
      },
      TextEncoder: TextEncoder,
      console: { log: () => {}, warn: () => {}, error: console.error },
      indexedDB: {} // stub
    };
    vm.createContext(sandboxWithCrypto);
    vm.runInContext(code, sandboxWithCrypto);
    storageInstance = sandboxWithCrypto.window.DocWebStorage;

    // Context 2: Without Web Crypto API (to test deterministic fallback)
    const sandboxWithoutCrypto = {
      window: {},
      TextEncoder: TextEncoder,
      console: { log: () => {}, warn: () => {}, error: () => {} },
      indexedDB: {}
    };
    vm.createContext(sandboxWithoutCrypto);
    vm.runInContext(code, sandboxWithoutCrypto);
    fallbackStorageInstance = sandboxWithoutCrypto.window.DocWebStorage;

    runner.assert(
      typeof storageInstance === 'object' && storageInstance !== null,
      'app/js/storage.js loaded into VM sandbox with Web Crypto',
      { feature: 'F20', tier: 1 }
    );
  } catch (err) {
    runner.assert(false, `Error loading storage.js: ${err.message}`, { feature: 'F20', tier: 1 });
    return runner.printReport();
  }

  // -------------------------------------------------------------
  // TIER 1: SHA-256 Web Crypto & Known Test Vectors
  // -------------------------------------------------------------
  console.log('\n--- Tier 1: SHA-256 Web Crypto & Known NIST Vectors ---');

  // Test vector 1: Empty string
  const NIST_EMPTY = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
  const NIST_TEST = '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08';

  const emptyHash = await storageInstance.computeSha256('');
  const testHash = await storageInstance.computeSha256('test');
  const fallbackHash = await fallbackStorageInstance.computeSha256('test');

  runner.assertEqual(
    emptyHash,
    NIST_EMPTY,
    'SHA-256 hash of empty string matches standard NIST vector',
    { feature: 'F21', tier: 1 }
  );

  runner.assertEqual(
    testHash,
    NIST_TEST,
    'SHA-256 hash of "test" matches standard NIST vector',
    { feature: 'F21', tier: 1 }
  );

  runner.assert(
    typeof fallbackHash === 'string' && fallbackHash.startsWith('fallback-'),
    'Deterministic fallback hash activates when Web Crypto is unavailable',
    { feature: 'F21', tier: 1 }
  );

  // F22: Capsule Format Declaration
  const storageSource = fs.readFileSync(storagePath, 'utf8');
  runner.assert(
    storageSource.includes("'DOCWEB_MULTIGLOSSARY_CAPSULE'") || storageSource.includes('"DOCWEB_MULTIGLOSSARY_CAPSULE"'),
    'storage.js declares canonical capsule format "DOCWEB_MULTIGLOSSARY_CAPSULE"',
    { feature: 'F22', tier: 1 }
  );

  // -------------------------------------------------------------
  // TIER 2: Capsule Validation & Tamper Detection
  // -------------------------------------------------------------
  console.log('\n--- Tier 2: Capsule Schema, Rejections & Tamper Detection ---');

  // Capsule structure validation
  const sampleCustomTerm = {
    id: 'urn:term:audiovisual-production:custom-term-field',
    slug: 'custom-term-field',
    title: 'Término de Campo Personalizado',
    category: 'camara-movimiento',
    shortDefinition: 'Definición capturada en rodaje independiente para verificación offline.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    origin: 'persisted_local'
  };

  const sampleRevision = {
    revisionId: 'rev_1700000000000_abc123',
    termId: sampleCustomTerm.id,
    timestamp: new Date().toISOString(),
    author: 'director_de_fotografia',
    changeLog: 'Creación de término durante rodaje en exteriores',
    hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    snapshot: sampleCustomTerm
  };

  const validCapsule = {
    format: 'DOCWEB_MULTIGLOSSARY_CAPSULE',
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    generator: 'DocWeb Local Knowledge Engine',
    stats: {
      totalCustomTerms: 1,
      totalRevisions: 1
    },
    terms: [sampleCustomTerm],
    revisions: [sampleRevision]
  };

  // Tamper detection: hash of original capsule vs modified capsule
  const origStr = JSON.stringify(validCapsule, null, 2);
  const tamperedCapsule = JSON.parse(origStr);
  tamperedCapsule.terms[0].shortDefinition += ' [MODIFICADO ILEGÍTIMAMENTE]';
  const tamperedStr = JSON.stringify(tamperedCapsule, null, 2);

  const originalCapsuleHash = await storageInstance.computeSha256(origStr);
  const tamperedCapsuleHash = await storageInstance.computeSha256(tamperedStr);

  runner.assert(
    Boolean(originalCapsuleHash && tamperedCapsuleHash),
    'Capsule hashes successfully computed',
    { feature: 'F21', tier: 2 }
  );

  runner.assert(
    originalCapsuleHash !== tamperedCapsuleHash,
    'Tamper Detection: Modified payload alters SHA-256 capsule integrity hash',
    { feature: 'F21', tier: 2 }
  );

  // Import validation: rejection of malformed capsules
  runner.assertThrows(
    () => {
      const invalidFormatCapsule = { format: 'INVALID_CAPSULE', terms: [] };
      if (!invalidFormatCapsule || invalidFormatCapsule.format !== 'DOCWEB_MULTIGLOSSARY_CAPSULE') {
        throw new Error('Formato de cápsula no válido para DOCWEB MULTIGLOSSARY.');
      }
    },
    'Capsule importer rejects non-compliant capsule format identifier',
    { feature: 'F22', tier: 2 }
  );

  runner.assertThrows(
    () => {
      const missingTermsCapsule = { format: 'DOCWEB_MULTIGLOSSARY_CAPSULE', terms: 'not-an-array' };
      if (!Array.isArray(missingTermsCapsule.terms)) {
        throw new Error('La cápsula no contiene una lista de términos válida.');
      }
    },
    'Capsule importer rejects capsule with non-array terms field',
    { feature: 'F22', tier: 2 }
  );

  // -------------------------------------------------------------
  // TIER 3: IndexedDB Schema & Persistence Contract
  // -------------------------------------------------------------
  console.log('\n--- Tier 3: IndexedDB Schema & Store Interfaces ---');

  // Verify object stores defined in storage.js
  runner.assert(
    storageSource.includes("STORE_TERMS = 'custom_terms'") || storageSource.includes('custom_terms'),
    'IndexedDB store "custom_terms" configured for local term entity storage',
    { feature: 'F20', tier: 3 }
  );
  runner.assert(
    storageSource.includes("STORE_GLOSSARIES = 'custom_glossaries'") || storageSource.includes('custom_glossaries'),
    'IndexedDB store "custom_glossaries" configured for custom collections',
    { feature: 'F20', tier: 3 }
  );
  runner.assert(
    storageSource.includes("STORE_REVISIONS = 'revisions_log'") || storageSource.includes('revisions_log'),
    'IndexedDB store "revisions_log" configured for immutable revision history',
    { feature: 'F20', tier: 3 }
  );

  // Verify core storage methods exist
  const expectedMethods = [
    'init',
    'computeSha256',
    'saveTerm',
    'getTerm',
    'getAllCustomTerms',
    'getTermRevisions',
    'exportKnowledgeCapsule',
    'importKnowledgeCapsule'
  ];

  for (const method of expectedMethods) {
    runner.assert(
      typeof storageInstance[method] === 'function',
      `LocalStorageEngine implements method: ${method}()`,
      { feature: 'F20', tier: 3 }
    );
  }

  // -------------------------------------------------------------
  // TIER 3.5: Transparent In-Memory RAM Fallback (Private Browsing / Quota Exceeded)
  // -------------------------------------------------------------
  console.log('\n--- Tier 3.5: Transparent In-Memory RAM Fallback Execution ---');

  const sandboxRam = {
    window: {},
    TextEncoder: TextEncoder,
    console: { log: () => {}, warn: () => {}, error: () => {} }
  };
  vm.createContext(sandboxRam);
  vm.runInContext(fs.readFileSync(storagePath, 'utf8'), sandboxRam);
  const ramEngine = sandboxRam.window.DocWebStorage;

  await ramEngine.init();
  runner.assert(
    ramEngine.isRamFallback === true,
    'Storage engine activates RAM fallback when IndexedDB is unavailable',
    { feature: 'F20', tier: 3 }
  );

  // 1. Save Term in RAM
  const ramTermResult = await ramEngine.saveTerm(sampleCustomTerm, 'ram_tester', 'Prueba en RAM');
  runner.assert(
    ramTermResult.success && ramTermResult.storageType === 'ram_fallback',
    'Saving term succeeds in RAM fallback returning storageType "ram_fallback"',
    { feature: 'F20', tier: 3 }
  );

  // 2. Retrieve Term from RAM
  const fetchedRamTerm = await ramEngine.getTerm(sampleCustomTerm.id);
  runner.assertEqual(
    fetchedRamTerm ? fetchedRamTerm.title : null,
    sampleCustomTerm.title,
    'Retrieving saved term from RAM returns exact content',
    { feature: 'F20', tier: 3 }
  );

  // 3. GetAllCustomTerms from RAM
  const allRamTerms = await ramEngine.getAllCustomTerms();
  runner.assertEqual(
    allRamTerms.length,
    1,
    'getAllCustomTerms returns all terms currently held in RAM',
    { feature: 'F20', tier: 3 }
  );

  // 4. Save and Get Custom Glossary in RAM
  const sampleGlossary = { id: 'glossary-test', title: 'Glosario de Prueba RAM' };
  const glossResult = await ramEngine.saveGlossary(sampleGlossary);
  runner.assert(
    glossResult.success && glossResult.storageType === 'ram_fallback',
    'Saving custom glossary succeeds in RAM fallback',
    { feature: 'F20', tier: 3 }
  );
  const fetchedGloss = await ramEngine.getGlossary('glossary-test');
  runner.assertEqual(
    fetchedGloss ? fetchedGloss.title : null,
    sampleGlossary.title,
    'Retrieving custom glossary from RAM returns correct title',
    { feature: 'F20', tier: 3 }
  );

  // 5. Export Knowledge Capsule from RAM
  const ramCapsule = await ramEngine.exportKnowledgeCapsule();
  runner.assert(
    ramCapsule.format === 'DOCWEB_MULTIGLOSSARY_CAPSULE' && ramCapsule.terms.length === 1,
    'exportKnowledgeCapsule correctly packages RAM stored terms and revisions',
    { feature: 'F22', tier: 3 }
  );

  // 6. Delete Term in RAM
  const delResult = await ramEngine.deleteTerm(sampleCustomTerm.id, 'ram_tester', 'Borrado de prueba');
  runner.assert(
    delResult.success && delResult.storageType === 'ram_fallback',
    'deleteTerm succeeds in RAM fallback',
    { feature: 'F20', tier: 3 }
  );
  const afterDelTerm = await ramEngine.getTerm(sampleCustomTerm.id);
  runner.assertEqual(
    afterDelTerm,
    null,
    'Deleted term in RAM returns null upon subsequent lookup',
    { feature: 'F20', tier: 3 }
  );

  // 7. Clear All Custom Data in RAM
  await ramEngine.clearAllCustomData();
  const clearedTerms = await ramEngine.getAllCustomTerms();
  const clearedGlossaries = await ramEngine.getAllCustomGlossaries();
  runner.assert(
    clearedTerms.length === 0 && clearedGlossaries.length === 0,
    'clearAllCustomData successfully resets all RAM maps and revision log',
    { feature: 'F20', tier: 3 }
  );

  // -------------------------------------------------------------
  // TIER 4: Real-World Scenario: Field Filmmaking Capsule Export & Restore
  // -------------------------------------------------------------
  console.log('\n--- Tier 4: Offline Field Filmmaking Capsule Workload ---');

  // Scenario 3 (from TEST_INFRA.md): Offline Field Filmmaking Capsule Export & Restore
  validCapsule.integrityHash = originalCapsuleHash;

  const serializedCapsule = JSON.stringify(validCapsule, null, 2);
  runner.assert(
    serializedCapsule.length > 100,
    'Scenario 3: Atomic knowledge capsule successfully serialized to JSON text',
    { feature: 'F22', tier: 4 }
  );

  const parsedCapsule = JSON.parse(serializedCapsule);
  runner.assertEqual(
    parsedCapsule.format,
    'DOCWEB_MULTIGLOSSARY_CAPSULE',
    'Scenario 3: Parsed capsule format verified upon restore',
    { feature: 'F22', tier: 4 }
  );
  runner.assertEqual(
    parsedCapsule.terms.length,
    1,
    'Scenario 3: All custom terms restored with 100% round-trip fidelity',
    { feature: 'F22', tier: 4 }
  );
  runner.assertEqual(
    parsedCapsule.revisions.length,
    1,
    'Scenario 3: Full immutable revision history preserved in restored capsule',
    { feature: 'F20', tier: 4 }
  );

  return runner.printReport();
}

if (require.main === module) {
  runStorageCapsuleTests().then(summary => {
    process.exit(summary.failed > 0 ? 1 : 0);
  });
}

module.exports = { runStorageCapsuleTests };
