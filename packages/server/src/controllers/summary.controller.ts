import type { Request, Response } from 'express'
import { SummariesService } from '../services/summaries.service'
import { AiChatService } from '../services/chat.service'
import { logger } from '../utils'
import type { Summary } from '../../generated/prisma/client'
import { ProductsService } from '../services'

export const SummaryController = {
  getReviewSummary: async (
    req: Request,
    res: Response
  ): Promise<Response<Summary>> => {
    const { id } = req.params
    const productId = Number(id)

    if (isNaN(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' })
    }

    const existingProduct = await ProductsService.getProductById(productId)
    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' })
    }

    const storedSummary =
      await SummariesService.getSummaryByProductId(productId)
    const now = new Date()

    if (storedSummary && storedSummary.expiresAt > now) {
      logger.info(`Using cached summary for product ID: ${productId}`)
      return res.status(200).json({ summary: storedSummary })
    } else {
      logger.info(`Generating new summary for product ID: ${productId}`)
      const aiReviewSummary = await AiChatService.summarizeReviews(productId)
      logger.info(
        `Storing new summary in database for product ID: ${productId}`
      )
      const newSummary = await SummariesService.addSummaryToProduct(productId, {
        summary: aiReviewSummary.finalOutput.summary,
        overall_rating: aiReviewSummary.finalOutput.overall_rating,
        high_lights: aiReviewSummary.finalOutput.high_lights,
        totalTokens: aiReviewSummary.state.usage.totalTokens,
        totalReviews: aiReviewSummary.finalOutput.total_reviews,
      })
      return res.status(200).json({ summary: newSummary })
    }
  },
}
