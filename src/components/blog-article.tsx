import { LuMinus, LuPlus } from 'react-icons/lu'

import { BlogDiagram } from '#/components/blog-diagrams'
import { gkeArticleEn } from '#/content/gke-article.en'
import { gkeArticleFr } from '#/content/gke-article.fr'
import type { ArticleBlock } from '#/content/gke-article.types'
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

export function BlogArticle() {
  const isFrench = getLocale() === 'fr'
  const article = isFrench ? gkeArticleFr : gkeArticleEn

  return (
    <details className="blog-entry group border border-zinc-300 dark:border-zinc-800">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-5 marker:hidden sm:p-6">
        <div>
          <p className="font-mono text-[8px] tracking-[0.1em] text-blue-500">
            2025 / FIELD NOTE 001
          </p>
          <h2 className="mt-2 max-w-xl text-base font-medium leading-6 sm:text-lg">
            {article.title}
          </h2>
          <p className="mt-2 max-w-xl text-xs leading-5 text-zinc-500">
            {article.excerpt}
          </p>
        </div>
        <span className="grid size-9 shrink-0 place-items-center border border-dotted text-zinc-500 transition-colors group-open:border-blue-500 group-open:text-blue-500">
          <LuPlus className="group-open:hidden" size={15} />
          <LuMinus className="hidden group-open:block" size={15} />
        </span>
      </summary>

      <article className="border-t-4 border-double px-5 pb-14 pt-8 sm:px-10 sm:pb-20 sm:pt-12">
        <header className="mb-12 border-b border-dotted pb-8">
          <p className="font-mono text-[8px] text-blue-500">{article.meta}</p>
          {article.introduction.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-5 text-sm leading-7 text-zinc-600 first:text-lg first:leading-8 dark:text-zinc-400"
            >
              {paragraph}
            </p>
          ))}
        </header>

        {article.sections.map((section) => (
          <section
            key={section.title}
            className="article-section border-b border-dotted py-10 last:border-0 last:pb-0"
          >
            <h2 className="max-w-xl text-xl font-medium leading-7 tracking-[-0.02em] sm:text-2xl">
              {section.title}
            </h2>
            <div className="mt-6">
              {section.blocks.map((block, index) => (
                <Block key={`${block.type}-${index}`} block={block} />
              ))}
            </div>
          </section>
        ))}
      </article>
    </details>
  )
}
