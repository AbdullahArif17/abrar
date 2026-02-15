'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/products';
import { getProductImageUrl } from '@/lib/sanity';
import { ShoppingBag, Star, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

const tagStyles: Record<string, string> = {
  bestseller: 'bg-orange-500/90 text-white backdrop-blur-md',
  new: 'bg-emerald-500/90 text-white backdrop-blur-md',
  limited: 'bg-rose-500/90 text-white backdrop-blur-md',
  hot: 'bg-gradient-to-r from-orange-500/90 to-red-600/90 text-white backdrop-blur-md',
}

const tagLabels: Record<string, string> = {
  bestseller: '🔥 Bestseller',
  new: '✨ New Arrival',
  limited: '⏰ Limited',
  hot: '🔥 Hot Deal',
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = getProductImageUrl(product);
  
  return (
    <motion.div 
      className="group relative bg-card/40 border border-border/40 rounded-[2.5rem] overflow-hidden hover:shadow-[0_22px_70px_-20px_rgba(0,0,0,0.15)] transition-all duration-700 backdrop-blur-sm"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
    >
      <Link href={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden rounded-t-[2.5rem]">
        <Image
          src={imageUrl}
          alt={product.title || product.name || 'Product'}
          fill
          className="object-cover object-center group-hover:scale-110 transition-transform duration-[1.2s] ease-out"
          sizes="(max-width: 768px) 50vw, 33vw"
          loading="lazy"
        />
        
        {/* Shimmer Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Soft Shadow at bottom of image */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Tags */}
        <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2 z-10">
          {product.discountPrice && (
            <motion.span 
              className="bg-red-500 text-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-xl border border-white/20"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% Save
            </motion.span>
          )}
          {product.productTags?.slice(0, 1).map((tag) => (
            <span 
              key={tag}
              className={`px-3 py-1.5 rounded-full text-[10px] font-bold shadow-xl border border-white/10 ${tagStyles[tag] || 'bg-primary/90 text-white backdrop-blur-md'}`}
            >
              {tagLabels[tag] || tag}
            </span>
          ))}
        </div>
      </Link>
      
      <div className="p-5 md:p-7 flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">
              {product.category?.replace('-', ' ') || 'Premium'}
            </span>
            {product.rating && (
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <span className="text-[10px] font-bold text-yellow-600">{product.rating.toFixed(1)}</span>
              </div>
            )}
          </div>
          
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-bold text-base md:text-xl text-foreground tracking-tight group-hover:text-primary transition-colors duration-300 line-clamp-1">
              {product.title || product.name}
            </h3>
          </Link>
        </div>

        {/* Price Section */}
        <div className="flex items-baseline gap-2 pt-1">
          {product.discountPrice ? (
            <>
              <span className="font-black text-lg md:text-2xl text-primary tracking-tight">
                Rs. {formatPrice(product.discountPrice)}
              </span>
              <span className="text-xs md:text-sm text-muted-foreground/60 line-through font-medium">
                Rs. {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="font-black text-lg md:text-2xl text-primary tracking-tight">
              Rs. {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-3 mt-1">
          <Link
            href={`/products/${product.slug}`}
            className="group/btn relative w-full overflow-hidden bg-primary text-primary-foreground py-3.5 px-6 rounded-2xl text-xs md:text-sm font-black transition-all duration-500 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] active:scale-[0.97] dark:bg-white dark:text-black dark:hover:bg-gray-100 flex items-center justify-center gap-2"
          >
            <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-[300%] transition-transform duration-1000 ease-in-out" />
            <ShoppingBag className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
            <span className="relative">
              {product.discountPrice ? 'Limited Deal' : 'Explore Now'}
            </span>
            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
