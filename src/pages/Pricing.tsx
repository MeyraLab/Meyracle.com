import { Link } from 'react-router-dom'
import { SiteShell } from '../components/SiteShell'
import { studio } from '../data/studio'

const plans = [
  {
    name: 'Inkpai ������',
    price: '���',
    billing: '���踶��',
    description: '��ɹ��ں������Ű�����Ļ������ܡ�',
    features: [
      '���������Ű湤��',
      '8 �׻�������',
      'ͼƬ���������ֻ�Ԥ��',
      'һ�����Ƶ����ں�',
      '���زݸ��Զ�����',
    ],
    action: 'ʹ�û�����',
    href: 'https://inkpai.meyracle.com',
    featured: false,
  },
  {
    name: 'Inkpai Plus',
    price: 'US$15.00',
    billing: '7 ��������á����ý�����ÿ���Զ����ѣ����ڵ�ǰ�Ʒ����ڽ���ǰȡ����',
    description: '����Ҫ�����ʽ�뵼�������Ĵ�����ʹ�á�',
    features: [
      '����������ȫ������',
      'AI ���������Ű�',
      'Plus �߼��Ű���ʽ�����',
      'ͼƬ���ز��Ű湤��',
      '�������ڳ������µĻ�Ա����',
    ],
    action: '��ʼ 7 ���������',
    href: 'https://inkpai.meyracle.com/pricing?checkout=plus',
    featured: true,
  },
]

export function Pricing() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <header className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">����</p>
          <h1 className="mt-4 text-4xl font-medium tracking-[-0.04em] text-text-primary sm:text-5xl">
            ��Ʒ�۸���Ȩ��
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
            Inkpai �ṩ��ѻ����棬�Լ����궩�ĵ� Plus��ͼƬ��ժ���ʹ�á�
          </p>
        </header>

        <section aria-labelledby="inkpai-pricing" className="mt-14">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
                ΢�Ź��ں��Ű湤��
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
              �� Inkpai ��
            </a>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {plans.map((plan) => (
              <article key={plan.name} className="flex h-full flex-col rounded-[28px] bg-surface p-6 sm:p-8">
                <h3 className="text-xl font-medium tracking-tight text-text-primary">{plan.name}</h3>
                <div className="mt-7">
                  <p className="text-4xl font-medium tracking-[-0.04em] text-text-primary">{plan.price}</p>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-text-primary">{plan.billing}</p>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-text-secondary">{plan.description}</p>
                <ul className="mt-7 space-y-3 border-t border-border pt-6 text-sm text-text-secondary">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span aria-hidden="true" className="text-text-primary">
                        ?
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
            <h3 className="text-base font-medium text-text-primary">��������Ч</h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-secondary">
              �������ʼ 7 ��������á��󣬵�¼��ע�� Inkpai �˺Ų����� Waffo ����ҳ�������뵱ǰ�˺Ű󶨡����ý����� US$15.00/���Զ����ѣ����������ý�������һ������ǰȡ����
            </p>
          </div>
        </section>

        <section aria-labelledby="imageexcerpt-pricing" className="mt-16 border-t border-border pt-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">���ֳ�ͼ����</p>
          <h2 id="imageexcerpt-pricing" className="mt-3 text-2xl font-medium tracking-[-0.03em] text-text-primary">
            ͼƬ��ժ
          </h2>
          <div className="mt-6 rounded-[24px] bg-surface p-6 sm:p-8">
            <p className="text-3xl font-medium tracking-[-0.04em] text-text-primary">���</p>
            <p className="mt-3 text-sm font-medium text-text-primary">���踶�û�ж���</p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary">
              �������֣�ѡ����ʽ������ͼƬ����ǰȫ���������ʹ�á�
            </p>
            <a
              href="https://bk.meyracle.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-12 items-center rounded-full bg-cta px-6 text-sm font-medium text-cta-text transition-opacity hover:opacity-80"
            >
              ��ͼƬ��ժ
            </a>
          </div>
        </section>

        <section className="mt-16 border-t border-border pt-10 text-sm leading-relaxed text-text-secondary">
          <p>
            �۸�����Ԫ���㡣����ǰչʾӦ����˰�����������
          </p>
          <p className="mt-3">
            ��ҪЭ��������ϵ{' '}
            <a href={`mailto:${studio.email}`} className="text-text-primary underline underline-offset-4">
              {studio.email}
            </a>
            ������ǰ���Ķ�{' '}
            <Link to="/terms" className="text-text-primary underline underline-offset-4">
              ��������
            </Link>
            ��
          </p>
        </section>
      </main>
    </SiteShell>
  )
}


