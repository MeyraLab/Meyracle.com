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
  cta: string
  /** Where the product currently runs. Hub pages describe; they do not swallow the app. */
  appUrl?: string
  repoUrl?: string
  storePath?: string
}

export const studio: Studio = {
  name: 'Meyracle',
  legalName: 'Meyracle',
  domain: 'meyracle.com',
  tagline: '三个小工具。打开就能用。',
  description:
    'Inkpai 排公众号。图片书摘做成图。商店卖指令和模板。有新的也会放在这里。',
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
    tagline: '网页里排公众号文章',
    summary:
      '在浏览器里把文字排成适合手机阅读的样子，复制到公众号后台，格式不会乱。',
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
    tagline: '把书摘做成图',
    summary: '摘一段文字，排成一张能发的图。打开 bk.meyracle.com 就能用。',
    cta: '打开图片书摘',
    appUrl: 'https://bk.meyracle.com',
    repoUrl: 'https://github.com/MeyraLab/imageexcerpt',
  },
  {
    id: 'vibe-coding',
    slug: 'vibe-coding',
    name: 'Vibe Coding',
    kind: 'download',
    status: 'live',
    kicker: '商店',
    tagline: '指令、规则、脚手架',
    summary: '给周末写代码的人用：场景指令、项目模板、卡住时能翻的速查。微信买，发文件。',
    cta: '进商店',
    storePath: '/store',
  },
]

export const plannedNote = {
  id: 'later',
  name: '之后的产品',
  tagline: '还在做。做好了会放在这里。',
}
