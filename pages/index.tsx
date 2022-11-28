import { useCallback, useEffect, useState } from 'react'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react'

import { Database, Product } from '../types'

export default function Home() {
  const { session, isLoading } = useSessionContext()
  const supabase = useSupabaseClient<Database>()
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
  }, [supabase])

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
  }, [supabase])

  const deleteProduct = useCallback(
    async (product: Product) => {
      const { error } = await supabase.from('products').delete().eq('id', product.id)

      if (error) {
        alert(`Failed to delete product: ${JSON.stringify(error)}`)
      }
    },
    [supabase],
  )

  const incrementProduct = useCallback(
    async (product: Product) => {
      const d = new Date(new Date(product.expiry_date).getTime() + 86400000)

      const { error } = await supabase
        .from('products')
        .update({ expiry_date: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}` })
        .eq('id', product.id)

      if (error) {
        alert(`Failed to increment product expiry date: ${JSON.stringify(error)}`)
      }
    },
    [supabase],
  )

  useEffect(() => {
    if (session) fetchProducts()
  }, [session, fetchProducts])

  // Setup realtime data subscription
  useEffect(() => {
    if (!session) return

    const productsSub = supabase
      .channel('custom-all-product-updates-channel')
      .on<Product>(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        (payload) => {
          switch (payload.eventType) {
            case 'INSERT':
              setProducts((products) => [...(products ?? []), payload.new])
              break
            case 'UPDATE':
              setProducts(
                (products) =>
                  products?.map((p) => (p.id === payload.new.id ? { ...payload.new } : p)) ?? null,
              )
              break
            case 'DELETE':
              setProducts((products) => products?.filter((p) => p.id != payload.old.id) ?? null)
              break
          }
        },
      )
      .subscribe()

    return () => {
      productsSub.unsubscribe()
    }
  }, [session, supabase, setProducts])

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
                  <button className="button ml-2 text-xs" onClick={() => incrementProduct(p)}>
                    ++
                  </button>
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
