import { useId, useState, type ComponentProps, type CSSProperties } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

const themes = {
  black: {
    backFill: 'black',
    backInsetColor: '0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.37 0',
    backInsetShadow: 'inset 0 0 6px 2px rgba(255,255,255,0.37)',
    flapFill: '#292929',
    flapFillOpacity: 0.25,
    flapStroke: '#979797',
    flapInsetColor: '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0',
    cardFill: '#F1F1F1',
    cardStroke: '#E0E0E0',
    cardLineFill: '#D4D4D4',
    cardInsetColor: '0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0',
    cardText: '#1e1e1e',
    cardMuted: 'rgb(30 30 30 / 0.58)',
  },
  white: {
    backFill: '#ffffff',
    backInsetColor: '0 0 0 0 0.7 0 0 0 0 0.7 0 0 0 0 0.7 0 0 0 0.25 0',
    backInsetShadow: 'inset 0 0 6px 2px rgba(178,178,178,0.25)',
    flapFill: '#f5f5f5',
    flapFillOpacity: 0.85,
    flapStroke: '#d4d4d4',
    flapInsetColor: '0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0.15 0',
    cardFill: '#262626',
    cardStroke: '#404040',
    cardLineFill: '#737373',
    cardInsetColor: '0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0',
    cardText: '#f5f5f5',
    cardMuted: 'rgb(245 245 245 / 0.62)',
  },
  blue: {
    backFill: '#50B1FD',
    backInsetColor: '0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.35 0',
    backInsetShadow: 'inset 0 0 6px 2px rgba(255,255,255,0.35)',
    flapFill: '#3a9ae8',
    flapFillOpacity: 0.45,
    flapStroke: '#7ec8ff',
    flapInsetColor: '0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.12 0',
    cardFill: '#F1F1F1',
    cardStroke: '#E0E0E0',
    cardLineFill: '#D4D4D4',
    cardInsetColor: '0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0',
    cardText: '#1e1e1e',
    cardMuted: 'rgb(30 30 30 / 0.58)',
  },
} as const

const sizeScales = {
  sm: 0.65,
  md: 1,
  lg: 1.35,
} as const

export type FolderColor = keyof typeof themes
export type FolderSize = keyof typeof sizeScales
export type FolderPhase = 'idle' | 'hover' | 'open'

export interface FolderSlip {
  id: number
  quote: string
  attribution: string
}

export type FolderComponentProps = Omit<ComponentProps<'div'>, 'color'> & {
  color?: FolderColor
  size?: FolderSize
  phase?: FolderPhase
  animate?: boolean
  contained?: boolean
  slips?: readonly FolderSlip[]
}

const BASE_WIDTH = 321
const BASE_HEIGHT = 270

const FLAP_PATH =
  'M0 25C0 11.1929 11.1929 0 25 0H136.084C143.044 0 149.689 2.90139 154.42 8.00608L178.08 33.5343C182.811 38.639 189.456 41.5404 196.416 41.5404H296C309.807 41.5404 321 52.7333 321 66.5404V216C321 229.807 309.807 241 296 241H25C11.1929 241 0 229.807 0 216V25Z'

type Theme = (typeof themes)[keyof typeof themes]

type CardPose = { y: number; x: number; rotate: number }

const IDLE_POSES: Record<1 | 2 | 3, CardPose> = {
  1: { y: -10, x: 40, rotate: 10 },
  2: { y: -20, x: 3, rotate: 2 },
  3: { y: -22, x: -40, rotate: -5 },
}

const HOVER_POSES: Record<1 | 2 | 3, CardPose> = {
  1: { y: -30, x: 40, rotate: 14 },
  2: { y: -35, x: 3, rotate: -1 },
  3: { y: -44, x: -40, rotate: -9 },
}

const OPEN_POSES: Record<1 | 2 | 3, CardPose> = {
  1: { y: -160, x: 70, rotate: 18 },
  2: { y: -180, x: 0, rotate: -3 },
  3: { y: -170, x: -65, rotate: -14 },
}

const CONTAINED_OPEN_POSES: Record<1 | 2 | 3, CardPose> = {
  1: { y: -72, x: 38, rotate: 14 },
  2: { y: -84, x: 0, rotate: -2 },
  3: { y: -78, x: -38, rotate: -12 },
}

function cardPose(id: 1 | 2 | 3, phase: FolderPhase, contained: boolean): CardPose {
  if (phase === 'open') {
    return contained ? CONTAINED_OPEN_POSES[id] : OPEN_POSES[id]
  }

  if (phase === 'hover') {
    return HOVER_POSES[id]
  }

  return IDLE_POSES[id]
}

function flapRotateX(phase: FolderPhase, contained: boolean) {
  if (phase === 'open') {
    return contained ? -42 : -55
  }

  if (phase === 'hover') {
    return -45
  }

  return -15
}

function cardDelay(id: 1 | 2 | 3, phase: FolderPhase) {
  if (id === 1) {
    return phase === 'open' ? 0.1 : phase === 'hover' ? 0.12 : 0
  }

  if (id === 2) {
    return phase === 'open' ? 0.05 : phase === 'hover' ? 0.06 : 0
  }

  return 0
}

