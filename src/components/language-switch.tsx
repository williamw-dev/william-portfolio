import { LuLanguages } from 'react-icons/lu'

import { getLocale, setLocale } from '#/paraglide/runtime'
import * as m from '#/paraglide/messages'

export function LanguageSwitch() {
  const locale = getLocale()
  const target = locale === 'en' ? 'fr' : 'en'

  return (
    <button
      type="button"
      onClick={() => setLocale(target)}
      aria-label={m.language_label()}
      className="flex h-9 items-center gap-1.5 px-1 text-xs text-zinc-500 transition-colors hover:text-zinc-950 dark:hover:text-white"
    >
      <LuLanguages size={14} />
      <span>{target.toUpperCase()}</span>
    </button>
  )
}
