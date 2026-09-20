import { useRef } from 'react'
import { DemoStage } from './DemoStage'
import { MacDemoWindow } from './MacDemoWindow'
import { ChatDemo } from './renderers/ChatDemo'
import { EditorPreviewDemo } from './renderers/EditorPreviewDemo'
import type { DemoMacWindow, ProductDemoScript } from './types'
import { useDemoPlayback } from './useDemoPlayback'
import './product-demo.css'

interface ProductDemoProps {
  script: ProductDemoScript
  macWindow?: DemoMacWindow
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

export function ProductDemo({ script, macWindow }: ProductDemoProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const playback = useDemoPlayback({ ...playbackOptions(script), rootRef: stageRef })

  const chat =
    script.kind === 'chat' ? (
      <ChatDemo
        script={script}
        visibleCount={playback.visibleCount}
        cycle={playback.cycle}
        animate={!playback.reducedMotion}
      />
    ) : null

  const editor =
    script.kind === 'editor' ? (
      <EditorPreviewDemo
        script={script}
        step={playback.visibleCount}
        cycle={playback.cycle}
        animate={!playback.reducedMotion}
      />
    ) : null

  return (
    <DemoStage
      ref={stageRef}
      fading={playback.fading}
      split={script.kind === 'editor'}
      windowed={Boolean(macWindow)}
    >
      {macWindow && chat ? (
        <MacDemoWindow title={macWindow.title} status={macWindow.status}>
          {chat}
        </MacDemoWindow>
      ) : (
        <>
          {chat}
          {editor}
        </>
      )}
    </DemoStage>
  )
}
