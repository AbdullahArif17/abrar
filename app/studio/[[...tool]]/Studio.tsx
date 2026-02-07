'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'
import { useEffect } from 'react'

export function Studio() {
  useEffect(() => {
    // Suppress jsdom CSS errors in console
    const originalError = console.error
    console.error = (...args) => {
      if (
        typeof args[0] === 'string' &&
        args[0].includes('default-stylesheet.css')
      ) {
        return
      }
      originalError.apply(console, args)
    }

    return () => {
      console.error = originalError
    }
  }, [])

  return <NextStudio config={config} />
}
