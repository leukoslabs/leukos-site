/* Dati dello studio usati in tutto il sito (testi legali, contatti, dati strutturati). */
export const SITE = {
  name: 'Leukos',
  tagline: 'La tua essenza, in ogni formato.',
  description: 'Leukos è uno studio creativo a Benevento: brand identity, UI/UX, siti web, contenuti social, video editing, motion design, riprese e regia.',
  city: 'Benevento',
  region: 'BN',
  country: 'IT',
  vat: '01896160627',
  phone: '+39 329 982 6583',
  phoneE164: '+393299826583',
  whatsapp: '393299826583',
  email: 'labsleukos@gmail.com',
  calendar: 'https://cal.com/leukos',
};

export const NAV = [
  { href: '/progetti/', label: 'Progetti', key: 'progetti' },
  { href: '/servizi/', label: 'Servizi', key: 'servizi' },
  { href: '/come-funziona/', label: 'Come funziona', key: 'processo' },
  { href: '/chi-siamo/', label: 'Chi siamo', key: 'chi-siamo' },
];

export const SERVICES = [
  { n: '01', name: 'Brand e Digital', text: 'Logo, identità visiva, naming e linee guida.' },
  { n: '02', name: 'UI/UX', text: 'Interfacce di app e prodotti digitali, dai wireframe ai prototipi in Figma.' },
  { n: '03', name: 'Web Design', text: 'Siti vetrina, landing page e siti con prenotazioni.' },
  { n: '04', name: 'Comunicazione', text: 'Contenuti social, campagne e materiali per il lancio.' },
  { n: '05', name: 'Video Editing', text: 'Reel, video YouTube e TikTok per creator, brand e professionisti, con sottotitoli e musica. Anche con pacchetti mensili.' },
  { n: '06', name: 'Motion Design', text: 'Animazioni di logo, interfacce e grafiche.' },
  { n: '07', name: 'Riprese e regia', text: "Video aziendali, documentari e cortometraggi, dalle riprese al montaggio. Nell'area di Benevento." },
];

export const TEAM = [
  {
    id: 'antonio-pennino', name: 'Antonio Pennino', role: 'Co-founder · Video', jobTitle: 'Video editor e co-founder',
    photo: 'antonio.jpg', photoAlt: 'Ritratto di Antonio Pennino',
    bio: "Video editor dal 2020 per creator, brand e professionisti; per documentari, cortometraggi e video aziendali cura anche riprese e regia. Laureato in Informatica per la Comunicazione Digitale all'Università di Camerino, scrive anche codice: ha creato <a href=\"https://smartsubspro.com/\" target=\"_blank\" rel=\"noopener\">SmartSubs Pro</a>, un plugin per DaVinci Resolve.",
    links: [
      { label: 'antoniopennino.it', href: 'https://antoniopennino.it/' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/antonio-pennino-profile/' },
    ],
  },
  {
    id: 'mariano-iscaro', name: 'Mariano Iscaro', role: 'Co-founder · Design', jobTitle: 'Product designer e co-founder',
    photo: null, photoAlt: '',
    bio: "Product designer: interfacce, prototipi, esperienza utente e identità di marca. Dal 2021 al 2024 ha curato UI/UX, brand identity e web design di FeedEat; oggi è Product Designer in Bandosubito. Gestisce Revoluxio e cosmos_italy. Laureato in Informatica per la Comunicazione Digitale all'Università di Camerino.",
    links: [
      { label: 'Behance', href: 'https://www.behance.net/mariano_iscaro' },
      { label: 'Contra', href: 'https://contra.com/mariano_iscaro' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mariano-iscaro/' },
    ],
  },
];
