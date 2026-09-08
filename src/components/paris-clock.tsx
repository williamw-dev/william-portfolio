import { useEffect, useState } from 'react'

const formatter = new Intl.DateTimeFormat('fr-FR', {
  timeZone: 'Europe/Paris',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
  timeZoneName: 'short',
})

export function ParisClock() {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const update = () => setTime(formatter.format(new Date()))
    update()
    const interval = window.setInterval(update, 1000)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <span className="font-mono text-[10px] tracking-[0.08em] text-zinc-500">
      <span className="text-blue-500">PAR</span> {time ?? '--:--:--'}
    </span>
  )
}
