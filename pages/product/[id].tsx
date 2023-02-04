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

  const handlePersist = useCallback(
    async (persistFn: () => Promise<any>) => {
      setBusy(true)
      setFormError(null)
      NProgress.start()

      try {
        await persistFn()
        router.push('/')
      } catch (error: any) {
        setFormError(error?.message ?? 'Something went wrong')
        setBusy(false)
      } finally {
        NProgress.done()
      }
    },
    [router],
  )

  const onSubmit = useCallback(
    async (form: ProductFormValues) => {
      if (!product) return

      await handlePersist(async () => {
        const { name, expiry_date, icon } = form
        const { error } = await supabase
          .from('products')
          .update({ name, expiry_date, icon })
          .eq('id', product.id)

        if (error) throw new Error(error.message)
      })
    },
    [product, supabase, handlePersist],
  )

  const onDelete = useCallback(async () => {
    if (!product) return

    await handlePersist(async () => {
      const { error } = await supabase.from('products').delete().eq('id', product.id)

      if (error) throw new Error(error.message)
    })
  }, [supabase, product, handlePersist])

  if (isError) return <div className="pt-5">Something went wrong.</div>

  return (
    <div className="pt-5">
      <div className="card w-[500px] max-w-full">
        <h2 className="mb-6 text-2xl">Edit Product #{product.id}</h2>

        <ProductForm
          product={product}
          disabled={busy}
          error={formError}
          onSubmit={onSubmit}
          onDelete={onDelete}
          deletable
        />
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
