import { useRef } from 'react'
import { FaEllipsisH } from 'react-icons/fa'
import { GiMedicinePills, GiPill } from 'react-icons/gi'
import { IoFastFood } from 'react-icons/io5'

import type { Product } from '../types'

const icons = [GiMedicinePills, GiPill, IoFastFood]

const randomIcon = () => icons[Math.floor(Math.random() * icons.length)]

type Props = {
  product: Product
}

export const ProductsListItem = ({ product }: Props) => {
  const icon = useRef(randomIcon())

  return (
    <div className="flex items-start justify-between rounded bg-gray-50 py-3 px-4 shadow-md">
      <div className="flex items-start gap-2">
        <div className="pt-1 text-xl text-gray-500">
          <icon.current />
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
