'use client'

import { useEffect, useState, useRef } from 'react'
import { ProductCard } from './ProductCard'
import { Product } from '@/lib/products'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface FeaturedProductsCarouselProps {
  products: Product[]
}

export function FeaturedProductsCarousel({ products }: FeaturedProductsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [visibleCount, setVisibleCount] = useState(3)
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
      setCurrentIndex((prev) => (prev + 1) % totalSlides)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, products.length, visibleCount, totalSlides])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000)
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

  // If we can show all products, just display them in a grid
  if (products.length <= visibleCount) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {products.map((product) => (
          <ProductCard key={product._id || product.id} product={product} />
        ))}
      </div>
    )
  }

  // Get products for current slide
  const startIndex = currentIndex * visibleCount
  const endIndex = startIndex + visibleCount
  const currentProducts = products.slice(startIndex, endIndex)

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="overflow-hidden" ref={containerRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {currentProducts.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white/90 hover:bg-white border border-border rounded-full p-3 shadow-lg z-10 transition-all hover:scale-110 hidden md:block"
            aria-label="Previous products"
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white/90 hover:bg-white border border-border rounded-full p-3 shadow-lg z-10 transition-all hover:scale-110 hidden md:block"
            aria-label="Next products"
          >
            <ChevronRight className="w-6 h-6 text-primary" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {totalSlides > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === index
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Mobile Navigation */}
      {totalSlides > 1 && (
        <div className="flex justify-center gap-4 mt-6 md:hidden">
          <button
            onClick={goToPrevious}
            className="bg-white border border-border rounded-full p-2 shadow-md hover:bg-secondary transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-primary" />
          </button>
          <button
            onClick={goToNext}
            className="bg-white border border-border rounded-full p-2 shadow-md hover:bg-secondary transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-primary" />
          </button>
        </div>
      )}
    </div>
  )
}
