'use client'

import { Newsletter } from './Newsletter'
import { motion } from 'framer-motion'

export function NewsletterSection() {
  return (
    <section className="py-24 bg-zinc-900 text-white relative overflow-hidden dark:bg-black">
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Join the JTech Mart Community
        </motion.h2>
        <motion.p 
          className="text-zinc-400 mb-10 max-w-lg mx-auto text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Subscribe to our newsletter for exclusive offers, new arrivals, and tech tips.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Newsletter />
        </motion.div>
      </div>
    </section>
  )
}
