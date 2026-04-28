const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Remove or reduce grey (transparency)
code = code.replace(/text-charcoal\/(30|40|45)/g, 'text-charcoal/80');
code = code.replace(/text-charcoal\/(60|70|75|80|90)/g, 'text-charcoal');
code = code.replace(/text-white\/(50|55|60)/g, 'text-white/90');
code = code.replace(/text-white\/(75|80|85)/g, 'text-white');
code = code.replace(/text-sand\/60/g, 'text-sand/90');

// 2. Make fonts bolder
// Add font-medium to font-lora if not already there
code = code.replace(/font-lora(?! font-(medium|semibold|bold))/g, 'font-lora font-medium');
// Add font-semibold to font-cormorant if not already there
code = code.replace(/font-cormorant(?! font-(medium|semibold|bold))/g, 'font-cormorant font-semibold');

// 3. Increase clamp sizes
code = code.replace(/clamp\(\s*([0-9.]+)rem\s*,\s*([0-9.]+)vw\s*,\s*([0-9.]+)rem\s*\)/g, (match, min, vw, max) => {
    // Increase values by roughly 15-20%
    let newMin = (parseFloat(min) * 1.15).toFixed(2);
    let newVw = (parseFloat(vw) * 1.15).toFixed(2);
    let newMax = (parseFloat(max) * 1.15).toFixed(2);
    return `clamp(${newMin}rem, ${newVw}vw, ${newMax}rem)`;
});

// Also increase specific small text classes
code = code.replace(/text-sm /g, 'text-base ');
code = code.replace(/text-xs /g, 'text-sm ');
// Add a few more text utility replacements if needed
code = code.replace(/text-sm\b/g, 'text-base');

fs.writeFileSync('src/App.tsx', code);
console.log('App.tsx styles updated successfully!');
