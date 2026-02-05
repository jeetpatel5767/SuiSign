import { Sparkles, ArrowUpRight } from "lucide-react";

const testimonialsRow1 = [
  {
    quote: "SuiSign transformed our contract process. What took days now takes minutes.",
    author: "Sarah Chen",
    role: "CEO, TechFlow Solutions",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces",
    rating: 5,
  },
  {
    quote: "Blockchain verification gives us peace of mind. A game-changer for compliance.",
    author: "Marcus Rodriguez",
    role: "Legal Director, Innovate Inc",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
    rating: 5,
  },
  {
    quote: "Setup was incredibly easy. Our team was signing securely within an hour.",
    author: "Emily Watson",
    role: "Operations Manager, CloudBase",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces",
    rating: 5,
  },
  {
    quote: "We reduced document turnaround time by 80%. A lifesaver for remote teams.",
    author: "David Park",
    role: "CTO, StartupHub",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces",
    rating: 5,
  },
  {
    quote: "Top-notch security. Our legal team trusts it completely for sensitive agreements.",
    author: "Jennifer Lee",
    role: "Head of Legal, FinanceCore",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=faces",
    rating: 5,
  },
];

const testimonialsRow2 = [
  {
    quote: "Phenomenal support. They helped us migrate all workflows seamlessly.",
    author: "Robert Taylor",
    role: "VP Operations, GlobalTech",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces",
    rating: 5,
  },
  {
    quote: "Mobile experience is excellent. Field teams get signatures on-site effortlessly.",
    author: "Lisa Anderson",
    role: "Field Manager, BuildRight",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=faces",
    rating: 5,
  },
  {
    quote: "Seamless integration with our tools. Fits perfectly into our workflow.",
    author: "Michael Chang",
    role: "IT Director, MediaWorks",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=faces",
    rating: 5,
  },
  {
    quote: "Audit trails saved us countless hours during compliance reviews. Perfect documentation.",
    author: "Amanda Foster",
    role: "Compliance Officer, HealthTech",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=faces",
    rating: 5,
  },
  {
    quote: "Best ROI from any software. Paid for itself in the first month.",
    author: "James Wilson",
    role: "CFO, RetailPro",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=faces",
    rating: 5,
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonialsRow1[0] }) => (
  <div
    className="bg-white min-w-[385px] mx-4 flex flex-col justify-between"
    style={{
      height: '238px',
      width: '385px',
      borderRadius: '16px',
      border: '1px solid #e5e7eb',
      padding: '32px'
    }}
  >
    {/* Testimonial Text */}
    <p className="font-medium leading-relaxed" style={{ fontSize: '18px', color: '#111827' }}>
      {testimonial.quote}
    </p>

    {/* Author Info */}
    <div className="flex items-center gap-4 mt-4">
      <img
        src={testimonial.image}
        alt={testimonial.author}
        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
      />
      <div>
        <p className="font-medium text-foreground">{testimonial.author}</p>
        <p className="font-normal text-sm" style={{ color: '#666666' }}>{testimonial.role}</p>
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 h-9 rounded-full border mb-6" style={{ borderColor: '#bfdbfe', backgroundColor: '#2684ff', boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)' }}>
            <Sparkles className="w-4 h-4 text-white fill-white" />
            <span className="text-sm font-regular text-white gap-3 flex items-center">
              <span>Testimonials</span>
              <span>|</span>
              <span>See more</span>
            </span>
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
          <h2 className="font-semibold mb-4" style={{ fontSize: '54px', color: '#1a1615' }}>
            What Our Customers Say
          </h2>
          <p className="font-normal mb-8" style={{ fontSize: '20px', color: '#6d6d6d' }}>
            Success stories from teams using SuiSign to handle their most important agreements
          </p>
        </div>
      </div>

      {/* Infinite Scrolling Testimonials */}
      <div className="space-y-8 relative">
        {/* Blur effect on left side */}
        <div className="absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-r from-white via-white/70 to-transparent z-10 pointer-events-none" />

        {/* Blur effect on right side */}
        <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-white via-white/70 to-transparent z-10 pointer-events-none" />

        {/* Row 1 - Left to Right */}
        <div className="relative overflow-hidden">
          <style dangerouslySetInnerHTML={{
            __html: `
              @keyframes scroll-left {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              @keyframes scroll-right {
                0% {
                  transform: translateX(-50%);
                }
                100% {
                  transform: translateX(0);
                }
              }
              .animate-scroll-left {
                animation: scroll-left 40s linear infinite;
              }
              .animate-scroll-right {
                animation: scroll-right 40s linear infinite;
              }
            `
          }} />
          <div className="flex animate-scroll-left">
            {/* Duplicate the array twice for seamless loop */}
            {[...testimonialsRow1, ...testimonialsRow1].map((testimonial, index) => (
              <TestimonialCard key={`row1-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* Row 2 - Right to Left */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-right">
            {/* Duplicate the array twice for seamless loop */}
            {[...testimonialsRow2, ...testimonialsRow2].map((testimonial, index) => (
              <TestimonialCard key={`row2-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
