import React from "react";
import { uiTranslations } from "../translations";

export function ServicesSection({ services = [], onSeeAllServices, currentLang }) {
  const displayedServices = services.slice(0, 3);
  const t = uiTranslations[currentLang || "ar"];

  const scrollToContact = (e) => {
    e.preventDefault();
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section" id="services">
      <div className="section-title-wrapper">
        <h2 className="section-main-title">{t.servicesTitle} <span>{t.servicesTitleSpan}</span></h2>
        <p className="section-main-subtitle">
          {t.servicesSubtitle}
        </p>
      </div>

      <div className="services-grid">
        {displayedServices.map((srv, idx) => (
          <div 
            className="service-item-card" 
            key={idx}
            style={{ transitionDelay: `${idx * 0.15}s` }}
          >
            <div className="service-card-header">
              <div className="service-icon-box">
                {srv.icon || "📐"}
              </div>
              <h3 className="service-item-title">{srv.title}</h3>
            </div>
            
            <p className="service-desc" style={{ maxWidth: "100%" }}>{srv.desc}</p>
            
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
                {t.btnGetStarted}
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

      <div className="services-cta-wrapper">
        <button 
          type="button"
          className="btn-hero-outline" 
          onClick={onSeeAllServices}
          style={{ background: "transparent", cursor: "pointer" }}
        >
          {t.btnSeeAllServices}
        </button>
      </div>
    </section>
  );
}
