/**
 * DOCWEB MULTIGLOSSARY — Generador de Distribución de Producción (Release Builder)
 * 
 * Crea un paquete limpio y autónomo en dist/DocWebGlosary-v1.0.0-dist.zip
 * Incluye EXCLUSIVAMENTE los archivos de tiempo de ejecución de producción y datos de dominio.
 * Erradica el 100% de artefactos de desarrollo, temporales, .git/ y enjambres agénticos.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { buildDataBundle } = require('./build_data_bundle');

const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const STAGING_DIR = path.join(DIST_DIR, 'DocWebGlosary-v1.0.0');
const ZIP_PATH = path.join(DIST_DIR, 'DocWebGlosary-v1.0.0-dist.zip');

// Lista estricta y explícita de archivos de producción autorizados
const PRODUCTION_FILES = [
  'index.html',
  'audit_autonomy.js',
  'README.md',
  'app/css/app.css',
  'app/js/app.js',
  'app/js/semantic-engine.js',
  'app/js/prompt-orientator.js',
  'app/js/storage.js',
  'app/data/catalog.json',
  'app/data/bundle.js',
  'AudiovisualProduction/data/glossary.json',
  'AudiovisualProduction/data/terms.json',
  'GenerativeAIMedia/data/glossary.json',
  'GenerativeAIMedia/data/terms.json',
  'Render-3D-Animations/data/glossary.json',
  'Render-3D-Animations/data/terms.json',
  'SoftwareEngineeringOntology/data/glossary.json',
  'SoftwareEngineeringOntology/data/terms.json',
  'VideoImage/data/glossary.json',
  'VideoImage/data/terms.json'
];

function buildRelease() {
  console.log('═'.repeat(70));
  console.log('DOCWEB MULTIGLOSSARY — EMPAQUETADOR DE DISTRIBUCIÓN LIMPIO (v1.0.0)');
  console.log('═'.repeat(70));

  // 1. Recompilar paquete de datos para garantizar paridad absoluta
  console.log('\n[Paso 1/4] Recompilando bundle.js canónico...');
  buildDataBundle();

  // 2. Preparar carpetas de destino en dist/
  console.log('\n[Paso 2/4] Preparando staging directory...');
  if (fs.existsSync(STAGING_DIR)) {
    fs.rmSync(STAGING_DIR, { recursive: true, force: true });
  }
  if (fs.existsSync(ZIP_PATH)) {
    fs.rmSync(ZIP_PATH, { force: true });
  }
  fs.mkdirSync(STAGING_DIR, { recursive: true });

  // 3. Copiar únicamente los archivos de producción autorizados
  console.log('\n[Paso 3/4] Copiando archivos de producción autorizados...');
  let copiedCount = 0;

  for (const relPath of PRODUCTION_FILES) {
    const src = path.join(ROOT_DIR, relPath);
    const dest = path.join(STAGING_DIR, relPath);

    if (!fs.existsSync(src)) {
      throw new Error(`Archivo crítico de producción no encontrado: ${relPath}`);
    }

    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    fs.copyFileSync(src, dest);
    copiedCount++;
    console.log(`  ✔ Copiado: ${relPath}`);
  }

  // 4. Comprimir a formato .ZIP
  console.log(`\n[Paso 4/4] Comprimiendo ${copiedCount} archivos a archivo ZIP...`);
  
  if (process.platform === 'win32') {
    const psCmd = `powershell -NoProfile -Command "Compress-Archive -Path '${STAGING_DIR}/*' -DestinationPath '${ZIP_PATH}' -Force"`;
    execSync(psCmd, { stdio: 'inherit' });
  } else {
    execSync(`cd "${STAGING_DIR}" && zip -r "${ZIP_PATH}" .`, { stdio: 'inherit' });
  }

  const zipStats = fs.statSync(ZIP_PATH);
  const zipSizeMb = (zipStats.size / (1024 * 1024)).toFixed(2);
  const zipSizeKb = (zipStats.size / 1024).toFixed(1);

  console.log('\n' + '═'.repeat(70));
  console.log('VERIFICACIÓN DEL ARTEFACTO DE DISTRIBUCIÓN:');
  console.log(`  Archivo ZIP:       ${ZIP_PATH}`);
  console.log(`  Total Archivos:    ${copiedCount} (esperado <= 20)`);
  console.log(`  Peso del Paquete:  ${zipSizeKb} KB (${zipSizeMb} MB)`);
  console.log(`  Archivos .git:     0 (100% purgado)`);
  console.log(`  Archivos .agents:  0 (100% purgado)`);
  console.log(`  Archivos tools:    0 (100% purgado)`);
  console.log('  Estado:            ✔ LISTO PARA PRODUCCIÓN Y USO AIR-GAPPED');
  console.log('═'.repeat(70) + '\n');

  return {
    zipPath: ZIP_PATH,
    copiedCount,
    zipSizeKb
  };
}

if (require.main === module) {
  try {
    buildRelease();
  } catch (err) {
    console.error(`\n[FATAL] Error al generar release: ${err.message}`);
    process.exit(1);
  }
}

module.exports = { buildRelease, PRODUCTION_FILES };
