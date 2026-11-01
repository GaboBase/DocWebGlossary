const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'source_raw.html'), 'utf8');

const h3Regex = /<h3[^>]*>([\s\S]*?)<\/h3>/g;
const sections = [];
let lastIndex = 0;
let lastTitle = '';

let match;
while ((match = h3Regex.exec(html)) !== null) {
  if (lastTitle) {
    sections.push({
      title: lastTitle,
      htmlChunk: html.substring(lastIndex, match.index)
    });
  }
  const rawH3 = match[1];
  const cleanTitle = rawH3.replace(/<[^>]+>/g, '').trim();
  lastTitle = cleanTitle;
  lastIndex = match.index;
}
if (lastTitle) {
  sections.push({
    title: lastTitle,
    htmlChunk: html.substring(lastIndex)
  });
}

const termDiagramMap = {};

sections.forEach(sec => {
  const imgTags = sec.htmlChunk.match(/<img[^>]+>/g) || [];
  imgTags.forEach(tag => {
    const srcMatch = tag.match(/src=["']([^"']+)["']/i);
    const altMatch = tag.match(/alt=["']([^"']+)["']/i);
    const widthMatch = tag.match(/width=["']([^"']+)["']/i);
    const heightMatch = tag.match(/height=["']([^"']+)["']/i);

    if (srcMatch && srcMatch[1].includes('glosario-')) {
      if (!termDiagramMap[sec.title]) {
        termDiagramMap[sec.title] = [];
      }
      termDiagramMap[sec.title].push({
        src: srcMatch[1],
        alt: altMatch ? altMatch[1] : '',
        width: widthMatch ? widthMatch[1] : '',
        height: heightMatch ? heightMatch[1] : ''
      });
    }
  });
});

console.log('Terms with diagrams:', Object.keys(termDiagramMap).length);
for (const [title, diagrams] of Object.entries(termDiagramMap)) {
  console.log(`\nTerm: "${title}"`);
  diagrams.forEach(d => console.log(`  - Diagram: ${path.basename(d.src)} | Alt: "${d.alt}" (${d.width}x${d.height})`));
}

fs.writeFileSync(
  path.join(__dirname, 'term_diagrams.json'),
  JSON.stringify(termDiagramMap, null, 2),
  'utf8'
);
