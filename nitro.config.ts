import { defineConfig } from 'nitro/config'

export default defineConfig({
  preset: 'cloudflare_pages',
  compatibilityDate: '2026-09-01',
  cloudflare: {
    deployConfig: true,
    nodeCompat: true,
    wrangler: {
      name: 'william-portfolio',
    },
  },
})
