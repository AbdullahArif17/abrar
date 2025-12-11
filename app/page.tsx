
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
      <section className="py-20 md:py-32 bg-white">
         
         <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 text-black">
               The Future.
            </h1>
            <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
               Minimalist tech for the modern creator.
            </p>
            <div className="flex gap-4 justify-center">
               <Link 
                  href="/category/smart-watches" 
                  className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-all"
               >
                  Shop Now
               </Link>
            </div>
         </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
             <h2 className="text-2xl font-bold tracking-tight">Selected Items</h2>
             <Link href="/products" className="text-sm font-medium hover:underline flex items-center gap-2">
                View All <ArrowRight className="w-4 h-4" />
             </Link>
          </div>

          {!products || products.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
               <p>No products found.</p>
            </div>
          ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                {products.map((product: any) => (
                   <Link href={`/product/${product.slug.current}`} key={product._id} className="group block">
                      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                         {product.images && product.images[0] && (
                            <Image 
                               src={urlFor(product.images[0]).url()} 
                               alt={product.name} 
                               fill 
                               className="object-cover group-hover:scale-105 transition-transform duration-500" 
                            />
                         )}
                      </div>
                      <div>
                         <h3 className="font-medium text-lg leading-snug group-hover:text-gray-600 transition-colors">{product.name}</h3>
                         <p className="text-sm text-gray-500 mt-1">PKR {product.price.toLocaleString()}</p>
                      </div>
                   </Link>
                ))}
             </div>
          )}
        </div>
      </section>
    </div>
  )
}
