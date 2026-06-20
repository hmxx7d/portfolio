import React, { useState } from "react";

// Premium Developer Icons in SVG format
const icons = {
  figma: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
      <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
      <path d="M12 9h3.5a3.5 3.5 0 1 1 0 7H12V9z" />
      <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
      <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
    </svg>
  ),
  react: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(90 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(150 12 12)" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  ),
  nextjs: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 16V8l8 8" />
      <path d="M12 8h4v8" />
    </svg>
  ),
  typescript: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="9" y1="9" x2="15" y2="9" />
      <line x1="12" y1="9" x2="12" y2="15" />
    </svg>
  ),
  tailwind: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3c-1.2 0-2.4.6-3 1.8L4.2 14.2c-.6 1.2-.6 2.4 0 3.6.6 1.2 1.8 1.8 3 1.8h9.6c1.2 0 2.4-.6 3-1.8.6-1.2.6-2.4 0-3.6L16.8 4.8c-.6-1.2-1.8-1.8-3-1.8H12z" />
    </svg>
  ),
  node: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 7 12 12 22 7" />
      <line x1="12" y1="12" x2="12" y2="22" />
    </svg>
  ),
  python: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
    </svg>
  ),
  database: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </svg>
  ),
  git: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="6" r="3" />
      <line x1="6" y1="9" x2="6" y2="12" />
      <line x1="18" y1="9" x2="18" y2="12" />
      <path d="M6 12a6 6 0 0 0 12 0" />
    </svg>
  ),
  docker: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12.5c0 3-2.5 5.5-5.5 5.5H3c-.6 0-1-.4-1-1v-2.5c0-.6.4-1 1-1h13c1.9 0 3.5-1.6 3.5-3.5S17.9 7.5 16 7.5H4.5A2.5 2.5 0 0 1 2 5V4c0-.6.4-1 1-1h13c4.4 0 8 3.6 8 8v1.5z" />
      <rect x="4" y="10" width="3" height="3" rx="0.5" />
      <rect x="8" y="10" width="3" height="3" rx="0.5" />
      <rect x="12" y="10" width="3" height="3" rx="0.5" />
    </svg>
  ),
  firebase: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L3.5 8.5v7L12 22l8.5-6.5v-7z" />
      <path d="M12 22V12" />
      <path d="M3.5 8.5L12 12l8.5-3.5" />
      <path d="M12 2v10" />
    </svg>
  ),
  aws: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 18c-1.5 0-3-1-3-2.5s1.5-2.5 3-2.5 3 1 3 2.5S7.5 18 6 18z" />
      <path d="M18 18c-1.5 0-3-1-3-2.5s1.5-2.5 3-2.5 3 1 3 2.5s-1.5 2.5-3 2.5z" />
      <path d="M12 6c-2 0-3.5 1.5-3.5 3.5v7h7v-7c0-2-1.5-3.5-3.5-3.5z" />
      <path d="M3 21h18" />
    </svg>
  ),
  photoshop: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <path d="M9 8h2.5a2.5 2.5 0 0 1 0 5H9V8z" />
      <path d="M9 13v3" />
      <path d="M14 11.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0" />
    </svg>
  ),
  illustrator: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <path d="M8 16V8h2" />
      <path d="M8 12h2" />
      <circle cx="15" cy="12" r="2" />
      <line x1="17" y1="10" x2="17" y2="16" />
    </svg>
  ),
  uiux: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="12" r="5" />
      <circle cx="16" cy="12" r="5" />
      <path d="M12 9a5 5 0 0 0 0 6" />
    </svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
};

