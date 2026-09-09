import { createServerFn } from '@tanstack/react-start'

export type Contribution = {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export type GitHubActivityData = {
  contributions: Array<Contribution>
  total: number
}

const GITHUB_ACTIVITY_URL =
  'https://github-contributions-api.jogruber.de/v4/williamw-dev?y=last'

function isContribution(value: unknown): value is Contribution {
  if (!value || typeof value !== 'object') return false

  const contribution = value as Record<string, unknown>
  return (
    typeof contribution.date === 'string' &&
    typeof contribution.count === 'number' &&
    typeof contribution.level === 'number' &&
    Number.isInteger(contribution.level) &&
    contribution.level >= 0 &&
    contribution.level <= 4
  )
}

export const getGitHubActivity = createServerFn({ method: 'GET' }).handler(
  async (): Promise<GitHubActivityData | null> => {
    try {
      const response = await fetch(GITHUB_ACTIVITY_URL, {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(4_000),
      })
      if (!response.ok) return null

      const payload: unknown = await response.json()
      if (!payload || typeof payload !== 'object') return null

      const data = payload as Record<string, unknown>
      const total = data.total as Record<string, unknown> | undefined
      if (!Array.isArray(data.contributions)) return null
      if (typeof total?.lastYear !== 'number') return null

      const contributions = data.contributions
        .filter(isContribution)
        .slice(-364)
      if (contributions.length === 0) return null

      return { contributions, total: total.lastYear }
    } catch {
      return null
    }
  },
)
