import { Clock, Shield, Users, Sparkles, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";




const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background decoration
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" /> */}

      <div className="container mx-auto px-4 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 h-9 rounded-full border mb-6" style={{ borderColor: '#bfdbfe', backgroundColor: '#2684ff', boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)' }}>
            <Sparkles className="w-4 h-4 text-white fill-white" />
            <span className="text-sm font-regular text-white gap-3 flex items-center">
              <span>Benefits</span>
              <span>|</span>
              <span>See more</span>
            </span>
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
          <h2 className="font-semibold mb-4" style={{ fontSize: '54px', color: '#1a1615' }}>
            Why Teams Choose SuiSign
          </h2>
          <p className="font-normal mb-8" style={{ fontSize: '20px', color: '#6d6d6d' }}>
            Experience the difference of an all in one workspace
          </p>
        </div>

        {/* Main Features - Alternating Layout */}
        <div className="space-y-16 lg:space-y-24 mb-24">
          {[
            {
              icon: Clock,
              label: "INCREASE PRODUCTIVITY",
              title: "Sign documents in minutes.",
              description: "Create, send, and finalize agreements faster with automated on-chain signing flows. Sui Sign with automated on-chain signing flows. Sui Sign every signature instant on the Sui blockchain.",
              buttonText: "Faster by default",
            },
            {
              icon: Shield,
              label: "BETTER ORGANIZATION",
              title: "Keep everything organized.",
              description: "All documents, signatures, and versions live in one secure, on-chain workspace. Nothing is lost, nothing is altered, and every action remains permanently accessible whenever you need proof.",
              buttonText: "Source of truth",
            },
            {
              icon: Users,
              label: "ENHANCED COLLABORATION",
              title: "Collaborate with clarity and trust",
              description: "Work together in real time while every update, comment, and signature is transparently recorded. Sui Sign ensures all participants stay aligned with cryptographic proof backing every step.",
              buttonText: "Trust built in",
            },
          ].map((feature, index) => (
            <div
              key={feature.label}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-16`}
            >
              {/* Gradient Panel */}
              <div
                className="rounded-3xl"
                style={{
                  width: '588px',
                  height: '435px',
                  background: `linear-gradient(
                    180deg,
                    #FAFAFA 0%,
                    #F9F8F8 36%,
                    #F4F1EE 45%,
                    #F4F1EE 51%,
                    #E2ECF6 73%,
                    #A7CBF2 100%
                  )`
                }}
              />

              {/* Content */}
              <div className="flex flex-col justify-center py-8 lg:py-12" style={{ width: '540px' }}>
                {/* Logo and Label */}
                <div className="flex items-center gap-3 mb-6">
                  <feature.icon className="w-5 h-5" style={{ color: '#7c7c7c' }} />
                  <span className="font-semibold uppercase" style={{ fontSize: '14px', color: '#7c7c7c', letterSpacing: '0.5px' }}>
                    {feature.label}
                  </span>
                </div>

                {/* Main Heading */}
                <h3 className="font-semibold mb-6" style={{ fontSize: '64px', color: '#1a1615', lineHeight: '1.1' }}>
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="font-normal mb-8" style={{ fontSize: '18px', color: '#453f3d', lineHeight: '1.6' }}>
                  {feature.description}
                </p>

                {/* Button */}
                <button
                  className="font-regular rounded-full transition-all hover:opacity-90"
                  style={{
                    height: '55px',
                    backgroundColor: '#1a1615',
                    color: '#ffffff',
                    fontSize: '16px',
                    padding: '0 32px',
                    width: 'fit-content'
                  }}
                >
                  {feature.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default FeaturesSection;
