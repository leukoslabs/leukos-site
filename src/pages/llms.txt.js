/* llms.txt: riassunto in testo semplice per gli assistenti AI (formato proposto su llmstxt.org). */
import { SITE, SERVICES, TEAM } from '../data/site.js';
import { PROJECTS } from '../data/projects.js';
const plain = (s) => s.replace(/<[^>]+>/g, '');

export function GET({ site }) {
  const u = (p) => new URL(p, site).href;
  const txt = `# Leukos

> ${SITE.description}

Leukos è uno studio creativo con sede a ${SITE.city} (Italia), fondato da Antonio Pennino (video editor) e Mariano Iscaro (product designer). Progetta e realizza direttamente brand, siti, app e video, dall'idea alla consegna, lavorando con pochi clienti alla volta.

- Contatti: WhatsApp e telefono ${SITE.phone}, email ${SITE.email}, call conoscitiva su ${SITE.calendar}
- P.IVA ${SITE.vat} (intestata ad ${SITE.vatHolder}; Leukos è il nome dello studio)

## Servizi

${SERVICES.map((s) => `- ${s.name}: ${s.text}`).join('\n')}

## Pagine

- [Progetti](${u('/progetti/')}): lavori per clienti, startup, produzioni video e concept
- [Servizi](${u('/servizi/')})
- [Come funziona](${u('/come-funziona/')}): call conoscitiva, lavori con revisioni a tappe, consegna
- [Chi siamo](${u('/chi-siamo/')})
- [Contatti](${u('/contatti/')})

## Progetti

${PROJECTS.map((p) => `- [${p.name}](${u(`/progetti/${p.id}/`)}): ${p.cat}. ${plain(p.text[0])}`).join('\n')}

## Team

${TEAM.map((t) => `- ${t.name}, ${t.jobTitle}: ${plain(t.bio)}`).join('\n')}
`;
  return new Response(txt, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
