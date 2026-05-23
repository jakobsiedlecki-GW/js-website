import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { build as viteBuild } from 'vite'

const PRERENDER_INTERNAL_BUILD = 'VITE_PRERENDER_INTERNAL_BUILD'

function routeToOutputPath(outDir, route) {
  if (route === '/') {
    return join(outDir, 'index.html')
  }

  const cleanRoute = route.replace(/^\/+/, '').replace(/\/+$/, '')
  return join(outDir, cleanRoute, 'index.html')
}

function routeToUrl(route) {
  if (route.startsWith('/')) return route
  return `/${route}`
}

export default function prerender(options = {}) {
  const {
    entry = 'src/entry-server.jsx',
    routes = ['/'],
    rootSelector = '<div id="root"></div>',
    serverOutDir = 'dist/server',
    removeServerOutput = true,
  } = options

  let config

  return {
    name: 'eyepinion-prerender',
    apply: 'build',
    enforce: 'post',

    configResolved(resolvedConfig) {
      config = resolvedConfig
    },

    async closeBundle() {
      if (process.env[PRERENDER_INTERNAL_BUILD] === 'true') {
        return
      }

      const root = config.root
      const outDir = resolve(root, config.build.outDir)
      const templatePath = join(outDir, 'index.html')
      const ssrOutDir = resolve(root, serverOutDir)
      const ssrEntry = resolve(root, entry)

      process.env[PRERENDER_INTERNAL_BUILD] = 'true'

      try {
        await viteBuild({
          root,
          configFile: false,
          publicDir: false,
          logLevel: 'warn',
          build: {
            ssr: ssrEntry,
            outDir: ssrOutDir,
            emptyOutDir: true,
            rollupOptions: {
              output: {
                entryFileNames: 'entry-server.mjs',
              },
            },
          },
        })

        const template = await readFile(templatePath, 'utf-8')
        const serverEntryPath = join(ssrOutDir, 'entry-server.mjs')
        const { render } = await import(`${pathToFileURL(serverEntryPath).href}?t=${Date.now()}`)

        for (const route of routes) {
          const appHtml = await render(routeToUrl(route))
          const html = template.replace(rootSelector, `<div id="root">${appHtml}</div>`)
          const outputPath = routeToOutputPath(outDir, route)

          await mkdir(dirname(outputPath), { recursive: true })
          await writeFile(outputPath, html)
        }
      } finally {
        delete process.env[PRERENDER_INTERNAL_BUILD]

        if (removeServerOutput) {
          await rm(ssrOutDir, { recursive: true, force: true })
        }
      }
    },
  }
}
