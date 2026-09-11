(() => {
  const root = document.documentElement;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const wideScreen = matchMedia('(min-width: 768px)');

  // ---------- Header: more opaque once the page scrolls ----------
  const header = document.querySelector('[data-header]');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- Mobile menu: the same <nav> becomes a full-screen overlay ----------
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.getElementById('site-nav');
  if (header && toggle && nav) {
    const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';
    const setOpen = (open) => {
      header.classList.toggle('is-open', open);
      root.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? toggle.dataset.close : toggle.dataset.open);
    };
    toggle.addEventListener('click', () => {
      setOpen(!isOpen());
      if (isOpen()) nav.querySelector('a')?.focus({ preventScroll: true });
    });
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen()) { setOpen(false); toggle.focus(); }
    });
    matchMedia('(min-width: 960px)').addEventListener('change', () => setOpen(false));
  }

  // ---------- Hero ----------
  const hero = document.querySelector('[data-hero]');
  if (hero) {
    const media = hero.querySelector('[data-hero-media]');
    const dot = hero.querySelector('[data-hero-dot]');
    const mainImg = hero.querySelector('.hero__main img');

    // Start the entrance once fonts and the main photo are ready (or after 900 ms at most).
    const ready = Promise.all([
      document.fonts ? document.fonts.ready : null,
      mainImg && mainImg.decode ? mainImg.decode().catch(() => {}) : null,
    ]);
    const timeout = new Promise((resolve) => setTimeout(resolve, 900));
    Promise.race([ready, timeout]).then(() => {
      void hero.offsetWidth; // make sure the hidden starting state is applied, so the transitions run
      hero.classList.add('is-in');
      setTimeout(() => {
        hero.classList.add('is-settled');
        startPointerMotion();
      }, reducedMotion.matches ? 0 : 1400);
    });

    // Barely-there parallax and a small trailing dot, desktop mouse only.
    function startPointerMotion() {
      if (!media || reducedMotion.matches || !finePointer.matches || !wideScreen.matches) return;

      let targetX = 0, targetY = 0, x = 0, y = 0;
      let dotTargetX = 0, dotTargetY = 0, dotX = 0, dotY = 0, dotVisible = false;
      let frame = 0;

      const tick = () => {
        x += (targetX - x) * 0.06;
        y += (targetY - y) * 0.06;
        dotX += (dotTargetX - dotX) * 0.14;
        dotY += (dotTargetY - dotY) * 0.14;
        media.style.setProperty('--mx', x.toFixed(4));
        media.style.setProperty('--my', y.toFixed(4));
        if (dot) dot.style.transform = `translate3d(${dotX.toFixed(1)}px, ${dotY.toFixed(1)}px, 0)`;

        const moving = Math.abs(targetX - x) > 0.001 || Math.abs(targetY - y) > 0.001
          || Math.abs(dotTargetX - dotX) > 0.2 || Math.abs(dotTargetY - dotY) > 0.2;
        frame = moving ? requestAnimationFrame(tick) : 0;
      };
      const kick = () => { if (!frame) frame = requestAnimationFrame(tick); };
      const hideDot = () => { dotVisible = false; dot?.classList.remove('is-on'); };

      hero.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse') return;
        const h = hero.getBoundingClientRect();
        targetX = Math.max(-1, Math.min(1, ((e.clientX - h.left) / h.width - 0.5) * 2));
        targetY = Math.max(-1, Math.min(1, ((e.clientY - h.top) / h.height - 0.5) * 2));

        if (dot) {
          const m = media.getBoundingClientRect();
          const inside = e.clientX >= m.left && e.clientX <= m.right && e.clientY >= m.top && e.clientY <= m.bottom;
          if (inside) {
            dotTargetX = e.clientX - m.left - 3;
            dotTargetY = e.clientY - m.top - 3;
            if (!dotVisible) { dotX = dotTargetX; dotY = dotTargetY; dotVisible = true; dot.classList.add('is-on'); }
          } else if (dotVisible) {
            hideDot();
          }
        }
        kick();
      });
      hero.addEventListener('pointerleave', () => { targetX = 0; targetY = 0; hideDot(); kick(); });
    }
  }

  // ---------- Autoplaying video becomes click-to-play for people who prefer less motion ----------
  if (reducedMotion.matches) {
    document.querySelectorAll('video[autoplay]').forEach((v) => { v.removeAttribute('autoplay'); v.pause(); v.controls = true; });
  }

  // ---------- Portfolio lightbox ----------
  const lightbox = document.getElementById('lightbox');
  if (lightbox && typeof lightbox.showModal === 'function') {
    const img = lightbox.querySelector('img');
    document.querySelectorAll('button.shot').forEach((btn) => btn.addEventListener('click', () => {
      img.src = btn.dataset.src;
      img.alt = btn.getAttribute('aria-label') || '';
      lightbox.showModal();
    }));
    lightbox.querySelector('.lb-close').addEventListener('click', () => lightbox.close());
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.close(); });
  }
})();
