import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-secondary/40 to-white border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="font-bold text-xl mb-4 tracking-tighter bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">JTech Mart</h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              Premium tech essentials for the modern lifestyle. Simplified, elegant, and built to last.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-sm mb-4">Shop</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/products" className="hover:text-primary transition-colors">All Products</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">Smart Watches</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">Audio</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm mb-4">Support</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} JTech Mart. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
                <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
            </div>
        </div>
      </div>
    </footer>
  )
}
