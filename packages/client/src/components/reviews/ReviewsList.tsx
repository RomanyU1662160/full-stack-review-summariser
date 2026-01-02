import axios from 'axios'
import type { Review } from '@/types/review'
import ReviewItem from './ReviewItem'
import { SkeletonCard } from '../skeleton/SkeletonCard'
import { useQuery } from '@tanstack/react-query'

type Props = {
  productId: number
  productName: string
}

const fetchReviews = async (productId: number) => {
  const response = await axios.get<Review[]>(
    `/api/products/${productId}/reviews`
  )
  const reviews = response.data
  console.log('reviews data:::>>>', reviews)
  return reviews
}

const ReviewsList = ({ productId, productName }: Props) => {
  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery<Review[]>({
    queryKey: ['reviews', productId],
    queryFn: () => fetchReviews(productId),
  })

  return (
    <>
      <h3 className="text-center font-semibold mb-4 text-2xl text-amber-600">
        {productName} Reviews
      </h3>
      <div className="flex flex-col  md:flex-row space-x-4">
        {isLoading && <SkeletonCard />}
        {error && <div className="text-red-500">{error.message}</div>}
        {!isLoading && !error && reviews?.length === 0 && (
          <div>No reviews available.</div>
        )}
        {!isLoading &&
          !error &&
          reviews?.length &&
          reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
      </div>
    </>
  )
}

export default ReviewsList
