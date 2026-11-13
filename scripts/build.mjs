import { lstat, realpath, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'dist');
// Clean only this repository's generated output, after rejecting links/junctions.
try {
  const info = await lstat(output);
  if (info.isSymbolicLink() || await realpath(output) !== path.join(await realpath(root), 'dist')) throw new Error('Unsafe build output path');
  await rm(output, { recursive: true });
} catch (error) { if (error.code !== 'ENOENT') throw error; }
const build = spawnSync(process.execPath, [path.join(root, 'node_modules/astro/bin/astro.mjs'), 'build'], { cwd: root, stdio: 'inherit', env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' } });
if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status || 1);
console.log(`Static ${process.env.SITE_ENV === 'production' ? 'production' : 'local preview'} built in dist/. No publication performed.`);
