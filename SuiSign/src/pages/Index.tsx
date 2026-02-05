import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import Video from "@/components/landing/Video";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: `
          linear-gradient(
            180deg,
            #FAFAFA 0%,
            #F9F8F8 36%,
            #F4F1EE 45%,
            #F4F1EE 51%,
            #E2ECF6 73%,
            #A7CBF2 100%
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
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
