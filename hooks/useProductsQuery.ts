import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useQuery } from '@tanstack/react-query'

import { QueryKeys } from '../queries'
import { Database, Product } from '../types'

export const useProductsQuery = () => {
  const supabase = useSupabaseClient<Database>()

  return useQuery({
    queryKey: [QueryKeys.Products],
    queryFn: async (): Promise<Product[]> => {
      const auth = await supabase.auth.getSession()
      if (!auth.data.session) {
        throw new Error('No user session')
      }

      const { data: products, error } = await supabase.from('products').select('*').order('id')
      if (error) {
        throw new Error(error.message)
      }

      return products ?? []
    },
  })
}
