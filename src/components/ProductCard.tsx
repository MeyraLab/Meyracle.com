import { Link } from 'react-router-dom'

interface ProductCardProps {
  product: {
    id: string
    name: string
    description: string
    price: string
    tag?: string
    image?: string
  }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative flex h-full flex-col rounded-[24px] bg-surface p-5">
      <div className="mb-5 aspect-[16/10] w-full overflow-hidden rounded-2xl bg-canvas">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-sm text-text-muted">产品截图</span>
          </div>
        )}
      </div>

      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-medium text-text-primary">{product.name}</h3>
          {product.tag && (
            <span className="mt-1 inline-block text-xs text-text-muted">{product.tag}</span>
          )}
        </div>
        <span className="shrink-0 text-sm font-medium text-text-primary">{product.price}</span>
      </div>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">{product.description}</p>

      <Link
        to={`/product/${product.id}`}
        className="mt-5 block w-full rounded-full border border-border bg-canvas py-2.5 text-center text-sm font-medium text-text-primary transition-colors hover:border-text-primary"
      >
        看详情
      </Link>
    </div>
  )
}
