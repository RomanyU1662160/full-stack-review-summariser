import { ReviewsAgent } from '../agents/openai/reviews.agents'

export const AiChatService = {
  summarizeReviews: async (productId: number) => {
    return await ReviewsAgent.summarizeClassifiedReviews(productId)
  },
}
