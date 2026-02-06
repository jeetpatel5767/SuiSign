"use client";

import { Twitter, Github, Linkedin, ArrowRight } from "lucide-react";

import BG from "../../assets/BG.png";
import Logo from "../../assets/Logo.png";
import Meteor from "../../assets/Meteor.png";

const footerLinks = {
  company: ["About us", "Blog", "Contact"],
  product: ["Features", "Pricing", "Solutions"],
  resources: ["Terms", "Privacy and Policy"],
};

const socialLinks = [
  { icon: Twitter, href: "#" },
  { icon: Github, href: "#" },
  { icon: Linkedin, href: "#" },
];

const Footer = () => {
  return (
    <footer className="mt-32">
      {/* INSET FOOTER WRAPPER */}
      <div className="px-4 lg:px-16">
        <div className="relative max-w-7xl mx-auto overflow-hidden rounded-t-[32px]">
          {/* BG IMAGE */}
          <img
            src={BG}
            alt="Footer background"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "top left" }}
          />

          {/* METEOR — TOP LEFT */}
          <img
            src={Meteor}
            alt="Meteor decoration"
            className="absolute pointer-events-none z-10"
            style={{
              width: "600px",
              height: "auto",
              top: "0px",
              left: "0px",
            }}
          />

          {/* CONTENT */}
          <div className="relative z-20 px-8 lg:px-16 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-14">
              {/* LEFT — BRAND */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={Logo}
                    alt="SuiSign logo"
                    className="w-9 h-9 object-contain"
                  />
                  <span className="text-lg font-semibold text-white tracking-wide">
                    SUISIGN
                  </span>
                </div>

                <p className="text-sm text-white/80 max-w-xs mb-6 leading-relaxed">
                  Decentralized document signing for the Web3 era.
                </p>

                {/* EMAIL INPUT */}
                <div className="flex items-center rounded-full px-4 py-2 max-w-sm bg-white/20">
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    className="bg-transparent flex-1 text-sm text-white placeholder:text-white/60 outline-none"
                  />
                  <button className="ml-2 flex items-center gap-1 text-sm text-white font-medium">
                    Submit
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* SOCIAL ICONS */}
                <div className="flex gap-5 mt-8">
                  {socialLinks.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="text-white/80 hover:text-white transition"
                    >
                      <item.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* RIGHT — LINKS */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-4">
                  Company
                </h4>
                <ul className="space-y-3">
                  {footerLinks.company.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm text-white/70 hover:text-white transition"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-white mb-4">
                  Product
                </h4>
                <ul className="space-y-3">
                  {footerLinks.product.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm text-white/70 hover:text-white transition"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-white mb-4">
                  Resources
                </h4>
                <ul className="space-y-3">
                  {footerLinks.resources.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm text-white/70 hover:text-white transition"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="mt-16 pt-6 border-t border-white/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-white/70">
                © {new Date().getFullYear()} SuiSign. All rights reserved.
              </p>
              <p className="text-xs text-white/70">
                Built for the Web3 community
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
