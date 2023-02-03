import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'

import type { ProductFormValues } from 'components'
import { ProductForm } from 'components'
import { useCallback, useState } from 'react'
import { Database } from 'types'

const NewProductPage = () => {
  const supabase = useSupabaseClient<Database>()
  const router = useRouter()

  const [busy, setBusy] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const onSubmit = useCallback(
    async (form: ProductFormValues) => {
      setBusy(true)
      setFormError(null)
      NProgress.start()

      try {
        const { error } = await supabase.from('products').insert(form)
        if (error) throw new Error(error.message)

        router.push('/')
      } catch (error: any) {
        setFormError(error?.message ?? 'Something went wrong')
        setBusy(false)
      } finally {
        NProgress.done()
      }
    },
    [setBusy, supabase, setFormError, router],
  )

  return (
    <div className="pt-5">
      <div className="card w-[500px] max-w-full">
        <h2 className="mb-6 text-2xl">New Product</h2>

        <ProductForm disabled={busy} error={formError} onSubmit={onSubmit} />
      </div>
    </div>
  )
}

export default NewProductPage
