import { defineConfig } from 'vite'

import { paraglideVitePlugin } from '@inlang/paraglide-js'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    paraglideVitePlugin({
      project: './project.inlang',
      outdir: './src/paraglide',
      strategy: ['url', 'cookie', 'preferredLanguage', 'baseLocale'],
      emitTsDeclarations: true,
    }),
    nitro({ rollupConfig: { external: [/^@sentry\//] } }),

    tanstackStart(),
    viteReact(),
  ],
})

export default config
