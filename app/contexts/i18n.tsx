import { createContext, useEffect } from 'react'

export const I18nContext = createContext<string>('en')

export const I18nProvider = ({ children, language }: { children: React.ReactNode, language: string }) => {
  useEffect(() => {
    localStorage.setItem('culture', language)
  }, [language])

  return (
    <I18nContext.Provider value={language}>
      {children}
    </I18nContext.Provider>
  )
}
