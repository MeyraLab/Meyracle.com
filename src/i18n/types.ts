export type Lang = 'zh' | 'en' | 'fr' | 'ja' | 'ko' | 'es'

export interface OfferingText {
  name: string
  kicker: string
  tagline: string
  summary: string
  audience: string
  howTo: string
  cta: string
}

export interface PlanText {
  name: string
  price: string
  period?: string
  priceTag?: string
  billing: string
  description: string
  features: string[]
  action: string
}

export interface Dictionary {
  htmlLang: string
  studio: { tagline: string; description: string }
  offerings: Record<'inkpai' | 'imageexcerpt', OfferingText>
  nav: {
    products: string
    pricing: string
    about: string
    home: string
    contact: string
    legal: string
    privacy: string
    terms: string
    wechat: string
    openMenu: string
    closeMenu: string
    footerNav: string
    footerTagline: string
    toDark: string
    toLight: string
    dark: string
    light: string
    language: string
  }
  home: {
    groups: { app: string; download: string; service: string }
    explore: string
    exploreName: (name: string) => string
    demoFooter: { inkpai: string; imageexcerpt: string }
    inkpaiWindow: { title: string; status: string }
  }
  products: {
    eyebrow: string
    title: string
    intro: string
    notFound: string
    viewCatalog: string
    viewPricing: string
    viewSource: string
  }
  pricing: {
    eyebrow: string
    title: string
    intro: string
    inkpaiKicker: string
    openInkpai: string
    originalPrice: string
    plans: [PlanText, PlanText]
    purchaseTitle: string
    purchaseBody: string
    excerptKicker: string
    free: string
    noPayment: string
    excerptBody: string
    openExcerpt: string
    currencyNote: string
    helpBefore: string
    helpMiddle: string
    termsLink: string
    helpAfter: string
  }
  about: {
    eyebrow: string
    title: string
    intro: string
    meyraBody: string
    contactTitle: string
    wechat: string
    email: string
  }
  notFound: { title: string; back: string }
}
