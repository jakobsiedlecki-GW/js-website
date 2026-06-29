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
  ['06/2026', 'Ernennung zum Professor an der LMU München'],
  ['seit 2024', 'Zusätzliche Tätigkeit in der Praxis Dr. Vlachou-Vaterrodt, Grünwald'],
  ['2023 bis 2024', 'Tätigkeit in der Augenarztpraxis Fokus Auge, Rosenheim'],
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
  },
  {
    title: 'Checker-Tobi: Der Augen-Check',
    embedUrl: 'https://www.youtube.com/embed/N9L75KJIktk',
  },
  {
    title: 'Retina-Sprechstunde (Teil 1)',
    embedUrl: 'https://www.youtube.com/embed/VjFzIsMXSnk',
  },
  {
    title: 'Retina-Sprechstunde (Teil 2)',
    embedUrl: 'https://www.youtube.com/embed/To78wfcSCJE',
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
  body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: var(--text); background: linear-gradient(180deg, var(--bg-1) 0%, var(--bg-2) 44%, #fff 100%); }
  a { color: inherit; text-decoration: none; }
  .container { width: min(1180px, calc(100% - 48px)); margin: 0 auto; }
  .header { position: sticky; top: 0; z-index: 30; border-bottom: 1px solid rgba(255,255,255,0.7); background: rgba(255,255,255,0.88); backdrop-filter: blur(14px); }
  .header-inner { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 16px 0; }
  .eyebrow { font-size: 12px; color: var(--muted); text-transform: uppercase; letter-spacing: .24em; }
  .brand-title { font-weight: 600; color: #0f172a; }
  .nav { display: flex; flex-wrap: wrap; gap: 8px; }
  .nav a, .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; border-radius: 999px; padding: 10px 16px; font-size: 14px; transition: .2s ease; }
  .nav a:hover { background: #f1f5f9; }
  .btn-dark { background: #0f172a; color: #fff; }
  .btn-light { background: #fff; border: 1px solid #cbd5e1; color: #0f172a; }
  .hero { display: grid; grid-template-columns: 1.03fr .97fr; gap: 40px; align-items: start; padding: 48px 0 56px; }
  .badge { display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: 999px; border: 1px solid #e2e8f0; background: rgba(255,255,255,.92); color: var(--muted); font-size: 14px; box-shadow: 0 1px 2px rgba(15,23,42,.04); }
  h1 { margin: 24px 0 0; font-size: clamp(40px, 5vw, 64px); line-height: 1.03; letter-spacing: -0.03em; font-weight: 600; color: #0f172a; }
  .lead { margin-top: 24px; max-width: 760px; font-size: 20px; line-height: 1.8; color: var(--muted); }
  .grid-2, .grid-3 { display: grid; gap: 16px; }
  .grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .grid-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .card { border: 1px solid rgba(255,255,255,.8); background: var(--card); border-radius: 2rem; box-shadow: var(--shadow); overflow: hidden; }
  .card-body { padding: 24px; }
  .soft-mint { background: var(--mint); }
  .soft-rose { background: var(--rose); }
  .icon-row { display: flex; gap: 14px; align-items: flex-start; }
  .icon-box { flex: 0 0 40px; width: 40px; height: 40px; border-radius: 16px; background: #f1f5f9; display: flex; align-items: center; justify-content: center; color: #94a3b8; }
  .photo-wrap { position: relative; align-self: start; }
  .photo-glow { position: absolute; inset: 0; border-radius: 2rem; background: radial-gradient(circle at top right, #e7efec, transparent 38%), radial-gradient(circle at bottom left, #f3e8e0, transparent 30%); filter: blur(30px); }
  .photo-frame { position: relative; overflow: hidden; border-radius: 2rem; border: 1px solid rgba(255,255,255,.8); background: #fff; box-shadow: 0 20px 60px rgba(15,23,42,.12); aspect-ratio: 4/5; width: min(100%, 380px); margin: 0 auto; }
  .photo-frame img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .photo-caption { margin-top: 16px; text-align: center; font-size: 20px; font-weight: 600; color: #0f172a; }
  section { padding: 36px 0; scroll-margin-top: 86px; }
  .section-title { margin: 0; font-size: clamp(32px, 3.5vw, 42px); line-height: 1.08; letter-spacing: -0.03em; color: #0f172a; }
  .section-text { margin-top: 16px; max-width: 760px; font-size: 18px; line-height: 1.8; color: var(--muted); }
  .profile-focus, .vita-grid, .contact-grid, .legal-grid { display: grid; gap: 24px; }
  .profile-focus { grid-template-columns: .85fr 1.15fr; }
  .vita-grid, .contact-grid, .legal-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .stack { display: grid; gap: 12px; margin-top: 24px; }
  .stack-item { padding: 16px; border-radius: 20px; background: rgba(255,255,255,.75); line-height: 1.75; color: #334155; }
  .goal { padding: 16px; color: #9a6a55; font-weight: 600; line-height: 1.75; }
  .highlight-box { position: relative; overflow: hidden; min-height: 260px; border-radius: 2rem; border: 1px solid rgba(255,255,255,.8); background: linear-gradient(135deg, #edf5f2, #fff 55%, #e9f1ef); }
  .highlight-box::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at top right, rgba(255,255,255,.95), transparent 35%), radial-gradient(circle at bottom left, rgba(226,232,240,.55), transparent 38%); }
  .highlight-label { position: absolute; left: 22px; right: 22px; bottom: 22px; padding: 16px; border-radius: 20px; background: rgba(255,255,255,.9); backdrop-filter: blur(8px); text-align: center; font-weight: 600; color: #0f172a; line-height: 1.5; }
  .inner-frame { margin-top: 30px; overflow: hidden; border-radius: 24px; border: 1px solid #e2e8f0; background: #fff; }
  .inner-list { display: grid; gap: 12px; padding: 12px; }
  .inner-item { padding: 16px 20px; border-radius: 20px; background: rgba(255,255,255,.7); color: #334155; line-height: 1.8; }
  .inner-item strong { display: block; margin-bottom: 4px; font-size: 14px; color: var(--muted); }
  .video-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; margin-top: 24px; }
  .video-info-banner { margin-top: 24px; padding: 22px 24px; border-radius: 24px; border: 1px solid #e2e8f0; background: #fbfbfa; color: #475569; line-height: 1.75; }
  .video-info-banner strong { display: block; margin-bottom: 6px; color: #0f172a; font-size: 18px; }
  .video-frame { aspect-ratio: 16/9; background: #f1f5f9; position: relative; overflow: hidden; }
  .video-frame iframe { width: 100%; height: 100%; border: 0; display: block; }
  .video-placeholder { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #eef4f2, #fff 55%, #f5efe9); text-align: center; padding: 28px; }
  .video-title { padding: 22px 24px 24px; font-size: 22px; line-height: 1.4; font-weight: 600; color: #0f172a; }
  .note { margin-top: 32px; display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 22px 24px; border-radius: 24px; background: #0f172a; color: #fff; }
  .note small { display: block; margin-top: 4px; color: #cbd5e1; }
  .privacy { margin-top: 24px; padding: 22px 24px; border-radius: 24px; border: 1px solid #e2e8f0; background: #fbfbfa; color: #475569; font-size: 14px; line-height: 1.75; }
  .privacy h3 { margin: 0 0 12px; font-size: 24px; color: #0f172a; }
  .privacy h4 { margin: 24px 0 8px; font-size: 17px; color: #0f172a; }
  .privacy p { margin: 10px 0 0; }
  .privacy ul { margin: 10px 0 0 22px; padding: 0; }
  .legal-links { margin-top: 14px; color: #475569; }
  .legal-links a, .legal-footnote a, .footer-link { text-decoration: underline; text-underline-offset: 3px; }
  .legal-footnote { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 10px; padding: 20px 0 40px; color: var(--muted); font-size: 12px; }
  .footer-link { border: 0; background: transparent; padding: 0; color: inherit; cursor: pointer; font: inherit; }
  @media (max-width: 1024px) { .hero, .profile-focus, .vita-grid, .contact-grid, .legal-grid { grid-template-columns: 1fr; } .grid-3, .grid-2, .video-grid { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 760px) { .container { width: min(100% - 28px, 1180px); } .header-inner { display: grid; } .nav { display: none; } .grid-3, .grid-2, .video-grid { grid-template-columns: 1fr; } .note { flex-direction: column; align-items: flex-start; } h1 { font-size: 40px; } .lead { font-size: 18px; } .photo-caption { font-size: 18px; } section, .privacy { scroll-margin-top: 58px; } }
`

function PrivacyPolicy({ openCookieSettings }) {
  return (
    <section className="privacy" id="datenschutz">
      <h3>Datenschutzerklärung</h3>
      <p><strong>Stand: Mai 2026</strong></p>

      <h4>1. Verantwortlicher</h4>
      <p>Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:</p>
      <p>Prof. Dr. med. Jakob Siedlecki, FEBO<br />Südliche Münchner Str. 20<br />82031 Grünwald<br />Deutschland</p>
      <p>E-Mail: <a href="mailto:jakob@eyepinion.de">jakob@eyepinion.de</a><br />Telefon: 089 6492969</p>

      <h4>2. Allgemeine Hinweise zur Datenverarbeitung</h4>
      <p>Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung dieser Website, zur Bearbeitung von Anfragen oder aufgrund gesetzlicher Vorgaben erforderlich ist.</p>
      <p>Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen, zum Beispiel Name, Kontaktdaten, IP-Adresse oder Nutzungsdaten.</p>
      <p>Die Verarbeitung erfolgt insbesondere auf Grundlage der Datenschutz-Grundverordnung (DSGVO) sowie des Telekommunikation-Digitale-Dienste-Datenschutz-Gesetzes (TDDDG).</p>

      <h4>3. Hosting und Server-Logfiles</h4>
      <p>Diese Website wird gehostet bei IONOS SE, Elgendorfer Str. 57, 56410 Montabaur, Deutschland. Beim Aufruf dieser Website werden technisch notwendige Server-Logfiles verarbeitet, etwa IP-Adresse, Datum und Uhrzeit, aufgerufene Dateien, Browsertyp, Betriebssystem und Referrer-URL.</p>
      <p>Die Verarbeitung erfolgt zur sicheren und stabilen Bereitstellung der Website auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.</p>

      <h4>4. Cookies und vergleichbare Technologien</h4>
      <p>Diese Website setzt keine Analyse-, Marketing- oder Tracking-Cookies ein. Cookies und vergleichbare Technologien werden ausschließlich für die Verwaltung Ihrer Datenschutzeinstellungen eingesetzt.</p>

      <h4>5. Consent-Management mit Cookiebot</h4>
      <p>Diese Website verwendet Cookiebot zur Verwaltung von Cookie-Einwilligungen. Anbieter ist Cybot A/S, Havnegade 39, 1058 Kopenhagen, Dänemark.</p>
      <p>Cookiebot speichert Informationen über Ihre Einwilligungsentscheidung, damit diese dokumentiert und bei späteren Besuchen berücksichtigt werden kann.</p>

      <h4>6. Cookie-Erklärung</h4>
      <p>Diese Website verwendet derzeit ausschließlich technisch notwendige Cookies zur Speicherung Ihrer Cookie- bzw. Datenschutzeinstellungen. Weitere Cookies, insbesondere Analyse-, Marketing- oder Tracking-Cookies, werden nicht eingesetzt.</p>

      <h4>7. YouTube-Videos</h4>
      <p>Auf dieser Website sind Videos von YouTube eingebunden. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.</p>
      <p>Die Einbindung erfolgt über eine Zwei-Klick-Lösung. Beim bloßen Aufruf der Seite wird keine Verbindung zu YouTube oder Google hergestellt. Erst wenn Sie ein Video aktivieren, wird der externe Inhalt geladen.</p>

      <h4>8. Kontaktaufnahme per E-Mail oder Telefon</h4>
      <p>Wenn Sie uns per E-Mail oder Telefon kontaktieren, verarbeiten wir die von Ihnen mitgeteilten personenbezogenen Daten zur Bearbeitung Ihrer Anfrage.</p>

      <h4>9. Empfänger personenbezogener Daten</h4>
      <p>Eine Weitergabe personenbezogener Daten erfolgt nur, soweit dies zur Bereitstellung der Website, zur Bearbeitung Ihrer Anfrage, zur Erfüllung gesetzlicher Pflichten oder auf Grundlage Ihrer Einwilligung erforderlich ist.</p>

      <h4>10. Speicherdauer</h4>
      <p>Wir speichern personenbezogene Daten nur so lange, wie dies für die jeweiligen Verarbeitungszwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.</p>

      <h4>11. Ihre Rechte</h4>
      <p>Sie haben Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit, Widerspruch sowie Widerruf einer erteilten Einwilligung nach Maßgabe der DSGVO.</p>

      <h4>12. Beschwerderecht bei der Aufsichtsbehörde</h4>
      <p>Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren. Zuständige Aufsichtsbehörde ist insbesondere das Bayerische Landesamt für Datenschutzaufsicht (BayLDA).</p>

      <h4>13. Datensicherheit</h4>
      <p>Diese Website nutzt SSL-/TLS-Verschlüsselung und angemessene technische und organisatorische Maßnahmen zum Schutz personenbezogener Daten.</p>

      <h4>14. Kontakt bei Datenschutzfragen</h4>
      <p>Bei Fragen zum Datenschutz wenden Sie sich bitte an:</p>
      <p>Prof. Dr. med. Jakob Siedlecki, FEBO<br />Südliche Münchner Str. 20<br />82031 Grünwald<br />Deutschland</p>
      <p>E-Mail: <a href="mailto:jakob@eyepinion.de">jakob@eyepinion.de</a><br />Telefon: 089 6492969</p>

      <div className="privacy-actions"><button type="button" className="btn btn-light" onClick={openCookieSettings}>Datenschutzeinstellungen</button></div>
    </section>
  )
}

function App() {
  const [activatedVideos, setActivatedVideos] = useState({})
  const [showPrivacy, setShowPrivacy] = useState(false)

  const activateVideo = (title) => {
    setActivatedVideos((prev) => ({ ...prev, [title]: true }))
  }

  const openCookieSettings = () => {
    if (window.Cookiebot && typeof window.Cookiebot.renew === 'function') {
      window.Cookiebot.renew()
    }
  }

  return (
    <>
      <style>{styles}</style>
      <header className="header">
        <div className="container header-inner">
          <div>
            <div className="eyebrow">Augenheilkunde</div>
            <div className="brand-title">Prof. Dr. med. Jakob Siedlecki, FEBO</div>
          </div>
          <nav className="nav">
            <a href="#schwerpunkte">Schwerpunkte</a>
            <a href="#vita">Vita</a>
            <a href="#videos">Videos</a>
            <a href="#kontakt" className="btn btn-dark">Kontakt</a>
          </nav>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <div>
            <div className="badge">Für Patientinnen und Patienten</div>
            <h1>Augenheilkunde mit Sorgfalt,<br />Präzision und persönlicher Begleitung</h1>
            <p className="lead">Ich begleite Patientinnen und Patienten mit moderner Diagnostik, präziser operativer Expertise und einer verständlichen Aufklärung – von der ersten Beratung bis zur Nachsorge.</p>
            <div className="grid-2" style={{ marginTop: 32 }}>
              {positions.map((p) => <div className="card" key={p}><div className="card-body icon-row"><div className="icon-box">+</div><div>{p}</div></div></div>)}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32 }}>
              <a className="btn btn-dark" href="#kontakt">Termin &amp; Kontakt</a>
              <a className="btn btn-light" href="#videos">Videos</a>
            </div>
          </div>
          <div className="photo-wrap">
            <div className="photo-glow" />
            <div className="photo-frame"><img src="/jakob-siedlecki.jpeg" alt="Prof. Dr. med. Jakob Siedlecki, FEBO" /></div>
            <div className="photo-caption">Prof. Dr. med. Jakob Siedlecki, FEBO</div>
          </div>
        </section>

        <section className="profile-focus">
          <div className="card soft-rose"><div className="card-body"><div className="eyebrow">Profil</div><div style={{ marginTop: 12, fontSize: 28, fontWeight: 600, color: '#0f172a' }}>Prof. Dr. med. Jakob Siedlecki, FEBO</div><p style={{ marginTop: 12, color: '#64748b', lineHeight: 1.75 }}>Augenarzt für konservative und operative Augenheilkunde</p><div className="stack"><div className="stack-item">Oberarzt an der Augenklinik des LMU Klinikums München</div><div className="stack-item">Spezialisierung in mikroinvasiver Augenchirurgie (&gt;15,000 Eingriffe)</div><div className="stack-item">Wissenschaftlicher Schwerpunkt in Augenchirurgie, OCT-Diagnostik und Makula-Therapie</div><div className="goal">Mein Ziel: Ein gemeinsamer Weg zur Lösung Ihres Problems</div></div></div></div>
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
          <div className="video-info-banner" role="note">
            <strong>Hinweis zu externen YouTube-Inhalten</strong>
            Die Videos sind über YouTube eingebunden. Beim bloßen Aufruf dieser Seite wird kein YouTube-Video geladen. Erst wenn Sie ein Video aktivieren, wird eine Verbindung zu YouTube beziehungsweise Google hergestellt und der externe Inhalt geladen.
          </div>
          <div className="video-grid">
            {videos.map(({ title, embedUrl }) => {
              const isActivated = activatedVideos[title]
              return (
                <div className="card" key={title}>
                  <div className="video-frame">
                    {isActivated ? (
                      <iframe src={embedUrl} title={title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                    ) : (
                      <div className="video-placeholder">
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
          <h2 className="section-title">Impressum und medizinischer Disclaimer</h2>
          <p className="section-text">Anbieterangaben und rechtliche Hinweise für den Webauftritt.</p>
          <div className="legal-grid">
            <div className="card"><div className="card-body" style={{ lineHeight: 1.8 }}><div style={{ fontSize: 24, fontWeight: 600, color: '#0f172a' }}>Impressum</div><div style={{ marginTop: 14 }}>Gesetzliche Pflichtangaben<br /><br />Prof. Dr. med. Jakob Siedlecki, FEBO<br />Südliche Münchner Straße 20<br />82031 Grünwald<br />T 089 6492969<br />E-Mail: jakob@eyepinion.de</div></div></div>
            <div className="card"><div className="card-body" style={{ lineHeight: 1.8 }}><div style={{ fontSize: 24, fontWeight: 600, color: '#0f172a' }}>Rechtliche Hinweise</div><div style={{ marginTop: 14 }}><strong>Medizinischer Disclaimer</strong><br />Die Inhalte dieser Website dienen ausschließlich der allgemeinen Information. Sie ersetzen keine individuelle ärztliche Beratung, Untersuchung oder Behandlung.</div></div></div>
          </div>
          {showPrivacy && <PrivacyPolicy openCookieSettings={openCookieSettings} />}
        </section>
      </main>

      <footer className="legal-footnote"><a href="/impressum.html">Impressum</a><span>·</span><button type="button" className="footer-link" onClick={() => setShowPrivacy((v) => !v)}>Datenschutz</button><span>·</span><button type="button" className="footer-link" onClick={openCookieSettings}>Cookie-Einstellungen</button></footer>
    </>
  )
}

export default App
