import Features from "@/components/home/Features";
import Gallery from "@/components/home/Gallery";
import Hero from "@/components/home/Hero";
import HomeEvents from "@/components/home/HomeEvents";
import Newsletter from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <HomeEvents />
      <Gallery />
      <Newsletter />
    </>
  );
}