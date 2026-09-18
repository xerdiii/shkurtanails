// Renders one full HTML page for a language. Called by build.mjs.

const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const ICON = {
  photo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="6.5" width="18" height="13.5" rx="1"/><circle cx="12" cy="13.2" r="3.4"/><path d="M8.5 6.5 10 4h4l1.5 2.5"/></svg>',
  video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="M10 9.3v5.4l4.6-2.7z" fill="currentColor"/></svg>',
  sun: '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4 17 7M7 17l-1.6 1.6"/></svg>',
  moon: '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 13.4A8.4 8.4 0 0 1 10.6 4a8.4 8.4 0 1 0 9.4 9.4z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h3.5l1.6 4.2-2.2 1.4a11 11 0 0 0 6.5 6.5l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z"/></svg>',
};

const placeholder = (path, kind, ratio, hint) =>
  `<div class="ph">${ICON[kind]}<span class="ph-kind">${kind === 'video' ? 'Video' : 'Photo'} · ${ratio.replace('/', ':')}</span><span class="ph-hint">${esc(hint)}</span><code class="ph-file">media/${path}.${kind === 'video' ? 'mp4' : 'jpg'}</code></div>`;

// A photo slot: the real file when public/media/<path>.* exists, otherwise a labelled placeholder.
function slot(ctx, { path, ratio = '1/1', hint = '', size = '', alt = '', cls = '' }) {
  const src = ctx.find(path, 'photo', { hint, size });
  const style = `--ratio:${ratio}`;
  if (src) {
    return `<figure class="slot ${cls}" style="${style}"><img src="${ctx.base}${src}" alt="${esc(alt)}" loading="lazy" decoding="async"></figure>`;
  }
  return `<figure class="slot slot--empty ${cls}" style="${style}" aria-hidden="true">${placeholder(path, 'photo', ratio, hint)}</figure>`;
}

// One quadrant of the four-photo salon comparison.
function quadCell(ctx, { path, cell, hint, alt }) {
  const src = ctx.find(path, 'photo', { hint, size: '1600×1600' });
  const inner = src
    ? `<img src="${ctx.base}${src}" alt="${esc(alt)}" loading="lazy" decoding="async">`
    : placeholder(path, 'photo', '1/1', hint);
  return `<figure class="quad__cell quad__cell--${cell}${src ? '' : ' is-empty'}"${src ? '' : ' aria-hidden="true"'}>${inner}</figure>`;
}

