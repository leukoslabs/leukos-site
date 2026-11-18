/* =====================================================================
   Comportamenti e animazioni del sito (un file per tutte le pagine).
   Le pagine sono HTML statico: qui si aggiungono solo i miglioramenti.
   Con "riduci movimento" restano dissolvenze e colori, niente movimenti.
   ===================================================================== */
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE = matchMedia('(hover:hover) and (pointer:fine)').matches;
const EASE = 'cubic-bezier(.22,1,.36,1)';
const WA = '393299826583', MAIL = 'labsleukos@gmail.com';

// funzioni da rieseguire quando cambia la finestra o arrivano i font (posizione delle "pillole")
const layoutHooks = [];
const relayout = () => layoutHooks.forEach(f => f());
addEventListener('resize', relayout);
if (document.fonts) document.fonts.ready.then(relayout);

/* ---------- nav: menu mobile, nascondi scorrendo in giù ---------- */
const nav = document.getElementById('nav'), menuBtn = document.getElementById('menuBtn');
const setMenu = open => {
  nav.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', open);
  menuBtn.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
};
menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); menuBtn.focus(); } });
document.addEventListener('click', e => { if (nav.classList.contains('open') && !nav.contains(e.target)) setMenu(false); });

/* pillola che segue il mouse sui link della nav e torna sulla pagina attiva */
const navUl = nav.querySelector('ul');
const navPill = document.createElement('li'); navPill.className = 'nav-pill'; navPill.setAttribute('aria-hidden', 'true');
navUl.append(navPill);
let pillOn = false;
function pillTo(a) {
  if (!a || !a.offsetWidth) { navPill.style.opacity = 0; pillOn = false; return; }
  if (!pillOn) navPill.classList.add('snap');
  navPill.style.width = a.offsetWidth + 'px';
  navPill.style.transform = `translate3d(${(a.getBoundingClientRect().left - navUl.getBoundingClientRect().left).toFixed(1)}px,0,0)`;
  navPill.style.opacity = 1;
  if (!pillOn) { void navPill.offsetWidth; navPill.classList.remove('snap'); pillOn = true; }
}
const pillHome = () => pillTo(navUl.querySelector('a[aria-current]'));
navUl.addEventListener('pointerover', e => { const a = e.target.closest('a'); if (a) pillTo(a); });
navUl.addEventListener('pointerleave', pillHome);
layoutHooks.push(pillHome);

/* ---------- ingressi allo scroll ---------- */
// ritardo a cascata per i figli delle griglie
document.querySelectorAll('.grid,.svc,.gallery,.facts,.steps,.team,.stats').forEach(g => {
  [...g.children].forEach((c, i) => c.style.setProperty('--d', (i % 4) * 0.06 + 's'));
});
const io = 'IntersectionObserver' in window
  ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: .05 })
  : null;
document.querySelectorAll('.rv').forEach(el => io ? io.observe(el) : el.classList.add('in'));

/* immagini: dissolvenza al caricamento (non per l'immagine principale, che deve apparire subito) */
document.querySelectorAll('main img').forEach(img => {
  if (img.closest('.marquee, .c-direct') || img.classList.contains('chip-star') || img.classList.contains('next-thumb') || img.getAttribute('fetchpriority') === 'high') return;
  if (img.complete && img.naturalWidth) return;
  img.classList.add('fade');
  const ok = () => img.classList.add('ok');
  img.addEventListener('load', ok, { once: true }); img.addEventListener('error', ok, { once: true });
});

/* intro della hero / della testata */
const top = document.querySelector('.hero, .p-hero, .page-top');
if (top) requestAnimationFrame(() => requestAnimationFrame(() => top.classList.add('ready')));

