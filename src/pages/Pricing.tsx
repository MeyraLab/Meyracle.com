import { Link } from 'react-router-dom'
import { SiteShell } from '../components/SiteShell'
import { studio } from '../data/studio'

const plans = [
  {
    name: 'Inkpai 基础版',
    price: '免费',
    billing: '无需付款',
    description: '完成公众号文章排版所需的基础功能。',
    features: [
      '完整基础排版工具',
      '8 套基础主题',
      '图片、表格与手机预览',
      '一键复制到公众号',
      '本地草稿自动保存',
    ],
    action: '使用基础版',
    href: 'https://inkpai.meyracle.com',
    featured: false,
  },
  {
    name: 'Inkpai Plus',
    price: 'US$15.00',
    billing: '7 天免费试用。试用结束后每年自动续费，可在当前计费周期结束前取消。',
    description: '供需要更多版式与导出能力的创作者使用。',
    features: [
      '包含基础版全部功能',
      'AI 辅助文章排版',
      'Plus 高级排版样式与组件',
      '图片与素材排版工具',
      '订阅期内持续更新的会员功能',
    ],
    action: '开始 7 天免费试用',
    href: 'https://inkpai.meyracle.com/pricing?checkout=plus',
    featured: true,
  },
]

export function Pricing() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <header className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:items-end">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-text-muted">
            定价 / Pricing
          </p>
          <div>
            <h1 className="text-balance max-w-3xl text-5xl font-medium leading-none tracking-[-0.05em] text-text-primary sm:text-6xl">
              产品价格与权益
            </h1>
            <p className="text-pretty mt-6 max-w-xl text-base leading-7 text-text-secondary">
              Inkpai 提供免费基础版，以及按年订阅的 Plus。图片书摘免费使用。
            </p>
          </div>
        </header>

        <section aria-labelledby="inkpai-pricing" className="mt-20">
          <div className="fine-rule flex flex-wrap items-end justify-between gap-4 border-t pt-5">
            <div>
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-text-muted">
                微信公众号排版工具
              </p>
              <h2 id="inkpai-pricing" className="mt-4 text-3xl font-medium tracking-[-0.04em] text-text-primary">
                Inkpai
              </h2>
            </div>
            <a
              href="https://inkpai.meyracle.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              打开 Inkpai →
            </a>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {plans.map((plan, index) => (
              <article
                key={plan.name}
                className={`flex min-h-[34rem] flex-col rounded-2xl p-7 sm:p-9 ${
                  plan.featured ? 'bg-ink text-white' : 'bg-surface text-text-primary'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-medium tracking-[-0.02em]">{plan.name}</h3>
                  <span className={`font-mono text-[10px] ${plan.featured ? 'text-white/45' : 'text-text-muted'}`}>
                    0{index + 1}
                  </span>
                </div>
                <div className="mt-12 min-h-40">
                  <p className="font-mono text-4xl font-medium tracking-[-0.05em] sm:text-5xl">{plan.price}</p>
                  <p className={`mt-5 max-w-lg text-sm font-medium leading-6 ${plan.featured ? 'text-white/85' : 'text-text-primary'}`}>
                    {plan.billing}
                  </p>
                  <p className={`mt-5 text-sm leading-6 ${plan.featured ? 'text-white/60' : 'text-text-secondary'}`}>
                    {plan.description}
                  </p>
                </div>
                <ul className={`mt-8 space-y-3 border-t pt-7 text-sm ${
                  plan.featured ? 'border-white/15 text-white/70' : 'border-border text-text-secondary'
                }`}>
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span aria-hidden="true" className={plan.featured ? 'text-signal' : 'text-text-primary'}>
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
                  className={`mt-auto inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-medium transition duration-200 hover:-translate-y-0.5 hover:opacity-85 active:translate-y-0 ${
                    plan.featured
                      ? 'bg-white text-ink'
                      : 'border border-border text-text-primary hover:border-border-strong hover:bg-canvas'
                  }`}
                >
                  {plan.action}
                </a>
              </article>
            ))}
          </div>

          <div className="fine-rule mt-4 grid gap-5 rounded-2xl border p-6 sm:grid-cols-[0.45fr_1.55fr] sm:p-8">
            <h3 className="text-base font-medium text-text-primary">购买与生效</h3>
            <p className="max-w-3xl text-sm leading-7 text-text-secondary">
              点击“开始 7 天免费试用”后，登录或注册 Inkpai 账号并进入 Waffo 结账页。订阅与当前账号绑定。试用结束后按 US$15.00/年自动续费，除非在试用结束或下一次续费前取消。
            </p>
          </div>
        </section>

        <section aria-labelledby="imageexcerpt-pricing" className="fine-rule mt-24 border-t pt-5">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-text-muted">文字成图工具</p>
          <h2 id="imageexcerpt-pricing" className="mt-4 text-3xl font-medium tracking-[-0.04em] text-text-primary">
            图片书摘
          </h2>
          <div className="mt-8 grid overflow-hidden rounded-2xl bg-surface sm:grid-cols-[0.7fr_1.3fr]">
            <div className="document-grid flex min-h-64 items-end p-7 sm:p-9">
              <p className="font-serif text-5xl leading-none text-signal">“</p>
            </div>
            <div className="p-7 sm:p-9">
              <p className="font-mono text-4xl font-medium tracking-[-0.05em] text-text-primary">免费</p>
              <p className="mt-4 text-sm font-medium text-text-primary">无需付款，没有订阅</p>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-text-secondary">
                输入文字，选择样式并保存图片。当前全部功能免费使用。
              </p>
              <a
                href="https://bk.meyracle.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex h-12 items-center rounded-full bg-cta px-6 text-sm font-medium text-cta-text transition duration-200 hover:-translate-y-0.5 hover:opacity-85 active:translate-y-0"
              >
                打开图片书摘
              </a>
            </div>
          </div>
        </section>

        <section className="fine-rule mt-24 border-t pt-8 text-sm leading-7 text-text-secondary">
          <p>
            价格以美元结算。结账前展示应付金额、税费与续费条款。
          </p>
          <p className="mt-3">
            需要协助，请联系{' '}
            <a href={`mailto:${studio.email}`} className="text-text-primary underline underline-offset-4">
              {studio.email}
            </a>
            。购买前请阅读{' '}
            <Link to="/terms" className="text-text-primary underline underline-offset-4">
              服务条款
            </Link>
            。
          </p>
        </section>
      </main>
    </SiteShell>
  )
}

