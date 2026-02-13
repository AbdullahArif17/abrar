'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Search, User, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';
import { motion, AnimatePresence } from 'framer-motion';

export function MobileBottomNav() {
  const pathname = usePathname();
  const { items, toggleCart } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/products', label: 'Shop', icon: Search },
    { href: '/about', label: 'About', icon: User },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[60] pb-[env(safe-area-inset-bottom)]">
      <div className="bg-background/80 backdrop-blur-xl border-t border-border/40 px-6 py-3 flex items-center justify-between shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
        {navItems.map((item) => {
          const Active = isActive(item.href);
          return (
            <Link 
              key={item.label} 
              href={item.href}
              className="flex flex-col items-center gap-1 group relative"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "p-1.5 rounded-xl transition-colors",
                  Active ? "text-primary bg-primary/10" : "text-muted-foreground"
                )}
              >
                <item.icon className={cn("w-6 h-6", Active && "fill-current/10")} />
              </motion.div>
              <span className={cn(
                "text-[10px] font-bold tracking-tight transition-colors",
                Active ? "text-primary" : "text-muted-foreground"
              )}>
                {item.label}
              </span>
              {Active && (
                <motion.div 
                  layoutId="bottomNavDot"
                  className="absolute -top-1 w-1 h-1 rounded-full bg-primary" 
                />
              )}
            </Link>
          );
        })}

        {/* Cart Item Specialized */}
        <button 
          onClick={toggleCart}
          className="flex flex-col items-center gap-1 group relative"
        >
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="p-1.5 rounded-xl text-muted-foreground"
          >
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md dark:bg-white dark:text-black"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          <span className="text-[10px] font-bold tracking-tight text-muted-foreground">
            Cart
          </span>
        </button>
      </div>
    </div>
  );
}