/* ---------- parole in span: .w per il manifesto, .wd (con maschera) per i titoli ---------- */
function splitWords(el, mask) {
  let i = 0;
  const walk = node => [...node.childNodes].forEach(n => {
    if (n.nodeType === 3) {
      const frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach(p => {
        if (!p) return;
        if (/^\s+$/.test(p)) { frag.append(' '); return; }
        const s = document.createElement('span');
        if (mask) { s.className = 'wd'; const t = document.createElement('span'); t.textContent = p; t.style.setProperty('--i', i++); s.append(t); }
        else { s.className = 'w'; s.textContent = p; }
        frag.append(s);
      });
      n.replaceWith(frag);
    } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
  });
  walk(el);
}
if (!RM) document.querySelectorAll('.page-top h1, .about .big').forEach(el => splitWords(el, true));
const manifesto = document.querySelector('.manifesto .title');
if (manifesto) {
  splitWords(manifesto, false);
  manifesto._words = [...manifesto.querySelectorAll('.w')];
  if (RM) manifesto._words.forEach(w => w.classList.add('on'));
}

/* ---------- pulsanti: testo che rotola, magnete solo sulle CTA grandi ---------- */
document.querySelectorAll('.btn').forEach(b => {
  const t = b.textContent.trim();
  if (!t || b.children.length) return;
  const wrap = document.createElement('span'); wrap.className = 'btn-t';
  const a = document.createElement('span'); a.textContent = t;
  const c = document.createElement('span'); c.textContent = t; c.setAttribute('aria-hidden', 'true');
  wrap.append(a, c); b.textContent = ''; b.append(wrap);
  if (!FINE || RM || b.closest('.nav, form')) return;
  b.addEventListener('pointermove', e => {
    const r = b.getBoundingClientRect();
    b.style.setProperty('--mx', ((e.clientX - r.left - r.width / 2) * .12).toFixed(1) + 'px');
    b.style.setProperty('--my', ((e.clientY - r.top - r.height / 2) * .2).toFixed(1) + 'px');
  });
  b.addEventListener('pointerleave', () => { b.style.removeProperty('--mx'); b.style.removeProperty('--my'); });
});

/* ---------- card: luce morbida che segue il puntatore ---------- */
if (FINE && !RM) {
  let raf = 0, ev = null;
  document.addEventListener('pointermove', e => {
    ev = e;
    if (!raf) raf = requestAnimationFrame(() => {
      raf = 0;
      const c = ev.target.closest ? ev.target.closest('.card') : null; if (!c) return;
      const r = c.getBoundingClientRect();
      c.querySelector('.glow').style.transform = `translate3d(${(ev.clientX - r.left).toFixed(0)}px,${(ev.clientY - r.top).toFixed(0)}px,0)`;
    });
  }, { passive: true });
}

/* ---------- filtri dei progetti: pillola che scivola, card che si riposizionano (FLIP) ---------- */
document.querySelectorAll('.filters').forEach(f => {
  const g = f.parentElement.querySelector('[data-grid]'); if (!g) return;
  const status = document.getElementById('filterStatus');
  f.hidden = false;
  const pill = f.querySelector('.f-pill');
  const place = snap => {
    const b = f.querySelector('[aria-pressed="true"]'); if (!b || !b.offsetWidth) return;
    if (snap) pill.classList.add('snap');
    pill.style.width = b.offsetWidth + 'px'; pill.style.height = b.offsetHeight + 'px';
    pill.style.transform = `translate3d(${b.offsetLeft}px,${b.offsetTop}px,0)`;
    if (snap) { void pill.offsetWidth; pill.classList.remove('snap'); }
  };
  place(true);
  layoutHooks.push(() => place(true));
  f.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b || b.getAttribute('aria-pressed') === 'true') return;
    f.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b));
    place(false);
    const k = b.dataset.f, cards = [...g.querySelectorAll('.card')], before = new Map();
    if (!RM) cards.forEach(c => { if (!c.classList.contains('hidden')) before.set(c, c.getBoundingClientRect()); });
    let n = 0;
    cards.forEach(c => {
      const show = k === 'tutti' || c.dataset.area.split(' ').includes(k);
      c.classList.toggle('hidden', !show);
      if (show) { c.classList.add('in'); n++; }
    });
    if (status) status.textContent = `${n} progetti`;
    if (RM) return;
    cards.forEach(c => {
      if (c.classList.contains('hidden')) return;
      if (c._flip) c._flip.cancel();
      const r = c.getBoundingClientRect(), b0 = before.get(c);
      if (b0) {
        const dx = b0.left - r.left, dy = b0.top - r.top;
        if (Math.abs(dx) + Math.abs(dy) > 1) c._flip = c.animate([{ transform: `translate3d(${dx}px,${dy}px,0)` }, { transform: 'none' }], { duration: 700, easing: EASE });
      } else c._flip = c.animate([{ opacity: 0, transform: 'scale(.94)' }, { opacity: 1, transform: 'none' }], { duration: 600, easing: EASE });
    });
  });
});

