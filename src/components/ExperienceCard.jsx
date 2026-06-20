import React from "react";

export function ExperienceCard({ experience }) {
  return (
    <article className="card card-experience" id="card-experience">
      <div className="section-header">
        <h2 class="section-title">Experience</h2>
        <span class="section-count">{experience.length} roles</span>
      </div>
      <div className="timeline">
        {experience.map((exp, idx) => (
          <React.Fragment key={exp.id}>
            <div 
              className="timeline-item" 
              id={`exp-${exp.id}`}
              style={{ transitionDelay: `${0.1 + idx * 0.15}s` }}
            >
              <div className={`timeline-dot accent-${exp.accent}`}></div>
              <div className="timeline-content">
                <div className="timeline-top">
                  <span className="timeline-company">{exp.company}</span>
                  <span className="timeline-date">{exp.date}</span>
                </div>
                <span className="timeline-role">{exp.role}</span>
                <ul className="timeline-points">
                  {exp.points.map((pt, pIdx) => (
                    <li key={pIdx}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
            {idx < experience.length - 1 && (
              <div 
                className="timeline-divider" 
                style={{ transitionDelay: `${0.2 + idx * 0.15}s` }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </article>
  );
}
