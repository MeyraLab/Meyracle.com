import { inkpaiChat } from '../components/product-demo/scripts/inkpaiChat'
import type { ProductDemoScript } from '../components/product-demo/types'

const HOME_PRODUCT_DEMOS: Record<string, ProductDemoScript> = {
  inkpai: inkpaiChat,
}

export function getHomeProductDemo(productId: string): ProductDemoScript | undefined {
  return HOME_PRODUCT_DEMOS[productId]
}
