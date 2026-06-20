import React, { useState, useEffect } from "react";

export function Header({ name, currentPage, onNavigate }) {
  const [activeAnchor, setActiveAnchor] = useState("#home");
  const logoText = name ? name.split(" ")[0] : "Sunil";
  const isHome = currentPage === "home";

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

  return (
    <header className="main-header">
      <a href="#home" className="header-logo" onClick={(e) => { e.preventDefault(); scrollToSection("home"); }}>
        <div className="logo-dot">SK</div>
        <span>{logoText}</span>
      </a>

      <ul className="header-nav">
        <li>
          <span 
            className={`nav-item-link ${isHome && activeAnchor === "#home" ? "active" : ""}`}
            onClick={() => scrollToSection("home")}
          >
            Home
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
            Services
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
            Portfolio
          </span>
        </li>
        <li>
          <span 
            className={`nav-item-link ${isHome && activeAnchor === "#skills" ? "active" : ""}`}
            onClick={() => scrollToSection("skills")}
          >
            Skills
          </span>
        </li>
        <li>
          <span 
            className={`nav-item-link ${isHome && activeAnchor === "#contact" ? "active" : ""}`}
            onClick={() => scrollToSection("contact")}
          >
            Contact
          </span>
        </li>
      </ul>

      <a 
        href="#contact" 
        className="header-cta-btn"
        onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}
      >
        Let's Talk
      </a>
    </header>
  );
}
