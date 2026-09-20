import type { FolderDemoScript } from '../types'

export const imageexcerptFolder: FolderDemoScript = {
  kind: 'folder',
  color: 'black',
  size: 'sm',
  slips: [
    {
      id: 1,
      quote: 'The smartest people are all self-taught,\neven if they went to school.',
      attribution: 'Naval',
    },
    {
      id: 2,
      quote: 'Success is uncertain,\nbut entertainment is guaranteed!',
      attribution: 'Elon Musk',
    },
    {
      id: 3,
      quote: 'The essence of fear is this:\npeople do not look at it.\nBut if you look directly at it,\nyou disappear.',
      attribution: 'Elon Musk',
    },
  ],
  steps: 3,
  intervalMs: 1400,
  holdMs: 1700,
}
