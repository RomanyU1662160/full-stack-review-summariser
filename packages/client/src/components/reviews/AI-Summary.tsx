import type { SummaryResponse } from '@/types/summary'
import { SkeletonCard } from '../skeleton/SkeletonCard'
import StarRating from './StarRating'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { HiSparkles } from 'react-icons/hi2'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { AISummaryApi } from '@/api-layers'

type SummaryProps = {
  productId: number
}

const ReviewSummary = ({ productId }: SummaryProps) => {
  const [showSummary, setShowSummary] = useState<boolean>(false)

  const { data, isLoading, error } = useQuery<SummaryResponse>({
    queryKey: ['summary', productId],
    queryFn: () => AISummaryApi.fetchSummary(productId),
  })

  const { summary } = data || {}
  return (
    <div className="w-full mb-6">
      {!isLoading && !error && (
        <div className="flex justify-center">
          <button
            className="self-start px-2 py-2 bg-black text-white  hover:bg-amber-700 transition rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            onClick={() => setShowSummary(!showSummary)}
            disabled={isLoading || !!error}
          >
            <HiSparkles className="inline mr-2 text-amber-200 text-2xl" />
            {showSummary ? 'Hide Summary' : 'Show Summary'}
          </button>
        </div>
      )}
      {isLoading && <SkeletonCard />}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error.message}
        </div>
      )}
      {!isLoading && !error && summary && showSummary && (
        <Card className="border-2 border-amber-100 bg-linear-to-br from-amber-50 to-white shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-gray-800 font-semibold text-lg">
              <HiSparkles className="inline mr-2 text-gray-400 text-2xl" />
              <span>AI-Powered Summary</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">What people are saying</p>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              {summary.content}
            </p>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 border-t border-amber-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500">
                Total Reviews:
              </span>
              <span className="text-sm font-bold text-gray-700">
                {summary.totalReviews}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500">
                Overall Rating:
              </span>
              <StarRating rating={summary.overall_rating} />
              <span className="text-sm font-bold text-gray-700">
                {summary.overall_rating.toFixed(1)}
              </span>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

export default ReviewSummary
