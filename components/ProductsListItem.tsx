import Link from 'next/link'
import { useMemo } from 'react'
import { IconType } from 'react-icons'
import { GiMedicinePills, GiPill } from 'react-icons/gi'
import { IoFastFood } from 'react-icons/io5'

import type { IconValues, Product } from 'types'

const icons: Record<IconValues, IconType> = {
  pills: GiMedicinePills,
  pill: GiPill,
  food: IoFastFood,
}

type Props = {
  product: Product
}

export const ProductsListItem = ({ product }: Props) => {
  const ProductIcon = useMemo(() => icons[product.icon], [product.icon])

  return (
    <Link
      href={`/product/${product.id}`}
      className={`flex items-start justify-between rounded bg-gray-50 py-3 px-4 shadow-md transition-all hover:bg-gray-100 hover:shadow-lg`}
    >
      <div className="flex w-full items-start gap-2">
        <div className="pt-1 text-xl text-gray-500">
          <ProductIcon />
        </div>

        <div className="flex min-w-0 flex-col">
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">{product.name}</span>
          <span className="text-xs text-gray-500">{product.expiry_date}</span>
        </div>
      </div>
    </Link>
  )
}

export default ProductsListItem
