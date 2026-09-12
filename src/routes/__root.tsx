import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import '@fontsource-variable/geist'

import { NotFoundPage } from '#/components/not-found-page'
import { SiteShell } from '#/components/site-shell'
import {
  getLocalizedContentPath,
  isGkeArticlePath,
  SITE_ORIGIN,
} from '#/config/site'
import { gkeArticleEn } from '#/content/gke-article.en'
import { gkeArticleFr } from '#/content/gke-article.fr'
import { getLocale, localizeUrl } from '#/paraglide/runtime'
import * as m from '#/paraglide/messages'
import appCss from '#/styles.css?url'

function seoCopy(pathname: string, locale: 'en' | 'fr') {
  if (isGkeArticlePath(pathname)) {
    const article = locale === 'fr' ? gkeArticleFr : gkeArticleEn
    return { title: article.title, description: article.excerpt }
  }
  if (pathname === '/projects')
    return {
      title: m.seo_projects_title(),
      description: m.seo_projects_description(),
    }
  if (pathname === '/experience')
    return {
      title: m.seo_experience_title(),
      description: m.seo_experience_description(),
    }
  if (pathname === '/blog')
    return { title: m.seo_blog_title(), description: m.seo_blog_description() }
  return { title: m.seo_home_title(), description: m.seo_home_description() }
}

export const Route = createRootRoute({
  head: ({ matches }) => {
    const locale = getLocale()
    const matchedPath = matches.at(-1)?.pathname ?? '/'
    const unlocalizedPath =
      matchedPath.replace(/^\/(?:fr|en)(?=\/|$)/, '') || '/'
    const pathname = unlocalizedPath.replace(/\/+$/, '') || '/'
    const localizedPathname = getLocalizedContentPath(pathname, locale)
    const canonical = localizeUrl(new URL(localizedPathname, SITE_ORIGIN), {
      locale,
    }).href
    const isArticle = isGkeArticlePath(pathname)
    const image = new URL(isArticle ? '/og-gke.png' : '/og.png', SITE_ORIGIN)
      .href
    const personImage = new URL('/william-wautrin.jpeg', SITE_ORIGIN).href
    const { title, description } = seoCopy(pathname, locale)
    const personId = `${SITE_ORIGIN}/#person`
    const websiteId = `${SITE_ORIGIN}/#website`
    const structuredData: Array<Record<string, unknown>> = [
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': personId,
        name: 'William Wautrin',
        url: `${SITE_ORIGIN}/`,
        image: personImage,
        jobTitle: 'Software & Platform Engineer',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Paris',
          addressCountry: 'FR',
        },
        sameAs: [
          'https://github.com/williamw-dev',
          'https://x.com/builtbywilliam',
          'https://www.linkedin.com/in/william-www',
          'https://www.credly.com/users/william-wautrin',
        ],
        knowsAbout: [
          'Cloud architecture',
          'Kubernetes',
          'Terraform',
          'Platform engineering',
          'Distributed systems',
          'Backend engineering',
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': websiteId,
        name: 'William Wautrin',
        url: `${SITE_ORIGIN}/`,
        inLanguage: ['en', 'fr'],
        author: { '@id': personId },
      },
    ]

    if (isArticle) {
      structuredData.push({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description,
        image,
        datePublished: '2025',
        inLanguage: locale,
        url: canonical,
        mainEntityOfPage: canonical,
        author: { '@id': personId },
        isPartOf: { '@id': websiteId },
        about: ['GKE', 'GitOps', 'Kubernetes', 'Argo CD'],
      })
    }
    return {
      meta: [
        { charSet: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, viewport-fit=cover',
        },
        { title },
        { name: 'description', content: description },
        { name: 'author', content: 'William Wautrin' },
        { name: 'robots', content: 'index, follow, max-image-preview:large' },
        {
          name: 'theme-color',
          media: '(prefers-color-scheme: dark)',
          content: '#050505',
        },
        {
          name: 'theme-color',
          media: '(prefers-color-scheme: light)',
          content: '#fafafa',
        },
        { property: 'og:type', content: isArticle ? 'article' : 'website' },
        { property: 'og:site_name', content: 'William Wautrin' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: canonical },
        { property: 'og:image', content: image },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        {
          property: 'og:image:alt',
          content:
            'William Wautrin — Cloud architecture and platform engineering',
        },
        { property: 'og:locale', content: locale === 'fr' ? 'fr_FR' : 'en_US' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:creator', content: '@builtbywilliam' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: image },
      ],
      links: [
        { rel: 'stylesheet', href: appCss },
        { rel: 'canonical', href: canonical },
        {
          rel: 'alternate',
          hrefLang: 'fr',
          href: localizeUrl(
            new URL(getLocalizedContentPath(pathname, 'fr'), SITE_ORIGIN),
            { locale: 'fr' },
          ).href,
        },
        {
          rel: 'alternate',
          hrefLang: 'en',
          href: localizeUrl(
            new URL(getLocalizedContentPath(pathname, 'en'), SITE_ORIGIN),
            { locale: 'en' },
          ).href,
        },
        {
          rel: 'alternate',
          hrefLang: 'x-default',
          href: localizeUrl(
            new URL(getLocalizedContentPath(pathname, 'en'), SITE_ORIGIN),
            { locale: 'en' },
          ).href,
        },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      scripts: structuredData.map((data) => ({
        type: 'application/ld+json',
        children: JSON.stringify(data),
      })),
    }
  },
  component: SiteShell,
  notFoundComponent: NotFoundPage,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang={getLocale()} data-theme="dark" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html:
              "try{const t=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme:light)').matches?'light':'dark');document.documentElement.dataset.theme=t}catch{}",
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
