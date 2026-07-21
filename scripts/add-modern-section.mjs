import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const distIndex = join(process.cwd(), 'dist', 'index.html')
let html = await readFile(distIndex, 'utf8')

const navBefore = '<a href="#schwerpunkte">Schwerpunkte</a><a href="#vita">Vita</a>'
const navAfter = '<a href="#schwerpunkte">Schwerpunkte</a><a href="#moderne-augenheilkunde">Moderne Augenheilkunde</a><a href="#vita">Vita</a>'

if (!html.includes('href="#moderne-augenheilkunde"')) {
  html = html.replace(navBefore, navAfter)
}

const vitaMarker = '    <section id="vita">'
const modernSection = `    <section id="moderne-augenheilkunde"><div class="eyebrow">Moderne Augenheilkunde</div><h2 class="section-title">Präzise Diagnostik – verständlich erklärt</h2><p class="section-text">Moderne Bildgebung macht feinste Veränderungen am Auge sichtbar, häufig lange bevor sie im Alltag bemerkt werden. Ich setze gezielte Untersuchungen ein, um Befunde präzise einzuordnen, Therapien individuell zu planen und Veränderungen zuverlässig zu kontrollieren.</p><div class="grid-2" style="margin-top:40px"><div class="card soft-mint"><div class="card-body"><div style="font-size:24px;font-weight:600;color:#0f172a">Netzhaut und Sehnerv</div><p style="margin-top:14px;color:#64748b;line-height:1.8">OCT und hochauflösende Netzhautbildgebung ermöglichen eine schichtgenaue Beurteilung von Makula und Sehnerv – etwa bei Makuladegeneration, diabetischen Veränderungen oder Glaukom.</p></div></div><div class="card soft-rose"><div class="card-body"><div style="font-size:24px;font-weight:600;color:#0f172a">Weitwinkel-Netzhautdiagnostik</div><p style="margin-top:14px;color:#64748b;line-height:1.8">Weitwinkelaufnahmen erfassen große Bereiche der Netzhaut in einer einzigen Aufnahme. So können auch Veränderungen in der äußeren Netzhaut dokumentiert und im Verlauf verglichen werden.</p></div></div><div class="card"><div class="card-body"><div style="font-size:24px;font-weight:600;color:#0f172a">Hornhaut und Vorderabschnitt</div><p style="margin-top:14px;color:#64748b;line-height:1.8">Die präzise Vermessung von Hornhaut, Vorderkammer und Linse unterstützt die Diagnostik von Hornhauterkrankungen sowie die sorgfältige Planung einer Linsenoperation.</p></div></div><div class="card"><div class="card-body"><div style="font-size:24px;font-weight:600;color:#0f172a">Individuelle Operationsplanung</div><p style="margin-top:14px;color:#64748b;line-height:1.8">Biometrie und moderne Berechnungsverfahren helfen dabei, Kunstlinsen individuell auszuwählen und operative Eingriffe möglichst exakt auf das jeweilige Auge abzustimmen.</p></div></div></div><div class="note"><div><strong>Technik mit Augenmaß</strong><small>Entscheidend ist nicht die Zahl der Untersuchungen, sondern die gezielte Auswahl der Diagnostik, die für Ihre persönliche Fragestellung einen echten Mehrwert bietet.</small></div><div>Präzision · Verlaufskontrolle · verständliche Beratung</div></div></section>\n`

if (!html.includes('id="moderne-augenheilkunde"')) {
  html = html.replace(vitaMarker, modernSection + vitaMarker)
}

html = html.replace(
  '@media (min-width:761px){#schwerpunkte,#vita,#videos{scroll-margin-top:44px}}',
  '@media (min-width:761px){#schwerpunkte,#moderne-augenheilkunde,#vita,#videos{scroll-margin-top:44px}}'
)

await writeFile(distIndex, html)
console.log('Added Moderne Augenheilkunde section to dist/index.html')
