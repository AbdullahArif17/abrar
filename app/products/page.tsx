
import { client, urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'

async function getProducts() {
  const query = `*[_type == "product"] {
    _id,
    name,
    price,
    slug,
    images,
    "category": category->title
  }`
  return client.fetch(query)
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">All Products</h1>
      
      {!products || products.length === 0 ? (
         <div className="text-center py-20 bg-gray-50 rounded-2xl">
            <p>No products found.</p>
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
                 </div>
                 <div className="p-4">
                    <p className="text-xs text-green-600 font-bold mb-1 uppercase tracking-wider">{product.category}</p>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-green-600 transition-colors">{product.name}</h3>
                    <div className="flex items-center justify-between">
                       <span className="font-bold text-xl">PKR {product.price.toLocaleString()}</span>
                    </div>
                 </div>
              </Link>
           ))}
        </div>
      )}
    </div>
  )
}
