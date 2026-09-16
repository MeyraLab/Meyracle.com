import { SiteShell } from '../components/SiteShell'
import { studio } from '../data/studio'

export function About() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">关于</p>
        <h1 className="mt-4 text-4xl font-medium tracking-[-0.04em] text-text-primary sm:text-5xl">
          我是 MEYRA。
        </h1>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-text-secondary">
          <p>
            {studio.name} 是我放产品的地方。现在有 Inkpai、图片书摘，还有一个卖小工具的商店。
          </p>
          <p>
            合作或购买：微信{' '}
            <span className="font-mono font-medium text-text-primary">{studio.wechat}</span>，或{' '}
            <a href={`mailto:${studio.email}`} className="font-mono text-text-primary hover:underline">
              {studio.email}
            </a>
            。
          </p>
        </div>
      </main>
    </SiteShell>
  )
}

export function Privacy() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
        <h1 className="text-4xl font-medium tracking-[-0.04em]">隐私</h1>
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-text-secondary">
          <p>这个站是介绍和商店入口。默认不收集账号密码，也不在浏览器里存支付信息。</p>
          <p>
            Vibe Coding 购买目前通过微信沟通。Inkpai 与图片书摘的使用数据在各自的产品地址下（Inkpai 现在是{' '}
            <span className="font-mono">inkpai.meyracle.com</span>，图片书摘现在是{' '}
            <span className="font-mono">bk.meyracle.com</span>），不经过这个站的表单。
          </p>
          <p>以后如果做登录或订单，会另外说明收集范围，密钥只放在服务端。</p>
          <p>
            联系：
            <a href={`mailto:${studio.email}`} className="font-mono text-text-primary hover:underline">
              {studio.email}
            </a>
          </p>
        </div>
      </main>
    </SiteShell>
  )
}

export function Terms() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
        <h1 className="text-4xl font-medium tracking-[-0.04em]">条款</h1>
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-text-secondary">
          <p>数字下载发出去之后原则上不退。文件损坏可以联系我补发。</p>
          <p>可以用于个人和商业项目。不要二次销售，也不要把原文件公开分发。</p>
          <p>Inkpai、图片书摘的使用，以应用里的说明为准。</p>
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
