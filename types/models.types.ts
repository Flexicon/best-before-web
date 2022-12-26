export interface Product {
  id: number
  name: string
  expiry_date: string
  icon: Icon
}

export type Icon = 'pills' | 'pill' | 'food'
