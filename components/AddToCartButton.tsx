'use client'

import React, { useState } from 'react'
import { useCartStore } from '@/store/useCartStore'
import { ShoppingCart, Check } from 'lucide-react'

interface AddToCartButtonProps {
  product: {
    _id: string;
    name?: string;
    title?: string;
    price: number;
    images?: any;
    image?: any;
    slug: string | { current: string };
    description?: string;
    category?: string;
  };
  variant?: 'default' | 'large' | 'small';
  className?: string;
}

export function AddToCartButton({ product, variant = 'default', className = '' }: AddToCartButtonProps) {
  const { addItem } = useCartStore()
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    // Transform product to match cart store format
    const cartProduct = {
      _id: product._id,
      name: product.name || product.title || 'Product',
      price: product.price,
      images: product.images || (product.image ? [product.image] : []),
      slug: typeof product.slug === 'string' 
        ? { current: product.slug } 
        : product.slug,
      description: product.description || '',
    }

    addItem(cartProduct)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const baseStyles = "flex items-center justify-center gap-2 font-semibold transition-all hover:scale-105 active:scale-95"
  
  const variantStyles = {
    default: "bg-primary text-primary-foreground py-3 px-6 rounded-xl text-sm shadow-md hover:shadow-lg",
    large: "bg-primary text-primary-foreground py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl",
    small: "bg-primary text-primary-foreground py-2 px-4 rounded-lg text-xs shadow-sm hover:shadow-md"
  }

  return (
    <button 
      onClick={handleAddToCart}
      disabled={added}
      className={`${baseStyles} ${variantStyles[variant]} ${added ? 'bg-green-600 hover:bg-green-600' : 'hover:bg-primary/90'} ${className}`}
    >
      {added ? (
        <>
          <Check className="w-5 h-5" />
          Added!
        </>
      ) : (
        <>
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </>
      )}
    </button>
  )
}
