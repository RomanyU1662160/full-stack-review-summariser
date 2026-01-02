import type { Review } from '@/types/review'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'

type ReviewItemProps = {
  review: Review
}

const ReviewItem = ({ review }: ReviewItemProps) => {
  return (
    <Card className="mb-2 w-1/2 text-start p-0 ">
      <CardHeader className="font-bold text-xl text-amber-600 bg-slate-100 mb-2 ">
        {review.title}
      </CardHeader>
      <CardContent>{review.content}</CardContent>

      <CardFooter className="text-sm text-gray-500">
        Rating: {review.rating} | By: {review.author.name} | On:{' '}
        {new Date(review.createdAt).toLocaleDateString()}
      </CardFooter>
    </Card>
  )
}

export default ReviewItem
