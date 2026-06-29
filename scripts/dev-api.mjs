import { spawn, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const apiDir = join(root, 'api');
const router = join(apiDir, 'router-dev.php');
const config = join(apiDir, 'config.php');

const phpCheck = spawnSync('php', ['-v'], { encoding: 'utf8' });
if (phpCheck.status !== 0) {
  console.error('\nShipGen contact API requires PHP 8.1+ in your PATH.');
  console.error('Install PHP (windows.php.net / XAMPP) or run frontend only: npm run dev:client');
  console.error('Production deploy via dist/ + cPanel does not need local PHP.\n');
  process.exit(1);
}

if (!existsSync(config)) {
  console.error('\nMissing api/config.php');
  console.error('Copy api/config.example.php to api/config.php and set SMTP credentials.\n');
  process.exit(1);
}

console.log('--- ShipGen Contact API (PHP) ---');
console.log('Health:  http://localhost:8080/api/health');
console.log('Preview: http://localhost:8080/api/email/preview/sales\n');

const child = spawn('php', ['-S', 'localhost:8080', '-t', apiDir, router], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

child.on('exit', (code) => process.exit(code ?? 0));
