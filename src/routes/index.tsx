import { createFileRoute } from '@tanstack/react-router'

import { HomePage } from '#/components/home-page'
import * as m from '#/paraglide/messages'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: `William Wautrin — ${m.profile_role()}` },
      { name: 'description', content: m.intro_one() },
    ],
  }),
  component: HomePage,
})
