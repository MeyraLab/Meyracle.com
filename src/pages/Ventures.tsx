import { Link, useParams } from 'react-router-dom'
import { ProductVisual } from '../components/ProductVisual'
import { SiteShell } from '../components/SiteShell'
import { offerings } from '../data/studio'

export function ProductsIndex() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <header className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:items-end">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-text-muted">产品 / Products</p>
          <div>
            <h1 className="text-balance max-w-3xl text-5xl font-medium leading-none tracking-[-0.05em] text-text-primary sm:text-6xl">
              产品目录
            </h1>
            <p className="text-pretty mt-6 max-w-xl text-base leading-7 text-text-secondary">
              Inkpai 用于公众号文章排版；图片书摘用于文字成图。
            </p>
          </div>
        </header>
        <ul className="mt-16 grid gap-4 lg:grid-cols-2">
          {offerings.map((item, index) => (
            <li key={item.id}>
              <Link
                to={`/products/${item.slug}`}
                className="group block h-full overflow-hidden rounded-2xl bg-surface transition-colors hover:bg-surface-elevated"
              >
                <div className="m-2 overflow-hidden rounded-xl">
                  <ProductVisual productId={item.id} compact />
                </div>
                <div className="p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-text-muted">
                      {item.kicker}
                    </p>
                    <span className="font-mono text-[10px] text-text-muted">0{index + 1}</span>
                  </div>
                  <div className="mt-6 flex items-end justify-between gap-6">
                    <div>
                      <h2 className="text-2xl font-medium tracking-[-0.03em] text-text-primary">{item.name}</h2>
                      <p className="mt-2 text-sm leading-6 text-text-secondary">{item.tagline}</p>
                    </div>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cta text-cta-text transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </SiteShell>
  )
}

export function VenturePage() {
  const { slug } = useParams<{ slug: string }>()
  const item = offerings.find((o) => o.slug === slug)

  if (!item) {
    return (
      <SiteShell>
        <main className="mx-auto max-w-3xl px-4 py-24 text-center">
          <p className="text-text-secondary">未找到该产品</p>
          <Link to="/products" className="mt-4 inline-block text-sm hover:underline">
            查看产品目录
          </Link>
        </main>
      </SiteShell>
    )
  }

  const primaryHref = item.appUrl ?? '/products'

  return (
    <SiteShell>
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        <Link to="/products" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary">
          <span aria-hidden="true">←</span>
          产品目录
        </Link>
        <div className="mt-8 grid overflow-hidden rounded-2xl bg-surface lg:grid-cols-[0.9fr_1.1fr]">
          <div className="min-h-80 lg:min-h-[36rem]">
            <ProductVisual productId={item.id} />
          </div>
          <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-14">
            <div>
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-text-muted">
                {item.kicker}
              </p>
              <h1 className="mt-6 text-5xl font-medium leading-none tracking-[-0.05em] text-text-primary sm:text-6xl">
                {item.name}
              </h1>
              <p className="mt-6 text-lg text-text-secondary">{item.tagline}</p>
              <p className="text-pretty mt-8 max-w-xl text-base leading-8 text-text-secondary">{item.summary}</p>
            </div>
            <div className="mt-14 flex flex-wrap items-center gap-3">
              <a
                href={primaryHref}
                {...(item.appUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="inline-flex h-12 items-center rounded-full bg-cta px-7 text-sm font-medium text-cta-text transition duration-200 hover:-translate-y-0.5 hover:opacity-85 active:translate-y-0"
              >
                {item.cta}
              </a>
              {item.pricingPath ? (
                <Link
                  to={item.pricingPath}
                  className="inline-flex h-12 items-center rounded-full border border-border px-6 text-sm font-medium text-text-primary transition-colors hover:border-border-strong hover:bg-canvas"
                >
                  查看价格与权益
                </Link>
              ) : null}
            </div>
          </div>
        </div>
        {item.repoUrl ? (
          <div className="fine-rule mt-6 flex justify-end border-t pt-5">
            <a
              href={item.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center px-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              查看源码 →
            </a>
          </div>
        ) : null}
      </main>
    </SiteShell>
  )
}


