import { useState, useEffect } from "react";
import Logo from "../../assets/Logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`fixed top-6 left-0 right-0 z-50 px-4 lg:px-8 transition-all duration-500`}>
      <nav
        className={`mx-auto flex items-center transition-all duration-500 ease-in-out px-4 py-2 ${isScrolled
          ? "max-w-md bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[100px] justify-center py-2.5 shadow-2xl"
          : "max-w-5xl bg-white/[0.133] backdrop-blur-xl border border-white/5 rounded-[43px] justify-between shadow-lg"
          }`}
      >
        {/* Logo */}
        <div
          className={`flex items-center gap-2 transition-all duration-500 overflow-hidden ${isScrolled ? "w-0 opacity-0 pointer-events-none" : "w-auto opacity-100"
            }`}
        >
          <img src={Logo} alt="Sui Sign Logo" className="w-8 h-8 object-contain" />
          <span className={`text-base font-semibold whitespace-nowrap transition-colors duration-500 ${isScrolled ? "text-black" : "text-white"}`}>Sui Sign</span>
        </div>

        {/* Navigation Links - Center */}
        <div className={`flex items-center transition-all duration-500 ${isScrolled ? "gap-6 md:gap-8" : "gap-8 hidden md:flex"}`}>
          <a
            href="#features"
            className={`text-sm font-regular transition-all duration-500 whitespace-nowrap hover:opacity-70 ${isScrolled ? "text-black" : "text-white/90 hover:text-white"}`}
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className={`text-sm font-regular transition-all duration-500 whitespace-nowrap hover:opacity-70 ${isScrolled ? "text-black" : "text-white/90 hover:text-white"}`}
          >
            How It Works
          </a>
          <a
            href="#benefits"
            className={`text-sm font-regular transition-all duration-500 whitespace-nowrap hover:opacity-70 ${isScrolled ? "text-black" : "text-white/90 hover:text-white"}`}
          >
            Benefits
          </a>
          <a
            href="#faq"
            className={`text-sm font-regular transition-all duration-500 whitespace-nowrap hover:opacity-70 ${isScrolled ? "text-black" : "text-white/90 hover:text-white"}`}
          >
            FAQ
          </a>
        </div>

        {/* CTA Button */}
        <div
          className={`transition-all duration-500 overflow-hidden ${isScrolled ? "w-0 opacity-0 pointer-events-none" : "w-auto opacity-100"
            }`}
        >
          <button className="px-6 py-2.5 rounded-[43px] bg-[#1A1615] text-white text-sm font-regular hover:bg-[#2A2625] transition-colors shadow-md whitespace-nowrap">
            Try Sui Sign
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
