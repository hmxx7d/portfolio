import React from "react";

export function EducationCard({ education }) {
  const getIcon = (id) => {
    switch (id) {
      case "grad":
        return "🎓";
      case "diploma":
        return "📜";
      default:
        return "🏫";
    }
  };

  return (
    <article className="card card-education" id="card-education">
      <div className="section-header">
        <h2 className="section-title">Education</h2>
      </div>
      <div className="edu-list">
        {education.map((edu, idx) => (
          <div 
            className="edu-item" 
            key={edu.id} 
            id={`edu-${edu.id}`}
            style={{ transitionDelay: `${0.1 + idx * 0.15}s` }}
          >
            <div className="edu-icon">{getIcon(edu.id)}</div>
            <div className="edu-content">
              <div className="edu-top">
                <span className="edu-degree">{edu.degree}</span>
                <span className="edu-year">{edu.year}</span>
              </div>
              <span className="edu-school">{edu.school}</span>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
