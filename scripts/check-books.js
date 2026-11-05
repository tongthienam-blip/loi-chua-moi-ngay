const fs = require('fs');
const content = fs.readFileSync('src/data/catholic-books.ts', 'utf8');

const idMatches = [...content.matchAll(/id:\s*'([a-z0-9_-]+)'/g)].map(m => m[1]);
console.log('Total book IDs:', idMatches.length);

let totalChaps = 0;
idMatches.forEach((id, idx) => {
  const regex = new RegExp(`id:\\s*'${id}'[\\s\\S]*?chaptersCount:\\s*(\\d+)`);
  const match = content.match(regex);
  if (match) {
    totalChaps += parseInt(match[1], 10);
  } else {
    console.log('Missing chaptersCount for:', id);
  }
});

console.log('Total chapters calculated:', totalChaps);
