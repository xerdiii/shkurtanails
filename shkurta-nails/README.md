# Shkurta Nails website

A fast static site in three languages with no dependencies:

| Language | URL |
|---|---|
| Albanian (main) | `/` |
| English | `/en/` |
| German | `/de/` |

## Preview on your computer

```bash
npm run dev
```

Open http://localhost:4321. The site rebuilds when you change anything in `src/` or `public/`.

## Add photos and videos

Every photo and video spot shows a pink striped placeholder with the exact file name it expects,
for example `media/portfolio/chrome-1.jpg`.

1. Put your file at that path inside `public/`, e.g. `public/media/portfolio/chrome-1.jpg`.
   `.jpg`, `.png`, `.webp` and `.avif` all work for photos; `.mp4` and `.webm` work for video.
2. The placeholder is replaced automatically on the next build.

`MEDIA-CHECKLIST.md` lists every slot with ✅ or ⬜ and is regenerated on every build.

Tips:
- Resize photos to about 1600 px on the long side and export as WebP or high-quality JPG (~200–400 KB).
- Keep videos short (10–15 s), muted, and under ~6 MB. Add a still frame named `hero-poster.jpg` next to `hero.mp4`.
- Add `public/media/logo.svg` (or `.png`) to replace the text logo.
- Add `public/media/og-image.jpg` (1200×630) so shared links show a preview on WhatsApp and Instagram.

## Edit text, prices and team

Everything is in [`src/content.mjs`](src/content.mjs): address, hours, prices, service durations,
team bios, reviews, FAQ, and every sentence in Albanian, English and German.

Lines marked ⚠ need confirming:
- Founding year (currently 2018)
- Saturday opening hours
- Yllka's years of experience
- Whether the testimonials are real

## Publish

```bash
npm run build
```

Upload the `dist/` folder to any static host. On Vercel or Netlify, set the build command to
`npm run build` and the output folder to `dist`.

The build also creates `sitemap.xml` and `robots.txt`. After launch, submit
`https://shkurtanails.salon/sitemap.xml` in Google Search Console.
