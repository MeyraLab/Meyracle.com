import { useState, type ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { offerings, studio } from '../data/studio'
import { applyTheme, saveTheme, type Theme } from '../theme'

const nav = [
  { to: '/products', label: '产品' },
  { to: '/pricing', label: '定价' },
  { to: '/about', label: '关于' },
]

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  )

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    applyTheme(nextTheme)
    saveTheme(nextTheme)
    setTheme(nextTheme)
  }

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
          </nav>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-primary md:hidden"
            aria-expanded={open}
            aria-label={open ? '关闭菜单' : '打开菜单'}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? '关闭菜单' : '打开菜单'}</span>
            <span className="flex flex-col items-center justify-center gap-[5px]">
              <span className={`block h-[1.5px] w-[18px] bg-text-primary transition ${open ? 'translate-y-[3.25px] rotate-45' : ''}`} />
              <span className={`block h-[1.5px] w-[18px] bg-text-primary transition ${open ? '-translate-y-[3.25px] -rotate-45' : ''}`} />
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
            </div>
          </div>
        ) : null}
      </header>
      {children}
      <footer className="border-t border-border bg-canvas">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2.35fr)]">
            <div className="flex min-h-64 flex-col border-b border-dotted border-border py-10 lg:min-h-80 lg:border-r lg:border-b-0 lg:py-12 lg:pr-12">
              <div>
                <Link to="/" className="text-sm font-semibold tracking-tight text-text-primary">
                  {studio.name}
                </Link>
                <p className="mt-2 text-[11px] text-text-secondary">MEYRA 做的产品。</p>
                <p className="mt-2 text-[11px] text-text-muted">
                  © {new Date().getFullYear()} {studio.legalName}
                </p>
              </div>

              <div className="mt-auto flex items-center gap-3 pt-16">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-border-strong hover:text-text-primary"
                  aria-label={theme === 'light' ? '切换到暗色主题' : '切换到浅色主题'}
                  aria-pressed={theme === 'dark'}
                  title={theme === 'light' ? '切换到暗色主题' : '切换到浅色主题'}
                >
                  {theme === 'light' ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M20.2 15.3A8.5 8.5 0 0 1 8.7 3.8 8.5 8.5 0 1 0 20.2 15.3Z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.6" />
                      <path
                        d="M12 2.5V5M12 19V21.5M21.5 12H19M5 12H2.5M18.7 5.3 17 7M7 17l-1.7 1.7M18.7 18.7 17 17M7 7 5.3 5.3"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </button>
                <span className="text-[11px] text-text-muted">
                  {theme === 'light' ? '暗色' : '浅色'}
                </span>
              </div>
            </div>

            <nav
              aria-label="页尾导航"
              className="grid grid-cols-2 gap-x-8 gap-y-10 py-10 sm:grid-cols-3 lg:py-12 lg:pl-16"
            >
              <div>
                <p className="text-[11px] font-medium text-text-primary">产品</p>
                <ul className="mt-4 space-y-2 text-[11px] text-text-secondary">
                  {offerings.map((item) => (
                    <li key={item.id}>
                      <Link to={`/products/${item.slug}`} className="transition-colors hover:text-text-primary">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[11px] font-medium text-text-primary">Meyracle</p>
                <ul className="mt-4 space-y-2 text-[11px] text-text-secondary">
                  <li>
                    <Link to="/" className="transition-colors hover:text-text-primary">
                      首页
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="transition-colors hover:text-text-primary">
                      产品
                    </Link>
                  </li>
                  <li>
                    <Link to="/pricing" className="transition-colors hover:text-text-primary">
                      定价
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="transition-colors hover:text-text-primary">
                      关于
                    </Link>
                  </li>
                  <li>
                    <a href={`mailto:${studio.email}`} className="transition-colors hover:text-text-primary">
                      联系
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-[11px] font-medium text-text-primary">法律</p>
                <ul className="mt-4 space-y-2 text-[11px] text-text-secondary">
                  <li>
                    <Link to="/privacy" className="transition-colors hover:text-text-primary">
                      隐私
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" className="transition-colors hover:text-text-primary">
                      条款
                    </Link>
                  </li>
                  <li>
                    <span className="font-mono">{studio.domain}</span>
                  </li>
                  <li>
                    微信 <span className="font-mono">{studio.wechat}</span>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}


