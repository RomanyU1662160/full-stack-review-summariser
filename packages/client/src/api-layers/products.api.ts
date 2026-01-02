import axios from 'axios'
import type { Product } from '@/types/product'

export const ProductsApi = {
  fetchProducts: async () => {
    const response = await axios.get('/api/products')
    return response.data as Product[]
  },
}
