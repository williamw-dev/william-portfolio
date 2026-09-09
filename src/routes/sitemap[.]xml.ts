import { createFileRoute } from '@tanstack/react-router'

import { SITE_ORIGIN } from '#/config/site'
import { localizeUrl } from '#/paraglide/runtime'

const pages = ['', '/projects', '/experience', '/blog']

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: () => {
        const urls = pages.flatMap((page) => [
          localizeUrl(new URL(page || '/', SITE_ORIGIN), { locale: 'en' }).href,
          localizeUrl(new URL(page || '/', SITE_ORIGIN), { locale: 'fr' }).href,
        ])
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc><changefreq>monthly</changefreq></url>`).join('\n')}
</urlset>`
        return new Response(body, {
          headers: { 'Content-Type': 'application/xml; charset=utf-8' },
        })
      },
    },
  },
})
