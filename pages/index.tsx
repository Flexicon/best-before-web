import { useProductsQuery } from '../hooks/queries'

export default function Home() {
  const { data: products, isLoading } = useProductsQuery()

  return (
    <>
      <div>
        <ul className="list-inside list-disc">
          {!isLoading && products ? (
            products.length ? (
              products.map((p) => (
                <li key={p.id}>
                  <span>{`ID: ${p.id} - ${p.name} - ${p.expiry_date}`}</span>
                </li>
              ))
            ) : (
              <li>No products yet - add one now!</li>
            )
          ) : (
            <li>Loading products...</li>
          )}
        </ul>
      </div>
    </>
  )
}
