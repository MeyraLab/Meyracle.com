import { Link, useParams } from 'react-router-dom'
import { SiteShell } from '../components/SiteShell'
import { offerings } from '../data/studio'

export function ProductsIndex() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-medium tracking-tight text-text-primary">产品</h1>
        <p className="mt-3 max-w-2xl text-text-secondary">
          Inkpai、图片书摘、Vibe Coding 商店。之后的商业服务会作为新的 Offering 加进来，不另起一套结构。
        </p>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {offerings.map((item) => (
            <li key={item.id}>
              <Link
                to={`/products/${item.slug}`}
                className="block rounded-2xl border border-border bg-surface p-5 hover:border-border-strong"
              >
                <h2 className="text-base font-medium text-text-primary">{item.name}</h2>
                <p className="mt-1 text-sm text-text-secondary">{item.tagline}</p>
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
          <p className="text-text-secondary">没有这个产品。</p>
          <Link to="/products" className="mt-4 inline-block text-accent hover:underline">
            返回产品列表
          </Link>
        </main>
      </SiteShell>
    )
  }

  const primaryHref = item.appUrl ?? item.storePath ?? '/products'

  return (
    <SiteShell>
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-sm text-accent">{item.kind === 'app' ? '应用' : '数字产品'}</p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight text-text-primary">{item.name}</h1>
        <p className="mt-3 text-lg text-text-secondary">{item.tagline}</p>
        <p className="mt-6 leading-relaxed text-text-secondary">{item.summary}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={primaryHref}
            {...(item.appUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="inline-flex h-10 items-center justify-center rounded-full bg-cta px-6 text-sm font-medium text-cta-text"
          >
            {item.appUrl ? '打开应用' : '进入商店'}
          </a>
          {item.repoUrl ? (
            <a
              href={item.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center text-sm text-text-secondary hover:text-text-primary"
            >
              源码 →
            </a>
          ) : null}
        </div>
        <p className="mt-10 text-sm text-text-muted">
          应用与主站分离：主站管发现、品牌与以后的账号/订单；产品应用管自己的编辑工作流。合并代码会把两套数据模型缠在一起。
        </p>
      </main>
    </SiteShell>
  )
}
