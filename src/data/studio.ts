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
  kicker: string
  tagline: string
  summary: string
  audience: string
  howTo: string
  cta: string
  /** Where the product currently runs. Hub pages describe; they do not swallow the app. */
  appUrl?: string
  pricingPath?: string
  repoUrl?: string
}

export const studio: Studio = {
  name: 'Meyracle',
  legalName: 'Meyracle',
  domain: 'meyracle.com',
  tagline: '独立开发的数字产品',
  description: '由 MEYRA 开发，目前包括 Inkpai 与图片书摘。',
  wechat: 'MEYRA1219',
  email: 'meyrasupport@gmail.com',
}

export const offerings: Offering[] = [
  {
    id: 'inkpai',
    slug: 'inkpai',
    name: 'Inkpai',
    kind: 'app',
    status: 'live',
    kicker: '微信公众号排版工具',
    tagline: '公众号文章排版',
    summary: '把文章贴入，选好样式，再复制到公众号后台。',
    audience: '适合自己发布公众号文章的人。',
    howTo: '贴入文章，选择样式，复制到公众号后台。',
    cta: '打开 Inkpai',
    appUrl: 'https://inkpai.meyracle.com',
    pricingPath: '/pricing',
    repoUrl: 'https://github.com/MeyraLab/inkpai',
  },
  {
    id: 'imageexcerpt',
    slug: 'imageexcerpt',
    name: '图片书摘',
    kind: 'app',
    status: 'live',
    kicker: '免费文字成图工具',
    tagline: '文字与书摘成图',
    summary: '贴上文字，选个样式，保存图片。免费使用。',
    audience: '适合将书摘或句子制作成图片。',
    howTo: '贴上文字，选择样式，保存图片。',
    cta: '打开图片书摘',
    appUrl: 'https://bk.meyracle.com',
    repoUrl: 'https://github.com/MeyraLab/imageexcerpt',
  },
]


