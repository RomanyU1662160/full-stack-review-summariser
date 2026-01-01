import { prisma } from '../../prisma/prisma'
import dayjs from 'dayjs'

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
    const now = new Date()
    const expiresAt = dayjs(now).add(7, 'days')

    const payload = {
      content: body.summary,
      overall_rating: body.overall_rating,
      high_lights: body.high_lights.join(','),
      totalTokens: body.totalTokens,
      totalReviews: body.totalReviews,
      expiresAt: expiresAt.toDate(),
    }
    // create or update summary for product
    const summary = await prisma.summary.upsert({
      where: {
        productId: productId,
      },
      update: payload,
      create: {
        productId: productId,
        ...payload,
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
