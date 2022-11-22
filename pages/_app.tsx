import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'
import { Provider } from 'react-redux'
import { store } from '../store'
import Layout from '../components/layout/Layout'

function MyApp({ 
  Component, 
  pageProps: {session, ...pageProps} 
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout>
          <Component { ...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
