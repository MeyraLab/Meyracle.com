import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { cn } from '../lib/cn'

/**
 * Deep-space background: twinkling stars, soft nebula, shooting stars with
 * embers and occasional fireballs. Canvas based, no extra dependencies.
 *
 * Adapted from easyui.site/components/shooting-stars for a fixed, site-wide
 * background layer:
 * - the layer never receives pointer events; parallax + click-to-spawn listen
 *   on `window` and ignore clicks on links / buttons / form controls
 * - star count scales with viewport area; backing store = CSS size x DPR
 *   (capped at 3, with a pixel budget) so it stays crisp on high-DPI screens
 * - parallax disabled on touch / coarse pointers
 * - RAF loop paused while the tab is hidden
 * - prefers-reduced-motion: static stars, no meteors
 *
 * To remove: delete this file and its <ShootingStarsBackground /> mount.
 */

type Range = [number, number] | number

export interface ShootingStarsProps {
  children?: ReactNode
  background?: string
  starCount?: number
  starColors?: readonly string[]
  minStarSize?: number
  maxStarSize?: number
  twinkleSpeed?: number
  trailColor?: string
  headColor?: string
  interval?: number
  speed?: Range
  trailLength?: Range
  angle?: number
  maxActiveShootingStars?: number
  showEmbers?: boolean
  nebula?: boolean
  clickToSpawn?: boolean
  parallax?: boolean
  /** Tint of fireball end-flash and warm embers. */
  flashColor?: string
  /** Render as a fixed, full-viewport layer behind the page. */
  fixed?: boolean
  className?: string
}

// Module-level constants so the effect never restarts because of a new array.
const DEFAULT_STAR_COLORS = ['#FFFFFF', '#E0F2FE', '#C7D2FE', '#FEF08A'] as const
const DEFAULT_SPEED: [number, number] = [12, 22]
const DEFAULT_TRAIL_LENGTH: [number, number] = [90, 180]
// Site palette: neutral black sky, white/gray stars and meteors (no blue tint).
const SITE_STAR_COLORS = ['#FFFFFF', '#F5F5F5', '#E5E5E5', '#D4D4D4'] as const
const REFERENCE_AREA = 1440 * 900
const MAX_DPR = 3
// Upper bound for canvas backing pixels (e.g. 1440x900 @3x ≈ 11.7M). Very large
// high-DPI viewports get a slightly lower effective DPR to keep frames cheap.
const MAX_BACKING_PIXELS = 12_000_000
const PARALLAX_PX = 14
const MAX_EMBERS = 180
const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, option, label, summary, details, video, audio, iframe, ' +
  '[role="button"], [role="link"], [role="menuitem"], [role="tab"], [role="checkbox"], ' +
  '[role="switch"], [contenteditable=""], [contenteditable="true"], [tabindex]:not([tabindex="-1"]), [data-no-stars]'

const NEBULA_BACKGROUND = [
  'radial-gradient(ellipse 55% 42% at 18% 20%, rgba(99, 102, 241, 0.16), transparent 70%)',
  'radial-gradient(ellipse 48% 38% at 84% 28%, rgba(168, 85, 247, 0.12), transparent 70%)',
  'radial-gradient(ellipse 60% 45% at 62% 88%, rgba(34, 211, 238, 0.08), transparent 72%)',
  'radial-gradient(ellipse 40% 30% at 30% 70%, rgba(129, 140, 248, 0.07), transparent 70%)',
].join(', ')

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

interface Meteor {
  x: number
  y: number
  dx: number
  dy: number
  speed: number
  length: number
  traveled: number
  maxTravel: number
  width: number
  fireball: boolean
}

interface Ember {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  r: number
  rgb: RGB
}

interface Flash {
  x: number
  y: number
  life: number
  maxLife: number
  radius: number
}

type RGB = [number, number, number]

const toRange = (value: Range): [number, number] =>
  typeof value === 'number' ? [value, value] : [Math.min(value[0], value[1]), Math.max(value[0], value[1])]

const rand = (min: number, max: number) => min + Math.random() * (max - min)

function parseColor(color: string): RGB {
  const hex = color.trim().replace('#', '')
  if (/^[0-9a-f]{3}$/i.test(hex)) {
    return [0, 1, 2].map((i) => parseInt(hex[i] + hex[i], 16)) as RGB
  }
  if (/^[0-9a-f]{6}([0-9a-f]{2})?$/i.test(hex)) {
    return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)) as RGB
  }
  const match = color.match(/rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/i)
  if (match) return [Number(match[1]), Number(match[2]), Number(match[3])]
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

