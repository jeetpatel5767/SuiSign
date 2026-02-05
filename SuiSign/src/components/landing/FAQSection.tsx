import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How does blockchain verification work?",
    answer: "Every signature on SuiSign is cryptographically secured and recorded on the blockchain. This creates an immutable, tamper-proof record that can be verified by anyone at any time. You don't need to understand blockchain technology to use it—we handle all the complexity behind the scenes.",
  },
  {
    question: "What document formats are supported?",
    answer: "SuiSign currently supports PDF documents, which covers the vast majority of business use cases. We're actively working on adding support for more formats including Word documents and images.",
  },
  {
    question: "Is SuiSign legally binding?",
    answer: "Yes! Electronic signatures through SuiSign are legally binding in most countries under laws like ESIGN (US), eIDAS (EU), and similar regulations worldwide. Our blockchain verification adds an extra layer of authenticity and non-repudiation.",
  },
  {
    question: "How do signers receive documents?",
    answer: "Signers receive a secure email invitation with a unique link to sign the document. They can sign from any device without needing to create an account. The process is simple, fast, and mobile-friendly.",
  },
  {
    question: "What is identity verification?",
    answer: "Identity verification is an optional feature that requires signers to verify their identity before signing. This can include email verification, phone verification, or more advanced methods. It's useful for high-stakes documents where you need extra assurance.",
  },
  {
    question: "Can I try SuiSign for free?",
    answer: "Absolutely! SuiSign offers a generous free tier that lets you send documents and collect signatures at no cost. No credit card required to get started. Upgrade anytime for advanced features like custom branding and priority support.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background decoration
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" /> */}

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Common Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about SuiSign
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card rounded-xl px-6 border-none"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
