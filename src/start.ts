import {
  createCsrfMiddleware,
  createMiddleware,
  createStart,
} from '@tanstack/react-start'

import {
  baseLocale,
  cookieName,
  extractLocaleFromHeader,
  localizeUrl,
  toLocale,
} from '#/paraglide/runtime'
import { paraglideMiddleware } from '#/paraglide/server'

const SECURITY_HEADERS = {
  'Strict-Transport-Security': 'max-age=31536000',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy':
    'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'Content-Security-Policy-Report-Only':
    "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; manifest-src 'self'; frame-src 'none'",
} as const

type CloudflareRequest = Request & {
  cf?: {
    country?: string | null
  }
}

function withSecurityHeaders(response: Response) {
  const securedResponse = new Response(response.body, response)
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    securedResponse.headers.set(name, value)
  }
  return securedResponse
}

function extractLocaleCookie(request: Request) {
  const localeCookiePrefix = `${cookieName}=`

  return request.headers
    .get('cookie')
    ?.split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(localeCookiePrefix))
    ?.slice(localeCookiePrefix.length)
}

function extractCloudflareCountry(request: Request) {
  const cloudflareRequest = request as CloudflareRequest

  if (cloudflareRequest.cf) {
    return cloudflareRequest.cf.country?.toUpperCase()
  }

  // Wrangler does not always expose request.cf locally. The header mirrors the
  // country value and keeps the redirect testable in the Pages emulator.
  return request.headers.get('cf-ipcountry')?.toUpperCase()
}

function getPreferredLocale(request: Request) {
  const selectedLocale = toLocale(extractLocaleCookie(request))
  if (selectedLocale) return selectedLocale

  const country = extractCloudflareCountry(request)
  if (country) return country === 'FR' ? 'fr' : baseLocale

  // Local development has no Cloudflare geolocation metadata.
  return extractLocaleFromHeader(request) ?? baseLocale
}

const i18nMiddleware = createMiddleware().server(async ({ next, request }) => {
  const url = new URL(request.url)
  const preferredLocale = getPreferredLocale(request)

  if (url.pathname === '/' && preferredLocale !== baseLocale) {
    const response = withSecurityHeaders(
      Response.redirect(localizeUrl(url, { locale: preferredLocale }), 307),
    )
    response.headers.set('Cache-Control', 'private, no-store')

    return response
  }

  return paraglideMiddleware(request, async () => {
    const result = await next()
    return withSecurityHeaders(result.response)
  })
})

const csrfMiddleware = createCsrfMiddleware({
  filter: (context) => context.handlerType === 'serverFn',
})

export const startInstance = createStart(() => ({
  requestMiddleware: [i18nMiddleware, csrfMiddleware],
}))
