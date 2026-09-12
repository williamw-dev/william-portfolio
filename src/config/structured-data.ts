import { isGkeArticlePath, SITE_ORIGIN } from '#/config/site'

type StructuredDataInput = {
  pathname: string
  canonical: string
  title: string
  description: string
  locale: 'en' | 'fr'
  socialImage: string
  personImage: string
}

function getCollectionTopics(pathname: string) {
  if (pathname === '/projects')
    return [
      'Cloud architecture',
      'Kubernetes',
      'Distributed systems',
      'Platform engineering',
    ]
  if (pathname === '/experience')
    return [
      'Software engineering',
      'Industrial software',
      'Platform engineering',
      'Test automation',
    ]
  return ['Technical writing', 'Software engineering', 'Cloud architecture']
}

export function getStructuredDataGraph({
  pathname,
  canonical,
  title,
  description,
  locale,
  socialImage,
  personImage,
}: StructuredDataInput) {
  const personId = `${SITE_ORIGIN}/#person`
  const websiteId = `${SITE_ORIGIN}/#website`
  const pageId = `${canonical}#webpage`
  const personImageId = `${SITE_ORIGIN}/william-wautrin.jpeg#image`
  const socialImageId = `${socialImage}#image`
  const isArticle = isGkeArticlePath(pathname)
  const isProfile = pathname === '/'
  const isCollection = ['/projects', '/experience', '/blog'].includes(pathname)
  const pageType = isProfile
    ? 'ProfilePage'
    : isCollection
      ? 'CollectionPage'
      : 'WebPage'

  const graph: Array<Record<string, unknown>> = [
    {
      '@type': 'Person',
      '@id': personId,
      name: 'William Wautrin',
      url: `${SITE_ORIGIN}/`,
      image: { '@id': personImageId },
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
      '@type': 'ImageObject',
      '@id': personImageId,
      url: personImage,
      contentUrl: personImage,
      caption: 'William Wautrin',
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: 'William Wautrin',
      url: `${SITE_ORIGIN}/`,
      inLanguage: ['en', 'fr'],
      author: { '@id': personId },
    },
    {
      '@type': pageType,
      '@id': pageId,
      url: canonical,
      name: title,
      description,
      inLanguage: locale,
      isPartOf: { '@id': websiteId },
      primaryImageOfPage: {
        '@id': isProfile ? personImageId : socialImageId,
      },
      ...(isProfile ? { mainEntity: { '@id': personId } } : {}),
      ...(isCollection ? { about: getCollectionTopics(pathname) } : {}),
    },
  ]

  if (!isProfile) {
    graph.push({
      '@type': 'ImageObject',
      '@id': socialImageId,
      url: socialImage,
      contentUrl: socialImage,
      width: 1200,
      height: 630,
    })
  }

  if (isArticle) {
    const articleId = `${canonical}#article`
    const page = graph.find((node) => node['@id'] === pageId)
    if (page) page.mainEntity = { '@id': articleId }

    graph.push({
      '@type': 'BlogPosting',
      '@id': articleId,
      url: canonical,
      headline: title,
      description,
      image: { '@id': socialImageId },
      datePublished: '2025',
      dateModified: '2025',
      inLanguage: locale,
      mainEntityOfPage: { '@id': pageId },
      author: { '@id': personId },
      publisher: { '@id': personId },
      isPartOf: { '@id': websiteId },
      about: ['GKE', 'GitOps', 'Kubernetes', 'Argo CD'],
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}
