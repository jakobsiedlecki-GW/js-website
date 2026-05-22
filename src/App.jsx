import { useState } from 'react'

const positions = [
  'Oberarzt an der Augenklinik des LMU Klinikums München',
  'Tätigkeit in der Praxis Dr. Vlachou-Vaterrodt, Grünwald bei München',
]

const highlights = [
  'Linsenchirurgie (Grauer Star, "Katarakt")',
  'Makula-Therapie (IVOM, Laser, Diagnostik)',
  'Augenärztliche Vorsorge (Sehfehler, Brillenverordnung u.v.m.)',
  'Glaukomdiagnostik und -therapie',
  'Netzhaut- und Makulachirurgie (Epiretinale Gliose, Makulaforamen u.v.m.)',
  'Therapie des Trockenen Auges',
  'Lasertherapie',
  'Hornhauterkrankungen',
  'Zweitmeinung',
]

const timeline = [
  ['seit 2023', 'Zusätzliche konservative und chirurgische Tätigkeit in Niederlassung (Grünwald)'],
  ['10/2021', 'Ernennung zum Oberarzt für ophthalmologische Vorder- und Hinterabschnittschirurgie mit Schwerpunkt Linsen- und Netzhautchirurgie sowie medikamentöser Makulatherapie'],
  ['08/2021', 'Habilitation im Fach Augenheilkunde an der LMU München und Ernennung zum Privatdozenten'],
  ['03/2021', 'Facharztanerkennung und FEBO'],
  ['2019', 'Experimentelle Promotion (summa cum laude) zur Therapieoptimierung der feuchten AMD'],
  ['2015 bis 2021', 'Weiterbildung zum Facharzt für Augenheilkunde an der Augenklinik und Poliklinik des Klinikums der Universität München'],
  ['2015', 'Staatsexamen und Approbation als Arzt'],
  ['2008 bis 2015', 'Medizinstudium an der LMU München und der Technischen Universität München'],
]

const research = [
  '>10 Jahre Lehrtätigkeit in der Augenheilkunde',
  'Regelmäßige nationale und internationale Fachvorträge und Mitarbeit in zahlreichen Fortbildungsformaten',
  'Autor zahlreicher Buchkapitel zur Augenchirurgie und spezialisierten Diagnostik',
  'Medizinischer Sachverständiger in augenärztlichen Streitfragen',
  'Betreuung von Doktorandinnen und Doktoranden',
  'Mitglied zahlreicher Fachgesellschaften (DOG, RG, EURETINA, ARVO, AAO u.v.m.)',
]

const videos = [
  {
    title: 'Die altersbedingte Makuladegeneration (AMD) – weit verbreitet, aber kaum bekannt.',
    embedUrl: 'https://www.youtube.com/embed/MrGrB5dzV0U',
    thumbnailUrl: 'https://i.ytimg.com/vi/MrGrB5dzV0U/hqdefault.jpg',
  },
  {
    title: 'Checker-Tobi: Der Augen-Check',
    embedUrl: 'https://www.youtube.com/embed/N9L75KJIktk',
    thumbnailUrl: 'https://i.ytimg.com/vi/N9L75KJIktk/hqdefault.jpg',
  },
  {
    title: 'Retina-Sprechstunde (Teil 1)',
    embedUrl: 'https://www.youtube.com/embed/VjFzIsMXSnk',
    thumbnailUrl: 'https://i.ytimg.com/vi/VjFzIsMXSnk/hqdefault.jpg',
  },
  {
    title: 'Retina-Sprechstunde (Teil 2)',
    embedUrl: 'https://www.youtube.com/embed/To78wfcSCJE',
    thumbnailUrl: 'https://i.ytimg.com/vi/To78wfcSCJE/hqdefault.jpg',
  },
]

