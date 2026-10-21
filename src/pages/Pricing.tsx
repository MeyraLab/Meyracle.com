import { Link } from 'react-router-dom'
import { SiteShell } from '../components/SiteShell'
import { studio } from '../data/studio'
import { useI18n } from '../i18n'

const planLinks = [
  { href: 'https://inkpai.meyracle.com', featured: false, originalPrice: undefined },
  { href: 'https://inkpai.meyracle.com/pricing', featured: true, originalPrice: '¥198' },
]

export function Pricing() {
  const { t } = useI18n()
  const p = t.pricing
  const plans = p.plans.map((plan, index) => ({ ...plan, ...planLinks[index] }))
  return (
    <SiteShell>
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <header className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">{p.eyebrow}</p>
          <h1 className="mt-4 text-4xl font-medium tracking-[-0.04em] text-text-primary sm:text-5xl">
            {p.title}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
            {p.intro}
          </p>
        </header>

        <section aria-labelledby="inkpai-pricing" className="mt-14">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
                {p.inkpaiKicker}
              </p>
              <h2 id="inkpai-pricing" className="mt-3 text-2xl font-medium tracking-[-0.03em] text-text-primary">
                Inkpai
              </h2>
            </div>
            <a
              href="https://inkpai.meyracle.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {p.openInkpai}
            </a>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {plans.map((plan) => (
              <article key={plan.name} className="flex h-full flex-col rounded-[28px] bg-surface p-6 sm:p-8">
                <h3 className="text-xl font-medium tracking-tight text-text-primary">{plan.name}</h3>
                <div className="mt-7">
                  <p className="text-4xl font-medium tracking-[-0.04em] text-text-primary">
                    {plan.price}
                    {plan.period ? (
                      <span className="ml-1 text-base font-normal tracking-normal text-text-secondary">{plan.period}</span>
                    ) : null}
                  </p>
                  {plan.priceTag || plan.originalPrice ? (
                    <p className="mt-2 flex flex-wrap gap-x-3 text-sm text-text-secondary">
                      {plan.priceTag ? <span>{plan.priceTag}</span> : null}
                      {plan.originalPrice ? (
                        <span>
                          {p.originalPrice} <s>{plan.originalPrice}</s>
                        </span>
                      ) : null}
                    </p>
                  ) : null}
                  <p className="mt-3 text-sm font-medium leading-relaxed text-text-primary">{plan.billing}</p>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-text-secondary">{plan.description}</p>
                <ul className="mt-7 space-y-3 border-t border-border pt-6 text-sm text-text-secondary">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span aria-hidden="true" className="text-text-primary">
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-medium transition-opacity hover:opacity-80 ${
                    plan.featured
                      ? 'bg-cta text-cta-text'
                      : 'border border-border text-text-primary'
                  }`}
                >
                  {plan.action}
                </a>
              </article>
            ))}
          </div>

          <div className="mt-4 rounded-[24px] border border-border p-6 sm:p-7">
            <h3 className="text-base font-medium text-text-primary">{p.purchaseTitle}</h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-secondary">
              {p.purchaseBody}
            </p>
          </div>
        </section>

        <section aria-labelledby="imageexcerpt-pricing" className="mt-16 border-t border-border pt-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">{p.excerptKicker}</p>
          <h2 id="imageexcerpt-pricing" className="mt-3 text-2xl font-medium tracking-[-0.03em] text-text-primary">
            {t.offerings.imageexcerpt.name}
          </h2>
          <div className="mt-6 rounded-[24px] bg-surface p-6 sm:p-8">
            <p className="text-3xl font-medium tracking-[-0.04em] text-text-primary">{p.free}</p>
            <p className="mt-3 text-sm font-medium text-text-primary">{p.noPayment}</p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary">
              {p.excerptBody}
            </p>
            <a
              href="https://bk.meyracle.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-12 items-center rounded-full bg-cta px-6 text-sm font-medium text-cta-text transition-opacity hover:opacity-80"
            >
              {p.openExcerpt}
            </a>
          </div>
        </section>

        <section className="mt-16 border-t border-border pt-10 text-sm leading-relaxed text-text-secondary">
          <p>
            {p.currencyNote}
          </p>
          <p className="mt-3">
            {p.helpBefore}{' '}
            <a href={`mailto:${studio.billingEmail}`} className="text-text-primary underline underline-offset-4">
              {studio.billingEmail}
            </a>
            {p.helpMiddle}{' '}
            <Link to="/terms" className="text-text-primary underline underline-offset-4">
              {p.termsLink}
            </Link>
            {p.helpAfter}
          </p>
        </section>
      </main>
    </SiteShell>
  )
}
