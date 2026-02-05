import { Upload, Users, PenTool, CheckCircle } from "lucide-react";

const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold text-sm mb-4">
            SEE IT IN ACTION
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            See SuiSign in Action
          </h2>
          <p className="text-lg text-muted-foreground">
            Watch how teams are transforming their document workflows with blockchain-powered security and seamless collaboration.
          </p>
        </div>

        {/* Video Mockup */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden card-shadow-lg">
            {/* Laptop Frame */}
            <div className="bg-foreground/90 rounded-t-2xl px-4 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-accent-foreground/40" />
              <div className="w-3 h-3 rounded-full bg-primary/60" />
            </div>

            <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent relative">
              {/* Placeholder for video/image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <button className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-4 mx-auto hover:bg-primary/90 transition-all hover:scale-105 shadow-lg">

                  </button>
                  <p className="text-foreground font-medium">Watch the 2-minute demo</p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-8 left-8 w-64 h-40 bg-card rounded-lg card-shadow opacity-80" />
              <div className="absolute bottom-8 right-8 w-48 h-32 bg-card rounded-lg card-shadow opacity-80" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorksSection;
