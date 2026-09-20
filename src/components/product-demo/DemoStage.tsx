import { type ReactNode, type Ref } from 'react'

interface DemoStageProps {
  children: ReactNode
  fading?: boolean
  ref?: Ref<HTMLDivElement>
}

export function DemoStage({ children, fading = false, ref }: DemoStageProps) {
  return (
    <div ref={ref} className="demo-stage" aria-hidden="true">
      <div className={`demo-stage__content${fading ? ' is-fading' : ''}`}>{children}</div>
    </div>
  )
}
