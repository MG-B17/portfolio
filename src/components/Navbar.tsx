"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { portfolioData } from "@/data/portfolio";

export default function Navbar() {
  const { navigation } = portfolioData;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll Progress Bar Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || isOpen
            ? "bg-background/80 backdrop-blur-[80px] border-b border-foreground/10 shadow-sm py-2"
            : "bg-transparent py-4"
          }`}
      >
        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 origin-left z-50"
          style={{ scaleX }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-14">

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center relative z-50">
              <Link href="/" className="text-xl md:text-2xl font-black tracking-tight text-foreground flex items-center gap-1 drop-shadow-sm" onClick={() => setIsOpen(false)}>
                {navigation.logo.primary}<span className="text-blue-500 border-b-2 border-blue-500 pb-0.5">{navigation.logo.accent}</span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-10 items-center">
              {navigation.links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-foreground/80 hover:text-blue-500 transition-colors text-sm font-bold tracking-wide"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pl-4 border-l border-foreground/10">
                <ThemeToggle />
              </div>
            </nav>

            {/* Mobile Nav Actions */}
            <div className="md:hidden flex items-center gap-3 relative z-50">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-xl bg-foreground/5 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-foreground/10 transition-colors border border-foreground/10"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <X size={20} />
                    </motion.div>
                  ) : (
                    <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <Menu size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Glassmorphic Dropdown Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-full left-4 right-4 mt-2 md:hidden bg-background/80 backdrop-blur-[100px] border border-foreground/10 rounded-2xl shadow-2xl shadow-black/10 overflow-hidden z-40"
              >
                <nav className="flex flex-col p-2">
                  {navigation.links.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-3.5 text-base font-semibold text-foreground/80 hover:text-blue-500 hover:bg-foreground/5 rounded-xl transition-all"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}
