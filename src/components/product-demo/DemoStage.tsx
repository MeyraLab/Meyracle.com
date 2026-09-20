import type { ReactNode, Ref } from 'react'
import { cn } from '../../lib/cn'

interface DemoStageProps {
  children: ReactNode
  fading?: boolean
  split?: boolean
  windowed?: boolean
  ref?: Ref<HTMLDivElement>
}

export function DemoStage({ children, fading = false, split = false, windowed = false, ref }: DemoStageProps) {
  return (
    <div
      ref={ref}
      className={cn('demo-stage', split && 'demo-stage--split', windowed && 'demo-stage--windowed')}
      aria-hidden="true"
    >
      <div className={cn('demo-stage__content', fading && 'is-fading')}>{children}</div>
    </div>
  )
}
