# Leukos — sito

Sito statico di Leukos (HTML, CSS e JavaScript, nessun build).

## Struttura

```
index.html            pagine: home, progetti, servizi, come funziona, chi siamo, contatti
assets/style.css      stili (variabili del design system Leukos in :root)
assets/main.js        dati dei progetti (array PROJECTS) e routing
assets/img/           immagini di hero, processo e progetti
assets/brand/          stella, icona app (favicon) e apple-touch-icon
```

Le pagine usano gli hash (`#progetti`, `#progetto-freshy`, …), quindi funziona su qualsiasi hosting statico.

## Aggiungere o modificare un progetto

In `assets/main.js` modifica l'array `PROJECTS`: `name`, `cat`, `color`, `cover`, `services`, `sector`, `headline`, `text`, `gallery`. Metti le immagini in `assets/img/`.

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
- Icone social e link (Instagram, TikTok, Behance), email di contatto.
- Pagine Privacy Policy e Cookie Policy.
