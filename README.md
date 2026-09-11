# Shkurta Nails website

A fast static site in three languages with no dependencies:

| Language | URL |
|---|---|
| Albanian (main) | `/` |
| English | `/en/` |
| German | `/de/` |

Sections: hero · services & prices · portfolio · about · reviews · contact.

## Preview on your computer

```bash
npm run dev
```

Open http://localhost:4321. The site rebuilds when you change anything in `src/` or `public/`.

## Add photos

Every image spot shows a placeholder with the exact file name it expects:

| File | What goes there |
|---|---|
| `public/media/hero.jpg` | Hero: your single best close-up nail photo, portrait (about 1600×2000) |
| `public/media/hero-detail.jpg` | Hero: a second, different nail detail shown small next to it (about 800×1000) |
| `public/media/portfolio/1.jpg` … `8.jpg` | The 8 best nail sets |
| `public/media/about.jpg` | The salon interior, no people |
| `public/media/logo.svg` | Optional: replaces the text logo |
| `public/media/og-image.jpg` | Optional: 1200×630 preview when the link is shared |

`.jpg`, `.png`, `.webp` and `.avif` all work. Placeholders are replaced automatically on the next build.
`MEDIA-CHECKLIST.md` shows what's filled and what's missing.

Tips: export photos about 1600–2000 px on the long side (~200–400 KB). Keep a hero video to 10–15 s, muted, under ~6 MB.

## Edit text and prices

Everything is in [`src/content.mjs`](src/content.mjs): address, hours, prices, add-ons, reviews and every sentence
in Albanian, English and German.

Lines marked ⚠ need confirming:
- Founding year (currently 2018)
- Saturday opening hours
- Whether the reviews are real

## Publish

The site is deployed on Vercel from this repository. `vercel.json` runs `node build.mjs` and serves `dist/`,
so pushing to `main` redeploys automatically.
