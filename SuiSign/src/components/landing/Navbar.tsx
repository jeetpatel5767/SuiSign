import { FileSignature } from "lucide-react";

const Navbar = () => {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 px-4 lg:px-8">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-4 py-2 rounded-[43px] bg-white/[0.133] backdrop-blur-xl shadow-lg">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center">
            <FileSignature className="w-4 h-4 text-black" />
          </div>
          <span className="text-base font-semibold text-white">Sui Sign</span>
        </div>

        {/* Navigation Links - Center */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm font-regular text-white/90 hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-regular text-white/90 hover:text-white transition-colors"
          >
            How It Works
          </a>
          <a
            href="#benefits"
            className="text-sm font-regular text-white/90 hover:text-white transition-colors"
          >
            Benefits
          </a>
          <a
            href="#faq"
            className="text-sm font-regular text-white/90 hover:text-white transition-colors"
          >
            FAQ
          </a>
        </div>

        {/* CTA Button */}
        <button className="px-6 py-2.5 rounded-[43px] bg-[#1A1615] text-white text-sm font-regular hover:bg-[#2A2625] transition-colors shadow-md">
          Try Sui Sign
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
