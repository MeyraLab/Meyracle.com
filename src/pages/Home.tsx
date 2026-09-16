import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { SiteShell } from '../components/SiteShell'
import { offerings, plannedNote, studio } from '../data/studio'

function WindowChrome({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[22px] bg-ink p-2 shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
      <div className="mb-2 flex items-center gap-1.5 px-2 pt-1">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
      </div>
      <div className="min-h-[168px]">{children}</div>
    </div>
  )
}

function InkpaiPreview() {
  return (
    <WindowChrome>
      <div className="rounded-xl bg-[#fbfaf6] px-4 py-5 text-left text-ink">
        <p className="text-[10px] tracking-wide text-text-muted">公众号文章</p>
        <p className="mt-2 text-[15px] font-medium">今日推送</p>
        <div className="mt-3 space-y-2">
          <div className="h-1.5 w-full rounded bg-black/10" />
          <div className="h-1.5 w-11/12 rounded bg-black/10" />
          <div className="h-1.5 w-4/5 rounded bg-black/10" />
        </div>
        <p className="mt-4 text-[11px] text-text-muted">复制到后台，格式不乱</p>
      </div>
    </WindowChrome>
  )
}

function ExcerptPreview() {
  return (
    <WindowChrome>
      <div className="rounded-xl bg-[#fff9f5] px-5 py-6 text-left text-ink">
        <p className="font-serif text-[17px] leading-relaxed">
          选一段摘录，
          <br />
          排成一张能发的图。
        </p>
        <p className="mt-5 text-[11px] tracking-wide text-text-muted">图片书摘 · BK</p>
      </div>
    </WindowChrome>
  )
}

function StorePreview() {
  return (
    <WindowChrome>
      <div className="rounded-xl bg-[#141414] px-4 py-4 font-mono text-[11px] leading-6 text-[#d4d4d4]">
        <p className="text-[#8a8a8a]">~/meyracle/store</p>
        <p>vibe-prompt-kit.md</p>
        <p>code-flow/</p>
        <p>ai-cheatsheet.md</p>
        <p className="mt-2 text-white/90">¥29 – ¥79 · 微信发货</p>
      </div>
    </WindowChrome>
  )
}

const previews: Record<string, () => ReactNode> = {
  inkpai: InkpaiPreview,
  imageexcerpt: ExcerptPreview,
  'vibe-coding': StorePreview,
}

export function Home() {
  const apps = offerings.filter((item) => item.appUrl)
  const store = offerings.find((item) => item.storePath)

  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-14 text-center sm:px-6 sm:pt-24 sm:pb-20">
        <p className="mx-auto inline-flex items-center rounded-full border border-border bg-canvas px-3 py-1 text-[12px] text-text-secondary">
          已上线 · Inkpai、图片书摘、Vibe Coding
        </p>
        <h1 className="mx-auto mt-8 max-w-4xl text-[2.5rem] font-medium tracking-[-0.05em] text-text-primary sm:text-6xl sm:leading-[1.08] lg:text-[4.5rem]">
          三个小工具。
          <br />
          打开就能用。
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
          Inkpai 排公众号。图片书摘做成图。
          <br />
          商店卖指令和模板。
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#live"
            className="inline-flex h-12 items-center rounded-full bg-cta px-7 text-sm font-medium text-cta-text transition-opacity hover:opacity-80"
          >
            看产品
          </a>
          <Link
            to="/store"
            className="inline-flex h-12 items-center rounded-full border border-border bg-canvas px-7 text-sm font-medium text-text-primary transition-colors hover:border-text-primary"
          >
            进商店
          </Link>
        </div>
      </section>

      <section id="live" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28">
        <div className="grid gap-4 lg:grid-cols-3">
          {offerings.map((item) => {
            const Preview = previews[item.id]
            const href = item.appUrl ?? item.storePath ?? `/products/${item.slug}`
            const external = Boolean(item.appUrl)
            return (
              <article
                key={item.id}
                className="flex flex-col rounded-[28px] bg-surface p-4 pb-6 sm:p-5"
              >
                <div className="mb-5">{Preview ? <Preview /> : null}</div>
                <p className="px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
                  {item.kicker}
                </p>
                <h2 className="mt-2 px-1 text-xl font-medium tracking-tight">{item.name}</h2>
                <p className="mt-2 flex-1 px-1 text-sm leading-relaxed text-text-secondary">
                  {item.summary}
                </p>
                <div className="mt-5 px-1">
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="inline-flex h-10 items-center rounded-full bg-cta px-4 text-[13px] font-medium text-cta-text transition-opacity hover:opacity-80"
                  >
                    {item.cta}
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28">
        <div className="grid items-center gap-8 rounded-[32px] bg-surface p-6 sm:p-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">入口</p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">从这里进去。</h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-text-secondary">
              排公众号用 Inkpai。书摘成图用图片书摘。买指令和模板进商店。问事加微信{' '}
              <span className="font-mono font-medium text-text-primary">{studio.wechat}</span>。
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              关于 Meyracle →
            </Link>
          </div>
          <div className="overflow-hidden rounded-[24px] bg-peach p-2">
            <div className="rounded-[23px] bg-canvas/70 p-2 backdrop-blur-sm">
              {offerings.map((item) => {
                const href = item.appUrl ?? item.storePath ?? `/products/${item.slug}`
                const external = Boolean(item.appUrl)
                return (
                  <a
                    key={item.id}
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="flex items-center justify-between gap-3 rounded-2xl px-4 py-4 text-sm transition-colors hover:bg-canvas"
                  >
                    <span>
                      <span className="block font-medium">{item.name}</span>
                      <span className="mt-0.5 block text-xs text-text-muted">{item.tagline}</span>
                    </span>
                    <span className="text-xs text-text-muted">{item.cta} →</span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[28px] bg-surface p-8 sm:p-10">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">应用</p>
            <h2 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">现在就能打开。</h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-text-secondary">
              Inkpai 和图片书摘已经在线上。这个站不代替它们，只把你送过去。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {apps.map((item) => (
                <a
                  key={item.id}
                  href={item.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center rounded-full bg-cta px-5 text-sm font-medium text-cta-text transition-opacity hover:opacity-80"
                >
                  {item.cta}
                </a>
              ))}
            </div>
          </div>
          <div className="rounded-[28px] bg-ink p-8 text-white sm:p-10">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">商店</p>
            <h2 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">买一份带走。</h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/65">
              指令、脚手架、速查。微信付款，发文件。
            </p>
            {store ? (
              <Link
                to={store.storePath ?? '/store'}
                className="mt-8 inline-flex h-11 items-center rounded-full bg-white px-5 text-sm font-medium text-ink transition-opacity hover:opacity-80"
              >
                {store.cta}
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 sm:pb-32">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">之后</p>
        <h2 className="mt-3 text-2xl font-medium tracking-tight">{plannedNote.name}</h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-text-secondary">{plannedNote.tagline}</p>
      </section>
    </SiteShell>
  )
}
