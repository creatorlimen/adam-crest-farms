import { cp, mkdir, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
await mkdir(path.join(root, 'dist'), { recursive: true });
await cp(path.join(root, 'public'), path.join(root, 'dist'), { recursive: true });
const entries = await readdir(path.join(root, 'dist'));
if (!entries.includes('index.html')) throw new Error('Build did not produce index.html');
console.log('Static website built in dist/. No publication performed.');
