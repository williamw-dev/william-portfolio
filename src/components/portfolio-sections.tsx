import {
  LuArrowUpRight,
  LuBadgeCheck,
  LuBoxes,
  LuBraces,
  LuCloud,
  LuDatabase,
  LuMap,
  LuNetwork,
} from 'react-icons/lu'
import { Link } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'

import * as m from '#/paraglide/messages'

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-7 flex items-center gap-3">
      <span className="size-1.5 bg-blue-500" />
      <h2 className="text-xs font-medium text-zinc-500">{children}</h2>
      <span className="h-px flex-1 bg-zinc-300 dark:bg-zinc-800" />
    </div>
  )
}

const featuredProjects = [
  {
    name: 'Lootopia',
    description: m.lootopia_description,
    architecture: m.lootopia_architecture,
    href: 'https://github.com/williamw-dev/lootopia',
    Icon: LuMap,
    variant: 'geo',
    signal: 'GEO / MULTI-CLIENT',
  },
  {
    name: 'Party',
    description: m.party_description,
    architecture: m.party_architecture,
    href: 'https://github.com/williamw-dev/party',
    Icon: LuNetwork,
    variant: 'cluster',
    signal: 'REALTIME / GKE',
  },
  {
    name: 'Instamint',
    description: m.instamint_description,
    architecture: m.instamint_architecture,
    href: 'https://github.com/williamw-dev/instamint',
    Icon: LuBraces,
    variant: 'web3',
    signal: 'WEB3 / SERVICE SPLIT',
  },
  {
    name: 'Global Digital',
    description: m.global_digital_description,
    architecture: m.global_digital_architecture,
    href: 'https://github.com/williamw-dev/global-digital',
    Icon: LuBoxes,
    variant: 'gitops',
    signal: 'APP / INFRA DELIVERY',
  },
] as const

const additionalProjects = [
  {
    name: 'Cloud VM App',
    description: m.cloud_vm_description,
    architecture: m.cloud_vm_architecture,
    href: 'https://github.com/williamw-dev/cloud-vm-app',
    Icon: LuCloud,
    variant: 'azure',
    signal: 'AZURE / SELF-SERVICE',
  },
  {
    name: 'Travel Hub',
    description: m.travel_hub_description,
    architecture: m.travel_hub_architecture,
    href: 'https://github.com/williamw-dev/travel-hub',
    Icon: LuDatabase,
    variant: 'data',
    signal: 'CACHE / DATA GRAPH',
  },
] as const

const projectTopologies = {
  geo: {
    nodes: [
      [22, 52, 'MOBILE'],
      [122, 52, 'HONO API'],
      [242, 25, 'POSTGIS'],
      [242, 79, 'REDIS'],
    ],
    paths: ['M92 65H122', 'M192 65H217V38H242', 'M217 65V92H242'],
  },
  cluster: {
    nodes: [
      [14, 52, 'NEXT'],
      [102, 52, 'HONO RPC'],
      [202, 25, 'REDIS'],
      [280, 52, 'GKE'],
    ],
    paths: ['M84 65H102', 'M172 65H187V38H202', 'M187 65H280'],
  },
  web3: {
    nodes: [
      [18, 52, 'NEXT'],
      [112, 20, 'BUSINESS'],
      [112, 84, 'FILES'],
      [245, 20, 'POSTGRES'],
      [245, 84, 'OBJECTS'],
    ],
    paths: ['M88 65H99V33H112', 'M99 65V97H112', 'M182 33H245', 'M182 97H245'],
  },
  gitops: {
    nodes: [
      [18, 52, 'GITHUB'],
      [112, 19, 'NEXT + DRZ'],
      [230, 19, 'POSTGRES'],
      [112, 84, 'TERRAFORM'],
      [230, 84, 'HELM / K8S'],
    ],
    paths: [
      'M88 65H100V32H112',
      'M100 65V97H112',
      'M182 32H230',
      'M182 97H230',
    ],
  },
  azure: {
    nodes: [
      [14, 52, 'USER'],
      [102, 52, 'NEXT API'],
      [202, 20, 'POSTGRES'],
      [274, 84, 'AZURE VM'],
    ],
    paths: ['M84 65H102', 'M172 65H187V33H202', 'M187 65V97H274'],
  },
  data: {
    nodes: [
      [18, 52, 'API'],
      [112, 20, 'REDIS'],
      [238, 20, 'MONGO'],
      [238, 84, 'NEO4J'],
    ],
    paths: ['M88 65H99V33H112', 'M182 33H238', 'M203 33V97H238'],
  },
} as const

