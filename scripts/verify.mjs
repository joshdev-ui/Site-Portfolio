import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { createRequestHandler } from '@remix-run/node';
import { serverBuildUrl } from './server-build.mjs';

const build = await import(serverBuildUrl.href);

const handle = createRequestHandler(build, 'production');
process.env.SESSION_SECRET = 'verification-only-cookie-secret';
const context = {};
const routes = {
  '/': 'Nami',
  '/projects/nami': 'Nami',
  '/uses': 'Holy Name University',
  '/contact': 'Open email draft',
};
for (const [path, expected] of Object.entries(routes)) {
  const response = await handle(new Request(`https://portfolio.test${path}`), context);
  const html = await response.text();
  assert.equal(response.status, 200, `${path} response`);
  assert.ok(html.includes(expected), `${path} content`);
  assert.ok(html.includes('Joshua Sarno'), `${path} identity`);
  assert.ok(!html.includes('gamestack.hamishw.com'), `${path} original links removed`);
  assert.ok(!html.includes('/projects/aqua-market'), `${path} removed Aqua-Market link`);
  assert.ok(!html.includes('/projects/portfolio'), `${path} removed portfolio project link`);
  if (path === '/') {
    assert.equal((html.match(/id="project-\d+"/g) || []).length, 1, 'one featured project');
    assert.ok(html.includes('id="project-1"'), 'Nami is project 01');
  }
  if (path === '/projects/nami') {
    assert.ok(html.includes('Nami onboarding:'), 'onboarding screenshot description');
    assert.ok(html.includes('Nami Today dashboard'), 'Today screenshot description');
    assert.ok(html.includes('Nami import schedule screen'), 'schedule screenshot description');
    assert.ok(html.includes('Nami subject library'), 'subjects screenshot description');
    assert.equal((html.match(/aria-roledescription="carousel"/g) || []).length, 1, 'single screenshot gallery');
    assert.equal((html.match(/aria-roledescription="slide"/g) || []).length, 4, 'four screenshot slides');
    assert.equal((html.match(/aria-label="Show screenshot \d of 4:/g) || []).length, 4, 'four screenshot selectors');
    const visibleText = html.replace(/<!--.*?-->|<[^>]*>/g, '');
    assert.ok(!/\b\d+ of 4\b/.test(visibleText), 'dots replace visible screenshot count');
    assert.ok(html.includes('aria-label="Previous screenshot"'), 'previous screenshot control');
    assert.ok(html.includes('aria-label="Next screenshot"'), 'next screenshot control');
    assert.ok(!html.includes('preview coming soon'), 'Nami previews are available');
  }
  for (const [, asset] of html.matchAll(/(?:src|href)="(\/(?:assets|images)\/[^"?#]+)"/g)) {
    await access(new URL(`../build/client${asset}`, import.meta.url));
  }
  console.log(`PASS ${path} — status, content, referenced assets`);
}
const theme = await handle(new Request('https://portfolio.test/api/set-theme', { method: 'POST', body: new URLSearchParams({ theme: 'light' }) }), context);
assert.equal(theme.status, 200);
const cookie = theme.headers.get('set-cookie');
assert.ok(cookie);
const response = await handle(new Request('https://portfolio.test/', { headers: { Cookie: cookie.split(';')[0] } }), context);
assert.ok((await response.text()).includes('data-theme="light"'));
console.log('PASS light-theme cookie persistence');
for (const path of ['/missing-page', '/projects/aqua-market', '/projects/portfolio']) {
  const missing = await handle(new Request(`https://portfolio.test${path}`), context);
  assert.equal(missing.status, 404, `${path} response`);
}
console.log('PASS missing and removed project responses');
for (const asset of ['nami-onboarding', 'nami-import-schedule', 'nami-subject-library', 'nami-today']) {
  const jpg = await readFile(new URL(`../public/images/${asset}.jpg`, import.meta.url));
  assert.equal(jpg.subarray(0,3).toString('hex'), 'ffd8ff');
  const built = await readFile(new URL(`../build/client/images/${asset}.jpg`, import.meta.url));
  assert.deepEqual(built, jpg, `${asset} included in production build`);
}
await access(new URL('../public/Joshua-Sarno-Resume.docx', import.meta.url));
console.log('PASS project screen textures and résumé');
