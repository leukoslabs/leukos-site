const PROJECTS = [
  {
    id:'freshy', name:'Freshy', cat:'UI/UX – Branding', color:'#99ffb6', cover:'freshy-cover.jpg', coverPos:'50% 50%',
    services:['Brand identity','UI/UX design app','Mockup e presentazione'],
    sector:'Sostenibilità · Food',
    headline:'Un frigo che ti parla, per sprecare <em>meno cibo</em>.',
    text:[
      'Freshy è un\'app pensata per ridurre lo spreco alimentare in casa. Il messaggio del brand è diretto: <em>it\'s not just food, it\'s our world, no more waste.</em>',
      'Abbiamo disegnato l\'identità e l\'interfaccia: una dashboard che mostra temperatura e umidità del frigo, il tempo di apertura dello sportello, gli alimenti inseriti e quanto si è risparmiato, con uno spazio condiviso per tutta la famiglia e un sistema di premi.'
    ],
    gallery:[{src:'freshy-cover.jpg',cls:'full',alt:'Copertina del brand book Freshy'},{src:'freshy-app.jpg',cls:'contain',alt:'Schermata principale dell\'app Freshy'},{src:'freshy-cover.jpg',alt:'Dettaglio del brand Freshy',pos:'85% 50%'}]
  },
  {
    id:'feedeat', name:'FeedEat', cat:'UI/UX – Branding', color:'#ffc7c4', cover:'feedeat.jpg', coverPos:'50% 40%',
    services:['Brand identity','Mascotte','Icona 3D'],
    sector:'App · Food',
    headline:'Una mascotte che si fa <em>ricordare</em>.',
    text:[
      'Per FeedEat abbiamo creato un\'identità costruita intorno a un personaggio: un piccolo roditore sorridente, disegnato per funzionare da icona dell\'app e da firma del brand.',
      'Il segno è stato declinato in versione 3D, su un rosa corallo pieno che rende il marchio riconoscibile anche alle dimensioni più piccole.'
    ],
    gallery:[{src:'feedeat.jpg',cls:'full contain',alt:'Icone 3D della mascotte FeedEat'}]
  },
  {
    id:'petrillo', name:'Avv. Oreste Petrillo', cat:'Contenuti Social', color:'#fcc80d', cover:'petrillo-cover.jpg', coverPos:'50% 40%',
    services:['Strategia contenuti','Copertine video','Caroselli social'],
    sector:'Studio legale',
    headline:'Il diritto spiegato in <em>un colpo d\'occhio</em>.',
    text:[
      'Per lo studio dell\'Avv. Oreste Petrillo curiamo la comunicazione social: copertine per i video e caroselli che rendono semplici temi complessi come il patto di non concorrenza, le licenze software e il copyright delle immagini generate con l\'AI.',
      'Il linguaggio visivo unisce un titolo condensato giallo acceso a un corsivo elegante: autorevole come uno studio legale, immediato come un feed.'
    ],
    gallery:[{src:'petrillo-cover.jpg',cls:'full',alt:'Copertina video sul patto di non concorrenza'},{src:'petrillo-post1.jpg',alt:'Post sui 3 errori nelle licenze software'},{src:'petrillo-post2.jpg',alt:'Post sul copyright delle immagini generate con DALL-E e Midjourney'}]
  },
  {
    id:'gamepeople', name:'GamePeople BN', cat:'Web Design – Comunicazione', color:'#59c5ff', cover:'gamepeople-web.jpg', coverPos:'60% 45%',
    services:['Web design','Copywriting','Comunicazione'],
    sector:'Retail · Gaming · Benevento',
    headline:'Gioca. Colleziona. <em>Vivi.</em>',
    text:[
      'GamePeople è il punto di riferimento per i videogiocatori di Benevento, al centro commerciale I Sanniti: videogiochi nuovi e usati, carte collezionabili, Funko, art toys e un\'area tornei.',
      'Abbiamo progettato il sito e la comunicazione per raccontarlo come più di un semplice negozio: un hero d\'impatto con il claim "Gioca. Colleziona. Vivi.", eventi in primo piano, orari sempre visibili e accesso rapido al catalogo.'
    ],
    gallery:[{src:'gamepeople-web.jpg',cls:'full',alt:'Il sito GamePeople su laptop'},{src:'gamepeople-cover.jpg',cls:'full',alt:'Il negozio GamePeople a Benevento'}]
  },
  {
    id:'vestio', name:'Vestio', cat:'UI/UX – Branding', color:'#ffffff', cover:'vestio-cover.jpg', coverPos:'30% 40%',
    services:['Brand identity','UI/UX design app','Prototipo'],
    sector:'Fashion · Social',
    headline:'Il tuo armadio, <em>condiviso</em>.',
    text:[
      'Vestio è un\'app social dedicata allo stile: ogni utente digitalizza il proprio guardaroba, compone outfit e li condivide con chi segue.',
      'Abbiamo disegnato un\'interfaccia pulita e quasi monocromatica che lascia parlare i capi: profilo con armadio diviso per categorie, feed "Seguiti / Per te" e un collegamento diretto per acquistare i look che ispirano.'
    ],
    gallery:[{src:'vestio-cover.jpg',cls:'full',alt:'Moodboard di outfit per Vestio'},{src:'vestio-app.jpg',cls:'full contain',alt:'Profilo e feed dell\'app Vestio'}]
  },
  {
    id:'revoluxio', name:'Revoluxio', cat:'UI/UX', color:'#8ad6a8', cover:'revoluxio-cover.jpg', coverPos:'50% 50%',
    services:['UI/UX design','Design system','Prototipo web'],
    sector:'Sport · Ciclismo',
    headline:'La bici da strada <em>giusta</em>, senza cercare ovunque.',
    text:[
      'Revoluxio nasce come progetto di scuola e diventa una piattaforma per ciclisti: un archivio delle bici da corsa sul mercato, con confronto tra marchi, modelli e prezzi.',
      'Abbiamo progettato l\'intera esperienza su tema scuro con un verde acceso come accento: catalogo, scheda prodotto con specifiche, configuratore della propria "build" con costo stimato, recensioni della community e un design system con tipografia e colori documentati.'
    ],
    gallery:[{src:'revoluxio-cover.jpg',cls:'full',alt:'Panoramica delle schermate di Revoluxio'},{src:'revoluxio-app.jpg',cls:'full',alt:'Scheda prodotto Revoluxio su tablet'}]
  }
];

