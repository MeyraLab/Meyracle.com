import { type ReactNode, type Ref } from 'react'

interface DemoStageProps {
  children: ReactNode
  fading?: boolean
  split?: boolean
  ref?: Ref<HTMLDivElement>
}

export function DemoStage({ children, fading = false, split = false, ref }: DemoStageProps) {
  return (
    <div ref={ref} className={`demo-stage${split ? ' demo-stage--split' : ''}`} aria-hidden="true">
      <div className={`demo-stage__content${fading ? ' is-fading' : ''}`}>{children}</div>
    </div>
  )
}
