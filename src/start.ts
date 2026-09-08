import { createMiddleware, createStart } from '@tanstack/react-start'

import {
  baseLocale,
  extractLocaleFromHeader,
  localizeUrl,
} from '#/paraglide/runtime'
import { paraglideMiddleware } from '#/paraglide/server'

const i18nMiddleware = createMiddleware().server(async ({ next, request }) => {
  const url = new URL(request.url)
  const preferredLocale = extractLocaleFromHeader(request)

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
