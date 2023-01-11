import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core'
import { rtlCache } from '../utils/rtl-cache'
import { theme } from '../utils/theme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div dir="ltr" style={{
      width: "100vw",
      minHeight: "100vh",
      padding: 0,
      margin: 0
    }} >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={theme}
        emotionCache={rtlCache}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </div>
  )
}
