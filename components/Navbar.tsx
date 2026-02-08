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

      {/* Mobile Menu */}
      <AnimatePresence>
      {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden border-t border-border bg-background p-4 absolute w-full left-0"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.label} 
                href={link.href}
                className={cn(
                  "text-base font-medium py-2 border-b border-border/50 last:border-0",
                  isActive(link.href) ? "text-primary" : "text-muted-foreground"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          </motion.div>
      )}
      </AnimatePresence>
    </nav>
  )
}
