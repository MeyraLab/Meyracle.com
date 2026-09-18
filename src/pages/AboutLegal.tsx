import type { ReactNode } from 'react'
import { SiteShell } from '../components/SiteShell'
import { studio } from '../data/studio'

const siteUrl = 'https://meyracle.com'

function LegalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="break-words font-medium text-text-primary underline decoration-border-strong underline-offset-4 transition-colors hover:decoration-text-primary"
    >
      {children}
    </a>
  )
}

function LegalPage({
  title,
  eyebrow,
  children,
}: {
  title: string
  eyebrow: string
  children: ReactNode
}) {
  return (
    <SiteShell>
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <article>
          <header className="border-b border-border pb-10 sm:pb-12">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
              {eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-medium tracking-[-0.04em] text-text-primary sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-sm text-text-muted">
              最后更新：<time dateTime="2026-09-17">2026 年 9 月 17 日</time>
            </p>
          </header>
          <div className="mt-10 space-y-10 text-[15px] leading-7 text-text-secondary sm:mt-12 sm:space-y-12 sm:text-base sm:leading-8">
            {children}
          </div>
        </article>
      </main>
    </SiteShell>
  )
}

function LegalSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-medium tracking-[-0.02em] text-text-primary sm:text-2xl">
        {title}
      </h2>
      {children}
    </section>
  )
}

function LegalSubsection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-base font-medium text-text-primary sm:text-lg">{title}</h3>
      {children}
    </div>
  )
}

