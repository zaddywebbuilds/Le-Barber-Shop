import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [isTouch, setIsTouch] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const raf = useRef(null)

  useEffect(() => {
    if ('ontouchstart' in window) {
      setIsTouch(true)
      return
    }

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top = `${e.clientY}px`
      }
    }

    const lerp = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`
        ringRef.current.style.top = `${ringPos.current.y}px`
      }
      raf.current = requestAnimationFrame(lerp)
    }

    const onEnter = () => setIsHovering(true)
    const onLeave = () => setIsHovering(false)

    const interactives = document.querySelectorAll('a, button, [role="button"]')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    window.addEventListener('mousemove', move, { passive: true })
    raf.current = requestAnimationFrame(lerp)

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf.current)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  if (isTouch) return null

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor"
        style={{
          transform: isHovering ? 'translate(-50%, -50%) scale(2.5)' : 'translate(-50%, -50%) scale(1)',
        }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="custom-cursor-ring"
        style={{
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.6 : 1})`,
          borderColor: isHovering ? 'rgba(184,132,61,0.8)' : 'rgba(184,132,61,0.4)',
        }}
        aria-hidden="true"
      />
    </>
  )
}
