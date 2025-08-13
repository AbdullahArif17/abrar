import { Button } from "@/app/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-green-500 to-green-600 overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <div className="mb-8">
              <div className="inline-flex items-center bg-white/20 rounded-full px-6 py-3 mb-6">
                <div className="bg-white rounded-full p-3 mr-4">
                  <span className="text-green-600 font-bold text-sm">ZERO</span>
                </div>
                <div className="text-center">
                  <div className="text-sm">AZADI</div>
                  <div className="text-2xl font-bold">78%</div>
                  <div className="text-sm">SALE</div>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-lg">Starting from</span>
              </div>
              <div className="text-5xl font-bold text-yellow-400 mb-6">
                2,999<span className="text-2xl">RS</span>
              </div>

              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3 rounded-full">
                Live Now
              </Button>
            </div>
          </div>

          <div className="relative">
            <img src="/two-male-models-green.png" alt="Models wearing smartwatches" className="w-full h-auto" />
          </div>
        </div>
      </div>

      {/* Decorative brush strokes */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-30">
        <div className="w-full h-full bg-gradient-to-l from-green-400 to-transparent transform skew-x-12"></div>
      </div>
    </section>
  )
}
