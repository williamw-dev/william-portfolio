import * as m from '#/paraglide/messages'

const emphasis =
  'font-semibold text-zinc-900 underline decoration-blue-500/70 decoration-1 underline-offset-4 dark:text-zinc-100'

export function ProfileIntro() {
  return (
    <div className="space-y-5 text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:text-[15px]">
      <p>
        {m.intro_one_prefix()}{' '}
        <strong className={emphasis}>{m.intro_one_highlight()}</strong>{' '}
        {m.intro_one_suffix()}
      </p>
      <p>
        {m.intro_two_prefix()}{' '}
        <strong className={emphasis}>{m.intro_two_highlight()}</strong>.{' '}
        {m.intro_two_middle()}{' '}
        <strong className={emphasis}>{m.intro_two_highlight_two()}</strong>
      </p>
    </div>
  )
}
