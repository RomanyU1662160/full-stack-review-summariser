import type { Product } from '@/types/product'
import { Card } from '../ui/card'
import ReviewsList from '../reviews/ReviewsList'
import ReviewSummary from '../reviews/AI-Summary'

type Props = {
  product: Product
}

const ProductDetails = ({ product }: Props) => {
  return (
    <>
      <h3 className="text-center font-bold text-2xl md:text-3xl px-4">
        {' '}
        {product.name}
      </h3>
      <div className="flex flex-col md:flex-row gap-4 p-4 min-h-96">
        <div className="flex-1 flex flex-col">
          <Card className="w-full overflow-hidden">
            <img
              loading="lazy"
              src={product.imageUrl || '/placeholder-image.png'}
              alt={product.name}
              className="w-full h-48 md:h-64 object-contain"
            />
          </Card>
          <div className="mt-4">
            <h4 className="text-center font-bold text-lg md:text-xl text-amber-700">
              £{product.price}
            </h4>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <h3 className="text-start font-bold text-lg md:text-xl text-amber-600">
            Description:
          </h3>
          <p className="text-sm md:text-base">{product.description}</p>
        </div>
      </div>
      <div className="pt-4 flex flex-col px-4">
        <ReviewSummary productId={product.id} />
      </div>
      <div className=" mt-4 pt-4">
        <ReviewsList productId={product.id} productName={product.name} />
      </div>
    </>
  )
}

export default ProductDetails
