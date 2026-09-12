import { createFileRoute, redirect } from '@tanstack/react-router'

import { BlogArticlePage } from '#/components/blog-article'
import { GKE_ARTICLE_PATHS } from '#/config/site'
import { getLocale, localizeHref } from '#/paraglide/runtime'

export const Route = createFileRoute('/blog/deploiement-full-stack-gke-gitops')(
  {
    beforeLoad: () => {
      if (getLocale() === 'en') {
        throw redirect({
          href: localizeHref(GKE_ARTICLE_PATHS.en, { locale: 'en' }),
          statusCode: 308,
        })
      }
    },
    component: BlogArticlePage,
  },
)
