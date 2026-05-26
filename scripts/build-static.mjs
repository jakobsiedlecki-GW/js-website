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
    /* Mobile: kompakter Rechtsbereich und kein doppeltes Scrollen */
    .cookie-settings-link {
      border: 0;
      padding: 0;
      background: transparent;
      color: inherit;
      font: inherit;
      text-decoration: underline;
      text-underline-offset: 3px;
      cursor: pointer;
    }
    @media (max-width:760px) {
      footer {
        width: calc(100% - 28px);
        margin: 0 auto;
        padding: 14px 0 max(18px, env(safe-area-inset-bottom));
        border-top: 1px solid #e2e8f0;
        gap: 8px 12px;
        line-height: 1.6;
      }
      footer a,
      footer .cookie-settings-link {
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

function injectCookieSettingsLink(html) {
  const currentFooter = '<footer><a href="/impressum.html">Impressum</a><span aria-hidden="true">·</span><a href="/datenschutz.html">Datenschutz</a></footer>'
  const updatedFooter = '<footer><a href="/impressum.html">Impressum</a><span aria-hidden="true">·</span><a href="/datenschutz.html">Datenschutz</a><span aria-hidden="true">·</span><button type="button" class="cookie-settings-link">Datenschutzeinstellungen</button></footer>'

  return html.replace(currentFooter, updatedFooter)
}

function injectCookieSettingsScript(html) {
  const marker = 'cookie-settings-link'
  const script = `
    document.querySelectorAll('.cookie-settings-link').forEach((button)=>{button.addEventListener('click',()=>{if(window.Cookiebot&&typeof window.Cookiebot.renew==='function'){window.Cookiebot.renew()}})})`

  if (html.includes('Cookiebot.renew')) {
    return html
  }

  return html.replace('</script>', `${script}\n  </script>`)
}

async function enhanceIndexHtml() {
  const indexPath = join(distDir, 'index.html')

  try {
    const html = await readFile(indexPath, 'utf8')
    let updatedHtml = html

    updatedHtml = injectCss(updatedHtml, videoFrameCss, 'Pastellrahmen für Video-Karten')
    updatedHtml = injectCss(updatedHtml, mobileLegalCss, 'Mobile: kompakter Rechtsbereich')
    updatedHtml = injectCookieSettingsLink(updatedHtml)
    updatedHtml = injectCookieSettingsScript(updatedHtml)

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
