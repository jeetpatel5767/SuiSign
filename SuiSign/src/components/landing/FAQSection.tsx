"use client";

import { useState } from "react";
import { Sparkles, ArrowUpRight } from "lucide-react";

const faqs = [
  {
    question: "How does blockchain verification work?",
    answer:
      "Every signature on SuiSign is cryptographically secured and recorded on the blockchain. This creates an immutable, tamper-proof record that can be independently verified at any time. You don’t need blockchain knowledge—SuiSign abstracts the complexity while preserving trust.",
  },
  {
    question: "Is SuiSign legally binding?",
    answer:
      "Yes. Electronic signatures collected via SuiSign are legally binding under major regulations such as ESIGN (US), eIDAS (EU), and similar laws worldwide. Blockchain verification strengthens authenticity and non-repudiation.",
  },
  {
    question: "What document formats are supported?",
    answer:
      "SuiSign currently supports PDF documents, which covers most professional and legal workflows. Additional formats like Word documents and images are actively being developed.",
  },
  {
    question: "How do signers receive documents?",
    answer:
      "Signers receive a secure email with a unique signing link. No account is required, and documents can be signed from any device—desktop, tablet, or mobile.",
  },
  {
    question: "Can I try SuiSign for free?",
    answer:
      "Yes. SuiSign offers a free tier with no credit card required. You can send documents, collect signatures, and upgrade anytime for advanced features.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="faq" className="py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-16">
        {/* HEADER (UNCHANGED) */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div
            className="inline-flex items-center gap-2 px-4 h-9 rounded-full border mb-6"
            style={{
              borderColor: "#bfdbfe",
              backgroundColor: "#2684ff",
              boxShadow: "0 4px 4px rgba(0,0,0,0.25)",
            }}
          >
            <Sparkles className="w-4 h-4 text-white fill-white" />
            <span className="text-sm text-white flex gap-3 items-center">
              <span>FAQ</span>
              <span>|</span>
              <span>See more</span>
            </span>
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>

          <h2
            className="font-semibold mb-4"
            style={{ fontSize: "54px", color: "#1a1615" }}
          >
            Common Questions
          </h2>

          <p
            className="font-normal"
            style={{ fontSize: "20px", color: "#6d6d6d" }}
          >
            Everything you need to know about SuiSign
          </p>
        </div>

        {/* FAQ BODY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* LEFT — QUESTIONS */}
          <div className="space-y-6">
            {faqs.map((faq, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-full text-left transition-all ${isActive
                    ? "opacity-100"
                    : "opacity-50 hover:opacity-80"
                    }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`text-sm font-medium ${isActive ? "text-blue-600" : "text-neutral-400"
                        }`}
                    >
                      0{index + 1}
                    </span>
                    <h2
                      className={`text-[16px] lg:text-[24px] font-normal leading-snug ${isActive ? "text-[#1a1615]" : "text-[#1a1615]"
                        }`}
                    >
                      {faq.question}
                    </h2>

                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT — ANSWER PANEL */}
          <div className="relative">
            <div className="sticky top-32">
              <div className="rounded-3xl border border-neutral-200 bg-white p-10 bg-white/[0.3] backdrop-blur-xl shadow-lg">
                <p className="text-lg leading-relaxed text-[#6d6d6d] max-w-[520px]">
                  {faqs[activeIndex].answer}
                </p>

                <div className="mt-10 text-sm text-neutral-500">
                  Need more clarity?{" "}
                  <span className="text-blue-600 font-medium cursor-pointer hover:underline">
                    Talk to our team
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
