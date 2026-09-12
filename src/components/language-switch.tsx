import { useRouterState } from '@tanstack/react-router'
import { LuLanguages } from 'react-icons/lu'

import { getLocalizedContentPath, isGkeArticlePath } from '#/config/site'
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
  const deLocalizedHref = deLocalizeHref(currentHref)
  const currentUrl = new URL(deLocalizedHref, 'https://williamwautrin.com')
  const targetPath = getLocalizedContentPath(currentUrl.pathname, target)
  const targetHref = localizeHref(
    `${targetPath}${currentUrl.search}${currentUrl.hash}`,
    { locale: target },
  )
  const hasLocalizedSlug = isGkeArticlePath(currentUrl.pathname)

  return (
    <a
      href={targetHref}
      hrefLang={target}
      aria-label={m.language_label()}
      onClick={(event) => {
        event.preventDefault()
        if (hasLocalizedSlug) {
          void Promise.resolve(setLocale(target, { reload: false })).then(
            () => {
              window.location.assign(targetHref)
            },
          )
          return
        }
        void setLocale(target)
      }}
      className="flex h-9 items-center gap-1.5 px-1 text-xs text-zinc-500 transition-colors hover:text-zinc-950 dark:hover:text-white"
    >
      <LuLanguages size={14} />
      <span>{target.toUpperCase()}</span>
    </a>
  )
}
