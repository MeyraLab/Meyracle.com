import { useState } from 'react'
import { ProductCard } from './components/ProductCard'
import { SiteShell } from './components/SiteShell'
import { products } from './data/products'
import { studio } from './data/studio'

function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-16 text-center sm:px-6 sm:pt-24 sm:pb-20">
        <p className="mx-auto inline-flex items-center rounded-full border border-border bg-canvas px-3 py-1 text-[12px] text-text-secondary">
          Vibe Coding · 微信发货
        </p>
        <h1 className="mx-auto mt-8 max-w-3xl text-[2.25rem] font-medium tracking-[-0.05em] text-text-primary sm:text-6xl sm:leading-[1.08]">
          少把周末
          <br />
          花在重复劳动上。
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
          中文指令、项目模板、卡住时能翻的速查。买完发文件，打开就能用。
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#products"
            className="inline-flex h-12 items-center rounded-full bg-cta px-7 text-sm font-medium text-cta-text transition-opacity hover:opacity-80"
          >
            看工具
          </a>
          <a
            href="#faq"
            className="inline-flex h-12 items-center rounded-full border border-border px-7 text-sm font-medium text-text-primary transition-colors hover:border-text-primary"
          >
            怎么买
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28">
        <div className="rounded-[32px] bg-surface p-6 sm:p-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
              给周末写代码的人
            </p>
            <h2 className="mt-3 text-2xl font-medium tracking-tight text-text-primary sm:text-3xl">
              能投入的时间大概就那么几个晚上。
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary">
              最怕的不是不会写，而是开工先配环境、写着写着又在改指令，把晚上一点点耗掉。
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-[20px] bg-canvas p-5 text-left">
              <p className="text-sm font-medium text-text-primary">周五晚上 22:00</p>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                想启动新想法，却不想再花 1 小时配主题和目录。
              </p>
              <p className="mt-4 text-xs text-text-muted">→ Code Flow 模板</p>
            </div>
            <div className="rounded-[20px] bg-canvas p-5 text-left">
              <p className="text-sm font-medium text-text-primary">写功能时</p>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                不想每次重写中文指令，也不想模型吐出「能跑但不是我的代码」。
              </p>
              <p className="mt-4 text-xs text-text-muted">→ Vibe Prompt Kit</p>
            </div>
            <div className="rounded-[20px] bg-canvas p-5 text-left">
              <p className="text-sm font-medium text-text-primary">卡住的时候</p>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                需要一份能翻的中文说法，而不是再去搜英文模板自己翻译。
              </p>
              <p className="mt-4 text-xs text-text-muted">→ AI 编程速查</p>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-2xl font-medium tracking-tight text-text-primary sm:text-3xl">三个小工具</h2>
          <p className="mt-2 text-text-secondary">分别解决：开工摩擦、指令试错、卡住时没现成说法。</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section id="workflow" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-2xl font-medium tracking-tight text-text-primary sm:text-3xl">一个周末的用法</h2>
          <p className="mt-2 text-text-secondary">照着做就行。少把时间花在配环境和重写指令上。</p>
        </div>
        <div className="max-w-2xl space-y-4">
          {[
            {
              n: '1',
              title: '周五晚：15 分钟启动，不配环境',
              body: '用现成脚手架打开项目，确认主题和目录能用，就停。不追求完美结构，只保证明天能写功能。',
              related: '相关：Code Flow 模板 →',
            },
            {
              n: '2',
              title: '周六：写功能时用固定指令，少试错',
              body: '每个任务先选场景（生成 / 重构 / UI / 文档），带上约束再交给模型。避免一轮对话改到面目全非。',
              related: '相关：Vibe Prompt Kit →',
            },
            {
              n: '3',
              title: '卡住时：先查场景指令，再开新对话',
              body: '调试或解释报错时，用速查表里的写法，而不是在同一长对话里反复追问。上下文一长更容易跑偏。',
              related: '相关：AI 编程速查 →',
            },
            {
              n: '4',
              title: '周日：只收尾一件能演示的事',
              body: '周末结束前，保证有一个能打开、能点的结果。比「代码写了很多但什么都演示不了」更重要。',
            },
          ].map((step) => (
            <div key={step.n} className="rounded-[20px] bg-surface p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-canvas text-xs font-medium">
                  {step.n}
                </span>
                <h3 className="text-sm font-medium text-text-primary">{step.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{step.body}</p>
              {step.related ? (
                <a href="#products" className="mt-3 inline-block text-xs text-text-muted hover:text-text-primary">
                  {step.related}
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-medium tracking-tight text-text-primary sm:text-3xl">关于我</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-text-secondary">
            <p>
              我是独立开发者，周末才有整块时间写东西。配环境和反复改指令最耗这点时间。这些工具先给我自己用，也卖给同样赶周末的人。
            </p>
            <p>
              微信 <span className="font-mono font-medium text-text-primary">{studio.wechat}</span>。买完发文件。
            </p>
          </div>
        </div>
      </section>

      <section id="updates" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28">
        <div className="mb-10">
          <h2 className="text-2xl font-medium tracking-tight text-text-primary sm:text-3xl">更新</h2>
          <p className="mt-2 text-text-secondary">
            按产品记录。已购买：标了「需重新下载」的条目，联系我补发最新文件。
          </p>
        </div>
        <div className="max-w-2xl space-y-6">
          <div className="border-l-2 border-border pl-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-sm font-medium text-text-primary">2026.08.16</span>
              <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs text-text-secondary">全站</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              <span className="text-text-primary">网站上线。</span>
              首批可购：Vibe Prompt Kit、Code Flow 模板、AI 编程速查。购买走微信，发货为下载链接。
            </p>
            <p className="mt-1 text-xs text-text-muted">无需重下（首次购买即最新）</p>
          </div>
          <div className="border-l-2 border-border pl-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-sm font-medium text-text-primary">2026.08.16</span>
              <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-text-secondary">
                文案
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              <span className="text-text-primary">详情页与首页：</span>
              补了开箱说明、适用工具和更新方式；首页加了周末开工的三段场景。
            </p>
            <p className="mt-1 text-xs text-text-muted">只改网站展示，不影响已购文件</p>
          </div>
          <div className="border-l-2 border-border pl-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-sm font-medium text-text-primary">2026.08</span>
              <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-text-secondary">
                方向
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              <span className="text-text-primary">给谁用：</span>
              先做中文、周末写代码的人——少配环境，少重写指令。
            </p>
            <p className="mt-1 text-xs text-text-muted">记录，无文件变更</p>
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 sm:pb-32">
        <div className="mb-10">
          <h2 className="text-2xl font-medium tracking-tight text-text-primary sm:text-3xl">常见问题</h2>
          <p className="mt-2 text-text-secondary">购买、发货、怎么用。</p>
        </div>
        <div className="max-w-2xl divide-y divide-border overflow-hidden rounded-[20px] border border-border bg-canvas">
          {[
            {
              q: '怎么买？',
              a: `进产品详情页，点「立即购买」，加微信 ${studio.wechat}，备注产品名称。支持微信支付和支付宝。`,
            },
            {
              q: '买完多久能收到？',
              a: '确认支付后，通常 1–12 小时内通过微信或邮箱发下载链接。多数会更快。',
            },
            {
              q: '能退款吗？',
              a: '数字产品一旦发出下载链接，原则上不退。文件损坏或打不开，及时找我，我补发或帮你处理。',
            },
            {
              q: '以后会更新吗？',
              a: '会。买过的可以拿对应产品的后续更新。大改会通过微信或网站「更新」说一声。',
            },
            {
              q: '适合谁？',
              a: '周末写代码的人、已经在用 Cursor / Claude 想少写指令的人。新手也可以直接上手。',
            },
            {
              q: '可以商用吗？',
              a: '可以用于个人项目和商业项目。不要二次销售，也不要把原文件公开分发。',
            },
          ].map((item, index) => {
            const isOpen = openFaq === index
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-surface"
                >
                  <span className="text-sm font-medium text-text-primary">{item.q}</span>
                  <span className={`shrink-0 text-text-muted transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-200 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm leading-relaxed text-text-secondary">
                      {item.q === '怎么买？' ? (
                        <>
                          进产品详情页，点「立即购买」，加微信{' '}
                          <span className="font-mono font-medium text-text-primary">{studio.wechat}</span>
                          ，备注产品名称。支持微信支付和支付宝。
                        </>
                      ) : (
                        item.a
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </SiteShell>
  )
}

export default App
