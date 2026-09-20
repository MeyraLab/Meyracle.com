import { useEffect, useState, type RefObject } from 'react'

export const DEMO_INTERVAL_MS = 1450
export const DEMO_HOLD_MS = 1300
export const DEMO_STAGE_FADE_MS = 400
export const DEMO_MAX_VISIBLE = 4
export const DEMO_REDUCED_VISIBLE = 4

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return reduced
}

interface UseDemoPlaybackOptions {
  stepCount: number
  rootRef: RefObject<HTMLElement | null>
}

export function useDemoPlayback({ stepCount, rootRef }: UseDemoPlaybackOptions) {
  const reducedMotion = usePrefersReducedMotion()
  const staticCount = Math.min(DEMO_REDUCED_VISIBLE, stepCount)
  const [inView, setInView] = useState(false)
  const [pageVisible, setPageVisible] = useState(
    () => document.visibilityState === 'visible',
  )
  const [visibleCount, setVisibleCount] = useState(1)
  const [phase, setPhase] = useState<'playing' | 'fading'>('playing')
  const [cycle, setCycle] = useState(0)

  const active = inView && pageVisible && !reducedMotion && stepCount > 0

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      { threshold: 0.2 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootRef])

  useEffect(() => {
    const onVisibility = () => {
      setPageVisible(document.visibilityState === 'visible')
    }

    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  useEffect(() => {
    if (!active) return

    if (phase === 'fading') {
      const fadeId = window.setTimeout(() => {
        setVisibleCount(1)
        setPhase('playing')
        setCycle((value) => value + 1)
      }, DEMO_STAGE_FADE_MS)
      return () => window.clearTimeout(fadeId)
    }

    if (visibleCount < stepCount) {
      const appendId = window.setTimeout(() => {
        setVisibleCount((count) => count + 1)
      }, DEMO_INTERVAL_MS)
      return () => window.clearTimeout(appendId)
    }

    const holdId = window.setTimeout(() => {
      setPhase('fading')
    }, DEMO_HOLD_MS)
    return () => window.clearTimeout(holdId)
  }, [active, phase, stepCount, visibleCount])

  return {
    visibleCount: reducedMotion ? staticCount : visibleCount,
    cycle,
    fading: !reducedMotion && phase === 'fading',
    reducedMotion,
  }
}
