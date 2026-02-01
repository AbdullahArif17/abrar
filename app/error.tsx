'use client'

import { useEffect } from 'react'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/20 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-primary mb-2">Something went wrong!</h1>
          <p className="text-muted-foreground mb-4">
            We're sorry, but something unexpected happened. Please try again.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}
