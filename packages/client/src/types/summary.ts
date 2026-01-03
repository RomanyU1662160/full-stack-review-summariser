export type Summary = {
  content: string
  overall_rating: number
  totalReviews: number
  high_lights: string
  generatedAt: string
  totalTokens: number
}

export type SummaryResponse = {
  message: string
  summary: Summary
}
