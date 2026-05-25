import Hero from "@/components/Hero";
import FeaturedInventory from "@/components/FeaturedInventory";
import CategoryTabs from "@/components/CategoryTabs";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import { featuredInventory } from "@/data/inventory";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedInventory vehicles={featuredInventory} />
      <CategoryTabs />
      <ServicesSection />
      <AboutSection />
    </>
  );
}
