
import { client, urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

async function getProducts() {
  const query = `*[_type == "product"][0...4] {
    _id,
    name,
    price,
    slug,
    images,
    "category": category->title
  }`
  return client.fetch(query)
}

export default async function HomePage() {
  const products = await getProducts()

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-black overflow-hidden">
         <div className="absolute inset-0 z-0 opacity-50">
            {/* Find a nice placeholder or use a gradient */}
            <div className="w-full h-full bg-gradient-to-r from-gray-900 to-gray-800" />
         </div>
         
         <div className="container relative z-10 text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
               Future on your Wrist
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
               Discover the latest collection of premium smart watches and audio devices designed for the modern lifestyle.
            </p>
            <div className="flex gap-4 justify-center">
               <Link 
                  href="/category/smart-watches" 
                  className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition-all hover:scale-105"
               >
                  Shop Now
               </Link>
               <Link 
                  href="/about" 
                  className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3 rounded-full font-bold hover:bg-white/20 transition-all"
               >
                  Learn More
               </Link>
            </div>
         </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
             <div>
                <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
                <p className="text-gray-500">Best sellers from our exclusive collection</p>
             </div>
             <Link href="/products" className="text-green-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                View All <ArrowRight className="w-4 h-4" />
             </Link>
          </div>

          {!products || products.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border">
               <p className="text-gray-500 mb-4">No products found. Connect Sanity to see content.</p>
               <div className="inline-block p-4 bg-gray-100 rounded-lg text-left text-sm font-mono text-gray-700">
                  <p>1. Create Sanity Project</p>
                  <p>2. Add env vars to .env.local</p>
                  <p>3. Add 'product' documents in Studio</p>
               </div>
            </div>
          ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product: any) => (
                   <Link href={`/product/${product.slug.current}`} key={product._id} className="group block bg-white rounded-xl overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">
                      <div className="relative aspect-square bg-gray-100 overflow-hidden">
                         {product.images && product.images[0] && (
                            <Image 
                               src={urlFor(product.images[0]).url()} 
                               alt={product.name} 
                               fill 
                               className="object-cover group-hover:scale-110 transition-transform duration-500" 
                            />
                         )}
                         {/* Badge examples */}
                         <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            HOT
                         </div>
                      </div>
                      <div className="p-4">
                         <p className="text-xs text-green-600 font-bold mb-1 uppercase tracking-wider">{product.category}</p>
                         <h3 className="font-bold text-lg mb-2 group-hover:text-green-600 transition-colors">{product.name}</h3>
                         <div className="flex items-center justify-between">
                            <span className="font-bold text-xl">PKR {product.price.toLocaleString()}</span>
                            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                               +
                            </button>
                         </div>
                      </div>
                   </Link>
                ))}
             </div>
          )}
        </div>
      </section>

      {/* Marquee/Categories Placeholder */}
      <section className="py-20 border-t">
          <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl font-bold mb-8">Shop by Category</h2>
              <div className="flex flex-wrap justify-center gap-4">
                  {['Smart Watches', 'Wireless Earbuds', 'Headphones', 'Accessories', 'Bundles'].map((cat) => (
                      <div key={cat} className="px-8 py-10 bg-gray-50 rounded-2xl hover:bg-green-50 hover:border-green-200 border border-transparent transition-all cursor-pointer w-40 flex flex-col items-center justify-center">
                          <span className="font-bold">{cat}</span>
                      </div>
                  ))}
              </div>
          </div>
      </section>
    </div>
  )
}
