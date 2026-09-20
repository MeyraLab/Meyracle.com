import { Folder } from '../../folder/Folder'
import type { FolderDemoScript } from '../types'

interface FolderDemoProps {
  script: FolderDemoScript
  step: number
  animate: boolean
}

export function FolderDemo({ script, step, animate }: FolderDemoProps) {
  const teaser = script.beats[1] ?? script.beats[0]
  const beat = animate
    ? (script.beats[Math.min(Math.max(step, 1), script.beats.length) - 1] ?? teaser)
    : teaser

  if (!beat) {
    return null
  }

  return (
    <div className="folder-demo">
      <Folder
        color={script.color}
        size={script.size}
        phase={beat.phase}
        frontId={beat.frontId}
        animate={animate}
        contained
        slips={script.slips}
      />
    </div>
  )
}
