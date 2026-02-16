import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Sparkles } from "lucide-react";
import ProductSpline from "./ProductSpline";
import bgImage from "@/assets/BG.png";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen">
      {/* Background Image - 60% coverage, cropped */}
      <div className="absolute inset-0 h-[100%]">
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

        {/* Simplified Rectangle Container with Spline */}
        <div className="mt-16 lg:mt-24 relative w-full max-w-[1400px] mx-auto px-4 lg:px-6">
          <div className="w-full h-[60vh] lg:h-[80vh] rounded-[40px] border border-white/10 bg-white/5 overflow-hidden">
            <ProductSpline />
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
