import { client, urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{
    slug: string
  }>
}

async function getProductsByCategory(slug: string) {
  const query = `*[_type == "product" && category->slug.current == $slug] {
    _id,
    name,
    title,
    price,
    discountPrice,
    "slug": slug.current,
    images,
    "category": category->title
  }`
  return client.fetch(query, { slug })
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const products = await getProductsByCategory(slug)

  if (!products) return notFound()

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <h1 className="text-4xl font-bold mb-12 capitalize tracking-tight text-primary">{slug.replaceAll('-', ' ')}</h1>
      
      {products.length === 0 ? (
         <div className="py-20 text-center text-muted-foreground">
            <p>No products found in this category.</p>
         </div>
      ) : (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {products.map((product: any) => (
               <Link href={`/products/${product.slug}`} key={product._id} className="group block">
                  <div className="relative aspect-square bg-secondary rounded-lg overflow-hidden mb-4">
                     {product.images && product.images[0] && (
                        <Image 
                           src={urlFor(product.images[0]).url()} 
                           alt={product.name || product.title || 'Product'} 
                           fill 
                           className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                     )}
                  </div>
                  <div>
                     <h3 className="font-medium text-lg leading-snug text-foreground group-hover:text-primary transition-colors">{product.name || product.title}</h3>
                     <div className="flex items-center gap-2 mt-1">
                       {product.discountPrice ? (
                         <>
                           <span className="text-sm font-semibold text-primary">Rs. {product.discountPrice.toLocaleString()}</span>
                           <span className="text-xs text-muted-foreground line-through">Rs. {product.price.toLocaleString()}</span>
                         </>
                       ) : (
                         <p className="text-sm text-muted-foreground">Rs. {product.price.toLocaleString()}</p>
                       )}
                     </div>
                  </div>
               </Link>
            ))}
         </div>
      )}
    </div>
  )
}
