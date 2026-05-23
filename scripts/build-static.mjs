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

async function injectVideoFrameCss() {
  const indexPath = join(distDir, 'index.html')

  try {
    const html = await readFile(indexPath, 'utf8')

    if (html.includes('Pastellrahmen für Video-Karten')) {
      return
    }

    const updatedHtml = html.replace('</style>', `${videoFrameCss}\n  </style>`)
    await writeFile(indexPath, updatedHtml, 'utf8')
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

await injectVideoFrameCss()

console.log('Static website copied to dist/')
