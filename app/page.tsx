import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { getFeaturedProducts } from '@/lib/sanity';
import { Product } from '@/lib/products';
import { ArrowRight, ShieldCheck, Truck, Clock } from 'lucide-react';
import { Newsletter } from '@/components/Newsletter';

export default async function Home() {
  const featuredProducts: Product[] = await getFeaturedProducts();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary/40 via-white to-secondary/30 py-24 md:py-40 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-10 animate-in fade-in zoom-in duration-700">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="text-sm font-medium text-primary">Premium Tech Essentials</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="text-primary">Elevate Your Lifestyle</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">with JTech Mart</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover the perfect blend of style and technology. Premium smart watches and audio devices designed for the modern individual.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link
                href="/products"
                className="group bg-primary text-primary-foreground px-10 py-4 rounded-full font-semibold hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40"
              >
                Shop Collection
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                href="/about"
                className="bg-white text-primary border-2 border-primary/20 px-10 py-4 rounded-full font-semibold hover:bg-primary/5 hover:border-primary/40 transition-all hover:scale-105 active:scale-95 shadow-md"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
        
        {/* Enhanced Background Decorations */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl -z-0 pointer-events-none animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-primary/10 to-transparent rounded-full blur-3xl -z-0 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-tr from-gray-200/30 via-transparent to-gray-200/30 rounded-full blur-3xl -z-0 pointer-events-none" />
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gradient-to-b from-white to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-16">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-3">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">Featured</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-3">Featured Collection</h2>
              <p className="text-muted-foreground text-lg">Handpicked favorites just for you.</p>
            </div>
            <Link href="/products" className="hidden md:flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold group px-6 py-3 rounded-full hover:bg-primary/5 border border-transparent hover:border-primary/20">
              View All <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <ProductCard key={product._id || product.id} product={product} />
              ))
            ) : (
               <p className="col-span-full text-center text-muted-foreground">No featured products found.</p>
            )}
          </div>
          
          <div className="mt-12 text-center md:hidden">
             <Link href="/products" className="inline-flex items-center gap-2 text-primary font-medium">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="group flex flex-col items-center text-center p-8 rounded-2xl bg-gradient-to-br from-secondary/30 to-white border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center shadow-lg text-primary mb-6 group-hover:scale-110 transition-transform">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-primary">Free Shipping</h3>
              <p className="text-muted-foreground max-w-xs mx-auto leading-relaxed">
                Enjoy free shipping on all orders over $50. Delivered safely to your doorstep.
              </p>
            </div>
            <div className="group flex flex-col items-center text-center p-8 rounded-2xl bg-gradient-to-br from-secondary/30 to-white border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center shadow-lg text-primary mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-primary">2-Year Warranty</h3>
              <p className="text-muted-foreground max-w-xs mx-auto leading-relaxed">
                We stand by our quality. All products come with a comprehensive 2-year warranty.
              </p>
            </div>
            <div className="group flex flex-col items-center text-center p-8 rounded-2xl bg-gradient-to-br from-secondary/30 to-white border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center shadow-lg text-primary mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-primary">30-Day Returns</h3>
              <p className="text-muted-foreground max-w-xs mx-auto leading-relaxed">
                Not satisfied? Return it within 30 days for a full refund, no questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary/95 to-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Join the JTech Mart Community</h2>
          <p className="text-primary-foreground/80 mb-10 max-w-lg mx-auto text-lg">
            Subscribe to our newsletter for exclusive offers, new arrivals, and tech tips.
          </p>
          <Newsletter />
        </div>
      </section>
    </div>
  );
}
