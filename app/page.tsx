import { getFeaturedProducts, getProducts } from '@/lib/sanity';
import { Product } from '@/lib/products';
import { HeroSection } from '@/components/HeroSection';
import { FeaturedSection } from '@/components/FeaturedSection';
import { BenefitsSection } from '@/components/BenefitsSection';
import { NewsletterSection } from '@/components/NewsletterSection';
import { TrustBadges } from '@/components/TrustBadges';

export default async function Home() {
  let featuredProducts: Product[] = await getFeaturedProducts();
  
  // If no featured products, show first 3 products instead
  if (featuredProducts.length === 0) {
    const allProducts = await getProducts();
    featuredProducts = allProducts.slice(0, 3);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <TrustBadges />
      <FeaturedSection products={featuredProducts} />
      <BenefitsSection />
      <NewsletterSection />
    </div>
  );
}
