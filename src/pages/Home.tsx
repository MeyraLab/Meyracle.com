import { Link } from 'react-router-dom'
import { ProductDemo } from '../components/product-demo/ProductDemo'
import { SiteShell } from '../components/SiteShell'
import { getHomeGroups, type HomeCard } from '../data/catalog'
import { getHomeProductDemo } from '../data/productDemos'
import { studio } from '../data/studio'
import './Home.css'

const cardLinkClassName =
  'home-product-card__cta mt-6 inline-flex h-12 min-w-12 items-center justify-center self-start rounded-full bg-cta px-5 text-[13px] font-medium text-cta-text'

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

function HomeProductCardFooter({ item }: { item: HomeCard }) {
  return (
    <div className="home-product-card__footer flex shrink-0 flex-col p-6 pt-5 sm:p-7 sm:pt-5">
      <p className="home-product-card__kicker text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
        {item.kicker}
      </p>
      <h3 className="mt-3 text-xl font-medium tracking-tight text-text-primary">{item.name}</h3>
      <HomeCardEntry item={item} />
    </div>
  )
}

function HomeProductCard({ item }: { item: HomeCard }) {
  const demo = getHomeProductDemo(item.id)

  return (
    <article className="home-product-card flex h-full flex-col rounded-[28px] bg-surface">
      <div className="home-product-card__shine" aria-hidden="true" />
      {demo ? (
        <div className="home-product-card__body flex h-full min-h-0 flex-1 flex-col">
          <ProductDemo script={demo} />
          <HomeProductCardFooter item={item} />
        </div>
      ) : (
        <div className="home-product-card__body flex h-full flex-1 flex-col p-6 sm:p-7">
          <p className="home-product-card__kicker text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
            {item.kicker}
          </p>
          <h3 className="mt-3 text-xl font-medium tracking-tight text-text-primary">{item.name}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">{item.solves}</p>
          <HomeCardEntry item={item} />
        </div>
      )}
    </article>
  )
}

export function Home() {
  const groups = getHomeGroups()

  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-12 sm:px-6 sm:pt-24 sm:pb-16">
        <h1 className="max-w-2xl break-normal text-3xl font-medium tracking-[-0.04em] text-text-primary sm:text-4xl sm:leading-tight">
          {studio.tagline}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary">{studio.description}</p>
      </section>

      <div className="home-product-entrance">
        {groups.map((group) => (
          <section key={group.id} className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">{group.label}</h2>
            <div
              className={`mt-5 grid gap-4 ${
                group.items.length >= 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : group.items.length === 2 ? 'sm:grid-cols-2' : ''
              }`}
            >
              {group.items.map((item) => (
                <HomeProductCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </SiteShell>
  )
}
