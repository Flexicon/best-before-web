import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useQuery } from '@tanstack/react-query'

import type { Database, Product } from 'types'
import { QueryKeys } from './queryKeys'

export const useProductQuery = (id: number) => {
  const supabase = useSupabaseClient<Database>()

  return useQuery({
    queryKey: [QueryKeys.Product, id],
    queryFn: async (): Promise<Product | null> => {
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .limit(1)

      if (error) {
        throw new Error(error.message)
      }

      return products[0] ?? null
    },
  })
}
