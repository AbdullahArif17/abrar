'use client'

import { useEffect, useState, useRef } from 'react'
import { ProductCard } from './ProductCard'
import { Product } from '@/lib/products'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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
  const containerRef = useRef<HTMLDivElement>(null)

  // Determine visible count based on screen size
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

  // Calculate number of slides needed
  const totalSlides = Math.ceil(products.length / visibleCount)

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying || products.length <= visibleCount || totalSlides <= 1) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % totalSlides)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, products.length, visibleCount, totalSlides])

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 15000)
  }

  const goToPrevious = () => {
    goToSlide((currentIndex - 1 + totalSlides) % totalSlides)
  }

  const goToNext = () => {
    goToSlide((currentIndex + 1) % totalSlides)
  }

  if (products.length === 0) {
    return (
      <p className="col-span-full text-center text-muted-foreground py-20">
        No featured products found.
      </p>
    )
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="overflow-hidden relative min-h-[500px]" ref={containerRef}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
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

      {/* Navigation Arrows */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-background/90 hover:bg-background border border-border/40 rounded-full p-4 shadow-xl z-20 transition-all hover:scale-110 active:scale-95 hidden md:block group"
            aria-label="Previous products"
          >
            <ChevronLeft className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-background/90 hover:bg-background border border-border/40 rounded-full p-4 shadow-xl z-20 transition-all hover:scale-110 active:scale-95 hidden md:block group"
            aria-label="Next products"
          >
            <ChevronRight className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {totalSlides > 1 && (
        <div className="flex justify-center gap-3 mt-12">
          {Array.from({ length: totalSlides }).map((_, index) => {
            const active = currentIndex === index
            return (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  active ? 'w-12 bg-primary' : 'w-3 bg-border hover:bg-primary/30'
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
