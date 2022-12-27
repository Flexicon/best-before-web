import { Database } from './database.types'

export interface Product {
  id: number
  name: string
  expiry_date: string
  icon: IconValues
}

export type IconValues = Database['public']['Enums']['icon']
