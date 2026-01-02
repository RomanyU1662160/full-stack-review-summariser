import type { Product } from '@/types/product'
import axios from 'axios'
import ProductItem from './ProductItem'
import { useQuery } from '@tanstack/react-query'
import { SkeletonCard } from '../skeleton/SkeletonCard'

const fetchProducts = async () => {
  const response = await axios.get('/api/products')
  return response.data as Product[]
}

const ProductsList = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  return (
    <div className="flex flex-col flex-1 space-y-4">
      <h3 className="text-center text-blue-600 font-bold"> All Products </h3>
      {isLoading && <SkeletonCard />}
      {error && <div className="text-red-500">{error.message}</div>}
      {!isLoading && !error && products?.length === 0 && (
        <div>No products available.</div>
      )}
      {!isLoading && !error && products && products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductsList
