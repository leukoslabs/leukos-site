/* Tutte le immagini di src/assets/img, per nome file: Astro le ottimizza (webp, più misure). */
const files = import.meta.glob('/src/assets/img/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });
const byName = Object.fromEntries(Object.entries(files).map(([path, mod]) => [path.split('/').pop(), mod]));
export function img(name) {
  const m = byName[name];
  if (!m) throw new Error(`Immagine mancante in src/assets/img: ${name}`);
  return m;
}
/** testo senza tag HTML (per meta description e dati strutturati) */
export const plain = (s) => s.replace(/<[^>]+>/g, '');
