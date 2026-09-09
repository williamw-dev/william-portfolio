import { Link, Outlet, useRouterState } from '@tanstack/react-router'
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6'

import { LanguageSwitch } from '#/components/language-switch'
import { BackToTop } from '#/components/back-to-top'
import { ParisClock } from '#/components/paris-clock'
import { ThemeToggle } from '#/components/theme-toggle'
import * as m from '#/paraglide/messages'

const nav = [
  { to: '/', label: m.nav_home },
  { to: '/projects', label: m.nav_projects },
  { to: '/experience', label: m.nav_experience },
  { to: '/blog', label: m.nav_blog },
] as const

export function SiteShell() {
  const isNavigating = useRouterState({
    select: (state) => state.status === 'pending',
  })

  return (
    <>
      <div
        data-theme-surface
        className="mx-auto min-h-dvh w-full max-w-[820px] overflow-x-hidden border-x border-dotted bg-zinc-50 dark:bg-[#090909]"
      >
        <header className="sticky top-0 z-50 border-b border-dotted bg-zinc-50/90 backdrop-blur-md dark:bg-[#090909]/90">
          <div className="flex h-16 items-center justify-between gap-2 px-4 sm:px-6">
            <Link to="/" aria-label="William Wautrin — accueil">
              <ParisClock />
            </Link>
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="https://github.com/williamw-dev"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-zinc-950 dark:hover:text-white"
              >
                <FaGithub size={15} />
                <span className="hidden sm:inline">{m.github_label()}</span>
              </a>
              <span className="h-4 w-px bg-zinc-300 dark:bg-zinc-800" />
              <LanguageSwitch />
              <ThemeToggle />
            </div>
          </div>
          <nav
            className="relative flex gap-5 overflow-x-auto px-4 pb-3 text-xs text-zinc-500 sm:px-6"
            aria-label="Primary navigation"
          >
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeProps={{ className: 'text-zinc-950 dark:text-white' }}
                activeOptions={{ exact: item.to === '/' }}
                className="nav-link relative whitespace-nowrap pb-0.5 transition-colors"
              >
                {item.label()}
              </Link>
            ))}
          </nav>
          <span
            className={`nav-progress absolute bottom-0 left-0 h-px bg-blue-500 ${isNavigating ? 'is-running' : ''}`}
          />
        </header>
        <Outlet />
        <footer className="flex flex-col gap-4 border-t-4 border-double px-4 py-8 text-[11px] text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="font-mono text-[9px]">© {new Date().getFullYear()}</p>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/williamw-dev"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="social-link"
            >
              <FaGithub size={15} />
            </a>
            <a
              href="https://x.com/builtbywilliam"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="social-link"
            >
              <FaXTwitter size={14} />
            </a>
            <a
              href="https://www.linkedin.com/in/william-www"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="social-link"
            >
              <FaLinkedin size={15} />
            </a>
          </div>
        </footer>
      </div>
      <BackToTop />
    </>
  )
}
