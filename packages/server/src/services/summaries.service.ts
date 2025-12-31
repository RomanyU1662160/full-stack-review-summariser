import { add } from 'winston'
import { prisma } from '../../prisma/prisma'
import { number } from 'zod'

export const SummariesService = {
  addSummaryToProduct: async (
    productId: number,
    body: {
      summary: string
      overall_rating: number
      high_lights: string[]
      totalTokens: number
      totalReviews: number
    }
  ) => {
    // create or update summary for product
    const summary = await prisma.summary.upsert({
      where: {
        productId: productId,
      },
      update: {
        content: body.summary,
        overall_rating: body.overall_rating,
        high_lights: body.high_lights.join(','),
        totalTokens: body.totalTokens,
        totalReviews: body.totalReviews,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expires in 7 days
      },
      create: {
        productId: productId,
        content: body.summary,
        overall_rating: body.overall_rating,
        high_lights: body.high_lights.join(','),
        totalTokens: body.totalTokens,
        totalReviews: body.totalReviews,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expires in 7 days
      },
    })
    return summary
  },

  getSummaryByProductId: async (productId: number) => {
    const summary = await prisma.summary.findFirst({
      where: {
        productId: productId,
      },
    })
    return summary
  },
}
