import type { Product } from '@/types/product'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ProductItem from './ProductItem'

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setError(null)
        setLoading(true)
        const response = await axios.get('/api/products')
        console.log('products data:::>>>', response.data)
        setProducts(response.data)
        setLoading(false)
      } catch (error) {
        console.log('error fetching products:::>>>', error)
        setError('Failed to fetch products')
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="flex flex-col flex-1 space-y-4">
      <h3 className="text-center text-blue-600 font-bold"> All Products </h3>
      {loading && <div>Loading products...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && products.length === 0 && (
        <div>No products available.</div>
      )}
      {!loading && !error && products.length > 0 && (
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
