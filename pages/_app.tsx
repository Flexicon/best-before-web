import '../styles/globals.css'
import type { AppProps } from 'next/app'

import Head from 'next/head'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import Layout from '../components/Layout'

export default function App({ Component, pageProps }: AppProps<{ initialSession: Session }>) {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <Head>
        <title>Best Before</title>
        <meta name="description" content="Record your use-by dates for a variety of products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionContextProvider>
  )
}
