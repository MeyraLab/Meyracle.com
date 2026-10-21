import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Dictionary, Lang } from './types'
import { zh } from './locales/zh'
import { en } from './locales/en'
import { fr } from './locales/fr'
import { ja } from './locales/ja'
import { ko } from './locales/ko'
import { es } from './locales/es'

export type { Dictionary, Lang } from './types'

export const dictionaries: Record<Lang, Dictionary> = { zh, en, fr, ja, ko, es }

export const LANGUAGES: { code: Lang; label: string }[] = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'es', label: 'Español' },
]

const LANG_STORAGE_KEY = 'meyracle-lang'

function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && value in dictionaries
}

export function getInitialLang(): Lang {
  try {
    const saved = window.localStorage.getItem(LANG_STORAGE_KEY)
    if (isLang(saved)) return saved
  } catch {
    // Storage can be unavailable in privacy-focused browser modes.
  }

  const preferred = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const tag of preferred) {
    const base = tag?.toLowerCase().split('-')[0]
    if (isLang(base)) return base
  }

  return 'zh'
}

export function applyLang(lang: Lang) {
  document.documentElement.lang = dictionaries[lang].htmlLang
}

interface I18nValue {
  lang: Lang
  t: Dictionary
  setLang: (lang: Lang) => void
}

const I18nContext = createContext<I18nValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang)

  useEffect(() => {
    applyLang(lang)
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, next)
    } catch {
      // The language still switches when persistence is unavailable.
    }
  }, [])

  const value = useMemo(() => ({ lang, t: dictionaries[lang], setLang }), [lang, setLang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const value = useContext(I18nContext)
  if (!value) throw new Error('useI18n must be used inside I18nProvider')
  return value
}
