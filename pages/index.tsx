import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { SlLogout } from 'react-icons/sl'
import { RiFridgeLine } from 'react-icons/ri'

export default function Home() {
  const session = useSession()
  const supabase = useSupabaseClient()

  return !session ? (
    <div className="mx-auto w-[500px] max-w-full">
      <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" magicLink />
    </div>
  ) : (
    <div className="mx-auto w-[1200px] max-w-full">
      <main className="p-6">
        <div className="mb-5 flex justify-between">
          <h1 className="text-3xl flex items-center gap-1">
            <RiFridgeLine />
            <span>Best Before</span>
          </h1>

          <button
            className="button flex items-center gap-2"
            onClick={() => supabase.auth.signOut()}
          >
            <SlLogout />
            <span>Sign Out</span>
          </button>
        </div>

        <p>Some Hipster Ipsum:</p>

        <blockquote className="px-6 py-3 font-serif italic">
          Flannel pour-over chicharrones food truck iPhone la croix messenger bag slow-carb mukbang
          intelligentsia artisan pop-up authentic celiac air plant. I&apos;m baby kogi neutra health
          goth put a bird on it, distillery man braid actually shabby chic. Fam pork belly kinfolk
          palo santo street art twee iPhone. Iceland normcore retro vibecession. Sustainable retro
          cornhole, ethical man bun twee knausgaard post-ironic edison bulb craft beer polaroid blue
          bottle synth mlkshk. Ennui tonx bespoke cardigan subway tile pop-up pok pok squid.
        </blockquote>
      </main>

      <footer className="p-6 text-center text-xs text-gray-500">Powered by ☕️ and 🍕</footer>
    </div>
  )
}
