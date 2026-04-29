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
npm run build
npx wrangler@4.86.0 pages deploy dist --project-name thatzfit-demo
```

## Manual Deploy

```bash
npm ci
npm run build
npm run deploy
```

Production domain:

```text
https://demo.thatz.fit
```
