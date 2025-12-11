import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

export function ProductCard({ name, price, originalPrice, rating, image, badge, discount, colors, isNew = false }) {
  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div
          className={`relative ${isNew ? "bg-gradient-to-br from-gray-100 to-gray-200" : "bg-gradient-to-br from-green-100 to-green-200"} p-6 rounded-t-lg`}
        >
          {discount && <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs">{discount}</Badge>}
          {isNew && <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs">NEW</Badge>}
          <Badge className="absolute top-2 right-2 bg-orange-500 text-white text-xs">{badge}</Badge>
          <img
            src={`/abstract-geometric-shapes.png?height=200&width=200&query=${image}`}
            alt={name}
            className="w-full h-48 object-contain"
          />
        </div>

        <div className="p-4">
          <h3 className="font-semibold mb-2">{name}</h3>
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-1 text-sm text-gray-600">{rating}</span>
            </div>
          </div>

          {colors && (
            <div className="flex items-center mb-3">
              {colors.map((color, colorIndex) => (
                <div
                  key={colorIndex}
                  className={`w-4 h-4 rounded-full mr-2 border-2 border-gray-300`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <span className={`text-lg font-bold ${originalPrice ? "text-green-600" : "text-black"}`}>{price}</span>
              {originalPrice && <span className="ml-2 text-sm text-gray-500 line-through">{originalPrice}</span>}
            </div>
            <Button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full text-sm">
              Add To Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
