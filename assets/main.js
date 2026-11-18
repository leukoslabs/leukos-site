
const ARROW = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const esc = s => s.replace(/<[^>]+>/g,'');

function card(p, wide){
  return `<a class="card rv${wide?' wide':''}" href="#progetto-${p.id}" data-area="${p.area.join(' ')}" aria-label="${p.name}, ${p.cat}">
    <img src="assets/img/${p.cover}" alt="" loading="lazy" style="object-position:${p.coverPos}">
    <span class="kind kind-${p.kind}">${KIND_LABEL[p.kind]}</span>
    <span class="go">${ARROW}</span>
    <span class="txt"><span class="cat">${p.cat}</span><span class="name" style="color:${p.color}">${p.name}</span></span>
  </a>`;
}
const HOME_IDS = ['nikola-greku','gamepeople','petrillo','cloudyo','vestio','feedeat'];
document.querySelectorAll('[data-grid="home"]').forEach(g=>{
  const list = HOME_IDS.map(id=>PROJECTS.find(p=>p.id===id));
  g.innerHTML = list.map((p,i)=>card(p, i===0||i===list.length-1)).join('');
});
document.querySelectorAll('[data-grid="all"]').forEach(g=>{
  g.innerHTML = PROJECTS.map(p=>card(p,false)).join('');
  const f = document.createElement('div'); f.className='filters'; f.setAttribute('role','toolbar'); f.setAttribute('aria-label','Filtra i progetti');
  f.innerHTML = AREAS.map(([k,l],i)=>`<button type="button" data-f="${k}" aria-pressed="${i===0}">${l}</button>`).join('');
  g.before(f);
  f.addEventListener('click',e=>{
    const b=e.target.closest('button'); if(!b) return;
    f.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed', x===b));
    const k=b.dataset.f;
    g.querySelectorAll('.card').forEach(c=>{
      const show = k==='tutti' || c.dataset.area.split(' ').includes(k);
      c.classList.toggle('hidden', !show);
    });
  });
});
['services','process','contact'].forEach(k=>{
  const t=document.getElementById('tpl-'+k);
  document.querySelectorAll(`[data-slot="${k}"]`).forEach(s=>s.appendChild(t.content.cloneNode(true)));
});

function renderProject(p){
  const i = PROJECTS.indexOf(p), n = PROJECTS[(i+1)%PROJECTS.length];
  document.getElementById('projectView').innerHTML = `
    <section class="p-hero">
      <img src="assets/img/${p.cover}" alt="" style="object-position:${p.coverPos}">
      <div class="wrap">
        <a class="back" href="#progetti">← Tutti i progetti</a>
        <div class="cat">${p.cat}</div>
        <h1 style="color:${p.color}">${p.name}</h1>
      </div>
    </section>
    <section class="p-body">
      <div class="wrap">
        <div class="p-intro">
          <aside class="p-meta rv"><dl>
            <div><dt>${p.kind==='concept'||p.kind==='nostro'?'Progetto':'Cliente'}</dt><dd>${p.name} <span class="kind kind-${p.kind} inline">${KIND_LABEL[p.kind]}</span></dd></div>
            <div><dt>Settore</dt><dd>${p.sector}</dd></div>
            <div><dt>Cosa abbiamo fatto</dt><dd>${p.services.join('<br>')}</dd></div>
            ${p.links?`<div><dt>Guarda il lavoro</dt><dd class="links">${p.links.map(l=>`<a href="${l.href}" target="_blank" rel="noopener">${l.label} ↗</a>`).join('')}</dd></div>`:''}
          </dl></aside>
          <div class="p-text rv">
            <h2>${p.headline}</h2>
            ${p.text.map(t=>`<p>${t}</p>`).join('')}
          </div>
        </div>
        ${p.stats?`<div class="stats rv">${p.stats.map(s=>`<div><b>${s.n}</b><span>${s.l}</span></div>`).join('')}<small>${p.statsNote||''}</small></div>`:''}
        <div class="gallery">
          ${p.gallery.map(g=>`<figure class="rv ${g.cls||''}">${g.video
            ? `<video muted loop playsinline preload="none" poster="assets/img/${g.src}" aria-label="${g.alt}"><source src="assets/video/${g.video}" type="video/webm"></video><img src="assets/img/${g.src}" alt="${g.alt}" loading="lazy">`
            : `<img src="assets/img/${g.src}" alt="${g.alt}" loading="lazy" ${g.pos?`style="object-position:${g.pos}"`:''}>`}</figure>`).join('')}
        </div>
        <a class="next" href="#progetto-${n.id}">
          <span><small>Prossimo progetto</small><strong>${n.name}</strong></span>
          <span class="arrow">${ARROW}</span>
        </a>
      </div>
    </section>
    <section class="block" style="padding-top:0"><div class="wrap" data-slot="contact"></div></section>`;
  const s=document.querySelector('#projectView [data-slot="contact"]');
  s.appendChild(document.getElementById('tpl-contact').content.cloneNode(true));
  wireContact(s);
  // video: se il file esiste parte in loop quando è visibile, altrimenti resta l'immagine
  document.querySelectorAll('#projectView video').forEach(v=>{
    const src=v.querySelector('source');
    src.addEventListener('error',()=>v.remove());
    v.addEventListener('loadeddata',()=>{ v.classList.add('ok'); v.nextElementSibling && v.nextElementSibling.remove(); });
    const o=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ v.preload='auto'; v.play().catch(()=>{}); } else v.pause(); }),{threshold:.3});
    o.observe(v);
  });
}

