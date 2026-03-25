export const animations = {
  // Page entry animations
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6, ease: "easeOut" }
  },
  
  fadeInLeft: {
    initial: { opacity: 0, x: -30 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.5, ease: "easeOut" }
  },

  fadeInRight: {
    initial: { opacity: 0, x: 30 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.5, ease: "easeOut" }
  },

  // Interactions
  hoverLift: {
    whileHover: { y: -8, scale: 1.02 },
    transition: { type: "spring", stiffness: 300, damping: 20 }
  },
  
  hoverButton: {
    whileHover: { scale: 1.05, y: -2 },
    whileTap: { scale: 0.95 }
  },

  // Orbital physics for decorative glass components
  orbitTraces: [
    {
      animate: { y: [-20, 20, -20], rotate: [-10, 10, -10] },
      transition: { duration: 7, repeat: Infinity, ease: "easeInOut" }
    },
    {
      animate: { y: [25, -25, 25], rotate: [15, -15, 15] },
      transition: { duration: 9, repeat: Infinity, ease: "easeInOut" }
    },
    {
      animate: { y: [-15, 15, -15], x: [10, -10, 10] },
      transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
    },
    {
      animate: { y: [15, -15, 15], rotate: [-5, 5, -5] },
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
    }
  ]
};
