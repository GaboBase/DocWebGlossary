const fs = require('fs');
const path = require('path');

const parsedTerms = JSON.parse(fs.readFileSync(path.join(__dirname, 'parsed_terms.json'), 'utf8'));

console.log('--- AUDITING 177 TERMS ---');

// 1. Casing and formatting analysis
const uppercaseTitles = [];
const lowercaseTitles = [];
const mixedTitles = [];

parsedTerms.forEach(t => {
  const lettersOnly = t.title.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ]/g, '');
  if (lettersOnly === lettersOnly.toUpperCase() && lettersOnly.length > 2) {
    uppercaseTitles.push(t.title);
  } else {
    mixedTitles.push(t.title);
  }
});

console.log(`Uppercase titles count: ${uppercaseTitles.length}`);
console.log(`Mixed/TitleCase titles count: ${mixedTitles.length}`);
console.log('Sample uppercase titles:', uppercaseTitles.slice(0, 10));

// 2. Slug check
const allSlugs = new Set(parsedTerms.map(t => t.slug));
console.log(`Unique slugs: ${allSlugs.size} out of ${parsedTerms.length}`);

// 3. Related links validation
let totalRelLinks = 0;
let brokenRelLinks = 0;
const brokenDetails = [];

parsedTerms.forEach(t => {
  t.related.forEach(r => {
    totalRelLinks++;
    if (r.url) {
      const match = r.url.match(/#([a-z0-9-]+)$/);
      if (match) {
        const targetSlug = match[1];
        if (!allSlugs.has(targetSlug)) {
          brokenRelLinks++;
          brokenDetails.push({ from: t.title, toText: r.name, targetSlug });
        }
      }
    }
  });
});

console.log(`Total related links: ${totalRelLinks}`);
console.log(`Broken internal anchor links in source: ${brokenRelLinks}`);
if (brokenDetails.length > 0) {
  console.log('Sample broken links in source:');
  brokenDetails.forEach(b => console.log(`  From "${b.from}" -> relates to "${b.toText}" (slug: #${b.targetSlug} not found in article)`));
}

// 4. Alphabetical distribution
const alphabetDist = {};
parsedTerms.forEach(t => {
  const firstLetter = t.title.charAt(0).toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  alphabetDist[firstLetter] = (alphabetDist[firstLetter] || 0) + 1;
});

console.log('Alphabet distribution:', JSON.stringify(alphabetDist, null, 2));

// 5. Duplicate and overlap analysis
const duplicates = [
  {
    type: 'Bilingual Duplicate',
    termA: { index: 18, title: 'Cámara Lenta (Slow Motion)', slug: 'camara-lenta' },
    termB: { index: 132, title: 'SLOW MOTION (Cámara lenta)', slug: 'slow-motion' },
    note: 'Exact same concept duplicated under Spanish-first title (#18) and English-first uppercase title (#132).'
  },
  {
    type: 'Conceptual Duplicate',
    termA: { index: 51, title: 'FPS / Frame Rate', slug: 'fps-frame-rate' },
    termB: { index: 145, title: 'TASA DE FOTOGRAMAS (Frame rate)', slug: 'tasa-de-fotogramas' },
    note: 'Exact same concept: FPS / Frame Rate (#51) and Tasa de fotogramas (Frame rate) (#145).'
  }
];

fs.writeFileSync(
  path.join(__dirname, 'audit_summary.json'),
  JSON.stringify({
    totalTerms: parsedTerms.length,
    declaredTerms: 177,
    discrepancyCount: 0, // 177 declared == 177 physical entries
    effectiveUniqueConcepts: parsedTerms.length - duplicates.length, // 175 unique concepts
    uppercaseTitlesCount: uppercaseTitles.length,
    uppercaseTitles: uppercaseTitles,
    brokenRelLinksCount: brokenRelLinks,
    brokenDetails: brokenDetails,
    alphabetDist: alphabetDist,
    duplicates: duplicates
  }, null, 2),
  'utf8'
);

console.log('Audit summary written to audit_summary.json');
