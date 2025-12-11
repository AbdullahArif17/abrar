import { Search, ShoppingCart } from "lucide-react"

export function Header() {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">Z</span>
            </div>
            <span className="font-bold text-xl">ZERO</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-green-600">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-green-600">
              Smart Watches
            </a>
            <a href="#" className="text-gray-700 hover:text-green-600">
              Zero Earbuds
            </a>
            <a href="#" className="text-gray-700 hover:text-green-600">
              Headphones
            </a>
            <a href="#" className="text-gray-700 hover:text-green-600">
              Azadi Sale
            </a>
            <a href="#" className="text-gray-700 hover:text-green-600">
              Vision 2025
            </a>
            <a href="#" className="text-gray-700 hover:text-green-600">
              Support
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Search className="w-5 h-5 text-gray-600" />
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
