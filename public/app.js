(() => {
  // Autoplaying video becomes click-to-play for people who prefer less motion.
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('video[autoplay]').forEach((v) => { v.removeAttribute('autoplay'); v.pause(); v.controls = true; });
  }

  // Tap a portfolio photo to see it larger.
  const lightbox = document.getElementById('lightbox');
  if (!lightbox || typeof lightbox.showModal !== 'function') return;
  const img = lightbox.querySelector('img');

  document.querySelectorAll('button.shot').forEach((btn) => btn.addEventListener('click', () => {
    img.src = btn.dataset.src;
    img.alt = btn.getAttribute('aria-label') || '';
    lightbox.showModal();
  }));
  lightbox.querySelector('.lb-close').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.close(); });
})();