const ARROW = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const esc = s => s.replace(/<[^>]+>/g,'');

function card(p, wide){
  return `<a class="card rv${wide?' wide':''}" href="#progetto-${p.id}" aria-label="${p.name}, ${p.cat}">
    <img src="assets/img/${p.cover}" alt="" loading="lazy" style="object-position:${p.coverPos}">
    <span class="go">${ARROW}</span>
    <span class="txt"><span class="cat">${p.cat}</span><span class="name" style="color:${p.color}">${p.name}</span></span>
  </a>`;
}
document.querySelectorAll('[data-grid]').forEach(g=>{
  g.innerHTML = PROJECTS.map((p,i)=>card(p, i===0||i===PROJECTS.length-1)).join('');
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
            <div><dt>Cliente</dt><dd>${p.name}</dd></div>
            <div><dt>Settore</dt><dd>${p.sector}</dd></div>
            <div><dt>Cosa abbiamo fatto</dt><dd>${p.services.join('<br>')}</dd></div>
          </dl></aside>
          <div class="p-text rv">
            <h2>${p.headline}</h2>
            ${p.text.map(t=>`<p>${t}</p>`).join('')}
          </div>
        </div>
        <div class="gallery">
          ${p.gallery.map(g=>`<figure class="rv ${g.cls||''}"><img src="assets/img/${g.src}" alt="${g.alt}" loading="lazy" ${g.pos?`style="object-position:${g.pos}"`:''}></figure>`).join('')}
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
}

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
