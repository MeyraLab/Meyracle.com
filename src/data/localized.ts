import { useMemo } from 'react'
import { useI18n } from '../i18n'
import { offerings, studio, type Offering, type Studio } from './studio'

/** Offerings with their copy in the current language; links and status come from studio.ts. */
export function useOfferings(): Offering[] {
  const { t } = useI18n()
  return useMemo(
    () => offerings.map((item) => ({ ...item, ...t.offerings[item.id as keyof typeof t.offerings] })),
    [t],
  )
}

export function useStudio(): Studio {
  const { t } = useI18n()
  return useMemo(() => ({ ...studio, ...t.studio }), [t])
}
