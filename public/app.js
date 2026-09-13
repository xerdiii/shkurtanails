(() => {
  const root = document.documentElement;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

  // ---------- Light / dark mode ----------
  const themeBtn = document.querySelector('[data-theme-toggle]');
  if (themeBtn) {
    const systemDark = matchMedia('(prefers-color-scheme: dark)');
    const current = () => root.dataset.theme || (systemDark.matches ? 'dark' : 'light');
    const label = () => themeBtn.setAttribute('aria-label', current() === 'dark' ? themeBtn.dataset.toLight : themeBtn.dataset.toDark);
    themeBtn.addEventListener('click', () => {
      root.dataset.theme = current() === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('theme', root.dataset.theme); } catch (e) { /* private mode */ }
      label();
    });
    systemDark.addEventListener('change', label);
    label();
  }

  // ---------- Header: solid once the page scrolls past the hero image ----------
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
      if (isOpen()) nav.querySelector('a').focus({ preventScroll: true });
    });
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen()) { setOpen(false); toggle.focus(); return; }
      if (e.key !== 'Tab' || !isOpen()) return;
      // Keep keyboard focus inside the open menu.
      const stops = [toggle, ...nav.querySelectorAll('a, button')];
      const first = stops[0];
      const last = stops[stops.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    matchMedia('(min-width: 960px)').addEventListener('change', () => setOpen(false));
  }

  // ---------- Sticky booking bar on phones ----------
  const mbar = document.querySelector('[data-mbar]');
  if (mbar) {
    const onScroll = () => mbar.classList.toggle('is-on', window.scrollY > innerHeight * 0.55);
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // The hero entrance is pure CSS, so the text can never get stuck invisible.

  // ---------- Salon: four photos, one draggable dot ----------
  document.querySelectorAll('[data-quad]').forEach((quad) => {
    const handle = quad.querySelector('[data-quad-handle]');
    let x = 50;
    let y = 50;
    const clamp = (v) => Math.max(0, Math.min(100, v));
    const apply = () => {
      quad.style.setProperty('--qx', `${x.toFixed(2)}%`);
      quad.style.setProperty('--qy', `${y.toFixed(2)}%`);
    };
    const moveTo = (clientX, clientY) => {
      const r = quad.getBoundingClientRect();
      if (!r.width || !r.height) return; // never divide by zero: that threw the dot to a corner
      x = clamp(((clientX - r.left) / r.width) * 100);
      y = clamp(((clientY - r.top) / r.height) * 100);
      apply();
    };

    // Fingers: plain touch events. Safari and some Android browsers stop sending
    // pointermove after setPointerCapture, which left the dot stuck mid-drag.
    let touchId = null;
    quad.addEventListener('touchstart', (e) => {
      const touch = e.changedTouches[0];
      touchId = touch.identifier;
      moveTo(touch.clientX, touch.clientY);
      e.preventDefault(); // no scrolling, zooming or tap highlight while dragging
    }, { passive: false });
    quad.addEventListener('touchmove', (e) => {
      if (touchId === null) return;
      const touch = [...e.touches].find((t) => t.identifier === touchId);
      if (!touch) return;
      moveTo(touch.clientX, touch.clientY);
      e.preventDefault();
    }, { passive: false });
    const endTouch = (e) => {
      if (touchId === null) return;
      if ([...e.changedTouches].some((t) => t.identifier === touchId)) touchId = null;
    };
    quad.addEventListener('touchend', endTouch);
    quad.addEventListener('touchcancel', endTouch);

    // Mouse and pen keep the pointer-event path.
    let dragging = false;
    quad.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'touch') return; // handled by the touch listeners above
      dragging = true;
      try { quad.setPointerCapture(e.pointerId); } catch (err) {}
      moveTo(e.clientX, e.clientY);
      handle.focus({ preventScroll: true });
      e.preventDefault();
    });
    quad.addEventListener('pointermove', (e) => {
      if (dragging && e.pointerType !== 'touch') moveTo(e.clientX, e.clientY);
    });
    const stop = (e) => {
      dragging = false;
      try { quad.releasePointerCapture(e.pointerId); } catch (err) { /* already released */ }
    };
    quad.addEventListener('pointerup', stop);
    quad.addEventListener('pointercancel', stop);

    handle.addEventListener('keydown', (e) => {
      const step = e.shiftKey ? 10 : 3;
      const moves = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
      const move = moves[e.key];
      if (!move) return;
      e.preventDefault();
      x = clamp(x + move[0]);
      y = clamp(y + move[1]);
      apply();
    });
  });

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
