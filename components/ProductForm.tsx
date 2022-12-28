import { FormEventHandler, useRef } from 'react'
import { BiTrash } from 'react-icons/bi'

import { IconValues, Product } from 'types'

export interface ProductFormValues {
  name: string
  expiry_date: string
  icon: IconValues
}

type Props = {
  product: Product
  disabled: boolean
  onSubmit: (values: ProductFormValues) => void
  onDelete: () => void
}

export const ProductForm = ({ product, disabled, onSubmit, onDelete }: Props) => {
  const nameInput = useRef<HTMLInputElement>(null)
  const expiryDateInput = useRef<HTMLInputElement>(null)
  const iconInput = useRef<HTMLInputElement>(null)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    const values: ProductFormValues = {
      name: nameInput.current?.value || '',
      expiry_date: expiryDateInput.current?.value || '',
      icon: (iconInput.current?.value || 'pill') as IconValues,
    }

    onSubmit(values)
  }

  const handleDelete = () => {
    if (confirm(`Delete ${product.name}?`)) onDelete()
  }

  return (
    <form onSubmit={handleSubmit} className="w-[500px] max-w-full">
      <div className="input-field">
        <label htmlFor="name">Product Name</label>

        <input
          ref={nameInput}
          type="text"
          name="name"
          id="name"
          defaultValue={product.name}
          disabled={disabled}
        />
      </div>

      <div className="input-field">
        <label htmlFor="expiry_date">Expiry Date</label>

        <input
          ref={expiryDateInput}
          type="date"
          name="expiry_date"
          id="expiry_date"
          defaultValue={product.expiry_date}
          disabled={disabled}
        />
      </div>

      <div className="input-field">
        <label htmlFor="icon">Icon</label>

        <input
          ref={iconInput}
          type="text"
          name="icon"
          id="icon"
          defaultValue={product.icon}
          disabled={disabled}
        />
      </div>

      <div className="mt-7 flex gap-1">
        <button className="button primary" type="submit" disabled={disabled}>
          Save
        </button>

        <button
          className="button danger flex items-center gap-2"
          onClick={handleDelete}
          type="button"
          disabled={disabled}
        >
          <BiTrash />
          <span>Delete</span>
        </button>
      </div>
    </form>
  )
}

export default ProductForm
