import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products'

export function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const product = products.find((p) => p.id === id)
  const [showBuyTip, setShowBuyTip] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen bg-canvas text-text-primary flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-secondary mb-4">产品不存在</p>
          <Link to="/store" className="text-accent hover:underline">
            返回商店
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-canvas text-text-primary">
      {/* 简单导航 */}
      <header className="sticky top-0 z-50 border-b border-border bg-canvas/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/store" className="text-sm font-medium tracking-tight text-text-primary">
            ← 返回商店
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="mb-8 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-surface-elevated">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-text-muted">产品截图</span>
            </div>
          )}
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-medium tracking-tight text-text-primary">
              {product.name}
            </h1>
            {product.tag && (
              <span className="mt-2 inline-block text-sm text-accent">{product.tag}</span>
            )}
          </div>
          <div className="text-2xl font-medium text-text-primary">{product.price}</div>
        </div>

        <p className="mt-6 text-base leading-relaxed text-text-secondary">
          {product.longDescription || product.description}
        </p>

        {/* 功能列表 */}
        {product.features && product.features.length > 0 && (
          <section className="mt-12">
            <h2 className="text-lg font-medium tracking-tight text-text-primary">
              包含什么
            </h2>
            <ul className="mt-4 space-y-3">
              {product.features.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-text-secondary">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 适用人群 */}
        {product.audience && product.audience.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-medium tracking-tight text-text-primary">
              适合谁
            </h2>
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

        {/* 使用场景 */}
        {product.scenarios && product.scenarios.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-medium tracking-tight text-text-primary">
              使用场景
            </h2>
            <ul className="mt-4 space-y-3">
              {product.scenarios.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-text-secondary">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 购买后你会收到什么 */}
        {product.deliverables && product.deliverables.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-medium tracking-tight text-text-primary">
              购买后你会收到什么
            </h2>
            <ul className="mt-4 space-y-3">
              {product.deliverables.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-text-secondary">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 如何开始使用 */}
        {product.gettingStarted && product.gettingStarted.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-medium tracking-tight text-text-primary">
              如何开始使用
            </h2>
            <ol className="mt-4 space-y-3">
              {product.gettingStarted.map((item, index) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-text-secondary">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-medium text-accent">
                    {index + 1}
                  </span>
                  <span className="pt-0.5">{item}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* 适用工具 */}
        {product.supportedTools && product.supportedTools.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-medium tracking-tight text-text-primary">
              适用工具
            </h2>
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

        {/* 更新方式 */}
        {product.updatePolicy && (
          <section className="mt-10">
            <h2 className="text-lg font-medium tracking-tight text-text-primary">
              更新方式
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              {product.updatePolicy}
            </p>
          </section>
        )}

        <div className="mt-10 flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            {product.buyUrl ? (
              <a
                href={product.buyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-full bg-cta px-8 text-sm font-medium text-cta-text transition-opacity hover:opacity-90"
              >
                立即购买
              </a>
            ) : (
              <button
                onClick={() => setShowBuyTip(true)}
                className="inline-flex h-11 items-center justify-center rounded-full bg-cta px-8 text-sm font-medium text-cta-text transition-opacity hover:opacity-90"
              >
                立即购买
              </button>
            )}
          </div>

          <Link to="/" className="mt-2 text-sm text-text-muted hover:text-text-primary transition-colors">
            ← 返回首页
          </Link>

          {showBuyTip && (
            <div className="rounded-xl border border-accent/30 bg-accent-soft p-5 text-sm">
              <p className="font-medium text-text-primary mb-2">添加微信购买</p>
              <p className="text-text-secondary mb-3">
                微信号：<span className="text-accent font-medium select-all">{product.wechat || '请联系作者'}</span>
              </p>
              <p className="text-text-muted text-xs leading-relaxed">
                添加后请备注产品名称「{product.name}」，我会尽快发送下载链接。支持微信支付 / 支付宝。
              </p>
              <button
                onClick={() => setShowBuyTip(false)}
                className="mt-4 text-xs text-text-secondary hover:text-text-primary transition-colors"
              >
                关闭
              </button>
            </div>
          )}
        </div>

        {/* 购买说明 */}
        <div className="mt-8 rounded-xl border border-border bg-surface p-5 text-sm text-text-secondary">
          <p className="font-medium text-text-primary mb-2">购买方式</p>
          <ul className="space-y-1.5 list-disc list-inside">
            <li>点击「立即购买」后添加微信，备注产品名称</li>
            <li>支付成功后我会发送下载链接到你的邮箱或微信</li>
            <li>支持微信支付 / 支付宝（通过微信沟通）</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