/* modulo contatti: compone il messaggio e lo apre su WhatsApp o email */
const WA='393299826583', MAIL='labsleukos@gmail.com';
function wireContact(root){
  root.querySelectorAll('form.cform').forEach(f=>{
    if(f.dataset.wired) return; f.dataset.wired='1';
    const msg=()=>{const d=new FormData(f);return `Ciao Leukos, sono ${d.get('nome')||''}.\n${d.get('tipo')?'Mi serve: '+d.get('tipo')+'\n':''}${d.get('messaggio')||''}`;};
    f.addEventListener('submit',e=>{
      e.preventDefault();
      if(!f.reportValidity()) return;
      const how=e.submitter && e.submitter.value;
      const url = how==='mail'
        ? `mailto:${MAIL}?subject=${encodeURIComponent('Nuovo progetto — '+(new FormData(f).get('nome')||''))}&body=${encodeURIComponent(msg())}`
        : `https://wa.me/${WA}?text=${encodeURIComponent(msg())}`;
      const a=document.createElement('a'); a.href=url; a.target='_blank'; a.rel='noopener'; document.body.appendChild(a); a.click(); a.remove();
      f.querySelector('.sent').hidden=false;
    });
  });
}
document.querySelectorAll('[data-slot="contact"]').forEach(wireContact);

const VIEWS = ['home','progetti','servizi','processo','chi-siamo','contatti'];
const TITLES = {home:'Leukos — La tua essenza, in ogni formato',progetti:'Progetti — Leukos',servizi:'Servizi — Leukos',processo:'Come funziona — Leukos','chi-siamo':'Chi siamo — Leukos',contatti:'Contatti — Leukos'};
let io;
function route(){
  const h = (location.hash||'#home').slice(1);
  let view = VIEWS.includes(h) ? h : 'home';
  if(h.startsWith('progetto-')){
    const p = PROJECTS.find(x=>'progetto-'+x.id===h);
    if(p){ renderProject(p); view='progetto'; document.title = p.name+' — Leukos'; }
  } else document.title = TITLES[view];
  document.querySelectorAll('.view').forEach(v=>v.classList.toggle('on', v.dataset.view===view));
  document.querySelectorAll('[data-nav]').forEach(a=>{
    const active = a.dataset.nav===view || (view==='progetto' && a.dataset.nav==='progetti');
    active ? a.setAttribute('aria-current','page') : a.removeAttribute('aria-current');
  });
  nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded','false');
  nav.classList.remove('hide');
  window.scrollTo(0,0);
  enhance();
  observe();
}
function observe(){
  if(io) io.disconnect();
  const els=document.querySelectorAll('.view.on .rv:not(.in)');
  if(!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('in'));return;}
  io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px',threshold:.05});
  els.forEach(e=>io.observe(e));
}
const nav=document.getElementById('nav'), menuBtn=document.getElementById('menuBtn');
menuBtn.addEventListener('click',()=>{const o=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',o)});
addEventListener('scroll',()=>nav.classList.toggle('solid',scrollY>260),{passive:true});

/* ================= MOTION ================= */
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const app = document.getElementById('app');

// transizione tra pagine: esce, cambia vista, rientra
let first = true;
function go(){
  if(first || RM){ first=false; route(); requestAnimationFrame(intro); return; }
  app.classList.add('leaving');
  setTimeout(()=>{
    route();
    app.classList.remove('leaving'); app.classList.add('entering');
    requestAnimationFrame(()=>requestAnimationFrame(()=>{ app.classList.remove('entering'); intro(); }));
  }, 320);
}
addEventListener('hashchange',go);

// prepara gli elementi della vista corrente (cascata, immagini, logotipo)
function enhance(){
  const v=document.querySelector('.view.on'); if(!v) return;
  v.querySelectorAll('.grid,.svc,.gallery,.facts,.steps').forEach(g=>{
    [...g.children].forEach((c,i)=>{ if(c.classList.contains('rv')) c.style.setProperty('--d',(i%4)*0.09+'s'); });
  });
  v.querySelectorAll('.svc li,.step,.fact').forEach((el,i)=>{ el.style.setProperty('--d',(i%6)*0.07+'s'); });
  document.querySelectorAll('img:not(.fade)').forEach(img=>{
    if(img.closest('.nav')||img.closest('footer')||img.classList.contains('chip-star')) return;
    img.classList.add('fade');
    const ok=()=>img.classList.add('ok');
    img.complete && img.naturalWidth ? ok() : img.addEventListener('load',ok,{once:true});
  });
}

// intro di hero e pagina progetto
function intro(){
  const v=document.querySelector('.view.on');
  const hero=v && v.querySelector('.hero, .p-hero');
  document.querySelectorAll('.hero-bg,.hero-in').forEach(e=>{e.style.transform='';e.style.opacity='';});
  if(hero){ hero.classList.remove('ready'); void hero.offsetWidth; requestAnimationFrame(()=>hero.classList.add('ready')); }
}

// titolo hero diviso in righe che salgono
(function(){
  const h=document.querySelector('.hero h1'); if(!h) return;
  h.innerHTML=h.innerHTML.split(/<br\s*\/?>/i).map((l,i)=>`<span class="line"><span style="--i:${i}">${l.trim()}</span></span>`).join('');
})();

// logotipo gigante del footer: lettera per lettera
(function(){
  const g=document.querySelector('.giant'); if(!g) return;
  [...g.children].forEach((c,i)=>c.style.setProperty('--i',i));
  const o=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ g.classList.add('in'); o.disconnect(); } }),{threshold:.3});
  o.observe(g);
})();

