// Test the price parsing logic
const parsePrice = (priceString) => {
  // Check if price contains multiple options (like "small, regular, large" or "1 person, 2 persons")
  if (priceString.includes('(') && priceString.includes(')')) {
    const parts = priceString.split(',');
    if (parts.length > 1) {
      return {
        hasMultipleOptions: true,
        options: parts.map(part => {
          const match = part.match(/\$([\d.]+)\s*\(([^)]+)\)/);
          if (match) {
            return { price: `$${match[1]}`, size: match[2].trim() };
          }
          return null;
        }).filter(Boolean)
      };
    }
  }
  
  return {
    hasMultipleOptions: false,
    price: priceString
  };
};

// Test the Mediterranean sea bass price
const testPrice = "$35.99 (1 person), $54.99 (2 persons)";
const result = parsePrice(testPrice);

console.log('Test price:', testPrice);
console.log('Parsed result:', JSON.stringify(result, null, 2)); 