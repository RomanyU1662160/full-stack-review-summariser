import { Router } from 'express'
import { ChatController } from '../controllers'

export const ChatRouter: Router = Router()

ChatRouter.get(
  '/classify-review-sentiments/:productId',
  ChatController.classifyReviewSentiments
)
