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
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <div className="skill-item-icon-box" style={{ margin: 0 }}>
                {srv.icon || "📐"}
              </div>
              <h3 className="service-item-title" style={{ margin: 0 }}>{srv.title}</h3>
            </div>
            
            <p className="service-desc" style={{ maxWidth: "100%", color: "var(--text-secondary)", marginBottom: "16px" }}>
              {srv.desc}
            </p>

            {srv.features && srv.features.length > 0 && (
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", marginTop: "auto" }}>
                {srv.features.map((feat, fIdx) => (
                  <li key={fIdx} style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ color: "var(--violet)" }}>✓</span> {feat}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
