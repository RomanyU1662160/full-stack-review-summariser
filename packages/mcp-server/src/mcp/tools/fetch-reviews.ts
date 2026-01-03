import z from 'zod'
import { reviewSummaryResponseSchemaZ } from '@workspace/core/types'
import { ReviewsService } from '@workspace/core/services'
import type { CustomTool } from '../types'

const fetchReviewsInputSchema = z.object({ product_id: z.number() })

export const fetchReviewsTool: CustomTool<
  typeof fetchReviewsInputSchema,
  typeof reviewSummaryResponseSchemaZ
> = {
  name: 'fetch_reviews',
  title: 'Fetch Reviews',
  description: 'Fetch reviews from the database.',
  inputSchema: fetchReviewsInputSchema,
  outputSchema: reviewSummaryResponseSchemaZ,
  execute: async ({ product_id }) => {
    try {
      const reviews = await ReviewsService.getReviewsByProductId(product_id)
      console.log(
        'reviewSummaryResponseSchemaZ:::>>>',
        reviewSummaryResponseSchemaZ
      )
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(reviews),
          },
        ],
        structuredContent: {
          reviews: reviews,
        },
      }
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              error: `Error fetching reviews: ${(error as Error).message}`,
            }),
          },
        ],
        structuredContent: {
          error: `Error fetching reviews: ${(error as Error).message}`,
        },
      }
    }
  },
}
