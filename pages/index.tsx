import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Home() {
  const { session, isLoading } = useSessionContext()
  const supabase = useSupabaseClient()

  if (!session) {
    return isLoading ? (
      <div>Loading...</div>
    ) : (
      <div className="mx-auto w-[500px] max-w-full">
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" magicLink />
      </div>
    )
  }

  return (
    <>
      <p>Some Hipster Ipsum:</p>

      <blockquote className="px-6 py-3 font-serif italic">
        Flannel pour-over chicharrones food truck iPhone la croix messenger bag slow-carb mukbang
        intelligentsia artisan pop-up authentic celiac air plant. I&apos;m baby kogi neutra health
        goth put a bird on it, distillery man braid actually shabby chic. Fam pork belly kinfolk
        palo santo street art twee iPhone. Iceland normcore retro vibecession. Sustainable retro
        cornhole, ethical man bun twee knausgaard post-ironic edison bulb craft beer polaroid blue
        bottle synth mlkshk. Ennui tonx bespoke cardigan subway tile pop-up pok pok squid.
      </blockquote>
    </>
  )
}
