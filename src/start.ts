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

function withSecurityHeaders(response: Response) {
  const securedResponse = new Response(response.body, response)
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    securedResponse.headers.set(name, value)
  }
  return securedResponse
}

const i18nMiddleware = createMiddleware().server(async ({ next, request }) => {
  const url = new URL(request.url)
  const localeCookiePrefix = `${cookieName}=`
  const localeCookie = request.headers
    .get('cookie')
    ?.split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(localeCookiePrefix))
    ?.slice(localeCookiePrefix.length)
  const preferredLocale =
    toLocale(localeCookie) ?? extractLocaleFromHeader(request)

  if (
    url.pathname === '/' &&
    preferredLocale &&
    preferredLocale !== baseLocale
  ) {
    return withSecurityHeaders(
      Response.redirect(localizeUrl(url, { locale: preferredLocale }), 307),
    )
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
