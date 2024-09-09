import { I18nContext } from '@/contexts/i18n'
import { NAMESPACES, SUPPORTED_LANGUAGES } from '@/utils/enums'
import { Texts } from '@/utils/types'
import { useContext, useEffect, useState } from 'react'

const textsCache: Record<string, Texts[NAMESPACES]> = {}

interface UseI18nParams<T extends NAMESPACES> {
  ns: T
}

type UseI18nReturn<T extends NAMESPACES> = {
  texts: Texts[T]
  loading: boolean
  language: SUPPORTED_LANGUAGES
}

export default function useI18n<T extends NAMESPACES> ({ ns }: UseI18nParams<T>): UseI18nReturn<T> {
  const language = useContext(I18nContext)
  const [loading, setLoading] = useState<boolean>(true)
  const cacheKey = `${language}-${ns}`
  const [texts, setTexts] = useState<Texts[T] | null>(null)

  useEffect(() => {
    setLoading(true)
    import(`../i18n/${language}/${ns}.ts`)
      .then((module) => {
        textsCache[cacheKey] = module.default
        setTexts(module.default)
      })
      .catch(error => console.error({ error }))
      .finally(() => setLoading(false))
  }, [language, ns])

  return { texts: texts as Texts[T], loading, language: language as SUPPORTED_LANGUAGES }
}
