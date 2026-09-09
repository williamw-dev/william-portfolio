import { createMiddleware, createStart } from '@tanstack/react-start'

import {
  baseLocale,
  cookieName,
  extractLocaleFromHeader,
  localizeUrl,
  toLocale,
} from '#/paraglide/runtime'
import { paraglideMiddleware } from '#/paraglide/server'

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
    return Response.redirect(localizeUrl(url, { locale: preferredLocale }), 307)
  }

  return paraglideMiddleware(request, async () => {
    const result = await next()
    return result.response
  })
})

export const startInstance = createStart(() => ({
  requestMiddleware: [i18nMiddleware],
}))
