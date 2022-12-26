import 'styles/globals.css'
import type { AppProps } from 'next/app'

import Head from 'next/head'
import NProgress from 'nprogress'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Router } from 'next/router'

import Layout from 'components/Layout'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps<{ initialSession: Session }>) {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      NProgress.start()
    })

    Router.events.on('routeChangeComplete', () => {
      NProgress.done()
    })

    Router.events.on('routeChangeError', () => {
      NProgress.done()
    })
  }, [])

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <Head>
        <title>Best Before</title>
        <meta name="description" content="Record your use-by dates for a variety of products" />
        <link rel="icon" href="//fav.farm/🍏" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </SessionContextProvider>
  )
}
