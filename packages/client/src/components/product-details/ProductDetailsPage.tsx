import type { Product } from '@/types/product'
import ProductDetails from './ProductDetails'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await axios.get<Product>(`/api/products/${id}`)
        setProduct(response.data)
        setLoading(false)
      } catch (error) {
        if (
          error instanceof AxiosError &&
          error.response &&
          error.response.status === 404
        ) {
          setError('Product not found')
          return
        }
        setError('Error fetching product details')
      } finally {
        setLoading(false)
      }
    }
    fetchProductDetails()
  }, [id])

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && !product && <p>Product not found</p>}
      {product && <ProductDetails product={product} />}
    </div>
  )
}

export default ProductDetailsPage
