import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { execFileSync } from 'node:child_process'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

const LOADER_BASE_URL = 'https://cdn.thatz.fit/plugin/ThatzfitService.js'
const FE_MANIFEST_ENTRY = 'src/Apps/main.tsx'
const DEFAULT_FE_MANIFEST_PATH = resolve(
  __dirname,
  '../../ThatzFit-FE/dist/asset-manifest.json',
)
const DEFAULT_FE_REPO_PATH = resolve(__dirname, '../../ThatzFit-FE')

type LoaderVersionSource =
  | { kind: 'env'; version: string }
  | { kind: 'manifest'; version: string; manifestPath: string }
  | { kind: 'git'; version: string; repoPath: string }
  | { kind: 'dev'; version: string }

type Env = Record<string, string | undefined>

type ViteManifestEntry = {
  file?: string
}

const stableHash = (value: string) =>
  createHash('sha256').update(value).digest('hex').slice(0, 12)

const readManifestVersion = (
  manifestPath: string,
  manifestEntry: string,
): LoaderVersionSource => {
  let rawManifest: string
  try {
    rawManifest = readFileSync(manifestPath, 'utf-8')
  } catch (error) {
    throw new Error(
      `Unable to read THATZFIT_FE_MANIFEST_PATH at ${manifestPath}: ${
        error instanceof Error ? error.message : String(error)
      }`,
    )
  }

  let manifest: Record<string, ViteManifestEntry>
  try {
    manifest = JSON.parse(rawManifest) as Record<string, ViteManifestEntry>
  } catch (error) {
    throw new Error(
      `Invalid FE manifest JSON at ${manifestPath}: ${
        error instanceof Error ? error.message : String(error)
      }`,
    )
  }

  const entry = manifest[manifestEntry]
  if (!entry?.file) {
    throw new Error(
      `Missing FE manifest entry "${manifestEntry}" with a file field in ${manifestPath}`,
    )
  }

  return {
    kind: 'manifest',
    version: `manifest-${stableHash(rawManifest)}`,
    manifestPath,
  }
}

const readGitVersion = (repoPath: string): LoaderVersionSource => {
  try {
    const shortSha = execFileSync(
      'git',
      ['-C', repoPath, 'rev-parse', '--short=7', 'HEAD'],
      { encoding: 'utf-8' },
    ).trim()
    const dirty = execFileSync('git', ['-C', repoPath, 'status', '--short'], {
      encoding: 'utf-8',
    }).trim()

    if (!shortSha) {
      throw new Error('git rev-parse returned an empty SHA')
    }

    return {
      kind: 'git',
      version: `git-${shortSha}${dirty ? '-dirty' : ''}`,
      repoPath,
    }
  } catch (error) {
    throw new Error(
      `Unable to resolve FE git version from ${repoPath}: ${
        error instanceof Error ? error.message : String(error)
      }`,
    )
  }
}

const resolveLoaderVersion = (command: 'build' | 'serve', env: Env) => {
  const explicitVersion = env.THATZFIT_LOADER_VERSION?.trim()
  if (explicitVersion) {
    return { kind: 'env', version: explicitVersion } satisfies LoaderVersionSource
  }

  const manifestEntry = env.THATZFIT_FE_MANIFEST_ENTRY?.trim() || FE_MANIFEST_ENTRY
  const manifestPath = env.THATZFIT_FE_MANIFEST_PATH?.trim()
    ? resolve(process.cwd(), env.THATZFIT_FE_MANIFEST_PATH)
    : DEFAULT_FE_MANIFEST_PATH
  const repoPath = env.THATZFIT_FE_REPO_PATH?.trim()
    ? resolve(process.cwd(), env.THATZFIT_FE_REPO_PATH)
    : DEFAULT_FE_REPO_PATH

  if (env.THATZFIT_FE_MANIFEST_PATH) {
    return readManifestVersion(manifestPath, manifestEntry)
  }

  if (env.THATZFIT_FE_REPO_PATH) {
    return readGitVersion(repoPath)
  }

  if (existsSync(manifestPath)) {
    return readManifestVersion(manifestPath, manifestEntry)
  }

  if (existsSync(repoPath)) {
    return readGitVersion(repoPath)
  }

  if (command === 'serve') {
    return { kind: 'dev', version: 'dev' } satisfies LoaderVersionSource
  }

  throw new Error(
    [
      'Unable to resolve Thatzfit loader cache version for production build.',
      `Checked THATZFIT_LOADER_VERSION: ${env.THATZFIT_LOADER_VERSION ? 'set' : 'empty'}`,
      `Checked THATZFIT_FE_MANIFEST_PATH: ${manifestPath}`,
      `Required manifest entry: ${manifestEntry}`,
      `Checked THATZFIT_FE_REPO_PATH: ${repoPath}`,
      'Set THATZFIT_LOADER_VERSION, provide a valid FE manifest, or checkout ThatzFit-FE and set THATZFIT_FE_REPO_PATH.',
    ].join('\n'),
  )
}

