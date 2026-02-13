'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './ThemeToggle'
import { motion, AnimatePresence } from 'framer-motion'

export function Navbar() {
  const { items, toggleCart } = useCartStore()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const pathname = usePathname();

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 shadow-sm">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 h-24 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            href="/" 
            className="flex items-center gap-3 transition-opacity"
            aria-label="JTech Mart Home"
          >
            <Image
              src="/J Tech Mart Logo-01.png"
              alt="JTech Mart Logo"
              width={80}
              height={80}
              className="h-14 w-auto md:h-[70px] lg:h-20"
              priority
            />
            <span className="font-extrabold text-2xl md:text-3xl lg:text-4xl tracking-tight text-primary hidden sm:inline-block">
              JTech Mart
            </span>
        </Link>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
            <Link 
              href={link.href}
              className={cn(
                  "text-sm font-semibold transition-all relative px-4 py-2 rounded-lg",
                  isActive(link.href) 
                    ? "text-primary bg-primary/5" 
                    : "text-muted-foreground hover:text-primary hover:bg-secondary/50"
              )}
            >
              {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
            </Link>
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <motion.button 
            onClick={toggleCart}
            className="relative p-2.5 hover:bg-secondary rounded-xl transition-all text-foreground group"
            aria-label="Open Cart"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <motion.span 
                className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[11px] font-bold min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center shadow-lg dark:bg-white dark:text-black"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                {cartCount}
              </motion.span>
            )}
          </motion.button>

          <motion.button 
            className="md:hidden p-2 hover:bg-secondary rounded-full text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center touch-none"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            drag="x"
            dragConstraints={{ left: 0, right: 100 }}
            dragElastic={0.05}
            onDragEnd={(_, info) => {
              if (info.offset.x > 100) {
                setIsMobileMenuOpen(false);
              }
            }}
          >
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-8 right-8 p-3 hover:bg-secondary rounded-full"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <Link 
                    href={link.href}
                    className={cn(
                      "text-4xl font-black tracking-tighter transition-all",
                      isActive(link.href) ? "text-primary scale-110" : "text-muted-foreground hover:text-primary"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="absolute bottom-20">
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
