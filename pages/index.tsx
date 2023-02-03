import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSideProps } from 'next'

import { ProductsList } from 'components'
import { Database, Product } from 'types'

interface PropsError {
  isError: true
  products: null
}

interface PropsSuccess {
  isError: false
  products: Product[]
}

type Props = PropsError | PropsSuccess

export default function Home({ products, isError }: Props) {
  if (isError) return <div>Something went wrong.</div>

  return (
    <div className="pt-5">
      <ProductsList products={products} />
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

  const { data: products, error } = await supabase.from('products').select('*').order('expiry_date')

  return {
    props: {
      products,
      isError: !!error,
    },
  }
}