const getSkillMeta = (name) => {
  const n = name.toLowerCase();
  if (n.includes("react")) {
    return { icon: icons.react, percent: 95, color: "#61DAFB", glow: "rgba(97, 218, 251, 0.25)" };
  }
  if (n.includes("next")) {
    return { icon: icons.nextjs, percent: 90, color: "#ffffff", glow: "rgba(255, 255, 255, 0.15)" };
  }
  if (n.includes("typescript") || n.includes("ts")) {
    return { icon: icons.typescript, percent: 92, color: "#3178C6", glow: "rgba(49, 120, 198, 0.25)" };
  }
  if (n.includes("tailwind")) {
    return { icon: icons.tailwind, percent: 98, color: "#06B6D4", glow: "rgba(6, 182, 212, 0.25)" };
  }
  if (n.includes("node")) {
    return { icon: icons.node, percent: 88, color: "#339933", glow: "rgba(51, 153, 51, 0.25)" };
  }
  if (n.includes("express")) {
    return { icon: icons.code, percent: 90, color: "#e2e8f0", glow: "rgba(226, 232, 240, 0.15)" };
  }
  if (n.includes("python")) {
    return { icon: icons.python, percent: 85, color: "#3776AB", glow: "rgba(55, 118, 171, 0.25)" };
  }
  if (n.includes("postgres") || n.includes("sql") || n.includes("database")) {
    return { icon: icons.database, percent: 88, color: "#336791", glow: "rgba(51, 103, 145, 0.25)" };
  }
  if (n.includes("docker")) {
    return { icon: icons.docker, percent: 85, color: "#2496ED", glow: "rgba(36, 150, 237, 0.25)" };
  }
  if (n.includes("git")) {
    return { icon: icons.git, percent: 93, color: "#F05032", glow: "rgba(240, 80, 50, 0.25)" };
  }
  if (n.includes("firebase")) {
    return { icon: icons.firebase, percent: 91, color: "#FFCA28", glow: "rgba(255, 202, 40, 0.25)" };
  }
  if (n.includes("aws")) {
    return { icon: icons.aws, percent: 86, color: "#FF9900", glow: "rgba(255, 153, 0, 0.25)" };
  }
  if (n.includes("figma")) {
    return { icon: icons.figma, percent: 96, color: "#F24E1E", glow: "rgba(242, 78, 30, 0.25)" };
  }
  if (n.includes("photoshop")) {
    return { icon: icons.photoshop, percent: 92, color: "#31A8FF", glow: "rgba(49, 168, 255, 0.25)" };
  }
  if (n.includes("illustrator")) {
    return { icon: icons.illustrator, percent: 90, color: "#FF9A00", glow: "rgba(255, 154, 0, 0.25)" };
  }
  if (n.includes("ui/ux") || n.includes("uiux") || n.includes("design")) {
    return { icon: icons.uiux, percent: 94, color: "#10B981", glow: "rgba(16, 185, 129, 0.25)" };
  }
  return { icon: icons.code, percent: 85, color: "#ff623e", glow: "rgba(255, 98, 62, 0.2)" }; // default
};

export function SkillsSection({ skills }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const allSkills = [];
  if (skills) {
    Object.keys(skills).forEach((category) => {
      skills[category].forEach((name) => {
        const meta = getSkillMeta(name);
        allSkills.push({
          name,
          category,
          icon: meta.icon,
          percent: meta.percent,
          color: meta.color,
          glow: meta.glow
        });
      });
    });
  }

  // Filter skills based on selected category
  const filteredSkills = activeCategory === "all" 
    ? allSkills 
    : allSkills.filter(skill => skill.category.toLowerCase() === activeCategory.toLowerCase());

  // Available categories for display
  const categories = ["all", "frontend", "backend", "tools", "design"];

  return (
    <section className="section" id="skills">
      <div className="section-title-wrapper">
        <h2 className="section-main-title">My Work <span>Skills</span></h2>
        <p className="section-main-subtitle">
          We combine cutting-edge front-end technologies with robust back-end systems to construct performant solutions.
        </p>
      </div>

      {/* Modern Pill-Based Category Selector */}
      <div className="skills-filter-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`filter-tab-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="skills-grid" key={activeCategory}>
        {filteredSkills.map((skill, idx) => (
          <div 
            className="skill-item-card premium-skill-card" 
            key={idx}
            style={{ 
              animationDelay: `${idx * 0.05}s`,
              "--hover-glow": skill.glow,
              "--theme-color": skill.color
            }}
          >
            <div className="skill-card-header">
              <div 
                className="skill-item-icon-box" 
                style={{ 
                  color: skill.color,
                  background: `color-mix(in srgb, ${skill.color} 10%, rgba(255, 255, 255, 0.02))`,
                  borderColor: `color-mix(in srgb, ${skill.color} 20%, rgba(255, 255, 255, 0.04))`
                }}
              >
                {skill.icon}
              </div>
              <div className="skill-meta-text">
                <span className="skill-item-title">{skill.name}</span>
                <span className="skill-category-badge">{skill.category}</span>
              </div>
            </div>
            
            <div className="skill-progress-section">
              <div className="skill-details-area">
                <span className="skill-progress-label">Proficiency</span>
                <span className="skill-progress-percent" style={{ color: skill.color }}>
                  {skill.percent}%
                </span>
              </div>

              <div className="skill-progress-row" style={{ marginTop: 0 }}>
                <div className="skill-progress-bar-bg" style={{ height: "6px" }}>
                  <div 
                    className="skill-progress-bar-fill" 
                    style={{ 
                      width: `${skill.percent}%`,
                      background: `linear-gradient(90deg, color-mix(in srgb, ${skill.color} 40%, transparent) 0%, ${skill.color} 100%)`,
                      boxShadow: `0 0 10px ${skill.color}` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
