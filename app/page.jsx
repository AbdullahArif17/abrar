import { Header } from "../components/header"
import { HeroSection } from "../components/hero-section"
import { CategoryIcons } from "../components/category-icons"
import { AzadiSaleSection } from "../components/azadi-sale-section"
import { FeaturesSection } from "../components/features-section"
import { VideoSection } from "../components/video-section"
import { JustLaunchedSection } from "../components/just-launched-section"
import { BottomCategories } from "../components/bottom-categories"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <CategoryIcons />
      <AzadiSaleSection />
      <FeaturesSection />
      <VideoSection />
      <JustLaunchedSection />
      <BottomCategories />
    </div>
  )
}
