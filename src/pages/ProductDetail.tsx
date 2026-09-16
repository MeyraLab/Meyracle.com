import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { SiteShell } from '../components/SiteShell'
import { products } from '../data/products'
import { studio } from '../data/studio'

export function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const product = products.find((p) => p.id === id)
  const [showBuyTip, setShowBuyTip] = useState(false)

  if (!product) {
    return (
      <SiteShell>
        <main className="mx-auto max-w-3xl px-4 py-24 text-center">
          <p className="text-text-secondary mb-4">产品不存在</p>
          <Link to="/store" className="text-sm hover:underline">
            返回商店
          </Link>
        </main>
      </SiteShell>
    )
  }

  return (
    <SiteShell>
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <Link to="/store" className="text-sm text-text-muted hover:text-text-primary">
          ← 商店
        </Link>

        <div className="mt-6 mb-8 aspect-[16/9] w-full overflow-hidden rounded-[24px] bg-surface">
          {product.image ? (
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-text-muted">产品截图</span>
            </div>
          )}
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-medium tracking-tight text-text-primary sm:text-4xl">
              {product.name}
            </h1>
            {product.tag && <span className="mt-2 inline-block text-sm text-text-muted">{product.tag}</span>}
          </div>
          <div className="text-2xl font-medium text-text-primary">{product.price}</div>
        </div>

        <p className="mt-6 text-base leading-relaxed text-text-secondary">
          {product.longDescription || product.description}
        </p>

        {product.features && product.features.length > 0 && (
          <section className="mt-12">
            <h2 className="text-lg font-medium tracking-tight text-text-primary">包含什么</h2>
            <ul className="mt-4 space-y-3">
              {product.features.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-text-secondary">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {product.audience && product.audience.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-medium tracking-tight text-text-primary">适合谁</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.audience.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-text-secondary"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>
        )}

        {product.scenarios && product.scenarios.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-medium tracking-tight text-text-primary">使用场景</h2>
            <ul className="mt-4 space-y-3">
              {product.scenarios.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-text-secondary">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-text-muted" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {product.deliverables && product.deliverables.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-medium tracking-tight text-text-primary">买完你会收到什么</h2>
            <ul className="mt-4 space-y-3">
              {product.deliverables.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-text-secondary">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {product.gettingStarted && product.gettingStarted.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-medium tracking-tight text-text-primary">怎么开始用</h2>
            <ol className="mt-4 space-y-3">
              {product.gettingStarted.map((item, index) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-text-secondary">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-surface text-xs font-medium text-text-primary">
                    {index + 1}
                  </span>
                  <span className="pt-0.5">{item}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {product.supportedTools && product.supportedTools.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-medium tracking-tight text-text-primary">适用工具</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.supportedTools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-text-secondary"
                >
                  {tool}
                </span>
              ))}
            </div>
          </section>
        )}

        {product.updatePolicy && (
          <section className="mt-10">
            <h2 className="text-lg font-medium tracking-tight text-text-primary">更新方式</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">{product.updatePolicy}</p>
          </section>
        )}

        <div className="mt-10 flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            {product.buyUrl ? (
              <a
                href={product.buyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full bg-cta px-8 text-sm font-medium text-cta-text transition-opacity hover:opacity-80"
              >
                立即购买
              </a>
            ) : (
              <button
                onClick={() => setShowBuyTip(true)}
                className="inline-flex h-12 items-center justify-center rounded-full bg-cta px-8 text-sm font-medium text-cta-text transition-opacity hover:opacity-80"
              >
                立即购买
              </button>
            )}
          </div>

          {showBuyTip && (
            <div className="rounded-[20px] bg-surface p-5 text-sm">
              <p className="mb-2 font-medium text-text-primary">加微信购买</p>
              <p className="mb-3 text-text-secondary">
                微信号：
                <span className="select-all font-medium text-text-primary">
                  {product.wechat || studio.wechat}
                </span>
              </p>
              <p className="text-xs leading-relaxed text-text-muted">
                加上后请备注产品名称「{product.name}」，我会尽快发下载链接。支持微信支付 / 支付宝。
              </p>
              <button
                onClick={() => setShowBuyTip(false)}
                className="mt-4 text-xs text-text-secondary hover:text-text-primary"
              >
                关闭
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 rounded-[20px] bg-surface p-5 text-sm text-text-secondary">
          <p className="mb-2 font-medium text-text-primary">购买方式</p>
          <ul className="list-disc space-y-1.5 pl-4">
            <li>点「立即购买」后加微信，备注产品名称</li>
            <li>付完我会把下载链接发到微信或邮箱</li>
            <li>支持微信支付 / 支付宝（走微信沟通）</li>
          </ul>
        </div>
      </main>
    </SiteShell>
  )
}
