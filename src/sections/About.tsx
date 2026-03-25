"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { User } from "lucide-react";
import { SiFlutter, SiDart, SiFirebase, SiReact } from "react-icons/si";
import { portfolioData } from "@/data/portfolio";

export default function About() {
  const { personal, aboutContext } = portfolioData;

  return (
    <section id="about" className="py-32 px-4 sm:px-6 lg:px-8 relative backdrop-blur-[2px] z-10 flex justify-center items-center min-h-[80vh]">
      
      {/* Container for the Glasspane and floating icons */}
      <div className="relative w-full max-w-5xl mx-auto">
        
        {/* Orbiting Decorator Icons (Outside the glass panel) */}
        <div className="absolute inset-0 z-0 pointer-events-none hidden lg:block">
           <motion.div 
             animate={{ y: [-20, 20, -20], rotate: [-10, 10, -10] }} 
             transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
             className="absolute -top-12 -left-16 w-24 h-24 bg-sky-500/10 backdrop-blur-xl border border-sky-500/20 rounded-3xl flex items-center justify-center text-sky-400 shadow-xl shadow-sky-500/10"
           >
             <SiFlutter size={44} />
           </motion.div>

           <motion.div 
             animate={{ y: [25, -25, 25], rotate: [15, -15, 15] }} 
             transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-[40%] -right-20 w-32 h-32 bg-blue-500/10 backdrop-blur-xl border border-blue-500/20 rounded-[2.5rem] flex items-center justify-center text-blue-500 shadow-2xl shadow-blue-500/10"
           >
             <SiDart size={56} />
           </motion.div>

           <motion.div 
             animate={{ y: [-15, 15, -15], x: [10, -10, 10] }} 
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
             className="absolute -bottom-16 left-[15%] w-20 h-20 bg-amber-500/10 backdrop-blur-xl border border-amber-500/20 rounded-full flex items-center justify-center text-amber-500 shadow-lg shadow-amber-500/10"
           >
             <SiFirebase size={36} />
           </motion.div>

           <motion.div 
             animate={{ y: [15, -15, 15], rotate: [-5, 5, -5] }} 
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
             className="absolute -top-5 right-[15%] w-16 h-16 bg-cyan-500/10 backdrop-blur-xl border border-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-400 shadow-md shadow-cyan-500/10"
           >
             <SiReact size={32} />
           </motion.div>
        </div>

        {/* Huge Glassmorphism Bio Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative z-10 bg-background/50 backdrop-blur-2xl border border-foreground/10 rounded-[3rem] p-8 sm:p-12 lg:p-16 shadow-2xl shadow-black/5 overflow-hidden group"
        >
          {/* Subtle responsive hover gradient inside the card */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="flex flex-col md:flex-row gap-10 lg:gap-16 items-center md:items-start">
            
            {/* Avatar Profile Box */}
            <div className="shrink-0 relative">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-[2.5rem] overflow-hidden bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 flex items-center justify-center border-4 border-background/50 shadow-2xl relative z-10 group-hover:scale-105 transition-transform duration-500">
                <Image 
                  src={portfolioData.personal.headshot || "/assets/images/headshot.png"} 
                  alt={portfolioData.personal.name} 
                  fill
                  className="object-cover" 
                />
              </div>
              <div className="absolute inset-0 bg-blue-500/20 blur-[50px] rounded-full scale-125 -z-10 group-hover:bg-blue-500/30 transition-colors duration-500" />
            </div>

            {/* Biography Content */}
            <div className="text-center md:text-left relative z-10">
              <span className="text-blue-500 tracking-widest font-bold text-sm uppercase mb-3 block drop-shadow-sm">{aboutContext.preTitle}</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-foreground tracking-tight drop-shadow-md">
                {aboutContext.title.split('\n').map((line, i) => (
                  <span key={i}>{line} <br className="hidden md:block"/></span>
                ))}
              </h2>
              
              <div className="space-y-6 text-foreground/70 text-lg leading-relaxed font-medium">
                <p>{personal.aboutIntro}</p>
                <p>{personal.aboutP1}</p>
                <p>{personal.aboutP2}</p>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
