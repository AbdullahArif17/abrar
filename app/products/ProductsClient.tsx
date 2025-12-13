'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/lib/products';
import { Filter } from 'lucide-react';

interface ProductsClientProps {
  products: Product[];
}

export default function ProductsClient({ products }: ProductsClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'smart-watches', label: 'Smart Watches' },
    { id: 'earbuds', label: 'Earbuds' },
    { id: 'headphones', label: 'Headphones' },
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="min-h-screen bg-secondary/20">
      {/* Header */}
      <div className="bg-white border-b border-border">
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
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Filters Sidebar (Desktop) / Topbar (Mobile) */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg border border-border sticky top-24">
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
            <div className="mb-6 text-sm text-muted-foreground">
              Showing {filteredProducts.length} results
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id || product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-lg border border-border border-dashed">
                <p className="text-muted-foreground">No products found in this category.</p>
                <button 
                  onClick={() => setActiveCategory('all')}
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
