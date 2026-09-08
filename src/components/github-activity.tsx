import { FaGithub } from 'react-icons/fa6'
import { LuArrowUpRight } from 'react-icons/lu'
import { useEffect, useState } from 'react'

import { SectionTitle } from '#/components/portfolio-sections'
import * as m from '#/paraglide/messages'
import { getLocale } from '#/paraglide/runtime'

type Contribution = {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}
type ContributionsResponse = {
  contributions: Array<Contribution>
  total: Record<string, number>
}

function recentDays(total: number) {
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)
  return Array.from({ length: total }, (_, index) => {
    const date = new Date(today)
    date.setUTCDate(today.getUTCDate() - (total - index - 1))
    return date.toISOString().slice(0, 10)
  })
}

export function GitHubActivity() {
  const locale = getLocale()
  const [contributions, setContributions] = useState<Array<Contribution>>(() =>
    recentDays(364).map((date) => ({ date, count: 0, level: 0 })),
  )
  const [failed, setFailed] = useState(false)
  const [total, setTotal] = useState<number | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    fetch(
      'https://github-contributions-api.jogruber.de/v4/williamw-dev?y=last',
      {
        signal: controller.signal,
      },
    )
      .then((response) => {
        if (!response.ok) throw new Error('GitHub API unavailable')
        return response.json() as Promise<ContributionsResponse>
      })
      .then((response) => {
        setContributions(response.contributions.slice(-364))
        setTotal(response.total.lastYear)
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setFailed(true)
      })
    return () => controller.abort()
  }, [])

  const firstDay = new Date(`${contributions[0]?.date}T00:00:00Z`).getUTCDay()
  const padded: Array<Contribution | null> = [
    ...Array<null>(firstDay).fill(null),
    ...contributions,
  ]
  while (padded.length % 7 !== 0) padded.push(null)
  const weeks = Array.from({ length: padded.length / 7 }, (_, index) =>
    padded.slice(index * 7, index * 7 + 7),
  )

  return (
    <section className="section-boundary px-4 py-12 sm:px-6 sm:py-16">
      <SectionTitle>{m.github_activity_title()}</SectionTitle>
      <div className="border-y-4 border-double py-5">
        <div className="mb-5 flex items-start justify-between gap-6">
          <div>
            <p className="max-w-sm text-xs leading-5 text-zinc-500">
              {failed
                ? m.github_activity_error()
                : m.github_activity_description()}
            </p>
            {total !== null ? (
              <p className="mt-2 font-mono text-[10px] text-blue-500">
                <strong className="font-medium">{total}</strong>{' '}
                {m.github_contributions_suffix()}
              </p>
            ) : null}
          </div>
          <a
            href="https://github.com/williamw-dev"
            target="_blank"
            rel="noreferrer"
            className="flex shrink-0 items-center gap-1 text-[10px] text-zinc-500 hover:text-blue-500"
          >
            <FaGithub size={12} />
            <span className="hidden sm:inline">{m.github_profile_label()}</span>
            <LuArrowUpRight size={12} />
          </a>
        </div>
        <div
          className="grid gap-1"
          style={{
            gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`,
          }}
          aria-label={m.github_activity_title()}
        >
          {weeks.map((week, weekIndex) => {
            const monthStart = week.find((day) => day?.date.endsWith('-01'))
            const month = monthStart
              ? new Intl.DateTimeFormat(locale, {
                  month: 'short',
                  timeZone: 'UTC',
                }).format(new Date(`${monthStart.date}T00:00:00Z`))
              : null
            return (
              <div
                key={weekIndex}
                className="relative grid grid-rows-7 gap-1 pt-5"
              >
                {month ? (
                  <span className="absolute left-0 top-0 font-mono text-[8px] text-zinc-500">
                    {month}
                  </span>
                ) : null}
                {week.map((day, dayIndex) =>
                  day ? (
                    <span
                      key={day.date}
                      className={`activity-cell activity-${day.level}`}
                      title={`${day.date}: ${day.count}`}
                    />
                  ) : (
                    <span key={`empty-${dayIndex}`} />
                  ),
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
