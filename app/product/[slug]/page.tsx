
import { client, urlFor } from '@/lib/sanity'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { AddToCartButton } from '@/components/AddToCartButton'

async function getProduct(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    title,
    price,
    discountPrice,
    description,
    images,
    "slug": slug.current,
    "category": category->title
  }`
  return client.fetch(query, { slug })
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) return notFound()

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20">
      <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20">
        {/* Gallery */}
        <div className="space-y-4 sm:space-y-5 md:space-y-6">
           {product.images && product.images.length > 0 && (
             <div className="relative aspect-square bg-secondary rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-border">
               <Image 
                 src={urlFor(product.images[0]).url()}
                 alt={product.name || product.title || 'Product'}
                 fill
                 className="object-cover"
                 priority
                 sizes="(max-width: 1024px) 100vw, 50vw"
               />
             </div>
           )}
           <div className="grid grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              {product.images && product.images.map((img: any, i: number) => (
                 <div key={i} className="relative aspect-square bg-secondary rounded-xl overflow-hidden cursor-pointer hover:opacity-80 transition-all hover:scale-105 border-2 border-border shadow-md">
                    <Image src={urlFor(img).url()} alt={`${product.name || product.title} - Image ${i + 1}`} fill className="object-cover" sizes="(max-width: 1024px) 25vw, 12.5vw" />
                 </div>
              ))}
           </div>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center gap-6 sm:gap-7 md:gap-8 lg:gap-10">
           <div className="space-y-3 sm:space-y-4">
             <span className="text-muted-foreground text-xs sm:text-sm md:text-base font-semibold uppercase tracking-widest">{product.category}</span>
             <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary leading-tight">{product.name || product.title}</h1>
             <div className="flex flex-wrap items-baseline gap-3 sm:gap-4 pt-2">
               {product.discountPrice ? (
                 <>
                   <div className="flex flex-col gap-1">
                     <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
                       Rs. {product.discountPrice.toLocaleString()}
                     </span>
                     <span className="text-lg sm:text-xl md:text-2xl text-muted-foreground line-through">
                       Rs. {product.price.toLocaleString()}
                     </span>
                   </div>
                   <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm sm:text-base font-bold">
                     {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                   </span>
                 </>
               ) : (
                 <p className="text-3xl sm:text-4xl md:text-5xl text-primary font-bold">Rs. {product.price.toLocaleString()}</p>
               )}
             </div>
           </div>
           
           <div className="prose prose-lg max-w-none">
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-normal">{product.description}</p>
           </div>

           <div>
            <AddToCartButton product={product} variant="large" className="w-full text-base sm:text-lg" /> 
           </div>
           
           <div className="border-t border-border pt-6 sm:pt-8 md:pt-10 space-y-3 sm:space-y-4 text-base sm:text-lg text-muted-foreground">
              <p className="font-medium">Free Standard Shipping</p>
              <p className="font-medium">Returns accepted within 14 days</p>
           </div>
        </div>
      </div>
    </div>
  )
}
