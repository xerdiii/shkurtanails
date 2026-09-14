// Builds the static site into dist/: one page per language, sitemap, robots.txt,
// and MEDIA-CHECKLIST.md listing every photo/video slot and whether it's filled.
import { cpSync, existsSync, mkdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const pub = join(root, 'public');
const dist = join(root, 'dist');

// First extension found wins, so a .webp next to a .jpg is preferred.
const EXTENSIONS = {
  photo: ['avif', 'webp', 'jpg', 'jpeg', 'png', 'svg'],
  video: ['mp4', 'webm'],
};

// Only one build at a time: `npm run build` in one terminal and the dev server's
// own rebuild both empty dist/ first, and running together left it half written.
const lockDir = join(root, '.build-lock');
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function build() {
  for (let attempt = 0; attempt < 100; attempt++) {
    try {
      mkdirSync(lockDir);
      break;
    } catch (err) {
      // Clear a lock left behind by a crashed build.
      try {
        if (Date.now() - statSync(lockDir).mtimeMs > 30000) rmSync(lockDir, { recursive: true, force: true });
      } catch (e) { /* gone already */ }
      await sleep(100);
    }
  }
  try {
    return await buildOnce();
  } finally {
    rmSync(lockDir, { recursive: true, force: true });
  }
}

async function buildOnce() {
  // Query string busts the ESM cache so watch mode picks up edits.
  const v = Date.now();
  const content = await import(`${pathToFileURL(join(root, 'src/content.mjs')).href}?v=${v}`);
  const { renderPage } = await import(`${pathToFileURL(join(root, 'src/page.mjs')).href}?v=${v}`);
  const { site, strings } = content;

  rmSync(dist, { recursive: true, force: true });
  mkdirSync(dist, { recursive: true });
  cpSync(pub, dist, { recursive: true, filter: (src) => !src.endsWith('.gitkeep') });

  const slots = new Map();
  const find = (path, kind = 'photo', meta = {}, track = true) => {
    let found = null;
    for (const ext of EXTENSIONS[kind]) {
      const rel = `media/${path}.${ext}`;
      if (existsSync(join(pub, rel))) { found = rel; break; }
    }
    if (track && !slots.has(path)) slots.set(path, { path, kind, ...meta, found });
    return found;
  };

  const pathFor = (lang) => (lang === site.defaultLang ? '' : `${lang}/`);

  for (const lang of site.languages) {
    const html = renderPage({
      ...content,
      lang,
      t: strings[lang],
      find,
      pathFor,
      base: lang === site.defaultLang ? '' : '../',
      year: new Date().getFullYear(),
    });
    const outDir = join(dist, pathFor(lang));
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), html);
  }

  const urls = site.languages.map((lang) => {
    const alts = site.languages
      .map((alt) => `    <xhtml:link rel="alternate" hreflang="${alt}" href="${site.url}/${pathFor(alt)}"/>`)
      .join('\n');
    return `  <url>\n    <loc>${site.url}/${pathFor(lang)}</loc>\n${alts}\n  </url>`;
  }).join('\n');
  writeFileSync(join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`);
  writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);

  const all = [...slots.values()];
  const filled = all.filter((s) => s.found).length;
  const rows = all.map((s) => {
    const file = s.found ? s.found : `media/${s.path}.${s.suggest || (s.kind === 'video' ? 'mp4' : 'jpg')}`;
    return `| ${s.found ? '✅' : '⬜'} | ${s.kind} | \`public/${file}\` | ${s.hint || ''} | ${s.size || ''} |`;
  }).join('\n');
  writeFileSync(join(root, 'MEDIA-CHECKLIST.md'),
`# Photo & video checklist

**${filled} of ${all.length} slots filled.** This file is regenerated on every build.

Drop a file at the path shown (any of .jpg .jpeg .png .webp .avif for photos, .mp4 .webm for video),
then rebuild. The placeholder is replaced automatically. For videos you can also add a still frame
named \`<video-name>-poster.jpg\` next to it.

| | Type | File | What to shoot | Size |
|---|---|---|---|---|
${rows}
`);

  return { filled, total: all.length };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { filled, total } = await build();
  console.log(`Built dist/  ·  media ${filled}/${total} filled (see MEDIA-CHECKLIST.md)`);
}
