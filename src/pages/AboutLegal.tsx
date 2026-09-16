import { SiteShell } from '../components/SiteShell'
import { studio } from '../data/studio'

export function About() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-medium tracking-tight text-text-primary">关于</h1>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-text-secondary">
          <p>
            我是 MEYRA，独立开发者。{studio.name} 是主站：把正在做的产品放在同一品牌下，而不是每个想法一个互不相通的落地页。
          </p>
          <p>
            现在接入 Inkpai（公众号排版）、图片书摘，以及 Vibe Coding 工具商店。之后的商业产品和服务会走同一套 Offering / Order，而不是再复制一套字段。
          </p>
          <p>
            合作或购买：微信 {studio.wechat}，或 {studio.email}。
          </p>
        </div>
      </main>
    </SiteShell>
  )
}

export function Privacy() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-medium tracking-tight">隐私</h1>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-text-secondary">
          <p>本站是静态展示与商店入口。默认不收集账户密码，也不在浏览器里存支付信息。</p>
          <p>Vibe Coding 购买目前通过微信沟通。Inkpai 与图片书摘的运行数据在各自应用域名下（图片书摘现为 bk.meyracle.com），不经过本站表单。</p>
          <p>若以后上线登录或订单，会单独说明收集范围，并只在服务端处理密钥。</p>
          <p>
            联系：<a href={`mailto:${studio.email}`}>{studio.email}</a>
          </p>
        </div>
      </main>
    </SiteShell>
  )
}

export function Terms() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-medium tracking-tight">条款</h1>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-text-secondary">
          <p>数字下载类产品在发送下载链接后原则上不退款；文件损坏可联系补发。</p>
          <p>可用于个人与商业项目，禁止二次销售或公开分发原文件。</p>
          <p>第三方应用（Inkpai、图片书摘）的使用以其应用内说明为准。</p>
        </div>
      </main>
    </SiteShell>
  )
}

export function NotFound() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-2xl px-4 py-24 text-center">
        <p className="text-text-secondary">页面不存在。</p>
      </main>
    </SiteShell>
  )
}
