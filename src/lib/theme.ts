export const theme = {
  typography: {
    sectionPreTitle: "text-blue-500 tracking-widest font-bold text-xs sm:text-sm uppercase mb-4 block drop-shadow-sm",
    sectionTitle: "text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tighter drop-shadow-lg text-foreground",
    sectionDescription: "text-foreground/70 max-w-2xl mx-auto text-lg leading-relaxed text-balance font-medium drop-shadow-sm",
  },
  
  cards: {
    glassPanel: "bg-background/50 backdrop-blur-2xl border border-foreground/10 rounded-[3rem] shadow-2xl shadow-black/5 overflow-hidden group relative",
    glassBento: "bg-background/40 backdrop-blur-xl rounded-[2rem] p-8 lg:p-12 border border-foreground/10 hover:border-blue-500/40 transition-colors duration-500 shadow-2xl shadow-black/5 group relative overflow-hidden",
    solidHover: "bg-foreground/[0.02] border border-foreground/10 rounded-[2rem] overflow-hidden hover:bg-foreground/[0.04] transition-all duration-500",
  },
  
  forms: {
    inputLabel: "text-sm font-medium text-foreground/80 pl-1 mb-2 block",
    inputField: "w-full px-4 py-3.5 rounded-xl bg-background border border-foreground/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all",
    primaryButton: "w-full py-4 rounded-xl bg-blue-500 text-white font-bold flex items-center justify-center gap-2 hover:bg-blue-600 focus:ring-4 focus:ring-blue-500/20 transition-all shadow-xl shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed",
  },
  
  layout: {
    sectionPadding: "py-24 px-4 sm:px-6 lg:px-8 relative z-10",
    containerCore: "max-w-7xl mx-auto"
  }
};
