// Renders one full HTML page for a language. Called by build.mjs.

const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const SIZE = { '4/5': '1080×1350', '1/1': '1080×1080', '3/4': '1080×1440', '16/9': '1920×1080', '9/16': '1080×1920' };

const ICON = {
  photo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="6.5" width="18" height="13.5" rx="3"/><circle cx="12" cy="13.2" r="3.4"/><path d="M8.5 6.5 10 4h4l1.5 2.5"/></svg>',
  video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9.3v5.4l4.6-2.7z" fill="currentColor"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 11.6a8.4 8.4 0 0 1-12.3 7.4L3.5 20.5l1.6-4.5a8.4 8.4 0 1 1 15.4-4.4z"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 9h16M4 15h16"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h3.5l1.6 4.2-2.2 1.4a11 11 0 0 0 6.5 6.5l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z"/></svg>',
};

function slot(ctx, { path, kind = 'photo', ratio = '4/5', hint = '', size, cls = '', alt = '', eager = false }) {
  const spec = size || SIZE[ratio] || '';
  const src = ctx.find(path, kind, { hint, size: spec });
  const style = `--ratio:${ratio}`;

  if (src && kind === 'photo') {
    return `<figure class="slot ${cls}" style="${style}"><img src="${ctx.base}${src}" alt="${esc(alt)}" loading="${eager ? 'eager' : 'lazy'}" decoding="async"></figure>`;
  }
  if (src && kind === 'video') {
    const poster = ctx.find(`${path}-poster`, 'photo', {}, false);
    const type = src.endsWith('.webm') ? 'video/webm' : 'video/mp4';
    return `<figure class="slot ${cls}" style="${style}"><video autoplay muted loop playsinline preload="metadata"${poster ? ` poster="${ctx.base}${poster}"` : ''} aria-label="${esc(alt)}"><source src="${ctx.base}${src}" type="${type}"></video></figure>`;
  }
  const file = `media/${path}.${kind === 'video' ? 'mp4' : 'jpg'}`;
  return `<figure class="slot slot--empty ${cls}" style="${style}" aria-hidden="true"><div class="ph">${ICON[kind]}<span class="ph-kind">${kind === 'video' ? 'Video' : 'Photo'} · ${ratio.replace('/', ':')}</span><span class="ph-hint">${esc(hint)}</span><code class="ph-file">${file}</code></div></figure>`;
}

