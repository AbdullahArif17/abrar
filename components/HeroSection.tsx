'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Shield, Truck, RefreshCw } from 'lucide-react'

export function HeroSection() {
  return (
    <>
    <section className="relative bg-gradient-to-br from-background via-secondary/20 to-background pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center space-y-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-sm font-medium text-primary">Premium Tech Essentials</span>
          </motion.div>
          <motion.h1 
            className="text-4xl xs:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-primary block mb-1 md:mb-2">Elevate Your</span>
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent block">Lifestyle</span>
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Discover the perfect blend of style and technology. Premium smart watches and audio devices designed for the modern individual.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Link
              href="/products"
              className="group bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 flex items-center justify-center gap-2 dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:font-bold dark:shadow-white/20"
            >
              Shop Collection
              <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 rounded-xl font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/10 transition-all active:scale-95"
            >
              Our Story
            </Link>
          </motion.div>

          {/* Trust Badges - inline */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-6 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <div className="flex items-center gap-2 text-muted-foreground/60">
              <Truck className="w-4 h-4" />
              <span className="text-xs font-semibold">Free Shipping 5000+</span>
            </div>
            <div className="w-px h-4 bg-border hidden sm:block" />
            <div className="flex items-center gap-2 text-muted-foreground/60">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-semibold">1 Year Warranty</span>
            </div>
            <div className="w-px h-4 bg-border hidden sm:block" />
            <div className="flex items-center gap-2 text-muted-foreground/60">
              <RefreshCw className="w-4 h-4" />
              <span className="text-xs font-semibold">7 Days Return</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Subtle Background Decorations */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl -z-0 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-primary/5 to-transparent rounded-full blur-3xl -z-0 pointer-events-none" />
    </section>

    {/* Modern Banner Image - Content Centered & Capped */}
    <motion.section
      className="w-full px-4 sm:px-6 lg:px-8 -mt-2 pb-12 md:pb-20 bg-background"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.8 }}
    >
      <div className="relative w-full max-w-7xl mx-auto rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-border/40 bg-muted/20 group aspect-[16/8] sm:aspect-[21/9] lg:aspect-[21/7] xl:h-[500px] 2xl:h-[600px] xl:aspect-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 z-10 pointer-events-none transition-all duration-700 group-hover:from-black/50" />
        <Image
          src="/j tech mart.jpg.jpeg"
          alt="J Tech Mart Banner Image"
          fill
          priority
          className="object-cover object-center group-hover:scale-[1.05] transition-transform duration-[2000ms] ease-out z-0"
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
        
        {/* Optional: Subtle Overlay Text for premium feel */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/60 via-transparent to-transparent">
          <p className="text-sm font-medium tracking-widest uppercase mb-2">Exclusive Technology</p>
          <h3 className="text-2xl md:text-3xl font-bold">Premium Quality Guaranteed</h3>
        </div>
      </div>
    </motion.section>
    </>
  )
}
