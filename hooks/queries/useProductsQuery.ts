import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useQuery } from '@tanstack/react-query'

import type { Database, Product } from 'types'
import { QueryKeys } from './queryKeys'

export const useProductsQuery = () => {
  const supabase = useSupabaseClient<Database>()

  return useQuery({
    queryKey: [QueryKeys.Products],
    queryFn: async (): Promise<Product[]> => {
      const { data: products, error } = await supabase.from('products').select('*').order('id')
      if (error) {
        throw new Error(error.message)
      }

      return products ?? []
    },
  })
}
