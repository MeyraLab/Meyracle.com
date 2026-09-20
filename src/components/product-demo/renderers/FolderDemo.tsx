import { useEffect, useState } from 'react'
import { Folder, type FolderPhase } from '../../folder/Folder'
import type { FolderDemoScript } from '../types'

const PHASES: readonly FolderPhase[] = ['idle', 'hover', 'open']
const NARROW_QUERY = '(max-width: 639px)'

function randomIndex(length: number) {
  if (length <= 1) {
    return 0
  }

  return Math.floor(Math.random() * length)
}

function wrapIndex(index: number, length: number) {
  if (length <= 0) {
    return 0
  }

  return ((index % length) + length) % length
}

function usePrefersNarrow() {
  const [narrow, setNarrow] = useState(() => window.matchMedia(NARROW_QUERY).matches)

  useEffect(() => {
    const media = window.matchMedia(NARROW_QUERY)
    const onChange = () => setNarrow(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return narrow
}

interface FolderDemoProps {
  script: FolderDemoScript
  step: number
  cycle: number
  animate: boolean
}

export function FolderDemo({ script, step, cycle, animate }: FolderDemoProps) {
  const [startIndex] = useState(() => randomIndex(script.slips.length))
  const narrow = usePrefersNarrow()
  const phase = animate ? (PHASES[Math.min(Math.max(step, 1), PHASES.length) - 1] ?? 'idle') : 'open'
  const frontIndex = wrapIndex(
    startIndex + (animate ? (narrow ? step - 1 : cycle) : 0),
    script.slips.length,
  )
  const single = narrow || !animate

  return (
    <div className={single ? 'folder-demo folder-demo--single' : 'folder-demo'}>
      <Folder
        color={script.color}
        size={script.size}
        phase={single ? 'open' : phase}
        animate={animate}
        contained
        layout={single ? 'single' : 'stack'}
        frontIndex={frontIndex}
        slips={script.slips}
      />
    </div>
  )
}
