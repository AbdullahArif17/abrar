'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-primary text-primary-foreground py-2.5 px-4 relative">
      <div className="container mx-auto flex items-center justify-center gap-2 text-sm font-medium">
        <span className="animate-pulse">🔥</span>
        <span>FREE SHIPPING on orders over Rs. 5,000</span>
        <span className="mx-2">|</span>
        <span>7 Days Easy Returns</span>
        <span className="mx-2">|</span>
        <span>1 Year Warranty</span>
        <span className="animate-pulse">🔥</span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-primary-foreground/10 rounded-full transition-colors"
        aria-label="Close announcement"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
