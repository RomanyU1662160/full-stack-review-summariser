import { openAIClient } from '../clients'
import { ReviewsService } from './reviews.service'
import type OpenAI from 'openai'

export const ChatService = {
  classifyReviewSentiments: async (
    productId: number
  ): Promise<OpenAI.Responses.Response> => {
    try {
      const reviews = await ReviewsService.getReviewsByProductId(productId)
      const classificationResponse =
        await openAIClient.processReviewsClassification(reviews)
      return classificationResponse
    } catch (error) {
      console.log('error:::>>>', error)
      throw error
    }
  },
}
