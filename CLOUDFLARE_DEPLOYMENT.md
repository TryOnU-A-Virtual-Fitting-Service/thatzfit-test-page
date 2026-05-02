# Cloudflare Pages Deployment

This repo deploys the demo site to Cloudflare Pages project `thatzfit-demo`.

## Required GitHub Secret

Add this repository secret:

```text
CLOUDFLARE_API_TOKEN
```

Create the token in Cloudflare with permission to deploy Pages for account `5b235593f620ca7c38fa2e0657c0467e`.

After creating the token, save it to GitHub:

```bash
gh secret set CLOUDFLARE_API_TOKEN \
  -R TryOnU-A-Virtual-Fitting-Service/thatzfit-test-page
```

## Automatic Deploy

Push to `main` triggers:

```bash
npm ci
npm run verify:loader-version
THATZFIT_FE_REPO_PATH=_external/ThatzFit-FE npm run build
npx wrangler@4.86.0 pages deploy dist --project-name thatzfit-demo
```

The workflow checks out `TryOnU-A-Virtual-Fitting-Service/ThatzFit-FE` to `_external/ThatzFit-FE` before the production build.

The build injects the plugin loader script into `dist/index.html` as:

```text
https://cdn.thatz.fit/plugin/ThatzfitService.js?v=<resolved-version>
```

Resolution order:

1. `THATZFIT_LOADER_VERSION`
2. `THATZFIT_FE_MANIFEST_PATH`, requiring `src/Apps/main.tsx`
3. `THATZFIT_FE_REPO_PATH`, using the FE git short SHA

If none of these values is available during a production build, Vite fails with the checked env names and paths.

## Manual Deploy

```bash
npm ci
npm run verify:loader-version
THATZFIT_FE_REPO_PATH=../../ThatzFit-FE npm run deploy
```

Production domain:

```text
https://demo.thatz.fit
```
