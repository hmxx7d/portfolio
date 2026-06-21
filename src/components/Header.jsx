import React, { useState, useEffect } from "react";
import { uiTranslations } from "../translations";

export function Header({ name, currentPage, onNavigate, currentLang, onToggleLang }) {
  const [activeAnchor, setActiveAnchor] = useState("#home");
  const logoText = name ? name.split(" ")[0] : "Sunil";
  const isHome = currentPage === "home";
  const t = uiTranslations[currentLang || "ar"];

  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => {
      const sections = ["home", "services", "portfolio", "skills", "testimonials", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveAnchor(`#${section}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const scrollToSection = (id) => {
    if (currentPage !== "home") {
      onNavigate("home");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setActiveAnchor(`#${id}`);
      }
    }
  };

  const isServices = currentPage === "services";
  const isProjects = currentPage === "projects";
  const logoInitials = logoText.slice(0, 2).toUpperCase();

  return (
    <header className="main-header">
      <a href="#home" className="header-logo" onClick={(e) => { e.preventDefault(); scrollToSection("home"); }}>
        <div className="logo-dot">{logoInitials}</div>
        <span>{logoText}</span>
      </a>

      <ul className="header-nav">
        <li>
          <span 
            className={`nav-item-link ${isHome && activeAnchor === "#home" ? "active" : ""}`}
            onClick={() => scrollToSection("home")}
          >
            {t.navHome}
          </span>
        </li>
        <li>
          <span 
            className={`nav-item-link ${isServices ? "active" : (isHome && activeAnchor === "#services" ? "active" : "")}`}
            onClick={() => {
              if (isServices) {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                scrollToSection("services");
              }
            }}
          >
            {t.navServices}
          </span>
        </li>
        <li>
          <span 
            className={`nav-item-link ${isProjects ? "active" : (isHome && activeAnchor === "#portfolio" ? "active" : "")}`}
            onClick={() => {
              if (isProjects) {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                scrollToSection("portfolio");
              }
            }}
          >
            {t.navPortfolio}
          </span>
        </li>
        <li>
          <span 
            className={`nav-item-link ${isHome && activeAnchor === "#skills" ? "active" : ""}`}
            onClick={() => scrollToSection("skills")}
          >
            {t.navSkills}
          </span>
        </li>
        <li>
          <span 
            className={`nav-item-link ${isHome && activeAnchor === "#contact" ? "active" : ""}`}
            onClick={() => scrollToSection("contact")}
          >
            {t.navContact}
          </span>
        </li>
      </ul>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button 
          type="button" 
          onClick={onToggleLang} 
          className="lang-toggle-btn"
        >
          🌐 {currentLang === "en" ? "العربية" : "English"}
        </button>

        <a 
          href="https://wa.me/96899100882" 
          target="_blank"
          rel="noopener noreferrer"
          className="header-cta-btn"
        >
          {t.btnLetsTalk}
        </a>
      </div>
    </header>
  );
}
