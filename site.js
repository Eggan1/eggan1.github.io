/* =========================================================
   Personal site — shared interactivity (subpages + index)
   The hero viz logic lives only on index.html.
   ========================================================= */
(() => {
  const T = window.__TWEAKS__ || {};

  const applyHue    = (h) => document.documentElement.style.setProperty('--hue', h);
  const applyDensity= (d) => document.documentElement.setAttribute('data-density', d);
  const applyGrain  = (on)=> document.documentElement.setAttribute('data-grain', on ? 'on' : 'off');

  applyHue(T.accentHue ?? 142);
  applyDensity(T.density ?? 'cozy');
  applyGrain(T.showGrain !== false);

  // theme toggle
  const themeBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('ac-theme');
  if (savedTheme) document.body.dataset.theme = savedTheme;
  themeBtn?.addEventListener('click', () => {
    const next = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    document.body.dataset.theme = next;
    localStorage.setItem('ac-theme', next);
  });

  // tweaks panel (subset of the index version — no hero variant on subpages)
  const tweaksEl     = document.getElementById('tweaks');
  const tweaksClose  = document.getElementById('tweaksClose');
  const tweaksOpen   = document.getElementById('tweaksToggle');
  const twHue        = document.getElementById('tw-hue');
  const twHueOut     = document.getElementById('tw-hue-out');
  const twGrain      = document.getElementById('tw-grain');
  const twHero       = document.getElementById('tw-hero');
  const twDensity    = document.getElementById('tw-density');

  if (twHue) {
    twHue.value = T.accentHue ?? 142;
    twHueOut.textContent = twHue.value + '°';
  }
  if (twGrain) twGrain.checked = T.showGrain !== false;
  const markSeg = (group, v) => group?.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.v === v));
  markSeg(twHero, T.heroVariant || 'regression');
  markSeg(twDensity, T.density || 'cozy');

  // hide hero-only tweak on subpages — there's no SVG to manipulate
  if (!document.getElementById('heroSvg') && twHero) {
    const row = twHero.closest('.tw-row');
    if (row) row.style.display = 'none';
  }

  const pushEdits = (edits) => window.parent?.postMessage({ type: '__edit_mode_set_keys', edits }, '*');

  twHue?.addEventListener('input', () => {
    applyHue(twHue.value);
    twHueOut.textContent = twHue.value + '°';
    pushEdits({ accentHue: Number(twHue.value) });
  });
  twGrain?.addEventListener('change', () => {
    applyGrain(twGrain.checked);
    pushEdits({ showGrain: twGrain.checked });
  });
  twDensity?.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-v]');
    if (!b) return;
    markSeg(twDensity, b.dataset.v);
    applyDensity(b.dataset.v);
    pushEdits({ density: b.dataset.v });
  });

  tweaksClose?.addEventListener('click', () => {
    tweaksEl?.classList.add('hidden');
    tweaksOpen?.classList.remove('hidden');
  });
  tweaksOpen?.addEventListener('click', () => {
    tweaksEl?.classList.remove('hidden');
    tweaksOpen.classList.add('hidden');
  });

  window.addEventListener('message', (e) => {
    if (!e.data || typeof e.data !== 'object') return;
    if (e.data.type === '__activate_edit_mode')   tweaksEl?.classList.remove('hidden');
    if (e.data.type === '__deactivate_edit_mode') tweaksEl?.classList.add('hidden');
  });
  window.parent?.postMessage({ type: '__edit_mode_available' }, '*');

  // gentle smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 60, behavior: 'smooth' });
    });
  });
})();
