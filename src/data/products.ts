export interface Product {
  id: string
  name: string
  description: string
  price: string
  tag?: string
  longDescription?: string
  buyUrl?: string
  wechat?: string
  image?: string
  features?: string[]
  audience?: string[]
  scenarios?: string[]
  deliverables?: string[]
  gettingStarted?: string[]
  supportedTools?: string[]
  updatePolicy?: string
}

export const products: Product[] = [
  {
    id: 'vibe-prompt-kit',
    name: 'Vibe Prompt Kit',
    description: '别每次自己编中文指令。按场景分好，复制就能用。',
    price: '¥49',
    tag: '常用',
    longDescription:
      '中文场景指令和规则片段：生成、重构、调试、文档、UI 描述。也有可放进项目的 .cursorrules / CLAUDE.md 示例。复制就能用，也可以按项目改。',
    buyUrl: '',
    image: '/products/vibe-prompt-kit.svg',
    wechat: 'MEYRA1219',
    features: [
      '高频中文场景：生成、重构、调试、文档、UI 描述',
      '附带 .cursorrules 与 CLAUDE.md 示例，Cursor / Claude Code 都能用',
      '指令里带着约束和验收，少返工',
      '中文优先，贴合中文注释和国内项目习惯',
      '可直接复制，也可按项目改；含后续更新',
    ],
    audience: [
      '周末做 side project 的人',
      '已经在用 Cursor / Claude，不想每次重写指令',
      '需要中文规则和场景模板的前端 / 全栈',
      '刚开始用 AI 写代码、不想从零摸索',
    ],
    scenarios: [
      '周五晚上开工，直接复制对应场景的指令',
      '重构旧代码，需要带约束的改写说法',
      '写 README、接口说明、产品说明',
      '给模型描述界面和交互，少来回改',
      '报错时用带上下文的排查指令',
    ],
    deliverables: [
      '按场景分类的指令文件（Markdown，可直接复制）',
      '.cursorrules 与 CLAUDE.md 示例片段',
      '使用说明和微调建议',
      '后续内容更新（微信通知）',
    ],
    gettingStarted: [
      '打开文件，按场景找到对应指令',
      '需要项目级约束时，把示例规则复制到 .cursorrules 或 CLAUDE.md',
      '粘贴到 Cursor / Claude / ChatGPT 使用',
      '按项目技术栈改关键词和约束',
      '有问题微信联系，备注产品名',
    ],
    supportedTools: ['Cursor', 'Claude Code', 'ChatGPT / 其他对话工具'],
    updatePolicy: '买过之后可以拿后续更新。大改会通过微信说一声。',
  },
  {
    id: 'code-flow',
    name: 'Code Flow 模板',
    description: '别先花一小时配主题和目录。装好大约 15 分钟就能写功能。',
    price: '¥79',
    longDescription:
      'Vite + React + TypeScript + Tailwind 脚手架。暗色主题、目录和常用开发配置已经放好。周末开工时直接安装运行，不用先配一小时环境。',
    buyUrl: '',
    image: '/products/code-flow.svg',
    wechat: 'MEYRA1219',
    features: [
      'Vite + React + TypeScript + Tailwind 完整配置',
      '内置暗色主题和基础设计变量',
      '预设组件结构和目录，少从零组织代码',
      '热更新、路径别名等开发配置已开好',
      '当新产品起点，也可以按需删',
    ],
    audience: [
      '只有周末、想马上开工的人',
      '不想从零配置工具链的前端',
      '想统一暗色界面和基础目录的小团队',
      '用 AI 写代码、需要一个干净项目底座',
    ],
    scenarios: [
      '周五 22:00 启动 side project，不想再配一小时环境',
      '接小活，需要一个能交出去的前端起点',
      '把想法先落到能跑的页面骨架',
      '在同一套基础样式上做多个小产品',
    ],
    deliverables: [
      '完整项目源码（安装依赖就能跑）',
      '暗色主题和设计变量',
      'README 启动说明',
      '目录和组件说明',
      '后续模板更新',
    ],
    gettingStarted: [
      '解压后进入项目目录',
      '执行 npm install',
      '执行 npm run dev，浏览器打开本地地址',
      '按 README 改页面和组件，开始写功能',
      '需要统一指令时，可搭配 Vibe Prompt Kit 里的规则片段',
    ],
    supportedTools: ['Node.js + npm / pnpm', 'Cursor / VS Code', '现代浏览器'],
    updatePolicy: '买过之后可以拿模板后续更新。结构大改时会说明怎么迁。',
  },
  {
    id: 'ai-cheatsheet',
    name: 'AI 编程速查',
    description: '卡住时别再搜英文模板。按场景排好的中文指令，翻到就能复制。',
    price: '¥29',
    longDescription:
      '按场景整理的中文指令：启动、重构、调试、文档、解释代码。不是教程，是卡住时能立刻翻到的说法。',
    buyUrl: '',
    image: '/products/ai-cheatsheet.svg',
    wechat: 'MEYRA1219',
    features: [
      '按场景分类：启动 / 重构 / 调试 / 文档 / 解释代码',
      '写法带着约束和能检查的结果',
      '中文优先',
      '篇幅短，适合收藏或打印',
      '会随常用工具补新场景',
    ],
    audience: [
      '日常用 AI 写代码、不想每次现想说法的人',
      '调试和重构时经常卡住的人',
      '需要一份能分享的中文清单',
      '刚开始用这些工具的人',
    ],
    scenarios: [
      '功能写到一半卡住，需要立刻能用的指令',
      '报错排查时，用固定话术让模型对着问题找',
      '重构前先约束改动范围',
      '给新人一份「先翻这里」',
    ],
    deliverables: [
      '速查表（Markdown，可打印）',
      '按场景整理的指令',
      '后续内容更新',
    ],
    gettingStarted: [
      '打开或收藏速查表',
      '卡住时按场景找到对应指令',
      '复制到 Cursor / Claude 等工具里用',
      '也可以打一份放手边',
      '有新场景可以跟我说，后面补',
    ],
    supportedTools: ['Cursor', 'Claude Code', 'ChatGPT / 其他对话工具'],
    updatePolicy: '买过之后可以拿速查后续更新。新场景会补进去。',
  },
]
