import { products, type Product } from './products'
import { offerings, type Offering, type OfferingKind } from './studio'

export const HOME_GROUP_LABELS: Record<OfferingKind, string> = {
  app: '工具',
  download: '商品',
  service: '服务',
}

export interface HomeCard {
  id: string
  name: string
  solves: string
  audience: string
  howTo: string
  cta: string
  href: string
  external?: boolean
}

export interface HomeGroup {
  id: OfferingKind
  label: string
  items: HomeCard[]
}

const PRODUCT_HOW_TO: Record<string, string> = {
  'vibe-prompt-kit': '打开文件，按场景复制到 Cursor / Claude。',
  'code-flow': '解压后执行 npm install 和 npm run dev。',
  'ai-cheatsheet': '打开速查表，按场景复制指令。',
}

function isListed(status: Offering['status']) {
  return status === 'live' || status === 'beta'
}

function offeringHref(offering: Offering): Pick<HomeCard, 'href' | 'external'> {
  if (offering.appUrl) {
    return { href: offering.appUrl, external: true }
  }

  return { href: offering.storePath ?? `/products/${offering.slug}` }
}

function offeringToCard(offering: Offering): HomeCard {
  return {
    id: offering.id,
    name: offering.name,
    solves: offering.summary,
    audience: offering.audience,
    howTo: offering.howTo,
    cta: offering.cta,
    ...offeringHref(offering),
  }
}

function productToCard(product: Product): HomeCard {
  return {
    id: product.id,
    name: product.name,
    solves: product.description,
    audience: product.audience?.[0] ?? '',
    howTo: PRODUCT_HOW_TO[product.id] ?? product.gettingStarted?.[0] ?? '',
    cta: '看详情',
    href: `/product/${product.id}`,
  }
}

function liveOfKind(kind: OfferingKind): HomeCard[] {
  return offerings.filter((item) => item.kind === kind && isListed(item.status)).map(offeringToCard)
}

export function getHomeGroups(): HomeGroup[] {
  const goods = products.length > 0 ? products.map(productToCard) : liveOfKind('download')

  const groups: HomeGroup[] = [
    { id: 'app', label: HOME_GROUP_LABELS.app, items: liveOfKind('app') },
    { id: 'download', label: HOME_GROUP_LABELS.download, items: goods },
    { id: 'service', label: HOME_GROUP_LABELS.service, items: liveOfKind('service') },
  ]

  return groups.filter((group) => group.items.length > 0)
}
