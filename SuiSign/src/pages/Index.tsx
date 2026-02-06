import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import Video from "@/components/landing/Video";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";
import Solution from "@/components/landing/Solution";

const Index = () => {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: `
linear-gradient(
  180deg,
  #A7CBF2 0%,
  #E2ECF6 27%,
  #F4F1EE 49%,
  #F4F1EE 55%,
  #F9F8F8 64%,
  #FAFAFA 100%
)

        `,
      }}
    >
      <Navbar />
      <main>
        <HeroSection />
        <Video />
        <TestimonialsSection />
        <FeaturesSection />
        <Solution />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
