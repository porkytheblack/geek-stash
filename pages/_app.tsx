import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core'
import { rtlCache } from '../utils/rtl-cache'
import { theme } from '../utils/theme'
import { Provider } from 'react-redux'
import store from '../redux/store'
import { IPageProps } from '../types/next-related-extensions'
import Layout from '../layout'

export default function App({ Component, pageProps }: AppProps<IPageProps>) {
  return (
    
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={theme}
        emotionCache={rtlCache}
      >
        <Provider
          store={store}
        >
          <Layout pageProps={pageProps} >
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </MantineProvider>
  )
}
