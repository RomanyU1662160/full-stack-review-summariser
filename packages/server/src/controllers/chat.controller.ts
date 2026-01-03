import type { Request, Response } from 'express'
import { AiChatService } from '../services/chat.service'
import { logger } from '../utils'

export const AiChatController = {
  generateReviewSummary: async (req: Request, res: Response) => {
    try {
      const productId = Number(req.params.productId)
      if (isNaN(productId)) {
        return res.status(400).json({ error: 'Invalid product ID' })
      }
      const reviewSummaries = await AiChatService.summarizeReviews(productId)

      return res.status(200).json({
        data: reviewSummaries,
      })
    } catch (error) {
      logger.error('Error in generateReviewSummary:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  },
}
