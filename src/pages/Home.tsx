import { Link } from 'react-router-dom'
import { SiteShell } from '../components/SiteShell'
import { getHomeGroups, type HomeCard } from '../data/catalog'
import { studio } from '../data/studio'

const cardLinkClassName =
  'mt-6 inline-flex h-12 min-w-[48px] items-center justify-center rounded-full bg-cta px-5 text-[13px] font-medium text-cta-text transition-opacity hover:opacity-80'

function HomeCardEntry({ item }: { item: HomeCard }) {
  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={cardLinkClassName}>
        {item.cta}
      </a>
    )
  }

  return (
    <Link to={item.href} className={cardLinkClassName}>
      {item.cta}
    </Link>
  )
}

function HomeProductCard({ item }: { item: HomeCard }) {
  return (
    <article className="flex h-full flex-col rounded-[28px] bg-surface p-6 sm:p-7">
      <h3 className="text-xl font-medium tracking-tight text-text-primary">{item.name}</h3>
      <dl className="mt-5 flex-1 space-y-3 text-sm leading-relaxed">
        <div>
          <dt className="text-text-muted">解决</dt>
          <dd className="mt-1 text-text-secondary">{item.solves}</dd>
        </div>
        <div>
          <dt className="text-text-muted">给谁</dt>
          <dd className="mt-1 text-text-secondary">{item.audience}</dd>
        </div>
        <div>
          <dt className="text-text-muted">用法</dt>
          <dd className="mt-1 text-text-secondary">{item.howTo}</dd>
        </div>
      </dl>
      <HomeCardEntry item={item} />
    </article>
  )
}

export function Home() {
  const groups = getHomeGroups()

  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-12 sm:px-6 sm:pt-24 sm:pb-16">
        <h1 className="max-w-2xl text-3xl font-medium tracking-[-0.04em] text-text-primary sm:text-4xl sm:leading-tight">
          {studio.description}
        </h1>
      </section>

      {groups.map((group) => (
        <section key={group.id} className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28">
          <h2 className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">{group.label}</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((item) => (
              <HomeProductCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      ))}
    </SiteShell>
  )
}
