import { ReviewsAgent } from '../agents/openai/reviews.agents'
import { HG_ReviewsAgent } from '../agents/HG/reviews.client'
import { logger } from '../utils'

const AI_mode = process.env.AI_MODE

export type SummaryResponse = {
  summary: string
  overall_rating: number
  totalReviews: number
  high_lights: string[]
  usage: {
    totalTokens: number
  }
}

const isHF = AI_mode === 'HF'
export const AiChatService = {
  summarizeReviews: async (productId: number): Promise<SummaryResponse> => {
    if (isHF) {
      logger.info('Using Hugging Face Reviews Agent')
      const response = await HG_ReviewsAgent.summarizeReviews(productId)
      // HG agent returns parsed JSON object directly
      return {
        summary: response.summary,
        overall_rating: response.overall_rating,
        totalReviews: response.total_reviews,
        high_lights: response.high_lights,
        usage: {
          totalTokens: 0, // HF doesn't provide token usage in the same way
        },
      }
    } else {
      logger.info('Using OpenAI Reviews Agent')
      const response = await ReviewsAgent.summarizeClassifiedReviews(productId)
      return {
        summary: response.finalOutput.summary,
        overall_rating: response.finalOutput.overall_rating,
        totalReviews: response.finalOutput.totalReviews,
        high_lights: response.finalOutput.high_lights,
        usage: {
          totalTokens: response.state.usage.totalTokens,
        },
      }
    }
  },
}
