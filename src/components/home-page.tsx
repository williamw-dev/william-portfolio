import { Await } from '@tanstack/react-router'
import { FaLinkedin, FaXTwitter } from 'react-icons/fa6'
import { LuBadgeCheck, LuFileText, LuMail } from 'react-icons/lu'

import { GitHubActivity } from '#/components/github-activity'
import { NetworkField } from '#/components/network-field'
import { ProfileIntro } from '#/components/profile-intro'
import {
  CertificationsSection,
  ExperienceSection,
  ProjectsSection,
  StackSection,
} from '#/components/portfolio-sections'
import { RoleTicker } from '#/components/role-ticker'
import type { GitHubActivityData } from '#/data/github-activity'
import * as m from '#/paraglide/messages'
import { getLocale } from '#/paraglide/runtime'

export function HomePage({
  githubActivity,
}: {
  githubActivity: Promise<GitHubActivityData | null>
}) {
  const locale = getLocale()
  const resumeHref = `/resume/william-wautrin-cv-${locale}.pdf`

  return (
    <main className="min-w-0">
      <NetworkField />
      <section className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex items-start justify-between gap-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative size-12 shrink-0 border border-dotted bg-zinc-100 dark:bg-zinc-900">
              <img
                src="/william-wautrin.jpeg"
                alt={m.profile_image_alt()}
                width="48"
                height="48"
                className="size-full object-cover grayscale-[20%]"
              />
              <span className="absolute -bottom-1 -right-1 size-2.5 rounded-full border-2 border-zinc-50 bg-emerald-500 dark:border-[#090909]" />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-base font-medium">
                William Wautrin
              </h1>
              <div className="text-xs text-zinc-500">
                <RoleTicker />
              </div>
            </div>
          </div>
          <div className="hidden items-center gap-2 border border-dotted px-2.5 py-1.5 text-[10px] text-zinc-500 sm:flex">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            {m.profile_status()}
          </div>
        </div>

        <div className="mt-8 max-w-[610px]">
          <ProfileIntro />
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          <a
            href="mailto:williamwautrin.pro@gmail.com"
            className="contact-link"
          >
            <LuMail size={13} />
            {m.email_label()}
          </a>
          <a
            href="https://www.linkedin.com/in/william-www"
            target="_blank"
            rel="noreferrer"
            className="contact-link"
          >
            <FaLinkedin size={13} />
            {m.linkedin_label()}
          </a>
          <a
            href="https://x.com/builtbywilliam"
            target="_blank"
            rel="noreferrer"
            className="contact-link"
          >
            <FaXTwitter size={12} />
            {m.x_label()}
          </a>
          <a
            href="https://www.credly.com/users/william-wautrin"
            target="_blank"
            rel="noreferrer"
            className="contact-link"
          >
            <LuBadgeCheck size={13} />
            {m.credly_label()}
          </a>
          <a
            href={resumeHref}
            target="_blank"
            rel="noreferrer"
            aria-label={m.resume_hint()}
            className="contact-link"
          >
            <LuFileText size={13} />
            {m.resume_label()}
          </a>
        </div>
      </section>
      <ProjectsSection />
      <Await
        promise={githubActivity}
        fallback={<GitHubActivity data={undefined} />}
      >
        {(data) => <GitHubActivity data={data} />}
      </Await>
      <ExperienceSection />
      <CertificationsSection />
      <StackSection />
    </main>
  )
}
