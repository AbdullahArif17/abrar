
import { client, urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    slug: string
  }
}

async function getProductsByCategory(slug: string) {
  const query = `*[_type == "product" && category->slug.current == $slug] {
    _id,
    name,
    price,
    slug,
    images,
    "category": category->title
  }`
  return client.fetch(query, { slug })
}

export default async function CategoryPage({ params }: Props) {
  const products = await getProductsByCategory(params.slug)

  if (!products) return notFound()

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <h1 className="text-4xl font-bold mb-12 capitalize tracking-tight text-black">{params.slug.replace('-', ' ')}</h1>
      
      {products.length === 0 ? (
         <div className="py-20 text-center text-gray-500">
            <p>No products found in this category.</p>
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
  )
}
