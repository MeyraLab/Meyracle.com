import { Link } from 'react-router-dom'
import { SiteShell } from '../components/SiteShell'
import { offerings, plannedServices, studio } from '../data/studio'

export function Home() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-4 pt-20 pb-24 sm:px-6 sm:pt-28 sm:pb-32">
        <p className="text-sm font-medium text-accent">{studio.domain}</p>
        <h1 className="mt-4 max-w-2xl text-4xl font-medium tracking-tight text-text-primary sm:text-5xl sm:leading-[1.15]">
          {studio.tagline}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-secondary">{studio.description}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            to="/products"
            className="inline-flex h-10 items-center justify-center rounded-full bg-cta px-6 text-sm font-medium text-cta-text transition-opacity hover:opacity-90"
          >
            查看产品
          </Link>
          <Link to="/about" className="text-sm text-text-secondary transition-colors hover:text-text-primary">
            关于 Meyracle →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 sm:pb-32">
        <h2 className="text-2xl font-medium tracking-tight text-text-primary sm:text-3xl">正在运营</h2>
        <p className="mt-2 max-w-2xl text-text-secondary">
          每个产品是独立 Offering。主站不把应用代码揉进同一套页面字段里。
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {offerings.map((item) => (
            <Link
              key={item.id}
              to={`/products/${item.slug}`}
              className="group rounded-2xl border border-border bg-surface p-5 transition-all hover:border-border-strong"
            >
              <p className="text-xs text-accent">{item.status === 'live' ? '已上线' : item.status}</p>
              <h3 className="mt-2 text-base font-medium text-text-primary">{item.name}</h3>
              <p className="mt-1 text-sm text-text-muted">{item.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{item.summary}</p>
              <p className="mt-5 text-sm text-accent group-hover:underline">了解 →</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-32 sm:px-6">
        <h2 className="text-2xl font-medium tracking-tight text-text-primary">下一步</h2>
        <div className="mt-6 max-w-2xl rounded-2xl border border-dashed border-border p-5">
          {plannedServices.map((item) => (
            <div key={item.id}>
              <p className="text-sm font-medium text-text-primary">{item.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.tagline}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  )
}
