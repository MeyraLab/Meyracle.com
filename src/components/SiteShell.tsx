import type { ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { studio } from '../data/studio'

const nav = [
  { to: '/products', label: '产品' },
  { to: '/store', label: '商店' },
  { to: '/about', label: '关于' },
]

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-canvas text-text-primary">
      <header className="sticky top-0 z-50 border-b border-border bg-canvas/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="text-sm font-medium tracking-tight text-text-primary">
            {studio.name}
          </Link>
          <nav className="flex items-center gap-5 text-sm text-text-secondary">
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
        </div>
      </header>
      {children}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-10 sm:flex-row sm:items-center sm:px-6">
          <div>
            <div className="text-sm font-medium text-text-primary">{studio.name}</div>
            <p className="mt-1 text-sm text-text-muted">{studio.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-text-secondary">
            <Link to="/products" className="hover:text-text-primary">
              产品
            </Link>
            <Link to="/legal/privacy" className="hover:text-text-primary">
              隐私
            </Link>
            <Link to="/legal/terms" className="hover:text-text-primary">
              条款
            </Link>
            <a href={`mailto:${studio.email}`} className="hover:text-text-primary">
              联系
            </a>
          </div>
          <div className="text-sm text-text-muted">© {new Date().getFullYear()} {studio.legalName}</div>
        </div>
      </footer>
    </div>
  )
}
