import { useId } from 'react'
import { useI18n } from '../i18n/useI18n'
import type { Locale } from '../i18n/translations'

export function LanguageSwitcher() {
  const id = useId()
  const { locale, setLocale, supportedLocales, messages } = useI18n()

  return (
    <div className="language-switcher">
      <label htmlFor={id}>{messages.language.label}</label>
      <select
        id={id}
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
      >
        {supportedLocales.map((item) => (
          <option key={item} value={item}>
            {messages.language.names[item]}
          </option>
        ))}
      </select>
    </div>
  )
}