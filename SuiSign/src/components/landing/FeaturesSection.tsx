import { Clock, Shield, Users, CheckCircle, FileText, Lock, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Clock,
    title: "Sign documents in minutes, not days",
    description: "Upload, add signers, place signature fields, and send for signing in under 5 minutes. No more waiting for physical documents or complex workflows.",
    highlight: true,
  },
  {
    icon: Shield,
    title: "Keep every agreement organized and verifiable",
    description: "All your documents in one place with blockchain-verified signatures. Search, filter, and access any agreement instantly with complete audit trails.",
    highlight: false,
  },
  {
    icon: Users,
    title: "Collaborate with clarity and trust",
    description: "Add multiple signers with specific roles. Everyone knows exactly where to sign, and all parties can verify the authenticity of every signature.",
    highlight: false,
  },
];

const additionalFeatures = [
  {
    icon: FileText,
    title: "Smart Document Management",
    description: "Gmail-like interface to manage all your agreements with folders, filters, and powerful search.",
  },
  {
    icon: Lock,
    title: "Identity Verification",
    description: "Optional identity verification ensures signers are who they claim to be.",
  },
  {
    icon: Zap,
    title: "Instant Notifications",
    description: "Real-time updates when documents are viewed, signed, or need attention.",
  },
  {
    icon: Globe,
    title: "Works Anywhere",
    description: "Sign from any device, anywhere in the world with our responsive web platform.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Why Teams Choose SuiSign</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Everything you need to sign with confidence
          </h2>
          <p className="text-lg text-muted-foreground">
            From startups to enterprises, SuiSign provides the tools you need for secure, efficient document signing.
          </p>
        </div>

        {/* Main Features - Alternating Layout */}
        <div className="space-y-24 lg:space-y-32 mb-24">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-20`}
            >
              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  {feature.description}
                </p>
                <Button variant="hero" size="lg">
                  Learn More
                </Button>
              </div>

              {/* Visual */}
              <div className="flex-1 w-full">
                <div className="glass-card rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-elevated">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-sky-100 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-20 h-20 text-primary/40" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="text-center mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Solutions for Every Team
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Powerful features that adapt to your workflow
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalFeatures.map((feature) => (
            <div
              key={feature.title}
              className="glass-card rounded-2xl p-6 hover:shadow-elevated transition-shadow group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
