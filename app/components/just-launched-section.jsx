import { Button } from "@/app/components/ui/button"
import { ProductCard } from "./product-card"

export function JustLaunchedSection() {
  const products = [
    {
      name: "Luna Smartwatch",
      price: "Rs.4,999",
      rating: 4.8,
      image: "black smartwatch with blue display",
      colors: ["black", "red", "blue"],
    },
    {
      name: "Edge Smartwatch",
      price: "Rs.5,999",
      rating: 4.9,
      image: "red smartwatch with black band",
      colors: ["red", "black", "blue"],
    },
    {
      name: "Orbit 2 Smartwatch",
      price: "Rs.6,999",
      rating: 4.6,
      image: "brown leather smartwatch",
      colors: ["brown", "black", "gray"],
    },
    {
      name: "Luna Pro",
      price: "Rs.6,999",
      rating: 4.7,
      image: "silver metal smartwatch",
      colors: ["silver", "black", "gold"],
    },
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Just Launched</h2>
          <div className="flex space-x-4">
            <Button variant="outline" className="text-sm bg-transparent">
              SMART WATCHES
            </Button>
            <Button variant="outline" className="text-sm bg-transparent">
              ZERO EARBUDS
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              name={product.name}
              price={product.price}
              rating={product.rating}
              image={product.image}
              badge="NEW"
              colors={product.colors}
              isNew={true}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