const styles = `
  :root {
    --bg-1: #f8fbfb;
    --bg-2: #f6f4f1;
    --card: rgba(255,255,255,0.92);
    --text: #1f2937;
    --muted: #64748b;
    --mint: #eef4f2;
    --rose: #f5efe9;
    --shadow: 0 10px 40px rgba(15, 23, 42, 0.06);
  }
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: var(--text); background: linear-gradient(180deg, var(--bg-1) 0%, var(--bg-2) 44%, #fff 100%); }
  a { color: inherit; text-decoration: none; }
  button { font: inherit; }
  .container { width: min(1180px, calc(100% - 48px)); margin: 0 auto; }
  .header { position: sticky; top: 0; z-index: 30; border-bottom: 1px solid rgba(255,255,255,.7); background: rgba(255,255,255,.82); backdrop-filter: blur(14px); }
  .header-inner { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 16px 0; }
  .eyebrow { font-size: 12px; color: var(--muted); text-transform: uppercase; letter-spacing: .24em; }
  .brand-title { font-weight: 600; color: #0f172a; }
  .nav { display: flex; flex-wrap: wrap; gap: 8px; }
  .nav a, .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; border-radius: 999px; padding: 10px 16px; font-size: 14px; transition: .2s ease; }
  .nav a:hover { background: #f1f5f9; }
  .btn { border: none; cursor: pointer; }
  .btn-dark { background: #0f172a; color: #fff; }
  .btn-light { background: #fff; border: 1px solid #cbd5e1; color: #0f172a; }
  .btn-light:hover { background: #f8fafc; }
  .hero { display: grid; grid-template-columns: 1.03fr .97fr; gap: 40px; align-items: start; padding: 48px 0 56px; }
  .badge { display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: 999px; border: 1px solid #e2e8f0; background: rgba(255,255,255,.92); color: var(--muted); font-size: 14px; box-shadow: 0 1px 2px rgba(15,23,42,.04); }
  h1 { margin: 24px 0 0; font-size: clamp(40px, 5vw, 64px); line-height: 1.03; letter-spacing: -.03em; font-weight: 600; color: #0f172a; }
  .lead { margin-top: 24px; max-width: 760px; font-size: 20px; line-height: 1.8; color: var(--muted); }
  .grid-2,.grid-3 { display: grid; gap: 16px; }
  .grid-2 { grid-template-columns: repeat(2, minmax(0,1fr)); }
  .grid-3 { grid-template-columns: repeat(3, minmax(0,1fr)); }
  .card { border: 1px solid rgba(255,255,255,.8); background: var(--card); border-radius: 2rem; box-shadow: var(--shadow); }
  .card-body { padding: 24px; }
  .soft-mint { background: var(--mint); }
  .soft-rose { background: var(--rose); }
  .icon-row { display:flex; gap:14px; align-items:flex-start; }
  .icon-box { flex: 0 0 40px; width: 40px; height: 40px; border-radius: 16px; background: #f1f5f9; display:flex; align-items:center; justify-content:center; color:#94a3b8; }
  .photo-wrap { position: relative; align-self: start; }
  .photo-glow { position:absolute; inset:0; border-radius:2rem; background: radial-gradient(circle at top right, #e7efec, transparent 38%), radial-gradient(circle at bottom left, #f3e8e0, transparent 30%); filter: blur(30px); }
  .photo-frame { position:relative; overflow:hidden; border-radius:2rem; border:1px solid rgba(255,255,255,.8); background:#fff; box-shadow:0 20px 60px rgba(15,23,42,.12); aspect-ratio:4/5; width:min(100%, 380px); margin:0 auto; }
  .photo-frame img { width:100%; height:100%; object-fit:cover; display:block; }
  .photo-caption { margin-top:16px; text-align:center; font-size:20px; font-weight:600; color:#0f172a; }
  section { padding: 36px 0; scroll-margin-top: 86px; }
  .section-title { margin:0; font-size: clamp(32px, 3.5vw, 42px); line-height: 1.08; letter-spacing:-.03em; color:#0f172a; }
  .section-text { margin-top:16px; max-width:760px; font-size:18px; line-height:1.8; color:var(--muted); }
  .profile-focus, .vita-grid, .contact-grid, .legal-grid { display:grid; gap:24px; }
  .profile-focus { grid-template-columns: .85fr 1.15fr; }
  .vita-grid, .contact-grid, .legal-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
  .stack { display:grid; gap:12px; margin-top:24px; }
  .stack-item { padding:16px; border-radius:20px; background: rgba(255,255,255,.75); line-height:1.75; color:#334155; }
  .goal { padding:16px; color:#9a6a55; font-weight:600; line-height:1.75; }
  .highlight-box { position:relative; overflow:hidden; min-height:260px; border-radius:2rem; border:1px solid rgba(255,255,255,.8); background:linear-gradient(135deg, #edf5f2, #fff 55%, #e9f1ef); }
  .highlight-box::before { content:''; position:absolute; inset:0; background: radial-gradient(circle at top right, rgba(255,255,255,.95), transparent 35%), radial-gradient(circle at bottom left, rgba(226,232,240,.55), transparent 38%); }
  .highlight-label { position:absolute; left:22px; right:22px; bottom:22px; padding:16px; border-radius:20px; background:rgba(255,255,255,.9); backdrop-filter: blur(8px); text-align:center; font-weight:600; color:#0f172a; line-height:1.5; }
  .inner-frame { margin-top:30px; overflow:hidden; border-radius:24px; border:1px solid #e2e8f0; background:#fff; }
  .inner-list { display:grid; gap:12px; padding:12px; }
  .inner-item { padding:16px 20px; border-radius:20px; background:rgba(255,255,255,.7); color:#334155; line-height:1.8; }
  .inner-item strong { display:block; margin-bottom:4px; font-size:14px; color:var(--muted); }
  .video-grid { display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap:24px; margin-top:40px; }
  .video-frame { aspect-ratio:16/9; background:#f1f5f9; }
  .video-frame iframe { width:100%; height:100%; border:0; display:block; }
  .video-placeholder { position: relative; aspect-ratio: 16/9; display:flex; align-items:center; justify-content:center; overflow:hidden; background-size: cover; background-position: center; background-repeat: no-repeat; }
  .video-placeholder::before { content: ''; position: absolute; inset: 0; background: rgba(15, 23, 42, 0.48); }
  .video-placeholder-content { position: relative; z-index: 1; max-width: 520px; padding: 28px; text-align:center; color:#fff; }
  .video-placeholder-title { font-size:20px; font-weight:600; color:#fff; }
  .video-placeholder-text { margin-top:10px; max-width:460px; color:rgba(255,255,255,0.92); line-height:1.7; }
  .video-activate { margin-top:18px; border:1px solid rgba(255,255,255,0.7); background:rgba(255,255,255,0.95); color:#0f172a; border-radius:999px; padding:12px 18px; font-size:14px; cursor:pointer; }
  .video-activate:hover { background:#ffffff; }
  .video-title { padding:22px 24px 24px; font-size:22px; line-height:1.4; font-weight:600; color:#0f172a; }
  .note { margin-top:32px; display:flex; justify-content:space-between; align-items:center; gap:16px; padding:22px 24px; border-radius:24px; background:#0f172a; color:#fff; }
  .note small { display:block; margin-top:4px; color:#cbd5e1; }
  .privacy { margin-top:24px; padding:22px 24px; border-radius:24px; border:1px solid #e2e8f0; background:#fbfbfa; color:#475569; font-size:14px; line-height:1.75; scroll-margin-top: 86px; }
  .privacy h3 { margin:0 0 12px; font-size:24px; color:#0f172a; }
  .privacy h4 { margin:24px 0 8px; font-size:17px; color:#0f172a; }
  .privacy p { margin:10px 0 0; }
  .privacy ul { margin:10px 0 0 22px; padding:0; }
  .privacy-actions { display:flex; flex-wrap:wrap; gap:12px; margin-top:18px; }
  .legal-links { margin-top: 14px; color:#475569; }
  .legal-links a { text-decoration: underline; text-underline-offset: 3px; }
  .legal-footnote { display:flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:10px; padding:20px 0 40px; color:var(--muted); font-size:12px; }
  .legal-footnote a, .footer-link { color: inherit; text-decoration: underline; text-underline-offset: 3px; }
  .footer-link { border: 0; background: transparent; padding: 0; cursor: pointer; font-size: inherit; }
  @media (max-width: 1024px) { .hero,.profile-focus,.vita-grid,.contact-grid,.legal-grid { grid-template-columns:1fr; } .grid-3,.grid-2,.video-grid { grid-template-columns:1fr 1fr; } }
  @media (max-width: 760px) {
    .container { width:min(100% - 28px, 1180px); }
    .header-inner { display:grid; }
    .nav { display:none; }
    .grid-3,.grid-2,.video-grid { grid-template-columns:1fr; }
    .note { flex-direction:column; align-items:flex-start; }
    h1 { font-size:40px; }
    .lead { font-size:18px; }
    .photo-caption { font-size:18px; }
    section, .privacy { scroll-margin-top: 58px; }
  }
`

