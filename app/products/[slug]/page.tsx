import { getProduct, urlFor } from '@/lib/sanity';
import { Product } from '@/lib/products';
import Image from 'next/image';
import Link from 'next/link';
import { Check, Truck, Shield, ArrowLeft } from 'lucide-react';

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

  const imageUrl = product.image ? (typeof product.image === 'string' ? product.image : urlFor(product.image).url()) : '/placeholder.jpg';

  return (
    <div className="min-h-screen bg-white">
        {/* Breadcrumb / Back */}
        <div className="bg-secondary/30 border-b border-border">
            <div className="container mx-auto px-4 py-4">
                <Link href="/products" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 w-fit">
                    <ArrowLeft className="w-4 h-4" /> Back to Collection
                </Link>
            </div>
        </div>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Image Gallery (Simple for now) */}
          <div className="space-y-4">
            <div className="aspect-square relative rounded-2xl overflow-hidden bg-secondary border border-border">
              <Image
                src={imageUrl}
                alt={product.title || product.name || 'Product Image'}
                fill
                className="object-cover object-center"
                priority
              />
            </div>
             {/* Thumbnail placeholders if we had multiple images */}
             {/* <div className="grid grid-cols-4 gap-4"> ... </div> */}
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-sm font-medium text-primary/60 uppercase tracking-widest mb-2">
                {product.category?.replace('-', ' ')}
              </p>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary mb-4">
                {product.title || product.name}
              </h1>
              <div className="text-3xl font-medium text-primary">
                ${product.price}
              </div>
            </div>

            <div className="prose prose-neutral max-w-none text-muted-foreground">
               <p>{product.description}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 border-t border-b border-border py-8">
                <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 bg-primary text-primary-foreground py-4 px-8 rounded-full font-bold text-lg hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20">
                        Add to Cart
                    </button>
                    {/* Quantity or Wishlist could go here */}
                </div>
                <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
                    <Check className="w-3 h-3 text-green-500" /> In Stock & Ready to Ship
                </p>
            </div>
            
            {/* Features / Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-secondary rounded-full text-primary">
                        <Truck className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm">Free Shipping</h4>
                        <p className="text-xs text-muted-foreground">On all orders over $50</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-secondary rounded-full text-primary">
                        <Shield className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm">2 Year Warranty</h4>
                        <p className="text-xs text-muted-foreground">Full coverage against defects</p>
                    </div>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
