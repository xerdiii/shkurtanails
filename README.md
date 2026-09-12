# Shkurta Nails website

A fast static site in three languages with no dependencies:

| Language | URL |
|---|---|
| Albanian (main) | `/` |
| English | `/en/` |
| German | `/de/` |

Sections: hero · services & prices · portfolio · salon · reviews · FAQ · contact.
Light and dark mode, a mobile menu, and a sticky booking bar on phones.

## Preview on your computer

```bash
npm run dev
```

Open http://localhost:4321. The site rebuilds when you change anything in `src/` or `public/`.

## Add photos

Every image spot shows a placeholder with the exact file name it expects. Just save your photos
with these names in `public/media/`:

| File | What goes there |
|---|---|
| `public/media/hero.jpg` | Hero: your best close-up nail photo, portrait (about 1600×2000) |
| `public/media/hero-detail.jpg` | Hero: a second, smaller nail detail (about 800×1000) |
| `public/media/1.jpg` … `6.jpg` | Portfolio: your six best nail photos |
| `public/media/salon-1.jpg` … `salon-4.jpg` | Salon: four photos behind the draggable dot (top left, top right, bottom left, bottom right) |
| `public/media/logo.svg` | Optional: replaces the text logo |
| `public/media/og-image.jpg` | Optional: 1200×630 preview when the link is shared |

`.jpg`, `.png`, `.webp` and `.avif` all work. Placeholders are replaced automatically on the next build.
`MEDIA-CHECKLIST.md` shows what's filled and what's missing.

Tips: export photos about 1600–2000 px on the long side (~200–400 KB each).

## Edit text and prices

Everything is in [`src/content.mjs`](src/content.mjs): address, hours, prices, add-ons, reviews, FAQ
and every sentence in Albanian, English and German.

Lines marked ⚠ need confirming:
- Founding year (currently 2018)
- Saturday opening hours
- Whether the reviews are real

## Publish

The site is deployed on Vercel from this repository. `vercel.json` runs `node build.mjs` and serves `dist/`,
so pushing to `main` redeploys automatically.
