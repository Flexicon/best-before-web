import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSideProps } from 'next'
import { useCallback } from 'react'

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
  const onSubmit = useCallback((form: ProductFormValues) => {
    console.log(`Form submitted: `, form)
  }, [])

  if (isError) return <div className="pt-5">Something went wrong.</div>

  return (
    <div className="pt-5">
      <h2 className="mb-6 text-2xl">Product #{product.id}</h2>
      <ProductForm product={product} onSubmit={onSubmit} />
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
