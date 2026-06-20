import React, { useRef } from "react";

export function AvatarCard({ avatar }) {
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Apply parallax tilt rotation to the avatar image
    imgRef.current.style.transform = `perspective(400px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.04)`;
    imgRef.current.style.transition = "none";
  };

  const handleMouseLeave = () => {
    if (!imgRef.current) return;
    imgRef.current.style.transform = "";
    imgRef.current.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
  };

  return (
    <article 
      className="card card-avatar" 
      id="card-avatar"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="avatar-wrapper">
        <div className="avatar-ring"></div>
        <img 
          ref={imgRef}
          src={avatar} 
          alt="Developer Avatar" 
          className="avatar-img" 
          id="avatar-img" 
        />
        <div className="status-dot" title="Available for work"></div>
      </div>
      <div className="avatar-badge">
        <span className="badge-icon">⚡</span>
        <span>Open to Work</span>
      </div>
    </article>
  );
}
