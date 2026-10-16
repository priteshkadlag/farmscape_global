#!/usr/bin/env node
// Migrates approved media from the old WordPress site into /public and writes
// an asset manifest (old URL → new file) plus derived brand assets.
//
//   node scripts/migrate-media.mjs                 # download from the live site
//   node scripts/migrate-media.mjs --cache <dir>   # read a local mirror of wp-content/uploads
//
// JPEGs are re-encoded (EXIF/GPS stripped, orientation applied, oversized
// originals downscaled). PNG/PDF/SVG are copied byte-for-byte. Next/Image then
// serves AVIF/WebP variants at request time.

import { mkdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { SOURCE_BASE, mediaMap, notMigrated } from "./media-map.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pub = path.join(root, "public");
const cacheArg = process.argv.indexOf("--cache");
const cacheDir = cacheArg > -1 ? process.argv[cacheArg + 1] : null;
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";

async function load(from) {
  if (cacheDir) return readFile(path.join(cacheDir, from));
  const res = await fetch(SOURCE_BASE + from, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${res.status} ${from}`);
  return Buffer.from(await res.arrayBuffer());
}

const manifest = {};

for (const item of mediaMap) {
  const input = await load(item.from);
  const out = path.join(pub, item.to);
  await mkdir(path.dirname(out), { recursive: true });
  const isJpegOut = /\.jpe?g$/i.test(item.to);
  const isImage = /\.(jpe?g|png|webp)$/i.test(item.to);

  if (isJpegOut) {
    let img = sharp(input).rotate();
    if (item.maxWidth) img = img.resize({ width: item.maxWidth, withoutEnlargement: true });
    await img.jpeg({ quality: 84, mozjpeg: true }).toFile(out);
  } else {
    await writeFile(out, input);
  }

  const entry = { source: SOURCE_BASE + item.from, bytes: (await stat(out)).size };
  if (isImage) {
    const meta = await sharp(out).metadata();
    entry.width = meta.width;
    entry.height = meta.height;
  }
  manifest["/" + item.to] = entry;
  process.stdout.write(".");
}

// Derived brand assets ------------------------------------------------------
const logo = path.join(pub, "media/brand/formscape-global-logo.png");
const logoWhite = path.join(pub, "media/brand/formscape-global-logo-white.png");
{
  const { data, info } = await sharp(logo).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    data[i] = data[i + 1] = data[i + 2] = 255;
  }
  await sharp(data, { raw: info }).png().toFile(logoWhite);
  manifest["/media/brand/formscape-global-logo-white.png"] = {
    source: "derived from /media/brand/formscape-global-logo.png",
    width: info.width,
    height: info.height,
    bytes: (await stat(logoWhite)).size,
  };
}

const mark = path.join(pub, "media/brand/formscape-global-mark.png");
await sharp(mark).resize(512, 512).png().toFile(path.join(root, "src/app/icon.png"));
await sharp(mark).resize(180, 180).png().toFile(path.join(root, "src/app/apple-icon.png"));

// Default social-sharing image (1200×630)
{
  const W = 1200;
  const H = 630;
  const grid = Array.from({ length: 25 }, (_, i) => `<line x1="${i * 50}" y1="0" x2="${i * 50}" y2="${H}" />`).join("") +
    Array.from({ length: 13 }, (_, i) => `<line x1="0" y1="${i * 50}" x2="${W}" y2="${i * 50}" />`).join("");
  const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <rect width="100%" height="100%" fill="#121318"/>
    <g stroke="#ffffff" stroke-opacity="0.06" stroke-width="1">${grid}</g>
    <rect x="0" y="${H - 10}" width="${W}" height="10" fill="#422986"/>
    <text x="80" y="470" font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="700" fill="#F4F2EE">Engineering Structures.</text>
    <text x="80" y="535" font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="700" fill="#A99BF5">Shaping Possibilities.</text>
  </svg>`);
  const logoBuf = await sharp(logoWhite).resize({ width: 560 }).toBuffer();
  await mkdir(path.join(pub, "og"), { recursive: true });
  await sharp(bg)
    .composite([{ input: logoBuf, top: 110, left: 80 }])
    .jpeg({ quality: 88 })
    .toFile(path.join(pub, "og/formscape-global.jpg"));
}

// Manifests ------------------------------------------------------------------
await mkdir(path.join(root, "src/content/generated"), { recursive: true });
const dims = Object.fromEntries(
  Object.entries(manifest)
    .filter(([, v]) => v.width)
    .map(([k, v]) => [k, { width: v.width, height: v.height }]),
);
await writeFile(path.join(root, "src/content/generated/media-dimensions.json"), JSON.stringify(dims, null, 2) + "\n");

await mkdir(path.join(root, "docs"), { recursive: true });
await writeFile(path.join(root, "docs/media-manifest.json"), JSON.stringify({ migrated: manifest, notMigrated }, null, 2) + "\n");

const rows = Object.entries(manifest)
  .map(([to, v]) => `| \`${v.source.replace(SOURCE_BASE, "")}\` | \`${to}\` | ${v.width ? `${v.width}×${v.height}` : "—"} | ${(v.bytes / 1024).toFixed(0)} KB |`)
  .join("\n");
const skipped = notMigrated.map((n) => `| \`${n.from}\` | ${n.reason} |`).join("\n");
await writeFile(
  path.join(root, "docs/media-manifest.md"),
  `# Media manifest

Generated by \`node scripts/migrate-media.mjs\`. Old URLs are relative to \`${SOURCE_BASE}\`.

**Usage rights:** every file below came from the existing website. Confirm the business holds rights to each (especially service photos that look like stock) before launch.

## Migrated (${Object.keys(manifest).length})

| Old file | New file | Size (px) | Bytes |
| --- | --- | --- | --- |
${rows}

## Not migrated

| Old file | Reason |
| --- | --- |
${skipped}
`,
);

console.log(`\nMigrated ${Object.keys(manifest).length} files.`);
