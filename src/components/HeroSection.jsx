import React from "react";
import { uiTranslations } from "../translations";

export function HeroSection({ name, title, bio, avatar, details, resumeUrl, currentLang }) {
  const t = uiTranslations[currentLang || "ar"];
  const isAr = currentLang === "ar";

  return (
    <section className="section hero-section in-view" id="home">
      <div className="hero-avatar-area">
        <div className="avatar-circle-wrapper">
          <div className="decor-dot decor-dot-1"></div>
          <div className="decor-dot decor-dot-2"></div>
          <div className="hero-avatar-ring"></div>
          <img 
            src={avatar} 
            alt={name} 
            className="hero-avatar-img" 
          />
        </div>
      </div>

      <div className="hero-content-area">
        <span className="hero-badge">{isAr ? "نبذة عني" : "About Me"}</span>
        <h1 className="hero-pitch-title">
          {isAr ? (
            <>احصل على موقع ويب يترك <span>انطباعاً دائماً</span> لدى جمهورك!!!</>
          ) : (
            <>Get a website that will make a <span>lasting impression</span> on your audience!!!</>
          )}
        </h1>
        <p className="hero-bio">
          {isAr ? (
            <>مرحباً، أنا <strong>{name}</strong>، وأعمل كـ <strong>{title}</strong>. {bio}</>
          ) : (
            <>Hi, I'm <strong>{name}</strong>, a professional <strong>{title}</strong>. {bio}</>
          )}
        </p>

        <div className="hero-details-table">
          <div className="details-cell">
            <span className="details-cell-label">{isAr ? "الاسم:" : "Name:"}</span>
            <span className="details-cell-value">{name}</span>
          </div>
          <div className="details-cell">
            <span className="details-cell-label">{isAr ? "رقم الهاتف:" : "Phone:"}</span>
            <span className="details-cell-value">{details.phone}</span>
          </div>
          <div className="details-cell">
            <span className="details-cell-label">{isAr ? "البريد الإلكتروني:" : "Email:"}</span>
            <span className="details-cell-value">{details.email}</span>
          </div>
          <div className="details-cell">
            <span className="details-cell-label">{isAr ? "الموقع:" : "Location:"}</span>
            <span className="details-cell-value">{details.location} {details.flag}</span>
          </div>
        </div>

        <div className="hero-action-buttons">
          <a 
            href="https://wa.me/96899100882" 
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hero-primary"
          >
            {t.btnContactMe}
          </a>
          {resumeUrl ? (
            <a 
              href={resumeUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-hero-outline" 
              download
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {t.btnDownloadResume}
            </a>
          ) : (
            <a 
              href="#" 
              className="btn-hero-outline" 
              onClick={(e) => { e.preventDefault(); alert(t.resumeNotUploaded); }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {t.btnDownloadResume}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
