import { LuArrowUp } from 'react-icons/lu'
import { useEffect, useState } from 'react'

import * as m from '#/paraglide/messages'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 520)
    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })
    return () => window.removeEventListener('scroll', updateVisibility)
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={m.back_to_top()}
      tabIndex={visible ? 0 : -1}
      className={`back-to-top fixed bottom-5 z-50 grid size-10 place-items-center border bg-zinc-50 text-zinc-500 shadow-[3px_3px_0_rgb(94_140_255_/_0.18)] transition-[opacity,transform,color] dark:bg-[#090909] ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}
    >
      <LuArrowUp size={15} />
    </button>
  )
}
