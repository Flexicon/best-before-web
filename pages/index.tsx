import { useCallback, useEffect, useState } from 'react'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react'

interface Product {
  id: number
  name: string
  expiry_date: string
}

export default function Home() {
  const { session, isLoading } = useSessionContext()
  const supabase = useSupabaseClient()
  const [products, setProducts] = useState<Product[] | null>(null)

  const fetchProducts = useCallback(async () => {
    let { data: products, error } = await supabase.from('products').select('*')

    if (error) {
      console.error('Failed to fetch products:', error)
      return
    }
    setProducts(products)
  }, [setProducts, supabase])

  const addDemoProduct = useCallback(async () => {
    const { error } = await supabase
      .from('products')
      .insert([{ name: 'Krem jakiś tam', expiry_date: '2022-12-30' }])

    if (error) {
      alert(`Failed to add demo product: ${JSON.stringify(error)}`)
      return
    }
    fetchProducts()
  }, [supabase, fetchProducts])

  const addDemoProducts = useCallback(async () => {
    const { error } = await supabase.from('products').insert([
      { name: 'Pasta do zębów', expiry_date: '2022-12-25' },
      { name: 'Mydło Yope', expiry_date: '2023-06-01' },
      { name: 'Puder', expiry_date: '2025-01-01' },
    ])

    if (error) {
      alert(`Failed to add demo product: ${JSON.stringify(error)}`)
      return
    }
    fetchProducts()
  }, [supabase, fetchProducts])

  const deleteProduct = useCallback(
    async (product: Product) => {
      const { error } = await supabase.from('products').delete().eq('id', product.id)

      if (error) {
        alert(`Failed to delete product: ${JSON.stringify(error)}`)
        return
      }
      fetchProducts()
    },
    [supabase, fetchProducts],
  )

  useEffect(() => {
    if (session) fetchProducts()
  }, [session, fetchProducts])

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
      <div className="my-6 flex justify-center gap-3">
        <button className="button" onClick={addDemoProduct}>
          Add 1 Demo Product
        </button>

        <button className="button" onClick={addDemoProducts}>
          Add Demo Products
        </button>
      </div>

      <div>
        <ul className="list-inside list-disc">
          {products ? (
            products.length ? (
              products.map((p) => (
                <li key={p.id}>
                  <button className="button mr-2 text-xs" onClick={() => deleteProduct(p)}>
                    X
                  </button>
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
