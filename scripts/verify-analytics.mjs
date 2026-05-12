import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import ts from 'typescript';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const analytics = readFileSync(join(root, 'src/shared/lib/analytics.ts'), 'utf8');
const tracker = readFileSync(join(root, 'src/widgets/analytics/AnalyticsTracker.tsx'), 'utf8');

assert.match(analytics, /import\.meta\.env\.VITE_GA_MEASUREMENT_ID/, 'GA4 measurement id must come from VITE_GA_MEASUREMENT_ID');
assert.match(analytics, /send_page_view:\s*false/, 'demo-site must keep manual page_view tracking');
assert.match(analytics, /demo_site_visit/, 'demo-site visit event is missing');
assert.match(analytics, /site_domain:\s*'demo\.thatz\.fit'/, 'demo-site domain param is missing');
assert.match(tracker, /trackPageView/, 'manual page_view tracking is not wired');
assert.match(tracker, /trackDemoSiteVisit/, 'demo-site visit tracking is not wired');

function loadAnalyticsModule() {
  const source = analytics.replace(
    'const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();',
    "const GA_MEASUREMENT_ID = 'G-TEST';",
  );
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;
  const events = [];
  const module = { exports: {} };
  const context = vm.createContext({
    module,
    exports: module.exports,
    document: {
      createElement: () => ({}),
      head: { appendChild: () => undefined },
      querySelector: () => null,
    },
    window: {
      dataLayer: [],
      gtag: (...args) => events.push(args),
    },
  });

  vm.runInContext(output, context);

  return { exports: module.exports, events };
}

function normalizeEvent(event) {
  return JSON.parse(JSON.stringify(event));
}

const runtime = loadAnalyticsModule();
assert.equal(
  runtime.exports.trackDemoSiteVisit({
    pageTitle: 'ThatzFit Demo | AI Virtual Try-On',
    pageLocation: 'https://demo.thatz.fit/#/',
    pagePath: '#/',
    pageType: 'demo_home',
  }),
  true,
  'demo-site visit should emit when GA4 is available',
);

assert.deepEqual(normalizeEvent(runtime.events.at(-1)), [
  'event',
  'demo_site_visit',
  {
    site_name: 'demo_site',
    site_domain: 'demo.thatz.fit',
    page_type: 'demo_home',
    page_title: 'ThatzFit Demo | AI Virtual Try-On',
    page_location: 'https://demo.thatz.fit/#/',
    page_path: '#/',
  },
]);

console.log('demo-site analytics verification passed');
