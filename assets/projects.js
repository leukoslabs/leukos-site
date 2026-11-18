/* =====================================================================
   PROGETTI LEUKOS
   kind: 'cliente' | 'nostro' | 'startup' | 'produzione' | 'concept'  (badge sulla card)
   area: usata dai filtri della pagina Progetti — 'video' | 'web' | 'brand' | 'social'
   gallery: {src, alt, cls?, pos?, video?}  — se `video` è indicato
            (es. 'nikola-amici.webm' in assets/video/) parte in loop muto,
            altrimenti si vede l'immagine.
   links: [{label, href}]  — collegamenti esterni al lavoro pubblicato
   stats: [{n, l}]         — numeri reali da mostrare (solo dati verificati)
   ===================================================================== */
const PROJECTS = [
  {
    id:'nikola-greku', name:'Nikola Greku', kind:'cliente', area:['video','social'],
    cat:'Video editing – Reel e YouTube', color:'#ffb38a', cover:'nikola-cover.jpg', coverPos:'60% 40%',
    services:['Montaggio reel','Montaggio YouTube','Sottotitoli e ritmo'],
    sector:'Creator · 239.000 follower',
    headline:'Oltre <em>860.000 visualizzazioni</em> in 12 reel.',
    text:[
      'Montiamo i contenuti di Nikola Greku, creator con 239.000 follower: reel per Instagram e video per YouTube, compreso il suo intervento al TEDx Campiglio.',
      'Il lavoro è tutto sul ritmo: tagli serrati, sottotitoli leggibili, musica e grafiche che tengono lo spettatore fino all\'ultimo secondo. In 12 reel montati da noi: più di 860.000 visualizzazioni, con una media di circa 72.000 a reel.'
    ],
    stats:[{n:'860.000+',l:'visualizzazioni su 12 reel'},{n:'~72.000',l:'media a reel'},{n:'237.000',l:'il reel migliore'},{n:'65.000+',l:'views su un video YouTube'}],
    statsNote:'Dati di Instagram e YouTube, novembre 2026.',
    links:[{label:'Profilo Instagram',href:'https://www.instagram.com/nikola.greku/'},{label:'Canale YouTube',href:'https://www.youtube.com/@NikolaGreku'},{label:'Guarda un reel',href:'https://www.instagram.com/reel/Dfh41_boEGu/'}],
    gallery:[
      {src:'nikola-cover.jpg',cls:'full',alt:'Nikola Greku sul palco del TEDx Campiglio'},
      {src:'nikola-tedx.jpg',video:'nikola-funivia.webm',alt:'Estratto del video di Nikola Greku al TEDx'},
      {src:'nikola-amici.jpg',video:'nikola-amici.webm',alt:'Estratto di un video YouTube di Nikola Greku'}
    ]
  },
  {
    id:'gamepeople', name:'GamePeople BN', kind:'cliente', area:['web'],
    cat:'Web Design – Comunicazione', color:'#59c5ff', cover:'gamepeople-web.jpg', coverPos:'60% 45%',
    services:['Web design e sviluppo','Copywriting','Comunicazione'],
    sector:'Retail · Gaming · Benevento',
    headline:'Gioca. Colleziona. <em>Vivi.</em>',
    text:[
      'GamePeople è il punto di riferimento per i videogiocatori di Benevento, al centro commerciale I Sanniti: videogiochi nuovi e usati, carte collezionabili, manga, Funko, giochi da tavolo e un\'area tornei.',
      'Abbiamo progettato e realizzato il sito e la comunicazione per raccontarlo come più di un semplice negozio: un hero d\'impatto, eventi e tornei in primo piano, orari sempre visibili e accesso rapido al catalogo.'
    ],
    links:[{label:'Visita il sito',href:'https://gamepeoplebenevento.pages.dev/'}],
    gallery:[{src:'gamepeople-web.jpg',cls:'full',alt:'Il sito GamePeople su laptop'},{src:'gamepeople-cover.jpg',cls:'full',alt:'Il negozio GamePeople a Benevento'}]
  },
  {
    id:'petrillo', name:'Avv. Oreste Maria Petrillo', kind:'cliente', area:['social','video'],
    cat:'Contenuti Social – Reel', color:'#fcc80d', cover:'petrillo-cover.jpg', coverPos:'50% 40%',
    services:['Montaggio reel educativi','Copertine e caroselli','Linea grafica del profilo'],
    sector:'Avvocato per imprenditori digitali',
    headline:'Il diritto spiegato in <em>un colpo d\'occhio</em>.',
    text:[
      'L\'Avv. Oreste Maria Petrillo tutela legalmente imprenditori web e business online. Per il suo profilo Instagram curiamo reel educativi, copertine e caroselli che rendono semplici temi complessi: patto di non concorrenza, licenze software, privacy, copyright delle immagini generate con l\'AI, analisi dei siti di brand noti.',
      'Il linguaggio visivo unisce un titolo condensato giallo acceso a un corsivo elegante: autorevole come uno studio legale, immediato come un feed. Ogni copertina è riconoscibile anche in miniatura nella griglia del profilo.'
    ],
    links:[{label:'Profilo Instagram',href:'https://www.instagram.com/avvorestemariapetrillo/'}],
    gallery:[
      {src:'petrillo-cover.jpg',cls:'full',alt:'Copertina video sul patto di non concorrenza'},
      {src:'petrillo-ig.jpg',cls:'full',alt:'La griglia del profilo Instagram con le copertine dei reel'},
      {src:'petrillo-post1.jpg',alt:'Post sui 3 errori nelle licenze software'},
      {src:'petrillo-post2.jpg',alt:'Post sul copyright delle immagini generate con DALL-E e Midjourney'}
    ]
  },
  {
    id:'cloudyo', name:'Cloudyo', kind:'nostro', area:['video','social','brand'],
    cat:'Il nostro brand – Video TikTok', color:'#ffffff', cover:'cloudyo-cover.jpg', coverPos:'50% 40%',
    services:['Contenuti e video TikTok','Montaggio'],
    sector:'Nostro brand · T-shirt grafiche',
    headline:'Sogni, ambizione, <em>stile</em>.',
    text:[
      'Cloudyo è il nostro brand di t-shirt grafiche, dedicato ai sogni e all\'ambizione.',
      'Per il profilo TikTok realizziamo una serie di video ispirazionali, Vision, Style, Dreams e Impact: immagini evocative e un ritmo calmo che lascia respirare il messaggio, "be your dream", "follow your dreams".'
    ],
    links:[{label:'Video "Vision"',href:'https://www.tiktok.com/@cloudyo_official/video/7573725753976622358'},{label:'Video "Dreams"',href:'https://www.tiktok.com/@cloudyo_official/video/7574765694856793366'},{label:'Sito Cloudyo',href:'https://www.cloudyo.me/'}],
    gallery:[{src:'cloudyo-cover.jpg',cls:'full',alt:'Tre fotogrammi verticali dei video Cloudyo'}]
  },
  {
    id:'vestio', name:'Vestio', kind:'startup', area:['web','brand'],
    cat:'UI/UX – Branding', color:'#ffffff', cover:'vestio-cover.jpg', coverPos:'30% 40%',
    services:['Brand identity','UI/UX design app','Prototipo'],
    sector:'Startup · Fashion · Social',
    headline:'Il tuo armadio, <em>condiviso</em>.',
    text:[
      'Vestio è una startup che porta lo stile sui social: ogni utente digitalizza il proprio guardaroba, compone outfit e li condivide con chi segue.',
      'Abbiamo disegnato identità e interfaccia: un\'app pulita e quasi monocromatica che lascia parlare i capi, con armadio diviso per categorie, feed "Seguiti / Per te" e un collegamento diretto per acquistare i look che ispirano.'
    ],
    gallery:[{src:'vestio-cover.jpg',cls:'full',alt:'Moodboard di outfit per Vestio'},{src:'vestio-app.jpg',cls:'full contain',alt:'Profilo e feed dell\'app Vestio'}]
  },
  {
    id:'feedeat', name:'FeedEat', kind:'startup', area:['brand','video','social'],
    cat:'Branding – Marketing – Video', color:'#ffc7c4', cover:'feedeat-team.jpg', coverPos:'40% 40%',
    services:['Brand identity e mascotte','Marketing (2022–2024)','Video di presentazione e intervista'],
    sector:'Startup · Food',
    headline:'Una startup nata <em>tra i banchi di scuola</em>.',
    text:[
      'FeedEat è il progetto dove abbiamo cominciato: una startup food nata tra i banchi di scuola, che abbiamo seguito dall\'interno dal 2022 al 2024.',
      'Ce ne siamo occupati a 360 gradi: l\'identità con la sua mascotte, declinata anche in icona 3D, il marketing e i video, dalla presentazione del progetto all\'intervista al team. È stata la nostra palestra: lì abbiamo imparato a costruire un brand da zero e a raccontarlo ogni giorno. La nostra collaborazione si è chiusa nel 2024.'
    ],
    gallery:[
      {src:'feedeat-team.jpg',cls:'full',alt:'Un fotogramma del video FeedEat girato in un ristorante'},
      {src:'feedeat-promo.jpg',video:'feedeat-presentazione.webm',alt:'Estratto del video di presentazione FeedEat'},
      {src:'feedeat-intervista.jpg',video:'feedeat-intervista.webm',alt:'Estratto dell\'intervista al team FeedEat'},
      {src:'feedeat.jpg',cls:'full contain',alt:'Icone 3D della mascotte FeedEat'}
    ]
  },
  {
    id:'alba-del-futuro', name:'L\'alba del futuro', kind:'produzione', area:['video'],
    cat:'Mini documentario', color:'#ffd2b0', cover:'alba-cover.jpg', coverPos:'50% 50%',
    services:['Riprese','Regia','Montaggio'],
    sector:'Documentario · M106 Production',
    headline:'Il montaggio lento e <em>narrativo</em>.',
    text:[
      'Un mini documentario pubblicato da M106 Production, di cui abbiamo curato riprese, regia e montaggio.',
      'È il tipo di lavoro da cui partiamo: tempi lunghi, immagini che respirano, una storia costruita in sala di montaggio.'
    ],
    gallery:[{src:'alba-cover.jpg',cls:'full',alt:'Mani in camice esaminano un fossile in laboratorio'},{src:'alba-clip.jpg',video:'alba.webm',cls:'full',alt:'Ripresa aerea di un fuoristrada nel deserto'}]
  },
  {
    id:'panorama', name:'Il panorama a metà strada', kind:'produzione', area:['video'],
    cat:'Cortometraggio', color:'#ffe3a8', cover:'panorama-cover.jpg', coverPos:'50% 60%',
    services:['Riprese','Regia','Montaggio'],
    sector:'Cortometraggio · M106 Production',
    headline:'Una storia <em>a metà strada</em>.',
    text:[
      'Un cortometraggio narrativo pubblicato da M106 Production: riprese, regia e montaggio sono nostri.',
      'Luce naturale, controluce al tramonto e un montaggio che lascia spazio ai silenzi.'
    ],
    gallery:[{src:'panorama-cover.jpg',cls:'full',alt:'Tramonto su un campo, con un albero e le colline sullo sfondo'},{src:'panorama-clip.jpg',video:'panorama.webm',cls:'full',alt:'Il protagonista del cortometraggio in controluce'}]
  },
  {
    id:'freshy', name:'Freshy', kind:'concept', area:['web','brand'],
    cat:'UI/UX – Branding', color:'#99ffb6', cover:'freshy-cover.jpg', coverPos:'50% 50%',
    services:['Brand identity','UI/UX design app','Mockup e presentazione'],
    sector:'Concept · Sostenibilità · Food',
    headline:'Un frigo che ti parla, per sprecare <em>meno cibo</em>.',
    text:[
      'Freshy è un nostro concept: un\'app per ridurre lo spreco alimentare in casa. Il messaggio del brand è diretto: <em>it\'s not just food, it\'s our world, no more waste.</em>',
      'Abbiamo disegnato identità e interfaccia: una dashboard con temperatura e umidità del frigo, tempo di apertura dello sportello, alimenti inseriti e quanto si è risparmiato, con uno spazio condiviso per la famiglia e un sistema di premi.'
    ],
    gallery:[{src:'freshy-cover.jpg',cls:'full',alt:'Copertina del brand book Freshy'},{src:'freshy-app.jpg',cls:'contain',alt:'Schermata principale dell\'app Freshy'},{src:'freshy-cover.jpg',alt:'Dettaglio del brand Freshy',pos:'85% 50%'}]
  },
  {
    id:'revoluxio', name:'Revoluxio', kind:'concept', area:['web'],
    cat:'UI/UX', color:'#8ad6a8', cover:'revoluxio-cover.jpg', coverPos:'50% 50%',
    services:['UI/UX design','Design system','Prototipo web'],
    sector:'Concept · Sport · Ciclismo',
    headline:'La bici da strada <em>giusta</em>, senza cercare ovunque.',
    text:[
      'Revoluxio è un concept nato come progetto di scuola: una piattaforma per ciclisti con l\'archivio delle bici da corsa sul mercato e il confronto tra marchi, modelli e prezzi.',
      'Abbiamo progettato l\'intera esperienza su tema scuro con un verde acceso come accento: catalogo, scheda prodotto con specifiche, configuratore della propria "build" con costo stimato, recensioni della community e un design system documentato.'
    ],
    gallery:[{src:'revoluxio-cover.jpg',cls:'full',alt:'Panoramica delle schermate di Revoluxio'},{src:'revoluxio-app.jpg',cls:'full',alt:'Scheda prodotto Revoluxio su tablet'}]
  }
];

const KIND_LABEL = {cliente:'Cliente', nostro:'Nostro brand', startup:'Startup', produzione:'Produzione', concept:'Concept'};
const AREAS = [['tutti','Tutti'],['video','Video'],['web','Web e app'],['brand','Brand'],['social','Social']];
