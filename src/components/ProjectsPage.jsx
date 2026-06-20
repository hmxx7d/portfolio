import React, { useEffect } from "react";

export function ProjectsPage({ projects }) {
  // Scroll to top on page mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!projects || projects.length === 0) {
    return (
      <main className="section in-view" style={{ padding: "40px 0 80px", textAlign: "center" }}>
        <h2 className="section-main-title">No <span>Projects</span> Found</h2>
        <p className="section-main-subtitle">Add some projects in the Admin settings panel!</p>
      </main>
    );
  }

  return (
    <main className="section in-view" style={{ padding: "40px 0 80px" }}>
      <div className="section-title-wrapper">
        <h2 className="section-main-title">all my <span>projects</span></h2>
        <p className="section-main-subtitle">
          A full archive of full-stack, frontend, and backend projects I have designed and engineered.
        </p>
      </div>

      <div className="portfolio-grid">
        {projects.map((proj, idx) => (
          <div 
            className="portfolio-card-item" 
            key={proj.id}
            style={{ 
              animation: "fadeInUp 0.6s var(--ease) both",
              animationDelay: `${idx * 0.1}s`,
              opacity: 1 
            }}
          >
            <div className="portfolio-img-wrap">
              <img src={proj.image} alt={proj.name} />
              
              <div className="portfolio-overlay-pane">
                <a href={proj.github} target="_blank" rel="noopener noreferrer" className="portfolio-link-icon-btn" title="View Source">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
                <a href={proj.live} target="_blank" rel="noopener noreferrer" className="portfolio-link-icon-btn" title="Live Preview">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="portfolio-card-info">
              <h3 className="portfolio-card-title">{proj.name}</h3>
              <p className="portfolio-card-desc">{proj.desc}</p>
              <div className="portfolio-card-tags">
                {proj.techs?.map((tech, tIdx) => (
                  <span key={tIdx} className="portfolio-tag-badge">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
