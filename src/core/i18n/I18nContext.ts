import { createContext } from 'react'
import type { Locale, Messages } from './translations'

export type I18nContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  messages: Messages
  supportedLocales: readonly Locale[]
}

export const I18nContext = createContext<I18nContextValue | null>(null)