import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useRef } from "react";
import { useScroll, motion } from "framer-motion";
import ProductScrollCanvas from "./ProductScrollCanvas";
import heroImage from "@/assets/hero-image.png";
import bgImage from "@/assets/BG.png";

const HeroSection = () => {
  const navigate = useNavigate();
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"]
  });

  return (
    <section className="relative min-h-screen">
      {/* Background Image - 60% coverage, cropped */}
      <div className="absolute inset-0 h-[70%]">
        <div
          className="w-full h-full bg-cover bg-start bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 pt-32 lg:pt-52 pb-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge with Star */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-[1px] border border-white mb-8 animate-fade-up">
            <Sparkles className="w-4 h-4 text-white fill-white" />
            <span className="text-sm font-regular text-white">We have won $30k in grants  |  See updates</span>
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>

          {/* Main Headline - 64px medium */}
          <h1 className="text-[64px] font-medium text-white leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Trustless Document Signing for the Web3 Era
          </h1>

          {/* Subheadline - 18px regular */}
          <p className="text-[18px] font-normal text-white/90 max-w-4xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Secure your agreements on the Sui blockchain with immutable storage powered by Walrus. Enterprise-grade document signing without centralized intermediaries.
          </p>

          {/* CTA Buttons with exact dimensions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <button
              className="w-[167px] h-[44px] rounded-[8px] bg-[#111827] text-white text-sm font-medium hover:bg-[#1f2937] transition-colors shadow-md"
              onClick={() => navigate("/dashboard")}
            >
              Start Signing Now
            </button>
            <button className="w-[116px] h-[44px] rounded-[8px] bg-white text-[#111827] text-sm font-medium hover:bg-white/90 transition-colors shadow-md">
              See Demo
            </button>
          </div>
        </div>

        {/* Hero Image Section with Sticky Animation Track */}
        <div ref={trackRef} className="mt-16 lg:mt-20 relative h-[300vh]">
          <div className="sticky top-20 h-[70vh] w-full flex items-center justify-center">
            <div className="relative w-full max-w-5xl h-full">
              <ProductScrollCanvas
                folderPath="/HeroSection"
                frameCount={192}
                scrollYProgress={scrollYProgress}
              >
                {/* Floating elements */}
                <div className="absolute -left-4 lg:-left-8 top-1/4 glass-card rounded-xl p-3 lg:p-4 animate-float hidden md:block">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Signature Verified</p>
                      <p className="text-xs text-muted-foreground">Just now</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-4 lg:-right-8 top-1/3 glass-card rounded-xl p-3 lg:p-4 animate-float-delayed hidden md:block">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Blockchain Secured</p>
                      <p className="text-xs text-muted-foreground">Immutable record</p>
                    </div>
                  </div>
                </div>
              </ProductScrollCanvas>
            </div>
          </div>
        </div>

        {/* Social proof logos */}
        <div className="mt-16 lg:mt-24 text-center animate-fade-up" style={{ animationDelay: "0.6s" }}>
          <p className="text-sm text-white/70 mb-6">Trusted by World-Class Teams</p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12 opacity-60">
            {["Acme Corp", "TechFlow", "CloudBase", "DataSync", "NetVault"].map((company) => (
              <div key={company} className="text-lg font-semibold text-white/60">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
