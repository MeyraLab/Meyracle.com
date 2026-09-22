import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function BackgroundHeroOverlay() {
  const rootRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const leadX = useSpring(x, { stiffness: 150, damping: 26, mass: 0.32 })
  const leadY = useSpring(y, { stiffness: 150, damping: 26, mass: 0.32 })
  const midX = useSpring(x, { stiffness: 72, damping: 18, mass: 0.65 })
  const midY = useSpring(y, { stiffness: 72, damping: 18, mass: 0.65 })
  const trailX = useSpring(x, { stiffness: 34, damping: 14, mass: 1.05 })
  const trailY = useSpring(y, { stiffness: 34, damping: 14, mass: 1.05 })

  useEffect(() => {
    const parent = rootRef.current?.parentElement
    if (!parent) return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const place = (clientX: number, clientY: number, immediate: boolean) => {
      const rect = parent.getBoundingClientRect()
      const nextX = clientX - rect.left
      const nextY = clientY - rect.top
      if (immediate || motionQuery.matches) {
        x.jump(nextX)
        y.jump(nextY)
        leadX.jump(nextX)
        leadY.jump(nextY)
        midX.jump(nextX)
        midY.jump(nextY)
        trailX.jump(nextX)
        trailY.jump(nextY)
        return
      }
      x.set(nextX)
      y.set(nextY)
    }

    const rect = parent.getBoundingClientRect()
    place(rect.left + rect.width * 0.62, rect.top + rect.height * 0.42, true)

    if (motionQuery.matches) return

    const onMove = (event: PointerEvent) => {
      place(event.clientX, event.clientY, false)
    }

    parent.addEventListener('pointermove', onMove)
    return () => parent.removeEventListener('pointermove', onMove)
  }, [leadX, leadY, midX, midY, trailX, trailY, x, y])

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
    >
      <motion.div
        className="absolute top-0 left-0 h-[26rem] w-[26rem] rounded-full blur-3xl"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          background:
            'radial-gradient(circle, rgba(156, 142, 184, 0.5) 0%, rgba(212, 203, 229, 0.18) 46%, rgba(212, 203, 229, 0) 72%)',
          mixBlendMode: 'screen',
        }}
      />
      <motion.div
        className="absolute top-0 left-0 h-72 w-72 rounded-full blur-2xl"
        style={{
          x: midX,
          y: midY,
          translateX: '-42%',
          translateY: '-60%',
          background:
            'radial-gradient(circle, rgba(228, 221, 240, 0.85) 0%, rgba(212, 203, 229, 0.4) 38%, rgba(156, 142, 184, 0) 70%)',
          mixBlendMode: 'screen',
        }}
      />
      <motion.div
        className="absolute top-0 left-0 h-48 w-48 rounded-full blur-xl"
        style={{
          x: leadX,
          y: leadY,
          translateX: '-50%',
          translateY: '-50%',
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 0.62) 0%, rgba(228, 221, 240, 0.34) 34%, rgba(228, 221, 240, 0) 70%)',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  )
}
