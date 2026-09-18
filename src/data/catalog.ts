import { offerings, type Offering, type OfferingKind } from './studio'

export const HOME_GROUP_LABELS: Record<OfferingKind, string> = {
  app: '当前产品',
  download: '商品',
  service: '服务',
}

export interface HomeCard {
  id: string
  kicker: string
  name: string
  solves: string
  cta: string
  href: string
  external?: boolean
}

export interface HomeGroup {
  id: OfferingKind
  label: string
  items: HomeCard[]
}

function isListed(status: Offering['status']) {
  return status === 'live' || status === 'beta'
}

function offeringHref(offering: Offering): Pick<HomeCard, 'href' | 'external'> {
  if (offering.appUrl) {
    return { href: offering.appUrl, external: true }
  }

  return { href: `/products/${offering.slug}` }
}

function offeringToCard(offering: Offering): HomeCard {
  return {
    id: offering.id,
    kicker: offering.kicker,
    name: offering.name,
    solves: offering.summary,
    cta: offering.cta,
    ...offeringHref(offering),
  }
}

function liveOfKind(kind: OfferingKind): HomeCard[] {
  return offerings.filter((item) => item.kind === kind && isListed(item.status)).map(offeringToCard)
}

export function getHomeGroups(): HomeGroup[] {
  const groups: HomeGroup[] = [
    { id: 'app', label: HOME_GROUP_LABELS.app, items: liveOfKind('app') },
    { id: 'download', label: HOME_GROUP_LABELS.download, items: liveOfKind('download') },
    { id: 'service', label: HOME_GROUP_LABELS.service, items: liveOfKind('service') },
  ]

  return groups.filter((group) => group.items.length > 0)
}


