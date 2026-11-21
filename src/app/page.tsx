import { Cta } from "@/components/sections/Cta";
import { Features } from "@/components/sections/Features";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { MarqueeStrip } from "@/components/sections/MarqueeStrip";
import { Showcase } from "@/components/sections/Showcase";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <>
      <main id="main">
        <Hero />
        <MarqueeStrip />
        <Showcase />
        <Features />
        <Stats />
        <Testimonials />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