// scroll: nav che si nasconde, parallax hero, barra del processo
let lastY=0, ticking=false;
function onScroll(){
  const y=scrollY;
  if(!nav.classList.contains('open')) nav.classList.toggle('hide', y>lastY && y>400);
  lastY=y;
  if(!RM){
    const v=document.querySelector('.view.on');
    const hb=v&&v.querySelector('.hero.ready .hero-bg'), hi=v&&v.querySelector('.hero-in');
    if(hb && y<innerHeight*1.2){ hb.style.transform=`translate3d(0,${y*0.28}px,0) scale(1)`; hi.style.transform=`translate3d(0,${y*0.12}px,0)`; hi.style.opacity=Math.max(0,1-y/(innerHeight*0.7)); }
    v && v.querySelectorAll('.steps').forEach(s=>{
      const r=s.getBoundingClientRect(), p=Math.min(1,Math.max(0,(innerHeight*0.7-r.top)/r.height));
      s.style.setProperty('--p',p.toFixed(3));
      s.querySelectorAll('.step').forEach(st=>{ const t=st.getBoundingClientRect().top; st.classList.toggle('lit', t<innerHeight*0.72); });
    });
  }
  ticking=false;
}
addEventListener('scroll',()=>{ if(!ticking){ ticking=true; requestAnimationFrame(onScroll); } },{passive:true});

// cursore "Apri" che segue il mouse sulle card
if(matchMedia('(hover:hover) and (pointer:fine)').matches && !RM){
  const c=document.createElement('div'); c.className='cursor'; c.textContent='Apri'; c.setAttribute('aria-hidden','true'); document.body.appendChild(c);
  let tx=-200,ty=-200,x=-200,y=-200;
  addEventListener('mousemove',e=>{ tx=e.clientX; ty=e.clientY; c.classList.toggle('on', !!e.target.closest('.card')); },{passive:true});
  (function loop(){ x+=(tx-x)*0.2; y+=(ty-y)*0.2; c.style.setProperty('--x',x+'px'); c.style.setProperty('--y',y+'px'); requestAnimationFrame(loop); })();
  const check=()=>{ const el=document.elementFromPoint(tx,ty); c.classList.toggle('on', !!(el&&el.closest('.card'))); };
  addEventListener('scroll',()=>requestAnimationFrame(check),{passive:true});
  addEventListener('hashchange',()=>c.classList.remove('on'));
  document.addEventListener('mouseleave',()=>c.classList.remove('on'));
}
if(RM){ document.querySelectorAll('.steps .step').forEach(s=>s.classList.add('lit')); }

go();
