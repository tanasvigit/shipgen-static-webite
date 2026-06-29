import { cpSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const src = join(root, 'api');
const dest = join(root, 'dist', 'api');
const skipFiles = new Set(['router-dev.php']);

function copyDir(from, to) {
  mkdirSync(to, { recursive: true });
  for (const entry of readdirSync(from)) {
    if (skipFiles.has(entry)) continue;
    const srcPath = join(from, entry);
    const destPath = join(to, entry);
    if (statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      cpSync(srcPath, destPath);
    }
  }
}

if (!existsSync(join(root, 'dist'))) {
  console.error('dist/ not found. Run vite build first.');
  process.exit(1);
}

if (!existsSync(src)) {
  console.error('api/ folder not found.');
  process.exit(1);
}

copyDir(src, dest);
console.log('Copied api/ → dist/api/ (PHP contact API ready for cPanel)');
