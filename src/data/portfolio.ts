import { images } from "./assets";

export const portfolioData = {
  // 1. GLOBAL NAVIGATION
  navigation: {
    logo: {
      primary: "MGB",
      accent: ".Dev"
    },
    links: [
      { name: "Home", href: "#home" },
      { name: "About", href: "#about" },
      { name: "Projects", href: "#projects" },
      { name: "Skills", href: "#skills" },
      { name: "Contact", href: "#contact" },
    ]
  },

  // 2. HERO SECTION
  hero: {
    badge: "Available for opportunities",
    heading1: "Building Scalable",
    heading2: "Flutter Applications",
    watermark: "FLUTTER DEV",
    primaryButton: "View Projects",
    secondaryButton: "Download Resume"
  },

  // 3. PERSONAL BIOGRAPHY & CONTEXT
  personal: {
    name: "Mostafa Galal El Bakri",
    headshot: images.personal.headshot,
    role: "Flutter Developer",
    tagline: "Flutter Developer | Clean Architecture | AI-Driven Mobile Solutions",

    shortBio:
      "Flutter Developer focused on building scalable, high-performance mobile applications using clean architecture, modern UI practices, and AI-powered features.",

    aboutIntro:
      "I am a Flutter Developer specializing in designing and developing scalable, production-ready mobile applications.",

    aboutP1:
      "I have hands-on experience in building robust Flutter applications, applying clean architecture principles (MVVM) and scalable state management solutions such as Bloc and Cubit to ensure maintainability and performance.",

    aboutP2:
      "I have worked on integrating AI-powered features, RESTful APIs, Firebase services, and local data storage solutions. I am committed to delivering efficient, maintainable, and high-quality mobile experiences that solve real-world problems."
  },

  aboutContext: {
    preTitle: "Building Scalable Digital Solutions",
    title: "Flutter Developer \n& Mobile Application Specialist",
  },
  // 4. SKILLS SECTION
  skillsContext: {
    preTitle: "Technical Expertise",
    title: "Skills & Technologies",
    description: "A comprehensive set of technologies, architectural patterns, and tools I use to design and develop scalable, high-performance mobile applications."
  },

  skillCategories: [
    {
      title: "Flutter Development",
      skills: [
        "Flutter SDK",
        "Dart",
        "Clean Architecture",
        "MVVM",
        "Responsive UI Design",
        "Custom Animations"
      ]
    },
    {
      title: "State Management",
      skills: [
        "Bloc",
        "Cubit",
        "Provider",
        "Scalable State Management Patterns"
      ]
    },
    {
      title: "Backend & Data",
      skills: [
        "Firebase (Auth, Firestore, Notifications)",
        "RESTful APIs",
        "Dio",
        "HTTP",
        "SQLite",
        "SharedPreferences"
      ]
    },
    {
      title: "Tools & Workflow",
      skills: [
        "Git & GitHub",
        "Postman",
        "Figma (UI Collaboration)",
        "Google Maps Integration",
        "App Deployment (Play Store)"
      ]
    }
  ],
  // 5. PROJECTS SECTION
  projectsContext: {
    preTitle: "Portfolio Highlights",
    title: "Featured Projects",
    description:
      "A collection of AI-driven systems and scalable mobile applications, showcasing clean architecture, real-time processing, and high-performance user experiences."
  },

  projects: [
    {
      title: "Smart Fitness & Activity Tracker",
      description:
        " StrideX is a precision-built fitness companion that turns raw sensor data into meaningful health insights — in real time. Engineered with Clean Architecture. The app leverages the device's hardware Pedometer for low-power step detection, persists all user data locally with Sqflite for a fully offline experience, and delivers a polished adaptive UI with Light & Dark mode support. Shipped as a lean 20 MB APK without compromising on features or performance",
      techStack: [
        "Flutter",
        "Dart",
        "Cubit + Provider ",
        "Sqflite + Shared Preferences",
        "Lottie Animations",
        "Adaptive Theming",
        "Clean Architecture",
        "MVVM"
      ],
      highlights: [
        "Offline-first approach using local database",
        "Accurate prayer times and Quran data integration",
        "Smooth and optimized user experience",
        "Scalable architecture for long-term maintainability"
      ],
      type: "Mobile Application",
      image: images.projects.stridex,
      githubUrl: "https://github.com/MG-B17/STRIDE-X.git",
      liveUrl: "#"
    },
    {
      title: "Anomatrix – AI-Powered Surveillance System",
      description:
        "Engineered an AI-powered surveillance application that leverages computer vision to detect anomalies such as theft, accidents, and suspicious activities. The system processes both live and recorded video streams, providing real-time alerts and intelligent insights to enhance security monitoring and response efficiency.",
      techStack: [
        "Flutter",
        "Dart",
        "Python",
        "Computer Vision",
        "Machine Learning",
        "REST APIs",
        "Real-time Processing",
        "Clean Architecture"
      ],
      highlights: [
        "Real-time anomaly detection using computer vision models",
        "Video stream processing for live and recorded footage",
        "Integration between AI backend (Python) and Flutter frontend",
        "Scalable architecture for handling intensive data processing"
      ],
      type: "AI System",
      image: images.projects.surveillance,
      githubUrl: "https://github.com/MG-B17/anomatrix",
      liveUrl: "#"
    },

    {
      title: "AI-Powered Meal Planner",
      description:
        "Built an intelligent meal planning application leveraging Gemini AI to deliver personalized meal recommendations. Implemented a chat-based interaction system and dynamic recipe exploration features, structured using scalable clean architecture.",
      techStack: [
        "Flutter",
        "Dart",
        "Cubit",
        "Dio",
        "Gemini API",
        "REST APIs",
        "Clean Architecture",
        "MVVM"
      ],
      highlights: [
        "AI-powered personalized meal recommendations",
        "Interactive chat-based user experience",
        "Feature-based scalable architecture",
        "Robust API integration using Dio"
      ],
      type: "AI Application",
      image: images.projects.meal,
      githubUrl: "https://github.com/MG-B17/Meal-Planner",
      liveUrl: "#"
    },

    {
      title: "AI-Driven Weather Prediction App",
      description:
        "Developed a Flutter-based weather application enhanced with machine learning to deliver predictive weather insights. Integrated a Random Forest model built in Python and connected it seamlessly with the mobile interface.",
      techStack: [
        "Flutter",
        "Dart",
        "Python",
        "Machine Learning",
        "Random Forest",
        "Dio",
        "REST APIs",
        "Clean Architecture"
      ],
      highlights: [
        "Integrated ML model for predictive forecasting",
        "Seamless Flutter–Python integration",
        "Clean architecture for maintainability",
        "Efficient API communication using Dio"
      ],
      type: "AI Application",
      image: images.projects.weather,
      githubUrl: "https://github.com/MG-B17/ai-weather",
      liveUrl: "#"
    },

    {
      title: "Comprehensive Quran & Islamic App",
      description:
        "Developed a feature-rich Islamic application offering Quran reading with translations, prayer times, daily Adhkar, and audio recitations from 200+ reciters. Designed for performance, usability, and offline access.",
      techStack: [
        "Flutter",
        "Dart",
        "Cubit",
        "Dio",
        "Sqflite",
        "REST APIs",
        "Clean Architecture",
        "MVVM"
      ],
      highlights: [
        "Offline-first approach using local database",
        "Accurate prayer times and Quran data integration",
        "Smooth and optimized user experience",
        "Scalable architecture for long-term maintainability"
      ],
      type: "Mobile Application",
      image: images.projects.muslim,
      githubUrl: "https://github.com/MG-B17/Quran-App",
      liveUrl: "#"
    },

    {
      title: "Movie Discovery Application",
      description:
        "Designed and developed a modern movie browsing application with API integration, allowing users to explore trending movies, search content, and view detailed information through a responsive interface.",
      techStack: [
        "Flutter",
        "Dart",
        "Bloc",
        "Dio",
        "REST APIs",
        "Responsive UI"
      ],
      highlights: [
        "Efficient state management using Bloc",
        "Dynamic data fetching from APIs",
        "Responsive UI across multiple devices",
        "Clean and modular architecture"
      ],
      type: "Mobile Application",
      image: images.projects.movie,
      githubUrl: "https://github.com/MG-B17/Movia-App",
      liveUrl: "#"
    }
  ],

  // 6. CONTACT SECTION
  contactContext: {
    preTitle: "Get in touch",
    title: "Let's Build Something",
    description: "Looking for a dedicated Flutter engineer? Let's discuss how I can bring value to your team.",
    buttonText: "Send Message",
    placeholders: {
      name: "John Doe",
      email: "john@example.com",
      message: "Hello Mostafa, I'd like to discuss a project..."
    }
  },
  contact: {
    email: "mostafagalalbakri@gmail.com", // Displayed on the website
    receiverEmail: "mostafagalal14152004@gmail.com", // Used by the backend API
    location: "Mansoura, Egypt",
    github: "https://github.com/MG-B17",
    linkedin: "https://www.linkedin.com/in/mostafa-galal-17-m",
    twitter: "https://x.com/mostafagalal_17",
    whatsapp: "https://wa.me/201033589095",
    resumeUrl: "https://drive.google.com/file/d/12onRyBeH3c9fWXsoPny0w-ntViKsRxMf/view?usp=drive_link"
  },

  // 7. FOOTER SECTION
  footer: {
    copyright: "© 2026 MGB. Engineered dynamically via intelligent automation.",
  }
};