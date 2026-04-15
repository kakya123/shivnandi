const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      
      if (content.includes('getDbData()') && !content.includes('export async function getDbData')) {
        content = content.replace(/getDbData\(\)/g, 'await getDbData()');
        changed = true;
      }
      
      if (content.includes('export default function') && content.includes('await getDbData()')) {
        content = content.replace(/export default function/g, 'export default async function');
        changed = true;
      }
      
      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log('Refactored', fullPath);
      }
    }
  }
}

replaceInDir('./src/app');