const buildLoaderUrl = (baseUrl: string, version: string) => {
  try {
    const url = new URL(baseUrl)
    url.searchParams.set('v', version)
    return url.toString()
  } catch (error) {
    throw new Error(
      `Invalid THATZFIT_LOADER_BASE_URL "${baseUrl}": ${
        error instanceof Error ? error.message : String(error)
      }`,
    )
  }
}

const thatzfitLoaderPlugin = (
  command: 'build' | 'serve',
  env: Env,
): Plugin => {
  const devFeOrigin = env.THATZFIT_DEV_FE_ORIGIN?.trim().replace(/\/$/, '')

  if (command === 'serve' && devFeOrigin) {
    return {
      name: 'thatzfit-local-dev-loader',
      transformIndexHtml: {
        order: 'post',
        handler: () => [
          {
            tag: 'script',
            children: `
              (() => {
                const existingPlugin = document.getElementById('thatzfit-plugin');
                const plugin = existingPlugin ?? document.createElement('div');
                plugin.id = 'thatzfit-plugin';
                plugin.innerHTML = \`
                  <div id="thatzfit-entry"></div>
                  <div id="thatzfit-iframe-wrapper">
                    <iframe
                      id="thatzfit-iframe"
                      style="display: none"
                      title="thatzfit virtual fitting"
                      srcdoc="<!DOCTYPE html><html lang='ko'><head><meta charset='UTF-8' /><link rel='stylesheet' href='${devFeOrigin}/src/Apps/index.css' /></head><body><div id='thatzfit-root'></div></body></html>"
                    ></iframe>
                  </div>
                \`;

                if (!existingPlugin) {
                  document.body.appendChild(plugin);
                }
              })();
            `,
            injectTo: 'body',
          },
          {
            tag: 'script',
            attrs: {
              type: 'module',
              src: `${devFeOrigin}/src/Apps/main.tsx`,
            },
            injectTo: 'body',
          },
        ],
      },
      buildStart() {
        this.info(`Thatzfit local dev FE origin: ${devFeOrigin}`)
      },
    }
  }

  const versionSource = resolveLoaderVersion(command, env)
  const loaderUrl = buildLoaderUrl(
    env.THATZFIT_LOADER_BASE_URL?.trim() || LOADER_BASE_URL,
    versionSource.version,
  )

  return {
    name: 'thatzfit-loader-version',
    transformIndexHtml: {
      order: 'post',
      handler: () => [
        {
          tag: 'script',
          attrs: {
            defer: true,
            src: loaderUrl,
          },
          injectTo: 'body',
        },
      ],
    },
    buildStart() {
      const source =
        versionSource.kind === 'manifest'
          ? `${versionSource.kind}:${versionSource.manifestPath}`
          : versionSource.kind === 'git'
            ? `${versionSource.kind}:${versionSource.repoPath}`
            : versionSource.kind
      this.info(`Thatzfit loader cache version: ${versionSource.version} (${source})`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env }
  const devApiOrigin =
    env.THATZFIT_DEV_API_ORIGIN?.trim() || env.VITE_DEV_SERVER?.trim()

  return {
    plugins: [react(), tailwindcss(), thatzfitLoaderPlugin(command, env)],
    base: '/',
    server: devApiOrigin
      ? {
          proxy: {
            '/api': {
              target: devApiOrigin,
              changeOrigin: true,
            },
          },
        }
      : undefined,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
