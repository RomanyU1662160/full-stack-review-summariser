import type { Request, Response } from 'express'
import { AiChatService } from '../services/chat.service'

export const AiChatController = {
  generateReviewSummary: async (req: Request, res: Response) => {
    try {
      const productId = Number(req.params.productId)
      if (isNaN(productId)) {
        return res.status(400).json({ error: 'Invalid product ID' })
      }
      const classifications = await AiChatService.summarizeReviews(productId)

      return res.status(200).json({
        classifications: classifications.finalOutput,
        totalToken: classifications.state.usage.totalTokens,
      })
    } catch (error) {
      console.error('Error in classifyReviewSentiments:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  },
}
