import fs from 'fs';
const text = fs.readFileSync('src/lib/products.ts', 'utf8');
const blocks = text.split(/\{\s*"slug":/);
let count = 0;
blocks.forEach((b) => {
  if (b.includes('"category": "essential-oils"')) {
    count++;
    const nameMatch = b.match(/"name":\s*"([^"]+)"/);
    const slugMatch = b.match(/^\s*"([^"]+)"/);
    const botMatch = b.match(/"botanical":\s*"([^"]+)"/);
    const stdMatch = b.match(/"standardization":\s*"([^"]+)"/);
    console.log(`${count}. ${nameMatch ? nameMatch[1] : ''} | slug: ${slugMatch ? slugMatch[1] : ''} | bot: ${botMatch ? botMatch[1] : ''} | std: ${stdMatch ? stdMatch[1] : ''}`);
  }
});
