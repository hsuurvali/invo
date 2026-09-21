import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('public content includes key routes and states', () => {
  const content = readFileSync(new URL('../lib/content.ts', import.meta.url), 'utf8');
  for (const route of ['lahendused/kinnisvarahaldus', 'arendajatele/webhooks', 'forgot-password', 'privaatsus']) {
    assert.ok(content.includes(`'${route}'`), `missing ${route}`);
  }
  assert.match(content, /Integratsioon seadistamata|vajab seadistust|seadistamata/i);
});

test('deployment has no Pages or static export', () => {
  const ci = readFileSync(new URL('../.github/workflows/ci.yml', import.meta.url), 'utf8');
  const pkg = readFileSync(new URL('../package.json', import.meta.url), 'utf8');
  assert.doesNotMatch(ci, /deploy-pages|upload-pages-artifact/);
  assert.doesNotMatch(pkg, /next export|"output"\s*:\s*"export"/);
});

