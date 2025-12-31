import { z } from 'zod'

export const reviewSummaryResponseSchemaZ = z.object({
  summary: z.string().min(1).max(1000),
  overall_rating: z.number().min(1).max(5),
  high_lights: z.array(z.string().min(1).max(500)),
  total_reviews: z.number().default(0),
})

export const reviewClassificationSchemaZ = z.object({
  type: z.enum(['positive', 'negative', 'neutral']),
  reason: z.string().min(1).max(500),
  summary: z.string().min(1).max(500),
})

export const reviewClassificationResponseSchemaZ = z.object({
  reviews: z.array(
    z.object({
      review_id: z.string(),
      classifications: reviewClassificationSchemaZ,
    })
  ),
})

export type ReviewSummaryResponseSchema = z.infer<
  typeof reviewSummaryResponseSchemaZ
>
export type ReviewClassificationSchema = z.infer<
  typeof reviewClassificationSchemaZ
>

export type ReviewClassificationResponseSchema = z.infer<
  typeof reviewClassificationResponseSchemaZ
>
