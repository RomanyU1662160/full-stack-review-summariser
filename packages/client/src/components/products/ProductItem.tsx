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
    <Card className=" shadow-md">
      <CardHeader>
        <CardTitle className="text-blue-500">{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardAction className="self-end pr-4 pb-1">
        <Button asChild>
          <Link to={`products/product/${product.id}`}>View Product</Link>
        </Button>
      </CardAction>
    </Card>
  )
}

export default ProductItem