/* ---------- pagina progetto: clip video e numeri che contano ---------- */
document.querySelectorAll('.gallery video[data-src]').forEach(v => {
  const base = v.dataset.src.replace(/\.webm$/, '');
  const src = v.canPlayType('video/webm; codecs="vp9"') || v.canPlayType('video/webm') ? base + '.webm' : base + '.mp4';
  v.addEventListener('loadeddata', () => v.classList.add('ok'));
  v.addEventListener('error', () => v.remove());
  const o = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { if (!v.src) v.src = src; if (!RM) v.play().catch(() => {}); }
    else v.pause();
  }), { rootMargin: '200px 0px', threshold: 0 });
  o.observe(v);
});

function countUp(el) {
  const orig = el.textContent, m = orig.match(/^(\D*)([\d.]+)(.*)$/);
  if (!m) return null;
  const target = +m[2].replace(/\./g, ''); if (!target) return null;
  el.setAttribute('aria-label', orig);
  el.textContent = m[1] + '0' + m[3];
  return () => {
    const t0 = performance.now(), D = 1400;
    const step = t => {
      const k = Math.min(1, (t - t0) / D), e = 1 - Math.pow(1 - k, 4);
      el.textContent = k < 1 ? m[1] + Math.round(target * e).toLocaleString('it-IT') + m[3] : orig;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
}
if (!RM) document.querySelectorAll('.stats b').forEach(b => {
  const start = countUp(b); if (!start) return;
  const o = new IntersectionObserver(es => { if (es[0].isIntersecting) { o.disconnect(); start(); } }, { threshold: .6 });
  o.observe(b);
});

/* ---------- modulo contatti: compone il messaggio e lo apre su WhatsApp o email ---------- */
document.querySelectorAll('form.cform').forEach(f => {
  const msg = () => { const d = new FormData(f); return `Ciao Leukos, sono ${d.get('nome') || ''}.\n${d.get('tipo') ? 'Mi serve: ' + d.get('tipo') + '\n' : ''}${d.get('messaggio') || ''}`; };
  f.addEventListener('submit', e => {
    e.preventDefault();
    if (!f.reportValidity()) return;
    const how = e.submitter && e.submitter.value;
    const url = how === 'mail'
      ? `mailto:${MAIL}?subject=${encodeURIComponent('Nuovo progetto: ' + (new FormData(f).get('nome') || ''))}&body=${encodeURIComponent(msg())}`
      : `https://wa.me/${WA}?text=${encodeURIComponent(msg())}`;
    if (how === 'mail') location.href = url; else window.open(url, '_blank', 'noopener');
    f.querySelector('.sent').hidden = false;
  });
});

/* ---------- scroll morbido (rotellina/trackpad su desktop; touch e tastiera restano nativi) ---------- */
if (!RM && FINE) {
  let target = scrollY, current = scrollY, running = false;
  const max = () => document.documentElement.scrollHeight - innerHeight;
  const frame = () => {
    current += (target - current) * 0.12;
    if (Math.abs(target - current) < 0.5) { current = target; running = false; }
    window.scrollTo(0, current);
    if (running) requestAnimationFrame(frame);
  };
  addEventListener('wheel', e => {
    if (e.ctrlKey || e.defaultPrevented) return;
    if (e.target.closest('textarea, select, [data-native-scroll]')) return;
    e.preventDefault();
    const d = e.deltaMode === 1 ? e.deltaY * 32 : e.deltaMode === 2 ? e.deltaY * innerHeight : e.deltaY;
    target = Math.max(0, Math.min(max(), (running ? target : scrollY) + d));
    if (!running) { current = scrollY; running = true; requestAnimationFrame(frame); }
  }, { passive: false });
  // tastiera, barra di scorrimento, ancore: si riallinea
  addEventListener('scroll', () => { if (!running) target = current = scrollY; }, { passive: true });
}

/* ---------- nastro dei servizi: scorre da solo, accelera e cambia verso con lo scroll ---------- */
const MQ = (() => {
  const m = document.querySelector('.marquee'); if (!m || RM) return null;
  const track = m.firstElementChild;
  let x = 0, gw = 0, dir = 1, boost = 0, slow = 1, slowT = 1, last = 0, run = false;
  const measure = () => { gw = track.firstElementChild.offsetWidth; };
  layoutHooks.push(measure);
  function frame(t) {
    if (!run) return;
    const dt = Math.min(50, last ? t - last : 16); last = t;
    slow += (slowT - slow) * .08;
    boost *= .93;
    x -= dir * (.05 + boost) * dt * slow;
    if (gw) { if (x <= -gw) x += gw; if (x > 0) x -= gw; }
    track.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
    requestAnimationFrame(frame);
  }
  new IntersectionObserver(es => {
    const vis = es[0].isIntersecting;
    if (vis && !run) { run = true; last = 0; measure(); requestAnimationFrame(frame); }
    if (!vis) run = false;
  }).observe(m);
  if (FINE) { m.addEventListener('pointerenter', () => slowT = .25); m.addEventListener('pointerleave', () => slowT = 1); }
  return { kick(dy) { if (!dy) return; dir = dy > 0 ? 1 : -1; boost = Math.min(.3, boost + Math.abs(dy) * .002); } };
})();

/* ---------- logotipo gigante nel footer ---------- */
(() => {
  const g = document.querySelector('.giant'); if (!g) return;
  [...g.children].forEach((c, i) => c.style.setProperty('--i', i));
  const o = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { g.classList.add('in'); o.disconnect(); setTimeout(() => g.classList.add('done'), 1400); } }), { threshold: .25 });
  o.observe(g);
})();

