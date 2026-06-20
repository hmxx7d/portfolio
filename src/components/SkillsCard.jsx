import React, { useState } from "react";

export function SkillsCard({ skills }) {
  const [ripples, setRipples] = useState([]);

  const handleTagClick = (e, tagId) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - 30; // 30 is half of the ripple width (60)
    const y = e.clientY - rect.top - 30;
    
    const newRipple = {
      id: Date.now() + Math.random(),
      left: x,
      top: y,
      tagId
    };

    setRipples(prev => [...prev, newRipple]);

    // Cleanup ripple
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
  };

  const categories = [
    { label: "Frontend", key: "frontend", color: "violet" },
    { label: "Backend", key: "backend", color: "cyan" },
    { label: "Tools & DevOps", key: "tools", color: "emerald" },
    { label: "Design", key: "design", color: "amber" }
  ];

  return (
    <article className="card card-skills" id="card-skills">
      <div className="section-header">
        <h2 className="section-title">Skills</h2>
      </div>
      <div className="skills-categories">
        {categories.map((cat, catIdx) => (
          <div className="skill-category" key={cat.key} id={`skill-cat-${cat.key}`}>
            <span className="skill-cat-label">{cat.label}</span>
            <div className="skill-tags">
              {skills[cat.key]?.map((tag, idx) => {
                const tagId = `${cat.key}-${idx}`;
                const activeRipples = ripples.filter(r => r.tagId === tagId);

                return (
                  <span 
                    key={idx}
                    className={`skill-tag ${cat.color}`}
                    onClick={(e) => handleTagClick(e, tagId)}
                    style={{ animationDelay: `${0.1 + catIdx * 0.12 + idx * 0.04}s` }}
                  >
                    {tag}
                    {activeRipples.map(ripple => (
                      <span 
                        key={ripple.id}
                        className="skill-ripple"
                        style={{ left: ripple.left, top: ripple.top }}
                      />
                    ))}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
