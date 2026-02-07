'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Trash2 } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'

export function CartDrawer() {
  const { isCartOpen, toggleCart, items, updateQuantity, removeItem } = useCartStore()

  const subtotal = items.reduce((acc, item) => {
    const itemPrice = item.discountPrice || item.price
    return acc + (itemPrice * item.quantity)
  }, 0)

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[90vw] sm:max-w-md bg-background border-l border-border shadow-xl z-[70] flex flex-col"
          >
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
              <h2 className="text-lg md:text-xl font-bold text-foreground">Shopping Cart ({items.length})</h2>
              <button onClick={toggleCart} className="p-2 hover:bg-secondary rounded-full transition-colors text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <p className="text-base">Your cart is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item._id} className="flex gap-3 md:gap-4 p-3 rounded-lg border border-border bg-card">
                    <div className="relative w-16 h-16 md:w-20 md:h-20 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                      {item.images && item.images[0] && (
                        <Image 
                          src={urlFor(item.images[0]).url()} 
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 64px, 80px"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm md:text-base line-clamp-2 text-foreground">{item.name}</h3>
                      <div className="mt-1">
                        {item.discountPrice ? (
                          <>
                            <p className="text-sm font-bold text-primary">Rs. {item.discountPrice.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground line-through">Rs. {item.price.toLocaleString()}</p>
                          </>
                        ) : (
                          <p className="text-sm font-bold text-primary">Rs. {item.price.toLocaleString()}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 md:gap-3 mt-2">
                        <div className="flex items-center border border-border rounded-md bg-background">
                          <button 
                            className="p-1.5 hover:bg-secondary transition-colors text-foreground"
                            onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3 md:w-4 md:h-4" />
                          </button>
                          <span className="text-xs md:text-sm px-2 font-medium text-foreground min-w-[2ch] text-center">{item.quantity}</span>
                          <button 
                            className="p-1.5 hover:bg-secondary transition-colors text-foreground"
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3 md:w-4 md:h-4" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(item._id)}
                          className="text-destructive hover:text-destructive/80 p-1.5 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-4 md:p-6 border-t border-border bg-card">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-base font-medium text-foreground">Subtotal</span>
                    <span className="font-bold text-lg md:text-xl text-primary">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <button className="w-full bg-primary text-primary-foreground py-3 md:py-4 rounded-xl font-bold hover:bg-primary/90 transition-colors dark:bg-white dark:text-black dark:hover:bg-gray-200 text-base md:text-lg">
                    Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
