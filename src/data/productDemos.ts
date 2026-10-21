import { imageexcerptFolder } from '../components/product-demo/scripts/imageexcerptFolder'
import { inkpaiCanvas } from '../components/product-demo/scripts/inkpaiCanvas'
import type { Dictionary } from '../i18n'
import type { DemoMacWindow, ProductDemoScript } from '../components/product-demo/types'

export interface HomeProductDemo {
  script: ProductDemoScript
  footerLabel: string
  macWindow?: DemoMacWindow
}

const homeProductDemos = (t: Dictionary): Record<string, HomeProductDemo> => ({
  inkpai: {
    script: inkpaiCanvas,
    footerLabel: t.home.demoFooter.inkpai,
    macWindow: t.home.inkpaiWindow,
  },
  imageexcerpt: {
    script: imageexcerptFolder,
    footerLabel: t.home.demoFooter.imageexcerpt,
  },
})

export function getHomeProductDemo(productId: string, t: Dictionary): HomeProductDemo | undefined {
  return homeProductDemos(t)[productId]
}
