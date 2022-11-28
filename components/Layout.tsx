import { useSessionContext } from '@supabase/auth-helpers-react'
import type { PropsWithChildren } from 'react'
import React from 'react'

import Loader from './Loader'
import Navbar from './Navbar'

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const { isLoading } = useSessionContext()

  return (
    <div className="mx-auto w-[1200px] max-w-full">
      <main className="p-6">
        <Navbar />
        {isLoading ? <Loader /> : children}
      </main>

      <footer className="p-6 text-center text-xs text-gray-500">Powered by ☕️ and 🍕</footer>
    </div>
  )
}

export default Layout
