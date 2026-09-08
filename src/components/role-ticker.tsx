import { useEffect, useState } from 'react'

import * as m from '#/paraglide/messages'

export function RoleTicker() {
  const [index, setIndex] = useState(0)
  const roles = [m.role_platform(), m.role_cloud(), m.role_backend()]

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % 3)
    }, 2600)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <span
      className="relative block h-4 overflow-hidden"
      aria-label={roles[index]}
    >
      <span key={roles[index]} className="role-ticker-text absolute inset-0">
        {roles[index]}
      </span>
    </span>
  )
}
