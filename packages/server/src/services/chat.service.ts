import { ReviewsAgent } from '../agents/reviews.agents'

export const AiChatService = {
  summarizeReviews: async (productId: number) => {
    return await ReviewsAgent.summarizeClassifiedReviews(productId)
  },
}
