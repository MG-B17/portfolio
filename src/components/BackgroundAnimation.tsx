"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function BackgroundAnimation() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  const isDark = resolvedTheme === "dark";

  return (
    <div className="fixed inset-0 pointer-events-none -z-50 overflow-hidden transition-colors duration-1000 bg-background">
      
      {/* Extremely Soft Architectural Dot Grid Overlay */}
      <div 
        className={`absolute inset-0 z-10 transition-opacity duration-1000 overflow-hidden pointer-events-none ${isDark ? 'opacity-[0.1] mix-blend-overlay' : 'opacity-[0.05] mix-blend-multiply'}`}
        style={{
          backgroundImage: `radial-gradient(${isDark ? '#ffffff' : '#000000'} 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Base Soothing Gradients */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${isDark ? "opacity-100" : "opacity-0"} bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-[#0a0a0a] to-black`} />
      <div className={`absolute inset-0 transition-opacity duration-1000 ${!isDark ? "opacity-100" : "opacity-0"} bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-white to-white`} />
        
      {/* Ultra-Soft Vercel/Stripe Style Aurora Fluid Gradients */}
      <div className="absolute inset-0 overflow-hidden mix-blend-normal z-0">
        
        {/* Blob 1 - Top Left Orbit */}
        <motion.div
          animate={{
            x: [0, 150, 0, -150, 0],
            y: [0, 100, 200, 100, 0],
            scale: [1, 1.2, 1, 0.9, 1],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-[-10%] left-[-10%] w-[60vw] h-[60vh] rounded-full blur-[100px] sm:blur-[140px] transition-colors duration-1000 ${
            isDark ? "bg-blue-900/30" : "bg-blue-200/50"
          }`}
        />

        {/* Blob 2 - Bottom Right Reverse Orbit */}
        <motion.div
          animate={{
            x: [0, -200, 0, 200, 0],
            y: [0, -150, -50, -150, 0],
            scale: [1, 0.9, 1.3, 0.9, 1],
            rotate: [360, 270, 180, 90, 0]
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vh] rounded-full blur-[100px] sm:blur-[140px] transition-colors duration-1000 ${
            isDark ? "bg-indigo-900/30" : "bg-indigo-200/60"
          }`}
        />

        {/* Blob 3 - Center Horizontal Sweep */}
        <motion.div
          animate={{
            x: [-150, 250, -150],
            y: [50, -100, 50],
            scale: [0.8, 1.1, 0.8]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-[40%] left-[20%] w-[50vw] h-[50vh] rounded-full blur-[100px] sm:blur-[140px] transition-colors duration-1000 ${
            isDark ? "bg-sky-900/30" : "bg-sky-200/50"
          }`}
        />
        
        {/* Blob 4 - Dynamic Highlight Drifter */}
        <motion.div
          animate={{
            x: [250, -250, 250],
            y: [150, -100, 150],
            scale: [1, 1.5, 1],
            rotate: [0, -180, -360]
          }}
          transition={{ duration: 45, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-[20%] right-[20%] w-[40vw] h-[40vh] rounded-full blur-[100px] sm:blur-[140px] transition-colors duration-1000 ${
            isDark ? "bg-blue-900/20" : "bg-blue-300/40"
          }`}
        />
      </div>
    </div>
  );
}
