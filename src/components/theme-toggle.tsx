import { LuMoon, LuSun } from 'react-icons/lu'
import { useEffect, useState } from 'react'

import * as m from '#/paraglide/messages'

type Theme = 'light' | 'dark'
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const saved = window.localStorage.getItem('theme')
    const applyTheme = (next: Theme) => {
      setTheme(next)
      document.documentElement.dataset.theme = next
    }
    const explicitTheme = saved === 'light' || saved === 'dark' ? saved : null
    applyTheme(explicitTheme ?? (media.matches ? 'dark' : 'light'))
    if (explicitTheme) return

    const followSystem = (event: MediaQueryListEvent) =>
      applyTheme(event.matches ? 'dark' : 'light')
    media.addEventListener('change', followSystem)
    return () => media.removeEventListener('change', followSystem)
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    const root = document.documentElement
    if (root.classList.contains('is-theme-switching')) {
      root.classList.remove('is-theme-switching')
      void root.offsetWidth
    }
    root.classList.add('is-theme-switching')
    setTheme(next)
    window.localStorage.setItem('theme', next)
    root.dataset.theme = next
    window.setTimeout(() => root.classList.remove('is-theme-switching'), 380)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={m.theme_label()}
      className="relative grid size-9 place-items-center text-zinc-500 transition-colors before:absolute before:inset-0 before:border before:border-dashed before:border-zinc-400 hover:text-zinc-950 dark:before:border-zinc-700 dark:hover:text-white"
    >
      <span className="theme-icon grid place-items-center">
        {theme === 'dark' ? <LuSun size={15} /> : <LuMoon size={15} />}
      </span>
    </button>
  )
}
