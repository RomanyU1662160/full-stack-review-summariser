import type { Product } from '@/types/product'
import { Card } from '../ui/card'
import ReviewsList from '../reviews/ReviewsList'

type Props = {
  product: Product
}

const ProductDetails = ({ product }: Props) => {
  return (
    <>
      <h3 className="text-center font-bold text-3xl"> {product.name}</h3>
      <div className="flex min-h-96  gap-4 p-4 ">
        <div className="flex-1">
          <Card className=" m-4">
            <img
              loading="lazy"
              src={product.imageUrl || '/placeholder-image.png'}
              alt={product.name}
              height={200}
              width={400}
            />
          </Card>
          <div className="mt-4">
            <h4 className="text-center font-bold text-amber-700">
              {'£'}
              {product.price}
            </h4>
          </div>
        </div>
        <div className="flex-1 border">{product.description}</div>
      </div>
      <div className="border-t mt-4 pt-4">
        <ReviewsList productId={product.id} productName={product.name} />
      </div>
    </>
  )
}

export default ProductDetails
