import { useSession } from '@supabase/auth-helpers-react'

import { useProductsQuery } from '../hooks/queries'
import { useRouter } from 'next/router'

export default function Home() {
  const session = useSession()
  const router = useRouter()
  const { data: products, isLoading } = useProductsQuery()

  if (!session) {
    router.push('/login')
  }

  return (
    <>
      <div>
        <ul className="list-inside list-disc">
          {!isLoading && products ? (
            products.length ? (
              products.map((p) => (
                <li key={p.id}>
                  <span>{`ID: ${p.id} - ${p.name} - ${p.expiry_date}`}</span>
                </li>
              ))
            ) : (
              <li>No products yet - add one now!</li>
            )
          ) : (
            <li>Loading products...</li>
          )}
        </ul>
      </div>
    </>
  )
}
