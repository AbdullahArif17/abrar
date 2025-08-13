import { Button } from "@/app/components/ui/button"
import { Play } from "lucide-react"

export function VideoSection() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="relative bg-gradient-to-r from-gray-900 to-green-900 rounded-2xl overflow-hidden">
          <img src="/young-man-red-jacket-studio.png" alt="Video thumbnail" className="w-full h-96 object-cover" />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white rounded-full p-4">
              <Play className="w-8 h-8" />
            </Button>
          </div>
          <div className="absolute bottom-8 left-8 text-white">
            <h2 className="text-4xl font-bold">Hi</h2>
          </div>
        </div>
      </div>
    </section>
  )
}
