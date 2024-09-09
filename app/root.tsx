import {
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from '@remix-run/react'
import './tailwind.css'
import { I18nProvider } from './contexts/i18n'
import { LoaderFunction } from '@remix-run/node'
import { SUPPORTED_LANGUAGES } from './utils/enums'

export const loader: LoaderFunction = ({ params, request }) => {
  const { lang } = params

  const isInSupportedLanguages = Object.values(SUPPORTED_LANGUAGES).includes(lang as SUPPORTED_LANGUAGES)

  if (!lang || !isInSupportedLanguages) {
    const url = new URL(request.url)

    return redirect(`${SUPPORTED_LANGUAGES.EN}${url.pathname}`)
  }

  return { lang }
}

export function Layout ({ children }: { children: React.ReactNode }) {
  const { lang } = useLoaderData<{ lang: SUPPORTED_LANGUAGES }>()

  return (
    <html lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <I18nProvider language={lang}>
          {children}
        </I18nProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App () {
  return <Outlet />
}
