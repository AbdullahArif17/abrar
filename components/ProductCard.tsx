import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/products';
import { urlFor } from '@/lib/sanity';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const imageUrl = product.image ? (typeof product.image === 'string' ? product.image : urlFor(product.image).url()) : '/placeholder.jpg';
    
  return (
    <div className="group relative bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="aspect-square relative overflow-hidden bg-secondary/50">
        <Image
          src={imageUrl}
          alt={product.title || product.name || 'Product'}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1">
              {product.category?.replace('-', ' ')}
            </p>
            <h3 className="font-semibold text-lg text-primary tracking-tight">
              {product.title || product.name}
            </h3>
          </div>
          <span className="font-medium text-lg text-primary">
            ${product.price}
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5em]">
          {product.description}
        </p>

        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between gap-4">
          <Link 
            href={`/products/${product.slug}`} 
            className="flex-1 text-center bg-primary text-primary-foreground py-2.5 px-4 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Add to Cart
          </Link>
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 text-center bg-secondary text-secondary-foreground py-2.5 px-4 rounded-md text-sm font-medium hover:bg-secondary/80 transition-colors"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
