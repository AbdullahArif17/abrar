'use client';

import { useState, useMemo } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { ProductCardSkeleton } from '@/components/ProductCardSkeleton';
import { Product } from '@/lib/products';
import { Filter, Search, ChevronRight, SlidersHorizontal, PackageSearch } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProductsClientProps {
  products: Product[];
}

export default function ProductsClient({ products }: ProductsClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category).filter(Boolean))];
    return [
      { id: 'all', label: 'All Products' },
      ...uniqueCategories.map(cat => ({ id: cat, label: cat })),
    ];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = activeCategory === 'all' 
      ? products 
      : products.filter(product => {
          const pCat = (product.category || '').toLowerCase().replace(/-/g, ' ');
          const fCat = activeCategory.toLowerCase().replace(/-/g, ' ');
          return pCat.includes(fCat) || fCat.includes(pCat);
      });

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        (product.title || product.name || '').toLowerCase().includes(query) ||
        (product.description || '').toLowerCase().includes(query) ||
        (product.category || '').toLowerCase().includes(query)
      );
    }

    // Sort products
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return (a.discountPrice || a.price) - (b.discountPrice || b.price);
        case 'price-desc':
          return (b.discountPrice || b.price) - (a.discountPrice || a.price);
        case 'newest':
          return new Date(b._createdAt || 0).getTime() - new Date(a._createdAt || 0).getTime();
        default: // featured
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });
  }, [products, activeCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-background transition-colors duration-500">
      {/* Cinematic Header - Matches Hero Exactly */}
      <section className="relative pt-24 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-br from-background via-secondary/10 to-background">
        {/* Background Animation Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[140px] animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <motion.div 
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-md shadow-2xl shadow-primary/5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </div>
              <span className="text-[11px] font-black tracking-[0.25em] text-primary uppercase">Elite Database Active</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.95] uppercase flex flex-col items-center">
              <span className="text-primary opacity-20 text-[0.4em] font-bold tracking-[0.5em] mb-2">Accessing</span>
              <span className="text-primary mb-1 md:mb-3">The Whole</span>
              <span className="bg-gradient-to-r from-primary via-primary/70 to-primary bg-clip-text text-transparent italic font-light lowercase">Inventory</span>
            </h1>
            
            <motion.p 
              className="mt-10 text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed opacity-80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Browsing our high-precision hardware ecosystem. 
              Find the specific unit that completes your configuration.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Elite Control Panel (Sidebar) */}
          <aside className="w-full lg:w-80 flex-shrink-0 space-y-12">
            {/* Search - Ultra Sharp */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-2">
                <Search className="w-4 h-4 text-primary" />
                <h4 className="text-[10px] font-black text-primary/40 uppercase tracking-[0.4em]">Search Log</h4>
              </div>
              <div className="relative group overflow-hidden rounded-[1.5rem] border border-border shadow-xl hover:border-primary/50 transition-all duration-300">
                <input
                  type="text"
                  placeholder="ID scan or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-6 pr-6 py-5 bg-card text-sm focus:outline-none placeholder:text-muted-foreground/30 font-bold"
                />
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-focus-within:w-full transition-all duration-700" />
              </div>
            </div>

            {/* Category Scan */}
            <div className="space-y-6">
               <div className="flex items-center gap-2 px-2">
                <SlidersHorizontal className="w-4 h-4 text-primary" />
                <h4 className="text-[10px] font-black text-primary/40 uppercase tracking-[0.4em]">Filter Bank</h4>
              </div>
              <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={cn(
                        "group flex items-center justify-between px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all relative border overflow-hidden",
                        activeCategory === category.id
                        ? "bg-primary text-primary-foreground border-primary shadow-2xl shadow-primary/20 scale-[1.03] z-10"
                        : "bg-card text-muted-foreground border-border hover:border-primary/30 hover:text-primary"
                    )}
                  >
                    <span className="relative z-10">{category.label === 'All Products' ? 'All Units' : category.label}</span>
                    <ChevronRight className={cn(
                      "w-4 h-4 transition-all duration-500 relative z-10",
                      activeCategory === category.id ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                    )} />
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Visualization Grid (Main Content) */}
          <main className="flex-1 w-full space-y-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pb-10 border-b border-border/60">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-primary/5 rounded-2xl flex items-center justify-center border border-primary/10">
                    <PackageSearch className="w-5 h-5 text-primary" />
                </div>
                <div>
                   <p className="text-xs font-black text-primary/40 uppercase tracking-[0.2em] mb-0.5">Scanning Results</p>
                   <p className="text-xl font-black tracking-tighter text-foreground leading-none">
                     {filteredProducts.length} <span className="text-primary italic font-light">Units detected</span>
                   </p>
                </div>
              </div>
              
              <div className="flex items-center gap-5 bg-card px-2 py-2 rounded-2xl border border-border shadow-sm">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-3">Sorting</span>
                <div className="h-6 w-[1px] bg-border" />
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-[11px] font-black uppercase tracking-widest py-2 px-4 focus:outline-none cursor-pointer hover:text-primary transition-colors appearance-none"
                >
                  <option value="featured">👑 Selection</option>
                  <option value="newest">✨ Fresh</option>
                  <option value="price-asc">📉 Low Price</option>
                  <option value="price-desc">📈 High Price</option>
                </select>
                <ChevronRight className="w-4 h-4 text-muted-foreground mr-3 rotate-90" />
              </div>
            </div>

            <AnimatePresence mode="popLayout">
              {filteredProducts.length > 0 ? (
                <motion.div 
                  layout
                  className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-14"
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product._id || product.id} product={product} />
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-40 bg-card rounded-[3.5rem] border border-dashed border-border shadow-inner"
                >
                  <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-8 border border-primary/10">
                    <PackageSearch className="w-10 h-10 text-primary opacity-30" />
                  </div>
                  <h3 className="text-3xl font-black text-foreground mb-4 tracking-tighter uppercase">No Signal Found</h3>
                  <p className="text-muted-foreground mb-12 max-w-sm mx-auto font-bold text-lg leading-relaxed px-6">
                    The requested data stream returned null. Re-calibrate your scan parameters.
                  </p>
                  <button 
                    onClick={() => {
                      setSearchQuery('')
                      setActiveCategory('all')
                      setSortBy('featured')
                    }}
                    className="px-12 py-5 bg-primary text-primary-foreground rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] shadow-primary/30 hover:scale-105 active:scale-95 transition-all dark:bg-white dark:text-black"
                  >
                    Reset System Stream
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
