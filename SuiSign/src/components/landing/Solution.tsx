"use client";

import { Sparkles, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import BG from "../../assets/BG.png";
import Cloud from "../../assets/Cloud.png";
import Meteor from "../../assets/Meteor.png";
import { contentSections } from "../../data/Solution";

const Solution = () => {
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

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
            { rootMargin: "-45% 0px -45% 0px" }
        );

        sectionRefs.current.forEach((s) => s && observer.observe(s));
        return () => observer.disconnect();
    }, []);

    return (
        <section id="features" className="relative">
            {/* ================= HEADER ================= */}
            <div className="container mx-auto px-4 lg:px-16">
                <div className="text-center max-w-3xl mx-auto py-16 lg:py-20">
                    <div
                        className="inline-flex items-center gap-2 px-4 h-9 rounded-full border mb-5"
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
                        className="font-semibold mb-4 leading-tight"
                        style={{ fontSize: "54px", color: "#1a1615" }}
                    >
                        Solutions For Every Team
                    </h2>

                    <p
                        className="text-[16px] lg:text-[20px]"
                        style={{ color: "#6d6d6d" }}
                    >
                        Customizable workflow for any team size or industry.
                    </p>
                </div>
            </div>

            {/* ================= CONTENT ================= */}
            <div className="container mx-auto px-4 lg:px-16">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* LEFT CONTENT */}
                    <div className="w-full lg:w-1/2">
                        {contentSections.map((section, index) => (
                            <div
                                key={section.id}
                                ref={(el) => (sectionRefs.current[index] = el)}
                                data-index={index}
                                className="flex flex-col justify-start space-y-4 py-16 md:py-24 lg:min-h-screen"
                            >
                                {/* MOBILE VISUAL (INLINE, NON-STICKY) */}
                                <div className="block md:hidden mb-6">
                                    <div className="relative h-[220px] rounded-2xl overflow-hidden">
                                        <img
                                            src={BG}
                                            alt="Background"
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                        <img
                                            src={section.image}
                                            alt="Feature"
                                            className="absolute inset-0 w-full h-full object-contain p-6"
                                        />
                                    </div>
                                </div>

                                <h3
                                    className="text-2xl font-normal"
                                    style={{
                                        fontSize: "32px",
                                        color: "#1a1615",
                                        lineHeight: "1.25",
                                    }}
                                >
                                    {section.title}
                                </h3>

                                <p
                                    className="max-w-full lg:max-w-[480px]"
                                    style={{
                                        fontSize: "16px",
                                        color: "#6d6d6d",
                                        lineHeight: "1.6",
                                    }}
                                >
                                    {section.description}
                                </p>

                                {/* FEATURES — MOBILE STACKED */}
                                <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2 md:gap-24 md:pt-8 md:max-w-[560px]">
                                    {section.features?.map((feature, i) => (
                                        <div
                                            key={i}
                                            className="rounded-xl p-5 w-full md:w-[320px]"
                                            style={{
                                                backgroundColor: "#F6F8FB",
                                                border:
                                                    "1px solid rgba(26, 22, 21, 0.18)",
                                            }}
                                        >
                                            <div
                                                className="w-10 h-10 rounded-lg mb-4"
                                                style={{ backgroundColor: "#2684ff" }}
                                            />

                                            <h4
                                                className="font-medium mb-1 "
                                                style={{
                                                    fontSize: "16px",
                                                    color: "#1a1615",
                                                }}
                                            >
                                                {feature.title}
                                            </h4>

                                            <p
                                                style={{
                                                    fontSize: "14px",
                                                    color: "#6d6d6d",
                                                    lineHeight: "1.5",
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

                    {/* ================= TABLET + DESKTOP VISUAL (UNCHANGED) ================= */}
                    <div className="hidden md:block w-1/2">
                        <div className="sticky top-24">
                            <div
                                className="relative w-full max-w-[667px] mx-auto overflow-hidden"
                                style={{ height: "641px" }}
                            >
                                <img
                                    src={BG}
                                    alt="Background"
                                    className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                                    style={{ objectPosition: "top left" }}
                                />

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
                                        />
                                    </AnimatePresence>
                                </div>

                                <img
                                    src={Meteor}
                                    alt="Meteor"
                                    className="absolute pointer-events-none"
                                    style={{
                                        width: "550px",
                                        top: "-10px",
                                        left: "-80px",
                                        zIndex: 10,
                                    }}
                                />

                                <motion.img
                                    src={Cloud}
                                    alt="Cloud"
                                    className="absolute pointer-events-none"
                                    style={{
                                        width: "520px",
                                        left: "-320px",
                                        zIndex: 10,
                                    }}
                                    animate={{
                                        bottom: `${20 + activeIndex * 125}px`,
                                    }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                />

                                <motion.img
                                    src={Cloud}
                                    alt="Cloud"
                                    className="absolute pointer-events-none"
                                    style={{
                                        width: "520px",
                                        right: "-320px",
                                        transform: "scaleX(-1)",
                                        zIndex: 10,
                                    }}
                                    animate={{
                                        bottom: `${60 + activeIndex * 50}px`,
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        ease: "easeInOut",
                                    }}
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
