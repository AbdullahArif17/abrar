'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { ProductCard } from './ProductCard'
import { Product } from '@/lib/products'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FeaturedProductsCarouselProps {
  products: Product[]
}

export function FeaturedProductsCarousel({ products }: FeaturedProductsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [visibleCount, setVisibleCount] = useState(3)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const updateVisibleCount = () => {
      if (typeof window === 'undefined') return
      if (window.innerWidth < 768) setVisibleCount(1)
      else if (window.innerWidth < 1024) setVisibleCount(2)
      else setVisibleCount(3)
    }

    updateVisibleCount()
    window.addEventListener('resize', updateVisibleCount)
    return () => window.removeEventListener('resize', updateVisibleCount)
  }, [])

  const totalSlides = Math.ceil(products.length / visibleCount)

  useEffect(() => {
    if (!isAutoPlaying || products.length <= visibleCount || totalSlides <= 1) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % totalSlides)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, products.length, visibleCount, totalSlides])

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 15000)
  }, [currentIndex])

  const goToPrevious = useCallback(() => {
    goToSlide((currentIndex - 1 + totalSlides) % totalSlides)
  }, [currentIndex, totalSlides, goToSlide])

  const goToNext = useCallback(() => {
    goToSlide((currentIndex + 1) % totalSlides)
  }, [currentIndex, totalSlides, goToSlide])

  if (products.length === 0) {
    return (
      <p className="col-span-full text-center text-muted-foreground py-20">
        No featured products found.
      </p>
    )
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 800 : -800,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 800 : -800,
      opacity: 0,
      scale: 0.95,
    })
  }

  return (
    <div className="relative group/carousel">
      {/* Carousel Container */}
      <div className="overflow-hidden relative min-h-[500px]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 280, damping: 30 },
              opacity: { duration: 0.25 },
              scale: { duration: 0.3 },
            }}
            className="absolute inset-0 w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {products.slice(currentIndex * visibleCount, (currentIndex + 1) * visibleCount).map((product) => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows - appear on hover */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 bg-background/95 hover:bg-background border border-border/50 rounded-full p-3 md:p-4 shadow-xl z-20 transition-all duration-300 hover:scale-110 active:scale-95 opacity-0 group-hover/carousel:opacity-100 hover:shadow-2xl"
            aria-label="Previous products"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 bg-background/95 hover:bg-background border border-border/50 rounded-full p-3 md:p-4 shadow-xl z-20 transition-all duration-300 hover:scale-110 active:scale-95 opacity-0 group-hover/carousel:opacity-100 hover:shadow-2xl"
            aria-label="Next products"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
          </button>
        </>
      )}

      {/* Bottom Controls: Dots + Autoplay Toggle */}
      {totalSlides > 1 && (
        <div className="flex items-center justify-center gap-4 mt-10">
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => {
              const active = currentIndex === index
              return (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "rounded-full transition-all duration-500 hover:bg-primary/50",
                    active ? 'w-8 h-2 bg-primary' : 'w-2 h-2 bg-border'
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              )
            })}
          </div>
          
          <div className="w-px h-4 bg-border" />
          
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={cn(
              "p-1.5 rounded-lg transition-all text-muted-foreground hover:text-foreground",
              isAutoPlaying ? "hover:bg-secondary" : "bg-secondary"
            )}
            aria-label={isAutoPlaying ? "Pause autoplay" : "Resume autoplay"}
          >
            {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}
    </div>
  )
}
