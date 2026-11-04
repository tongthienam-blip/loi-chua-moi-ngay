const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');

let modifiedCount = 0;
let totalCount = 0;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (/\.(tsx?|jsx?|json|css|md)$/i.test(entry.name)) {
      totalCount++;
      const content = fs.readFileSync(fullPath, 'utf8');
      const normalized = content.normalize('NFC');
      if (content !== normalized) {
        fs.writeFileSync(fullPath, normalized, 'utf8');
        modifiedCount++;
        console.log(`[Normalized NFC] ${path.relative(srcDir, fullPath)}`);
      }
    }
  }
}

console.log('--- Bắt đầu chuẩn hoá Unicode NFC toàn bộ mã nguồn ---');
walk(srcDir);
console.log(`Hoàn tất: Đã kiểm tra ${totalCount} tệp, chuẩn hoá ${modifiedCount} tệp sang chuẩn Unicode NFC.`);
