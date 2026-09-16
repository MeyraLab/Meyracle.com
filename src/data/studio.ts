export const SITE_ORIGIN = 'https://meyracle.com'

export type OfferingKind = 'app' | 'download' | 'service'
export type OfferingStatus = 'live' | 'beta' | 'planned'

export interface Studio {
  name: string
  legalName: string
  domain: string
  tagline: string
  description: string
  wechat: string
  email: string
}

export interface Offering {
  id: string
  slug: string
  name: string
  kind: OfferingKind
  status: OfferingStatus
  tagline: string
  summary: string
  /** Where the product currently runs. Hub pages describe; they do not swallow the app. */
  appUrl?: string
  repoUrl?: string
  storePath?: string
}

export const studio: Studio = {
  name: 'Meyracle',
  legalName: 'Meyracle',
  domain: 'meyracle.com',
  tagline: '先把结构做对，再把产品做出来。',
  description:
    'Meyracle 是 MEYRA 的主站。这里放正在运营的产品、之后会上线的商业服务，以及统一的品牌与安全基线。每个产品有自己的形态，但共享同一套工作室数据。',
  wechat: 'MEYRA1219',
  email: 'hongmeichen1219@gmail.com',
}

export const offerings: Offering[] = [
  {
    id: 'inkpai',
    slug: 'inkpai',
    name: 'Inkpai',
    kind: 'app',
    status: 'live',
    tagline: '网页端公众号文章编辑器',
    summary:
      '在干净画布里把文字排成适合手机阅读、复制到公众号后台格式不乱的文章。编辑器继续独立运行，主站负责品牌、入口与后续商业化。',
    appUrl: 'https://inkpai.lovable.app',
    repoUrl: 'https://github.com/MeyraLab/inkpai',
  },
  {
    id: 'imageexcerpt',
    slug: 'imageexcerpt',
    name: '图片书摘',
    kind: 'app',
    status: 'live',
    tagline: '把书摘做成可发布的图片',
    summary:
      '图片书摘编辑器：从摘录到排版成图。应用继续独立运行，主站提供发现、说明与之后的账号/付费入口。',
    appUrl: 'https://imageexcerpt.lovable.app',
    repoUrl: 'https://github.com/MeyraLab/imageexcerpt',
  },
  {
    id: 'vibe-coding',
    slug: 'vibe-coding',
    name: 'Vibe Coding',
    kind: 'download',
    status: 'live',
    tagline: '中文场景的 Prompt、规则和脚手架',
    summary:
      '给周末独立开发者的小工具商店：Vibe Prompt Kit、Code Flow 模板、AI 编程速查。购买仍走微信，发货为文件。',
    storePath: '/store',
  },
]

export const plannedServices: Pick<Offering, 'id' | 'name' | 'tagline' | 'status'>[] = [
  {
    id: 'future-services',
    name: '商业产品与服务',
    tagline: '同一套 Offer / Order 模型上扩展，不另起一套字段。',
    status: 'planned',
  },
]
