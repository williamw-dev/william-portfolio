import { Link } from '@tanstack/react-router'
import { LuArrowLeft, LuArrowRight, LuArrowUpRight } from 'react-icons/lu'

import { BlogDiagram } from '#/components/blog-diagrams'
import { GKE_ARTICLE_PATHS } from '#/config/site'
import { gkeArticleEn } from '#/content/gke-article.en'
import { gkeArticleFr } from '#/content/gke-article.fr'
import type { ArticleBlock } from '#/content/gke-article.types'
import * as m from '#/paraglide/messages'
import { getLocale } from '#/paraglide/runtime'

function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g)
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={index}>{part.slice(1, -1)}</code>
    }
    return part
  })
}

function Block({ block }: { block: ArticleBlock }) {
  if (block.type === 'diagram') return <BlogDiagram name={block.name} />
  if (block.type === 'code') {
    return (
      <pre className="my-7 overflow-x-auto border-l-2 border-blue-500 bg-zinc-100 px-4 py-4 font-mono text-[10px] leading-5 text-zinc-600 dark:bg-zinc-950 dark:text-zinc-400">
        <code>{block.code}</code>
      </pre>
    )
  }
  if (block.type === 'questions') {
    return (
      <ul className="my-7 space-y-2 border-l border-dotted pl-5">
        {block.items.map((item) => (
          <li
            key={item}
            className="text-sm leading-6 text-zinc-500 before:mr-3 before:text-blue-500 before:content-['—']"
          >
            {item}
          </li>
        ))}
      </ul>
    )
  }
  return (
    <p className="my-5 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
      <InlineText text={block.text} />
    </p>
  )
}

const references = [
  {
    href: 'https://github.com/williamw-dev/party',
    label: m.article_source_party,
  },
  {
    href: 'https://cloud.google.com/kubernetes-engine/docs',
    label: m.article_source_gke,
  },
  {
    href: 'https://argo-cd.readthedocs.io/',
    label: m.article_source_argocd,
  },
  {
    href: 'https://external-secrets.io/latest/',
    label: m.article_source_external_secrets,
  },
] as const

export function BlogArticleCard() {
  const isFrench = getLocale() === 'fr'
  const article = isFrench ? gkeArticleFr : gkeArticleEn
  const articlePath = isFrench ? GKE_ARTICLE_PATHS.fr : GKE_ARTICLE_PATHS.en

  return (
    <Link
      to={articlePath}
      className="blog-card group flex items-center justify-between gap-5 border p-5 sm:p-6"
    >
      <div>
        <p className="font-mono text-[8px] tracking-[0.1em] text-blue-500">
          2025 / {m.article_field_note()}
        </p>
        <h2 className="mt-2 max-w-xl text-base font-medium leading-6 transition-colors group-hover:text-blue-500 sm:text-lg">
          {article.title}
        </h2>
        <p className="mt-2 max-w-xl text-xs leading-5 text-zinc-500">
          {article.excerpt}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 font-mono text-[9px] text-zinc-500 transition-colors group-hover:text-blue-500">
          {m.article_read()}
          <LuArrowRight size={12} />
        </span>
      </div>
      <span className="grid size-9 shrink-0 place-items-center border border-dotted text-zinc-500 transition-[border-color,color,transform] group-hover:translate-x-0.5 group-hover:border-blue-500 group-hover:text-blue-500">
        <LuArrowRight size={15} />
      </span>
    </Link>
  )
}

export function BlogArticlePage() {
  const locale = getLocale() === 'fr' ? 'fr' : 'en'
  const isFrench = locale === 'fr'
  const article = isFrench ? gkeArticleFr : gkeArticleEn

  return (
    <main className="min-h-[calc(100dvh-153px)] min-w-0 max-w-full overflow-x-hidden px-4 py-12 sm:px-6 sm:py-16">
      <Link
        to="/blog"
        className="mb-10 inline-flex min-h-8 items-center gap-2 text-xs text-zinc-500 transition-colors hover:text-zinc-950 dark:hover:text-white"
      >
        <LuArrowLeft size={13} />
        {m.article_back_blog()}
      </Link>

      <article className="blog-entry min-w-0 max-w-full overflow-x-hidden">
        <header className="min-w-0 border-b-4 border-double pb-10 sm:pb-12">
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[9px] text-zinc-500">
            <p className="text-blue-500">{m.article_field_note()}</p>
            <p>
              <time dateTime="2025">2025</time> / {article.meta}
            </p>
          </div>
          <h1 className="mt-6 max-w-2xl break-words text-3xl font-medium leading-[1.08] tracking-[-0.045em] sm:text-5xl">
            {article.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-500 sm:text-lg sm:leading-8">
            {article.excerpt}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-dotted pt-5 text-xs text-zinc-500">
            <span>{m.article_byline()}</span>
            <a
              href="https://github.com/williamw-dev/party"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-8 items-center gap-1.5 transition-colors hover:text-blue-500"
            >
              {m.article_view_party()}
              <LuArrowUpRight size={12} />
            </a>
          </div>
        </header>

        <div className="border-b border-dotted py-9 sm:py-11">
          {article.introduction.map((paragraph) => (
            <p
              key={paragraph}
              className="my-5 max-w-2xl text-sm leading-7 text-zinc-600 first:mt-0 first:text-lg first:leading-8 last:mb-0 dark:text-zinc-400"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {article.sections.map((section) => (
          <section
            key={section.title}
            className="article-section min-w-0 border-b border-dotted py-10 sm:py-12"
          >
            <h2 className="max-w-xl text-xl font-medium leading-7 tracking-[-0.02em] sm:text-2xl">
              {section.title}
            </h2>
            <div className="mt-6 min-w-0 max-w-2xl">
              {section.blocks.map((block, index) => (
                <Block key={`${block.type}-${index}`} block={block} />
              ))}
            </div>
          </section>
        ))}

        <footer className="py-10 sm:py-12">
          <h2 className="font-mono text-[9px] text-zinc-500">
            {m.article_project_links()}
          </h2>
          <ul className="mt-4 grid gap-px border bg-zinc-300 dark:bg-zinc-800 sm:grid-cols-2">
            {references.map((reference) => (
              <li key={reference.href} className="bg-zinc-50 dark:bg-[#090909]">
                <a
                  href={reference.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-12 items-center justify-between gap-3 px-4 py-3 text-xs text-zinc-500 transition-colors hover:text-blue-500"
                >
                  {reference.label()}
                  <LuArrowUpRight className="shrink-0" size={12} />
                </a>
              </li>
            ))}
          </ul>
        </footer>
      </article>
    </main>
  )
}