export function renderPage(ctx) {
  const { lang, t, site, services, addons, team, media, base, pathFor, year } = ctx;
  const L = (o) => (o && typeof o === 'object' ? (o[lang] ?? o.en) : o);
  const s = (o) => slot(ctx, o);

  const pageUrl = `${site.url}/${pathFor(lang)}`;
  const home = base || './';
  const hrefFor = (l) => base + pathFor(l) || './';
  const wa = (num) => `https://wa.me/${num}`;
  const ig = `https://www.instagram.com/${site.instagram}/`;
  const igProfile = (handle) => `https://www.instagram.com/${handle}/`;
  const bookLink = site.instagramDm; // "Book" opens an Instagram chat
  const ext = 'target="_blank" rel="noopener"';
  const addonPrice = (a) => (a.min === a.max ? `+${a.min}€` : `+${a.min}–${a.max}€`);
  const creditLink = `<a class="credit" href="${site.credit.url}" ${ext}>${site.credit.name}</a>`;

  const logoLight = ctx.find('logo-light', 'photo', { hint: 'Logo in white, transparent background', size: '1000px wide+' });
  const logoDark = ctx.find('logo-dark', 'photo', { hint: 'Logo in black, transparent background', size: '1000px wide+' });
  const heroWide = ctx.find(media.heroWide.path, 'photo', { hint: media.heroWide.hint, size: media.heroWide.size });
  const heroTall = ctx.find(media.heroTall.path, 'photo', { hint: media.heroTall.hint, size: media.heroTall.size });
  const clipVideo = ctx.find(media.clip.path, 'video', { hint: media.clip.hint, size: media.clip.size });
  const clipPoster = ctx.find(`${media.clip.path}-poster`, 'photo', {}, false);
  const ogFile = ctx.find('og-image', 'photo', { hint: 'Share preview (falls back to the hero photo)', size: '1200×630' }) || heroWide;

  const brandMark = (logoDark || logoLight)
    ? `${logoDark ? `<img class="brand__logo brand__logo--dark" src="${base}${logoDark}" alt="${esc(site.name)}" width="240" height="116">` : ''}${logoLight ? `<img class="brand__logo brand__logo--light" src="${base}${logoLight}" alt="${logoDark ? '' : esc(site.name)}"${logoDark ? ' aria-hidden="true"' : ''} width="240" height="116">` : ''}`
    : `<span class="brand__text">${esc(site.name)}</span>`;

  const langLinks = site.languages
    .map((l) => `<a href="${hrefFor(l)}" hreflang="${l}" lang="${l}"${l === lang ? ' aria-current="true"' : ''}>${l.toUpperCase()}</a>`)
    .join('');

  const alternates = [
    ...site.languages.map((l) => `<link rel="alternate" hreflang="${l}" href="${site.url}/${pathFor(l)}">`),
    `<link rel="alternate" hreflang="x-default" href="${site.url}/">`,
  ].join('\n');

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // The logo-dark file is the branded icon Google uses in search / Knowledge Panel.
  const logoDarkFile = ctx.find('logo-dark', 'photo', {}, false);

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'NailSalon',
    name: site.name,
    url: pageUrl,
    description: t.meta.description,
    telephone: site.phone,
    foundingDate: String(site.founded),
    priceRange: '€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Credit Card',
    hasMap: site.mapsUrl,
    sameAs: [ig, ...team.map((m) => igProfile(m.instagram))],
    ...(logoDarkFile ? {
      logo: {
        '@type': 'ImageObject',
        url: `${site.url}/${logoDarkFile}`,
        width: 981,
        height: 475,
      },
    } : {}),
    ...(ogFile ? { image: `${site.url}/${ogFile}` } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressCountry: site.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 42.9108,
      longitude: 21.1896,
    },
    areaServed: {
      '@type': 'City',
      name: 'Podujevë',
    },
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: site.hours.days.map((d) => dayNames[d]),
      opens: site.hours.open,
      closes: site.hours.close,
    }],
    employee: team.map((m) => ({ '@type': 'Person', name: m.name, jobTitle: L(m.role) })),
    makesOffer: services.map((sv) => ({
      '@type': 'Offer',
      price: sv.price,
      priceCurrency: 'EUR',
      itemOffered: { '@type': 'Service', name: L(sv.name) },
    })),
  }).replace(/</g, '\\u003c');

  const faqLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }).replace(/</g, '\\u003c');

  // WebSite schema — enables Google's sitelinks search box eligibility.
  const websiteLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
    description: t.meta.description,
    ...(logoDarkFile ? { image: `${site.url}/${logoDarkFile}` } : {}),
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${site.url}/?s={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }).replace(/</g, '\\u003c');

  const n = t.nav;
  const header = `
<header class="site-header" data-header>
  <div class="site-header__inner">
    <a class="brand" href="${home}" aria-label="${esc(site.name)}">${brandMark}</a>
    <nav class="site-nav" id="site-nav" aria-label="${esc(n.label)}">
      <ul>
        <li><a href="#services">${n.services}</a></li>
        <li><a href="#work">${n.work}</a></li>
        <li><a href="#about">${n.about}</a></li>
        <li><a href="#team">${n.team}</a></li>
        <li><a href="#faq">${n.faq}</a></li>
        <li><a href="#contact">${n.contact}</a></li>
      </ul>
      <a class="pill pill--blush pill--sm" href="${bookLink}" ${ext}>${n.book}</a>
      <div class="site-nav__extra">
        <a href="${ig}" ${ext}>@${site.instagram}</a>
        <a href="${wa(site.whatsapp)}" ${ext}>WhatsApp</a>
        <a href="tel:${site.phone}">${site.phoneDisplay}</a>
        <a href="${site.mapsUrl}" ${ext}>${t.contact.maps}</a>
        <div class="site-nav__langs">${langLinks}</div>
        <p class="site-nav__credit">${t.footer.madeBy} <a class="credit credit--big" href="${site.credit.url}" ${ext}>${site.credit.name}</a></p>
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
  const heroBg = heroWide || heroTall
    ? `<picture class="hero__bg">
      ${heroTall ? `<source media="(max-width: 767px)" srcset="${base}${heroTall}">` : ''}
      <img src="${base}${heroWide || heroTall}" alt="${esc(h.alt)}" fetchpriority="high" decoding="async">
    </picture>`
    : `<div class="hero__bg hero__bg--empty">${placeholder(media.heroWide.path, 'photo', '2/1', media.heroWide.hint)}</div>`;

  const hero = `
