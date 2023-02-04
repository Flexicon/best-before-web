import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { BiTrash } from 'react-icons/bi'
import { z } from 'zod'

import { IconValues, Product } from 'types'

const iconOptions: Record<IconValues, string> = {
  pill: 'Pill',
  pills: 'Bottle of pills',
  food: 'Food',
}
const iconKeys = Object.keys(iconOptions) as [string, ...string[]]

const schema = z.object({
  name: z.string().min(1, { message: 'Required' }),
  expiry_date: z.coerce.date(),
  icon: z.enum(iconKeys),
})

export interface ProductFormValues {
  name: string
  expiry_date: string
  icon: IconValues
}

type Props = {
  product?: Partial<Product>
  disabled: boolean
  deletable?: boolean
  error?: string | null
  onSubmit: (values: ProductFormValues) => void
  onDelete?: () => void
}

const FormError = ({ errors, field }: { errors: any; field: string }) =>
  errors[field]?.message ? (
    <p className="pt-1 text-sm text-red-500">{errors[field]?.message}</p>
  ) : null

export const ProductForm = ({
  product = {},
  disabled,
  deletable = false,
  error,
  onSubmit,
  onDelete = () => {},
}: Props) => {
  const {
    register,
    handleSubmit: zHandleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const handleDelete = () => {
    if (confirm(`Delete ${product.name}?`)) onDelete()
  }

  return (
    <form onSubmit={zHandleSubmit((d) => onSubmit(d as ProductFormValues))}>
      <div className="input-field">
        <label htmlFor="name">Product Name</label>

        <input type="text" defaultValue={product.name} disabled={disabled} {...register('name')} />
        <FormError errors={errors} field="name" />
      </div>

      <div className="input-field">
        <label htmlFor="expiry_date">Expiry Date</label>

        <input
          type="date"
          defaultValue={product.expiry_date}
          disabled={disabled}
          {...register('expiry_date')}
        />
        <FormError errors={errors} field="expiry_date" />
      </div>

      <div className="input-field">
        <label htmlFor="icon">Icon</label>

        <div className="select-wrapper">
          <select id="icon" defaultValue={product.icon} disabled={disabled} {...register('icon')}>
            {Object.entries(iconOptions).map(([icon, label]) => (
              <option key={`${icon}-${label}`} value={icon}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <FormError errors={errors} field="icon" />
      </div>

      <div className="mt-7 flex gap-1">
        <button className="button primary" type="submit" disabled={disabled}>
          Save
        </button>

        {deletable && (
          <button
            className="button danger flex items-center gap-2"
            onClick={handleDelete}
            type="button"
            disabled={disabled}
          >
            <BiTrash />
            <span>Delete</span>
          </button>
        )}
      </div>

      {!!error && <p className="pt-4 text-sm italic text-red-500">Request failed: {error}</p>}
    </form>
  )
}

export default ProductForm
