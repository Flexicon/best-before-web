import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useRouter } from 'next/router'

export default function Login() {
  const session = useSession()
  const supabase = useSupabaseClient()
  const router = useRouter()

  if (session) {
    router.push('/')
  }

  return (
    <div className="mx-auto w-[500px] max-w-full pt-5">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        redirectTo="/"
        theme="dark"
        magicLink
      />
    </div>
  )
}
