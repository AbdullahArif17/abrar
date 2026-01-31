import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-secondary/40 via-white to-secondary/30 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-semibold text-primary">About Us</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary mb-8">
            Building the Future of Tech
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            At JTech Mart, we believe in the power of minimalism and technology. Our mission is to create products that integrate seamlessly into your life.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-video md:aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/30 to-primary/5 shadow-2xl border border-border/50">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10" /> 
               {/* In a real app, use a real image here */}
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-4xl">🚀</span>
                    </div>
                  </div>
               </div>
            </div>
            <div className="space-y-8">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">Our Journey</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-6">Our Story</h2>
              </div>
              <div className="space-y-5">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Founded in 2024, JTech Mart started with a simple question: Why does technology have to be complicated? We set out to strip away the unnecessary and focus on what truly matters - performance, design, and user experience.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Today, we are a team of engineers, designers, and dreamers working together to redefine how people interact with their devices. From our precision-engineered smart watches to our high-fidelity audio equipment, every product is a testament to our obsession with quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary/95 to-primary text-primary-foreground relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <div className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
              <span className="text-sm font-semibold text-white">Our Foundation</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Values</h2>
            <p className="text-white/80 text-lg">The core principles that guide everything we do.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            <div className="group p-10 border border-white/20 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Simplicity</h3>
              <p className="text-white/80 leading-relaxed">
                We believe that less is more. Our designs are clean, intuitive, and distraction-free.
              </p>
            </div>
            <div className="group p-10 border border-white/20 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">💎</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Quality</h3>
              <p className="text-white/80 leading-relaxed">
                We never compromise on materials or craftsmanship. Every detail is considered.
              </p>
            </div>
            <div className="group p-10 border border-white/20 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🚀</span>
              </div>
               <h3 className="text-2xl font-bold mb-4">Innovation</h3>
              <p className="text-white/80 leading-relaxed">
                We push the boundaries of what's possible, constantly exploring new technologies.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
