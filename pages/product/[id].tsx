import { useRouter } from 'next/router'

import { Loader } from 'components'
import { useProductQuery } from 'hooks/queries'

const ProductPage = () => {
  const router = useRouter()
  const { id } = router.query

  const { data: product, isLoading } = useProductQuery(+id!)

  return (
    <div className="pt-5">
      {!isLoading && product ? <span>Product: {product.name}</span> : <Loader />}
    </div>
  )
}

export default ProductPage
