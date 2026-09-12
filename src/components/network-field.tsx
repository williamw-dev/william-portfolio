const spans = [
  { label: 'NAVIGATION', meta: '142ms', start: 0, width: 96, tone: 'root' },
  { label: 'DNS / TLS', meta: '18ms', start: 3, width: 13, tone: 'sync' },
  { label: 'GET /fr', meta: '118ms', start: 16, width: 80, tone: 'sync' },
  { label: 'I18N / FR', meta: '4ms', start: 21, width: 9, tone: 'fast' },
  { label: 'TANSTACK SSR', meta: '47ms', start: 32, width: 34, tone: 'async' },
  { label: 'SEO / JSON-LD', meta: '31ms', start: 38, width: 24, tone: 'async' },
  { label: 'GITHUB FETCH', meta: '24ms', start: 70, width: 18, tone: 'data' },
  {
    label: 'FIRST PAINT',
    meta: 'ready',
    start: 89,
    width: 7,
    tone: 'telemetry',
  },
] as const

const ticks = ['0', '30', '60', '90', '120', '142 MS']

export function NetworkField() {
  return (
    <section
      className="trace-console relative isolate overflow-hidden border-y-4 border-double bg-zinc-100 dark:bg-[#060606]"
      aria-label="Distributed request lifecycle"
    >
      <div className="flex items-center justify-between border-b border-dotted px-4 py-2 font-mono text-[9px] tracking-[0.12em] text-zinc-500 sm:px-6">
        <span>WILLIAM.SYSTEMS / DISCOVERY TRACE</span>
        <span className="hidden sm:inline">
          GOOGLE / WILLIAM WAUTRIN / RESULT_01
        </span>
        <span className="sm:hidden">RESULT_01</span>
      </div>

      <div className="trace-body architecture-grid relative px-4 pb-9 pt-6 sm:px-6 sm:pb-14 sm:pt-10">
        <div className="trace-edge trace-edge-left">CLOUD / EDGE</div>
        <div className="trace-edge trace-edge-right">OPERABLE BY DESIGN</div>
        <div className="mb-4 grid grid-cols-[76px_1fr] items-end gap-3 sm:grid-cols-[106px_1fr] sm:gap-5">
          <div>
            <p className="font-mono text-[8px] text-zinc-500">GET_WILLIAM_01</p>
            <p className="mt-1 text-lg font-medium tracking-[-0.04em] sm:text-xl">
              142<span className="ml-1 text-[10px] text-blue-500">ms</span>
            </p>
          </div>
          <div className="flex justify-between border-b border-dotted pb-1 font-mono text-[7px] text-zinc-400">
            {ticks.map((tick, index) => (
              <span
                key={tick}
                className={
                  index === 1 || index === 3 ? 'hidden min-[390px]:inline' : ''
                }
              >
                {tick}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-2 sm:space-y-2.5">
          {spans.map((span, index) => (
            <div
              key={span.label}
              className="trace-row grid grid-cols-[76px_1fr] items-center gap-3 sm:grid-cols-[106px_1fr] sm:gap-5"
            >
              <span className="truncate font-mono text-[7px] tracking-[0.08em] text-zinc-500 sm:text-[8px]">
                {span.label}
              </span>
              <div className="trace-track relative h-5 border-l border-dotted">
                <span
                  className={`trace-span trace-span-${span.tone} absolute inset-y-0 flex items-center justify-end px-1.5 font-mono text-[7px]`}
                  style={{ left: `${span.start}%`, width: `${span.width}%` }}
                >
                  <span className="hidden sm:inline">{span.meta}</span>
                  <span
                    className="trace-packet absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-blue-500"
                    style={{ animationDelay: `${index * -0.31}s` }}
                  />
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-3 left-4 flex gap-3 font-mono text-[7px] tracking-[0.08em] text-zinc-500 sm:left-6 sm:gap-6">
          <span>TANSTACK START</span>
          <span>SSR</span>
          <span>I18N</span>
          <span className="hidden min-[390px]:inline">TYPESCRIPT</span>
        </div>
        <span className="absolute bottom-3 right-4 hidden font-mono text-[7px] text-zinc-500 sm:block sm:right-6">
          PAR · 48.8566° N
        </span>
      </div>
    </section>
  )
}
