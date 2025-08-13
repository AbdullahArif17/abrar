export function FeaturesSection() {
	const features = [
	  { icon: "🛡️", title: "1 YEAR WARRANTY", subtitle: "Quality Assurance" },
	  { icon: "🔄", title: "7 DAYS REPLACEMENT", subtitle: "Easy Returns" },
	  { icon: "🚚", title: "FREE DELIVERY", subtitle: "Nationwide Shipping" },
	  { icon: "👥", title: "1,000,000+ CUSTOMERS", subtitle: "Trusted by Many" },
	]
  
	return (
	  <section className="py-12 bg-gray-50">
		<div className="container mx-auto px-4">
		  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
			{features.map((feature, index) => (
			  <div key={index} className="text-center">
				<div className="text-4xl mb-4">{feature.icon}</div>
				<h3 className="font-bold text-sm mb-1">{feature.title}</h3>
				<p className="text-gray-600 text-sm">{feature.subtitle}</p>
			  </div>
			))}
		  </div>
		</div>
	  </section>
	)
  }
  