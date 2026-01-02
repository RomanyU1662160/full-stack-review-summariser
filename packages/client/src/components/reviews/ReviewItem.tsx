import type { Review } from '@/types/review'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import StarRating from './StarRating'

type ReviewItemProps = {
  review: Review
}

const ReviewItem = ({ review }: ReviewItemProps) => {
  return (
    <Card className="mb-2 w-full md:w-1/2 text-start p-0">
      <CardHeader className="font-bold text-xl text-amber-600 bg-slate-100 mb-2 ">
        <div className="flex flex-row justify-between items-center">
          {review.title}
          <StarRating rating={review.rating} />
        </div>
      </CardHeader>
      <CardContent>{review.content}</CardContent>

      <CardFooter className="text-sm text-gray-500">
        Rating: {review.rating}/5 | By: {review.author.name} | On:{' '}
        {new Date(review.createdAt).toLocaleDateString()}
      </CardFooter>
    </Card>
  )
}

export default ReviewItem
