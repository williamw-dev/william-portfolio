import { createFileRoute } from '@tanstack/react-router'

import { PageLayout } from '#/components/page-layout'
import { ExperienceSection } from '#/components/portfolio-sections'
import * as m from '#/paraglide/messages'

export const Route = createFileRoute('/experience')({
  component: ExperiencePage,
})

function ExperiencePage() {
  return (
    <PageLayout title={m.experience_page_title()}>
      <ExperienceSection page />
    </PageLayout>
  )
}
