import React, { useState } from "react";

export function ProjectsCard({ projects }) {
  const [filter, setFilter] = useState("all");

  const filteredProjects = projects.filter(proj => {
    return filter === "all" || proj.category === filter;
  });

  return (
    <article className="card card-projects" id="card-projects">
      <div className="section-header">
        <h2 className="section-title">Projects</h2>
        <div className="project-filters" id="project-filters">
          {["all", "frontend", "backend", "mobile"].map(cat => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? "active" : ""}`}
              onClick={() => setFilter(cat)}
              id={`filter-${cat}`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="projects-grid" id="projects-grid">
        {filteredProjects.map((proj, idx) => (
          <div 
            key={proj.id} 
            className="project-card" 
            id={`project-${proj.id}`}
            style={{ 
              animation: 'cardIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
              animationDelay: `${idx * 0.08}s`
            }}
          >
            <div className="project-img-wrapper">
              <img src={proj.image} alt={proj.name} className="project-img" />
              <div className="project-overlay">
                <a href={proj.github} target="_blank" rel="noopener noreferrer" className="project-link-btn" title="GitHub">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
                <a href={proj.live} target="_blank" rel="noopener noreferrer" className="project-link-btn" title="Live Demo">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="project-info">
              <h3 className="project-name">{proj.name}</h3>
              <p className="project-desc">{proj.desc}</p>
              <div className="project-techs">
                {proj.techs.map((tech, tIdx) => (
                  <span key={tIdx} className="tech-badge">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
