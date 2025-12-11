import { Button } from "@/components/ui/button"

export function BottomCategories() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">For Fashion</h3>
              <p className="mb-4">Stylish accessories for your lifestyle</p>
              <Button className="bg-white text-purple-600 hover:bg-gray-100">Explore Now</Button>
            </div>
            <img
              src="/placeholder-qljtc.png"
              alt="Fashion accessories"
              className="absolute right-0 top-0 h-full object-cover opacity-30"
            />
          </div>

          <div className="relative bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">For Adventure</h3>
              <p className="mb-4">Rugged gear for outdoor enthusiasts</p>
              <Button className="bg-white text-green-600 hover:bg-gray-100">Discover More</Button>
            </div>
            <img
              src="/placeholder-d55w1.png"
              alt="Adventure gear"
              className="absolute right-0 top-0 h-full object-cover opacity-30"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
