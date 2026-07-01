import Header from "@/components/costumer/layout/Header";
import Footer from "@/components/costumer/layout/Footer";

import Hero from "@/components/costumer/hero/Hero";
import QuickAccess from "@/components/costumer/hero/QuickAccess";
import NewsCarousel from "@/components/costumer/news/NewsCarousel";
import Piercast from "@/components/costumer/piercast/Piercast";
import Events from "@/components/costumer/events/Events";

export default function Home() {
  return (
    <>
<div className="z-20 relative">
      <Header />
</div>
      <main className="max-w-[1400px] mx-auto px-10">

        <div className="z-10">
        <Hero />
        </div>
        <div className="relative z-10">
          <QuickAccess />
        </div>
        <NewsCarousel />

        <div className="my-14 border-t" />

        <Piercast />

        <div className="my-14 border-t" />

        <Events />

      </main>

      <Footer />
    </>
  );
}
