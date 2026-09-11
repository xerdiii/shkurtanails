// Renders one full HTML page for a language. Called by build.mjs.

const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const SIZE = { '4/5': '1600×2000', '1/1': '1600×1600', '3/4': '1500×2000' };

const ICON = {
  photo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="6.5" width="18" height="13.5" rx="1"/><circle cx="12" cy="13.2" r="3.4"/><path d="M8.5 6.5 10 4h4l1.5 2.5"/></svg>',
  video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="M10 9.3v5.4l4.6-2.7z" fill="currentColor"/></svg>',
};

// A photo/video slot: the real file when public/media/<path>.* exists, otherwise a labeled placeholder.
function slot(ctx, { path, kind = 'photo', ratio = '4/5', hint = '', size, alt = '', eager = false }) {
  const spec = size || SIZE[ratio] || '';
  const src = ctx.find(path, kind, { hint, size: spec });
  const style = `--ratio:${ratio}`;

  if (src && kind === 'photo') {
    return `<figure class="slot" style="${style}"><img src="${ctx.base}${src}" alt="${esc(alt)}" loading="${eager ? 'eager' : 'lazy'}" decoding="async"${eager ? ' fetchpriority="high"' : ''}></figure>`;
  }
  if (src && kind === 'video') {
    const poster = ctx.find(`${path}-poster`, 'photo', {}, false);
    const type = src.endsWith('.webm') ? 'video/webm' : 'video/mp4';
    return `<figure class="slot" style="${style}"><video autoplay muted loop playsinline preload="metadata"${poster ? ` poster="${ctx.base}${poster}"` : ''} aria-label="${esc(alt)}"><source src="${ctx.base}${src}" type="${type}"></video></figure>`;
  }
  const file = `media/${path}.${kind === 'video' ? 'mp4' : 'jpg'}`;
  return `<figure class="slot slot--empty" style="${style}" aria-hidden="true"><div class="ph">${ICON[kind]}<span class="ph-kind">${kind === 'video' ? 'Video' : 'Photo'} · ${ratio.replace('/', ':')}</span><span class="ph-hint">${esc(hint)}</span><code class="ph-file">${file}</code></div></figure>`;
}