export function ShootingStars({
  children,
  background = '#020617',
  starCount = 120,
  starColors = DEFAULT_STAR_COLORS,
  minStarSize = 0.6,
  maxStarSize = 2.2,
  twinkleSpeed = 1,
  trailColor = '#38BDF8',
  headColor = '#FFFFFF',
  interval = 2200,
  speed = DEFAULT_SPEED,
  trailLength = DEFAULT_TRAIL_LENGTH,
  angle = 42,
  maxActiveShootingStars = 2,
  showEmbers = true,
  nebula = true,
  clickToSpawn = true,
  parallax = true,
  flashColor = '#FDE68A',
  fixed = false,
  className,
}: ShootingStarsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nebulaRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  // Mutable flags read by the animation loop: changing them never re-inits stars.
  const reducedMotionRef = useRef(prefersReducedMotion())
  const parallaxEnabledRef = useRef(parallax && !isCoarsePointer())

  // Primitive dependency keys (arrays/tuples would restart the effect every render).
  const colorsKey = starColors.join('|')
  const [speedMin, speedMax] = toRange(speed)
  const [trailMin, trailMax] = toRange(trailLength)

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
    const trailRgb = parseColor(trailColor)
    const headRgb = parseColor(headColor)
    const emberWarm = parseColor(flashColor)
    const headSprite = makeGlowSprite(trailRgb, 96)
    const flashSprite = makeGlowSprite(emberWarm, 256)

    const rad = (angle * Math.PI) / 180
    const dirX = Math.cos(rad)
    const dirY = Math.sin(rad)

    let width = 0
    let height = 0
    let dpr = 1
    let watchedDpr = 1
    let initWidth = 0
    let initHeight = 0
    let motionScale = 1
    let stars: Star[] = []
    const meteors: Meteor[] = []
    const embers: Ember[] = []
    const flashes: Flash[] = []

    let raf = 0
    let running = false
    let lastTime = 0
    let clock = 0
    let nextSpawn = 0
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
      motionScale = Math.min(1, Math.max(0.6, Math.min(w, h) / 800))
      // Regenerate only on width change or a big height change, so the mobile
      // address bar collapsing/expanding doesn't reshuffle the sky.
      const heightJump = initHeight === 0 || Math.abs(h - initHeight) / initHeight > 0.15
      if (stars.length === 0 || w !== initWidth || heightJump) {
        initWidth = w
        initHeight = h
        makeStars()
      }
      if (!running) drawFrame(0)
    }

    const spawnMeteor = (targetX?: number, targetY?: number, forceFireball = false) => {
      const diag = Math.hypot(width, height)
      const fireball = forceFireball || Math.random() < 0.12
      let x: number
      let y: number
      let maxTravel: number
      if (targetX !== undefined && targetY !== undefined) {
        // Start up-trail of the click so the meteor sweeps past the cursor.
        const back = diag * rand(0.22, 0.32)
        x = targetX - dirX * back
        y = targetY - dirY * back
        maxTravel = back + diag * rand(0.25, 0.4)
      } else {
        x = rand(-0.15, 0.8) * width
        y = rand(-0.12, 0.45) * height
        maxTravel = diag * rand(0.35, 0.75)
      }
      const s = rand(speedMin, speedMax) * motionScale * (fireball ? 0.85 : 1)
      meteors.push({
        x,
        y,
        dx: dirX,
        dy: dirY,
        speed: s,
        length: rand(trailMin, trailMax) * motionScale * (fireball ? 1.45 : 1),
        traveled: 0,
        maxTravel,
        width: fireball ? rand(2.4, 3.2) : rand(1.4, 2.2),
        fireball,
      })
    }

    const scheduleNext = () => {
      nextSpawn = clock + interval * rand(0.5, 1.5)
    }

    const drawStars = (time: number, animated: boolean) => {
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
        if (star.radiant) {
          const size = star.r * 9 * (0.85 + 0.15 * twinkle)
          ctx.globalAlpha = a
          ctx.drawImage(radiantSprites[star.color], px - size / 2, py - size / 2, size, size)
        } else if (star.r > 1.1) {
          const size = star.r * 5
          ctx.globalAlpha = a
          ctx.drawImage(glowSprites[star.color], px - size / 2, py - size / 2, size, size)
        } else {
          ctx.globalAlpha = a
          ctx.fillStyle = rgba(palette[star.color], 1)
          ctx.beginPath()
          ctx.arc(px, py, Math.max(star.r, 0.75 / dpr), 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1
    }

    const drawMeteors = (dt: number) => {
      ctx.globalCompositeOperation = 'lighter'
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i]
        m.x += m.dx * m.speed * dt
        m.y += m.dy * m.speed * dt
        m.traveled += m.speed * dt
        const progress = m.traveled / m.maxTravel
        const offscreen = m.x - m.length > width + 40 || m.y - m.length > height + 40

        if (progress >= 1 || offscreen) {
          if (m.fireball && !offscreen) {
            flashes.push({ x: m.x, y: m.y, life: 0, maxLife: 26, radius: rand(26, 40) })
          }
          meteors.splice(i, 1)
          continue
        }

        // Envelope: quick ignition, long burn-out.
        const env = progress < 0.12 ? progress / 0.12 : progress > 0.65 ? (1 - progress) / 0.35 : 1
        const len = Math.min(m.length, m.traveled)
        const tailX = m.x - m.dx * len
        const tailY = m.y - m.dy * len

        // Outer sheath.
        const sheath = ctx.createLinearGradient(tailX, tailY, m.x, m.y)
        sheath.addColorStop(0, rgba(trailRgb, 0))
        sheath.addColorStop(0.7, rgba(trailRgb, 0.18 * env))
        sheath.addColorStop(1, rgba(trailRgb, 0.55 * env))
        ctx.strokeStyle = sheath
        ctx.lineCap = 'round'
        ctx.lineWidth = m.width * 2.6
        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(m.x, m.y)
        ctx.stroke()

        // Bright core.
        const coreStartX = m.x - m.dx * len * 0.6
        const coreStartY = m.y - m.dy * len * 0.6
        const core = ctx.createLinearGradient(coreStartX, coreStartY, m.x, m.y)
        core.addColorStop(0, rgba(headRgb, 0))
        core.addColorStop(1, rgba(headRgb, 0.95 * env))
        ctx.strokeStyle = core
        ctx.lineWidth = m.width * 0.75
        ctx.beginPath()
        ctx.moveTo(coreStartX, coreStartY)
        ctx.lineTo(m.x, m.y)
        ctx.stroke()

        // Head flare.
        const headSize = (m.fireball ? 30 : 18) * (0.8 + 0.2 * Math.random()) * motionScale
        ctx.globalAlpha = env
        ctx.drawImage(headSprite, m.x - headSize / 2, m.y - headSize / 2, headSize, headSize)
        ctx.globalAlpha = 1

        // Stardust embers shed from the head.
        if (showEmbers && embers.length < MAX_EMBERS) {
          const emitCount = m.fireball ? 2 : Math.random() < 0.55 ? 1 : 0
          for (let e = 0; e < emitCount; e++) {
            const maxLife = rand(28, m.fireball ? 70 : 50)
            embers.push({
              x: m.x - m.dx * rand(0, 10),
              y: m.y - m.dy * rand(0, 10),
              vx: -m.dx * m.speed * 0.04 + rand(-0.35, 0.35),
              vy: -m.dy * m.speed * 0.04 + rand(-0.35, 0.35),
              life: 0,
              maxLife,
              r: rand(0.5, m.fireball ? 1.6 : 1.1),
              rgb: m.fireball && Math.random() < 0.5 ? emberWarm : Math.random() < 0.5 ? trailRgb : headRgb,
            })
          }
        }
      }

      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i]
        e.life += dt
        if (e.life >= e.maxLife) {
          embers.splice(i, 1)
          continue
        }
        e.x += e.vx * dt
        e.y += e.vy * dt
        e.vy += 0.008 * dt
        e.vx *= 0.985
        const a = 1 - e.life / e.maxLife
        ctx.fillStyle = rgba(e.rgb, a * 0.9)
        ctx.beginPath()
        ctx.arc(e.x, e.y, e.r * (0.6 + 0.4 * a), 0, Math.PI * 2)
        ctx.fill()
      }

      for (let i = flashes.length - 1; i >= 0; i--) {
        const f = flashes[i]
        f.life += dt
        if (f.life >= f.maxLife) {
          flashes.splice(i, 1)
          continue
        }
        const t = f.life / f.maxLife
        const size = f.radius * (0.6 + 1.4 * t) * 2 * motionScale
        ctx.globalAlpha = (1 - t) * (1 - t)
        ctx.drawImage(flashSprite, f.x - size / 2, f.y - size / 2, size, size)
        ctx.globalAlpha = 1
      }
      ctx.globalCompositeOperation = 'source-over'
    }

    /** One-off frame while the loop is not running (reduced motion, hidden tab, resize). */
    const drawFrame = (time: number) => {
      ctx.clearRect(0, 0, width, height)
      const animated = !reducedMotionRef.current
      drawStars(time, animated)
      if (animated) drawMeteors(0)
    }

    const tick = (time: number) => {
      if (!running) return
      if ((window.devicePixelRatio || 1) !== watchedDpr) onDprChange()
      if (lastTime === 0) lastTime = time
      const elapsed = Math.min(time - lastTime, 50)
      clock += elapsed

      // Smoothed parallax.
      const k = 1 - Math.pow(0.92, elapsed / 16.667)
      pointer.x += (pointer.tx - pointer.x) * k
      pointer.y += (pointer.ty - pointer.y) * k
      if (nebulaRef.current) {
        nebulaRef.current.style.transform = `translate3d(${pointer.x * 0.35}px, ${pointer.y * 0.35}px, 0)`
      }

      if (clock >= nextSpawn) {
        if (meteors.length < maxActiveShootingStars && document.visibilityState === 'visible') spawnMeteor()
        scheduleNext()
      }

      ctx.clearRect(0, 0, width, height)
      drawStars(time, true)
      drawMeteors(elapsed / 16.667)
      lastTime = time
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
    const onReducedChange = () => {
      reducedMotionRef.current = reducedQuery.matches
      if (reducedQuery.matches) {
        stop()
        meteors.length = 0
        embers.length = 0
        flashes.length = 0
        pointer.x = pointer.y = pointer.tx = pointer.ty = 0
        if (nebulaRef.current) nebulaRef.current.style.transform = ''
        drawFrame(0)
      } else {
        start()
      }
    }

    const coarseQuery = window.matchMedia('(hover: none), (pointer: coarse)')
    reducedMotionRef.current = reducedQuery.matches
    parallaxEnabledRef.current = parallax && !coarseQuery.matches
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

    const onClick = (event: MouseEvent) => {
      if (!clickToSpawn || reducedMotionRef.current || event.button !== 0 || event.defaultPrevented) return
      const target = event.target
      if (target instanceof Element && target.closest(INTERACTIVE_SELECTOR)) return
      if (window.getSelection()?.toString()) return
      if (meteors.length >= maxActiveShootingStars + 3) return
      const rect = container.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return
      spawnMeteor(x, y, Math.random() < 0.25)
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
    watchDpr()

    const resizeObserver = new ResizeObserver(() => resize())
    resizeObserver.observe(container)
    window.addEventListener('orientationchange', resize)
    document.addEventListener('visibilitychange', onVisibility)
    reducedQuery.addEventListener('change', onReducedChange)
    coarseQuery.addEventListener('change', onCoarseChange)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('click', onClick)

    resize()
    clock = 0
    nextSpawn = interval * 0.4
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
      window.removeEventListener('click', onClick)
    }
  }, [
    colorsKey,
    starCount,
    minStarSize,
    maxStarSize,
    twinkleSpeed,
    trailColor,
    headColor,
    interval,
    speedMin,
    speedMax,
    trailMin,
    trailMax,
    angle,
    maxActiveShootingStars,
    showEmbers,
    clickToSpawn,
    parallax,
    flashColor,
  ])

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
      aria-hidden={children ? undefined : true}
      className={cn(
        'overflow-hidden',
        fixed ? 'pointer-events-none fixed inset-x-0 top-0 -z-10 h-screen' : 'relative h-full w-full',
        className,
      )}
      style={layerStyle}
    >
      {nebula ? (
        <div
          ref={nebulaRef}
          className="pointer-events-none absolute -inset-[6%] will-change-transform"
          style={{ background: NEBULA_BACKGROUND }}
        />
      ) : null}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 block h-full w-full" />
      {children ? <div className="relative z-10 h-full w-full">{children}</div> : null}
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
  return (
    <ShootingStars
      fixed
      background="var(--color-canvas)"
      starColors={SITE_STAR_COLORS}
      trailColor="#E5E5E5"
      headColor="#FFFFFF"
      flashColor="#FFFFFF"
      nebula={false}
    />
  )
}
