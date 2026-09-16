export type Theme = 'light' | 'dark'

const THEME_STORAGE_KEY = 'meyracle-theme'

export function getInitialTheme(): Theme {
  try {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme
    }
  } catch {
    // Storage can be unavailable in privacy-focused browser modes.
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
}

export function saveTheme(theme: Theme) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // The visual theme still works when persistence is unavailable.
  }
}
