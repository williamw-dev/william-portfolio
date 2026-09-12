import { Link } from '@tanstack/react-router'
import { LuArrowLeft } from 'react-icons/lu'

import * as m from '#/paraglide/messages'

export function PageLayout({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <main className="min-h-[calc(100dvh-153px)] px-4 py-12 sm:px-6 sm:py-16">
      <Link
        to="/"
        className="mb-10 inline-flex min-h-8 items-center gap-2 text-xs text-zinc-500 transition-colors hover:text-zinc-950 dark:hover:text-white"
      >
        <LuArrowLeft size={13} />
        {m.back_home()}
      </Link>
      <h1 className="mb-10 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
        {title}
      </h1>
      {children}
    </main>
  )
}
