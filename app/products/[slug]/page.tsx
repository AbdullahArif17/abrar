import { getProduct, getProductImageUrl } from '@/lib/sanity';
import type { Metadata } from 'next';
import { Product } from '@/lib/products';
import Image from 'next/image';
import Link from 'next/link';
import { Check, Truck, Shield, ArrowLeft, Star } from 'lucide-react';
import { AddToCartButton } from '@/components/AddToCartButton';
import { ProductImageGallery } from '@/components/ProductImageGallery';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const title = product.title || product.name || 'Product';
  const description = product.description || `Shop ${title} at JTech Mart`;
  const imageUrl = getProductImageUrl(product);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [imageUrl],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Awaiting params for Next.js 15
  const product: Product = await getProduct(slug);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-secondary/20">
        <h1 className="text-2xl font-bold text-primary mb-4">Product Not Found</h1>
        <Link href="/products" className="text-primary hover:underline flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
      </div>
    );
  }

  const imageUrl = getProductImageUrl(product);

  return (
    <div className="min-h-screen bg-background">
        {/* Breadcrumb / Back */}
        <div className="bg-secondary/30 border-b border-border">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 py-3 md:py-4">
                <Link href="/products" className="text-xs md:text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 w-fit">
                    <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden sm:inline">Back to Collection</span><span className="sm:hidden">Back</span>
                </Link>
            </div>
        </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 items-start">
          
          {/* Product Image Gallery */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <ProductImageGallery product={product} />
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6 sm:gap-7 md:gap-8 lg:gap-10">
            <div className="space-y-3 sm:space-y-4">
              {/* Tags Row */}
              <div className="flex flex-wrap gap-2">
                <span className="text-xs sm:text-sm font-semibold text-primary/70 uppercase tracking-widest px-3 py-1 bg-primary/5 rounded-full">
                  {product.category?.replace('-', ' ')}
                </span>
                {product.productTags?.map((tag: string) => (
                  <span 
                    key={tag}
                    className={`px-3 py-1 text-xs sm:text-sm font-bold rounded-full ${
                      tag === 'bestseller' ? 'bg-orange-500 text-white' :
                      tag === 'new' ? 'bg-green-500 text-white' :
                      tag === 'limited' ? 'bg-red-500 text-white' :
                      tag === 'hot' ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' :
                      'bg-primary/10 text-primary'
                    }`}
                  >
                    {tag === 'bestseller' ? '🔥 Best Seller' :
                     tag === 'new' ? '✨ New' :
                     tag === 'limited' ? '⏰ Limited' :
                     tag === 'hot' ? '🔥 Hot' : tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary leading-tight">
                {product.title || product.name}
              </h1>
              
              {/* Rating & Reviews */}
              {(product.rating || product.reviewCount) && (
                <div className="flex items-center gap-3 text-sm sm:text-base">
                  {product.rating && (
                    <span className="flex items-center gap-1 text-yellow-500 font-semibold">
                      <Star className="w-5 h-5 fill-current" />
                      {product.rating.toFixed(1)}
                    </span>
                  )}
                  {product.reviewCount && product.reviewCount > 0 && (
                    <span className="text-muted-foreground">
                      ({product.reviewCount.toLocaleString()} reviews)
                    </span>
                  )}
                </div>
              )}
              
              <div className="flex flex-wrap items-baseline gap-3 sm:gap-4 pt-2">
                {product.discountPrice ? (
                  <>
                    <div className="flex flex-col gap-1">
                      <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
                        Rs. {product.discountPrice.toLocaleString()}
                      </span>
                      <span className="text-lg sm:text-xl md:text-2xl text-muted-foreground line-through">
                        Rs. {product.price.toLocaleString()}
                      </span>
                    </div>
                    <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm sm:text-base font-bold">
                      {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                    </span>
                  </>
                ) : (
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
                    Rs. {product.price.toLocaleString()}
                  </div>
                )}
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
               <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-normal">
                 {product.description}
               </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-5 sm:gap-6 border-t border-b border-border py-6 sm:py-8 md:py-10">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                    <AddToCartButton product={product} variant="large" className="flex-1 w-full text-base sm:text-lg" />
                </div>
                <p className="text-center text-sm sm:text-base text-muted-foreground flex items-center justify-center gap-2 font-medium">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" /> In Stock & Ready to Ship
                </p>
            </div>
            
            {/* Features List */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-4 sm:space-y-5">
                <h3 className="font-bold text-primary mb-4 text-lg sm:text-xl md:text-2xl">Key Features</h3>
                <ul className="space-y-3 sm:space-y-4">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-3 sm:gap-4 text-base sm:text-lg md:text-xl text-muted-foreground">
                      <Check className="w-5 h-5 sm:w-6 sm:h-6 text-primary mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed font-normal">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Features / Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 md:gap-8 pt-4">
                <div className="flex items-start gap-4 sm:gap-5 p-4 sm:p-5 rounded-xl bg-card border border-border/50">
                    <div className="p-3 sm:p-4 bg-secondary rounded-full text-primary flex-shrink-0">
                        <Truck className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-base sm:text-lg md:text-xl text-foreground mb-1">Free Shipping</h4>
                        <p className="text-sm sm:text-base text-muted-foreground">On all orders over Rs. 5,000</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 sm:gap-5 p-4 sm:p-5 rounded-xl bg-card border border-border/50">
                    <div className="p-3 sm:p-4 bg-secondary rounded-full text-primary flex-shrink-0">
                        <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-base sm:text-lg md:text-xl text-foreground mb-1">2 Year Warranty</h4>
                        <p className="text-sm sm:text-base text-muted-foreground">Full coverage against defects</p>
                    </div>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
