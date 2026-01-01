import type { Review } from '@/types/review'

type ReviewItemProps = {
  review: Review
}

const ReviewItem = ({ review }: ReviewItemProps) => {
  return (
    <div>
      <h4 className="font-semibold">{review.title}</h4>
      <p className="text-sm text-slate-600">{review.content}</p>
      <p className="text-xs text-slate-400">
        Rating: {review.rating} | By: {review.author.name} | On:{' '}
        {new Date(review.createdAt).toLocaleDateString()}
      </p>
    </div>
  )
}

export default ReviewItem
