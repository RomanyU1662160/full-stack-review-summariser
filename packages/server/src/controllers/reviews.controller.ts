import type { Request, Response } from 'express'
import type { Review } from '../../generated/prisma/client'
import { ReviewsService } from '../services/reviews.service'
import { add } from 'winston'

export const ReviewsController = {
  fetchProductReviewsById: async (
    req: Request,
    res: Response
  ): Promise<Response<Review[]>> => {
    const productId = Number(req.params.productId)
    if (isNaN(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' })
    }
    const reviews = await ReviewsService.getReviewsByProductId(productId)
    return res.json(reviews)
  },

  addReviewToProduct: async (
    req: Request,
    res: Response
  ): Promise<Response<Review>> => {
    const productId = Number(req.params.productId)
    if (isNaN(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' })
    }
    const authorId: number = req.body.authorId
    const { title, rating, content } = req.body
    if (!title || !rating || !content || !authorId) {
      return res.status(400).json({ error: 'Missing required fields' })
    }
    const review = await ReviewsService.addReviewToProduct(
      productId.toString(),
      authorId,
      { title, rating, content }
    )
    return res.json(review)
  },
}
