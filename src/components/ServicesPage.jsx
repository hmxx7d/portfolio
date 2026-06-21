import React, { useEffect } from "react";

export function ServicesPage({ name, services = [] }) {
  // Scroll to top on page mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const logoText = name ? name.split(" ")[0] : "Sunil";

  return (
    <main className="section in-view" style={{ padding: "40px 0 80px" }}>
      <div className="section-title-wrapper">
        <h2 className="section-main-title">All My <span>Services</span></h2>
        <p className="section-main-subtitle">
          Explore the full suite of engineering and design services I offer to help scale your business or personal brand.
        </p>
      </div>

      <div className="services-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        {services.map((srv, idx) => (
          <div 
            className="service-item-card" 
            key={srv.id || idx}
            style={{ 
              animation: "fadeInUp 0.6s var(--ease) both",
              animationDelay: `${idx * 0.1}s`,
              opacity: 1 
            }}
          >
            <div className="service-card-header">
              <div className="service-icon-box">
                {srv.icon || "📐"}
              </div>
              <h3 className="service-item-title">{srv.title}</h3>
            </div>
            
            <p className="service-desc" style={{ maxWidth: "100%", color: "var(--text-secondary)" }}>
              {srv.desc}
            </p>

            {srv.features && srv.features.length > 0 && (
              <div className="service-features-list">
                {srv.features.map((feat, fIdx) => (
                  <span key={fIdx} className="service-tag-badge">{feat}</span>
                ))}
              </div>
            )}

            <div className="service-card-footer" style={{ borderTop: "1px solid var(--border)", paddingTop: "12px", marginTop: "8px" }}>
              <a 
                href="https://wa.me/96899100882" 
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "600", textDecoration: "none" }}
              >
                Get Started
              </a>
              <a 
                href="https://wa.me/96899100882" 
                target="_blank"
                rel="noopener noreferrer"
                className="service-arrow-btn" 
                title="Order Service"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
