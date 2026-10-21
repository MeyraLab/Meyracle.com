import type { Dictionary } from '../i18n'
import type { Offering, OfferingKind } from './studio'

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

function liveOfKind(offerings: Offering[], kind: OfferingKind): HomeCard[] {
  return offerings.filter((item) => item.kind === kind && isListed(item.status)).map(offeringToCard)
}

export function getHomeGroups(offerings: Offering[], t: Dictionary): HomeGroup[] {
  const labels = t.home.groups
  const groups: HomeGroup[] = [
    { id: 'app', label: labels.app, items: liveOfKind(offerings, 'app') },
    { id: 'download', label: labels.download, items: liveOfKind(offerings, 'download') },
    { id: 'service', label: labels.service, items: liveOfKind(offerings, 'service') },
  ]

  return groups.filter((group) => group.items.length > 0)
}