export function renderPage(ctx) {
  const { lang, t, site, services, addons, artists, reviews, media, base, pathFor, year } = ctx;
  const L = (o) => (o && typeof o === 'object' ? (o[lang] ?? o.en) : o);
  const s = (o) => slot(ctx, o);

  const pageUrl = `${site.url}/${pathFor(lang)}`;
  const home = base || './';
  const hrefFor = (l) => base + pathFor(l) || './';
  const wa = (num, text) => `https://wa.me/${num}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
  const bookLink = wa(site.whatsapp, t.booking.hello);
  const ig = `https://www.instagram.com/${site.instagram}/`;
  const ext = 'target="_blank" rel="noopener"';
  const addonPrice = (a) => (a.min === a.max ? `+${a.min}€` : `+${a.min}–${a.max}€`);
  const [qOpen, qClose] = t.quote;

  const logo = ctx.find('logo', 'photo', { hint: 'Logo: SVG or transparent PNG', size: '2000px wide+', suggest: 'svg' });
  const og = ctx.find('og-image', 'photo', { hint: 'Share preview for WhatsApp / Instagram / Google', size: '1200×630' });
  const brand = logo
    ? `<img src="${base}${logo}" alt="${esc(site.name)}">`
    : '<span class="logo-word">Shkurta</span><span class="logo-sub">Nails</span>';

  const langLinks = site.languages
    .map((l) => `<a href="${hrefFor(l)}" hreflang="${l}" lang="${l}"${l === lang ? ' aria-current="true"' : ''}>${l.toUpperCase()}</a>`)
    .join('');

  const alternates = [
    ...site.languages.map((l) => `<link rel="alternate" hreflang="${l}" href="${site.url}/${pathFor(l)}">`),
    `<link rel="alternate" hreflang="x-default" href="${site.url}/">`,
  ].join('\n');

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'NailSalon',
    name: site.name,
    url: pageUrl,
    telephone: site.phone,
    foundingDate: String(site.founded),
    priceRange: '€',
    hasMap: site.mapsUrl,
    sameAs: [ig],
    ...(og ? { image: `${site.url}/${og}` } : {}),
    address: { '@type': 'PostalAddress', streetAddress: site.address.street, addressLocality: site.address.city, addressCountry: site.address.country },
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: site.hours.days.map((d) => dayNames[d]), opens: site.hours.open, closes: site.hours.close }],
    makesOffer: services.map((sv) => ({ '@type': 'Offer', price: sv.price, priceCurrency: 'EUR', itemOffered: { '@type': 'Service', name: L(sv.name) } })),
  }).replace(/</g, '\\u003c');

  const heroIsVideo = Boolean(ctx.find(media.hero.path, 'video', {}, false));

  const header = `
<header class="header">
  <div class="wrap header-inner">
    <a class="logo" href="${home}" aria-label="${esc(site.name)}">${brand}</a>
    <nav class="nav" aria-label="${esc(t.nav.label)}">
      <a href="#services">${t.nav.services}</a>
      <a href="#work">${t.nav.work}</a>
      <a href="#contact">${t.nav.contact}</a>
    </nav>
    <a class="btn btn--dark btn--sm" href="${bookLink}" ${ext}>${t.nav.book}</a>
  </div>
</header>`;

  const hero = `
<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-text">
      <p class="label">${t.hero.eyebrow}</p>
      <h1 class="display">${t.hero.title}</h1>
      <p class="hero-sub">${t.hero.sub}</p>
      <div class="actions">
        <a class="btn btn--dark" href="${bookLink}" ${ext}>${t.hero.cta}</a>
        <a class="btn btn--line" href="#work">${t.hero.cta2}</a>
      </div>
    </div>
    <div class="hero-media">
      ${s({ path: media.hero.path, kind: heroIsVideo ? 'video' : 'photo', ratio: '4/5', eager: true, hint: media.hero.hint, alt: t.hero.alt })}
    </div>
  </div>
</section>`;

  const servicesSection = `
<section class="section" id="services">
  <div class="wrap split">
    <header class="section-head">
      <p class="label">${t.services.eyebrow}</p>
      <h2 class="title">${t.services.title}</h2>
      <p class="intro">${t.services.sub}</p>
    </header>
    <div>
      <ul class="prices">
        ${services.map((sv) => `<li><span class="p-name">${L(sv.name)}${sv.note ? `<small>${L(sv.note)}</small>` : ''}</span><span class="p-price">${sv.price}€</span></li>`).join('\n        ')}
      </ul>
      <p class="addons"><span class="label">${t.services.addons}</span>${addons.map((a) => `<span class="addon">${L(a.name)} <b>${addonPrice(a)}</b></span>`).join('')}</p>
    </div>
  </div>
</section>`;

  const gallery = media.portfolio.map((p) => {
    const real = ctx.find(p.path, 'photo', {}, false);
    const inner = s({ path: p.path, ratio: p.ratio, hint: p.hint, alt: t.work.alt });
    return real
      ? `<button type="button" class="shot" data-src="${base}${real}" aria-label="${esc(t.work.open)}">${inner}</button>`
      : `<div class="shot">${inner}</div>`;
  }).join('\n      ');

  const workSection = `
<section class="section" id="work">
  <div class="wrap">
    <header class="section-head section-head--row">
      <div>
        <p class="label">${t.work.eyebrow}</p>
        <h2 class="title">${t.work.title}</h2>
      </div>
      <a class="link" href="${ig}" ${ext}>${t.work.ig} · @${site.instagram}</a>
    </header>
    <div class="masonry">
      ${gallery}
    </div>
  </div>
</section>`;

  const aboutSection = `
<section class="section section--tint" id="about">
  <div class="wrap about-grid">
    <div class="about-media">
      ${s({ path: media.about.path, ratio: '4/5', hint: media.about.hint, alt: t.about.alt })}
    </div>
    <div class="about-text">
      <p class="label">${t.about.eyebrow}</p>
      <h2 class="title">${t.about.title}</h2>
      <p class="story">${t.about.story}</p>
    </div>
  </div>
</section>`;

  const reviewsSection = `
<section class="section" id="reviews">
  <div class="wrap">
    <header class="section-head">
      <p class="label">${t.reviews.eyebrow}</p>
      <h2 class="title">${t.reviews.title}</h2>
    </header>
    <div class="reviews">
      ${reviews.map((r) => `<figure class="review"><blockquote>${qOpen}${L(r.text)}${qClose}</blockquote><figcaption>${r.name}</figcaption></figure>`).join('\n      ')}
    </div>
  </div>
</section>`;

  const c = t.contact;
  const contactSection = `
<section class="section section--dark" id="contact">
  <div class="wrap contact-grid">
    <div>
      <p class="label">${c.eyebrow}</p>
      <h2 class="title">${c.title}</h2>
      <p class="intro">${c.sub}</p>
      <div class="actions">
        <a class="btn btn--light" href="${bookLink}" ${ext}>WhatsApp</a>
        <a class="btn btn--line-light" href="${ig}" ${ext}>Instagram</a>
      </div>
    </div>
    <div>
      <dl class="details">
        <div><dt>${c.phone}</dt><dd><a href="tel:${site.phone}">${site.phoneDisplay}</a></dd></div>
        <div><dt>WhatsApp</dt><dd><a href="${wa(site.whatsapp)}" ${ext}>${site.whatsappDisplay}</a></dd></div>
        <div><dt>Instagram</dt><dd><a href="${ig}" ${ext}>@${site.instagram}</a></dd></div>
        <div><dt>${c.address}</dt><dd>${site.address.street}, ${c.city}, ${c.country}<br><a class="link" href="${site.mapsUrl}" ${ext}>${c.maps}</a></dd></div>
        <div><dt>${c.hours}</dt><dd>${c.days}<br><span class="nums">${site.hours.open} – ${site.hours.close}</span></dd></div>
      </dl>
      <p class="direct">${c.direct} ${artists.map((a) => `<a href="${wa(a.whatsapp)}" ${ext}>${a.first}</a>`).join(' · ')}</p>
    </div>
  </div>
</section>`;

  const footer = `
<footer class="footer">
  <div class="wrap footer-inner">
    <a class="logo" href="${home}" aria-label="${esc(site.name)}">${brand}</a>
    <nav class="langs" aria-label="${esc(t.footer.langs)}">${langLinks}</nav>
    <p class="footer-meta">© ${year} ${site.name} · ${t.footer.madeBy}</p>
  </div>
</footer>`;

  return `<!doctype html>
<html lang="${t.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t.meta.title)}</title>
<meta name="description" content="${esc(t.meta.description)}">
<link rel="canonical" href="${pageUrl}">
${alternates}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(t.meta.title)}">
<meta property="og:description" content="${esc(t.meta.description)}">
<meta property="og:url" content="${pageUrl}">
<meta property="og:locale" content="${t.ogLocale}">
${og ? `<meta property="og:image" content="${site.url}/${og}">\n<meta name="twitter:card" content="summary_large_image">` : '<!-- Add public/media/og-image.jpg (1200×630) for link previews -->'}
<meta name="theme-color" content="#FBF8F7">
<link rel="icon" href="${base}favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..500;1,6..96,400..500&family=Jost:wght@400;500&display=swap">
<link rel="stylesheet" href="${base}styles.css">
<script type="application/ld+json">${jsonLd}</script>
<script src="${base}app.js" defer></script>
</head>
<body>
<a class="skip" href="#main">${t.skip}</a>
${header}
<main id="main">
${hero}
${servicesSection}
${workSection}
${aboutSection}
${reviewsSection}
${contactSection}
</main>
${footer}
<dialog class="lightbox" id="lightbox">
  <button class="lb-close" type="button" aria-label="${esc(t.close)}">×</button>
  <img alt="">
</dialog>
</body>
</html>
`;
}
