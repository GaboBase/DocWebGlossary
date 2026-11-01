const fs = require('fs');
const path = require('path');

const sourcePath = 'C:\\Users\\Gabriel\\.gemini\\antigravity\\brain\\73cf6977-9036-4953-a936-bc3a11ad43a9\\.system_generated\\steps\\16\\content.md';
const content = fs.readFileSync(sourcePath, 'utf8');

const lines = content.split('\n');
let currentTerm = null;
const terms = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.startsWith('### ')) {
    const title = line.replace('### ', '').trim();
    if (title.startsWith('[') || title.startsWith('#Geeks') || title.startsWith('¡Contáctenos!')) {
      if (currentTerm) terms.push(currentTerm);
      currentTerm = null;
      break;
    }
    if (currentTerm) {
      terms.push(currentTerm);
    }
    currentTerm = { title, lines: [], startLine: i + 1 };
  } else if (currentTerm) {
    currentTerm.lines.push(line);
  }
}
if (currentTerm) terms.push(currentTerm);

console.log('Total extracted terms:', terms.length);

const parsedTerms = terms.map((t, idx) => {
  const fullText = t.lines.join('\n').trim();
  
  // Extract anchor hash if present, e.g. [#](https://mouseinteractivo.com/terminologia-produccion-video/#a-roll)
  const anchorMatch = fullText.match(/\[#\]\(https:\/\/mouseinteractivo\.com\/terminologia-produccion-video\/#([^\)]+)\)/);
  const slug = anchorMatch ? anchorMatch[1] : '';

  // Extract related terms line
  const linesWithoutAnchor = t.lines.filter(l => !l.match(/\[#\]\(https:\/\/mouseinteractivo\.com\/terminologia-produccion-video\/#/));
  const cleanBody = linesWithoutAnchor.join('\n').trim();

  // Find "Relacionados:" or similar
  const relMatch = cleanBody.match(/Relacionados?:?\s*(.*)$/im);
  let related = [];
  let definition = cleanBody;
  if (relMatch) {
    const relStr = relMatch[1];
    definition = cleanBody.substring(0, relMatch.index).trim();
    // Parse related links [Name](url) or plain names
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let m;
    while ((m = linkRegex.exec(relStr)) !== null) {
      related.push({ name: m[1], url: m[2] });
    }
    if (related.length === 0 && relStr.trim()) {
      related = relStr.split(',').map(s => ({ name: s.trim(), url: '' }));
    }
  }

  return {
    index: idx + 1,
    title: t.title,
    slug: slug,
    definition: definition,
    related: related,
    rawText: fullText
  };
});

fs.writeFileSync(
  path.join(__dirname, 'parsed_terms.json'),
  JSON.stringify(parsedTerms, null, 2),
  'utf8'
);

console.log('Saved parsed_terms.json. Sample of first 5 terms:');
console.log(JSON.stringify(parsedTerms.slice(0, 5), null, 2));

// Check duplicates and discrepancies
const titleMap = new Map();
const slugMap = new Map();
const potentialDuplicates = [];

parsedTerms.forEach(t => {
  const normTitle = t.title.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (titleMap.has(normTitle)) {
    potentialDuplicates.push({
      termA: titleMap.get(normTitle),
      termB: t,
      matchType: 'exact normalized title'
    });
  } else {
    titleMap.set(normTitle, t);
  }

  if (t.slug) {
    if (slugMap.has(t.slug)) {
      potentialDuplicates.push({
        termA: slugMap.get(t.slug),
        termB: t,
        matchType: 'exact slug: ' + t.slug
      });
    } else {
      slugMap.set(t.slug, t);
    }
  }
});

console.log('\n--- Duplicate Analysis ---');
console.log('Potential exact/slug duplicates found:', potentialDuplicates.length);
potentialDuplicates.forEach(d => {
  console.log(`Type: ${d.matchType}`);
  console.log(`  A: #${d.termA.index} "${d.termA.title}" (slug: ${d.termA.slug})`);
  console.log(`  B: #${d.termB.index} "${d.termB.title}" (slug: ${d.termB.slug})`);
});
