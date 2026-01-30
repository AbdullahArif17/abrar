'use client'

import React from 'react'
import Link from 'next/link'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

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
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-white/95 backdrop-blur-lg supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <div className="container mx-auto px-4 h-18 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-2xl tracking-tighter text-primary flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">JTech Mart</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.label} 
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive(link.href) ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleCart}
            className="relative p-2 hover:bg-secondary rounded-full transition-colors text-foreground"
            aria-label="Open Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button 
            className="md:hidden p-2 hover:bg-secondary rounded-full text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background p-4 absolute w-full left-0 animate-in slide-in-from-top-2">
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
        </div>
      )}
    </nav>
  )
}
