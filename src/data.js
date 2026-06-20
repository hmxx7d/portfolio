export const profileData = {
  name: "Sunil Kumar",
  title: "Full Stack Developer",
  bio: "Self-taught full-stack developer with 4+ years of experience crafting modern, performant, and user-centric web & mobile experiences that leave a lasting impression.",
  interests: ["💻 Coding", "🎨 Design", "🤖 AI/ML", "🎮 Gaming"],
  avatar: "/avatar.jpeg",
  details: {
    age: "26 years",
    email: "iamsunilfreelancer@gmail.com",
    phone: "+91 9899052055",
    location: "Delhi, India",
    flag: "🇮🇳"
  },
  experience: [
    {
      id: "freelancer",
      company: "Freelancer",
      role: "Logo & Web Developer",
      date: "2021 – now",
      points: [
        "Worked on diverse logo, brand identity, and web development projects.",
        "Collaborated with clients from multiple countries to deliver responsive layouts.",
        "Developed a versatile modern front-end design skill set.",
        "Adapted to unique challenges and requirements."
      ],
      accent: "violet"
    },
    {
      id: "meetzed",
      company: "Meetzed",
      role: "Graphic & Web Designer",
      date: "2020 – 2021",
      points: [
        "Collaboration: Supported Lead Developer and Designers on client projects.",
        "Branding: Crafted unique brand identities and frontend components.",
        "Tools: Designed layout assets using Photoshop, Illustrator & Figma."
      ],
      accent: "cyan"
    }
  ],
  skills: {
    frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    backend: ["Node.js", "Express", "Python", "PostgreSQL"],
    tools: ["Docker", "Git", "Firebase", "AWS"],
    design: ["Figma", "Photoshop", "Illustrator", "UI/UX"]
  },
  projects: [
    {
      id: "proj-cornerom",
      name: "Cornerom.com - الركن العقارية",
      desc: "منصة عقارية متكاملة تركز على سوق العقارات في سلطنة عمان، توفر واجهة مستخدم فعالة لعرض وإدارة العقارات للبيع والإيجار. يتميز الموقع بنظام بحث متقدم، عرض تفصيلي للعقارات، وأخبار عقارية، مما يعكس تطبيقًا قويًا لإدارة المحتوى وقواعد البيانات العقارية.",
      image: "/project1.png",
      techs: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
      category: "web",
      github: "https://github.com",
      live: "https://cornerom.com"
    },
    {
      id: "proj-aqariom",
      name: "Aqariom.com - عقاريوم",
      desc: "نظام إدارة علاقات العملاء (CRM) مصمم خصيصًا للشركات العقارية العربية، يدمج تقنيات الذكاء الاصطناعي وأتمتة شاملة لإدارة العملاء والمحادثات عبر واتساب. يبرز هذا المشروع كحل برمجي متخصص في أتمتة العمليات التجارية وتحسين تجربة العملاء في القطاع العقاري.",
      image: "/project2.png",
      techs: ["React", "Node.js", "OpenAI API", "WhatsApp API"],
      category: "web",
      github: "https://github.com",
      live: "https://aqariom.com"
    },
    {
      id: "proj-albayan",
      name: "Albayan2040.com - البيان 2040",
      desc: "معهد تدريب وتأهيل مهني يهدف إلى تطوير الكفاءات الوطنية بما يتماشى مع رؤية عمان 2040. يقدم الموقع برامج تدريبية معتمدة، ويظهر كمنصة تعليمية رقمية تدعم النمو المعرفي والوظيفي، مع التركيز على الجودة والابتكار في تقديم المحتوى التعليمي.",
      image: "/project3.png",
      techs: ["Next.js", "Tailwind CSS", "LMS", "PostgreSQL"],
      category: "web",
      github: "https://github.com",
      live: "https://albayan2040.com"
    },
    {
      id: "proj-cosmodental",
      name: "Cosmodental.site - كوزمودنتال",
      desc: "موقع إلكتروني لعيادة أسنان حديثة تقدم خدمات طب الأسنان الشاملة باستخدام أحدث التقنيات. يعرض الموقع الخدمات المتنوعة للعيادة، ويتميز بتصميم يركز على تجربة المستخدم وتقديم المعلومات بشكل واضح وجذاب، مما يعكس القدرة على بناء واجهات عرض احترافية للخدمات الطبية.",
      image: "/project1.png",
      techs: ["React", "CSS Modules", "UI/UX Design"],
      category: "web",
      github: "https://github.com",
      live: "https://cosmodental.site"
    },
    {
      id: "proj-muawin",
      name: "Muawinllc.com - معاون ذ.م.م",
      desc: "موقع تعريفي لشركة معاون ذ.م.م يقدم الخدمات اللوجستية، وخدمات دعم الأعمال وحلول التسهيلات الذكية للشركات في سلطنة عمان. يعرض الموقع هوية الشركة وخدماتها الاستشارية والتنفيذية بأسلوب تصميم عصري ومحترف يعزز هويتها الرقمية.",
      image: "/project2.png",
      techs: ["HTML5", "CSS3", "JavaScript", "Webpack"],
      category: "web",
      github: "https://github.com",
      live: "https://muawinllc.com"
    }
  ],
  education: [
    {
      id: "grad",
      degree: "Bachelor of Fine Arts",
      school: "IGNOU Delhi, India",
      year: "2017–21"
    },
    {
      id: "diploma",
      degree: "Animation & Graphic Design",
      school: "Delhi, India",
      year: "2017–18"
    },
    {
      id: "highschool",
      degree: "Humanities / High School",
      school: "Delhi Cantonment, India",
      year: "2017"
    }
  ],
  socials: [
    { name: "Instagram", url: "https://instagram.com", iconClass: "instagram-bg" }
  ],
  services: [
    {
      id: "srv1",
      title: "UI/UX Design",
      desc: "Creating user-centric layouts, wireframes, and interactive mockups in Figma that optimize user conversion and satisfaction.",
      icon: "📐",
      image: "/project1.png",
      features: ["User Persona Analysis", "Wireframing & Prototyping", "Interactive Mockups", "Usability Testing"]
    },
    {
      id: "srv2",
      title: "Web Design",
      desc: "Crafting modern, responsive, and visually stunning website interfaces with perfect typography, grids, and tailored dark modes.",
      icon: "🎨",
      image: "/project2.png",
      features: ["Responsive Grid Design", "Curated Typography Systems", "Visual Asset Creation", "CSS Theme Styling"]
    },
    {
      id: "srv3",
      title: "Web Development",
      desc: "Developing fast, scalable, and secure frontend & backend web applications utilizing React, Next.js, Node.js, and modern databases.",
      icon: "💻",
      image: "/project3.png",
      features: ["React / Next.js SPA/SSR", "RESTful API Development", "Database Schema Tuning", "Speed & Core Web Vitals Optimization"]
    },
    {
      id: "srv4",
      title: "Mobile App Development",
      desc: "Building clean, high-performance cross-platform mobile apps for iOS and Android using React Native and cloud database backing.",
      icon: "📱",
      image: "/project1.png",
      features: ["React Native Framework", "Firebase Backend Integration", "App Store & Google Play Prep", "Push Notifications Setup"]
    },
    {
      id: "srv5",
      title: "DevOps & Cloud Deployment",
      desc: "Setting up dockerized production build pipelines, AWS cloud deployments, secure SSL hosting, and Firebase environments.",
      icon: "🐳",
      image: "/project2.png",
      features: ["Docker Containerization", "AWS S3 / EC2 Hosting", "CI/CD Pipeline Setup", "SSL Certs & DNS Management"]
    },
    {
      id: "srv6",
      title: "Search Engine Optimization (SEO)",
      desc: "Injecting SEO best practices into structural layouts to guarantee fast load times, crawler-friendly HTML, and search visibility.",
      icon: "📈",
      image: "/project3.png",
      features: ["Semantic HTML5 Markup", "Meta Tags & JSON-LD Schema", "Sitemaps & Robots Config", "Google Analytics & Console Integration"]
    }
  ],
  testimonials: [
    {
      id: "t1",
      stars: 5,
      quote: "Outstanding work! The communication was excellent from start to finish. Our page speed increased by 40% and the design is absolutely breathtaking. Highly recommend Sunil for React web development!",
      name: "Robert J.",
      title: "CEO at Arena",
      avatar: "/avatar.jpeg"
    },
    {
      id: "t2",
      stars: 5,
      quote: "Sunil delivered a premium custom site that exceeded our design expectations. His attention to micro-animations and clean UI/UX standards is remarkable. Extremely happy with the final outcome.",
      name: "Janice Z.",
      title: "Design Director",
      avatar: "/avatar.jpeg"
    },
    {
      id: "t3",
      stars: 5,
      quote: "A talented full-stack engineer who is fast, reliable, and adaptive. Sunil took our database and API integrations and wrapped them inside a gorgeous admin dashboard panel. Top-tier professional.",
      name: "Justin B.",
      title: "Co-Founder, techNest",
      avatar: "/avatar.jpeg"
    }
  ]
};
