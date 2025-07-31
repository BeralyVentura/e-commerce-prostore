import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getProductBySlug } from '@/lib/actions/product.actions';
import { notFound } from 'next/navigation';
import ProductPrice from '@/components/shared/product/product-price';
import ProductImages from '@/components/shared/product/product-images';
import AddToCart from '@/components/shared/product/add-to-cart';
import { getMyCart } from '@/lib/actions/cart.actions';
import ReviewList from './review-list';
import { auth } from '@/auth';
import Rating from '@/components/shared/product/rating';

const ProductDetailsPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const session = await auth();
  const userId = session?.user?.id;
  const cart = await getMyCart();

  return (
    <>
      <section className='px-6 md:px-12 py-10 bg-white rounded-2xl shadow-xl transition-all duration-300'>
        <div className='grid grid-cols-1 md:grid-cols-5 gap-10'>
          {/* Images Column */}
          <div className='col-span-2'>
            <ProductImages images={product.images} />
          </div>

          {/* Details Column */}
          <div className='col-span-2 flex flex-col justify-between gap-6'>
            <div className='space-y-3'>
              <p className='text-sm text-muted-foreground uppercase tracking-wide'>
                {product.brand} • {product.category}
              </p>
              <h1 className='text-3xl font-bold text-gray-900'>{product.name}</h1>
              <div className='flex items-center gap-2'>
                <Rating value={Number(product.rating)} />
                <span className='text-sm text-gray-500'>({product.numReviews} reviews)</span>
              </div>
              <ProductPrice
                value={Number(product.price)}
                className='w-fit rounded-full bg-green-200 text-green-900 px-6 py-2 text-lg font-semibold shadow-inner'
              />
            </div>
            <div>
              <p className='text-lg font-medium text-gray-800 mb-1'>Description</p>
              <p className='text-gray-600 leading-relaxed'>{product.description}</p>
            </div>
          </div>

          {/* Action Column */}
          <div className='col-span-1'>
            <Card className='rounded-xl shadow-md border border-gray-200'>
              <CardContent className='p-5 space-y-4'>
                <div className='flex justify-between items-center text-sm text-gray-700'>
                  <span>Price</span>
                  <ProductPrice value={Number(product.price)} />
                </div>
                <div className='flex justify-between items-center text-sm'>
                  <span>Status</span>
                  {product.stock > 0 ? (
                    <Badge className='bg-emerald-100 text-emerald-800'>In Stock</Badge>
                  ) : (
                    <Badge variant='destructive'>Out Of Stock</Badge>
                  )}
                </div>
                {product.stock > 0 && (
                  <div className='pt-4'>
                    <AddToCart
                      cart={cart}
                      item={{
                        productId: product.id,
                        name: product.name,
                        slug: product.slug,
                        price: product.price,
                        qty: 1,
                        image: product.images![0],
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className='mt-16 px-6 md:px-12'>
        <h2 className='text-2xl font-bold text-gray-800 mb-6 border-b pb-2'>Customer Reviews</h2>
        <ReviewList
          userId={userId || ''}
          productId={product.id}
          productSlug={product.slug}
        />
      </section>
    </>
  );
};

export default ProductDetailsPage;
