import { Router } from 'express'
import type { Request, Response } from 'express'
import { ReviewsController } from '../controllers/reviews.controller'

export const ReviewsRouter: Router = Router()

ReviewsRouter.get('/:productId', ReviewsController.fetchProductReviewsById)
ReviewsRouter.post('/:productId/add', ReviewsController.addReviewToProduct)