export function renderPage(ctx) {
  const { lang, t, site, services, addons, team, reviews, portfolio, portfolioHints, salon, base, pathFor, year } = ctx;
  const L = (o) => (o && typeof o === 'object' && !Array.isArray(o) ? (o[lang] ?? o.en) : o);
  const s = (o) => slot(ctx, o);

  const pageUrl = `${site.url}/${pathFor(lang)}`;
  const home = base || './';
  const hrefFor = (l) => base + pathFor(l) || './';
  const wa = (num, text) => `https://wa.me/${num}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
  const ig = (handle) => `https://www.instagram.com/${handle}/`;
  const euro = (n) => `${n}€`;
  const addonPrice = (a) => (a.min === a.max ? `+${a.min}€` : `+${a.min}–${a.max}€`);
  const tel = `tel:${site.phone}`;
  const [qOpen, qClose] = t.quote;

  const logo = ctx.find('logo', 'photo', { hint: 'Logo: SVG or transparent PNG', size: '2000px wide+', suggest: 'svg' });
  const og = ctx.find('og-image', 'photo', { hint: 'Share preview for WhatsApp / Instagram / Google', size: '1200×630' });

  const brand = logo
    ? `<img class="brand-logo" src="${base}${logo}" alt="${esc(site.name)}">`
    : '<span class="brand-word">Shkurta</span><span class="brand-sub">Nails</span>';

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
    sameAs: [ig(site.instagram)],
    ...(og ? { image: `${site.url}/${og}` } : {}),
    address: { '@type': 'PostalAddress', streetAddress: site.address.street, addressLocality: site.address.city, addressCountry: site.address.country },
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: site.hours.days.map((d) => dayNames[d]), opens: site.hours.open, closes: site.hours.close }],
    makesOffer: services.map((sv) => ({ '@type': 'Offer', price: sv.price, priceCurrency: 'EUR', itemOffered: { '@type': 'Service', name: L(sv.name) } })),
  }).replace(/</g, '\\u003c');

  const navLinks = (extra = false) => [
    ['#services', t.nav.services], ['#work', t.nav.work], ['#team', t.nav.team], ['#salon', t.nav.salon],
    ...(extra ? [['#faq', t.nav.faq]] : []), ['#visit', t.nav.visit],
  ].map(([href, label]) => `<a href="${href}">${label}</a>`).join('');

  /* ---------- Sections ---------- */

  const header = `
<header class="site-header" data-header>
  <div class="wrap header-inner">
    <a class="brand" href="${home}" aria-label="${esc(site.name)}">${brand}</a>
    <nav class="nav" id="nav" aria-label="${esc(t.nav.menu)}">${navLinks()}</nav>
    <div class="header-actions">
      <div class="lang">${langLinks}</div>
      <a class="btn btn--rose btn--sm" href="#book">${t.nav.book}</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="nav" aria-label="${esc(t.nav.menu)}">${ICON.menu}</button>
    </div>
  </div>
</header>`;

  const hero = `
<section class="hero" id="top">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="eyebrow">${t.hero.eyebrow}</p>
      <h1 class="display">${t.hero.title}</h1>
      <p class="hero-sub">${t.hero.sub}</p>
      <div class="actions">
        <a class="btn btn--rose" href="${wa(site.whatsapp, t.booking.hello)}" target="_blank" rel="noopener">${ICON.chat}<span>${t.hero.cta}</span></a>
        <a class="btn btn--ghost" href="#work">${t.hero.cta2}</a>
      </div>
      <ul class="proof">
        <li><b>${site.founded}</b><span>${t.hero.proof.since}</span></li>
        <li><b>${site.stats.clients}</b><span>${t.hero.proof.clients}</span></li>
        <li><b>${site.stats.certificates}</b><span>${t.hero.proof.certs}</span></li>
        <li><b>${services.length + addons.length}</b><span>${t.hero.proof.services}</span></li>
      </ul>
    </div>
    <div class="hero-media">
      ${s({ path: 'hero', kind: 'video', ratio: '4/5', cls: 'arch', eager: true, hint: 'Hero loop: chrome buffing, a French line, a hand turning in daylight', size: '1080×1350+ · 10–15 s · no sound', alt: t.hero.videoAlt })}
      <span class="float-chip chip-a">${t.hero.chips[0]} <b>${addonPrice(addons[0])}</b></span>
      <span class="float-chip chip-b">${t.hero.chips[1]} <b>${addonPrice(addons[1])}</b></span>
      <span class="float-chip chip-c">${t.hero.chips[2]} <b>${euro(services[0].price)}</b></span>
    </div>
  </div>
</section>`;

  const marqueeItems = t.marquee.map((m) => `<span>${m}</span><i class="gem"></i>`).join('');
  const marquee = `<div class="marquee" aria-hidden="true"><div class="marquee-track">${marqueeItems}${marqueeItems}</div></div>`;

  const serviceRows = services.map((sv) => `
      <li class="menu-item">
        ${s({ path: `services/${sv.id}`, ratio: '3/4', cls: 'almond', hint: sv.hint, alt: L(sv.name) })}
        <div class="menu-text">
          <h3>${L(sv.name)}</h3>
          <p>${L(sv.desc)}</p>
          ${sv.duration ? `<span class="dur">${sv.duration}</span>` : ''}
        </div>
        <span class="price">${euro(sv.price)}</span>
      </li>`).join('');

  const servicesSection = `
<section class="section" id="services">
  <div class="wrap">
    <header class="section-head reveal">
      <p class="eyebrow">${t.services.eyebrow}</p>
      <h2 class="h2">${t.services.title}</h2>
      <p class="lead">${t.services.sub}</p>
    </header>
    <div class="menu-grid">
      <ul class="menu reveal">${serviceRows}
      </ul>
      <aside class="addons reveal">
        <h3>${t.services.addonsTitle}</h3>
        <ul>${addons.map((a) => `<li><span>${L(a.name)}</span><span class="price-sm">${addonPrice(a)}</span></li>`).join('')}</ul>
        <p class="addons-note">${t.services.addonsNote}</p>
        <a class="btn btn--ghost" href="#book">${t.services.cta}</a>
      </aside>
    </div>
  </div>
</section>`;

  const cats = ['all', 'gel', 'french', 'chrome', 'ombre', 'design', 'toenails'];
  const filters = cats.map((c, i) => `<button type="button" class="filter" data-filter="${c}" aria-pressed="${i === 0}">${t.work.filters[c]}</button>`).join('');
  const galleryItems = portfolio.map((p) => {
    const label = t.work.filters[p.cat];
    const real = ctx.find(p.path, 'photo', {}, false);
    const inner = s({ path: p.path, ratio: p.ratio, hint: portfolioHints[p.cat], alt: label });
    return `<div class="g-item" data-cat="${p.cat}">${real ? `<button type="button" class="g-open" data-src="${base}${real}" aria-label="${esc(`${t.work.open}: ${label}`)}">${inner}</button>` : inner}</div>`;
  }).join('\n      ');

  const workSection = `
<section class="section section--blush" id="work">
  <div class="wrap">
    <header class="section-head section-head--split reveal">
      <div>
        <p class="eyebrow">${t.work.eyebrow}</p>
        <h2 class="h2">${t.work.title}</h2>
        <p class="lead">${t.work.sub}</p>
      </div>
      <div class="filters" role="group" aria-label="${esc(t.work.filterLabel)}">${filters}</div>
    </header>
    <div class="gallery">
      ${galleryItems}
    </div>
    <p class="ig-line">${t.work.igLine} <a class="text-link" href="${ig(site.instagram)}" target="_blank" rel="noopener">@${site.instagram}</a></p>

    <div class="ba">
      <div class="ba-text reveal">
        <h2 class="h2">${t.work.baTitle}</h2>
        <p>${t.work.baSub}</p>
      </div>
      <div class="ba-frame reveal" data-ba>
        <div class="ba-layer ba-before">${s({ path: 'before-after/before-1', ratio: '4/5', hint: 'Before: bare nails', alt: t.work.before })}<span class="ba-tag">${t.work.before}</span></div>
        <div class="ba-layer ba-after">${s({ path: 'before-after/after-1', ratio: '4/5', hint: 'After: same hand, same angle', alt: t.work.after })}<span class="ba-tag">${t.work.after}</span></div>
        <input class="ba-range" type="range" min="0" max="100" value="50" aria-label="${esc(t.work.drag)}">
        <span class="ba-handle" aria-hidden="true"></span>
      </div>
    </div>
  </div>
</section>`;

  const teamCards = team.map((m) => `
      <article class="artist reveal">
        ${s({ path: `team/${m.id}`, ratio: '3/4', cls: 'arch', hint: `Portrait of ${m.first}`, alt: m.name })}
        <div class="artist-body">
          <p class="artist-role">${L(m.role)}</p>
          <h3>${m.name}</h3>
          <p class="artist-years">${t.team.years(m.years)}</p>
          <p class="artist-bio">${L(m.bio)}</p>
          <ul class="tags">${L(m.tags).map((tag) => `<li>${tag}</li>`).join('')}</ul>
          <div class="artist-actions">
            <a class="btn btn--rose btn--sm" href="${wa(m.whatsapp, t.team.waText(m.first))}" target="_blank" rel="noopener">${t.team.book(m)}</a>
            <a class="text-link" href="${ig(m.instagram)}" target="_blank" rel="noopener">@${m.instagram}</a>
          </div>
        </div>
      </article>`).join('');

  const teamSection = `
<section class="section" id="team">
  <div class="wrap">
    <header class="section-head reveal">
      <p class="eyebrow">${t.team.eyebrow}</p>
      <h2 class="h2">${t.team.title}</h2>
      <p class="lead">${t.team.sub}</p>
    </header>
    <div class="team-grid">${teamCards}
    </div>
  </div>
</section>`;

  const salonSection = `
<section class="section section--blush section--flush" id="salon">
  <div class="wrap salon-grid">
    <div class="salon-copy reveal">
      <p class="eyebrow">${t.salon.eyebrow}</p>
      <h2 class="h2">${t.salon.title}</h2>
      <div class="story">${t.salon.story.map((p) => `<p>${p}</p>`).join('')}</div>
    </div>
    <div class="salon-video reveal">
      ${s({ path: salon.video.path, kind: 'video', ratio: '16/9', hint: salon.video.hint, size: salon.video.size, alt: t.salon.alt })}
    </div>
  </div>
  <div class="strip" tabindex="0" role="region" aria-label="${esc(t.salon.stripLabel)}">
    ${salon.photos.map((p) => s({ path: p.path, ratio: '3/4', hint: p.hint, alt: t.salon.alt })).join('\n    ')}
  </div>
</section>`;

  const reviewCards = reviews.map((r) => `
      <figure class="review">
        <p class="stars" role="img" aria-label="${esc(t.reviews.stars)}">★★★★★</p>
        <blockquote>${qOpen}${L(r.text)}${qClose}</blockquote>
        <figcaption><b>${r.name}</b><span>${t.reviews.since(r.since)}</span></figcaption>
      </figure>`).join('');

  const reviewsSection = `
<section class="section section--plum" id="reviews">
  <div class="wrap">
    <header class="section-head reveal">
      <p class="eyebrow">${t.reviews.eyebrow}</p>
      <h2 class="h2">${t.reviews.title}</h2>
    </header>
    <div class="reviews-grid">${reviewCards}
    </div>
  </div>
</section>`;

  const bk = t.booking;
  const firstMsg = [bk.hello, `${bk.service}: ${L(services[0].name)}`, `${bk.artist}: ${bk.any}`, `${bk.day}: ${bk.flexible}`].join('\n');
  const bookingData = JSON.stringify({
    locale: t.locale, salonWa: site.whatsapp, openDays: site.hours.days, close: site.hours.close, names: bk.names || null,
    s: { hello: bk.hello, service: bk.service, artist: bk.artist, day: bk.day, name: bk.name, today: bk.today, tomorrow: bk.tomorrow },
  }).replace(/</g, '\\u003c');

  const bookingSection = `
<section class="section" id="book">
  <div class="wrap book">
    <header class="book-intro section-head reveal">
      <p class="eyebrow">${bk.eyebrow}</p>
      <h2 class="h2">${bk.title}</h2>
      <p class="lead">${bk.sub}</p>
    </header>

    <form class="book-form" id="book-form" novalidate>
      <fieldset>
        <legend><span class="step">1</span>${bk.step1}</legend>
        <div class="choices">${services.map((sv, i) => `<label class="choice"><input type="radio" name="service" value="${esc(L(sv.name))}" data-price="${sv.price}"${i === 0 ? ' checked' : ''}><span>${L(sv.name)} <small>${euro(sv.price)}</small></span></label>`).join('')}</div>
        <p class="sub-legend">${bk.addons}</p>
        <div class="choices">${addons.map((a) => `<label class="choice"><input type="checkbox" name="addon" value="${esc(L(a.name))}" data-min="${a.min}" data-max="${a.max}"><span>${L(a.name)} <small>${addonPrice(a)}</small></span></label>`).join('')}</div>
      </fieldset>
      <fieldset>
        <legend><span class="step">2</span>${bk.step2}</legend>
        <div class="choices">
          <label class="choice"><input type="radio" name="artist" value="any" data-label="${esc(bk.any)}" data-wa="${site.whatsapp}" checked><span>${bk.any}</span></label>${team.map((m) => `<label class="choice"><input type="radio" name="artist" value="${m.id}" data-label="${esc(m.first)}" data-wa="${m.whatsapp}"><span>${m.first}</span></label>`).join('')}
        </div>
      </fieldset>
      <fieldset>
        <legend><span class="step">3</span>${bk.step3}</legend>
        <div class="choices" id="bk-days">
          <label class="choice"><input type="radio" name="day" value="${esc(bk.flexible)}" checked><span>${bk.flexible}</span></label>
        </div>
      </fieldset>
      <label class="field">
        <span>${bk.nameLabel}</span>
        <input type="text" name="name" autocomplete="given-name" placeholder="${esc(bk.namePh)}">
      </label>
    </form>

    <aside class="bubble-card" aria-live="polite">
      <p class="bubble-label">${bk.previewLabel}</p>
      <p class="bubble" id="bk-preview">${esc(firstMsg)}</p>
      <p class="bk-total"><span>${bk.totalLabel}</span><b id="bk-total">${euro(services[0].price)}</b></p>
      <a class="btn btn--rose btn--lg" id="bk-send" href="${wa(site.whatsapp, firstMsg)}" target="_blank" rel="noopener">${ICON.chat}<span>${bk.send}</span></a>
      <p class="bk-note">${bk.note}</p>
    </aside>
  </div>
  <script type="application/json" id="bk-data">${bookingData}</script>
</section>`;

  const faqSection = `
<section class="section section--blush" id="faq">
  <div class="wrap faq-grid">
    <header class="section-head reveal">
      <p class="eyebrow">${t.faq.eyebrow}</p>
      <h2 class="h2">${t.faq.title}</h2>
      <p class="lead">${t.faq.sub} <a class="text-link" href="${wa(site.whatsapp)}" target="_blank" rel="noopener">WhatsApp</a>.</p>
    </header>
    <div class="faq reveal">
      ${t.faq.items.map((f, i) => `<details${i === 0 ? ' open' : ''}><summary>${f.q}</summary><p>${f.a}</p></details>`).join('\n      ')}
    </div>
  </div>
</section>`;

  const visitSection = `
<section class="section" id="visit">
  <div class="wrap visit-grid">
    <div class="visit-info reveal">
      <p class="eyebrow">${t.visit.eyebrow}</p>
      <h2 class="h2">${t.visit.title}</h2>
      <dl class="visit-list">
        <div><dt>${t.visit.address}</dt><dd>${site.address.street}<br>${t.visit.city}, ${t.visit.country}</dd></div>
        <div><dt>${t.visit.hours}</dt><dd>${t.visit.days}<br><span class="nums">${site.hours.open} – ${site.hours.close}</span></dd></div>
        <div><dt>${t.visit.phone}</dt><dd><a href="${tel}">${site.phoneDisplay}</a></dd></div>
        <div><dt>${t.visit.instagram}</dt><dd><a href="${ig(site.instagram)}" target="_blank" rel="noopener">@${site.instagram}</a></dd></div>
      </dl>
      <div class="actions">
        <a class="btn btn--rose" href="${site.mapsUrl}" target="_blank" rel="noopener">${t.visit.maps}</a>
        <a class="btn btn--ghost" href="${wa(site.whatsapp)}" target="_blank" rel="noopener">${ICON.chat}<span>WhatsApp</span></a>
      </div>
    </div>
    <div class="visit-media reveal">
      ${s({ path: salon.entrance.path, ratio: '4/5', cls: 'arch', hint: salon.entrance.hint, alt: t.visit.alt })}
    </div>
  </div>
</section>`;

  const footer = `
<footer class="site-footer">
  <div class="wrap">
    <p class="footer-word" aria-hidden="true">Shkurta <em>Nails</em></p>
    <div class="footer-inner">
      <nav class="footer-nav" aria-label="Footer">${navLinks(true)}</nav>
      <div class="lang">${langLinks}</div>
    </div>
    <div class="footer-meta">
      <span>© ${year} ${site.name}. ${t.footer.rights}</span>
      <span>${t.footer.madeBy}</span>
    </div>
  </div>
</footer>`;

  const mobileBar = `
<div class="mbar">
  <a class="btn btn--rose" href="#book">${ICON.chat}<span>${t.bar.book}</span></a>
  <a class="btn btn--ghost" href="${tel}">${ICON.phone}<span>${t.bar.call}</span></a>
</div>`;

  const lightbox = `
<dialog class="lightbox" id="lightbox">
  <button class="lb-close" type="button" aria-label="${esc(t.close)}">×</button>
  <img alt="">
</dialog>`;

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
<meta name="theme-color" content="#FBF6F5">
<link rel="icon" href="${base}favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..600;1,6..96,400..600&family=Figtree:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="${base}styles.css">
<script type="application/ld+json">${jsonLd}</script>
<script src="${base}app.js" defer></script>
</head>
<body>
<a class="skip" href="#main">${t.skip}</a>
${header}
<main id="main">
${hero}
${marquee}
${servicesSection}
${workSection}
${teamSection}
${salonSection}
${reviewsSection}
${bookingSection}
${faqSection}
${visitSection}
</main>
${footer}
${mobileBar}
${lightbox}
</body>
</html>
`;
}
