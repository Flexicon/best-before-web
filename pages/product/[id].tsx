import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { useCallback, useState } from 'react'

import { ProductForm, ProductFormValues } from 'components'
import { Database, Product } from 'types'

interface PropsError {
  isError: true
  product: null
}

interface PropsSuccess {
  isError: false
  product: Product
}

type Props = PropsError | PropsSuccess

const ProductPage = ({ product, isError }: Props) => {
  const supabase = useSupabaseClient<Database>()
  const router = useRouter()

  const [busy, setBusy] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const hasFormError = !busy && !!formError

  const onSubmit = useCallback(
    async (form: ProductFormValues) => {
      if (!product) return

      const { name, expiry_date, icon } = form
      setBusy(true)
      setFormError(null)
      NProgress.start()

      try {
        const { error } = await supabase
          .from('products')
          .update({ name, expiry_date, icon })
          .eq('id', product.id)

        if (error) setFormError(error.message)
      } catch (error: any) {
        setFormError(error?.message ?? 'Something went wrong')
      } finally {
        setBusy(false)
        NProgress.done()
      }
    },
    [product, supabase],
  )

  const onDelete = useCallback(async () => {
    if (!product) return
    setBusy(true)
    setFormError(null)
    NProgress.start()

    try {
      const { error } = await supabase.from('products').delete().eq('id', product.id)

      if (error) {
        setFormError(error.message)
      } else {
        router.push('/')
      }
    } catch (error: any) {
      setFormError(error?.message ?? 'Something went wrong')
    } finally {
      setBusy(false)
      NProgress.done()
    }
  }, [supabase, product, router])

  if (isError) return <div className="pt-5">Something went wrong.</div>

  return (
    <div className="pt-5">
      <h2 className="mb-6 text-2xl">Product #{product.id}</h2>

      <ProductForm product={product} disabled={busy} onSubmit={onSubmit} onDelete={onDelete} />

      {hasFormError && (
        <p className="pt-4 text-sm italic text-red-500">Failed to update product: {formError}</p>
      )}

      {/* TODO: remove when appropriate 🤷‍♂️ */}
      <hr className="my-10" />
      <div className="font-mono">
        <p>TODO:</p>
        <ul className="list-inside list-disc">
          <li className="line-through">submission to api</li>
          <li>validation</li>
          <li className="line-through">loading states</li>
          <li className="line-through">date picker</li>
          <li>icons select</li>
        </ul>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient<Database>(ctx)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session)
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }

  const id = ctx.params?.id as string
  if (!id || !parseInt(id))
    return {
      notFound: true,
    }

  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .limit(1)

  if (error) return { props: { isError: true, product: null } }

  if (products.length === 0)
    return {
      notFound: true,
    }

  return {
    props: { isError: false, product: products[0] },
  }
}

export default ProductPage
