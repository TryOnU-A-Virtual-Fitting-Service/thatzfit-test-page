import { mkdtempSync, rmSync, writeFileSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'

const tempDir = mkdtempSync(join(tmpdir(), 'thatzfit-loader-version-'))
const manifestPath = join(tempDir, 'asset-manifest.json')

const manifest = {
  'src/Apps/main.tsx': {
    file: 'index.test-hash.v2.js',
    css: ['index.test-hash.v2.css'],
    imports: ['_index-vendor.test-hash.v2.js'],
  },
  '_index-vendor.test-hash.v2.js': {
    file: 'index-vendor.test-hash.v2.js',
  },
}

writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)

try {
  const build = spawnSync('npx', ['vite', 'build', '--mode', 'production'], {
    stdio: 'inherit',
    env: {
      ...process.env,
      THATZFIT_FE_MANIFEST_PATH: manifestPath,
    },
  })

  if (build.status !== 0) {
    throw new Error(`Vite build failed with status ${build.status ?? 'unknown'}.`)
  }

  const html = readFileSync('dist/index.html', 'utf-8')
  const loaderUrls = [
    ...html.matchAll(
      /https:\/\/cdn\.thatzfit\.me\/plugin\/ThatzfitService\.js\?v=manifest-[a-f0-9]{12}/g,
    ),
  ]

  if (loaderUrls.length !== 1) {
    throw new Error(
      `Expected exactly one manifest-based ThatzfitService.js URL, found ${loaderUrls.length}.`,
    )
  }

  if (html.includes('20260502-ee14d92')) {
    throw new Error('Found stale hard-coded loader version 20260502-ee14d92.')
  }

  console.log(`Verified loader URL injection: ${loaderUrls[0][0]}`)
} finally {
  rmSync(tempDir, { force: true, recursive: true })
}
