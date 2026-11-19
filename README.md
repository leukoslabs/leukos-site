# Leukos, sito

Sito di Leukos fatto con [Astro](https://astro.build): ogni pagina è un vero file HTML statico (ottimo per Google e per gli assistenti AI), con immagini ottimizzate e solo ~10 kB di JavaScript per animazioni e interazioni.

## Comandi

Serve Node.js 22.23 o successivo.

```
npm install        # la prima volta
npm run dev        # sviluppo su http://localhost:4321
npm run build      # crea il sito finale in dist/
npm run preview    # prova in locale la versione finale
```

## Struttura

```
src/pages/              una pagina per file: index, servizi, come-funziona, chi-siamo, contatti, privacy, cookie, 404
src/pages/progetti/     elenco progetti e pagina di ogni progetto ([id].astro, generata dai dati)
src/pages/llms.txt.js   riassunto testuale per gli assistenti AI (/llms.txt)
src/pages/robots.txt.js robots.txt con il link alla sitemap
src/layouts/Base.astro  <head> (SEO, anteprime social, dati strutturati), nav, footer
src/components/         card progetto, servizi, processo, contatti, intestazioni
src/data/projects.js    dati dei progetti (istruzioni in cima al file)
src/data/site.js        contatti, P.IVA, servizi, team
src/styles/global.css   stili e animazioni (variabili del design system in :root)
src/scripts/motion.js   animazioni, filtri, menu mobile, modulo contatti
src/assets/img/         immagini (Astro le converte in webp in più misure)
public/brand/           stella, icona, apple-touch-icon
public/video/           clip in loop dei progetti (webm + mp4)
public/_headers         cache e intestazioni di sicurezza (Cloudflare Pages, Netlify)
```

Indirizzi: `/progetti/`, `/progetti/nikola-greku/`, `/servizi/`, `/come-funziona/`, `/chi-siamo/`, `/contatti/`, `/privacy/`, `/cookie/`. I vecchi link con `#` (es. `/#progetto-freshy`) portano alle pagine nuove.

## Aggiungere o modificare un progetto

In `src/data/projects.js` modifica l'array `PROJECTS`: `kind` decide il badge, `area` i filtri. Metti le immagini in `src/assets/img/` e i clip in `public/video/` (stesso nome in `.webm` e `.mp4`). La pagina del progetto, la sitemap e `llms.txt` si aggiornano da sole alla build.

## Metterlo online

Hosting statico (Cloudflare Pages, Netlify o Vercel):

- comando di build: `npm run build`
- cartella di output: `dist`
- dominio: **`https://leukoslabs.com`** (in `astro.config.mjs`; si può sovrascrivere con la variabile d'ambiente `SITE_URL`). Serve per URL canonici, sitemap e anteprime social.

Dopo la pubblicazione: aggiungi il sito a Google Search Console e invia `/sitemap-index.xml`.

## Privacy e cookie

Le pagine `/privacy/` e `/cookie/` descrivono il sito com'è oggi: nessuna statistica, nessun cookie, nessun contenuto incorporato da terzi, modulo che apre WhatsApp o l'email. Se aggiungi statistiche (es. Google Analytics), mappe o video incorporati (YouTube), vanno aggiornate e serve un banner di consenso.

## Da completare

- Immagini originali in alta risoluzione (le attuali sono catture a ~1600px).
- Logotipo "Leukos" vettoriale.
- Profili social di Leukos (vanno anche in `sameAs` nei dati strutturati in `Base.astro`).
- Foto di Mariano Iscaro (`photo` in `src/data/site.js`).
- Profilo Google Business (indirizzo, orari, recensioni) per le ricerche locali a Benevento.
