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
  storePath?: string
}

export const studio: Studio = {
  name: 'Meyracle',
  legalName: 'Meyracle',
  domain: 'meyracle.com',
  tagline: '现在能用的，都放在这里。',
  description: '现在能打开 Inkpai 和图片书摘。商店里还有指令和模板可买。',
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
    summary: '在网页里排公众号文章，复制到后台，格式不会乱。',
    audience: '写公众号、不想在后台里一点点调格式的人。',
    howTo: '打开网页排版，复制到公众号后台。',
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
    summary: '摘一段文字，排成一张能发出去的图。',
    audience: '想把书摘或句子做成图的人。',
    howTo: '打开网页，贴上摘录，导出成图。',
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
    summary: '场景指令、项目模板、卡住时能翻的速查。微信买，发文件。',
    audience: '周末写代码、不想反复配环境和重写指令的人。',
    howTo: '进商店选一份，微信付款后收文件。',
    cta: '进商店',
    storePath: '/store',
  },
]
