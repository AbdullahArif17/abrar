'use client';

import { useState, useMemo } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { ProductCardSkeleton } from '@/components/ProductCardSkeleton';
import { Product } from '@/lib/products';
import { Filter, Search } from 'lucide-react';

interface ProductsClientProps {
  products: Product[];
}

export default function ProductsClient({ products }: ProductsClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'smart-watches', label: 'Smart Watches' },
    { id: 'earbuds', label: 'Earbuds' },
    { id: 'headphones', label: 'Headphones' },
  ];

  const filteredProducts = useMemo(() => {
    let filtered = activeCategory === 'all' 
      ? products 
      : products.filter(product => product.category === activeCategory);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        (product.title || product.name || '').toLowerCase().includes(query) ||
        (product.description || '').toLowerCase().includes(query) ||
        (product.category || '').toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [products, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-12 md:py-20 text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary mb-4">
            Our Collection
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our premium range of smart devices designed to enhance your daily life.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto md:mx-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Filters Sidebar (Desktop) / Topbar (Mobile) */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-card p-6 rounded-lg border border-border sticky\ top-24">
              <div className="flex items-center gap-2 mb-6 text-primary">
                <Filter className="w-5 h-5" />
                <h2 className="font-semibold">Categories</h2>
              </div>
              
              <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`text-left px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                      activeCategory === category.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                {searchQuery && ` for "${searchQuery}"`}
              </div>
              {(searchQuery || activeCategory !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setActiveCategory('all')
                  }}
                  className="text-sm text-primary font-medium hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id || product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-card rounded-lg border border-border border-dashed">
                <p className="text-muted-foreground mb-2">
                  {searchQuery ? `No products found for "${searchQuery}"` : 'No products found in this category.'}
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('')
                    setActiveCategory('all')
                  }}
                  className="mt-4 text-primary font-medium hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
