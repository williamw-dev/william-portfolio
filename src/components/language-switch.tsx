import { useRouterState } from '@tanstack/react-router'
import { LuLanguages } from 'react-icons/lu'

import {
  deLocalizeHref,
  getLocale,
  localizeHref,
  setLocale,
} from '#/paraglide/runtime'
import * as m from '#/paraglide/messages'

export function LanguageSwitch() {
  const locale = getLocale()
  const target = locale === 'en' ? 'fr' : 'en'
  const currentHref = useRouterState({
    select: (state) => state.location.href,
  })
  const targetHref = localizeHref(deLocalizeHref(currentHref), {
    locale: target,
  })

  return (
    <a
      href={targetHref}
      hrefLang={target}
      aria-label={m.language_label()}
      onClick={(event) => {
        event.preventDefault()
        void setLocale(target)
      }}
      className="flex h-9 items-center gap-1.5 px-1 text-xs text-zinc-500 transition-colors hover:text-zinc-950 dark:hover:text-white"
    >
      <LuLanguages size={14} />
      <span>{target.toUpperCase()}</span>
    </a>
  )
}
