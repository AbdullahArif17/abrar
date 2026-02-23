'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingCart, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export function CartDrawer() {
  const { isCartOpen, toggleCart, items, updateQuantity, removeItem } = useCartStore()
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-background/60 backdrop-blur-md z-[110]"
          />

          {/* Drawer / Bottom Sheet */}
          <motion.div
            initial={isMobile ? { y: '100%', x: 0 } : { x: '100%' }}
            animate={{ x: 0, y: 0 }}
            exit={isMobile ? { y: '100%', x: 0 } : { x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
            className={cn(
              "fixed right-0 top-0 h-full w-full sm:w-[90vw] sm:max-w-md bg-background border-l border-border/40 shadow-2xl z-[120] flex flex-col",
              "md:translate-y-0 max-md:top-auto max-md:bottom-0 max-md:h-[85vh] max-md:rounded-t-[2.5rem] max-md:border-t"
            )}
          >
            {/* Mobile Drag Handle */}
            <div className="flex justify-center p-4 md:hidden">
              <div className="w-12 h-1.5 bg-border/60 rounded-full" />
            </div>

            <div className="flex items-center justify-between px-6 py-5 md:p-8 border-b border-border/40">
              <div className="flex flex-col">
                <h2 className="text-xl md:text-2xl font-black tracking-tighter text-foreground uppercase">Inventory</h2>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary/40">{items.length} Units Ready</p>
              </div>
              <button 
                onClick={toggleCart} 
                className="p-3 hover:bg-secondary rounded-2xl transition-all active:scale-90 text-foreground"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4">
                  <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center border border-dashed border-primary/20">
                    <ShoppingCart className="w-10 h-10 opacity-20" />
                  </div>
                  <p className="text-lg font-bold tracking-tight uppercase opacity-40 italic">Empty Data Stream</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item._id} className="group flex gap-4 p-4 rounded-3xl border border-border/60 bg-card hover:border-primary/30 transition-all">
                      <div className="relative w-20 h-20 md:w-24 md:h-24 bg-secondary/50 rounded-2xl overflow-hidden flex-shrink-0 border border-border/40">
                        {item.images && item.images[0] && (
                          <Image 
                            src={urlFor(item.images[0]).url()} 
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            sizes="100px"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-black text-sm md:text-base line-clamp-1 text-foreground leading-tight uppercase tracking-tight">
                              {item.name}
                            </h3>
                            <button 
                              onClick={() => removeItem(item._id)}
                              className="text-muted-foreground hover:text-destructive p-1 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="mt-1 flex items-center gap-2">
                            {item.discountPrice ? (
                              <>
                                <span className="text-sm font-black text-primary tracking-tighter">Rs. {item.discountPrice.toLocaleString()}</span>
                                <span className="text-[10px] text-muted-foreground line-through font-bold opacity-40">Rs. {item.price.toLocaleString()}</span>
                              </>
                            ) : (
                              <span className="text-sm font-black text-primary tracking-tighter">Rs. {item.price.toLocaleString()}</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center bg-background rounded-xl border border-border/60 overflow-hidden shadow-sm">
                            <button 
                              className="p-2 hover:bg-secondary transition-colors text-foreground"
                              onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-black px-3 min-w-[3ch] text-center">{item.quantity}</span>
                            <button 
                              className="p-2 hover:bg-secondary transition-colors text-foreground"
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          
                          <div className="text-[10px] font-black uppercase tracking-widest text-primary/30">
                            Unit Total: Rs. {((item.discountPrice || item.price) * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 md:p-8 border-t border-border/40 bg-secondary/10 pb-[env(safe-area-inset-bottom,2rem)]">
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center px-2">
                      <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Logistics Summary</span>
                      <span className="text-xs font-black text-primary opacity-60 italic">Encrypted</span>
                  </div>
                  <div className="flex justify-between items-center bg-background p-5 rounded-2xl border border-border/40 shadow-sm">
                      <span className="text-sm font-black uppercase tracking-tight">Net Total</span>
                      <span className="font-black text-2xl text-primary tracking-tighter">Rs. {subtotal.toLocaleString()}</span>
                  </div>
                </div>
                <button className="w-full relative overflow-hidden group/checkout bg-primary text-primary-foreground py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all dark:bg-white dark:text-black text-xs">
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      Execute Acquisition
                      <ArrowRight className="w-4 h-4 group-hover/checkout:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/checkout:translate-x-full transition-transform duration-1000" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
