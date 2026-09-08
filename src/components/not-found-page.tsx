import { Link } from '@tanstack/react-router'

import * as m from '#/paraglide/messages'

export function NotFoundPage() {
  return (
    <main className="relative grid min-h-[calc(100dvh-153px)] place-items-center overflow-hidden px-4 py-16 text-center">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(rgba(127,127,127,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(127,127,127,.12) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="relative border border-dotted bg-zinc-50 p-8 dark:bg-[#090909] sm:p-12">
        <p className="font-mono text-xs text-zinc-500">
          ERR_ROUTE_{m.not_found_code()}
        </p>
        <h1 className="mt-4 text-2xl font-medium tracking-tight sm:text-3xl">
          {m.not_found_title()}
        </h1>
        <p className="mt-3 text-sm text-zinc-500">{m.not_found_body()}</p>
        <Link
          to="/"
          className="mt-8 inline-flex border border-dotted px-3 py-2 text-xs transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900"
        >
          {m.back_home()}
        </Link>
      </div>
    </main>
  )
}