/* ---------- barra di avanzamento ---------- */
const progress = document.createElement('div'); progress.className = 'progress'; progress.setAttribute('aria-hidden', 'true');
document.body.appendChild(progress);

/* ---------- effetti legati allo scroll: un solo rAF per frame ---------- */
const par = document.querySelector('.hero-par');
const heroText = document.querySelector('.hero-in, .p-hero .wrap, .page-top .wrap');
const stepsEls = [...document.querySelectorAll('.steps')];
let lastY = scrollY, prevY = scrollY, ticking = false;
function onScroll() {
  ticking = false;
  const y = scrollY, vh = innerHeight;
  const doc = document.documentElement.scrollHeight - vh;
  progress.style.transform = `scaleX(${doc > 0 ? Math.min(1, y / doc).toFixed(4) : 0})`;
  nav.classList.toggle('solid', y > 260);
  if (!nav.classList.contains('open') && Math.abs(y - lastY) > 4) { nav.classList.toggle('hide', y > lastY && y > 500); lastY = y; }
  if (RM) return;
  if (MQ) MQ.kick(y - prevY);
  prevY = y;
  // testata: lo sfondo scende più lento, il testo sale e sfuma
  if (y < vh * 1.2) {
    if (par) par.style.transform = `translate3d(0,${(y * 0.18).toFixed(1)}px,0)`;
    if (heroText) {
      const k = Math.min(1, y / (vh * .75));
      heroText.style.opacity = (1 - k).toFixed(3);
      heroText.style.transform = `translate3d(0,${(y * .22).toFixed(1)}px,0)`;
    }
  }
  // manifesto: si accendono le parole man mano che il titolo sale
  if (manifesto) {
    const r = manifesto.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (vh * .9 - r.top) / (vh * .5)));
    const lit = Math.round(p * manifesto._words.length);
    manifesto._words.forEach((w, i) => w.classList.toggle('on', i < lit));
  }
  // processo: barra che si riempie e passi che si accendono
  stepsEls.forEach(s => {
    const r = s.getBoundingClientRect();
    s.style.setProperty('--p', Math.min(1, Math.max(0, (vh * 0.7 - r.top) / r.height)).toFixed(3));
    s.querySelectorAll('.step').forEach(st => st.classList.toggle('lit', st.getBoundingClientRect().top < vh * 0.72));
  });
}
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
if (RM) document.querySelectorAll('.steps .step').forEach(s => s.classList.add('lit'));
onScroll();
relayout();
