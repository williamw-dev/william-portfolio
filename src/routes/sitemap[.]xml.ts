import { createFileRoute } from '@tanstack/react-router'

const pages = ['', '/projects', '/experience', '/blog']

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin
        const urls = pages.flatMap((page) => [
          `${origin}/en${page}`,
          `${origin}/fr${page}`,
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
