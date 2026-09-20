import { Folder, type FolderPhase } from '../../folder/Folder'
import type { FolderDemoScript } from '../types'

const PHASES: readonly FolderPhase[] = ['idle', 'hover', 'open']

interface FolderDemoProps {
  script: FolderDemoScript
  step: number
  animate: boolean
}

export function FolderDemo({ script, step, animate }: FolderDemoProps) {
  const phase = animate ? (PHASES[Math.min(Math.max(step, 1), PHASES.length) - 1] ?? 'idle') : 'hover'

  return (
    <div className="folder-demo">
      <Folder
        color={script.color}
        size={script.size}
        phase={phase}
        animate={animate}
        contained
        slips={script.slips}
      />
    </div>
  )
}
