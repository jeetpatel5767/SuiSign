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
      </div>

      <div className="mt-16 lg:mt-8 text-center animate-fade-up w-full relative z-10" style={{ animationDelay: "0.6s" }}>
        <p className="text-sm text-white/50 mb-2 uppercase tracking-widest font-medium opacity-60">Trusted by World-Class Teams</p>

        <div className="ticker-container w-full">
          <div className="ticker-content">
            {[
              {
                name: "Walrus",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M40.5 24C40.5 33.1127 33.1127 40.5 24 40.5C14.8873 40.5 7.5 33.1127 7.5 24C7.5 14.8873 14.8873 7.5 24 7.5C33.1127 7.5 40.5 14.8873 40.5 24Z" stroke="currentColor" strokeWidth="3" />
                    <path d="M16 22C16 22 19 28 24 28C29 28 32 22 32 22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    <path d="M19 18H20M28 18H29" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    <path d="M22 28V36M26 28V36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                )
              },
              {
                name: "Sui",
                icon: (
                  <svg width="28" height="32" viewBox="0 0 22 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 27C17.0751 27 22 22.0751 22 16C22 13.3137 20.5 10 18 7.5C15.5 5 13.5 2.5 11 0C8.5 2.5 6.5 5 4 7.5C1.5 10 0 13.3137 0 16C0 22.0751 4.92487 27 11 27Z" fill="currentColor" />
                    <path d="M11 20C13.2091 20 15 18.2091 15 16C15 14.7895 14.3182 13.5 13 12.5C11.6818 11.5 12 10 11 9C10 10 10.3182 11.5 9 12.5C7.68182 13.5 7 14.7895 7 16C7 18.2091 8.79086 20 11 20Z" fill="#1e1b1a" />
                  </svg>
                )
              },
            ].concat(Array(18).fill(null)).map((_, i, arr) => {
              const company = arr[i % 2];
              if (!company) return null;
              return (
                <div key={`${company.name}-${i}`} className="ticker-item group">
                  <div className="flex items-center gap-4 text-white/30 hover:text-white/80 transition-all duration-500 cursor-default">
                    <div className="w-10 h-10 flex items-center justify-center">
                      {company.icon}
                    </div>
                    <span className="text-2xl font-bold tracking-tighter">
                      {company.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
