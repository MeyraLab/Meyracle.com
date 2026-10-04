import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { cn } from '../lib/cn'

/**
 * Site-wide starfield: twinkling stars on the site's dark background.
 * Canvas based, no extra dependencies (originally adapted from
 * easyui.site/components/shooting-stars; meteors and nebula removed).
 *
 * - fixed, full-viewport layer that never receives pointer events
 * - star count scales with viewport area; backing store = CSS size x DPR
 *   (capped at 3, with a pixel budget) so it stays crisp on high-DPI screens
 * - subtle mouse parallax on desktop (disabled on touch / coarse pointers)
 * - RAF loop paused while the tab is hidden
 * - prefers-reduced-motion: static stars
 * - shown only in the dark theme
 *
 * To remove: delete this file and its <ShootingStarsBackground /> mount.
 */

export interface StarfieldProps {
  background?: string
  starCount?: number
  starColors?: readonly string[]
  minStarSize?: number
  maxStarSize?: number
  twinkleSpeed?: number
  parallax?: boolean
  /** Render as a fixed, full-viewport layer behind the page. */
  fixed?: boolean
  className?: string
}

// Module-level constants so the effect never restarts because of a new array.
const SITE_STAR_COLORS = ['#FFFFFF', '#F5F5F5', '#E5E5E5', '#D4D4D4'] as const
const REFERENCE_AREA = 1440 * 900
const MAX_DPR = 3
// Upper bound for canvas backing pixels (e.g. 1440x900 @3x ≈ 11.7M). Very large
// high-DPI viewports get a slightly lower effective DPR to keep frames cheap.
const MAX_BACKING_PIXELS = 12_000_000
const PARALLAX_PX = 14

interface Star {
  x: number // normalized 0..1
  y: number // normalized 0..1
  r: number
  color: number // index into sprites
  alpha: number
  phase: number
  freq: number
  depth: number
  radiant: boolean
}

type RGB = [number, number, number]

const rand = (min: number, max: number) => min + Math.random() * (max - min)

function parseColor(color: string): RGB {
  const hex = color.trim().replace('#', '')
  if (/^[0-9a-f]{3}$/i.test(hex)) {
    return [0, 1, 2].map((i) => parseInt(hex[i] + hex[i], 16)) as RGB
  }
  if (/^[0-9a-f]{6}([0-9a-f]{2})?$/i.test(hex)) {
    return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)) as RGB
  }
  return [255, 255, 255]
}

const rgba = ([r, g, b]: RGB, a: number) => `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, a))})`

function makeCanvas(size: number) {
  const c = document.createElement('canvas')
  c.width = size
  c.height = size
  return c
}

/** Soft round glow sprite (white core fading into the tint). */
function makeGlowSprite(rgb: RGB, size = 64) {
  const c = makeCanvas(size)
  const g = c.getContext('2d')!
  const h = size / 2
  const grad = g.createRadialGradient(h, h, 0, h, h, h)
  grad.addColorStop(0, 'rgba(255, 255, 255, 1)')
  grad.addColorStop(0.18, rgba(rgb, 0.85))
  grad.addColorStop(0.45, rgba(rgb, 0.22))
  grad.addColorStop(1, rgba(rgb, 0))
  g.fillStyle = grad
  g.fillRect(0, 0, size, size)
  return c
}

/** Four-point "radiant" star sprite: glow plus horizontal/vertical spikes. */
function makeRadiantSprite(rgb: RGB, size = 96) {
  const c = makeCanvas(size)
  const g = c.getContext('2d')!
  const h = size / 2
  const glow = g.createRadialGradient(h, h, 0, h, h, h * 0.42)
  glow.addColorStop(0, 'rgba(255, 255, 255, 1)')
  glow.addColorStop(0.25, rgba(rgb, 0.7))
  glow.addColorStop(1, rgba(rgb, 0))
  g.fillStyle = glow
  g.fillRect(0, 0, size, size)
  const spike = (horizontal: boolean) => {
    const grad = horizontal ? g.createLinearGradient(0, h, size, h) : g.createLinearGradient(h, 0, h, size)
    grad.addColorStop(0, rgba(rgb, 0))
    grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)')
    grad.addColorStop(1, rgba(rgb, 0))
    g.fillStyle = grad
    g.beginPath()
    if (horizontal) {
      g.moveTo(0, h)
      g.quadraticCurveTo(h, h - size * 0.035, size, h)
      g.quadraticCurveTo(h, h + size * 0.035, 0, h)
    } else {
      g.moveTo(h, 0)
      g.quadraticCurveTo(h + size * 0.035, h, h, size)
      g.quadraticCurveTo(h - size * 0.035, h, h, 0)
    }
    g.fill()
  }
  spike(true)
  spike(false)
  return c
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const isCoarsePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches

