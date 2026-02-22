'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Menu, X, ChevronRight } from 'lucide-react'
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
      <div className="container mx-auto px-4 md:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link 
            href="/" 
            className="flex items-center gap-2 transition-opacity"
            aria-label="JTech Mart Home"
          >
            <Image
              src="/J Tech Mart Logo-01.png"
              alt="JTech Mart Logo"
              width={100}
              height={100}
              className="h-12 w-auto md:h-18"
              priority
            />
            <span className="font-black text-xl md:text-2xl tracking-tighter text-primary hidden xs:inline-block">
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
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[90] bg-background/60 backdrop-blur-md md:hidden"
            />
            
            {/* Drawer */}
            <motion.div 
              className="fixed top-0 right-0 bottom-0 z-[100] w-[85%] max-w-[400px] bg-background border-l border-border/40 shadow-2xl md:hidden flex flex-col touch-none"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              drag="x"
              dragConstraints={{ left: 0, right: 300 }}
              dragElastic={0.05}
              onDragEnd={(_, info) => {
                if (info.offset.x > 50 || info.velocity.x > 500) {
                  setIsMobileMenuOpen(false);
                }
              }}
            >
              {/* Drag Handle Indicator */}
              <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1 h-12 bg-border/40 rounded-full" />

              <div className="p-6 flex items-center justify-between border-b border-border/40">
                <span className="font-black text-xl tracking-tighter text-primary">MENU</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-secondary rounded-xl transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-8">
                <div className="flex flex-col px-6 gap-4">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                    >
                      <Link 
                        href={link.href}
                        className={cn(
                          "flex items-center justify-between py-4 px-6 rounded-2xl text-2xl font-black tracking-tighter transition-all border border-transparent",
                          isActive(link.href) 
                            ? "text-primary bg-primary/10 border-primary/20 scale-[1.02]" 
                            : "text-muted-foreground hover:text-primary hover:bg-secondary/50"
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                        <ChevronRight className={cn(
                          "w-6 h-6 transition-transform",
                          isActive(link.href) ? "opacity-100" : "opacity-0"
                        )} />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="p-8 border-t border-border/40 flex items-center justify-between bg-secondary/20">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Appearance</span>
                <ThemeToggle />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
