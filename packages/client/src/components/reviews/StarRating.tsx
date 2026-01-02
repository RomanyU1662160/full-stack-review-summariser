import { FaStar } from 'react-icons/fa'
import { FaRegStar } from 'react-icons/fa'

type StarRatingProps = {
  rating: number
  outOf?: number
}

const StarRating = ({ rating, outOf = 5 }: StarRatingProps) => {
  const placeHolders = Array.from({ length: outOf }, (_, index) => {
    return index < rating ? (
      <FaStar key={index} className="text-amber-500" />
    ) : (
      <FaRegStar key={index} className="text-amber-500" />
    )
  })

  return <div className="flex gap-1">{placeHolders}</div>
}

export default StarRating
