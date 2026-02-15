'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-background via-secondary/20 to-background py-24 md:py-40 overflow-hidden">
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
              className="bg-background border-2 border-primary/20 px-8 py-4 rounded-xl font-semibold hover:bg-primary/5 hover:border-primary/40 transition-all hover:scale-105 active:scale-95 shadow-md hover:shadow-lg dark:bg-card dark:border-white/20 dark:hover:bg-white/10 dark:text-white dark:font-semibold"
            >
              Our Story
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Subtle Background Decorations */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl -z-0 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-primary/5 to-transparent rounded-full blur-3xl -z-0 pointer-events-none" />
    </section>
  )
}
