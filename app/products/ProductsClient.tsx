'use client';

import { useState, useMemo } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { ProductCardSkeleton } from '@/components/ProductCardSkeleton';
import { Product } from '@/lib/products';
import { Filter, Search, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

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
          // Normalize both strategy: remove hyphens, lower case
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
    <div className="min-h-screen bg-[#fafafa] dark:bg-background text-foreground">
      {/* Premium Header */}
      <div className="relative isolate overflow-hidden bg-primary pt-20 pb-24 md:pt-28 md:pb-36">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.primary.DEFAULT/20),theme(colors.background))] opacity-20" />
        <div className="absolute top-0 right-0 -z-10 w-full h-full bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 mx-auto">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">New Season Drops</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 uppercase">
              The <span className="text-secondary">Collection</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Curated precision instruments and premium hardware for the modern enthusiast. 
              Engineered for excellence, designed for life.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-10 pb-20">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Filters Sidebar */}
          <motion.div 
            className="w-full lg:w-72 flex-shrink-0 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {/* Search */}
            <div className="group relative bg-white dark:bg-card p-2 rounded-[2rem] border border-border/50 shadow-xl hover:shadow-2xl hover:border-primary/20 transition-all duration-500">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Search gear..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 rounded-[1.5rem] bg-secondary/30 text-base focus:outline-none transition-all text-foreground placeholder:text-muted-foreground font-medium"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white dark:bg-card p-8 rounded-[2.5rem] border border-border/50 shadow-xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <Filter className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-foreground">Filter By</h3>
              </div>
              
              <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`group flex items-center justify-between px-5 py-4 rounded-2xl text-sm transition-all duration-300 ${
                      activeCategory === category.id
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]'
                        : 'bg-secondary/30 text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                    }`}
                  >
                    <span className="font-bold capitalize">{category.label === 'All Products' ? 'All Items' : category.label}</span>
                    <ArrowRight className={`w-4 h-4 transition-all duration-300 ${
                      activeCategory === category.id 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 -translate-x-2'
                    }`} />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Product Grid Area */}
          <div className="flex-1 w-full space-y-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white dark:bg-card px-8 py-5 rounded-[2rem] border border-border/50 shadow-xl">
              <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest">
                <span className="text-primary">{filteredProducts.length}</span> Objects Found
              </p>
              
              <div className="flex items-center gap-4">
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">Sort By</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-secondary/50 border-none rounded-xl text-sm font-bold py-2.5 px-6 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer hover:bg-secondary/80"
                >
                  <option value="featured">👑 Selection</option>
                  <option value="newest">✨ Fresh arrivals</option>
                  <option value="price-asc">📉 Lowest Price</option>
                  <option value="price-desc">📈 Highest Price</option>
                </select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id || product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-card rounded-2xl border border-border border-dashed">
                <div className="bg-secondary/50 p-4 rounded-full mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6 text-center max-w-xs">
                  We couldn't find any products matching your search criteria.
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('')
                    setActiveCategory('all')
                    setSortBy('featured')
                  }}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
