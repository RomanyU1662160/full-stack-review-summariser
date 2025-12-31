import { Router } from 'express'
import { AiChatController } from '../controllers'

export const ChatRouter: Router = Router()

ChatRouter.get(
  '/reviews-classify/:productId',
  AiChatController.generateReviewSummary
)
