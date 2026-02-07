'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/products';
import { getProductImageUrl } from '@/lib/sanity';
import { ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const imageUrl = getProductImageUrl(product);
    
  return (
    <motion.div 
      className="group relative bg-card border border-border/50 rounded-3xl overflow-hidden hover:shadow-2xl hover:border-primary/30 transition-all duration-500 backdrop-blur-sm"
      whileHover={{ y: -12, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-secondary/30 to-secondary/10">
        <Image
          src={imageUrl}
          alt={product.title || product.name || 'Product'}
          fill
          className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {product.discountPrice && (
          <motion.div 
            className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-xl z-10 backdrop-blur-sm"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
          </motion.div>
        )}
      </div>
      
      <div className="p-6 md:p-7 flex flex-col gap-4">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-2.5 px-3 py-1.5 bg-primary/10 rounded-full inline-block">
              {product.category?.replace('-', ' ')}
            </p>
            <h3 className="font-bold text-lg md:text-xl text-primary tracking-tight mb-1 group-hover:text-primary/80 transition-colors line-clamp-2">
              {product.title || product.name}
            </h3>
          </div>
          <div className="flex flex-col items-end ml-4">
            {product.discountPrice ? (
              <>
                <span className="font-bold text-2xl text-primary">
                  Rs. {product.discountPrice.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  Rs. {product.price.toLocaleString()}
                </span>
                <span className="text-xs font-semibold text-green-600 mt-1">
                  {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                </span>
              </>
            ) : (
              <span className="font-bold text-2xl text-primary">
                Rs. {product.price.toLocaleString()}
          </span>
            )}
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5em] leading-relaxed">
          {product.description}
        </p>

        <div className="mt-auto pt-5 border-t border-border/50">
          <Link
            href={`/products/${product.slug}`}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 px-4 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl group/btn dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:font-bold"
          >
            <ShoppingBag className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            Buy Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
