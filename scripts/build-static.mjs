import { cp, mkdir, rm, stat, readFile, writeFile } from 'node:fs/promises'
import { basename, join } from 'node:path'

const distDir = 'dist'
const rootFiles = [
  'index.html',
  'impressum.html',
  'datenschutz.html',
  'robots.txt',
  'sitemap.xml',
  '.htaccess',
]

const publicDir = 'public'

const videoFrameCss = `
    /* Pastellrahmen für Video-Karten */
    #videos .video-grid .card {
      border: 2px solid rgba(189, 211, 207, 0.85);
      background: linear-gradient(180deg, rgba(255,255,255,.96), rgba(248,251,250,.98));
      box-shadow: 0 16px 42px rgba(107, 143, 136, 0.14), inset 0 0 0 6px rgba(238, 244, 242, 0.65);
    }
    #videos .video-frame {
      border: 10px solid rgba(238, 244, 242, 0.95);
      border-bottom-width: 8px;
      border-radius: 26px 26px 18px 18px;
      background: linear-gradient(135deg, #eef4f2, #f5efe9);
    }
    #videos .video-title {
      background: linear-gradient(180deg, rgba(255,255,255,.96), rgba(246,244,241,.85));
    }
    @media (max-width:760px) {
      #videos .video-grid .card {
        border-width: 1.5px;
        box-shadow: 0 10px 26px rgba(107, 143, 136, 0.12), inset 0 0 0 4px rgba(238, 244, 242, 0.6);
      }
      #videos .video-frame {
        border-width: 6px;
        border-bottom-width: 5px;
        border-radius: 18px 18px 14px 14px;
      }
    }
`

const mobileLegalCss = `
    /* Mobile: Impressum/Datenschutz dauerhaft schlicht sichtbar */
    @media (max-width:760px) {
      body {
        padding-bottom: 52px;
      }
      footer {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 45;
        width: 100%;
        margin: 0;
        padding: 7px 0 max(9px, env(safe-area-inset-bottom));
        border: 0;
        border-radius: 0;
        background: linear-gradient(180deg, rgba(255,255,255,0), rgba(255,255,255,.94) 42%, rgba(255,255,255,.96));
        box-shadow: none;
        gap: 8px 12px;
        line-height: 1.4;
      }
      footer a {
        padding: 4px 0;
        font-size: 12px;
        color: #64748b;
      }
      .video-placeholder-text {
        max-height: none !important;
        overflow: visible !important;
        -webkit-overflow-scrolling: auto !important;
      }
      #CybotCookiebotDialog {
        max-height: calc(100dvh - 16px) !important;
      }
    }
`

const heroHospitalIconCss = `
    /* Hero: einfarbige medizinische Symbole */
    .mono-icon {
      font-size: 22px;
      line-height: 1;
      filter: grayscale(1) saturate(0);
      opacity: .82;
    }
`

const desktopAnchorScrollCss = `
    /* Desktop: Ankerziele höher unter der Navigation anzeigen */
    @media (min-width:761px) {
      #schwerpunkte,
      #vita,
      #videos {
        scroll-margin-top: 44px;
      }
    }
`

const heroPortraitRightCss = `
    /* Hero: Portrait weiter rechts platzieren */
    @media (min-width:1025px) {
      .hero {
        grid-template-columns: .92fr 1.08fr;
      }
      .hero .photo-wrap {
        justify-self: end;
        width: min(100%, 500px);
        transform: translateX(32px);
      }
      .hero .photo-frame {
        width: min(100%, 420px);
        margin-left: auto;
        margin-right: 0;
      }
      .hero .photo-caption {
        text-align: right;
        padding-right: 4px;
      }
    }
`

async function copyIfExists(source, target) {
  try {
    await stat(source)
    await cp(source, target, { recursive: true })
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error
  }
}

function injectCss(html, css, marker) {
  if (html.includes(marker)) {
    return html
  }

  return html.replace('</style>', `${css}\n  </style>`)
}

function injectHeroMedicalIcons(html) {
  return html
    .replace(
      '<div class="icon-box">+</div><div>Oberarzt an der Augenklinik des LMU Klinikums München</div>',
      '<div class="icon-box mono-icon" aria-hidden="true">🏥</div><div>Oberarzt an der Augenklinik des LMU Klinikums München</div>',
    )
    .replace(
      '<div class="icon-box">+</div><div>Tätigkeit in der Praxis Dr. Vlachou-Vaterrodt, Grünwald bei München</div>',
      '<div class="icon-box mono-icon" aria-hidden="true">🩺</div><div>Tätigkeit in der Praxis Dr. Vlachou-Vaterrodt, Grünwald bei München</div>',
    )
}

async function enhanceIndexHtml() {
  const indexPath = join(distDir, 'index.html')

  try {
    const html = await readFile(indexPath, 'utf8')
    let updatedHtml = html

    updatedHtml = injectCss(updatedHtml, videoFrameCss, 'Pastellrahmen für Video-Karten')
    updatedHtml = injectCss(updatedHtml, mobileLegalCss, 'Mobile: Impressum/Datenschutz dauerhaft schlicht sichtbar')
    updatedHtml = injectCss(updatedHtml, heroHospitalIconCss, 'Hero: einfarbige medizinische Symbole')
    updatedHtml = injectCss(updatedHtml, desktopAnchorScrollCss, 'Desktop: Ankerziele höher')
    updatedHtml = injectCss(updatedHtml, heroPortraitRightCss, 'Hero: Portrait weiter rechts')
    updatedHtml = injectHeroMedicalIcons(updatedHtml)

    if (updatedHtml !== html) {
      await writeFile(indexPath, updatedHtml, 'utf8')
    }
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error
  }
}

await rm(distDir, { recursive: true, force: true })
await mkdir(distDir, { recursive: true })

for (const file of rootFiles) {
  await copyIfExists(file, join(distDir, basename(file)))
}

// The source HTML references assets below /public/...
// Keep that directory name in the deployment output so IONOS can serve images
// and other static assets correctly when the publish directory is dist/.
await copyIfExists(publicDir, join(distDir, publicDir))

await enhanceIndexHtml()

console.log('Static website copied to dist/')
