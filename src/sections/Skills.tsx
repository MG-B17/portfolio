"use client";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { SiFlutter, SiFirebase, SiGithub, SiDart } from "react-icons/si";

export default function Skills() {
  const { skillCategories, skillsContext } = portfolioData;

  // Semantic icons mapped to categories for a highly engineered feel
  const icons = [<SiFlutter key="flutter" size={28}/>, <SiDart key="dart" size={28}/>, <SiFirebase key="firebase" size={28}/>, <SiGithub key="github" size={28}/>];

  return (
    <section id="skills" className="py-32 px-4 sm:px-6 lg:px-8 relative backdrop-blur-[2px] z-10">
      <div className="max-w-7xl mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20 lg:mb-24"
        >
          <span className="text-blue-500 tracking-widest font-bold text-xs sm:text-sm uppercase mb-4 block drop-shadow-sm">{skillsContext.preTitle}</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tighter drop-shadow-lg text-foreground">{skillsContext.title}</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg leading-relaxed text-balance font-medium drop-shadow-sm">
            {skillsContext.description}
          </p>
        </motion.div>

        {/* Modern 2x2 Glassmorphic Bento Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-background/40 backdrop-blur-xl rounded-[2rem] p-8 lg:p-12 border border-foreground/10 hover:border-blue-500/40 transition-colors duration-500 shadow-2xl shadow-black/5 group relative overflow-hidden"
            >
              {/* Decorative radial background glow for the card */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[60px] group-hover:bg-blue-500/25 transition-colors duration-700 pointer-events-none" />
              
              <div className="flex items-center gap-5 mb-10 relative">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500 shrink-0 border border-blue-500/10">
                  {icons[idx % icons.length]}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight drop-shadow-md">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-3 sm:gap-4 relative">
                {category.skills.map((skill, i) => (
                  <motion.div 
                    key={skill}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-5 py-2.5 bg-foreground/5 backdrop-blur-sm rounded-xl text-sm sm:text-base font-semibold border border-foreground/10 text-foreground/80 hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
