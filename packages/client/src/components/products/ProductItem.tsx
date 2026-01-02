import type { Product } from '@/types/product'
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Button } from '../ui/button'
import { Link } from 'react-router'

type ProductItemProps = {
  product: Product
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Card className="shadow-md flex flex-col h-full">
      <CardHeader className="flex-1">
        <CardTitle className="text-orange-500 text-lg md:text-xl">
          {product.name}
        </CardTitle>
        <div className="h-48 my-4 flex justify-center items-center overflow-hidden rounded-md bg-gray-50">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-contain"
          />
        </div>
        <CardDescription className="text-sm line-clamp-3">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardAction className="mt-auto p-4 pt-0">
        <Button asChild className="w-full text-orange-400">
          <Link to={`product/${product.id}`}>View Product</Link>
        </Button>
      </CardAction>
    </Card>
  )
}

export default ProductItem
