import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ProductPrice from './product-price';
import { Product } from '@/types';
import Rating from './rating';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className='w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-300'>
      <CardHeader className='p-0'>
        <Link href={`/product/${product.slug}`} className='block group relative'>
          <Image
            src={product.images[0]}
            alt={product.name}
            height={300}
            width={300}
            className='object-cover w-full h-[300px] group-hover:scale-105 transition-transform duration-300 ease-in-out'
            priority
          />
          {product.stock === 0 && (
            <div className='absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md shadow'>
              Agotado
            </div>
          )}
        </Link>
      </CardHeader>

      <CardContent className='p-5 flex flex-col gap-2'>
        <div className='text-xs text-gray-500 uppercase tracking-wide'>
          {product.brand}
        </div>

        <Link href={`/product/${product.slug}`}>
          <h2 className='text-base font-semibold text-gray-800 hover:text-primary transition'>
            {product.name}
          </h2>
        </Link>

        <div className='flex items-center justify-between mt-2'>
          <Rating value={Number(product.rating)} />
          {product.stock > 0 ? (
            <ProductPrice value={Number(product.price)} />
          ) : (
            <p className='text-red-500 font-semibold text-sm'>Sin stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
