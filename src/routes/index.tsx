import { createFileRoute } from '@tanstack/react-router'

import { HomePage } from '#/components/home-page'
import { getGitHubActivity } from '#/data/github-activity'

export const Route = createFileRoute('/')({
  loader: () => ({ githubActivity: getGitHubActivity() }),
  staleTime: 15 * 60 * 1_000,
  gcTime: 30 * 60 * 1_000,
  component: HomeRoute,
})

function HomeRoute() {
  const { githubActivity } = Route.useLoaderData()
  return <HomePage githubActivity={githubActivity} />
}
