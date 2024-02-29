import Link from 'next/link'
import cn from 'classnames'
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

  return (
    <Link
      href={`/product/${product.id}`}
      className={cn(
        'flex items-start justify-between rounded py-3 px-4 shadow-md transition-all hover:shadow-lg',
        isExpired ? 'bg-red-50 hover:bg-red-100' : 'bg-gray-50 hover:bg-gray-100',
      )}
    >
      <div className="flex w-full items-start gap-2">
        <div
          className={cn('pt-1 text-xl', !isExpired && 'text-gray-500', isExpired && 'text-red-600')}
        >
          <ProductIcon />
        </div>

        <div className="flex min-w-0 flex-col">
          <span
            className={cn(
              'overflow-hidden text-ellipsis whitespace-nowrap',
              isExpired && 'text-red-700',
            )}
          >
            {product.name}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-500">
            {isExpired && <IoWarningOutline className="text-red-700" />}
            <span>{product.expiry_date}</span>
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ProductsListItem
