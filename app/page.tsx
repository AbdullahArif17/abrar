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
      <section className="relative bg-secondary/30 py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-in fade-in zoom-in duration-700">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-primary">
              Elevate Your Lifestyle with <span className="text-muted-foreground">Zero.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover the perfect blend of style and technology. Premium smart watches and audio devices designed for the modern individual.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/products"
                className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
              >
                Shop Collection
              </Link>
              <Link
                href="/about"
                className="bg-white text-primary border border-border px-8 py-4 rounded-full font-medium hover:bg-secondary transition-all hover:scale-105 active:scale-95"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
        
        {/* Abstract Background Decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-gray-200/50 to-transparent rounded-full blur-3xl -z-0 pointer-events-none" />
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-primary mb-2">Featured Collection</h2>
              <p className="text-muted-foreground">Handpicked favorites just for you.</p>
            </div>
            <Link href="/products" className="hidden md:flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium group">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <section className="py-20 bg-secondary/30 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-primary">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Free Shipping</h3>
              <p className="text-muted-foreground max-w-xs mx-auto">
                Enjoy free shipping on all orders over $50. Delivered safely to your doorstep.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-primary">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">2-Year Warranty</h3>
              <p className="text-muted-foreground max-w-xs mx-auto">
                We stand by our quality. All products come with a comprehensive 2-year warranty.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-primary">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">30-Day Returns</h3>
              <p className="text-muted-foreground max-w-xs mx-auto">
                Not satisfied? Return it within 30 days for a full refund, no questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-4 tracking-tight">Join the Zero Lifestyle</h2>
          <p className="text-primary-foreground/70 mb-8 max-w-md mx-auto">
            Subscribe to our newsletter for exclusive offers, new arrivals, and tech tips.
          </p>
          <Newsletter />
        </div>
      </section>
    </div>
  );
}
