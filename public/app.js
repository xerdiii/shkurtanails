(() => {
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Header border once the page scrolls
  const header = $('[data-header]');
  const onScroll = () => header && header.classList.toggle('is-scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const toggle = $('.menu-toggle');
  const nav = $('#nav');
  if (toggle && nav) {
    const setOpen = (open) => {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
    $$('a', nav).forEach((a) => a.addEventListener('click', () => setOpen(false)));
    addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  }

  // Autoplaying videos become click-to-play for people who prefer less motion
  if (reduceMotion) {
    $$('video[autoplay]').forEach((v) => { v.removeAttribute('autoplay'); v.pause(); v.controls = true; });
  }

  // Portfolio filters
  const filters = $$('[data-filter]');
  filters.forEach((btn) => btn.addEventListener('click', () => {
    const cat = btn.dataset.filter;
    filters.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    $$('.g-item').forEach((item) => { item.hidden = cat !== 'all' && item.dataset.cat !== cat; });
  }));

  // Lightbox for real portfolio photos
  const lightbox = $('#lightbox');
  if (lightbox && typeof lightbox.showModal === 'function') {
    const img = $('img', lightbox);
    $$('.g-open').forEach((btn) => btn.addEventListener('click', () => {
      img.src = btn.dataset.src;
      img.alt = btn.getAttribute('aria-label') || '';
      lightbox.showModal();
    }));
    $('.lb-close', lightbox).addEventListener('click', () => lightbox.close());
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.close(); });
  }

  // Before / after slider
  $$('[data-ba]').forEach((frame) => {
    const range = $('.ba-range', frame);
    const set = () => frame.style.setProperty('--pos', `${range.value}%`);
    range.addEventListener('input', set);
    set();
  });

  // Booking: builds the WhatsApp message live
  const dataEl = $('#bk-data');
  const form = $('#book-form');
  if (!dataEl || !form) return;

  const data = JSON.parse(dataEl.textContent);
  const s = data.s;
  const daysWrap = $('#bk-days');
  const n = data.names;
  const shortFmt = n
    ? { format: (d) => `${n.weekdaysShort[d.getDay()]}, ${d.getDate()} ${n.monthsShort[d.getMonth()]}` }
    : new Intl.DateTimeFormat(data.locale, { weekday: 'short', day: 'numeric', month: 'short' });
  const longFmt = n
    ? { format: (d) => `${n.weekdaysLong[d.getDay()]}, ${d.getDate()} ${n.monthsLong[d.getMonth()]}` }
    : new Intl.DateTimeFormat(data.locale, { weekday: 'long', day: 'numeric', month: 'long' });

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const cursor = new Date(today);
  const [closeH, closeM] = data.close.split(':').map(Number);
  // Within the last hour before closing, start offering tomorrow.
  if (now.getHours() * 60 + now.getMinutes() >= closeH * 60 + closeM - 60) cursor.setDate(cursor.getDate() + 1);

  const flexible = daysWrap.lastElementChild;
  let added = 0;
  for (let guard = 0; added < 6 && guard < 21; guard++) {
    if (data.openDays.includes(cursor.getDay())) {
      const diff = Math.round((cursor - today) / 86400000);
      const prefix = diff === 0 ? s.today : diff === 1 ? s.tomorrow : '';
      const label = document.createElement('label');
      label.className = 'choice';
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'day';
      input.value = prefix ? `${prefix}, ${longFmt.format(cursor)}` : longFmt.format(cursor);
      const span = document.createElement('span');
      span.textContent = prefix || shortFmt.format(cursor);
      label.append(input, span);
      daysWrap.insertBefore(label, flexible);
      added++;
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  const preview = $('#bk-preview');
  const total = $('#bk-total');
  const send = $('#bk-send');

  const update = () => {
    const service = $('input[name="service"]:checked', form);
    const artist = $('input[name="artist"]:checked', form);
    const day = $('input[name="day"]:checked', form);
    const extras = $$('input[name="addon"]:checked', form);
    const name = form.elements.name.value.trim();

    const lines = [s.hello];
    if (service) lines.push(`${s.service}: ${[service.value, ...extras.map((x) => x.value)].join(' + ')}`);
    if (artist) lines.push(`${s.artist}: ${artist.dataset.label}`);
    if (day) lines.push(`${s.day}: ${day.value}`);
    if (name) lines.push(`${s.name}: ${name}`);
    const text = lines.join('\n');

    preview.textContent = text;
    send.href = `https://wa.me/${(artist && artist.dataset.wa) || data.salonWa}?text=${encodeURIComponent(text)}`;

    if (service) {
      let min = Number(service.dataset.price);
      let max = min;
      extras.forEach((x) => { min += Number(x.dataset.min); max += Number(x.dataset.max); });
      total.textContent = min === max ? `${min}€` : `${min}–${max}€`;
    }
  };

  form.addEventListener('input', update);
  form.addEventListener('change', update);
  form.addEventListener('submit', (e) => { e.preventDefault(); send.click(); });
  update();
})();
