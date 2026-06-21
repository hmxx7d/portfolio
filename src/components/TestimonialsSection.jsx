import React from "react";
import { uiTranslations } from "../translations";

export function TestimonialsSection({ testimonials = [], currentLang }) {
  const t = uiTranslations[currentLang || "ar"];

  return (
    <section className="section" id="testimonials">
      <div className="section-title-wrapper">
        <h2 className="section-main-title">{t.testimonialsTitle} <span>{t.testimonialsTitleSpan}</span></h2>
        <p className="section-main-subtitle">
          {t.testimonialsSubtitle}
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
