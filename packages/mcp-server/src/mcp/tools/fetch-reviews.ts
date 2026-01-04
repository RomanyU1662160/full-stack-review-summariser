import { z } from 'zod'
import type { CustomTool } from '../types'

export const ReviewZ = z.object({
  id: z.number(),
  title: z.string().optional(),
  content: z.string().optional(),
  published: z.boolean().optional(),
  rating: z.number().optional(),
  authorId: z.number().optional(),
  productId: z.number().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  author: z
    .object({
      name: z.string(),
      email: z.string(),
    })
    .optional(),
})

const fetchReviewsInputSchema = z.object({ product_id: z.number() })

const fetchReviewsOutputSchema = {
  reviews: z.array(ReviewZ),
}

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000'

export const fetchReviewsTool: CustomTool<
  typeof fetchReviewsInputSchema,
  typeof fetchReviewsOutputSchema
> = {
  name: 'fetch_reviews',
  title: 'Fetch Reviews',
  description: 'Fetch reviews from the database.',
  inputSchema: fetchReviewsInputSchema,
  outputSchema: fetchReviewsOutputSchema,
  execute: async ({ product_id }) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/products/${product_id}/reviews`
      )

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`)
      }

      const reviews = await response.json()

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ reviews }, null, 2),
          },
        ],
        structuredContent: { reviews },
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
        structuredContent: { reviews: [], error: (error as Error).message },
      }
    }
  },
}
