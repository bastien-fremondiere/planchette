import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { isLocale, supportedLocales, translations, type Locale } from './translations'
import { I18nContext, type I18nContextValue } from './I18nContext'

const LOCALE_STORAGE_KEY = 'planchette.locale'

type I18nProviderProps = {
  children: ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [locale, setLocale] = useState<Locale>(resolveInitialLocale())

  useEffect(() => {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale)
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo<I18nContextValue>(() => {
    return {
      locale,
      setLocale,
      messages: translations[locale],
      supportedLocales,
    }
  }, [locale])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

function resolveInitialLocale(): Locale {
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY)

  if (stored && isLocale(stored)) {
    return stored
  }

  for (const language of navigator.languages) {
    const root = language.toLowerCase().split('-')[0]

    if (isLocale(root)) {
      return root
    }
  }

  return 'en'
}