function IconHospital() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 21V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14" /><path d="M9 21v-4h6v4" /><path d="M12 8v6" /><path d="M9 11h6" /></svg>
}

function PrivacyPolicy({ openCookieSettings }) {
  return (
    <div className="privacy" id="datenschutz">
      <h3>Datenschutzerklärung</h3>
      <p>Informationen zur Verarbeitung personenbezogener Daten beim Besuch dieser Website.</p>
      <p><strong>Stand: Mai 2026</strong></p>

      <h4>1. Verantwortlicher</h4>
      <p>Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:</p>
      <p>PD Dr. med. Jakob Siedlecki, FEBO<br />Südliche Münchner Str. 20<br />82031 Grünwald<br />Deutschland</p>
      <p>E-Mail: <a href="mailto:jakob@eyepinion.de">jakob@eyepinion.de</a><br />Telefon: 089 6492969</p>

      <h4>2. Allgemeine Hinweise zur Datenverarbeitung</h4>
      <p>Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung dieser Website, zur Bearbeitung von Anfragen oder aufgrund gesetzlicher Vorgaben erforderlich ist.</p>
      <p>Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen, zum Beispiel Name, Kontaktdaten, IP-Adresse oder Nutzungsdaten.</p>
      <p>Die Verarbeitung erfolgt insbesondere auf Grundlage der Datenschutz-Grundverordnung (DSGVO) sowie des Telekommunikation-Digitale-Dienste-Datenschutz-Gesetzes (TDDDG).</p>

      <h4>3. Hosting und Server-Logfiles</h4>
      <p>Diese Website wird gehostet bei:</p>
      <p>IONOS SE<br />Elgendorfer Str. 57<br />56410 Montabaur<br />Deutschland</p>
      <p>Beim Aufruf dieser Website verarbeitet der Hosting-Anbieter technisch notwendige Daten in sogenannten Server-Logfiles. Hierzu können insbesondere folgende Daten gehören:</p>
      <ul>
        <li>IP-Adresse</li>
        <li>Datum und Uhrzeit des Zugriffs</li>
        <li>aufgerufene Seiten und Dateien</li>
        <li>übertragene Datenmenge</li>
        <li>Browsertyp und Browserversion</li>
        <li>verwendetes Betriebssystem</li>
        <li>Referrer-URL</li>
        <li>Hostname des zugreifenden Rechners</li>
      </ul>
      <p>Die Verarbeitung dieser Daten erfolgt, um die Website sicher, stabil und funktionsfähig bereitzustellen sowie zur Erkennung und Abwehr von Angriffen oder Missbrauch.</p>
      <p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der sicheren und technisch fehlerfreien Bereitstellung dieser Website.</p>
      <p>Soweit der Hosting-Anbieter personenbezogene Daten in unserem Auftrag verarbeitet, erfolgt dies auf Grundlage eines Vertrags zur Auftragsverarbeitung gemäß Art. 28 DSGVO.</p>
      <p>Weitere Informationen zum Datenschutz bei IONOS finden Sie unter: <a href="https://www.ionos.de/terms-gtc/datenschutzerklaerung/" target="_blank" rel="noreferrer">https://www.ionos.de/terms-gtc/datenschutzerklaerung/</a></p>

      <h4>4. Cookies und vergleichbare Technologien</h4>
      <p>Diese Website verwendet Cookies und vergleichbare Technologien, soweit diese für den Betrieb der Website, die Darstellung von Inhalten oder die Speicherung Ihrer Datenschutzeinstellungen erforderlich sind.</p>
      <p>Technisch notwendige Cookies können ohne vorherige Einwilligung eingesetzt werden, soweit sie für den Betrieb der Website oder zur Bereitstellung ausdrücklich gewünschter Funktionen erforderlich sind. Rechtsgrundlage für den Zugriff auf Ihr Endgerät ist § 25 Abs. 2 TDDDG. Die anschließende Verarbeitung personenbezogener Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO, soweit nicht eine andere Rechtsgrundlage einschlägig ist.</p>
      <p>Soweit für einzelne Dienste eine Einwilligung erforderlich ist, erfolgt der Zugriff auf Ihr Endgerät auf Grundlage von § 25 Abs. 1 TDDDG und die anschließende Verarbeitung personenbezogener Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO.</p>
      <p>Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft über den Link „Datenschutzeinstellungen“ ändern oder widerrufen.</p>

      <h4>5. Consent-Management mit Cookiebot</h4>
      <p>Diese Website verwendet Cookiebot zur Verwaltung von Cookie-Einwilligungen.</p>
      <p>Anbieter ist:</p>
      <p>Cybot A/S<br />Havnegade 39<br />1058 Kopenhagen<br />Dänemark</p>
      <p>Beim ersten Besuch der Website wird ein Cookie-Banner angezeigt. Cookiebot verarbeitet dabei Informationen über Ihre Einwilligungsentscheidung, um diese zu dokumentieren und bei späteren Besuchen zu berücksichtigen.</p>
      <p>Dabei können insbesondere folgende Daten verarbeitet werden:</p>
      <ul>
        <li>IP-Adresse in gekürzter oder anonymisierter Form</li>
        <li>Datum und Uhrzeit der Einwilligung</li>
        <li>Angaben zum verwendeten Browser</li>
        <li>URL, von der die Einwilligung erteilt wurde</li>
        <li>Einwilligungsstatus</li>
        <li>eine anonyme, zufällig generierte ID</li>
      </ul>
      <p>Die Verarbeitung erfolgt zur Einholung, Verwaltung und Dokumentation von Einwilligungen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. c DSGVO in Verbindung mit Art. 7 Abs. 1 DSGVO, soweit gesetzliche Nachweispflichten bestehen. Im Übrigen erfolgt die Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der rechtssicheren Verwaltung von Einwilligungen.</p>
      <p>Der Einsatz technisch notwendiger Cookies durch Cookiebot erfolgt auf Grundlage von § 25 Abs. 2 TDDDG.</p>
      <p>Soweit Cookiebot personenbezogene Daten in unserem Auftrag verarbeitet, erfolgt dies auf Grundlage eines Vertrags zur Auftragsverarbeitung gemäß Art. 28 DSGVO.</p>
      <p>Weitere Informationen zum Datenschutz bei Cookiebot finden Sie unter: <a href="https://www.cookiebot.com/de/privacy-policy/" target="_blank" rel="noreferrer">https://www.cookiebot.com/de/privacy-policy/</a></p>

      <h4>6. YouTube-Videos</h4>
      <p>Auf dieser Website sind Videos von YouTube eingebunden. Anbieter ist:</p>
      <p>Google Ireland Limited<br />Gordon House<br />Barrow Street<br />Dublin 4<br />Irland</p>
      <p>Die Einbindung erfolgt über eine sogenannte Facade- oder Zwei-Klick-Lösung. Beim bloßen Aufruf der Seite wird keine Verbindung zu den Servern von YouTube oder Google hergestellt. Erst wenn Sie aktiv auf ein Video klicken, wird eine Verbindung zu YouTube aufgebaut und das Video geladen.</p>
      <p>Beim Aktivieren eines YouTube-Videos können personenbezogene Daten an Google übermittelt werden. Hierzu können insbesondere Ihre IP-Adresse, technische Informationen zu Ihrem Browser und Endgerät sowie Informationen über die aufgerufene Seite gehören. Wenn Sie in Ihrem Google-Konto angemeldet sind, kann Google die Nutzung des Videos Ihrem Benutzerkonto zuordnen.</p>
      <p>Dabei kann auch eine Übermittlung personenbezogener Daten in Drittländer, insbesondere die USA, nicht ausgeschlossen werden.</p>
      <p>Rechtsgrundlage für die Verarbeitung ist Ihre Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO sowie, soweit Informationen auf Ihrem Endgerät gespeichert oder ausgelesen werden, § 25 Abs. 1 TDDDG. Die Einwilligung erfolgt durch Ihre aktive Betätigung des Videos.</p>
      <p>Sie können eine erteilte Einwilligung jederzeit mit Wirkung für die Zukunft über den Link „Datenschutzeinstellungen“ ändern oder widerrufen.</p>
      <p>Weitere Informationen zum Datenschutz bei Google finden Sie unter: <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">https://policies.google.com/privacy</a></p>

      <h4>7. Kontaktaufnahme per E-Mail oder Telefon</h4>
      <p>Wenn Sie uns per E-Mail oder Telefon kontaktieren, verarbeiten wir die von Ihnen mitgeteilten personenbezogenen Daten zur Bearbeitung Ihrer Anfrage.</p>
      <p>Hierzu können insbesondere folgende Daten gehören:</p>
      <ul>
        <li>Name</li>
        <li>Kontaktdaten</li>
        <li>Inhalt Ihrer Anfrage</li>
        <li>Zeitpunkt der Kontaktaufnahme</li>
        <li>gegebenenfalls weitere von Ihnen freiwillig übermittelte Informationen</li>
      </ul>
      <p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit einer vertraglichen oder vorvertraglichen Beziehung zusammenhängt. In allen übrigen Fällen erfolgt die Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der sachgerechten Bearbeitung Ihrer Anfrage.</p>
      <p>Die Daten werden gelöscht, sobald sie für die Bearbeitung Ihrer Anfrage nicht mehr erforderlich sind, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</p>
      <p>Bitte beachten Sie, dass die Kommunikation per E-Mail Sicherheitslücken aufweisen kann. Eine lückenlose Vertraulichkeit bei der Übermittlung per E-Mail kann nicht gewährleistet werden.</p>

      <h4>8. Empfänger personenbezogener Daten</h4>
      <p>Eine Weitergabe personenbezogener Daten erfolgt nur, soweit dies zur Bereitstellung der Website, zur Bearbeitung Ihrer Anfrage, zur Erfüllung gesetzlicher Pflichten oder auf Grundlage Ihrer Einwilligung erforderlich ist.</p>
      <p>Empfänger personenbezogener Daten können insbesondere sein:</p>
      <ul>
        <li>Hosting-Anbieter</li>
        <li>technische Dienstleister</li>
        <li>Anbieter des Consent-Management-Tools</li>
        <li>Anbieter eingebundener Dienste, sofern Sie diese aktiv nutzen</li>
      </ul>
      <p>Eine darüber hinausgehende Weitergabe personenbezogener Daten erfolgt nicht ohne Ihre Einwilligung, es sei denn, wir sind gesetzlich dazu verpflichtet.</p>

      <h4>9. Speicherdauer</h4>
      <p>Wir speichern personenbezogene Daten nur so lange, wie dies für die jeweiligen Verarbeitungszwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.</p>
      <p>Server-Logfiles werden nur für den Zeitraum gespeichert, der zur Sicherstellung des technischen Betriebs, zur Fehleranalyse und zur Abwehr von Angriffen erforderlich ist.</p>
      <p>Daten aus Kontaktanfragen werden gelöscht, sobald die jeweilige Anfrage abschließend bearbeitet wurde, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</p>
      <p>Einwilligungsdaten werden so lange gespeichert, wie dies zur Dokumentation der erteilten oder widerrufenen Einwilligung erforderlich ist.</p>

      <h4>10. Ihre Rechte</h4>
      <p>Sie haben nach Maßgabe der gesetzlichen Vorschriften folgende Rechte:</p>
      <ul>
        <li>Recht auf Auskunft über die von uns verarbeiteten personenbezogenen Daten gemäß Art. 15 DSGVO</li>
        <li>Recht auf Berichtigung unrichtiger personenbezogener Daten gemäß Art. 16 DSGVO</li>
        <li>Recht auf Löschung personenbezogener Daten gemäß Art. 17 DSGVO</li>
        <li>Recht auf Einschränkung der Verarbeitung gemäß Art. 18 DSGVO</li>
        <li>Recht auf Datenübertragbarkeit gemäß Art. 20 DSGVO</li>
        <li>Recht auf Widerspruch gegen bestimmte Verarbeitungen gemäß Art. 21 DSGVO</li>
        <li>Recht auf Widerruf einer erteilten Einwilligung gemäß Art. 7 Abs. 3 DSGVO</li>
      </ul>
      <p>Wenn die Verarbeitung auf Ihrer Einwilligung beruht, können Sie diese jederzeit mit Wirkung für die Zukunft widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt unberührt.</p>

      <h4>11. Widerspruchsrecht nach Art. 21 DSGVO</h4>
      <p>Wenn wir personenbezogene Daten auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO verarbeiten, haben Sie das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit Widerspruch gegen diese Verarbeitung einzulegen.</p>
      <p>Legen Sie Widerspruch ein, verarbeiten wir Ihre personenbezogenen Daten nicht mehr, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.</p>

      <h4>12. Beschwerderecht bei der Aufsichtsbehörde</h4>
      <p>Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen Datenschutzrecht verstößt.</p>
      <p>Zuständige Aufsichtsbehörde ist insbesondere:</p>
      <p>Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)<br />Promenade 18<br />91522 Ansbach<br />Deutschland</p>
      <p>Website: <a href="https://www.lda.bayern.de" target="_blank" rel="noreferrer">https://www.lda.bayern.de</a></p>

      <h4>13. Datensicherheit</h4>
      <p>Wir treffen technische und organisatorische Maßnahmen, um personenbezogene Daten gegen Verlust, Missbrauch, unbefugten Zugriff, Veränderung oder Offenlegung zu schützen.</p>
      <p>Die Übertragung dieser Website erfolgt verschlüsselt per HTTPS, sofern die SSL-/TLS-Verschlüsselung auf der Website aktiviert ist. Eine verschlüsselte Verbindung erkennen Sie an „https://“ in der Adresszeile Ihres Browsers.</p>

      <h4>14. Änderung dieser Datenschutzerklärung</h4>
      <p>Wir behalten uns vor, diese Datenschutzerklärung anzupassen, wenn sich technische, rechtliche oder organisatorische Änderungen ergeben.</p>

      <h4>15. Kontakt bei Datenschutzfragen</h4>
      <p>Bei Fragen zum Datenschutz wenden Sie sich bitte an:</p>
      <p>PD Dr. med. Jakob Siedlecki, FEBO<br />Südliche Münchner Str. 20<br />82031 Grünwald<br />Deutschland</p>
      <p>E-Mail: <a href="mailto:jakob@eyepinion.de">jakob@eyepinion.de</a><br />Telefon: 089 6492969</p>

      <div className="privacy-actions"><button type="button" className="btn btn-light" onClick={openCookieSettings}>Datenschutzeinstellungen</button></div>
    </div>
  )
}

