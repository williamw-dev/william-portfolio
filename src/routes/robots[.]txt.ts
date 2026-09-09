import { createFileRoute } from '@tanstack/react-router'

import { SITE_ORIGIN } from '#/config/site'

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: () => {
        return new Response(
          `User-agent: *\nAllow: /\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`,
          {
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
          },
        )
      },
    },
  },
})
