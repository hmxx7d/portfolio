import React, { useState, useEffect, useRef } from "react";

function Counter({ target, duration = 1500, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [hasRun, setHasRun] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasRun) {
          setHasRun(true);
          let start = 0;
          const end = parseInt(target, 10);
          if (start === end) {
            setCount(end);
            return;
          }
          const incrementTime = Math.max(Math.floor(duration / end), 30);
          
          const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= end) {
              clearInterval(timer);
            }
          }, incrementTime);
          
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration, hasRun]);

  return <span ref={elementRef}>{count}{suffix}</span>;
}

export function CvCard() {
  return (
    <article className="card card-cv" id="card-cv">
      <div className="cv-glow"></div>
      <div className="cv-content">
        <div className="cv-icon-wrapper">
          <svg className="cv-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        </div>
        <h2 className="cv-title">My CV</h2>
        <p className="cv-subtitle">Download my full curriculum vitae with detailed work history.</p>
        <a href="#" className="cv-download-btn" id="cv-download-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download CV
        </a>
        <div className="cv-stats">
          <div className="cv-stat">
            <span className="cv-stat-num">
              <Counter target="20" suffix="+" />
            </span>
            <span className="cv-stat-label">Projects</span>
          </div>
          <div className="cv-stat-divider"></div>
          <div className="cv-stat">
            <span className="cv-stat-num">
              <Counter target="4" suffix="+" />
            </span>
            <span className="cv-stat-label">Years Exp.</span>
          </div>
          <div className="cv-stat-divider"></div>
          <div className="cv-stat">
            <span className="cv-stat-num">
              <Counter target="15" suffix="+" />
            </span>
            <span className="cv-stat-label">Clients</span>
          </div>
        </div>
      </div>
    </article>
  );
}
