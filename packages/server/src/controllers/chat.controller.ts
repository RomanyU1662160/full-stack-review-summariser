import type { Request, Response } from 'express'
import { ChatService } from '../services/chat.service'

export const ChatController = {
  classifyReviewSentiments: async (req: Request, res: Response) => {
    try {
      const productId = Number(req.params.productId)
      if (isNaN(productId)) {
        return res.status(400).json({ error: 'Invalid product ID' })
      }
      const classifications =
        await ChatService.classifyReviewSentiments(productId)

      console.log('classifications:::>>>', classifications)
      console.log(
        'classifications.output_text:::>>>',
        classifications.output_text
      )
      return res.status(200).json({
        classifications: classifications.output_text,
        totalToken: classifications.usage?.total_tokens || 0,
      })
    } catch (error) {}
  },
}
