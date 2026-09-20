import { useRef } from 'react'
import { DemoStage } from './DemoStage'
import { ChatDemo } from './renderers/ChatDemo'
import type { ProductDemoScript } from './types'
import { useDemoPlayback } from './useDemoPlayback'
import './product-demo.css'

interface ProductDemoProps {
  script: ProductDemoScript
}

export function ProductDemo({ script }: ProductDemoProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const stepCount = script.kind === 'chat' ? script.messages.length : 0
  const playback = useDemoPlayback({ stepCount, rootRef: stageRef })

  return (
    <DemoStage ref={stageRef} fading={playback.fading}>
      {script.kind === 'chat' ? (
        <ChatDemo
          script={script}
          visibleCount={playback.visibleCount}
          cycle={playback.cycle}
          animate={!playback.reducedMotion}
        />
      ) : null}
    </DemoStage>
  )
}
