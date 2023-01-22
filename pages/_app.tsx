import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { rtlCache } from '../utils/rtl-cache'
import { theme } from '../utils/theme'
import { Provider } from 'react-redux'
import store from '../redux/store'
import { IPageProps } from '../types/next-related-extensions'
import Layout from '../layout'
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { Session, SessionContextProvider } from "@supabase/auth-helpers-react"
import { useState } from 'react'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps<IPageProps & {
  initialSession: Session
}>) {

  const [supabase] = useState(()=> createBrowserSupabaseClient())

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={theme}
        emotionCache={rtlCache}
      >
        <ColorSchemeProvider
          colorScheme={"dark"}
          toggleColorScheme={(c)=>{}}
        >
          <Provider
            store={store}
          >
            <Head>
              <title>Geek Stash</title>
              <meta name="description" content="Build a custom api, for your favourite tvshow.Or use, what others have built" />
              <link rel="icon" href="/favicon.ico" />
              
            </Head>
            <Layout pageProps={pageProps} >
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </ColorSchemeProvider>
      </MantineProvider>
    </SessionContextProvider>
  )
}
