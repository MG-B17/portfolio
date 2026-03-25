"use client";

import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { portfolioData } from "@/data/portfolio";

export default function Footer() {
  const { footer, navigation } = portfolioData;
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-foreground/10 bg-background pt-12 pb-8 relative mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
          <Link href="/" className="text-xl font-bold tracking-tighter hover:scale-105 transition-transform">
            {navigation.logo.primary}<span className="text-blue-500">{navigation.logo.accent}</span>
          </Link>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-foreground/60">
            {navigation.links.map(link => (
              <a key={link.name} href={link.href} className="hover:text-blue-500 transition-colors">{link.name}</a>
            ))}
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row justify-between items-center pt-8 border-t border-foreground/5 text-sm text-foreground/40 gap-4 text-center md:text-left">
          <p>{footer.copyright}</p>
          <p>
            Designed & Built with <span className="text-blue-500 font-medium">Next.js</span>, <span className="text-blue-500 font-medium">Tailwind CSS</span> & <span className="text-blue-500 font-medium">Framer Motion</span>
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      <button 
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed bottom-6 right-6 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 z-50 ${showTopBtn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <ArrowUp size={24} />
      </button>
    </footer>
  );
}
