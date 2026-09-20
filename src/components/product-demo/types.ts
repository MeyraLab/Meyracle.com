import type { FolderColor, FolderFrontId, FolderPhase, FolderSize, FolderSlip } from '../folder/Folder'

export type DemoKind = 'chat' | 'terminal' | 'task' | 'collage' | 'editor' | 'folder'

export type ExcerptThemeId = 'paper' | 'ink'

export interface ExcerptTheme {
  id: ExcerptThemeId
  label: string
}

export type ChatRole = 'user' | 'assistant'

export interface ChatMessage {
  id: string
  role: ChatRole
  text: string
}

export interface DemoMacWindow {
  title: string
  status?: string
}

export interface ChatDemoScript {
  kind: 'chat'
  assistantLabel: string
  messages: readonly ChatMessage[]
}

export interface EditorDemoScript {
  kind: 'editor'
  quote: string
  title: string
  byline: string
  recognizeLabel: string
  doneLabel: string
  themes: readonly ExcerptTheme[]
  steps: number
  intervalMs: number
  holdMs: number
}

export type { FolderSlip }

export interface FolderDemoBeat {
  phase: FolderPhase
  frontId: FolderFrontId
}

export interface FolderDemoScript {
  kind: 'folder'
  color: FolderColor
  size: FolderSize
  slips: readonly FolderSlip[]
  beats: readonly FolderDemoBeat[]
  intervalMs: number
  holdMs: number
}

/** Union grows as terminal / task / collage renderers are added. */
export type ProductDemoScript = ChatDemoScript | EditorDemoScript | FolderDemoScript
