import { Link, useParams } from 'react-router-dom'
import { SiteShell } from '../components/SiteShell'
import { useOfferings } from '../data/localized'
import { useI18n } from '../i18n'

export function ProductsIndex() {
  const { t } = useI18n()
  const offerings = useOfferings()
  return (
    <SiteShell>
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">{t.products.eyebrow}</p>
        <h1 className="mt-4 max-w-2xl text-4xl font-medium tracking-[-0.04em] text-text-primary sm:text-5xl">
          {t.products.title}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
          {t.products.intro}
        </p>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {offerings.map((item) => (
            <li key={item.id}>
              <Link
                to={`/products/${item.slug}`}
                className="block h-full rounded-[24px] bg-surface p-6 transition-colors hover:bg-surface-elevated"
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
                  {item.kicker}
                </p>
                <h2 className="mt-3 text-xl font-medium tracking-tight text-text-primary">{item.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.tagline}</p>
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
  const { t } = useI18n()
  const offerings = useOfferings()
  const item = offerings.find((o) => o.slug === slug)

  if (!item) {
    return (
      <SiteShell>
        <main className="mx-auto max-w-3xl px-4 py-24 text-center">
          <p className="text-text-secondary">{t.products.notFound}</p>
          <Link to="/products" className="mt-4 inline-block text-sm hover:underline">
            {t.products.viewCatalog}
          </Link>
        </main>
      </SiteShell>
    )
  }

  const primaryHref = item.appUrl ?? '/products'

  return (
    <SiteShell>
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
          {item.kicker}
        </p>
        <h1 className="mt-4 text-4xl font-medium tracking-[-0.04em] text-text-primary sm:text-5xl">
          {item.name}
        </h1>
        <p className="mt-4 text-lg text-text-secondary">{item.tagline}</p>
        <p className="mt-6 text-base leading-relaxed text-text-secondary">{item.summary}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={primaryHref}
            {...(item.appUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="inline-flex h-12 items-center rounded-full bg-cta px-7 text-sm font-medium text-cta-text transition-opacity hover:opacity-80"
          >
            {item.cta}
          </a>
          {item.pricingPath ? (
            <Link
              to={item.pricingPath}
              className="inline-flex h-12 items-center rounded-full border border-border px-6 text-sm text-text-primary transition-colors hover:border-border-strong"
            >
              {t.products.viewPricing}
            </Link>
          ) : null}
          {item.repoUrl ? (
            <a
              href={item.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center px-2 text-sm text-text-secondary hover:text-text-primary"
            >
              {t.products.viewSource}
            </a>
          ) : null}
        </div>
      </main>
    </SiteShell>
  )
}


