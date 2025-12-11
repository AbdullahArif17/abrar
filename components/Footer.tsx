import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">Z</span>
                </div>
                <span className="font-bold text-xl">ZERO</span>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Experience the future of lifestyle technology with our premium range of smart wearables and audio devices.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-green-500 transition-colors"><Facebook className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-green-500 transition-colors"><Instagram className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-green-500 transition-colors"><Twitter className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-green-500 transition-colors"><Youtube className="w-5 h-5" /></Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-green-500">Products</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/category/smart-watches" className="hover:text-white transition-colors">Smart Watches</Link></li>
              <li><Link href="/category/earbuds" className="hover:text-white transition-colors">Wireless Earbuds</Link></li>
              <li><Link href="/category/headphones" className="hover:text-white transition-colors">Headphones</Link></li>
              <li><Link href="/sale" className="hover:text-white transition-colors">Azadi Sale</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-green-500">Support</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-white transition-colors">Track Your Order</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Warranty & Returns</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
             <h3 className="font-bold text-lg mb-6 text-green-500">Get in Touch</h3>
             <ul className="space-y-3 text-sm text-gray-400">
                <li>Email: support@zerolifestyle.co</li>
                <li>Phone: +92 300 1234567</li>
                <li>Hours: Mon-Sat, 10am - 7pm</li>
             </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Zero Lifestyle. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
                <Link href="#" className="hover:text-white">Privacy Policy</Link>
                <Link href="#" className="hover:text-white">Terms of Service</Link>
            </div>
        </div>
      </div>
    </footer>
  )
}
