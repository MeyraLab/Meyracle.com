import { useState } from 'react'
import { ProductCard } from './components/ProductCard'
import { SiteShell } from './components/SiteShell'
import { products } from './data/products'

function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <SiteShell>
      <nav className="mx-auto flex max-w-6xl gap-5 overflow-x-auto px-4 py-3 text-sm text-text-secondary sm:px-6">
        <a href="#products" className="shrink-0 hover:text-text-primary">
          工具
        </a>
        <a href="#workflow" className="shrink-0 hover:text-text-primary">
          工作流
        </a>
        <a href="#updates" className="shrink-0 hover:text-text-primary">
          更新
        </a>
        <a href="#faq" className="shrink-0 hover:text-text-primary">
          FAQ
        </a>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-20 pb-24 sm:px-6 sm:pt-28 sm:pb-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-medium tracking-tight text-text-primary sm:text-5xl sm:leading-[1.15]">
            少把周末花在重复劳动上
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-text-secondary">
            中文场景的 Prompt、规则片段和脚手架，帮你少配环境、少重写提示词，更快进入写功能的状态。
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#products"
              className="inline-flex h-10 items-center justify-center rounded-full bg-cta px-6 text-sm font-medium text-cta-text transition-opacity hover:opacity-90"
            >
              查看工具
            </a>
            <a
              href="#about"
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              了解我的想法 →
            </a>
          </div>
        </div>
      </section>

      {/* 专为周末独立开发者 */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 sm:pb-32">
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-10">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-accent">专为周末独立开发者</p>
            <h2 className="mt-3 text-2xl font-medium tracking-tight text-text-primary sm:text-3xl">
              你只有周末？那我们就为这个场景做工具。
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary">
              真正能投入的高质量时间只有 8–15 小时。最怕的不是不会写代码，而是启动时配环境、写功能时反复调提示词，把心流一点点耗掉。
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-canvas p-5">
              <p className="text-sm font-medium text-text-primary">周五晚上 22:00</p>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                想启动新想法，却不想再花 1 小时配暗色主题和目录结构。
              </p>
              <p className="mt-4 text-xs text-accent">→ Code Flow 模板</p>
            </div>

            <div className="rounded-xl border border-border bg-canvas p-5">
              <p className="text-sm font-medium text-text-primary">写功能时</p>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                不想每次都重新发明中文提示词，也不想 AI 输出「能跑但不是我的代码」。
              </p>
              <p className="mt-4 text-xs text-accent">→ Vibe Prompt Kit</p>
            </div>

            <div className="rounded-xl border border-border bg-canvas p-5">
              <p className="text-sm font-medium text-text-primary">卡住的时候</p>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                需要一份靠谱的中文指令速查，而不是再去搜英文模板自己翻译。
              </p>
              <p className="mt-4 text-xs text-accent">→ AI 编程速查</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#products"
              className="inline-flex h-10 items-center justify-center rounded-full bg-cta px-6 text-sm font-medium text-cta-text transition-opacity hover:opacity-90"
            >
              查看适合你的工具
            </a>
            <p className="text-sm text-text-muted">
              买完立刻能用，不用再研究一遍。
            </p>
          </div>
        </div>
      </section>

      {/* 产品列表 */}
      <section id="products" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 sm:pb-32">
        <div className="mb-10">
          <h2 className="text-2xl font-medium tracking-tight text-text-primary sm:text-3xl">
            我的工具
          </h2>
          <p className="mt-2 text-text-secondary">
            三个小工具，分别解决：启动摩擦、提示词试错、卡住时没指令。
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 周末工作流 */}
      <section id="workflow" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 sm:pb-32">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-2xl font-medium tracking-tight text-text-primary sm:text-3xl">
            周末独立开发者 AI 工作流
          </h2>
          <p className="mt-2 text-text-secondary">
            一份可直接照着做的节奏。目标不是「更勤奋」，而是少把时间花在重复劳动上。
          </p>
        </div>

        <div className="max-w-2xl space-y-6">
          <div className="rounded-xl border border-border bg-surface p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft text-xs font-medium text-accent">1</span>
              <h3 className="text-sm font-medium text-text-primary">周五晚：15 分钟启动，不配环境</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              用现成脚手架打开项目，确认暗色主题与目录可用，就停。不追求完美结构，只保证明天能写功能。
            </p>
            <a href="#products" className="mt-3 inline-block text-xs text-accent hover:underline">相关：Code Flow 模板 →</a>
          </div>

          <div className="rounded-xl border border-border bg-surface p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft text-xs font-medium text-accent">2</span>
              <h3 className="text-sm font-medium text-text-primary">周六：写功能时用固定 Prompt，少试错</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              每个任务先选场景指令（生成 / 重构 / UI / 文档），带上约束和验收标准再交给 AI。避免一轮对话改到面目全非。
            </p>
            <a href="#products" className="mt-3 inline-block text-xs text-accent hover:underline">相关：Vibe Prompt Kit →</a>
          </div>

          <div className="rounded-xl border border-border bg-surface p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft text-xs font-medium text-accent">3</span>
              <h3 className="text-sm font-medium text-text-primary">卡住时：先查场景指令，再开新对话</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              调试或解释报错时，用速查表里的写法，而不是在同一长对话里反复追问。上下文膨胀会更费 token、更容易跑偏。
            </p>
            <a href="#products" className="mt-3 inline-block text-xs text-accent hover:underline">相关：AI 编程速查 →</a>
          </div>

          <div className="rounded-xl border border-border bg-surface p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft text-xs font-medium text-accent">4</span>
              <h3 className="text-sm font-medium text-text-primary">周日：只收尾一件可演示的事</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              周末结束前，保证有一个能打开、能点的结果（一个页面、一个流程、一份 README）。比「代码写了很多但什么都演示不了」更重要。
            </p>
          </div>
        </div>

        <div className="mt-8">
          <a
            href="#products"
            className="inline-flex h-10 items-center justify-center rounded-full bg-cta px-6 text-sm font-medium text-cta-text transition-opacity hover:opacity-90"
          >
            按这个节奏选工具
          </a>
        </div>
      </section>

      {/* 关于我 */}
      <section id="about" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 sm:pb-32">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-medium tracking-tight text-text-primary sm:text-3xl">
            关于我
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-text-secondary">
            <p>
              我是一名独立开发者，长期关注「写代码时的感觉」。
              很多工具功能很强，但用起来总觉得别扭——提示词生硬、流程割裂、界面没有温度。
            </p>
            <p>
              所以我开始做自己的 vibe coding 工具：
              从真实使用场景出发，把「顺畅」和「有感觉」放在第一位。
              先服务中文开发者，再逐步扩展。
            </p>
            <p>
              这里卖的不是大而全的平台，而是小而准的工具。
              每一个产品都会持续打磨，欢迎反馈。
            </p>
          </div>
        </div>
      </section>

      {/* 更新日志 */}
      <section id="updates" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 sm:pb-32">
        <div className="mb-10">
          <h2 className="text-2xl font-medium tracking-tight text-text-primary sm:text-3xl">
            更新
          </h2>
          <p className="mt-2 text-text-secondary">
            按产品记录。已购买用户：标注「需重新下载」的条目请联系我补发最新文件。
          </p>
        </div>

        <div className="space-y-6 max-w-2xl">
          <div className="border-l-2 border-border pl-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-text-primary">2026.08.16</span>
              <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs text-accent">全站</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              <span className="text-text-primary">网站上线。</span>
              首批可购：Vibe Prompt Kit、Code Flow 模板、AI 编程速查。购买走微信，发货为下载链接。
            </p>
            <p className="mt-1 text-xs text-text-muted">无需重下（首次购买即最新）</p>
          </div>

          <div className="border-l-2 border-border pl-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-text-primary">2026.08.16</span>
              <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-text-secondary">文案 / 结构</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              <span className="text-text-primary">详情页与首页：</span>
              补充开箱说明、适用工具与更新方式；首页增加周末独立开发者场景区块。
            </p>
            <p className="mt-1 text-xs text-text-muted">仅网站展示，不影响已购文件</p>
          </div>

          <div className="border-l-2 border-border pl-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-text-primary">2026.08</span>
              <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-text-secondary">定位</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              <span className="text-text-primary">产品方向：</span>
              中文市场优先，服务周末独立开发者——减少启动摩擦与提示词试错。
            </p>
            <p className="mt-1 text-xs text-text-muted">策略记录，无文件变更</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 sm:pb-32">
        <div className="mb-10">
          <h2 className="text-2xl font-medium tracking-tight text-text-primary sm:text-3xl">
            常见问题
          </h2>
          <p className="mt-2 text-text-secondary">
            关于购买、发货与产品使用的常见疑问。
          </p>
        </div>

        <div className="max-w-2xl divide-y divide-border rounded-xl border border-border bg-surface overflow-hidden">
          {[
            {
              q: '如何购买？',
              a: '进入产品详情页，点击「立即购买」，添加微信号 MEYRA1219，备注产品名称即可。支持微信支付和支付宝。'
            },
            {
              q: '购买后多久能收到？',
              a: '确认支付后，通常在 1–12 小时内通过微信或邮箱发送下载链接。大部分情况会更快处理。'
            },
            {
              q: '支持退款吗？',
              a: '数字产品一旦发送下载链接后原则上不支持退款。如遇文件损坏或无法打开，请及时联系我，我会协助解决或补发。'
            },
            {
              q: '产品会持续更新吗？',
              a: '会。购买后可享受对应产品的后续更新。重大更新会通过微信或网站「更新」区块通知。'
            },
            {
              q: '适合什么人使用？',
              a: '主要面向独立开发者、想提升 AI 编程效率的工程师，以及喜欢暗色界面与简洁工作流的人。新手也能直接上手。'
            },
            {
              q: '可以商用吗？',
              a: '可以用于个人项目和商业项目。禁止二次销售或公开重新分发原文件。具体授权以购买时说明为准。'
            }
          ].map((item, index) => {
            const isOpen = openFaq === index
            return (
              <div key={index}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-surface-elevated"
                >
                  <span className="text-sm font-medium text-text-primary">{item.q}</span>
                  <span
                    className={`shrink-0 text-text-muted transition-transform duration-200 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
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
                      {item.a}
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
