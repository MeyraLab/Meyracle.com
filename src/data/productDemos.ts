import { imageexcerptFolder } from '../components/product-demo/scripts/imageexcerptFolder'
import { inkpaiChat } from '../components/product-demo/scripts/inkpaiChat'
import type { DemoMacWindow, ProductDemoScript } from '../components/product-demo/types'

export interface HomeProductDemo {
  script: ProductDemoScript
  footerLabel: string
  macWindow?: DemoMacWindow
}

const HOME_PRODUCT_DEMOS: Record<string, HomeProductDemo> = {
  inkpai: {
    script: inkpaiChat,
    footerLabel: '写作',
    macWindow: {
      title: 'inkpai / 排版',
      status: '预览',
    },
  },
  imageexcerpt: {
    script: imageexcerptFolder,
    footerLabel: '书摘',
  },
}

export function getHomeProductDemo(productId: string): HomeProductDemo | undefined {
  return HOME_PRODUCT_DEMOS[productId]
}
