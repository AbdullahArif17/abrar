import { cn } from '@/lib/utils'

interface ProductTagProps {
  type: 'bestseller' | 'new' | 'limited' | 'hot' | 'sale'
  className?: string
}

const tagStyles = {
  bestseller: 'bg-orange-500 text-white',
  new: 'bg-green-500 text-white',
  limited: 'bg-red-500 text-white',
  hot: 'bg-gradient-to-r from-orange-500 to-red-500 text-white',
  sale: 'bg-primary text-primary-foreground'
}

const tagLabels = {
  bestseller: '🔥 Best Seller',
  new: '✨ New',
  limited: '⏰ Limited Stock',
  hot: '🔥 Hot',
  sale: 'Sale'
}

export function ProductTag({ type, className }: ProductTagProps) {
  return (
    <span 
      className={cn(
        'inline-flex items-center gap-1 px-1.5 md:px-2.5 py-0.5 md:py-1 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-wide shadow-md',
        tagStyles[type],
        className
      )}
    >
      {tagLabels[type]}
    </span>
  )
}

interface DiscountBadgeProps {
  originalPrice: number
  salePrice: number
  className?: string
}

export function DiscountBadge({ originalPrice, salePrice, className }: DiscountBadgeProps) {
  const discountPercent = Math.round(((originalPrice - salePrice) / originalPrice) * 100)
  
  if (discountPercent <= 0) return null
  
  return (
    <span 
      className={cn(
        'inline-flex items-center px-2 py-1 bg-red-500 text-white rounded-md text-xs font-bold',
        className
      )}
    >
      {discountPercent}% OFF
    </span>
  )
}

interface ReviewBadgeProps {
  count: number
  rating?: number
  className?: string
}

export function ReviewBadge({ count, rating, className }: ReviewBadgeProps) {
  return (
    <div className={cn('flex items-center gap-1 text-xs text-muted-foreground', className)}>
      {rating && (
        <span className="flex items-center gap-0.5 text-yellow-500">
          ★ {rating.toFixed(1)}
        </span>
      )}
      <span>({count.toLocaleString()} reviews)</span>
    </div>
  )
}
