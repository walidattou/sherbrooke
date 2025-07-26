const fs = require('fs');

// Read the grills.js file
const content = fs.readFileSync('./src/data/grills.js', 'utf8');

// Find all id: number, patterns and replace them with sequential IDs
let newContent = content;
let idCounter = 1;

// Replace all id: number, with sequential IDs
newContent = newContent.replace(/id: \d+,/g, () => {
  return `id: ${idCounter++},`;
});

// Write the fixed content back to the file
fs.writeFileSync('./src/data/grills.js', newContent);

console.log('Fixed all IDs to be sequential from 1 to', idCounter - 1); 