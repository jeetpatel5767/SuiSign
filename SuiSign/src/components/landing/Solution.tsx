"use client";

import { Sparkles, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import BG from "../../assets/BG.png";
import Image1 from "../../assets/1.png";
import Image2 from "../../assets/2.png";
import Image3 from "../../assets/3.png";
import Image4 from "../../assets/4.png";
import Image5 from "../../assets/5.png";
import Cloud from "../../assets/Cloud.png";
import Meteor from "../../assets/Meteor.png";


const Solution = () => {
    const contentSections = [
        {
            id: 1,
            title: "Proposal Management",
            description:
                "Create, manage, and finalize proposals with complete visibility and control. Sui Sign ensures every proposal version, approval, and signature is securely recorded and easy to track.",
            image: Image1,
            features: [
                {
                    title: "Version Control",
                    description: "Track changes and keep a clear revision history."
                },
                {
                    title: "Approval Workflow",
                    description: "Send proposals to the right people and collect signatures fast."
                }
            ]
        },
        {
            id: 2,
            title: "Document Collaboration",
            description:
                "Collaborate on documents in real time while maintaining integrity and accountability. Every contribution is transparent, traceable, and protected on-chain.",
            image: Image2,
            features: [
                {
                    title: "Real-Time Editing",
                    description: "Collaborate easily with real-time team updates."
                },
                {
                    title: "Comments & Review",
                    description: "Comment, review, and request edits in one place."
                }
            ]
        },
        {
            id: 3,
            title: "Military-Grade Security",
            description:
                "Protect sensitive documents with enterprise-level security backed by blockchain verification. Sui Sign ensures data remains confidential, tamper-proof, and trusted.",
            image: Image3,
            features: [
                {
                    title: "End-to-End Encryption",
                    description: "Protect documents and signatures with strong encryption."
                },
                {
                    title: "On-Chain Integrity",
                    description: "Ensure authenticity with tamper-proof blockchain records."
                }
            ]
        },
        {
            id: 4,
            title: "Signature Tracking",
            description:
                "Monitor every signature from request to completion with complete transparency. Know exactly who signed, when they signed, and what was agreed upon.",
            image: Image4,
            features: [
                {
                    title: "Real-Time Status",
                    description: "Monitor signature status with instant notifications."
                },
                {
                    title: "Audit Trails",
                    description: "Keep a permanent audit trail for compliance."
                }
            ]
        },
        {
            id: 5,
            title: "Team Communication",
            description:
                "Keep teams aligned throughout the signing process with clear, contextual communication. Reduce friction and ensure everyone stays informed.",
            image: Image5,
            features: [
                {
                    title: "In-Context Messaging",
                    description: "Communicate directly inside documents to stay aligned."
                },
                {
                    title: "Notification & Alerts",
                    description: "Get instant alerts when actions are needed or done."
                }
            ]
        },
    ];

    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    /* 🔹 Image switching based on left content */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(
                            entry.target.getAttribute("data-index")
                        );
                        setActiveIndex(index);
                    }
                });
            },
            {
                rootMargin: "-45% 0px -45% 0px",
                threshold: 0,
            }
        );

        sectionRefs.current.forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section id="features" className="relative">
            {/* ================= HEADER (NORMAL FLOW) ================= */}
            <div className="container mx-auto px-4 lg:px-16">
                <div className="text-center max-w-3xl mx-auto py-20">
                    <div
                        className="inline-flex items-center gap-2 px-4 h-9 rounded-full border mb-6"
                        style={{
                            borderColor: "#bfdbfe",
                            backgroundColor: "#2684ff",
                            boxShadow: "0 4px 4px rgba(0,0,0,0.25)",
                        }}
                    >
                        <Sparkles className="w-4 h-4 text-white fill-white" />
                        <span className="text-sm text-white flex gap-2 items-center">
                            <span>Solutions</span>
                            <span>|</span>
                            <span>See more</span>
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>

                    <h2
                        className="font-semibold mb-4"
                        style={{ fontSize: "54px", color: "#1a1615" }}
                    >
                        Solutions For Every Team
                    </h2>

                    <p style={{ fontSize: "20px", color: "#6d6d6d" }}>
                        Customizable workflow for any team size or industry.
                    </p>
                </div>
            </div>

            {/* ============ CONTENT WRAPPER (SCROLL AREA) ============ */}
            <div className="container mx-auto px-4 lg:px-16">
                <div className="flex gap-16">
                    {/* LEFT CONTENT */}
                    <div className="w-full lg:w-1/2">
                        {contentSections.map((section, index) => (
                            <div
                                key={section.id}
                                ref={(el) => (sectionRefs.current[index] = el)}
                                data-index={index}
                                className="min-h-screen flex flex-col justify-center space-y-6"
                            >
                                <h3
                                    className="font-semibold"
                                    style={{
                                        fontSize: "48px",
                                        color: "#1a1615",
                                        lineHeight: "1.2",
                                    }}
                                >
                                    {section.title}
                                </h3>

                                <p
                                    className="max-w-[480px]"
                                    style={{
                                        fontSize: "18px",
                                        color: "#6d6d6d",
                                        lineHeight: "1.6",
                                    }}
                                >
                                    {section.description}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-24 max-w-[560px] pt-8">
                                    {section.features?.map((feature, i) => (
                                        <div
                                            key={i}
                                            className="rounded-2xl p-7 w-[320px]"
                                            style={{
                                                backgroundColor: "#F6F8FB", // soft neutral
                                                border: "1px solid rgba(26, 22, 21, 0.18)", // subtle dark border
                                            }}
                                        >
                                            {/* Icon */}
                                            <div
                                                className="w-12 h-12 rounded-xl mb-5"
                                                style={{ backgroundColor: "#2684ff" }}
                                            />

                                            <h4
                                                className="font-medium mb-2"
                                                style={{
                                                    fontSize: "18px",
                                                    color: "#1a1615",
                                                }}
                                            >
                                                {feature.title}
                                            </h4>

                                            <p
                                                style={{
                                                    fontSize: "14px",
                                                    color: "#6d6d6d",
                                                    lineHeight: "1.6",
                                                }}
                                            >
                                                {feature.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        ))}
                    </div>

                    {/* RIGHT VISUAL — STICKY ONLY INSIDE THIS WRAPPER */}
                    <div className="hidden lg:block w-1/2">
                        <div className="sticky top-24">
                            <div
                                className="relative w-full max-w-[667px] mx-auto overflow-hidden"
                                style={{ height: "641px" }}
                            >
                                {/* BG */}
                                <img
                                    src={BG}
                                    alt="Background"
                                    className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                                    style={{ objectPosition: "top left" }}
                                />

                                {/* Overlay image changes */}
                                <div className="absolute inset-0 flex items-center justify-center p-8">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={contentSections[activeIndex].image}
                                            src={contentSections[activeIndex].image}
                                            alt="Feature visual"
                                            className="max-w-full h-auto object-contain rounded-2xl"
                                            initial={{ opacity: 0, y: 40, scale: 0.96 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -40, scale: 0.96 }}
                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                            style={{
                                                filter:
                                                    "drop-shadow(0 10px 30px rgba(0,0,0,0.2))",
                                                objectPosition: "top left"
                                            }}
                                        />
                                    </AnimatePresence>
                                </div>

                                {/* Meteor Image - Upper Left Corner */}
                                <img
                                    src={Meteor}
                                    alt="Meteor decoration"
                                    className="absolute pointer-events-none"
                                    style={{
                                        width: "550px",
                                        height: "auto",
                                        top: "-10px",
                                        left: "-80px",
                                        zIndex: 10
                                    }}
                                />

                                {/* Cloud Images - Animated based on scroll */}
                                {/* Left Cloud - Lower Left Corner */}
                                <motion.img
                                    src={Cloud}
                                    alt="Cloud decoration"
                                    className="absolute pointer-events-none"
                                    style={{
                                        width: "520px",
                                        height: "auto",
                                        left: "-320px",
                                        zIndex: 10
                                    }}
                                    animate={{
                                        bottom: `${20 + (activeIndex * 125)}px` // Moves from bottom (20px) to top (520px at index 4)
                                    }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                />

                                {/* Right Cloud - Lower Right Corner (Inverted) */}
                                <motion.img
                                    src={Cloud}
                                    alt="Cloud decoration"
                                    className="absolute pointer-events-none"
                                    style={{
                                        width: "520px",
                                        height: "auto",
                                        right: "-320px",
                                        transform: "scaleX(-1)", // Inverted horizontally
                                        zIndex: 10
                                    }}
                                    animate={{
                                        bottom: `${60 + (activeIndex * 50)}px` // Starts higher (60px) and moves to 460px at index 4
                                    }}
                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Solution;
