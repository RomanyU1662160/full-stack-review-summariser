import { useEffect, useState } from 'react'
import axios from 'axios'
import type { Review } from '@/types/review'
import ReviewItem from './ReviewItem'

type Props = {
  productId: number
  productName: string
}

const ReviewsList = ({ productId, productName }: Props) => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const reviews = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await axios.get<Review[]>(
          `/api/products/${productId}/reviews`
        )
        const reviews = response.data
        console.log('reviews data:::>>>', reviews)
        setLoading(false)
        setReviews(reviews)
      } catch (error) {
        console.log('error fetching reviews:::>>>', error)
        setError('Error fetching reviews')
      }
    }
    reviews()
  }, [productId])

  return (
    <div>
      <h3 className="text-center text-info">{productName} Reviews</h3>
      <div className="flex flex-col flex-1">
        {loading && <div>Loading reviews...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {!loading && !error && reviews.length === 0 && (
          <div>No reviews available.</div>
        )}
        {!loading && !error && reviews.length > 0 && (
          <ul className="space-y-4">
            {reviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default ReviewsList
