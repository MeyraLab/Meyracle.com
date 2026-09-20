import { imageexcerptEditor } from '../components/product-demo/scripts/imageexcerptEditor'
import { inkpaiChat } from '../components/product-demo/scripts/inkpaiChat'
import type { ProductDemoScript } from '../components/product-demo/types'

const HOME_PRODUCT_DEMOS: Record<string, ProductDemoScript> = {
  inkpai: inkpaiChat,
  imageexcerpt: imageexcerptEditor,
}

export function getHomeProductDemo(productId: string): ProductDemoScript | undefined {
  return HOME_PRODUCT_DEMOS[productId]
}
