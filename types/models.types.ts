import { Database } from './database.types'

export type Product = Database['public']['Tables']['products']['Row']

export type IconValues = Database['public']['Enums']['icon']
