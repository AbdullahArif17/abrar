'use client'

import { motion } from 'framer-motion'

export function AboutHero() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-background via-secondary/20 to-background relative overflow-hidden">
      <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
        <motion.div 
          className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-semibold text-primary">About Us</span>
        </motion.div>
        <motion.h1 
          className="text-5xl md:text-7xl font-bold tracking-tight text-primary mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Building the Future of Tech
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-muted-foreground leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          At JTech Mart, we believe in the power of minimalism and technology. Our mission is to create products that integrate seamlessly into your life.
        </motion.p>
      </div>
    </section>
  )
}
