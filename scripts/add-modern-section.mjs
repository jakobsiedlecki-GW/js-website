import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const distIndex = join(process.cwd(), 'dist', 'index.html')
let html = await readFile(distIndex, 'utf8')

const navBefore = '<a href="#schwerpunkte">Schwerpunkte</a><a href="#vita">Vita</a>'
const navAfter = '<a href="#schwerpunkte">Schwerpunkte</a><a href="#moderne-augenheilkunde">Moderne Diagnostik</a><a href="#vita">Vita</a>'

if (!html.includes('href="#moderne-augenheilkunde"')) {
  html = html.replace(navBefore, navAfter)
}

const flipCardStyles = `
<style>
  .diagnostic-flip-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:28px;margin-top:40px}
  .diagnostic-flip-card{position:relative;width:100%;aspect-ratio:16/11;border:0;padding:0;background:transparent;cursor:pointer;perspective:1400px;border-radius:22px}
  .diagnostic-flip-card:focus-visible{outline:3px solid #0f766e;outline-offset:5px}
  .diagnostic-flip-card-inner{position:relative;width:100%;height:100%;transition:transform .75s cubic-bezier(.2,.7,.2,1);transform-style:preserve-3d}
  .diagnostic-flip-card.is-flipped .diagnostic-flip-card-inner{transform:rotateY(180deg)}
  .diagnostic-flip-face{position:absolute;inset:0;overflow:hidden;border-radius:22px;backface-visibility:hidden;-webkit-backface-visibility:hidden;box-shadow:0 16px 45px rgba(15,23,42,.12);background:#f8fafc}
  .diagnostic-flip-face.back{transform:rotateY(180deg)}
  .diagnostic-flip-face img{display:block;width:100%;height:100%;object-fit:cover}
  .diagnostic-flip-hint{position:absolute;right:14px;bottom:14px;z-index:2;padding:8px 12px;border-radius:999px;background:rgba(255,255,255,.9);color:#334155;font-size:13px;font-weight:600;box-shadow:0 4px 14px rgba(15,23,42,.12);pointer-events:none}
  @media (max-width:760px){.diagnostic-flip-grid{grid-template-columns:1fr;gap:20px}.diagnostic-flip-card{aspect-ratio:16/11}}
  @media (prefers-reduced-motion:reduce){.diagnostic-flip-card-inner{transition:none}}
</style>`

if (!html.includes('.diagnostic-flip-grid')) {
  html = html.replace('</head>', flipCardStyles + '\n</head>')
}

const cards = [
  ['OCT', '/OCT1.png', '/OCT2.png'],
  ['Optos', '/Optos1.png', '/Optos2.png'],
  ['RNFL', '/RNFL1.png', '/RNFL2.png'],
  ['Pentacam', '/Pentacam1.png', '/Pentacam2.png']
]

const cardMarkup = cards.map(([name, front, back]) => `
<button class="diagnostic-flip-card" type="button" aria-label="${name}: Karte umdrehen" aria-pressed="false">
  <span class="diagnostic-flip-card-inner">
    <span class="diagnostic-flip-face front"><img src="${front}" alt="${name} – Vorderseite" loading="lazy"></span>
    <span class="diagnostic-flip-face back"><img src="${back}" alt="${name} – Rückseite" loading="lazy"></span>
  </span>
  <span class="diagnostic-flip-hint">Zum Umdrehen klicken</span>
</button>`).join('')

const vitaMarker = '    <section id="vita">'
const modernSection = `    <section id="moderne-augenheilkunde"><div class="eyebrow">Moderne Diagnostik</div><h2 class="section-title">Präzise Diagnostik – verständlich erklärt</h2><p class="section-text">Moderne Bildgebung macht feinste Veränderungen am Auge sichtbar, häufig lange bevor sie im Alltag bemerkt werden. Gezielte Untersuchungen helfen, Befunde präzise einzuordnen, Therapien individuell zu planen und Veränderungen zuverlässig zu kontrollieren.</p><div class="diagnostic-flip-grid">${cardMarkup}</div><div class="note"><div><strong>Technik mit Augenmaß</strong><small>Entscheidend ist nicht die Zahl der Untersuchungen, sondern die gezielte Auswahl der Diagnostik, die für Ihre persönliche Fragestellung einen echten Mehrwert bietet.</small></div><div>Präzision · Verlaufskontrolle · verständliche Beratung</div></div></section>\n`

if (!html.includes('id="moderne-augenheilkunde"')) {
  html = html.replace(vitaMarker, modernSection + vitaMarker)
}

const flipCardScript = `
<script>
  document.querySelectorAll('.diagnostic-flip-card').forEach((card) => {
    card.addEventListener('click', () => {
      const flipped = card.classList.toggle('is-flipped')
      card.setAttribute('aria-pressed', String(flipped))
      const hint = card.querySelector('.diagnostic-flip-hint')
      if (hint) hint.textContent = flipped ? 'Zur Vorderseite' : 'Zum Umdrehen klicken'
    })
  })
</script>`

if (!html.includes("querySelectorAll('.diagnostic-flip-card')")) {
  html = html.replace('</body>', flipCardScript + '\n</body>')
}

html = html.replace(
  '@media (min-width:761px){#schwerpunkte,#vita,#videos{scroll-margin-top:44px}}',
  '@media (min-width:761px){#schwerpunkte,#moderne-augenheilkunde,#vita,#videos{scroll-margin-top:44px}}'
)

await writeFile(distIndex, html)
console.log('Added Moderne Diagnostik flip-card section to dist/index.html')
