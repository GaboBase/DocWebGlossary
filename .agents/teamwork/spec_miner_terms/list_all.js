const fs = require('fs');
const path = require('path');

const terms = JSON.parse(fs.readFileSync(path.join(__dirname, 'parsed_terms.json'), 'utf8'));

console.log(`Loaded ${terms.length} terms.`);

// Let's print out all 177 titles and their extracted slugs to verify coverage and consistency
terms.forEach(t => {
  console.log(`${t.index.toString().padStart(3, ' ')}. [${t.slug}] ${t.title}`);
});
