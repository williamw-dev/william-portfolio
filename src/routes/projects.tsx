import { createFileRoute } from '@tanstack/react-router'

import { PageLayout } from '#/components/page-layout'
import { ProjectsSection } from '#/components/portfolio-sections'
import * as m from '#/paraglide/messages'

export const Route = createFileRoute('/projects')({ component: ProjectsPage })

function ProjectsPage() {
  return (
    <PageLayout title={m.projects_page_title()}>
      <ProjectsSection page />
    </PageLayout>
  )
}
