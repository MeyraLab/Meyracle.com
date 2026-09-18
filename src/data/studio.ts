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
  repoUrl?: string
}

export const studio: Studio = {
  name: 'Meyracle',
  legalName: 'Meyracle',
  domain: 'meyracle.com',
  tagline: '放些做完就能用的东西。',
  description: 'Inkpai 排公众号文章。图片书摘把一段文字做成图。',
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
    kicker: '排版',
    tagline: '把公众号文章排好',
    summary: '把文章贴进来，排好后复制到公众号后台。',
    audience: '自己发公众号、嫌后台排版麻烦的人。',
    howTo: '贴进文章，选好样式，复制到公众号后台。',
    cta: '打开 Inkpai',
    appUrl: 'https://inkpai.meyracle.com',
    repoUrl: 'https://github.com/MeyraLab/inkpai',
  },
  {
    id: 'imageexcerpt',
    slug: 'imageexcerpt',
    name: '图片书摘',
    kind: 'app',
    status: 'live',
    kicker: '成图',
    tagline: '把一段文字做成图',
    summary: '贴一段书摘或句子，排成能发出去的图片。',
    audience: '想把书摘、句子做成图的人。',
    howTo: '贴上文字，选样式，导出图片。',
    cta: '打开图片书摘',
    appUrl: 'https://bk.meyracle.com',
    repoUrl: 'https://github.com/MeyraLab/imageexcerpt',
  },
]

