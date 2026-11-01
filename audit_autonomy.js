const fs = require('fs');

const files = [
  './index.html',
  './app/css/app.css',
  './app/js/app.js',
  './app/js/semantic-engine.js',
  './app/js/storage.js'
];

let violations = 0;

for (const path of files) {
  const content = fs.readFileSync(path, 'utf8');
  const remoteFetch = content.match(/fetch\s*\(\s*['"]https?:\/\//gi);
  const remoteScript = content.match(/<script[^>]+src=['"]https?:\/\//gi);
  const remoteLink = content.match(/<link[^>]+href=['"]https?:\/\//gi);

  if (remoteFetch || remoteScript || remoteLink) {
    console.error(`Recurso externo no autorizado detectado en ${path}:`, { remoteFetch, remoteScript, remoteLink });
    violations++;
  }
}

if (violations === 0) {
  console.log('VERIFICACIÓN ESTRICTA: 100% AUTÓNOMO Y LOCAL. Cero peticiones o CDNs externos.');
} else {
  process.exit(1);
}