function FolderComponent({
  color = 'black',
  size = 'md',
  phase,
  animate = true,
  contained = false,
  slips,
  className,
  ...props
}: FolderComponentProps) {
  const theme = themes[color] ?? themes.black
  const scale = sizeScales[size]
  const reactId = useId().replace(/:/g, '')
  const [hovered, setHovered] = useState(false)
  const [opened, setOpened] = useState(false)
  const controlled = phase !== undefined
  const currentPhase: FolderPhase = phase ?? (opened ? 'open' : hovered ? 'hover' : 'idle')
  const slipsById = new Map((slips ?? []).map((slip) => [slip.id, slip]))

  const spring = (id: 1 | 2 | 3) =>
    animate
      ? { type: 'spring' as const, stiffness: 120, damping: 13, delay: cardDelay(id, currentPhase) }
      : { duration: 0 }

  const flapSpring = animate
    ? { type: 'spring' as const, stiffness: 120, damping: 14 }
    : { duration: 0 }

  return (
    <div
      data-slot="folder"
      className={cn('relative flex h-full w-full items-center justify-center', className)}
      style={
        {
          '--folder-scale': String(scale),
          '--folder-card-text': theme.cardText,
          '--folder-card-muted': theme.cardMuted,
        } as CSSProperties
      }
      {...props}
    >
      <div
        className={cn('relative select-none', !controlled && 'cursor-pointer')}
        style={{
          width: BASE_WIDTH * scale,
          height: BASE_HEIGHT * scale,
          touchAction: 'manipulation',
          WebkitTapHighlightColor: 'transparent',
        }}
        onMouseEnter={controlled ? undefined : () => setHovered(true)}
        onMouseLeave={
          controlled
            ? undefined
            : () => {
                setHovered(false)
                setOpened(false)
              }
        }
        onClick={controlled ? undefined : () => setOpened((open) => !open)}
      >
        <div
          className="absolute top-1/2 left-1/2"
          style={{
            width: BASE_WIDTH,
            height: BASE_HEIGHT,
            transform: `translate(-50%, -50%) scale(${scale})`,
            perspective: 800 * scale,
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              style={{
                width: BASE_WIDTH,
                height: BASE_HEIGHT,
                borderRadius: 25,
                backgroundColor: theme.backFill,
                boxShadow: theme.backInsetShadow,
              }}
            />
          </div>

          <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            {([1, 2, 3] as const).map((id) => {
              const pose = cardPose(id, currentPhase, contained)
              return (
                <motion.div key={id} className="absolute" animate={pose} transition={spring(id)}>
                  <Card id={id} theme={theme} uid={reactId} slip={slipsById.get(id)} />
                </motion.div>
              )
            })}
          </div>

          <motion.div
            className="absolute top-1/2 left-1/2 mt-4 -translate-x-1/2 -translate-y-1/2"
            style={{
              transformOrigin: 'bottom center',
              transformStyle: 'preserve-3d',
              width: 321,
              height: 241,
            }}
            animate={{ rotateX: flapRotateX(currentPhase, contained) }}
            transition={flapSpring}
          >
            <div
              className="absolute inset-0"
              style={{
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                clipPath: `path('${FLAP_PATH}')`,
                WebkitClipPath: `path('${FLAP_PATH}')`,
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                willChange: 'transform',
              }}
            />
            <svg
              className="absolute inset-0"
              width="321"
              height="241"
              viewBox="0 0 321 241"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter={`url(#filter0_i_flap_${reactId})`}>
                <path d={FLAP_PATH} fill={theme.flapFill} fillOpacity={theme.flapFillOpacity} />
                <path
                  d="M25 0.5H136.084C142.905 0.5 149.417 3.3431 154.054 8.3457L177.713 33.874C182.539 39.0808 189.317 42.04 196.416 42.04H296C309.531 42.04 320.5 53.0092 320.5 66.54V216C320.5 229.531 309.531 240.5 296 240.5H25C11.469 240.5 0.5 229.531 0.5 216V25C0.5 11.469 11.469 0.5 25 0.5Z"
                  stroke={theme.flapStroke}
                />
              </g>
              <defs>
                <filter
                  id={`filter0_i_flap_${reactId}`}
                  x="-25.4"
                  y="-25.4"
                  width="371.8"
                  height="291.8"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset />
                  <feGaussianBlur stdDeviation="2.65" />
                  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                  <feColorMatrix type="matrix" values={theme.flapInsetColor} />
                  <feBlend mode="normal" in2="shape" result="effect1_innerShadow_flap" />
                </filter>
              </defs>
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default FolderComponent

export { FolderComponent as Folder }

type CardProps = {
  id: number
  theme: Theme
  uid: string
  slip?: FolderSlip
}

function Card({ id, theme, uid, slip }: CardProps) {
  const filterId = `filter0_i_card_${uid}_${id}`

  return (
    <div data-slot="folder-card" className="folder-card">
      <svg width="164" height="214" viewBox="0 0 164 214" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter={`url(#${filterId})`}>
          <rect width="163.078" height="213.262" rx="20" fill={theme.cardFill} />
        </g>
        <rect x="0.5" y="0.5" width="162.078" height="212.262" rx="19.5" stroke={theme.cardStroke} />
        <defs>
          <filter
            id={filterId}
            x="0"
            y="0"
            width="166.078"
            height="218.262"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feMorphology radius="2" operator="erode" in="SourceAlpha" result={`effect1_innerShadow_${id}`} />
            <feOffset dx="3" dy="5" />
            <feGaussianBlur stdDeviation="3.05" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values={theme.cardInsetColor} />
            <feBlend mode="normal" in2="shape" result={`effect1_innerShadow_${id}`} />
          </filter>
        </defs>
      </svg>
      {slip ? (
        <div className="folder-card__copy">
          <p className="folder-card__quote">{slip.quote}</p>
          <p className="folder-card__byline">{slip.attribution}</p>
        </div>
      ) : null}
    </div>
  )
}
