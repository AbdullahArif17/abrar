import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-primary mb-6">
            Building the Future of Tech
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            At Zero, we believe in the power of minimalism and technology. Our mission is to create products that integrate seamlessly into your life.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-video md:aspect-square rounded-2xl overflow-hidden bg-gray-100">
               <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" /> 
               {/* In a real app, use a real image here */}
               <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">
                  Brand Image Placeholder
               </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight text-primary">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed">
                Founded in 2024, Zero Lifestyle started with a simple question: Why does technology have to be complicated? We set out to strip away the unnecessary and focus on what truly matters - performance, design, and user experience.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we are a team of engineers, designers, and dreamers working together to redefine how people interact with their devices. From our precision-engineered smart watches to our high-fidelity audio equipment, every product is a testament to our obsession with quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-white/70">The core principles that guide everything we do.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-white/20 rounded-xl bg-white/5 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4">Simplicity</h3>
              <p className="text-white/70">
                We believe that less is more. Our designs are clean, intuitive, and distraction-free.
              </p>
            </div>
            <div className="p-8 border border-white/20 rounded-xl bg-white/5 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4">Quality</h3>
              <p className="text-white/70">
                We never compromise on materials or craftsmanship. Every detail is considered.
              </p>
            </div>
            <div className="p-8 border border-white/20 rounded-xl bg-white/5 backdrop-blur-sm">
               <h3 className="text-xl font-bold mb-4">Innovation</h3>
              <p className="text-white/70">
                We push the boundaries of what's possible, constantly exploring new technologies.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
