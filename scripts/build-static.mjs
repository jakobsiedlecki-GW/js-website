import { cp, mkdir, readdir, rm, stat } from 'node:fs/promises'
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
const copyExtensions = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.svg',
  '.ico',
  '.txt',
  '.xml',
  '.html',
  '.css',
  '.js',
])

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

await rm(distDir, { recursive: true, force: true })
await mkdir(distDir, { recursive: true })

for (const file of rootFiles) {
  await copyIfExists(file, join(distDir, basename(file)))
}

try {
  const entries = await readdir(publicDir, { withFileTypes: true })

  for (const entry of entries) {
    const source = join(publicDir, entry.name)
    const target = join(distDir, entry.name)

    if (entry.isDirectory()) {
      await cp(source, target, { recursive: true })
      continue
    }

    if (copyExtensions.has(extensionOf(entry.name)) || entry.name === '.htaccess') {
      await cp(source, target)
    }
  }
} catch (error) {
  if (error?.code !== 'ENOENT') throw error
}

console.log('Static website copied to dist/')
