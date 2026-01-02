import axios from 'axios'
import type { Review } from '@/types/review'

export const ReviewsApi = {
  fetchReviews: async (productId: number) => {
    const response = await axios.get<Review[]>(
      `/api/products/${productId}/reviews`
    )
    const reviews = response.data
    return reviews
  },
}