function App() {
  const [activatedVideos, setActivatedVideos] = useState({})
  const [showPrivacy, setShowPrivacy] = useState(true)

  const activateVideo = (title) => {
    setActivatedVideos((current) => ({ ...current, [title]: true }))
  }

  const openCookieSettings = () => {
    if (window.Cookiebot?.renew) {
      window.Cookiebot.renew()
    }
  }

  const showPrivacyPolicy = () => {
    setShowPrivacy(true)
    window.setTimeout(() => {
      document.getElementById('datenschutz')?.scrollIntoView({ behavior: 'smooth' })
    }, 0)
  }

  return (
    <>
      <style>{styles}</style>
      <div className="header">
        <div className="container header-inner">
          <div>
            <div className="eyebrow">Augenheilkunde</div>
            <div className="brand-title">PD Dr. med. Jakob Siedlecki, FEBO</div>
          </div>
          <nav className="nav">
            <a href="#schwerpunkte">Schwerpunkte</a>
            <a href="#vita">Vita</a>
            <a href="#videos">Videos</a>
            <a href="#kontakt" className="btn btn-dark">Kontakt</a>
          </nav>
        </div>
      </div>
      <main className="container">
        <section className="hero">
          <div>
            <div className="badge">Für Patientinnen und Patienten</div>
            <h1>Augenheilkunde mit Sorgfalt,<br />Präzision und persönlicher Begleitung</h1>
            <p className="lead">Ich begleite Patientinnen und Patienten mit moderner Diagnostik, präziser operativer Expertise und einer verständlichen Aufklärung – von der ersten Beratung bis zur Nachsorge.</p>
            <div className="grid-2" style={{ marginTop: 32 }}>
              {positions.map((item) => (
                <div className="card" key={item}>
                  <div className="card-body icon-row">
                    <div className="icon-box"><IconHospital /></div>
                    <div>{item}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32 }}>
              <a className="btn btn-dark" href="#kontakt">Termin &amp; Kontakt</a>
              <a className="btn btn-light" href="#videos">Videos</a>
            </div>
          </div>
          <div className="photo-wrap">
            <div className="photo-glow" />
            <div className="photo-frame"><img src="/jakob-siedlecki.jpeg" alt="PD Dr. med. Jakob Siedlecki, FEBO" /></div>
            <div className="photo-caption">PD Dr. med. Jakob Siedlecki, FEBO</div>
          </div>
        </section>

        <section className="profile-focus">
          <div className="card soft-rose"><div className="card-body"><div className="eyebrow">Profil</div><div style={{ marginTop: 12, fontSize: 28, fontWeight: 600, color: '#0f172a' }}>PD Dr. med. Jakob Siedlecki, FEBO</div><p style={{ marginTop: 12, color: '#64748b', lineHeight: 1.75 }}>Augenarzt für konservative und operative Augenheilkunde</p><div className="stack"><div className="stack-item">Oberarzt an der Augenklinik des LMU Klinikums München</div><div className="stack-item">Spezialisierung in mikroinvasiver Augenchirurgie (&gt;15,000 Eingriffe)</div><div className="stack-item">Wissenschaftlicher Schwerpunkt in Augenchirurgie, OCT-Diagnostik und Makula-Therapie</div><div className="goal">Mein Ziel: Ein gemeinsamer Weg zur Lösung Ihres Problems</div></div></div></div>
          <div className="card"><div className="card-body"><div style={{ fontSize: 22, fontWeight: 600, color: '#0f172a' }}>Behandlung mit Fokus auf Präzision</div><p style={{ marginTop: 14, color: '#64748b', lineHeight: 1.9 }}>Mein Schwerpunkt liegt auf einer klaren, evidenzbasierten Augenheilkunde mit besonderem Fokus auf moderner Diagnostik und Bildgebung, minimalinvasiver Augenchirurgie sowie der Langzeitbetreuung chronischer Erkrankungen (Grüner Star, Hornhauterkrankungen, u.v.m.).</p><div className="grid-2" style={{ marginTop: 24 }}><div className="stack-item" style={{ background: '#f8fafc' }}>Sorgfältige Diagnostik und präzise Einschätzung</div><div className="stack-item" style={{ background: '#f8fafc' }}>Patientenverständliche Erklärung aller Schritte</div><div className="stack-item" style={{ background: '#f8fafc' }}>Individuelle Therapieempfehlung statt Standardlösung</div><div className="stack-item" style={{ background: '#f8fafc' }}>Begleitung vor, während und nach Eingriffen</div></div></div></div>
        </section>

        <section id="schwerpunkte">
          <div className="eyebrow">Schwerpunkte</div>
          <h2 className="section-title">Wobei ich Sie unterstütze</h2>
          <div className="grid-3" style={{ marginTop: 40 }}>{highlights.map((h) => <div className="card" key={h}><div className="card-body"><div className="highlight-box"><div className="highlight-label">{h}</div></div></div></div>)}</div>
        </section>

        <section id="vita">
          <div className="eyebrow">Vita</div>
          <h2 className="section-title">Laufbahn und Wissenschaft</h2>
          <div className="vita-grid" style={{ marginTop: 40 }}>
            <div className="card soft-mint"><div className="card-body"><div style={{ fontSize: 30, fontWeight: 600, color: '#0f172a' }}>Medizinische Laufbahn</div><div className="inner-frame"><div className="inner-list">{timeline.map(([year, text]) => <div className="inner-item" key={year + text}><strong>{year}</strong>{text}</div>)}</div></div></div></div>
            <div className="card soft-mint"><div className="card-body"><div style={{ fontSize: 30, fontWeight: 600, color: '#0f172a' }}>Lehre, Forschung und Publikationen</div><div className="inner-frame"><div className="inner-list"><div className="inner-item">Wissenschaftliche Publikationstätigkeit (&gt;100 Publikationen in Fachzeitschriften mit Peer-Review) (<a href="https://scholar.google.com/citations?user=ZWFYojEAAAAJ&hl=de" target="_blank" rel="noreferrer">Google Scholar</a>)</div>{research.map((item) => <div className="inner-item" key={item}>{item}</div>)}</div></div></div></div>
          </div>
        </section>

        <section id="videos">
          <div className="eyebrow">Videos</div>
          <h2 className="section-title">Videos</h2>
          <div className="video-grid">
            {videos.map(({ title, embedUrl, thumbnailUrl }) => {
              const isActivated = activatedVideos[title]
              return (
                <div className="card" key={title}>
                  <div className="video-frame">
                    {isActivated ? (
                      <iframe src={embedUrl} title={title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                    ) : (
                      <div className="video-placeholder" style={{ backgroundImage: `url(${thumbnailUrl})` }}>
                        <div className="video-placeholder-content">
                          <div className="video-placeholder-title">Externer YouTube-Inhalt</div>
                          <div className="video-placeholder-text">Mit der Aktivierung wird eine Verbindung zu YouTube beziehungsweise Google hergestellt und das Video eingebettet angezeigt.</div>
                          <button type="button" className="video-activate" onClick={() => activateVideo(title)}>Video aktivieren</button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="video-title">{title}</div>
                </div>
              )
            })}
          </div>
        </section>

        <section id="kontakt">
          <div className="eyebrow">Kontakt</div>
          <h2 className="section-title">Standorte und Terminmöglichkeiten</h2>
          <p className="section-text">Für Terminwünsche oder organisatorische Fragen kann die jeweilige Einrichtung direkt kontaktiert werden.</p>
          <div className="contact-grid">
            <div className="card"><div className="card-body"><div style={{ fontSize: 24, fontWeight: 600, color: '#0f172a' }}>Praxis Dr. Vlachou-Vaterrodt</div><div style={{ marginTop: 14, lineHeight: 1.8, color: '#334155' }}>Südliche Münchner Straße 20, 82031 Grünwald<br />089 / 649 29 69<br />info@augen-arzt.de</div><div style={{ marginTop: 16 }}><a className="btn btn-dark" href="https://augen-arzt.de/" target="_blank" rel="noreferrer">Praxis-Website</a></div></div></div>
            <div className="card"><div className="card-body"><div style={{ fontSize: 24, fontWeight: 600, color: '#0f172a' }}>LMU Augenklinik</div><div style={{ marginTop: 14, lineHeight: 1.8, color: '#334155' }}>Mathildenstraße 8, 80336 München<br />089 / 4400-53811<br />augenklinik.termine@med.uni-muenchen.de</div><div style={{ marginTop: 16 }}><a className="btn btn-dark" href="https://www.lmu-klinikum.de/augenklinik/klinik-kompakt/arzte-wiss-mitarbeiter/b22e75136d9e4888" target="_blank" rel="noreferrer">LMU-Profil</a></div></div></div>
          </div>
          <div className="note"><div><strong>Hinweis</strong><small>Diese Website dient der Information und ersetzt keine individuelle ärztliche Untersuchung. Bei akuten Beschwerden sollte zeitnah augenärztliche Hilfe in Anspruch genommen werden.</small></div><div>Terminvergabe über die jeweilige Einrichtung</div></div>
        </section>

        <section id="impressum">
          <div className="eyebrow">Impressum & Hinweise</div>
          <h2 className="section-title">Impressum und medizinischer Disclaimer</h2>
          <p className="section-text">Anbieterangaben und rechtliche Hinweise für den Webauftritt.</p>
          <div className="legal-grid">
            <div className="card"><div className="card-body" style={{ lineHeight: 1.8 }}><div style={{ fontSize: 24, fontWeight: 600, color: '#0f172a' }}>Impressum</div><div style={{ marginTop: 14 }}>Gesetzliche Pflichtangaben<br /><br />PD Dr. med. Jakob Siedlecki, FEBO<br />Südliche Münchner Straße 20<br />82031 Grünwald<br />T 089 6492969<br />E-Mail: jakob@eyepinion.de</div><div style={{ marginTop: 18 }}>Wir möchten Sie darauf hinweisen, dass unter der angegebenen E-Mail-Adresse keine Beratung zu medizinischen Behandlungen erfolgt. Sollten Sie diesbezüglich Fragen haben, kontaktieren Sie bitte die jeweils angegebene Einrichtung telefonisch.</div><div style={{ marginTop: 18 }}><strong>Gesetzliche Berufsbezeichnung</strong><br />Facharzt für Augenheilkunde (verliehen in Deutschland)</div><div style={{ marginTop: 18 }}><strong>Zuständige Aufsichtsbehörde</strong><br />KVB Kassenärztliche Vereinigung Bayern<br />Elsenheimerstraße 39<br />80687 München<br />Tel.: 089 57093-0<br />E-Mail: info@kvb.de<br /><a href="https://www.kvb.de" target="_blank" rel="noreferrer">https://www.kvb.de</a></div><div style={{ marginTop: 18 }}><strong>Zuständige Ärztekammer</strong><br />Bayerische Landesärztekammer<br />Mühlbaurstraße 16<br />81677 München<br />Tel.: 089 4147-0<br />E-Mail: info@blaek.de<br /><a href="https://www.blaek.de" target="_blank" rel="noreferrer">https://www.blaek.de</a></div><div style={{ marginTop: 18 }}><strong>Berufsrechtliche Regelungen</strong><br />Bundesärzteordnung (BÄO)<br />Berufsordnung für die Ärzte Bayerns<br />Heilberufe-Kammergesetz (HKaG)<br />Gebührenordnung für Ärzte (GOÄ)</div><div className="legal-links">Die berufsrechtlichen Regelungen sind abrufbar über die Bayerische Landesärztekammer sowie über die amtlichen Gesetzesportale des Bundes und des Freistaats Bayern.</div></div></div>
            <div className="card"><div className="card-body" style={{ lineHeight: 1.8 }}><div style={{ fontSize: 24, fontWeight: 600, color: '#0f172a' }}>Rechtliche Hinweise</div><div style={{ marginTop: 14 }}><strong>Urheberrecht</strong><br />Diese Website einschließlich aller Teile, Texte und Bilder ist urheberrechtlich geschützt. Vervielfältigungen und Veröffentlichungen von Teilen, Texten oder Bildern bedürfen einer vorherigen schriftlichen Genehmigung.</div><div style={{ marginTop: 18 }}><strong>Haftungsbeschränkung für eigene Inhalte</strong><br />Die Inhalte dieser Website wurden sorgfältig und nach bestem Gewissen erstellt. Für Aktualität, Vollständigkeit, Richtigkeit und Qualität sämtlicher Inhalte kann jedoch keine Gewähr übernommen werden. Als Diensteanbieter ist der Verantwortliche für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.</div><div style={{ marginTop: 18 }}><strong>Haftungsbeschränkung für externe Inhalte</strong><br />Diese Website enthält Verknüpfungen zu Websites Dritter. Auf deren Inhalte besteht kein Einfluss; für diese fremden Inhalte wird daher keine Gewähr übernommen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar. Bei Bekanntwerden entsprechender Rechtsverletzungen werden derartige Links entfernt.</div><div style={{ marginTop: 18 }}><strong>Medizinischer Disclaimer</strong><br />Die Inhalte dieser Website dienen ausschließlich der allgemeinen Information. Sie ersetzen keine individuelle ärztliche Beratung, Untersuchung oder Behandlung. Aus den bereitgestellten Informationen kann keine Selbstdiagnose oder Selbstbehandlung abgeleitet werden. Bei akuten Beschwerden oder medizinischen Fragen sollte stets eine augenärztliche Untersuchung erfolgen.</div></div></div>
          </div>
          {showPrivacy && <PrivacyPolicy openCookieSettings={openCookieSettings} />}
        </section>
        <footer className="legal-footnote" aria-label="Rechtliche Hinweise">
          <a href="#impressum">Impressum</a>
          <span aria-hidden="true">·</span>
          <button type="button" className="footer-link" onClick={showPrivacyPolicy}>Datenschutz</button>
        </footer>
      </main>
    </>
  )
}

export default App
