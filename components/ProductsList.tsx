import { ProductsListItem } from './ProductsListItem'
import type { Product } from '../types'

type Props = {
  products: Product[]
}

export const ProductsList = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {products.map((p) => (
        <ProductsListItem key={p.id} product={p} />
      ))}
    </div>
  )
}
