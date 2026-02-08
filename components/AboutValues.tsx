'use client'

import { motion } from 'framer-motion'

export function AboutValues() {
  return (
    <section className="py-24 bg-zinc-900 text-white relative overflow-hidden dark:bg-black">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div 
            className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold text-white">Our Foundation</span>
          </motion.div>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our Values
          </motion.h2>
          <motion.p 
            className="text-white/90 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            The core principles that guide everything we do.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          <motion.div 
            className="group p-10 border border-white/20 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/15 hover:border-white/30 transition-all duration-300"
            whileHover={{ y: -8, scale: 1.02 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-3xl">✨</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Simplicity</h3>
            <p className="text-white/80 leading-relaxed">
              We believe that less is more. Our designs are clean, intuitive, and distraction-free.
            </p>
          </motion.div>
          <motion.div 
            className="group p-10 border border-white/20 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/15 hover:border-white/30 transition-all duration-300"
            whileHover={{ y: -8, scale: 1.02 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-3xl">💎</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Quality</h3>
            <p className="text-white/80 leading-relaxed">
              We never compromise on materials or craftsmanship. Every detail is considered.
            </p>
          </motion.div>
          <motion.div 
            className="group p-10 border border-white/20 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/15 hover:border-white/30 transition-all duration-300"
            whileHover={{ y: -8, scale: 1.02 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-3xl">🚀</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Innovation</h3>
            <p className="text-white/80 leading-relaxed">
              We push the boundaries of what's possible, constantly exploring new technologies.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