<section class="hero" id="top" aria-labelledby="hero-title" data-hero>
  ${heroBg}
  <span class="hero__scrim" aria-hidden="true"></span>
  <div class="hero__inner">
    <p class="hero__eyebrow">${h.eyebrow}</p>
    <h1 class="hero__title" id="hero-title">${h.lines[0]}<em>${h.lines[1]}</em></h1>
    <p class="hero__sub">${h.sub}</p>
    <div class="hero__actions">
      <a class="pill pill--blush" href="${bookLink}" ${ext}>${ICON.instagram}<span>${h.cta}</span></a>
      <a class="pill pill--clear" href="#work">${h.cta2}</a>
    </div>
  </div>
  <a class="hero__scroll" href="#services"><span>${h.scroll}</span><i aria-hidden="true"></i></a>
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

  const clipSection = `
<section class="section section--sage" id="clip">
  <div class="wrap clip-grid">
    <div class="clip-media">
      ${clipVideo
        ? `<figure class="clip-video"><video autoplay muted loop playsinline preload="metadata"${clipPoster ? ` poster="${base}${clipPoster}"` : ''} aria-label="${esc(t.clip.alt)}"><source src="${base}${clipVideo}" type="video/${clipVideo.endsWith('.webm') ? 'webm' : 'mp4'}"></video></figure>`
        : `<figure class="clip-video slot--empty" aria-hidden="true">${placeholder(media.clip.path, 'video', '4/5', media.clip.hint)}</figure>`}
      ${s({ path: media.clipStill.path, ratio: '4/5', hint: media.clipStill.hint, size: media.clipStill.size, alt: t.clip.stillAlt, cls: 'clip-still' })}
    </div>
    <div class="clip-text">
      <p class="label">${t.clip.eyebrow}</p>
      <h2 class="title">${t.clip.title}</h2>
      <p class="intro">${t.clip.sub}</p>
      <a class="pill pill--ink" href="${bookLink}" ${ext}>${ICON.instagram}<span>${t.clip.cta}</span></a>
    </div>
  </div>
</section>`;

  const gallery = media.portfolio.map((p) => {
    const real = ctx.find(p.path, 'photo', {}, false);
    const inner = s({ path: p.path, ratio: '1/1', hint: p.hint, size: '1600×1600', alt: t.work.alt });
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
<section class="section section--sage" id="about">
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
      <p class="story"><a class="link" href="${site.mapsUrl}" ${ext}>${t.contact.maps}</a></p>
    </div>
  </div>
</section>`;

  const teamSection = `
<section class="section section--deep" id="team">
  <div class="wrap">
    <header class="section-head">
      <p class="label">${t.team.eyebrow}</p>
      <h2 class="title">${t.team.title}</h2>
      <p class="intro">${t.team.sub}</p>
    </header>
    <div class="team-grid">
      ${team.map((m) => `<article class="member">
        <h3 class="member__name">${m.name}</h3>
        <p class="member__role">${L(m.role)}</p>
        <p class="member__bio">${L(m.bio)}</p>
        <a class="member__link" href="${igProfile(m.instagram)}" ${ext}>${ICON.instagram}<span>${esc(t.team.dm(m.first))}</span></a>
      </article>`).join('\n      ')}
    </div>
  </div>
</section>`;

  const faqSection = `
<section class="section" id="faq">
  <div class="wrap faq-grid">
    <div>
      <header class="section-head">
        <p class="label">${t.faq.eyebrow}</p>
        <h2 class="title">${t.faq.title}</h2>
        <p class="intro">${t.faq.sub}</p>
      </header>
      <div class="faq-photos">
        ${s({ path: media.faq[0].path, ratio: '4/5', hint: media.faq[0].hint, size: '1000×1250', alt: t.work.alt, cls: 'faq-photos__a' })}
        ${s({ path: media.faq[1].path, ratio: '4/5', hint: media.faq[1].hint, size: '1000×1250', alt: t.work.alt, cls: 'faq-photos__b' })}
      </div>
    </div>
    <div class="faq">
      ${t.faq.items.map((f, i) => `<details${i === 0 ? ' open' : ''}><summary><span>${f.q}</span><span class="faq__sign" aria-hidden="true"></span></summary><p>${f.a}</p></details>`).join('\n      ')}
    </div>
  </div>
</section>`;

  const c = t.contact;
  // Contact background: one photo exported at three widths, so a 4K screen gets the
  // full-resolution file and a phone downloads the small one.
  const contactBg = [['contact-bg-1800', 1800], ['contact-bg-2800', 2800], ['contact-bg-3840', 3840]]
    .map(([name, width], i) => [ctx.find(name, 'photo', i === 0 ? { hint: 'Contact background photo', size: '3840px wide' } : {}, i === 0), width])
    .filter(([file]) => file);
  const contactBgHtml = contactBg.length
    ? `<div class="section__bg" aria-hidden="true"><img src="${base}${contactBg[0][0]}" srcset="${contactBg.map(([file, width]) => `${base}${file} ${width}w`).join(', ')}" sizes="100vw" alt="" loading="lazy" decoding="async"></div>`
    : '';
  const contactSection = `
<section class="section section--dark section--photo" id="contact">
  ${contactBgHtml}
  <div class="wrap contact-grid">
    <div>
      <p class="label">${c.eyebrow}</p>
      <h2 class="title">${c.title}</h2>
      <p class="intro">${c.sub}</p>
      <div class="actions">
        <a class="pill pill--blush" href="${bookLink}" ${ext}>${ICON.instagram}<span>Instagram</span></a>
        <a class="pill pill--clear" href="${wa(site.whatsapp)}" ${ext}>WhatsApp</a>
      </div>
      <p class="contact-credit"><span>${t.footer.madeBy}</span> <a class="credit credit--big" href="${site.credit.url}" ${ext}>${site.credit.name}</a></p>
    </div>
    <div>
      <dl class="details">
        <div><dt>${c.address}</dt><dd>${site.address.street}, ${c.city}, ${c.country}<br><a class="link" href="${site.mapsUrl}" ${ext}>${c.maps}</a></dd></div>
        <div><dt>${c.hours}</dt><dd>${c.days}<br><span class="nums">${site.hours.open} – ${site.hours.close}</span></dd></div>
        <div><dt>Instagram</dt><dd><a href="${ig}" ${ext}>@${site.instagram}</a></dd></div>
        <div><dt>WhatsApp</dt><dd><a href="${wa(site.whatsapp)}" ${ext}>${site.whatsappDisplay}</a></dd></div>
        <div><dt>${c.phone}</dt><dd><a href="tel:${site.phone}">${site.phoneDisplay}</a></dd></div>
      </dl>
      <p class="direct">${c.direct} ${team.map((m) => `<a href="${igProfile(m.instagram)}" ${ext}>${m.first}</a>`).join(' · ')}</p>
    </div>
  </div>
</section>`;

  const footer = `
<footer class="footer">
  <div class="wrap footer-inner">
    <a class="brand brand--footer" href="${home}" aria-label="${esc(site.name)}">${logoDark ? `<img class="brand__logo" src="${base}${logoDark}" alt="${esc(site.name)}" width="240" height="116">` : `<span class="brand__text">${esc(site.name)}</span>`}</a>
    <nav class="langs" aria-label="${esc(t.footer.langs)}">${langLinks}</nav>
    <a class="to-top" href="#top">${t.footer.top}</a>
  </div>
  <div class="wrap footer-made">
    <span>${t.footer.madeBy}</span>
    <a class="credit credit--big" href="${site.credit.url}" ${ext}>${site.credit.name}</a>
    <span class="footer-made__url"><a href="${site.credit.url}" ${ext}>${site.credit.domain}</a></span>
  </div>
  <div class="wrap footer-meta">
    <span>© ${year} ${site.name} · <a class="link-plain" href="${site.mapsUrl}" ${ext}>${c.city}</a></span>
    <span class="footer-credit">${t.footer.credit} ${creditLink}</span>
  </div>
</footer>`;

  const mobileBar = `
<div class="mbar" data-mbar>
  <a class="mbar__btn mbar__btn--solid" href="${bookLink}" ${ext}>${ICON.instagram}<span>${t.bar.book}</span></a>
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
${ogFile ? `<meta property="og:image" content="${site.url}/${ogFile}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(site.name)} — ${esc(site.address.city)}, ${esc(site.address.country)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(t.meta.title)}">
<meta name="twitter:description" content="${esc(t.meta.description)}">
<meta name="twitter:image" content="${site.url}/${ogFile}">` : ''}
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
${t.meta.keywords ? `<meta name="keywords" content="${esc(t.meta.keywords)}">` : ''}
<meta name="geo.region" content="${site.address.country}">
<meta name="geo.placename" content="${site.address.city}">
<meta name="geo.position" content="42.9108;21.1896">
<meta name="ICBM" content="42.9108, 21.1896">
<meta name="theme-color" content="#F2EEE6" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#141612" media="(prefers-color-scheme: dark)">
<link rel="icon" href="${base}favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${base}apple-touch-icon.png">
<link rel="manifest" href="${base}manifest.json">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..600;1,6..96,400..600&family=Jost:wght@400;500&display=swap">
<link rel="stylesheet" href="${base}styles.css">
${heroWide ? `<link rel="preload" as="image" href="${base}${heroWide}" media="(min-width: 768px)">` : ''}
${heroTall ? `<link rel="preload" as="image" href="${base}${heroTall}" media="(max-width: 767px)">` : ''}
<script type="application/ld+json">${jsonLd}</script>
<script type="application/ld+json">${faqLd}</script>
<script type="application/ld+json">${websiteLd}</script>
<script src="${base}app.js" defer></script>
</head>
<body>
<a class="skip" href="#main">${t.skip}</a>
${header}
<main id="main">
${hero}
${servicesSection}
${clipSection}
${workSection}
${aboutSection}
${teamSection}
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
