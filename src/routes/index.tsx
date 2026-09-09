import { createFileRoute } from '@tanstack/react-router'

import { HomePage } from '#/components/home-page'
import { getGitHubActivity } from '#/data/github-activity'
import * as m from '#/paraglide/messages'

export const Route = createFileRoute('/')({
  loader: () => ({ githubActivity: getGitHubActivity() }),
  staleTime: 15 * 60 * 1_000,
  gcTime: 30 * 60 * 1_000,
  head: () => ({
    meta: [
      { title: `William Wautrin — ${m.profile_role()}` },
      { name: 'description', content: m.intro_one() },
    ],
  }),
  component: HomeRoute,
})

function HomeRoute() {
  const { githubActivity } = Route.useLoaderData()
  return <HomePage githubActivity={githubActivity} />
}
