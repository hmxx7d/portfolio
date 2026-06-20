import React from "react";

export function TestimonialsSection({ testimonials = [] }) {
  return (
    <section className="section" id="testimonials">
      <div className="section-title-wrapper">
        <h2 className="section-main-title">What My <span>Clients Say</span></h2>
        <p className="section-main-subtitle">
          Don't take my word for it. Here is the feedback from some of the amazing teams and clients I've collaborated with.
        </p>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((t, idx) => (
          <div 
            className="testimonial-item-card" 
            key={t.id || idx}
            style={{ transitionDelay: `${idx * 0.15}s` }}
          >
            <div className="stars-row">
              {Array.from({ length: t.stars || 5 }).map((_, sIdx) => (
                <span key={sIdx}>★</span>
              ))}
            </div>
            
            <p className="testimonial-quote-text">
              "{t.quote}"
            </p>

            <div className="testimonial-client-row">
              <div className="client-meta-box">
                <img src={t.avatar || "/avatar.jpeg"} alt={t.name} className="client-avatar-img" />
                <div className="client-name-details">
                  <span className="client-full-name">{t.name}</span>
                  <span className="client-job-title">{t.title}</span>
                </div>
              </div>
              <span className="quote-decor-icon">”</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