export function Starfield({
  background = 'var(--color-canvas)',
  starCount = 120,
  starColors = SITE_STAR_COLORS,
  minStarSize = 0.6,
  maxStarSize = 2.2,
  twinkleSpeed = 1,
  parallax = true,
  fixed = false,
  className,
}: StarfieldProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [visible, setVisible] = useState(false)

  // Mutable flags read by the animation loop: changing them never re-inits stars.
  const reducedMotionRef = useRef(prefersReducedMotion())
  const parallaxEnabledRef = useRef(parallax && !isCoarsePointer())

  // Primitive dependency key (an array would restart the effect every render).
  const colorsKey = starColors.join('|')

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const palette = colorsKey.split('|').filter(Boolean).map(parseColor)
    if (palette.length === 0) palette.push([255, 255, 255])
    const glowSprites = palette.map((rgb) => makeGlowSprite(rgb))
    const radiantSprites = palette.map((rgb) => makeRadiantSprite(rgb))

    let width = 0
    let height = 0
    let dpr = 1
    let watchedDpr = 1
    let initWidth = 0
    let initHeight = 0
    let stars: Star[] = []

    let raf = 0
    let running = false
    let lastTime = 0
    const pointer = { tx: 0, ty: 0, x: 0, y: 0 }

    const makeStars = () => {
      const areaScale = Math.min(1.5, Math.max(0.5, (width * height) / REFERENCE_AREA))
      const count = Math.max(20, Math.round(starCount * areaScale))
      const sizeSpan = Math.max(0, maxStarSize - minStarSize)
      stars = Array.from({ length: count }, () => {
        // Power-law sizes: many faint pin-pricks, a few bright stars.
        const t = Math.pow(Math.random(), 3)
        const r = minStarSize + sizeSpan * t
        return {
          x: Math.random(),
          y: Math.random(),
          r,
          color: Math.floor(Math.random() * palette.length),
          alpha: 0.35 + 0.65 * Math.min(1, t * 1.6 + Math.random() * 0.3),
          phase: Math.random() * Math.PI * 2,
          freq: rand(0.4, 1.4),
          depth: 0.25 + 0.75 * t + Math.random() * 0.15,
          radiant: t > 0.55 && Math.random() < 0.65,
        }
      })
    }

    const drawStars = (time: number, animated: boolean) => {
      ctx.clearRect(0, 0, width, height)
      const ox = animated ? pointer.x : 0
      const oy = animated ? pointer.y : 0
      for (const star of stars) {
        const twinkle = animated
          ? 0.55 + 0.45 * Math.sin(time * 0.0015 * star.freq * twinkleSpeed + star.phase)
          : 0.85
        const a = star.alpha * twinkle
        // Snap to the device-pixel grid so tiny stars stay sharp dots.
        const px = Math.round((star.x * width + ox * star.depth) * dpr) / dpr
        const py = Math.round((star.y * height + oy * star.depth) * dpr) / dpr
        ctx.globalAlpha = a
        if (star.radiant) {
          const size = star.r * 9 * (0.85 + 0.15 * twinkle)
          ctx.drawImage(radiantSprites[star.color], px - size / 2, py - size / 2, size, size)
        } else if (star.r > 1.1) {
          const size = star.r * 5
          ctx.drawImage(glowSprites[star.color], px - size / 2, py - size / 2, size, size)
        } else {
          ctx.fillStyle = rgba(palette[star.color], 1)
          ctx.beginPath()
          ctx.arc(px, py, Math.max(star.r, 0.75 / dpr), 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1
    }

    const resize = () => {
      // Fractional CSS size, so the backing store maps 1:1 onto device pixels.
      const rect = container.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      if (w === 0 || h === 0) return
      let nextDpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      const budget = Math.sqrt(MAX_BACKING_PIXELS / (w * h))
      if (nextDpr > budget) nextDpr = Math.max(1, budget)
      width = w
      height = h
      const backingW = Math.max(1, Math.round(w * nextDpr))
      const backingH = Math.max(1, Math.round(h * nextDpr))
      if (canvas.width !== backingW) canvas.width = backingW
      if (canvas.height !== backingH) canvas.height = backingH
      // Exact backing/CSS ratio (not the rounded DPR) so nothing is resampled.
      dpr = backingW / w
      ctx.setTransform(dpr, 0, 0, backingH / h, 0, 0)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      // Regenerate only on width change or a big height change, so the mobile
      // address bar collapsing/expanding doesn't reshuffle the sky.
      const heightJump = initHeight === 0 || Math.abs(h - initHeight) / initHeight > 0.15
      if (stars.length === 0 || w !== initWidth || heightJump) {
        initWidth = w
        initHeight = h
        makeStars()
      }
      if (!running) drawStars(performance.now(), !reducedMotionRef.current)
    }

    // DPR changes (window moved to another monitor, browser zoom) don't change
    // CSS size, so ResizeObserver misses them: watch the resolution query.
    // The animation loop also compares devicePixelRatio as a cheap fallback.
    let dprQuery: MediaQueryList | null = null
    const onDprChange = () => {
      resize()
      watchDpr()
    }
    const watchDpr = () => {
      dprQuery?.removeEventListener('change', onDprChange)
      watchedDpr = window.devicePixelRatio || 1
      dprQuery = window.matchMedia(`(resolution: ${watchedDpr}dppx)`)
      dprQuery.addEventListener('change', onDprChange)
    }

    const tick = (time: number) => {
      if (!running) return
      if ((window.devicePixelRatio || 1) !== watchedDpr) onDprChange()
      if (lastTime === 0) lastTime = time
      const elapsed = Math.min(time - lastTime, 50)
      lastTime = time

      // Smoothed parallax.
      const k = 1 - Math.pow(0.92, elapsed / 16.667)
      pointer.x += (pointer.tx - pointer.x) * k
      pointer.y += (pointer.ty - pointer.y) * k

      drawStars(time, true)
      raf = requestAnimationFrame(tick)
    }

    const start = () => {
      if (running || reducedMotionRef.current || document.hidden) return
      running = true
      lastTime = 0
      raf = requestAnimationFrame(tick)
    }

    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const onVisibility = () => {
      if (document.hidden) stop()
      else start()
    }

    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const coarseQuery = window.matchMedia('(hover: none), (pointer: coarse)')
    reducedMotionRef.current = reducedQuery.matches
    parallaxEnabledRef.current = parallax && !coarseQuery.matches

    const onReducedChange = () => {
      reducedMotionRef.current = reducedQuery.matches
      if (reducedQuery.matches) {
        stop()
        pointer.x = pointer.y = pointer.tx = pointer.ty = 0
        drawStars(0, false)
      } else {
        start()
      }
    }

    const onCoarseChange = () => {
      parallaxEnabledRef.current = parallax && !coarseQuery.matches
      if (!parallaxEnabledRef.current) pointer.tx = pointer.ty = 0
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!parallaxEnabledRef.current || reducedMotionRef.current || event.pointerType !== 'mouse') return
      if (width === 0 || height === 0) return
      const rect = container.getBoundingClientRect()
      pointer.tx = -(((event.clientX - rect.left) / width) * 2 - 1) * PARALLAX_PX
      pointer.ty = -(((event.clientY - rect.top) / height) * 2 - 1) * PARALLAX_PX
    }

    const onPointerLeave = () => {
      pointer.tx = 0
      pointer.ty = 0
    }

    watchDpr()
    const resizeObserver = new ResizeObserver(() => resize())
    resizeObserver.observe(container)
    window.addEventListener('orientationchange', resize)
    document.addEventListener('visibilitychange', onVisibility)
    reducedQuery.addEventListener('change', onReducedChange)
    coarseQuery.addEventListener('change', onCoarseChange)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onPointerLeave)

    resize()
    start()
    const fadeRaf = requestAnimationFrame(() => setVisible(true))

    return () => {
      stop()
      cancelAnimationFrame(fadeRaf)
      resizeObserver.disconnect()
      dprQuery?.removeEventListener('change', onDprChange)
      window.removeEventListener('orientationchange', resize)
      document.removeEventListener('visibilitychange', onVisibility)
      reducedQuery.removeEventListener('change', onReducedChange)
      coarseQuery.removeEventListener('change', onCoarseChange)
      window.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [colorsKey, starCount, minStarSize, maxStarSize, twinkleSpeed, parallax])

  const layerStyle: CSSProperties = {
    background,
    opacity: visible ? 1 : 0,
    transition: 'opacity 1200ms ease-out',
  }
  if (fixed) {
    // 100lvh keeps the layer full-height while mobile browser bars collapse;
    // browsers without lvh support drop this and fall back to h-screen.
    layerStyle.height = '100lvh'
  }

  return (
    <div
      ref={containerRef}
      aria-hidden
      data-starfield="meyracle"
      className={cn(
        'pointer-events-none overflow-hidden',
        fixed ? 'fixed inset-x-0 top-0 -z-10 h-screen' : 'relative h-full w-full',
        className,
      )}
      style={layerStyle}
    >
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 block h-full w-full" />
    </div>
  )
}

function useIsDarkTheme() {
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark')
  useEffect(() => {
    const root = document.documentElement
    const sync = () => setDark(root.dataset.theme === 'dark')
    const observer = new MutationObserver(sync)
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
    sync()
    return () => observer.disconnect()
  }, [])
  return dark
}

/** Site-wide fixed starfield, shown only in the dark theme. */
export function ShootingStarsBackground() {
  const dark = useIsDarkTheme()
  if (!dark) return null
  return <Starfield fixed />
}
