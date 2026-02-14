'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/products';
import { getProductImageUrl } from '@/lib/sanity';
import { ShoppingBag, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

const tagStyles: Record<string, string> = {
  bestseller: 'bg-orange-500 text-white',
  new: 'bg-green-500 text-white',
  limited: 'bg-red-500 text-white',
  hot: 'bg-gradient-to-r from-orange-500 to-red-500 text-white',
}

const tagLabels: Record<string, string> = {
  bestseller: '🔥 Best Seller',
  new: '✨ New',
  limited: '⏰ Limited',
  hot: '🔥 Hot',
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
        
        {/* Tags Row */}
        <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2 z-10">
          {product.discountPrice && (
            <motion.span 
              className="bg-red-500 text-white px-2.5 py-1 rounded-full text-[10px] font-bold shadow-lg"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
            </motion.span>
          )}
          {product.productTags?.slice(0, 2).map((tag) => (
            <span 
              key={tag}
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold shadow-lg ${tagStyles[tag] || 'bg-primary text-white'}`}
            >
              {tagLabels[tag] || tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="p-3 md:p-6 flex flex-col gap-2 md:gap-3">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-[8px] md:text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-1 md:mb-2 px-2 py-0.5 md:py-1 bg-secondary rounded-full inline-block">
              {product.category?.replace('-', ' ')}
            </p>
            <h3 className="font-bold text-sm md:text-lg text-foreground tracking-tight mb-0.5 md:mb-1 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
              {product.title || product.name}
            </h3>
          </div>
        </div>

        {/* Reviews */}
        {(product.reviewCount || product.rating) && (
          <div className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs">
            {product.rating && (
              <span className="flex items-center gap-0.5 text-yellow-500 font-medium">
                <Star className="w-3 h-3 md:w-3.5 md:h-3.5 fill-current" />
                {product.rating.toFixed(1)}
              </span>
            )}
            {product.reviewCount && product.reviewCount > 0 && (
              <span className="text-muted-foreground hidden xs:inline-block">
                ({product.reviewCount})
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-1.5 md:gap-2 flex-wrap">
          {product.discountPrice ? (
            <>
              <span className="font-bold text-sm md:text-xl text-foreground">
                Rs. {formatPrice(product.discountPrice)}
              </span>
              <span className="text-[10px] md:text-sm text-muted-foreground line-through">
                Rs. {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="font-bold text-sm md:text-xl text-foreground">
              Rs. {formatPrice(product.price)}
            </span>
          )}
        </div>
        
        <p className="hidden md:block text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="mt-auto pt-2 md:pt-4 border-t border-border/50">
          <Link
            href={`/products/${product.slug}`}
            className="w-full flex items-center justify-center gap-1.5 md:gap-2 bg-primary text-primary-foreground py-2 md:py-3 px-3 md:px-4 rounded-xl text-xs md:text-sm font-semibold hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-xl group/btn dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:font-bold"
          >
            <ShoppingBag className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover/btn:scale-110 transition-transform" />
            <span className="hidden xs:inline">{product.discountPrice ? 'Limited Deal' : 'Buy Now'}</span>
            <span className="xs:hidden">Buy</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

