import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold text-xl mb-4">ZERO.</h3>
            <p className="text-gray-500 text-sm mb-6">
              Premium tech, simplified.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-400 hover:text-black transition-colors"><Facebook className="w-5 h-5" /></Link>
              <Link href="#" className="text-gray-400 hover:text-black transition-colors"><Instagram className="w-5 h-5" /></Link>
              <Link href="#" className="text-gray-400 hover:text-black transition-colors"><Twitter className="w-5 h-5" /></Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-sm mb-4">Shop</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/category/smart-watches" className="hover:text-black transition-colors">Smart Watches</Link></li>
              <li><Link href="/category/earbuds" className="hover:text-black transition-colors">Audio</Link></li>
              <li><Link href="/category/headphones" className="hover:text-black transition-colors">Headphones</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="#" className="hover:text-black transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm mb-4">Help</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="#" className="hover:text-black transition-colors">Shipping</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Returns</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Zero Lifestyle. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
                <Link href="#" className="hover:text-black">Privacy</Link>
                <Link href="#" className="hover:text-black">Terms</Link>
            </div>
        </div>
      </div>
    </footer>
  )
}
