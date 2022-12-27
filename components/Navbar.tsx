import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { SlLogout } from 'react-icons/sl'
import { RiFridgeLine } from 'react-icons/ri'
import Link from 'next/link'

export const Navbar = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div className="mb-5 flex justify-between">
      <Link href="/">
        <h1 className="flex items-center gap-1 text-3xl">
          <RiFridgeLine />
          <span>Best Before</span>
        </h1>
      </Link>

      {session ? (
        <button className="button flex items-center gap-2" onClick={() => supabase.auth.signOut()}>
          <SlLogout />
          <span>Sign Out</span>
        </button>
      ) : null}
    </div>
  )
}

export default Navbar
