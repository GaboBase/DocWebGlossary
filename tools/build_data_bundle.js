const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const catalogPath = path.join(rootDir, 'app', 'data', 'catalog.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

const glossaries = {};

for (const g of catalog.canonicalGlossaries) {
  const p = path.resolve(rootDir, g.dataPath);
  if (fs.existsSync(p)) {
    const data = JSON.parse(fs.readFileSync(p, 'utf8'));
    glossaries[g.id] = Array.isArray(data) ? data : (data.canonicalTerms || []);
  } else {
    glossaries[g.id] = [];
  }
}

const bundleContent = `/**
 * DOCWEB MULTIGLOSSARY — Paquete Canónico de Datos Local
 * Permite que la aplicación funcione al 100% tanto servida vía HTTP/HTTPS como
 * abriendo index.html directamente con doble clic (protocolo file:///) sin ser
 * bloqueada por las políticas CORS de navegadores como Chrome, Edge o Firefox.
 */
window.DocWebCanonicalData = {
  catalog: ${JSON.stringify(catalog, null, 2)},
  glossaries: ${JSON.stringify(glossaries, null, 2)}
};
`;

const outputPath = path.join(rootDir, 'app', 'data', 'bundle.js');
fs.writeFileSync(outputPath, bundleContent, 'utf8');
console.log(`Bundle generated successfully at ${outputPath} (${(bundleContent.length / 1024).toFixed(1)} KB)`);
