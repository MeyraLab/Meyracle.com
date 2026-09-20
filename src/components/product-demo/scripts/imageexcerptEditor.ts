import type { EditorDemoScript } from '../types'

export const imageexcerptEditor: EditorDemoScript = {
  kind: 'editor',
  quote: '我们终其一生，都在寻找两个东西：一个是价值感，一个是归属感。',
  title: '被讨厌的勇气',
  byline: '岸见一郎·古贺史健',
  recognizeLabel: '正在识别文字…',
  doneLabel: '已生成书摘卡',
  themes: [
    { id: 'paper', label: '纸白' },
    { id: 'ink', label: '暗黑' },
  ],
  steps: 6,
  intervalMs: 1300,
  holdMs: 1200,
}
