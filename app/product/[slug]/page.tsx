
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
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
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
                 <div key={i} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 ring-green-500">
                    <Image src={urlFor(img).url()} alt="" fill className="object-cover" />
                 </div>
              ))}
           </div>
        </div>

        {/* Details */}
        <div>
           <span className="text-green-600 font-bold uppercase tracking-wider">{product.category}</span>
           <h1 className="text-4xl font-bold mt-2 mb-4">{product.name}</h1>
           <p className="text-3xl font-bold mb-6">PKR {product.price.toLocaleString()}</p>
           
           <div className="prose prose-gray mb-8">
              <p>{product.description}</p>
           </div>

           <AddToCartButton product={product} /> 
           
           <div className="mt-8 border-t pt-8 space-y-4 text-sm text-gray-500">
              <div className="flex gap-4">
                 <span>Free Delivery</span>
                 <span>1 Year Warranty</span>
                 <span>7 Days Return</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
