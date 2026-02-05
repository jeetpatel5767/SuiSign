import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "SuiSign transformed how we handle contracts. What used to take days now takes minutes, and our clients love the professional experience.",
    author: "Sarah Chen",
    role: "CEO, TechFlow Solutions",
    avatar: "SC",
    rating: 5,
  },
  {
    quote: "The blockchain verification gives us peace of mind. We know every signature is authentic and tamper-proof. It's a game-changer for compliance.",
    author: "Marcus Rodriguez",
    role: "Legal Director, Innovate Inc",
    avatar: "MR",
    rating: 5,
  },
  {
    quote: "Setting up was incredibly easy. Within an hour, our entire team was signing documents securely. The Gmail-like interface feels instantly familiar.",
    author: "Emily Watson",
    role: "Operations Manager, CloudBase",
    avatar: "EW",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-medium text-primary">Customer Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Trusted by thousands of teams to handle their most important agreements
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="glass-card rounded-2xl p-6 lg:p-8 hover:shadow-elevated transition-shadow"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground mb-8 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: "10K+", label: "Documents Signed" },
            { value: "99.9%", label: "Uptime" },
            { value: "2 min", label: "Average Sign Time" },
            { value: "50+", label: "Countries" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
