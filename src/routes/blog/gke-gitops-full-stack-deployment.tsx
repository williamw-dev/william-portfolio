import { createFileRoute, redirect } from '@tanstack/react-router'

import { BlogArticlePage } from '#/components/blog-article'
import { GKE_ARTICLE_PATHS } from '#/config/site'
import { getLocale, localizeHref } from '#/paraglide/runtime'

export const Route = createFileRoute('/blog/gke-gitops-full-stack-deployment')({
  beforeLoad: () => {
    if (getLocale() === 'fr') {
      throw redirect({
        href: localizeHref(GKE_ARTICLE_PATHS.fr, { locale: 'fr' }),
        statusCode: 308,
      })
    }
  },
  component: BlogArticlePage,
})
