import { Loader, ProductsList } from 'components'
import { useProductsQuery } from 'hooks/queries'

export default function Home() {
  const { data: products, isLoading } = useProductsQuery()

  return (
    <div className="pt-5">
      {!isLoading && products ? <ProductsList products={products} /> : <Loader />}
    </div>
  )
}
