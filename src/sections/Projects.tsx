"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, Smartphone } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function Projects() {
  const { projects, projectsContext } = portfolioData;
  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{projectsContext.title}</h2>
          <p className="text-foreground/60 text-lg max-w-xl">{projectsContext.description}</p>
        </div>

        {/* Modern Project Grid instead of bulky alternating rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="group flex flex-col bg-foreground/[0.02] border border-foreground/10 rounded-[2rem] overflow-hidden hover:bg-foreground/[0.04] transition-all duration-500"
            >
              {/* Project Visual Container */}
              <div className={`aspect-video w-full relative flex items-center justify-center overflow-hidden border-b border-foreground/5`}>
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                {/* Overlay filter */}
                <div className="absolute inset-0 bg-background/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500" />
              </div>

              {/* Project Details */}
              <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4 gap-4">
                  <h3 className="text-2xl font-bold group-hover:text-blue-500 transition-colors leading-tight">{project.title}</h3>
                  <div className="flex gap-2 shrink-0">
                    <a href={project.githubUrl} className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center hover:bg-foreground/10 transition-colors"><Github size={18}/></a>
                    <a href={project.liveUrl} className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors"><ExternalLink size={18}/></a>
                  </div>
                </div>
                
                <p className="text-foreground/70 mb-8 flex-1 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-semibold tracking-wide bg-foreground/10 text-foreground/80 rounded-full uppercase">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
