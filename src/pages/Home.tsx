import { Link } from 'react-router-dom'
import { ProductVisual } from '../components/ProductVisual'
import { SiteShell } from '../components/SiteShell'
import { getHomeGroups, type HomeCard } from '../data/catalog'
import { studio } from '../data/studio'

const cardLinkClassName =
  'group/link mt-7 inline-flex h-11 min-w-11 items-center justify-center gap-2 self-start rounded-full bg-cta px-5 text-[13px] font-medium text-cta-text transition duration-200 hover:-translate-y-0.5 hover:opacity-85 active:translate-y-0'

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path d="M3 8h9M9 4.5 12.5 8 9 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function HomeCardEntry({ item }: { item: HomeCard }) {
  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={cardLinkClassName}>
        {item.cta}
        <Arrow />
      </a>
    )
  }

  return (
    <Link to={item.href} className={cardLinkClassName}>
      {item.cta}
      <Arrow />
    </Link>
  )
}

function HomeProductCard({ item, index }: { item: HomeCard; index: number }) {
  return (
    <article className="group flex h-full min-h-[30rem] flex-col overflow-hidden rounded-2xl bg-surface transition-colors duration-200 hover:bg-surface-elevated">
      <div className="m-2 overflow-hidden rounded-xl">
        <ProductVisual productId={item.id} />
      </div>
      <div className="flex flex-1 flex-col p-6 pt-5 sm:p-7 sm:pt-5">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-text-muted">
            {item.kicker}
          </p>
          <span className="font-mono text-[10px] text-text-muted">0{index + 1}</span>
        </div>
        <h3 className="mt-5 text-2xl font-medium tracking-[-0.03em] text-text-primary">{item.name}</h3>
        <p className="mt-3 max-w-md flex-1 text-[15px] leading-7 text-text-secondary">{item.solves}</p>
        <HomeCardEntry item={item} />
      </div>
    </article>
  )
}

export function Home() {
  const groups = getHomeGroups()

  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 sm:pb-28 sm:pt-12 lg:px-8">
        <div className="grid overflow-hidden rounded-2xl bg-surface lg:min-h-[38rem] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-between px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-text-muted">
              Meyracle / Digital products
            </p>
            <div className="mt-24 lg:mt-32">
              <h1 className="text-balance max-w-3xl text-[2.75rem] font-medium leading-[0.98] tracking-[-0.055em] text-text-primary sm:text-6xl lg:text-[4.6rem]">
                {studio.tagline}
              </h1>
              <p className="text-pretty mt-7 max-w-xl text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
                {studio.description}
              </p>
            </div>
          </div>
          <div className="ambient-hero relative min-h-80 lg:min-h-full">
            <div className="absolute inset-6 flex flex-col justify-between border border-white/20 p-5 text-white sm:inset-8 sm:p-7">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.08em] text-white/65">
                <span>Built by MEYRA</span>
                <span>2026</span>
              </div>
              <div>
                <p className="max-w-sm text-balance text-3xl font-medium leading-tight tracking-[-0.04em] sm:text-4xl">
                  小而明确，
                  <br />
                  打开就能用。
                </p>
                <div className="mt-7 flex items-center gap-3 font-mono text-[10px] text-white/65">
                  <span className="h-px w-10 bg-white/60" />
                  <span>INKPAI / BK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {groups.map((group) => (
        <section key={group.id} className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 sm:pb-32 lg:px-8">
          <div className="fine-rule flex items-end justify-between border-t pt-5">
            <h2 className="font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-text-muted">
              {group.label}
            </h2>
            <span className="font-mono text-[10px] text-text-muted">{String(group.items.length).padStart(2, '0')}</span>
          </div>
          <div
            className={`mt-6 grid gap-4 ${
              group.items.length >= 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : group.items.length === 2 ? 'sm:grid-cols-2' : ''
            }`}
          >
            {group.items.map((item, index) => (
              <HomeProductCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </section>
      ))}
    </SiteShell>
  )
}


