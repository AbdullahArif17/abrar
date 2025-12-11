
import { client, urlFor } from '@/lib/sanity'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { AddToCartButton } from './AddToCartButton' // Client component

async function getProduct(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    price,
    description,
    images,
    "category": category->title
  }`
  return client.fetch(query, { slug })
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)

  if (!product) return notFound()

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
        {/* Gallery */}
        <div className="space-y-4">
           {product.images && product.images.length > 0 && (
             <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
               <Image 
                 src={urlFor(product.images[0]).url()}
                 alt={product.name}
                 fill
                 className="object-cover"
                 priority
               />
             </div>
           )}
           <div className="grid grid-cols-4 gap-4">
              {product.images && product.images.map((img: any, i: number) => (
                 <div key={i} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                    <Image src={urlFor(img).url()} alt="" fill className="object-cover" />
                 </div>
              ))}
           </div>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
           <span className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">{product.category}</span>
           <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{product.name}</h1>
           <p className="text-2xl text-gray-900 font-medium mb-8">PKR {product.price.toLocaleString()}</p>
           
           <div className="prose prose-gray mb-10 text-gray-600">
              <p>{product.description}</p>
           </div>

           <div className="mb-8">
            <AddToCartButton product={product} /> 
           </div>
           
           <div className="border-t border-gray-100 pt-8 space-y-3 text-sm text-gray-500">
              <p>Free Standard Shipping</p>
              <p>Returns accepted within 14 days</p>
           </div>
        </div>
      </div>
    </div>
  )
}
