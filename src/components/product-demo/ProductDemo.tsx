import { useRef } from 'react'
import { DemoStage } from './DemoStage'
import { ChatDemo } from './renderers/ChatDemo'
import { EditorPreviewDemo } from './renderers/EditorPreviewDemo'
import type { ProductDemoScript } from './types'
import { useDemoPlayback } from './useDemoPlayback'
import './product-demo.css'

interface ProductDemoProps {
  script: ProductDemoScript
}

function playbackOptions(script: ProductDemoScript) {
  if (script.kind === 'chat') {
    return { stepCount: script.messages.length }
  }

  if (script.kind === 'editor') {
    return {
      stepCount: script.steps,
      intervalMs: script.intervalMs,
      holdMs: script.holdMs,
      reducedStep: script.steps,
    }
  }

  return { stepCount: 0 }
}

export function ProductDemo({ script }: ProductDemoProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const playback = useDemoPlayback({ ...playbackOptions(script), rootRef: stageRef })

  return (
    <DemoStage ref={stageRef} fading={playback.fading} split={script.kind === 'editor'}>
      {script.kind === 'chat' ? (
        <ChatDemo
          script={script}
          visibleCount={playback.visibleCount}
          cycle={playback.cycle}
          animate={!playback.reducedMotion}
        />
      ) : null}
      {script.kind === 'editor' ? (
        <EditorPreviewDemo
          script={script}
          step={playback.visibleCount}
          cycle={playback.cycle}
          animate={!playback.reducedMotion}
        />
      ) : null}
    </DemoStage>
  )
}
