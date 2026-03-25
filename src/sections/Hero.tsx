"use client";
import { motion } from "framer-motion";
import { ArrowRight, Download, Terminal, Smartphone, Monitor } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function Hero() {
  const { personal, contact, hero } = portfolioData;

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
      
      <div className="max-w-5xl mx-auto text-center z-10 w-full relative border-none">
        
        {/* Floating Developer Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
          className="mb-10 inline-flex items-center gap-2"
        >
          <div className="px-5 py-2.5 bg-background/50 backdrop-blur-xl border border-foreground/10 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)] flex items-center gap-3 relative overflow-hidden group hover:border-blue-500/30 transition-colors duration-500 cursor-default">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-semibold tracking-wide text-foreground/80 group-hover:text-foreground transition-colors relative">
              {hero.badge}
            </span>
          </div>
        </motion.div>

        {/* Massive Primary Lockup */}
        <motion.div className="mb-8 relative z-20">
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[1.05] text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {hero.heading1} <br className="hidden sm:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-400 drop-shadow-sm">
              {hero.heading2}
            </span>
          </motion.h1>
          
          <motion.h2 
            className="mt-6 text-xl sm:text-2xl md:text-3xl font-bold text-foreground/80 max-w-3xl mx-auto tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            I'm {personal.name}, a {personal.role}.
          </motion.h2>
        </motion.div>

        {/* Refined Description */}
        <motion.p 
          className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed text-balance font-medium mb-12 relative z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {personal.shortBio}
        </motion.p>

        {/* Dual Actions with Glassmorphism */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-5 relative z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <motion.a 
            href="#projects" 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-foreground text-background font-bold flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:shadow-[0_0_60px_rgba(59,130,246,0.5)] border border-transparent"
          >
            {hero.primaryButton} <ArrowRight size={20} className="ml-1" />
          </motion.a>
          
          <motion.a 
            href={contact.resumeUrl} 
            target="_blank"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-background/50 backdrop-blur-xl border border-foreground/10 hover:border-foreground/30 text-foreground font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-xl shadow-black/5"
          >
            <Download size={20} className="mr-1" /> {hero.secondaryButton}
          </motion.a>
        </motion.div>

        {/* Orbiting Tech Context Icons (Floating lazily around the hero) */}
        <div className="absolute top-1/2 left-1/2 w-full max-w-6xl -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden lg:block -z-10 h-full">
           <motion.div 
             animate={{ y: [-20, 20, -20], rotate: [-10, 10, -10] }} 
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-[10%] left-[5%] w-20 h-20 bg-blue-500/10 backdrop-blur-xl border border-blue-500/20 rounded-3xl flex items-center justify-center text-blue-500 shadow-2xl shadow-blue-500/20"
           >
             <Smartphone size={36} />
           </motion.div>
           
           <motion.div 
             animate={{ y: [20, -20, 20], rotate: [10, -10, 10] }} 
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
             className="absolute bottom-[20%] right-[5%] w-24 h-24 bg-indigo-500/10 backdrop-blur-xl border border-indigo-500/20 rounded-3xl flex items-center justify-center text-indigo-500 shadow-2xl shadow-indigo-500/20"
           >
             <Terminal size={48} />
           </motion.div>
           
           <motion.div 
             animate={{ y: [-25, 25, -25], x: [-15, 15, -15] }} 
             transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-[20%] right-[10%] w-16 h-16 bg-sky-500/10 backdrop-blur-xl border border-sky-500/20 rounded-[24px] flex items-center justify-center text-sky-500 shadow-xl shadow-sky-500/20"
           >
             <Monitor size={32} />
           </motion.div>
        </div>

      </div>
    </section>
  );
}
