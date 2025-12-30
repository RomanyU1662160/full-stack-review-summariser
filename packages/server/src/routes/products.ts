import { Router } from 'express'
import type { Request, Response } from 'express'
import { prisma } from '../../prisma/prisma'

export const ProductsRouter: Router = Router()

ProductsRouter.get('/:id/reviews', async (req: Request, res: Response) => {
  const productId = Number(req.params.id)

  if (isNaN(productId)) {
    return res.status(400).json({ error: 'Invalid product ID' })
  }

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

  res.json(reviews)
})

ProductsRouter.get('/:id', async (req: Request, res: Response) => {
  res.send('Product details')
})

ProductsRouter.get('/', async (req: Request, res: Response) => {
  res.send('List of products')
})

ProductsRouter.post('/', async (req: Request, res: Response) => {
  res.send('Create a new product')
})

ProductsRouter.put('/:id', async (req: Request, res: Response) => {
  res.send(`Update product with ID ${req.params.id}`)
})

ProductsRouter.delete('/:id', async (req: Request, res: Response) => {
  res.send(`Delete product with ID ${req.params.id}`)
})
