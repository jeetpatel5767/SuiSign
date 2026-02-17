import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroDashboardImg from "@/assets/Hero_Dashbaord.png";
import bgImage from "@/assets/BG.png";

const HeroSection = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section className="relative min-h-screen" ref={containerRef}>
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
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

        {/* Dashboard Image with SaaS-style Scroll Animation */}
        <div className="mt-20 lg:mt-32 relative w-full max-w-[1200px] mx-auto perspective-1000">
          <motion.div
            style={{
              rotateX,
              scale,
              opacity,
              transformPerspective: "1200px",
            }}
            className="w-full h-auto rounded-[32px] border border-white/10 bg-white/5 overflow-hidden shadow-2xl"
          >
            <img
              src={HeroDashboardImg}
              alt="SuiSign Dashboard Preview"
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>

        {/* Trusted By Section - Now inside container with refined margin */}
        <div className="mt-24 lg:mt-40 text-center animate-fade-up w-full" style={{ animationDelay: "0.6s" }}>
          <p className="text-sm text-white/70 mb-10 uppercase tracking-[0.2em] font-medium transition-colors">Trusted by World-Class Teams</p>

          <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-24">
            {/* Walrus Logo */}
            <div className="flex items-center gap-4 text-white/60 hover:text-white transition-all duration-300 cursor-default group">
              <div className="w-10 h-10 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M40.5 24C40.5 33.1127 33.1127 40.5 24 40.5C14.8873 40.5 7.5 33.1127 7.5 24C7.5 14.8873 14.8873 7.5 24 7.5C33.1127 7.5 40.5 14.8873 40.5 24Z" stroke="currentColor" strokeWidth="3" />
                  <path d="M16 22C16 22 19 28 24 28C29 28 32 22 32 22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <path d="M19 18H20M28 18H29" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  <path d="M22 28V36M26 28V36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-2xl font-bold tracking-tighter opacity-80 group-hover:opacity-100 transition-opacity">Walrus</span>
            </div>

            {/* Sui Logo */}
            <div className="flex items-center gap-4 text-white/60 hover:text-white transition-all duration-300 cursor-default group">
              <div className="w-10 h-10 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                <svg width="28" height="32" viewBox="0 0 22 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 27C17.0751 27 22 22.0751 22 16C22 13.3137 20.5 10 18 7.5C15.5 5 13.5 2.5 11 0C8.5 2.5 6.5 5 4 7.5C1.5 10 0 13.3137 0 16C0 22.0751 4.92487 27 11 27Z" fill="currentColor" />
                  <path d="M11 20C13.2091 20 15 18.2091 15 16C15 14.7895 14.3182 13.5 13 12.5C11.6818 11.5 12 10 11 9C10 10 10.3182 11.5 9 12.5C7.68182 13.5 7 14.7895 7 16C7 18.2091 8.79086 20 11 20Z" fill="#1e1b1a" />
                </svg>
              </div>
              <span className="text-2xl font-bold tracking-tighter opacity-80 group-hover:opacity-100 transition-opacity">Sui</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
