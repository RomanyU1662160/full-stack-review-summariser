import type { Product, Review } from '../../generated/prisma/client'
import { ProductsService } from '../services'
import type { Request, Response } from 'express'

export const ProductsController = {
  fetchProductReviews: async (
    req: Request,
    res: Response
  ): Promise<Response<Review[]>> => {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid product ID' })
    }
    const reviews = await ProductsService.getProductReviews(id)
    return res.json(reviews)
  },
  fetchProductById: async (
    req: Request,
    res: Response
  ): Promise<Response<Product | null>> => {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid product ID' })
    }
    const product = await ProductsService.getProductById(id)
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    return res.json(product)
  },
  fetchAllProducts: async (
    _req: Request,
    res: Response
  ): Promise<Response<Product[]>> => {
    const products = await ProductsService.getAllProducts()
    return res.json(products)
  },
  createProduct: async (
    req: Request,
    res: Response
  ): Promise<Response<Product>> => {
    const { name, price, description } = req.body
    const newProduct = await ProductsService.createProduct({
      name,
      price,
      description,
    })
    return res.status(201).json(newProduct)
  },
  updateProduct: async (
    req: Request,
    res: Response
  ): Promise<Response<Product>> => {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid product ID' })
    }
    const { name, price, description } = req.body
    const updatedProduct = await ProductsService.updateProduct(id, {
      name,
      price,
      description,
    })
    return res.json(updatedProduct)
  },
  deleteProduct: async (
    req: Request,
    res: Response
  ): Promise<Response<void>> => {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid product ID' })
    }
    await ProductsService.deleteProduct(id)
    return res.status(204).send()
  },
}
