import { useState, type ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { offerings, studio } from '../data/studio'

const nav = [
  { to: '/products', label: '产品' },
  { to: '/store', label: '商店' },
  { to: '/about', label: '关于' },
]

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-canvas text-text-primary">
      <header className="sticky top-0 z-50 border-b border-border bg-canvas/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="text-[15px] font-semibold tracking-tight text-text-primary">
            {studio.name}
          </Link>
          <nav className="hidden items-center gap-8 text-[13px] text-text-secondary md:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `transition-colors hover:text-text-primary ${isActive ? 'text-text-primary' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/products"
              className="inline-flex h-9 items-center rounded-full bg-cta px-4 text-[13px] font-medium text-cta-text transition-opacity hover:opacity-80"
            >
              看产品
            </Link>
          </nav>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-primary md:hidden"
            aria-expanded={open}
            aria-label={open ? '关闭菜单' : '打开菜单'}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? '关闭菜单' : '打开菜单'}</span>
            <span className="flex flex-col gap-1.5">
              <span className={`h-px w-4 bg-current transition ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
              <span className={`h-px w-4 bg-current transition ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
        {open ? (
          <div className="border-t border-border px-4 py-4 md:hidden">
            <div className="flex flex-col gap-3 text-sm">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `py-1 ${isActive ? 'text-text-primary' : 'text-text-secondary'}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/products"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex h-10 items-center justify-center rounded-full bg-cta text-sm font-medium text-cta-text"
              >
                看产品
              </Link>
            </div>
          </div>
        ) : null}
      </header>
      {children}
      <footer className="border-t border-border bg-canvas">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-4">
          <div>
            <div className="text-sm font-semibold tracking-tight">{studio.name}</div>
            <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-text-muted">
              {studio.tagline}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-text-muted">产品</p>
            <ul className="mt-4 space-y-2.5 text-sm text-text-secondary">
              {offerings.map((item) => (
                <li key={item.id}>
                  <Link to={`/products/${item.slug}`} className="hover:text-text-primary">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-text-muted">商店</p>
            <ul className="mt-4 space-y-2.5 text-sm text-text-secondary">
              <li>
                <Link to="/store" className="hover:text-text-primary">
                  全部工具
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-text-primary">
                  关于
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-text-muted">法律</p>
            <ul className="mt-4 space-y-2.5 text-sm text-text-secondary">
              <li>
                <Link to="/legal/privacy" className="hover:text-text-primary">
                  隐私
                </Link>
              </li>
              <li>
                <Link to="/legal/terms" className="hover:text-text-primary">
                  条款
                </Link>
              </li>
              <li>
                <a href={`mailto:${studio.email}`} className="hover:text-text-primary">
                  {studio.email}
                </a>
              </li>
              <li>微信 {studio.wechat}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 text-xs text-text-muted sm:px-6">
            <span>© {new Date().getFullYear()} {studio.legalName}</span>
            <span>{studio.domain}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
