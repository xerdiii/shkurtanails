// Renders one full HTML page for a language. Called by build.mjs.

const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const SIZE = { '4/5': '1600×2000', '1/1': '1600×1600', '3/4': '1500×2000' };

const ICON = {
  photo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="6.5" width="18" height="13.5" rx="1"/><circle cx="12" cy="13.2" r="3.4"/><path d="M8.5 6.5 10 4h4l1.5 2.5"/></svg>',
  video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="M10 9.3v5.4l4.6-2.7z" fill="currentColor"/></svg>',
  sun: '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4 17 7M7 17l-1.6 1.6"/></svg>',
  moon: '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 13.4A8.4 8.4 0 0 1 10.6 4a8.4 8.4 0 1 0 9.4 9.4z"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 11.6a8.4 8.4 0 0 1-12.3 7.4L3.5 20.5l1.6-4.5a8.4 8.4 0 1 1 15.4-4.4z"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h3.5l1.6 4.2-2.2 1.4a11 11 0 0 0 6.5 6.5l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z"/></svg>',
};

const placeholder = (path, kind, ratio, hint) =>
  `<div class="ph">${ICON[kind]}<span class="ph-kind">${kind === 'video' ? 'Video' : 'Photo'} · ${ratio.replace('/', ':')}</span><span class="ph-hint">${esc(hint)}</span><code class="ph-file">media/${path}.${kind === 'video' ? 'mp4' : 'jpg'}</code></div>`;

// A photo slot: the real file when public/media/<path>.* exists, otherwise a labelled placeholder.
function slot(ctx, { path, kind = 'photo', ratio = '4/5', hint = '', size, alt = '' }) {
  const src = ctx.find(path, kind, { hint, size: size || SIZE[ratio] || '' });
  const style = `--ratio:${ratio}`;
  if (src && kind === 'photo') {
    return `<figure class="slot" style="${style}"><img src="${ctx.base}${src}" alt="${esc(alt)}" loading="lazy" decoding="async"></figure>`;
  }
  return `<figure class="slot slot--empty" style="${style}" aria-hidden="true">${placeholder(path, kind, ratio, hint)}</figure>`;
}

// Hero photograph. Nested layers keep the transforms apart:
// figure = parallax, .hero-reveal = entrance mask, .hero-img = hover scale, img = entrance scale / breathing.
function heroPhoto(ctx, { path, hint, size, alt, cls, priority }) {
  const src = ctx.find(path, 'photo', { hint, size });
  const inner = src
    ? `<img src="${ctx.base}${src}" alt="${esc(alt)}" ${priority ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'} decoding="async">`
    : placeholder(path, 'photo', '4/5', hint);
  return `<figure class="${cls}${src ? '' : ' is-empty'}"${src ? '' : ' aria-hidden="true"'}><div class="hero-reveal"><div class="hero-img">${inner}</div></div></figure>`;
}

