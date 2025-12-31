import type { Product, Review } from '../../generated/prisma/client'
import { prisma } from '../../prisma/prisma'
import { ReviewsService } from './reviews.service'

export const ProductsService = {
  getProductReviews: async (productId: number): Promise<Review[]> => {
    const reviews = await ReviewsService.getReviewsByProductId(productId)
    return reviews
  },
  getProductById: async (id: number): Promise<Product | null> => {
    return prisma.product.findUnique({
      where: { id },
    })
  },
  getAllProducts: async (): Promise<Product[]> => {
    return prisma.product.findMany()
  },
  createProduct: async (data: {
    name: string
    price: number
    description?: string
  }) => {
    return prisma.product.create({
      data,
    })
  },
  updateProduct: async (
    id: number,
    data: { name?: string; price?: number; description?: string }
  ): Promise<Product> => {
    return prisma.product.update({
      where: { id },
      data,
    })
  },
  deleteProduct: async (id: number): Promise<Product> => {
    return prisma.product.delete({
      where: { id },
    })
  },
}
