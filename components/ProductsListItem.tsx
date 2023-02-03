import Link from 'next/link'
import { useMemo } from 'react'
import { IconType } from 'react-icons'
import { GiMedicinePills, GiPill } from 'react-icons/gi'
import { IoFastFood, IoWarningOutline } from 'react-icons/io5'

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
  const isExpired = new Date(product.expiry_date).getTime() < Date.now()
  const bgClasses = isExpired ? 'bg-red-100 hover:bg-red-200' : 'bg-gray-50 hover:bg-gray-100'

  return (
    <Link
      href={`/product/${product.id}`}
      className={`flex items-start  justify-between rounded ${bgClasses} py-3 px-4 shadow-md transition-all hover:shadow-lg`}
    >
      <div className="flex w-full items-start gap-2">
        <div className="pt-1 text-xl text-gray-500">
          <ProductIcon />
        </div>

        <div className="flex min-w-0 flex-col">
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">{product.name}</span>
          <span className="flex items-center gap-1 text-xs text-gray-500">
            {isExpired && <IoWarningOutline />}
            <span>{product.expiry_date}</span>
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ProductsListItem
