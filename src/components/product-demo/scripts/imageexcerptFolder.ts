import type { FolderDemoScript } from '../types'

export const imageexcerptFolder: FolderDemoScript = {
  kind: 'folder',
  color: 'black',
  size: 'sm',
  slips: [
    {
      id: 1,
      quote: 'The smartest people are all self-taught, even if they went to school.',
      attribution: 'Naval',
    },
    {
      id: 2,
      quote: 'Success is uncertain, but entertainment is guaranteed!',
      attribution: 'Elon Musk',
    },
    {
      id: 3,
      quote: 'The essence of fear is this: people do not look at it. But if you look directly at it, you disappear.',
      attribution: 'Elon Musk',
    },
  ],
  beats: [
    { phase: 'idle', frontId: 3 },
    { phase: 'hover', frontId: 3 },
    { phase: 'open', frontId: 1 },
    { phase: 'open', frontId: 2 },
    { phase: 'open', frontId: 3 },
  ],
  intervalMs: 1750,
  holdMs: 2000,
}
