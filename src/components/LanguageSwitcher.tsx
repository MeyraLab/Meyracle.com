import { useEffect, useRef, useState } from 'react'
import { LANGUAGES, useI18n } from '../i18n'

const SHORT: Record<string, string> = { zh: '中', en: 'EN', fr: 'FR', ja: '日', ko: '한', es: 'ES' }

export function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative" data-lang-switcher>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.nav.language}
        onClick={() => setOpen((value) => !value)}
        className={`inline-flex h-9 min-w-9 items-center justify-center px-2 font-serif text-[15px] tracking-[0.04em] transition-colors hover:text-text-primary ${
          open ? 'text-text-primary' : 'text-text-secondary'
        }`}
      >
        {SHORT[lang]}
      </button>
      {open ? (
        <ul
          role="listbox"
          aria-label={t.nav.language}
          className="absolute right-0 top-full z-50 mt-3 w-48 rounded-[20px] bg-surface px-2 py-3 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.45)]"
        >
          {LANGUAGES.map((item) => {
            const active = item.code === lang
            return (
              <li key={item.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  lang={item.code}
                  data-lang={item.code}
                  onClick={() => {
                    setLang(item.code)
                    setOpen(false)
                  }}
                  className={`flex w-full items-baseline justify-between rounded-[14px] px-4 py-2.5 text-left font-serif text-[17px] font-normal transition-colors hover:text-text-primary ${
                    active ? 'text-text-primary' : 'text-text-muted'
                  }`}
                >
                  <span>{item.label}</span>
                  {active ? <span aria-hidden="true" className="h-1 w-1 self-center rounded-full bg-current" /> : null}
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
