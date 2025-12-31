import { Router } from 'express'
import { SummaryController } from '../controllers/summary.controller'

export const SummariesRouter: Router = Router()

SummariesRouter.get('/:id', SummaryController.getReviewSummary)
