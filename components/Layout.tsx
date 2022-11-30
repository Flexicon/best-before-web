import { useSessionContext } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { PropsWithChildren } from 'react'

import AppLoader from './AppLoader'
import Navbar from './Navbar'

const Layout = ({ children }: PropsWithChildren) => {
  const { session, isLoading } = useSessionContext()
  const router = useRouter()

  const shouldRedirectToLogin = router.pathname !== '/login' && !isLoading && !session
  const showLoader = isLoading || shouldRedirectToLogin

  if (shouldRedirectToLogin) {
    router.push('/login')
  }

  return (
    <>
      <AppLoader show={showLoader} />

      <div
        className={`mx-auto w-[1200px] max-w-full transition-opacity duration-700 ${
          showLoader ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <main className="p-6">
          <Navbar />
          {!showLoader && children}
        </main>

        <footer className="p-6 text-center text-xs text-gray-500">Powered by ☕️ and 🍕</footer>
      </div>
    </>
  )
}

export default Layout
