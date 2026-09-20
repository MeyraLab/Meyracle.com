export type DemoKind = 'chat' | 'terminal' | 'task' | 'collage' | 'editor'

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

/** Union grows as terminal / task / collage renderers are added. */
export type ProductDemoScript = ChatDemoScript | EditorDemoScript
