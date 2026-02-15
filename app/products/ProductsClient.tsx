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
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Premium Header - Deep Dark for both modes for premium feel */}
      <div className="relative isolate overflow-hidden bg-[#0a0a0a] pt-24 pb-32 md:pt-32 md:pb-40">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.primary.DEFAULT/30),theme(colors.background))] opacity-40" />
        <div className="absolute top-0 right-0 -z-10 w-full h-full bg-gradient-to-b from-white/10 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-8 mx-auto">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="text-[10px] font-black text-white/90 uppercase tracking-[0.2em]">New Season Drops</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-8 uppercase leading-none">
              The <span className="bg-gradient-to-r from-orange-400 to-rose-500 bg-clip-text text-transparent">Collection</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed italic">
              "Precision instruments for the modern digital explorer."
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10 pb-24 md:pb-32">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Filters Sidebar */}
          <motion.div 
            className="w-full lg:w-80 flex-shrink-0 space-y-10"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {/* Search */}
            <div className="group relative bg-card dark:bg-[#121212] backdrop-blur-2xl p-2 rounded-[2.5rem] border border-border/80 shadow-2xl hover:border-primary transition-all duration-500">
              <div className="relative flex items-center">
                <Search className="absolute left-5 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="ID search or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-7 py-5 rounded-[2rem] bg-background/40 text-base focus:outline-none transition-all text-foreground placeholder:text-muted-foreground/60 font-bold border border-transparent focus:border-primary/10"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-card dark:bg-[#121212] backdrop-blur-2xl p-8 rounded-[3rem] border border-border/80 shadow-2xl">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-primary text-primary-foreground rounded-2xl shadow-xl">
                  <Filter className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-foreground">Select Type</h3>
              </div>
              
              <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`group flex items-center justify-between px-6 py-5 rounded-[1.5rem] text-sm transition-all duration-500 ${
                      activeCategory === category.id
                        ? 'bg-primary text-primary-foreground shadow-2xl shadow-primary/30 scale-[1.05] z-10'
                        : 'bg-secondary/30 text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
                    }`}
                  >
                    <span className="font-black capitalize tracking-tight">{category.label === 'All Products' ? 'All Units' : category.label}</span>
                    <ArrowRight className={`w-4 h-4 transition-all duration-500 ${
                      activeCategory === category.id 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 -translate-x-4'
                    }`} />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Product Grid Area */}
          <div className="flex-1 w-full space-y-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8 bg-card dark:bg-[#121212] backdrop-blur-2xl px-10 py-6 rounded-[2.5rem] border border-border/80 shadow-2xl">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-foreground flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                <span className="text-primary/100">{filteredProducts.length}</span> Active Items
              </p>
              
              <div className="flex items-center gap-5">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">Indexing</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-background/80 dark:bg-[#1a1a1a] border border-border/50 rounded-2xl text-[11px] font-black uppercase tracking-tight py-3 px-6 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer hover:bg-background shadow-sm"
                >
                  <option value="featured">👑 Selection</option>
                  <option value="newest">✨ Fresh</option>
                  <option value="price-asc">📉 Low-High</option>
                  <option value="price-desc">📈 High-Low</option>
                </select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id || product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-28 bg-card/60 backdrop-blur-xl rounded-[3rem] border border-border border-dashed shadow-inner">
                <div className="bg-primary/5 p-8 rounded-full mb-8 relative">
                    <div className="absolute inset-0 bg-primary/10 animate-ping rounded-full opacity-20"></div>
                   <Search className="w-12 h-12 text-primary opacity-40 relative z-10" />
                </div>
                <h3 className="text-3xl font-black text-foreground mb-4 tracking-tighter">Null Result</h3>
                <p className="text-muted-foreground mb-10 text-center max-w-sm font-bold text-base leading-relaxed">
                  No equipment matched your current scan parameters. Reset filters to continue.
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('')
                    setActiveCategory('all')
                    setSortBy('featured')
                  }}
                  className="px-10 py-4 bg-primary text-primary-foreground rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] shadow-primary/20"
                >
                  Clear Feed Scan
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
