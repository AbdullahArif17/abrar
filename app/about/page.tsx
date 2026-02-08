import Image from 'next/image';
import { AboutHero } from '@/components/AboutHero';
import { AboutValues } from '@/components/AboutValues';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <AboutHero />

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <div className="relative aspect-video md:aspect-square rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/30 to-primary/5 shadow-2xl border border-border/50">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10" /> 
               <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
                  <div className="text-center">
                    <Image
                      src="/J Tech Mart Logo-01.png"
                      alt="JTech Mart Logo"
                      width={320}
                      height={320}
                      className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 mx-auto object-contain"
                      priority
                    />
                  </div>
               </div>
            </div>
            <div className="space-y-6 md:space-y-8">
              <div>
                <div className="inline-block px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">Our Journey</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary mb-4 md:mb-6">Our Story</h2>
              </div>
              <div className="space-y-4 md:space-y-5">
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Founded in 2024, JTech Mart started with a simple question: Why does technology have to be complicated? We set out to strip away the unnecessary and focus on what truly matters - performance, design, and user experience.
              </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Today, we are a team of engineers, designers, and dreamers working together to redefine how people interact with their devices. From our precision-engineered smart watches to our high-fidelity audio equipment, every product is a testament to our obsession with quality.
              </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AboutValues />
    </div>
  );
}
