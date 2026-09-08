import { createFileRoute } from '@tanstack/react-router'

import { BlogArticle } from '#/components/blog-article'
import { PageLayout } from '#/components/page-layout'
import * as m from '#/paraglide/messages'

export const Route = createFileRoute('/blog')({ component: BlogPage })

function BlogPage() {
  return (
    <PageLayout title={m.blog_title()}>
      <BlogArticle />
    </PageLayout>
  )
}
