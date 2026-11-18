# Leukos, sito

Sito statico di Leukos (HTML, CSS e JavaScript, nessun build).

## Struttura

```
index.html            pagine: home, progetti, servizi, come funziona, chi siamo, contatti
assets/style.css      stili (variabili del design system Leukos in :root)
assets/projects.js    dati dei progetti (array PROJECTS): testi, immagini, link, numeri
assets/main.js        routing, animazioni, modulo contatti
assets/video/         clip in loop dei progetti video (vedi README dentro)
assets/img/           immagini di hero, processo e progetti
assets/brand/          stella, icona app (favicon) e apple-touch-icon
```

Le pagine usano gli hash (`#progetti`, `#progetto-freshy`, …), quindi funziona su qualsiasi hosting statico.

## Aggiungere o modificare un progetto

In `assets/projects.js` modifica l'array `PROJECTS` (le istruzioni sono in cima al file). `kind` decide il badge (Cliente, Startup, Produzione, Concept), `area` i filtri. Metti le immagini in `assets/img/` e i clip in `assets/video/`.

## Modulo contatti

Non serve un server: il modulo prepara il messaggio e lo apre su WhatsApp (+39 329 982 6583) o nell'app email (labsleukos@gmail.com). Numero ed email sono in cima alla funzione `wireContact` in `assets/main.js`.

## Vederlo in locale

```
npx serve .
```
oppure apri `index.html` nel browser.

## Metterlo online

Hosting statico (Vercel, Netlify, GitHub Pages, Cloudflare Pages): nessun comando di build, cartella di output = radice del repo. Poi collega il dominio dal pannello dell'hosting.

## Da completare

- Sostituire le immagini con i file originali in alta risoluzione (quelle attuali sono catture a ~1600px dalla bozza Framer).
- Logotipo "Leukos" vettoriale (la stella è già quella ufficiale; il testo è ancora composto con i font).
- Profili social di Leukos (Instagram, TikTok, Behance).
- Foto di Mariano Iscaro (in `assets/img/`, poi sostituire il riquadro "Foto in arrivo" in `index.html`).
- Copiare i clip webm in `assets/video/`.
- Pagine Privacy Policy e Cookie Policy.
