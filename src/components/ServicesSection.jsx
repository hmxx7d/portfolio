import React from "react";

export function ServicesSection({ services = [], onSeeAllServices }) {
  const displayedServices = services.slice(0, 3);

  const scrollToContact = (e) => {
    e.preventDefault();
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section" id="services">
      <div className="section-title-wrapper">
        <h2 className="section-main-title">My <span>Services</span></h2>
        <p className="section-main-subtitle">
          I provide customized services designed to amplify your digital footprint and leave a lasting brand impression.
        </p>
      </div>

      <div className="services-grid">
        {displayedServices.map((srv, idx) => (
          <div 
            className="service-item-card" 
            key={idx}
            style={{ transitionDelay: `${idx * 0.15}s` }}
          >
            <h3 className="service-item-title">{srv.title}</h3>
            
            <div className="service-item-mockup">
              <img src={srv.image} alt={srv.title} />
            </div>

            <div className="service-card-footer">
              <p className="service-desc">{srv.desc}</p>
              <a href="#contact" className="service-arrow-btn" onClick={scrollToContact} title="Order Service">
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
          See All Services
        </button>
      </div>
    </section>
  );
}
