export function CategoryIcons() {
	const categories = [
	  { name: "Azadi Sale", icon: "🎯", color: "bg-green-100" },
	  { name: "Smart Watches", icon: "⌚", color: "bg-blue-100" },
	  { name: "Zero Earbuds", icon: "🎧", color: "bg-purple-100" },
	  { name: "Headphones", icon: "🎵", color: "bg-orange-100" },
	  { name: "Earbuds", icon: "🔊", color: "bg-red-100" },
	]
  
	return (
	  <section className="py-8 bg-gray-50">
		<div className="container mx-auto px-4">
		  <div className="flex justify-center space-x-8">
			{categories.map((category, index) => (
			  <div key={index} className="text-center">
				<div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mb-2 mx-auto`}>
				  <span className="text-2xl">{category.icon}</span>
				</div>
				<span className="text-sm text-gray-600">{category.name}</span>
			  </div>
			))}
		  </div>
		</div>
	  </section>
	)
  }
  