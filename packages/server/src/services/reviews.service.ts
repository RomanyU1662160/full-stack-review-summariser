import { add } from 'winston'
import type { Review } from '../../generated/prisma/client'
import { prisma } from '../../prisma/prisma'

export const ReviewsService = {
  getReviewsByProductId: async (productId: number): Promise<Review[]> => {
    const reviews = await prisma.review.findMany({
      where: { productId },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
    return reviews
  },
  addReviewToProduct: async (
    productId: string,
    authorId: number,
    body: { title: string; rating: number; content: string }
  ): Promise<Review> => {
    const review = await prisma.review.create({
      data: {
        authorId,
        productId: parseInt(productId),
        title: body.title,
        content: body.content,
        rating: body.rating,
      },
    })
    return review
  },
}
