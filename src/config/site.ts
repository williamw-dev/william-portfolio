export const SITE_ORIGIN = 'https://williamwautrin.com'

export const GKE_ARTICLE_PATHS = {
  en: '/blog/gke-gitops-full-stack-deployment',
  fr: '/blog/deploiement-full-stack-gke-gitops',
} as const

export type SiteLocale = keyof typeof GKE_ARTICLE_PATHS

const gkeArticlePaths = new Set<string>(Object.values(GKE_ARTICLE_PATHS))

export function isGkeArticlePath(pathname: string) {
  return gkeArticlePaths.has(pathname)
}

export function getLocalizedContentPath(pathname: string, locale: SiteLocale) {
  return isGkeArticlePath(pathname) ? GKE_ARTICLE_PATHS[locale] : pathname
}
