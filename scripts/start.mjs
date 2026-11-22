import { fileURLToPath } from 'node:url';
import { serverBuildUrl } from './server-build.mjs';

process.argv[2] = fileURLToPath(serverBuildUrl);
await import('@remix-run/serve/dist/cli.js');
