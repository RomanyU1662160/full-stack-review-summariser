import type { Request, Response } from 'express'
import { SummariesService } from '../services/summaries.service'
import { AiChatService } from '../services/chat.service'
import { logger } from '../utils'
import type { Summary } from '../../generated/prisma/client'
import { ProductsService } from '../services'
import { ReviewsService } from '../services/reviews.service'

export const SummaryController = {
  getReviewSummary: async (
    req: Request,
    res: Response
  ): Promise<Response<Summary>> => {
    const { id } = req.params
    const productId = Number(id)

    // Validate productId
    if (isNaN(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' })
    }

    // Check if product exists
    const existingProduct = await ProductsService.getProductById(productId)
    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' })
    }

    // Check for existing summary in the database
    const storedSummary =
      await SummariesService.getSummaryByProductId(productId)
    const now = new Date()

    // If summary exists and is not expired, return it
    if (storedSummary && storedSummary.expiresAt > now) {
      logger.info(`Using cached summary for product ID: ${productId}`)
      return res.status(200).json({ summary: storedSummary })
    } else {
      // If no summary exists or it has expired, generate a new one
      // Check if there are reviews for the product, if none, return a message
      const existingReview =
        await ReviewsService.getReviewsByProductId(productId)
      if (existingReview.length === 0) {
        return res
          .status(200)
          .json({ message: 'No reviews found for this product' })
      }

      logger.info(`Generating new summary for product ID: ${productId}`)

      // Generate new summary using AI service
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
