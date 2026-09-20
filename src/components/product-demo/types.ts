export type DemoKind = 'chat' | 'terminal' | 'task' | 'collage'

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

/** Union grows as terminal / task / collage renderers are added. */
export type ProductDemoScript = ChatDemoScript
