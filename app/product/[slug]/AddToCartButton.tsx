'use client'

import React from 'react'
import { useCartStore } from '@/store/useCartStore'
import { ShoppingCart } from 'lucide-react'

export function AddToCartButton({ product }: { product: any }) {
  const { addItem } = useCartStore()

  return (
    <button 
      onClick={() => addItem(product)}
      className="w-full md:w-auto bg-green-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
    >
      <ShoppingCart className="w-5 h-5" />
      Add to Cart
    </button>
  )
}