function LegalList({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-2 pl-5 marker:text-text-muted">{children}</ul>
}

function ContactEmail() {
  return <LegalLink href={`mailto:${studio.email}`}>{studio.email}</LegalLink>
}

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
            {studio.name} 是我放产品的地方。现在有 Inkpai 和图片书摘。
          </p>
          <p>
            联系我：微信{' '}
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

export function Terms() {
  return (
    <LegalPage title="Meyracle 服务条款" eyebrow="服务条款">
      <section className="space-y-4">
        <p>欢迎使用 Meyracle。</p>
        <p>
          Meyracle 是由洪美晨（MEYRA）以个人身份运营的数字产品与在线工具品牌。Meyracle
          网站位于：
        </p>
        <p>
          <LegalLink href={siteUrl}>{siteUrl}</LegalLink>
        </p>
        <p>
          Meyracle
          作为统一入口，可能提供或链接至不同的数字产品、在线工具及数字服务，包括但不限于
          Inkpai（微信公众号排版工具）以及未来推出的软件、模板、数字资源和其他数字产品。
        </p>
        <p>联系邮箱：</p>
        <p>
          <ContactEmail />
        </p>
        <p>
          使用 Meyracle 网站、旗下产品或购买任何数字产品，即表示您已阅读、理解并同意本服务条款。
        </p>
      </section>

      <LegalSection title="1. 服务范围">
        <p>Meyracle 专注于提供数字产品和在线服务，不销售实体商品，不提供实体物流或配送服务。</p>
        <p>目前及未来可能提供的内容包括：</p>
        <LegalList>
          <li>在线软件和创作工具；</li>
          <li>内容编辑、排版及生产力工具；</li>
          <li>AI 辅助功能；</li>
          <li>数字模板、设计资源及其他可下载文件；</li>
          <li>其他由 Meyracle 开发并通过互联网交付的数字产品或服务。</li>
        </LegalList>
        <p>例如，Inkpai 是 Meyracle 旗下用于微信公众号内容排版和创作的在线工具。</p>
        <p>
          不同产品可能具有独立的功能、价格或补充规则。如果具体产品页面与本条款存在针对该产品的特别说明，以该特别说明为准。
        </p>
      </LegalSection>

      <LegalSection title="2. 数字产品与服务交付">
        <p>Meyracle 提供的产品均属于数字产品或数字服务。</p>
        <p>根据具体产品不同，用户可能通过以下方式获得产品：</p>
        <LegalList>
          <li>在线账户或功能访问权限；</li>
          <li>数字文件下载；</li>
          <li>软件功能开通；</li>
          <li>数字内容访问；</li>
          <li>其他电子交付方式。</li>
        </LegalList>
        <p>不存在实物配送。</p>
        <p>对于需要付款的产品，相应数字内容或使用权限通常在付款成功后提供。</p>
      </LegalSection>

      <LegalSection title="3. 账户与使用资格">
        <p>部分产品可能要求用户创建账户。</p>
        <p>用户应提供真实、准确的信息，并妥善保护自己的账户、登录凭据及相关验证信息。</p>
        <p>用户应对通过自己账户进行的活动负责。如发现未经授权的账户使用，请及时联系我们：</p>
        <p>
          <ContactEmail />
        </p>
        <p>如具体服务涉及付费购买，用户应具备依法订立相应交易的资格。</p>
      </LegalSection>

      <LegalSection title="4. 定价与付款">
        <p>Meyracle 的不同产品可能采用不同的商业模式，包括：</p>
        <LegalList>
          <li>免费使用；</li>
          <li>免费基础功能 + 付费高级功能；</li>
          <li>一次性购买；</li>
          <li>月度或年度订阅；</li>
          <li>其他在产品页面明确说明的数字产品收费方式。</li>
        </LegalList>
        <p>具体价格、包含功能及付款周期均以用户购买时的产品页面或结账页面为准。</p>
        <p>付款可能通过第三方支付服务商处理，包括 Waffo Pancake。</p>
        <p>完整银行卡信息由支付服务商处理，Meyracle 不直接存储完整银行卡号码。</p>
        <p>
          如产品采用自动续费订阅，我们将在购买页面明确说明续费周期和价格。用户在订阅前应确认相关信息。
        </p>
      </LegalSection>

      <LegalSection title="5. 取消、退款与数字产品">
        <p>
          由于数字产品通常在购买后立即提供下载、访问权限或数字服务，因此除以下情况外，已完成交付或已开始使用的数字产品通常不支持无理由退款：
        </p>
        <LegalList>
          <li>重复扣款；</li>
          <li>明确的技术错误导致用户无法获得已购买内容；</li>
          <li>Meyracle 无法按约提供已购买服务；</li>
          <li>产品页面另有明确退款承诺；</li>
          <li>适用法律要求必须退款的其他情况。</li>
        </LegalList>
        <p>
          如产品采用订阅模式，用户可按照相应产品提供的取消方式停止后续续费。取消订阅通常不会自动退还当前已经开始的计费周期费用，但用户可在当前周期结束前继续使用已购买权益，除非产品页面另有说明。
        </p>
        <p>如需处理付款、退款或订单问题，请联系：</p>
        <p>
          <ContactEmail />
        </p>
        <p>并尽可能提供订单编号、购买邮箱及相关交易信息。</p>
      </LegalSection>

      <LegalSection title="6. 用户内容">
        <p>部分 Meyracle 产品允许用户输入、上传、编辑或处理自己的文字、图片或其他内容。</p>
        <p>
          除为提供相关服务所必要的有限处理权限外，Meyracle 不因用户使用服务而取得用户原创内容的所有权。
        </p>
        <p>用户应确保其提交的内容具有合法使用权，并自行承担因其内容产生的法律责任。</p>
        <p>不得利用 Meyracle 产品侵犯他人的版权、商标权、隐私权或其他合法权益。</p>
      </LegalSection>

      <LegalSection title="7. AI 功能">
        <p>
          部分 Meyracle 产品可能使用人工智能模型或第三方 AI API
          提供辅助创作、内容处理、生成或分析功能。
        </p>
        <p>
          为完成用户请求，相关输入内容可能需要发送至提供该功能所使用的第三方技术服务商。
        </p>
        <p>AI 输出具有概率性，可能出现错误、不完整、过时或与用户预期不一致的结果。</p>
        <p>用户应对 AI 输出进行独立检查。</p>
        <p>Meyracle 不保证 AI 输出：</p>
        <LegalList>
          <li>完全准确；</li>
          <li>完全符合用户预期；</li>
          <li>适用于特定专业用途；</li>
          <li>不包含任何事实错误。</li>
        </LegalList>
        <p>AI 生成内容不应被直接视为医疗、法律、金融或其他需要专业资质的意见。</p>
      </LegalSection>

      <LegalSection title="8. 知识产权">
        <p>
          Meyracle
          网站、软件界面、代码、设计、原创模板、品牌元素及由 Meyracle
          制作的数字资源，在未特别说明的情况下，其相关知识产权归 Meyracle 或相应权利人所有。
        </p>
        <p>
          购买数字产品通常意味着获得相应产品页面所说明的使用许可，而不是取得该产品本身的知识产权。
        </p>
        <p>除非产品页面明确允许，否则用户不得：</p>
        <LegalList>
          <li>将购买的数字产品再次销售；</li>
          <li>大规模复制并公开分发；</li>
          <li>将付费内容上传至公开下载平台；</li>
          <li>将软件账户或付费权限出售、出租或共享；</li>
          <li>删除版权或来源标识；</li>
          <li>以侵犯 Meyracle 合法权益的方式复制或利用产品。</li>
        </LegalList>
        <p>用户基于 Meyracle 工具自行创作的原创内容，在法律允许范围内仍归用户所有。</p>
      </LegalSection>

      <LegalSection title="9. 禁止行为">
        <p>用户不得利用 Meyracle 产品：</p>
        <LegalList>
          <li>从事违法、欺诈或侵权活动；</li>
          <li>传播恶意软件或实施网络攻击；</li>
          <li>绕过付费、授权、安全或访问限制；</li>
          <li>未经授权爬取、复制或批量提取服务内容；</li>
          <li>干扰产品正常运行；</li>
          <li>冒用其他用户身份；</li>
          <li>二次销售明确禁止转售的数字产品；</li>
          <li>以其他方式违反适用法律或本条款。</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="10. 用户违约、暂停与终止">
        <p>如果用户违反本条款，包括但不限于：</p>
        <LegalList>
          <li>二次销售禁止转售的数字产品；</li>
          <li>公开传播付费资源；</li>
          <li>侵犯知识产权；</li>
          <li>绕过付款或访问控制；</li>
          <li>欺诈支付；</li>
          <li>滥用服务；</li>
          <li>严重干扰服务运行；</li>
        </LegalList>
        <p>Meyracle 有权根据问题严重程度采取一项或多项措施：</p>
        <LegalList>
          <li>提醒并要求停止违规行为；</li>
          <li>限制部分功能；</li>
          <li>暂停账户；</li>
          <li>终止账户或服务访问权限；</li>
          <li>取消相关订单或授权；</li>
          <li>在法律允许范围内拒绝向严重违规账户继续提供服务；</li>
          <li>在必要时向相关平台、支付机构或主管机关提供依法需要的信息。</li>
        </LegalList>
        <p>
          如账户因用户严重违反本条款而被终止，除适用法律另有强制要求外，已使用或已交付的数字服务费用原则上不予退款。
        </p>
        <p>用户也可以停止使用服务，并可按照隐私政策申请删除个人账户及相关个人信息。</p>
      </LegalSection>

      <LegalSection title="11. 第三方服务">
        <p>Meyracle 的产品可能依赖第三方技术服务，包括但不限于：</p>
        <LegalList>
          <li>支付服务；</li>
          <li>云计算及数据库服务；</li>
          <li>网络及安全基础设施；</li>
          <li>AI 模型或 API；</li>
          <li>身份验证服务；</li>
          <li>分析、错误监控或邮件服务。</li>
        </LegalList>
        <p>第三方服务可能具有独立的服务条款和隐私政策。</p>
        <p>
          由于第三方平台故障、接口变化、网络中断或其他 Meyracle
          无法合理控制的原因，部分功能可能暂时受到影响。
        </p>
      </LegalSection>

      <LegalSection title="12. 免责声明">
        <p>Meyracle 的产品和服务按照“现状”和“可用状态”提供。</p>
        <p>在适用法律允许的最大范围内，我们不作任何未明确写明的保证，包括但不限于对以下事项的保证：</p>
        <LegalList>
          <li>服务始终不中断；</li>
          <li>服务完全没有错误；</li>
          <li>产品适用于用户的所有特定用途；</li>
          <li>AI 或自动化结果完全准确；</li>
          <li>使用产品一定能够产生特定商业、创作、收入或其他结果。</li>
        </LegalList>
        <p>用户应根据自己的需求判断产品是否适合，并对使用产品后作出的决定负责。</p>
        <p>互联网服务本身可能受到网络、设备、第三方平台、浏览器兼容性及其他技术因素影响。</p>
      </LegalSection>

      <LegalSection title="13. 责任限制">
        <p>
          在适用法律允许的最大范围内，Meyracle
          不对因使用或无法使用产品而产生的间接、附带、特殊或后果性损失承担责任，包括但不限于：
        </p>
        <LegalList>
          <li>数据损失；</li>
          <li>利润或收入损失；</li>
          <li>商业机会损失；</li>
          <li>第三方服务中断造成的损失；</li>
          <li>因用户未检查自动生成结果而产生的损失。</li>
        </LegalList>
        <p>
          对于与某项付费产品直接相关的索赔，在法律允许范围内，Meyracle
          承担的累计责任原则上不超过用户就引发该争议的具体产品实际支付的金额。
        </p>
        <p>本条款不排除适用法律规定不得排除或限制的责任。</p>
        <p>Waffo 官方模板同样要求数字服务明确“按现状提供”，并要求对间接和后果性损害设置责任限制。</p>
      </LegalSection>

      <LegalSection title="14. 服务变更与停止">
        <p>
          由于 Meyracle 属于持续开发中的独立数字产品项目，我们可能根据用户需求、技术条件或业务发展：
        </p>
        <LegalList>
          <li>增加或删除功能；</li>
          <li>修改产品界面；</li>
          <li>调整价格；</li>
          <li>更换技术供应商；</li>
          <li>停止维护部分旧产品；</li>
          <li>推出新的产品或服务。</li>
        </LegalList>
        <p>对于已经付费购买并且受变更明显影响的用户，我们会在合理情况下提供必要说明或处理方案。</p>
      </LegalSection>

      <LegalSection title="15. 隐私">
        <p>Meyracle 对个人信息的处理受《隐私政策》约束：</p>
        <p>
          <LegalLink href={`${siteUrl}/privacy`}>{siteUrl}/privacy</LegalLink>
        </p>
      </LegalSection>

      <LegalSection title="16. 条款更新">
        <p>随着产品和业务发展，我们可能修改本条款。</p>
        <p>重大变化将在合理情况下通过网站公告、产品内通知或用户提供的电子邮件通知。</p>
        <p>更新后的条款将在本页面注明新的更新时间。</p>
      </LegalSection>

      <LegalSection title="17. 联系方式">
        <p>Meyracle / MEYRA</p>
        <p>网站：</p>
        <p>
          <LegalLink href={siteUrl}>{siteUrl}</LegalLink>
        </p>
        <p>邮箱：</p>
        <p>
          <ContactEmail />
        </p>
      </LegalSection>
    </LegalPage>
  )
}

export function Privacy() {
  return (
    <LegalPage title="Meyracle 隐私政策" eyebrow="隐私政策">
      <section className="space-y-4">
        <p>Meyracle 尊重并保护用户的个人信息。</p>
        <p>
          本隐私政策适用于 Meyracle 主站及由 Meyracle
          提供或链接的数字产品和在线服务，包括 Inkpai 等产品。
        </p>
        <p>Meyracle 由洪美晨（MEYRA）以个人身份运营。</p>
        <p>网站：</p>
        <p>
          <LegalLink href={siteUrl}>{siteUrl}</LegalLink>
        </p>
        <p>隐私相关问题可联系：</p>
        <p>
          <ContactEmail />
        </p>
        <p>
          本政策说明我们收集哪些信息、为什么收集、如何使用和共享，以及您如何查阅、更正或删除自己的个人数据。
        </p>
      </section>

      <LegalSection title="1. 我们收集哪些信息">
        <p>我们只收集提供和维护产品所合理需要的信息。</p>
        <p>根据您实际使用的产品和功能，可能包括以下类别。</p>

        <LegalSubsection title="1.1 账户信息">
          <p>如果某项产品要求注册账户，我们可能收集：</p>
          <LegalList>
            <li>电子邮箱；</li>
            <li>用户名或显示名称；</li>
            <li>用户 ID；</li>
            <li>登录及身份验证相关信息；</li>
            <li>账号状态和设置。</li>
          </LegalList>
          <p>如密码由身份验证服务处理，我们不会以明文方式存储用户密码。</p>
        </LegalSubsection>

        <LegalSubsection title="1.2 订单和付款相关信息">
          <p>当您购买数字产品或服务时，我们可能收到或保存：</p>
          <LegalList>
            <li>订单编号；</li>
            <li>购买产品或方案；</li>
            <li>交易金额；</li>
            <li>币种；</li>
            <li>支付时间；</li>
            <li>支付状态；</li>
            <li>退款状态；</li>
            <li>用于订单确认的电子邮箱；</li>
            <li>支付服务商向我们返回的必要交易标识信息。</li>
          </LegalList>
          <p>银行卡号、银行卡安全码等完整支付凭证由支付服务商处理。</p>
          <p>Meyracle 不直接存储完整银行卡信息。</p>
          <p>
            付款可能由 Waffo Pancake
            等支付服务商处理。Waffo
            官方隐私模板也要求商户明确说明完整支付卡数据由支付处理方处理，而不保存在商户服务器中。
          </p>
          <p>
            如果未来某种付款方式通过微信或其他第三方账号完成，我们仅会处理完成订单和确认付款所必要的信息。具体信息取决于支付服务商实际向我们提供的数据。
          </p>
          <p>我们不会仅因为用户通过微信支付，就默认收集用户完整微信账户资料。</p>
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="2. 用户主动提供的信息">
        <p>当您主动联系我们、反馈问题、提交申请或参与产品测试时，我们可能收到：</p>
        <LegalList>
          <li>邮件地址；</li>
          <li>邮件和客服沟通内容；</li>
          <li>用户反馈；</li>
          <li>用户主动提交的截图或文件；</li>
          <li>用户主动提供的订单相关信息。</li>
        </LegalList>
        <p>我们只将这些信息用于解决用户提出的问题及改善相关服务。</p>
      </LegalSection>

      <LegalSection title="3. 技术和使用数据">
        <p>为保证网站和软件正常运行，我们或相关基础设施服务商可能自动处理：</p>
        <LegalList>
          <li>IP 地址；</li>
          <li>浏览器类型；</li>
          <li>操作系统；</li>
          <li>设备类型；</li>
          <li>请求时间；</li>
          <li>页面或功能访问记录；</li>
          <li>错误日志；</li>
          <li>性能及安全日志。</li>
        </LegalList>
        <p>这些信息主要用于：</p>
        <LegalList>
          <li>服务运行；</li>
          <li>故障排查；</li>
          <li>防止滥用；</li>
          <li>网络安全；</li>
          <li>产品性能优化。</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="4. 用户内容">
        <p>部分 Meyracle 产品可能允许用户上传、输入或编辑：</p>
        <LegalList>
          <li>文字；</li>
          <li>图片；</li>
          <li>文档；</li>
          <li>排版内容；</li>
          <li>提示词；</li>
          <li>其他用户主动提交的内容。</li>
        </LegalList>
        <p>我们仅在提供相关功能所必要的范围内处理这些内容。</p>
        <p>
          如果某项功能使用第三方 AI 模型或 API，完成用户请求所必要的内容可能被发送给对应服务提供商进行处理。
        </p>
        <p>Meyracle 不会仅因为用户使用产品，就取得用户原创内容的所有权。</p>
      </LegalSection>

      <LegalSection title="5. 我们如何使用个人信息">
        <p>我们可能基于以下目的使用相关信息：</p>
        <LegalList>
          <li>创建和维护账户；</li>
          <li>提供数字产品和软件服务；</li>
          <li>完成订单和付款确认；</li>
          <li>向用户提供已购买功能或数字内容；</li>
          <li>处理退款和付款争议；</li>
          <li>回复客服和技术支持请求；</li>
          <li>防止欺诈和恶意使用；</li>
          <li>维护系统安全；</li>
          <li>排查错误和改进产品；</li>
          <li>履行法律、税务、支付及监管要求；</li>
          <li>通知服务、安全或政策的重要变化。</li>
        </LegalList>
        <p>如果未来发送营销邮件，我们将在适用情况下提供退订方式。</p>
      </LegalSection>

      <LegalSection title="6. Cookie 与本地存储">
        <p>网站或产品可能使用 Cookie、本地存储或类似技术，用于：</p>
        <LegalList>
          <li>保持登录状态；</li>
          <li>保存用户设置；</li>
          <li>提供必要的网站功能；</li>
          <li>防止安全风险；</li>
          <li>分析匿名或汇总的产品使用情况。</li>
        </LegalList>
        <p>
          如果未来引入非必要的广告或营销追踪技术，我们会根据适用要求提供相应说明或选择机制。
        </p>
      </LegalSection>

      <LegalSection title="7. 第三方共享与服务提供商">
        <p>Meyracle 不出售用户个人信息。</p>
        <p>我们仅在提供服务所必要的范围内，与相关第三方服务提供商处理或共享信息。</p>
        <p>目前或不同产品可能涉及：</p>

        <LegalSubsection title="Waffo Pancake">
          <p>用于付款处理、订单和相关支付服务。</p>
          <p>完整银行卡数据由支付服务商处理，不存储于 Meyracle 服务器。</p>
        </LegalSubsection>

        <LegalSubsection title="云计算、数据库及身份验证服务">
          <p>例如用于保存用户账户数据、产品数据、身份验证和软件运行。</p>
        </LegalSubsection>

        <LegalSubsection title="网络与安全基础设施">
          <p>例如用于网站访问、网络加速、安全保护或后端功能。</p>
          <p>部分产品可能使用 Cloudflare 等基础设施。</p>
        </LegalSubsection>

        <LegalSubsection title="AI 模型和 API 服务商">
          <p>
            当用户主动使用 AI 功能时，为生成相应结果，完成请求所必要的输入可能被发送给相应 AI 服务商。
          </p>
          <p>不同产品实际使用的 AI 服务商可能发生变化。</p>
        </LegalSubsection>

        <LegalSubsection title="其他必要技术服务">
          <p>
            例如邮件发送、错误监控或产品分析服务，但只会在实际启用相应功能时处理必要数据。
          </p>
        </LegalSubsection>

        <p>除此之外，我们可能在以下情况下披露必要信息：</p>
        <LegalList>
          <li>根据法律、法院或主管机关要求；</li>
          <li>为调查欺诈、安全事件或违法行为；</li>
          <li>为保护用户、Meyracle 或第三方的合法权益；</li>
          <li>在获得用户明确授权的其他情况下。</li>
        </LegalList>
        <p>
          Waffo
          的审核要求明确要求商户说明是否出售个人信息，并披露支付、云服务、分析等第三方服务商的数据处理情况。
        </p>
      </LegalSection>

      <LegalSection title="8. 我们不会出售个人信息">
        <p>Meyracle 不以出售个人资料作为商业模式。</p>
        <p>我们不会将用户的个人信息出售给广告商或数据经纪商。</p>
      </LegalSection>

      <LegalSection title="9. 数据保存期限">
        <p>我们只在实现相应目的和满足适用法律要求所需要的时间内保存数据。</p>
        <p>通常情况下：</p>
        <LegalList>
          <li>账户信息：账号存续期间保存；收到有效注销或删除申请后，在合理期限内删除或匿名化；</li>
          <li>订单及交易记录：根据付款、会计、税务、反欺诈或法律义务在必要期限内保存；</li>
          <li>客服记录：通常在问题解决后的合理期限内保存，用于后续查询和争议处理；</li>
          <li>安全及技术日志：在排查故障、安全事件及防止滥用所必要的期限内保存；</li>
          <li>用户主动删除的内容：在系统正常备份和技术处理周期结束后逐步清除。</li>
        </LegalList>
        <p>
          如果法律要求继续保存某些订单或交易记录，即使用户注销账户，我们仍可能依法保留该部分必要记录，但不会继续用于与该法定义务无关的目的。
        </p>
        <p>Waffo 官方检查特别要求商户说明数据保留期限，而不能只写“按需要保存”。</p>
      </LegalSection>

      <LegalSection title="10. 您的数据权利">
        <p>根据适用于您的法律，您可以就自己的个人信息提出以下请求：</p>
        <LegalList>
          <li>查阅：了解我们保存了哪些与您有关的信息；</li>
          <li>获取副本：请求获得您的个人数据副本；</li>
          <li>更正：要求修改错误或不完整的数据；</li>
          <li>删除：在法律允许的情况下要求删除个人数据；</li>
          <li>注销账户：要求关闭 Meyracle 或相关产品账户；</li>
          <li>限制处理：在适用情况下要求限制某些数据处理；</li>
          <li>反对处理：反对某些基于合法利益或营销目的的数据处理；</li>
          <li>撤回同意：对于依赖用户同意进行的数据处理，用户可以撤回同意；</li>
          <li>数据可携带：在适用法律要求的情况下，以常用机器可读格式获取相关数据。</li>
        </LegalList>
        <p>如需行使上述权利，请发送邮件至：</p>
        <p>
          <ContactEmail />
        </p>
        <p>请说明：</p>
        <LegalList>
          <li>您使用的产品；</li>
          <li>对应账户邮箱；</li>
          <li>您希望执行的操作。</li>
        </LegalList>
        <p>我们可能需要进行合理的身份验证，以防止其他人未经授权删除或取得您的数据。</p>
        <p>
          我们通常会在 30
          个日历日内回应有效的数据权利请求；如因请求复杂或适用法律允许需要延长处理时间，我们会告知用户。
        </p>
        <p>
          Waffo
          官方隐私检查也要求提供访问、更正、删除、限制处理、数据可携带、反对及撤回同意等权利，并提供实际的行使方式。
        </p>
      </LegalSection>

      <LegalSection title="11. 如何注销账户">
        <p>如果对应产品已经提供账户内注销功能，可直接通过产品中的相关入口操作。</p>
        <p>如果暂时没有自助注销入口，可发送邮件至：</p>
        <p>
          <ContactEmail />
        </p>
        <p>邮件主题可注明：</p>
        <p>注销账户 / Delete My Account</p>
        <p>
          我们确认账户归属后，会按照适用法律和必要的交易记录保存要求处理账户及个人数据。
        </p>
      </LegalSection>

      <LegalSection title="12. 数据安全">
        <p>我们根据产品当前规模采取合理的技术和管理措施保护数据，包括：</p>
        <LegalList>
          <li>HTTPS 加密传输；</li>
          <li>权限控制；</li>
          <li>使用可信的云基础设施；</li>
          <li>身份验证机制；</li>
          <li>数据库访问限制；</li>
          <li>安全日志和异常排查。</li>
        </LegalList>
        <p>
          但互联网传输和电子存储无法保证绝对安全，因此我们不能承诺任何系统在所有情况下完全不存在安全风险。
        </p>
      </LegalSection>

      <LegalSection title="13. 跨境处理">
        <p>
          由于互联网软件使用的云服务、支付服务或 AI
          服务商可能位于不同国家或地区，用户数据可能在用户所在地以外的服务器或基础设施上进行处理。
        </p>
        <p>
          我们会尽量选择具有合理安全和隐私保护措施的服务商，并将处理范围限制在提供产品所必要的程度。
        </p>
      </LegalSection>

      <LegalSection title="14. 未成年人">
        <p>Meyracle 的付费数字产品和商业服务主要面向具有独立民事行为和支付能力的用户。</p>
        <p>我们不会主动以收集儿童个人信息为目的提供服务。</p>
        <p>如监护人认为未成年人未经适当授权向我们提供个人信息，可以联系我们：</p>
        <p>
          <ContactEmail />
        </p>
        <p>我们将在核实后依法处理。</p>
      </LegalSection>

      <LegalSection title="15. 第三方网站">
        <p>Meyracle 可能链接至第三方网站或服务。</p>
        <p>这些第三方具有独立的隐私政策，Meyracle 无法控制第三方如何处理用户数据。</p>
        <p>建议用户在使用相应服务前阅读其隐私政策。</p>
      </LegalSection>

      <LegalSection title="16. 隐私政策更新">
        <p>随着 Meyracle 推出新产品或调整技术架构，我们可能更新本隐私政策。</p>
        <p>重大变更将在合理情况下通过网站公告、产品内通知或电子邮件进行说明。</p>
        <p>页面顶部的“最后更新”日期将同步修改。</p>
      </LegalSection>

      <LegalSection title="17. 联系我们">
        <p>关于隐私、账户、订单或数据删除问题，请联系：</p>
        <p>Meyracle / MEYRA</p>
        <p>
          <LegalLink href={siteUrl}>{siteUrl}</LegalLink>
        </p>
        <p>
          <ContactEmail />
        </p>
      </LegalSection>
    </LegalPage>
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

