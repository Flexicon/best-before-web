import { useMemo } from 'react'
import { IconType } from 'react-icons'
import { FaEllipsisH } from 'react-icons/fa'
import { GiMedicinePills, GiPill } from 'react-icons/gi'
import { IoFastFood } from 'react-icons/io5'

import type { Icon, Product } from 'types'

const icons: Record<Icon, IconType> = {
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
    <div className="flex items-start justify-between rounded bg-gray-50 py-3 px-4 shadow-md">
      <div className="flex items-start gap-2">
        <div className="pt-1 text-xl text-gray-500">
          <ProductIcon />
        </div>

        <div className="flex flex-col">
          <span>{product.name}</span>
          <span className="text-xs text-gray-500">{product.expiry_date}</span>
        </div>
      </div>

      <div className="cursor-pointer text-gray-400 hover:text-gray-800">
        <FaEllipsisH />
      </div>
    </div>
  )
}
