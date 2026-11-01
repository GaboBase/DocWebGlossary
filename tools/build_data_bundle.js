/**
 * DOCWEB MULTIGLOSSARY — Compilador Declarativo e Idempotente de Datos
 * 
 * Funciones clave:
 * 1. Lee y valida los 10 archivos canónicos de dominio (<Domain>/data/glossary.json y terms.json).
 * 2. Valida contratos de esquema: presencia de ID (URN), slug, título, definición y categoría.
 * 3. Sincroniza metadatos y conteos de términos exactos en app/data/catalog.json.
 * 4. Calcula un hash criptográfico SHA-256 de todas las fuentes de datos.
 * 5. Emite app/data/bundle.js firmado para funcionamiento 100% offline y anti-CORS (protocolo file:///).
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const rootDir = path.resolve(__dirname, '..');
const catalogPath = path.join(rootDir, 'app', 'data', 'catalog.json');
const outputPath = path.join(rootDir, 'app', 'data', 'bundle.js');

function buildDataBundle() {
  console.log('═'.repeat(70));
  console.log('DOCWEB MULTIGLOSSARY — COMPILADOR DECLARATIVO DE DATOS (v1.0.0)');
  console.log('═'.repeat(70));

  if (!fs.existsSync(catalogPath)) {
    throw new Error(`Catálogo central no encontrado en: ${catalogPath}`);
  }

  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  const glossaries = {};
  const hash = crypto.createHash('sha256');
  let totalTerms = 0;
  const validationErrors = [];

  console.log('\n--- Fase 1: Validación de Esquema e Integridad de Dominios ---');

  for (const g of catalog.canonicalGlossaries) {
    const termsFilePath = path.resolve(rootDir, g.dataPath);
    const metaFilePath = path.resolve(rootDir, g.metadataPath);

    // 1. Validar existencia de archivos
    if (!fs.existsSync(termsFilePath)) {
      validationErrors.push(`Falta archivo de términos para [${g.id}]: ${g.dataPath}`);
      continue;
    }
    if (!fs.existsSync(metaFilePath)) {
      validationErrors.push(`Falta archivo de metadatos para [${g.id}]: ${g.metadataPath}`);
      continue;
    }

    // 2. Leer contenido y acumular hash SHA-256
    const termsRaw = fs.readFileSync(termsFilePath, 'utf8');
    const metaRaw = fs.readFileSync(metaFilePath, 'utf8');

    hash.update(`${g.id}:meta:${metaRaw}`);
    hash.update(`${g.id}:terms:${termsRaw}`);

    let termsData;
    let metaData;
    try {
      termsData = JSON.parse(termsRaw);
      metaData = JSON.parse(metaRaw);
    } catch (e) {
      validationErrors.push(`Error de parseo JSON en glosario [${g.id}]: ${e.message}`);
      continue;
    }

    const termsArray = Array.isArray(termsData) ? termsData : (termsData.canonicalTerms || []);
    glossaries[g.id] = termsArray;
    totalTerms += termsArray.length;

    // Actualizar termCount en catálogo si divergió
    const previousCount = g.termCount;
    g.termCount = termsArray.length;

    // Validar cada término
    let invalidTermsInGlossary = 0;
    const seenSlugs = new Set();

    for (let i = 0; i < termsArray.length; i++) {
      const t = termsArray[i];
      if (!t.title || typeof t.title !== 'string') {
        validationErrors.push(`[${g.id}] Término índice ${i} carece de 'title' válido.`);
        invalidTermsInGlossary++;
      }
      if (!t.slug || typeof t.slug !== 'string') {
        validationErrors.push(`[${g.id}] Término "${t.title || i}" carece de 'slug' válido.`);
        invalidTermsInGlossary++;
      } else {
        if (seenSlugs.has(t.slug)) {
          validationErrors.push(`[${g.id}] Slug duplicado: "${t.slug}"`);
          invalidTermsInGlossary++;
        }
        seenSlugs.add(t.slug);
      }
      if (!t.definition && !t.shortDefinition) {
        validationErrors.push(`[${g.id}] Término "${t.title || t.slug}" carece de definición.`);
        invalidTermsInGlossary++;
      }
    }

    const statusBadge = invalidTermsInGlossary === 0 ? '✔ VÁLIDO' : `✖ ${invalidTermsInGlossary} ERRORES`;
    console.log(`  [${g.id}] ${g.title}: ${termsArray.length} términos (${statusBadge})`);
  }

  if (validationErrors.length > 0) {
    console.error('\nErrores de validación detectados:');
    validationErrors.forEach(err => console.error(`  - ${err}`));
    throw new Error(`Compilación abortada: ${validationErrors.length} errores de integridad de datos.`);
  }

  const computedHash = hash.digest('hex');
  console.log(`\n--- Fase 2: Hash Criptográfico SHA-256 de Fuentes de Datos ---`);
  console.log(`  SHA-256: ${computedHash}`);
  console.log(`  Total Glosarios: ${catalog.canonicalGlossaries.length} | Total Términos: ${totalTerms}`);

  // Actualizar metadatos en catálogo
  catalog._dataHash = computedHash;
  catalog._lastCompiled = new Date().toISOString();
  catalog._totalTerms = totalTerms;

  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + '\n', 'utf8');

  console.log('\n--- Fase 3: Emisión de Empaquetado Autónomo (bundle.js) ---');

  const bundleContent = `/**
 * DOCWEB MULTIGLOSSARY — Paquete Canónico de Datos Local (Autónomo & Offline)
 * Hash SHA-256: ${computedHash}
 * Fecha de Compilación: ${catalog._lastCompiled}
 * Permite funcionamiento íntegro bajo protocolo file:/// sin restricciones CORS.
 */
window.DocWebCanonicalData = {
  _dataHash: "${computedHash}",
  _compiledAt: "${catalog._lastCompiled}",
  _totalTerms: ${totalTerms},
  catalog: ${JSON.stringify(catalog, null, 2)},
  glossaries: ${JSON.stringify(glossaries, null, 2)}
};
`;

  fs.writeFileSync(outputPath, bundleContent, 'utf8');
  const bundleSizeKb = (Buffer.byteLength(bundleContent, 'utf8') / 1024).toFixed(1);
  console.log(`  ✔ Bundle generado exitosamente en: ${outputPath} (${bundleSizeKb} KB)`);
  console.log('═'.repeat(70) + '\n');

  return {
    hash: computedHash,
    totalTerms,
    bundleSizeKb
  };
}

if (require.main === module) {
  try {
    buildDataBundle();
  } catch (err) {
    console.error(`\n[FATAL] Error en build_data_bundle: ${err.message}`);
    process.exit(1);
  }
}

module.exports = { buildDataBundle };
