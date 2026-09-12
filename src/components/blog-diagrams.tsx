import { LuArrowDown, LuArrowRight } from 'react-icons/lu'

import type { DiagramName } from '#/content/gke-article.types'

function Frame({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <figure className="blog-diagram architecture-grid my-9 min-w-0 max-w-full overflow-hidden border-y-4 border-double px-4 py-5 sm:px-6">
      <figcaption className="mb-5 font-mono text-[8px] tracking-[0.1em] text-zinc-500">
        {label}
      </figcaption>
      {children}
    </figure>
  )
}

function Node({
  children,
  accent = false,
}: {
  children: React.ReactNode
  accent?: boolean
}) {
  return (
    <span
      className={`grid min-h-12 min-w-20 place-items-center border px-2 text-center font-mono text-[8px] ${accent ? 'border-blue-500 text-blue-500' : 'border-zinc-300 bg-zinc-50 text-zinc-500 dark:border-zinc-700 dark:bg-[#090909]'}`}
    >
      {children}
    </span>
  )
}

function Arrow({ down = false }: { down?: boolean }) {
  return down ? (
    <LuArrowDown className="mx-auto text-blue-500" size={13} />
  ) : (
    <LuArrowRight
      className="shrink-0 text-blue-500 max-sm:rotate-90"
      size={13}
    />
  )
}

function Flow({ items }: { items: Array<string> }) {
  return (
    <div className="flex items-center justify-center gap-2 max-sm:flex-col sm:gap-3">
      {items.map((item, index) => (
        <div key={item} className="contents">
          <Node accent={index === items.length - 1}>{item}</Node>
          {index < items.length - 1 ? <Arrow /> : null}
        </div>
      ))}
    </div>
  )
}

function ArchitectureDiagram() {
  return (
    <Frame label="PARTY / DELIVERY + RUNTIME">
      <Flow items={['GitHub', 'Actions', 'GHCR', 'Argo CD', 'GKE']} />
      <Arrow down />
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
        <Node>Ingress + TLS</Node>
        <Node>Client / API</Node>
        <Node>PostgreSQL</Node>
      </div>
      <div className="mt-5 grid gap-2 border-t border-dotted pt-4 text-center font-mono text-[7px] text-zinc-500 sm:grid-cols-3">
        <span>cert-manager → Ingress</span>
        <span>Secret Manager → ESO</span>
        <span>Prometheus → Grafana</span>
      </div>
    </Frame>
  )
}

function GitOpsLoopDiagram() {
  return (
    <Frame label="AUTOMATION LOOP / FAILURE MODE">
      <Flow items={['New image', 'Image Updater', 'Git commit', 'CI build']} />
      <div className="mx-auto mt-4 max-w-md border border-dotted border-blue-500 px-4 py-2 text-center font-mono text-[8px] text-blue-500">
        CI build → new image → loop
      </div>
    </Frame>
  )
}

function TargetFlowDiagram() {
  return (
    <Frame label="TARGET / ONE DEPLOYMENT ACTOR">
      <Flow
        items={[
          'Code',
          'CI: test + build',
          'GHCR',
          'Git desired state',
          'Argo CD',
          'GKE',
        ]}
      />
    </Frame>
  )
}

function SecretsDiagram() {
  return (
    <Frame label="SECRET DELIVERY / NO CREDENTIALS IN GIT">
      <Flow
        items={[
          'Secret Manager',
          'ClusterSecretStore',
          'ExternalSecret',
          'K8s Secret',
          'Pod',
        ]}
      />
    </Frame>
  )
}

function ObservabilityDiagram() {
  return (
    <Frame label="TWO VIEWS / ONE SYSTEM">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <Node>CPU · memory · restarts</Node>
        <span className="text-center font-mono text-[8px] text-blue-500">
          CONTAINER ≠ PRODUCT
        </span>
        <Node>events · joins · usage</Node>
      </div>
    </Frame>
  )
}

export function BlogDiagram({ name }: { name: DiagramName }) {
  if (name === 'architecture') return <ArchitectureDiagram />
  if (name === 'gitops-loop') return <GitOpsLoopDiagram />
  if (name === 'target-flow') return <TargetFlowDiagram />
  if (name === 'secrets') return <SecretsDiagram />
  return <ObservabilityDiagram />
}