function ProjectVisual({
  variant,
}: {
  variant: keyof typeof projectTopologies
}) {
  const topology = projectTopologies[variant]
  return (
    <div className="project-grid relative h-40 overflow-hidden border-b border-dotted">
      <svg viewBox="0 0 360 150" className="h-full w-full" aria-hidden="true">
        <g className="project-path">
          {topology.paths.map((path) => (
            <path key={path} d={path} />
          ))}
        </g>
        <g className="project-path-active">
          {topology.paths.map((path) => (
            <path key={path} d={path} />
          ))}
        </g>
        {topology.nodes.map(([x, y, label]) => (
          <g key={label} className="project-node">
            <rect x={x} y={y} width="70" height="26" />
            <text x={x + 35} y={y + 16} textAnchor="middle">
              {label}
            </text>
          </g>
        ))}
      </svg>
      <span className="absolute bottom-2 right-3 font-mono text-[8px] text-zinc-500">
        {variant.toUpperCase()}_TOPOLOGY
      </span>
    </div>
  )
}

export function ProjectsSection({ page = false }: { page?: boolean }) {
  const projects = page
    ? [...featuredProjects, ...additionalProjects]
    : featuredProjects
  const ProjectHeading = page ? 'h2' : 'h3'

  return (
    <section
      className={page ? '' : 'section-boundary px-4 py-12 sm:px-6 sm:py-16'}
    >
      {!page && <SectionTitle>{m.projects_title()}</SectionTitle>}
      {page && (
        <p className="mb-8 max-w-xl text-xs leading-5 text-zinc-500">
          {m.projects_page_intro()}
        </p>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        {projects.map(
          ({
            name,
            description,
            architecture,
            href,
            Icon,
            variant,
            signal,
          }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="project-card group relative overflow-hidden border border-zinc-300 bg-zinc-50 dark:border-zinc-800 dark:bg-[#090909]"
            >
              <ProjectVisual variant={variant} />
              <div className="p-4 sm:p-5">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <ProjectHeading className="flex items-center gap-2 text-sm font-medium">
                    <Icon size={14} />
                    {name}
                  </ProjectHeading>
                  <LuArrowUpRight
                    size={14}
                    className="shrink-0 text-zinc-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
                <p className="min-h-15 text-xs leading-5 text-zinc-500">
                  {description()}
                </p>
                <div className="mt-4 border-t border-dotted pt-3 font-mono text-[9px] leading-4 text-blue-500">
                  {architecture()}
                </div>
                <span className="mt-2 block font-mono text-[8px] tracking-[0.12em] text-zinc-400">
                  {signal}
                </span>
              </div>
            </a>
          ),
        )}
      </div>
      {!page && (
        <Link
          to="/projects"
          className="mt-6 inline-flex items-center gap-2 text-xs text-zinc-500 transition-colors hover:text-blue-500"
        >
          {m.projects_more_label()}
          <LuArrowUpRight size={12} />
        </Link>
      )}
    </section>
  )
}

const experiences = [
  {
    company: 'Thales',
    role: m.thales_current_role,
    period: m.thales_current_period,
    description: m.thales_current_description,
    details: [
      m.thales_current_detail_one,
      m.thales_current_detail_two,
      m.thales_current_detail_three,
      m.thales_current_detail_four,
    ],
    current: true,
  },
  {
    company: 'Thales',
    role: m.thales_apprentice_role,
    period: m.thales_apprentice_period,
    description: m.thales_apprentice_description,
    details: [
      m.thales_apprentice_detail_one,
      m.thales_apprentice_detail_two,
      m.thales_apprentice_detail_three,
    ],
    current: false,
  },
  {
    company: 'Coyote System',
    role: m.coyote_role,
    period: m.coyote_period,
    description: m.coyote_description,
    details: [m.coyote_detail_one, m.coyote_detail_two],
    current: false,
  },
]

export function ExperienceSection({ page = false }: { page?: boolean }) {
  if (!page) {
    return <ExperiencePreview />
  }

  return (
    <section>
      <p className="mb-8 max-w-xl text-xs leading-5 text-zinc-500">
        {m.experience_page_intro()}
      </p>
      <ExperienceTimeline>
        {experiences.map((experience) => (
          <article
            key={`${experience.company}-${experience.period()}`}
            className="relative border-b border-dotted py-7 first:pt-0 last:border-0 last:pb-0"
          >
            <span className="absolute -left-[23px] top-8 size-[5px] bg-zinc-400 first:top-1 dark:bg-zinc-600 sm:-left-[35px]" />
            <div className="grid gap-2 sm:grid-cols-[160px_1fr] sm:gap-6">
              <div>
                <div className="flex items-center gap-2 text-sm font-medium">
                  {experience.current && (
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                  )}
                  {experience.company}
                </div>
                <p className="mt-1 font-mono text-[9px] text-zinc-500">
                  {experience.period()}
                </p>
              </div>
              <div>
                <h2 className="text-sm">{experience.role()}</h2>
                <p className="mt-2 text-xs leading-5 text-zinc-500">
                  {experience.description()}
                </p>
                <ul className="mt-4 space-y-3">
                  {experience.details.map((detail) => (
                    <li
                      key={detail()}
                      className="grid grid-cols-[12px_1fr] gap-2 text-[11px] leading-5 text-zinc-500"
                    >
                      <span className="font-mono text-blue-500">→</span>
                      <span>{detail()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </ExperienceTimeline>
    </section>
  )
}

function ExperiencePreview() {
  return (
    <section className="section-boundary px-4 py-12 sm:px-6 sm:py-16">
      <SectionTitle>{m.experience_title()}</SectionTitle>
      <ol className="border-y-4 border-double">
        {experiences.map((experience) => (
          <li
            key={`${experience.company}-${experience.period()}`}
            className="grid gap-2 border-b border-dotted py-4 last:border-0 sm:grid-cols-[160px_1fr_auto] sm:items-center sm:gap-6"
          >
            <div className="flex items-center gap-2 text-sm font-medium">
              {experience.current && (
                <span className="size-1.5 rounded-full bg-emerald-500" />
              )}
              {experience.company}
            </div>
            <p className="text-xs text-zinc-500">{experience.role()}</p>
            <p className="font-mono text-[9px] text-zinc-500">
              {experience.period()}
            </p>
          </li>
        ))}
      </ol>
      <Link
        to="/experience"
        className="mt-6 inline-flex items-center gap-2 text-xs text-zinc-500 transition-colors hover:text-blue-500"
      >
        {m.experience_more_label()}
        <LuArrowUpRight size={12} />
      </Link>
    </section>
  )
}

function ExperienceTimeline({ children }: { children: React.ReactNode }) {
  const timelineRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const updateProgress = () => {
      const timeline = timelineRef.current
      const progress = progressRef.current
      if (!timeline || !progress) return
      const rect = timeline.getBoundingClientRect()
      const viewportAnchor = window.innerHeight * 0.7
      const ratio = Math.max(
        0,
        Math.min(1, (viewportAnchor - rect.top) / rect.height),
      )
      progress.style.transform = `scaleY(${ratio})`
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return (
    <div
      ref={timelineRef}
      className="relative border-l border-zinc-300 pl-5 dark:border-zinc-800 sm:pl-8"
    >
      <span
        ref={progressRef}
        className="absolute -left-1 top-0 h-full w-[7px] origin-top scale-y-0 bg-blue-500 will-change-transform"
      />
      {children}
    </div>
  )
}

const certifications = [
  { issuer: 'AWS', label: m.cert_aws_architect },
  { issuer: 'AWS', label: m.cert_aws_developer },
  { issuer: 'CNCF', label: m.cert_cka },
  { issuer: 'HC', label: m.cert_terraform },
  { issuer: 'CISCO', label: m.cert_ccna },
]

export function CertificationsSection() {
  return (
    <section className="section-boundary px-4 py-12 sm:px-6 sm:py-16">
      <SectionTitle>{m.certifications_title()}</SectionTitle>
      <div className="grid gap-6 sm:grid-cols-[1fr_1.55fr]">
        <div>
          <p className="text-xs leading-5 text-zinc-500">
            {m.certifications_description()}
          </p>
          <a
            href="https://www.credly.com/users/william-wautrin"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 border border-zinc-300 px-3 py-2 text-xs transition-colors hover:border-blue-500 hover:text-blue-500 dark:border-zinc-700"
          >
            <LuBadgeCheck size={14} />
            {m.credly_label()}
            <LuArrowUpRight size={12} />
          </a>
        </div>
        <ul className="border-y-4 border-double">
          {certifications.map(({ issuer, label }) => (
            <li
              key={issuer + label()}
              className="grid grid-cols-[54px_1fr] items-center border-b border-dotted py-3 last:border-0"
            >
              <span className="font-mono text-[8px] tracking-wider text-blue-500">
                {issuer}
              </span>
              <span className="text-xs">{label()}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function StackSection() {
  const groups = [
    {
      label: 'PLATFORM',
      tools: ['Kubernetes', 'Terraform', 'Helm', 'Argo CD'],
    },
    {
      label: 'CLOUD',
      tools: ['AWS', 'GCP'],
    },
    {
      label: 'BACKEND',
      tools: ['Java / Spring', 'TypeScript', 'PostgreSQL', 'Redis'],
    },
    {
      label: 'OBSERVE',
      tools: ['Prometheus', 'Grafana', 'OpenTelemetry'],
    },
  ]
  return (
    <section className="section-boundary px-4 py-12 sm:px-6 sm:py-16">
      <SectionTitle>{m.stack_title()}</SectionTitle>
      <p className="mb-6 max-w-md text-xs leading-5 text-zinc-500">
        {m.stack_description()}
      </p>
      <dl className="border-y-4 border-double">
        {groups.map(({ label, tools }) => (
          <div
            key={label}
            className="grid gap-3 border-b border-dotted py-4 last:border-0 sm:grid-cols-[110px_1fr] sm:items-baseline"
          >
            <dt className="flex items-center gap-2 font-mono text-[8px] tracking-[0.1em] text-blue-500">
              <span className="h-px w-3 bg-blue-500" />
              {label}
            </dt>
            <dd>
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {tools.map((tool) => (
                  <li key={tool} className="text-xs text-zinc-500">
                    {tool}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
