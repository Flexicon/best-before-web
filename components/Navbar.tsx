import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { SlLogout, SlPlus } from 'react-icons/sl'
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
        <div className="flex gap-2">
          <Link href="/product/new" className="button primary flex items-center gap-2">
            <SlPlus />
            <span>Add Product</span>
          </Link>
          <button
            className="button flex items-center gap-2"
            onClick={() => supabase.auth.signOut()}
          >
            <SlLogout />
            <span>Sign Out</span>
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default Navbar
