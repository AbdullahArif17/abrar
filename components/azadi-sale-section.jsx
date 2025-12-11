import { ProductCard } from "./product-card"

export function AzadiSaleSection() {
  const products = [
    {
      name: "Gravity Earbuds",
      originalPrice: "Rs.4,999",
      price: "Rs.2,999",
      rating: 4.8,
      image: "black wireless earbuds in case",
      badge: "HOT SELLER",
      discount: "40% OFF",
    },
    {
      name: "Luna Smartwatch",
      originalPrice: "Rs.7,999",
      price: "Rs.4,999",
      rating: 4.9,
      image: "black smartwatch with digital display",
      badge: "BEST SELLER",
      discount: "38% OFF",
    },
    {
      name: "Carbon Earbuds",
      originalPrice: "Rs.5,999",
      price: "Rs.3,999",
      rating: 4.6,
      image: "gray wireless earbuds with case",
      badge: "TRENDING",
      discount: "33% OFF",
    },
    {
      name: "Ignite Smartwatch",
      originalPrice: "Rs.6,999",
      price: "Rs.4,499",
      rating: 4.7,
      image: "black smartwatch with green band",
      badge: "POPULAR",
      discount: "36% OFF",
    },
  ]

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Azadi Sale</h2>
          <a href="#" className="text-green-600 hover:underline">
            View all
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              rating={product.rating}
              image={product.image}
              badge={product.badge}
              discount={product.discount}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
