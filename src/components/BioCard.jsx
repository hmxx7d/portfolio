import React, { useState } from "react";

export function BioCard({ name, title, bio, interests }) {
  const [hoveredTag, setHoveredTag] = useState(null);
  const [offsets, setOffsets] = useState({});

  const handleMouseEnter = (idx) => {
    // Generate a subtle random offset for float effect on hover
    const offsetVal = (Math.random() - 0.5) * 6;
    setHoveredTag(idx);
    setOffsets(prev => ({
      ...prev,
      [idx]: {
        transform: `translateY(${offsetVal}px) rotate(${offsetVal * 0.5}deg)`
      }
    }));
  };

  const handleMouseLeave = (idx) => {
    setHoveredTag(null);
    setOffsets(prev => ({
      ...prev,
      [idx]: {}
    }));
  };

  return (
    <article className="card card-bio" id="card-bio">
      <div className="bio-header">
        <h1 className="bio-name">{name}</h1>
        <span className="bio-title-chip">{title}</span>
      </div>
      <p className="bio-text">
        {bio}
      </p>
      <div className="interests-row">
        <span className="interests-label">Interests</span>
        <div className="interest-tags">
          {interests.map((tag, idx) => (
            <span 
              key={idx}
              className="interest-tag" 
              style={{
                animationDelay: `${0.1 + idx * 0.08}s`,
                ...(hoveredTag === idx ? offsets[idx] : {})
              }}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
