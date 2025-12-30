import { Router } from 'express'
import { ProductsController } from '../controllers/products.controller'

export const ProductsRouter: Router = Router()

ProductsRouter.get('/:id/reviews', ProductsController.fetchProductReviews)
ProductsRouter.get('/:id', ProductsController.fetchProductById)
ProductsRouter.get('/', ProductsController.fetchAllProducts)
ProductsRouter.post('/', ProductsController.createProduct)
ProductsRouter.put('/:id', ProductsController.updateProduct)
ProductsRouter.delete('/:id', ProductsController.deleteProduct)