// One quadrant of the four-photo salon comparison.
function quadCell(ctx, { path, cell, hint, alt }) {
  const src = ctx.find(path, 'photo', { hint, size: '1600×2000' });
  const inner = src
    ? `<img src="${ctx.base}${src}" alt="${esc(alt)}" loading="lazy" decoding="async">`
    : placeholder(path, 'photo', '4/5', hint);
  return `<figure class="quad__cell quad__cell--${cell}${src ? '' : ' is-empty'}"${src ? '' : ' aria-hidden="true"'}>${inner}</figure>`;
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
  const footerBrand = logo
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

  const faqLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }).replace(/</g, '\\u003c');

  const n = t.nav;
  const header = `
<header class="site-header" data-header>
  <div class="site-header__inner">
    <a class="brand" href="${home}">${logo ? `<img src="${base}${logo}" alt="${esc(site.name)}">` : esc(site.name)}</a>
    <nav class="site-nav" id="site-nav" aria-label="${esc(n.label)}">
      <ul>
        <li><a href="#services">${n.services}</a></li>
        <li><a href="#work">${n.work}</a></li>
        <li><a href="#about">${n.about}</a></li>
        <li><a href="#faq">${n.faq}</a></li>
        <li><a href="#contact">${n.contact}</a></li>
      </ul>
      <a class="nav-cta" href="${bookLink}" ${ext}>${n.book}</a>
      <div class="site-nav__extra">
        <a href="tel:${site.phone}">${site.phoneDisplay}</a>
        <a href="${wa(site.whatsapp)}" ${ext}>WhatsApp</a>
        <a href="${ig}" ${ext}>@${site.instagram}</a>
        <div class="site-nav__langs">${langLinks}</div>
      </div>
    </nav>
    <div class="header-tools">
      <button class="theme-btn" type="button" aria-label="${esc(t.theme.toDark)}" data-to-dark="${esc(t.theme.toDark)}" data-to-light="${esc(t.theme.toLight)}" data-theme-toggle>${ICON.sun}${ICON.moon}</button>
      <button class="menu-btn" type="button" aria-controls="site-nav" aria-expanded="false" aria-label="${esc(n.menu)}" data-open="${esc(n.menu)}" data-close="${esc(n.close)}" data-menu-toggle>
        <span class="menu-btn__icon" aria-hidden="true"></span>
      </button>
    </div>
  </div>
</header>`;

  const h = t.hero;
  const hero = `
<section class="hero" id="top" aria-labelledby="hero-title" data-hero>
  <div class="hero__bg" aria-hidden="true"></div>
  <div class="hero__copy">
    <p class="hero__eyebrow">${h.eyebrow}</p>
    <h1 class="hero__title" id="hero-title" style="--title-scale:${h.titleScale || 1}">
      <span class="hero__line"><span>${h.lines[0]}</span></span>
      <span class="hero__line"><span>${h.lines[1]}</span></span>
    </h1>
    <span class="hero__rule" aria-hidden="true"></span>
    <p class="hero__sub">${h.sub}</p>
    <div class="hero__actions">
      <a class="pill pill--solid" href="${bookLink}" ${ext}>${h.cta}</a>
      <a class="pill pill--ghost" href="#work">${h.cta2}</a>
    </div>
  </div>
  <div class="hero__media" data-hero-media>
    ${heroPhoto(ctx, { ...media.hero, alt: h.alt, cls: 'hero__main', priority: true })}
    ${heroPhoto(ctx, { ...media.heroDetail, alt: h.detailAlt, cls: 'hero__detail' })}
    <span class="hero__dot" aria-hidden="true" data-hero-dot></span>
  </div>
  <p class="hero__location"><span class="hero__tick" aria-hidden="true"></span>${h.location}</p>
  <p class="hero__aside" aria-hidden="true">${h.aside}</p>
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
      <div class="quad" data-quad style="--qx:50%; --qy:50%">
        ${media.salon.map((p, i) => quadCell(ctx, { ...p, alt: t.about.alt(i + 1) })).join('\n        ')}
        <span class="quad__line quad__line--v" aria-hidden="true"></span>
        <span class="quad__line quad__line--h" aria-hidden="true"></span>
        <button class="quad__handle" type="button" aria-label="${esc(t.about.dragLabel)}" data-quad-handle><span class="quad__dot"></span></button>
      </div>
      <p class="quad__hint">${t.about.dragHint}</p>
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

  const faqSection = `
<section class="section section--tint" id="faq">
  <div class="wrap faq-grid">
    <header class="section-head">
      <p class="label">${t.faq.eyebrow}</p>
      <h2 class="title">${t.faq.title}</h2>
      <p class="intro">${t.faq.sub}</p>
    </header>
    <div class="faq">
      ${t.faq.items.map((f, i) => `<details${i === 0 ? ' open' : ''}><summary><span>${f.q}</span><span class="faq__sign" aria-hidden="true"></span></summary><p>${f.a}</p></details>`).join('\n      ')}
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
    <a class="logo" href="${home}" aria-label="${esc(site.name)}">${footerBrand}</a>
    <nav class="langs" aria-label="${esc(t.footer.langs)}">${langLinks}</nav>
    <a class="to-top" href="#top">${t.footer.top}</a>
  </div>
  <div class="wrap footer-meta">
    <span>© ${year} ${site.name}</span>
    <span>${t.footer.credit} <a class="credit" href="${site.credit.url}" ${ext}>${site.credit.name}</a></span>
  </div>
</footer>`;

  const mobileBar = `
<div class="mbar" data-mbar>
  <a class="mbar__btn mbar__btn--solid" href="${bookLink}" ${ext}>${ICON.chat}<span>${t.bar.book}</span></a>
  <a class="mbar__btn" href="tel:${site.phone}">${ICON.phone}<span>${t.bar.call}</span></a>
</div>`;

  return `<!doctype html>
<html lang="${t.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.dataset.theme=t}}catch(e){}document.documentElement.classList.add('js')})()</script>
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
<meta name="theme-color" content="#F7F1EA" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#141110" media="(prefers-color-scheme: dark)">
<link rel="icon" href="${base}favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800;900&family=Jost:wght@400;500&display=swap">
<link rel="stylesheet" href="${base}styles.css">
<script type="application/ld+json">${jsonLd}</script>
<script type="application/ld+json">${faqLd}</script>
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
${faqSection}
${contactSection}
</main>
${footer}
${mobileBar}
<dialog class="lightbox" id="lightbox">
  <button class="lb-close" type="button" aria-label="${esc(t.close)}">×</button>
  <img alt="">
</dialog>
</body>
</html>
`;
}
