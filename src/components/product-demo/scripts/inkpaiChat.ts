import type { ChatDemoScript } from '../types'

export const inkpaiChat: ChatDemoScript = {
  kind: 'chat',
  assistantLabel: 'Inkpai',
  messages: [
    { id: 'inkpai-1', role: 'user', text: '粘贴这篇公众号草稿，帮我排一下。' },
    { id: 'inkpai-2', role: 'assistant', text: '已识别：1 个标题、5 段正文、2 处引用。' },
    { id: 'inkpai-3', role: 'user', text: '保留原文，换成简洁科技风。' },
    { id: 'inkpai-4', role: 'assistant', text: '正在调整标题层级、正文间距和重点样式…' },
    { id: 'inkpai-5', role: 'assistant', text: '已生成排版预览。' },
    { id: 'inkpai-6', role: 'user', text: '把这句话单独做成金句卡。' },
    { id: 'inkpai-7', role: 'assistant', text: '已完成，并统一全文视觉样式。' },
  ],
}
