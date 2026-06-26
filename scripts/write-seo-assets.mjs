import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");
const productsSource = readFileSync(join(root, "src/shared/consts/products.ts"), "utf8");
const siteOrigin = "https://demo.thatzfit.me";
const contentLastmod = "2026-06-27";

const productIds = Array.from(productsSource.matchAll(/id:\s*(\d+),/g))
  .map((match) => Number(match[1]))
  .filter((id, index, ids) => Number.isFinite(id) && ids.indexOf(id) === index)
  .sort((left, right) => left - right);

function sitemapUrl(pathname, priority) {
  return `  <url>
    <loc>${siteOrigin}${pathname}</loc>
    <lastmod>${contentLastmod}</lastmod>
    <priority>${priority}</priority>
  </url>`;
}

const urls = [
  sitemapUrl("/", "1.0"),
  ...productIds.map((id) => sitemapUrl(`/product/${id}`, "0.6")),
];

mkdirSync(dist, { recursive: true });
writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`,
);

writeFileSync(
  join(dist, "robots.txt"),
  `User-agent: *
Allow: /

Sitemap: ${siteOrigin}/sitemap.xml
`,
);
