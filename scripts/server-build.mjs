import { readFile } from 'node:fs/promises';

// Vercel names server bundles by runtime configuration, so read the generated path.
const { buildManifest } = JSON.parse(
  await readFile(new URL('../.vercel/remix-build-result.json', import.meta.url), 'utf8')
);
const bundles = Object.values(buildManifest.serverBundles);
if (bundles.length !== 1 || bundles[0].config.runtime !== 'nodejs') {
  throw new Error('Local preview and verification expect one Node.js server bundle.');
}

export const serverBuildUrl = new URL(`../${bundles[0].file}`, import.meta.url);
