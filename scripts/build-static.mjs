import { cp, mkdir, readdir, rm, stat, readFile, writeFile } from 'node:fs/promises'
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

const rootFileNames = new Set(rootFiles.map((file) => basename(file)))
const publicDir = 'public'
const assetExtensions = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.svg',
  '.ico',
  '.css',
  '.js',
])

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
    /* Mobile: Impressum/Datenschutz dauerhaft sichtbar */
    @media (max-width:760px) {
      body {
        padding-bottom: 72px;
      }
      footer {
        position: fixed;
        left: 14px;
        right: 14px;
        bottom: max(8px, env(safe-area-inset-bottom));
        z-index: 45;
        width: auto;
        margin: 0;
        padding: 8px 12px;
        border: 1px solid #e2e8f0;
        border-radius: 999px;
        background: rgba(255,255,255,.94);
        backdrop-filter: blur(14px);
        box-shadow: 0 10px 28px rgba(15,23,42,.10);
        gap: 8px 12px;
        line-height: 1.4;
      }
      footer a {
        padding: 6px 0;
        font-size: 13px;
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

function extensionOf(fileName) {
  const index = fileName.lastIndexOf('.')
  return index === -1 ? '' : fileName.slice(index).toLowerCase()
}

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
    updatedHtml = injectCss(updatedHtml, mobileLegalCss, 'Mobile: Impressum/Datenschutz dauerhaft sichtbar')
    updatedHtml = injectCss(updatedHtml, heroHospitalIconCss, 'Hero: einfarbige medizinische Symbole')
    updatedHtml = injectCss(updatedHtml, desktopAnchorScrollCss, 'Desktop: Ankerziele höher')
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

try {
  const entries = await readdir(publicDir, { withFileTypes: true })

  for (const entry of entries) {
    if (rootFileNames.has(entry.name)) {
      continue
    }

    const source = join(publicDir, entry.name)
    const target = join(distDir, entry.name)

    if (entry.isDirectory()) {
      await cp(source, target, { recursive: true })
      continue
    }

    if (assetExtensions.has(extensionOf(entry.name))) {
      await cp(source, target)
    }
  }
} catch (error) {
  if (error?.code !== 'ENOENT') throw error
}

await enhanceIndexHtml()

console.log('Static website copied to dist/')
