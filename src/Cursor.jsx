import { useEffect, useRef, useState } from 'react'

// A soft follower cursor that grows and shows a label over [data-cursor] elements.
// Only active on devices with a real mouse.
export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    document.documentElement.classList.add('has-cursor')
    let x = -100, y = -100, rx = x, ry = y, raf
    const move = (e) => {
      x = e.clientX; y = e.clientY
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px)`
      const t = e.target.closest?.('[data-cursor], a, button')
      const zone = t?.closest('[data-cursor]')
      const onButton = t && t.matches('a, button') && !t.classList.contains('pcard-media')
      ring.current?.classList.toggle('hover', !!t)
      setLabel(zone && !onButton ? zone.dataset.cursor : '')
    }
    const loop = () => {
      rx += (x - rx) * 0.16; ry += (y - ry) * 0.16
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', move)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [])

  return (
    <>
      <div ref={ring} className={`c-ring ${label ? 'labeled' : ''}`} aria-hidden="true"><span>{label}</span></div>
      <div ref={dot} className="c-dot" aria-hidden="true" />
    </>
  )
}
