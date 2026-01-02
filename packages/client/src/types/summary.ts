export type Summary = {
  id: number
  content: string
  productId: number
  overall_rating: number
  generatedAt: string
  high_lights: string
  totalTokens: number
  totalReviews: number
  expiresAt: string
}

export type SummaryResponse = {
  message: string
  summary: Summary
}
