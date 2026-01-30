'use client';

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
    <div className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-primary/20 transition-all duration-500 hover:-translate-y-2">
      <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-secondary/30 to-secondary/10">
        <Image
          src={imageUrl}
          alt={product.title || product.name || 'Product'}
          fill
          className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-semibold text-primary shadow-lg">
            New
          </div>
        </div>
      </div>
      
      <div className="p-6 flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-2 px-2 py-1 bg-primary/10 rounded-full inline-block">
              {product.category?.replace('-', ' ')}
            </p>
            <h3 className="font-bold text-xl text-primary tracking-tight mb-1 group-hover:text-primary/80 transition-colors">
              {product.title || product.name}
            </h3>
          </div>
          <span className="font-bold text-2xl text-primary ml-4">
            ${product.price}
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5em] leading-relaxed">
          {product.description}
        </p>

        <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between gap-3">
          <Link 
            href={`/products/${product.slug}`} 
            className="flex-1 text-center bg-primary text-primary-foreground py-3 px-4 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
          >
            Add to Cart
          </Link>
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 text-center bg-secondary/50 text-primary border border-border py-3 px-4 rounded-xl text-sm font-semibold hover:bg-secondary transition-all hover:scale-105 active:scale-95"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
