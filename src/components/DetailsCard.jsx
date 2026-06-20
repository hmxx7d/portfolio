import React, { useState } from "react";

export function DetailsCard({ details }) {
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => {
        setCopiedField(null);
      }, 2000);
    } catch (err) {
      // Fallback
      const el = document.createElement("textarea");
      el.value = text;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.focus();
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      
      setCopiedField(field);
      setTimeout(() => {
        setCopiedField(null);
      }, 2000);
    }
  };

  return (
    <article className="card card-details" id="card-details">
      <div className="details-label">Details</div>
      <div className="details-row">
        
        <div className="detail-item" id="detail-age" title="Age" style={{ animationDelay: '0.1s' }}>
          <span className="detail-icon">🎂</span>
          <span className="detail-text">{details.age}</span>
        </div>

        <div 
          className={`detail-item copyable ${copiedField === "email" ? "copied" : ""}`}
          id="detail-email" 
          onClick={() => handleCopy(details.email, "email")}
          title="Click to copy email"
          style={{ animationDelay: '0.18s' }}
        >
          <span className="detail-icon">{copiedField === "email" ? "✅" : "📧"}</span>
          <span className="detail-text">
            {copiedField === "email" ? "Copied!" : details.email}
          </span>
          <span className="copy-hint">Click to copy</span>
        </div>

        <div 
          className={`detail-item copyable ${copiedField === "phone" ? "copied" : ""}`}
          id="detail-phone" 
          onClick={() => handleCopy(details.phone, "phone")}
          title="Click to copy phone"
          style={{ animationDelay: '0.26s' }}
        >
          <span className="detail-icon">{copiedField === "phone" ? "✅" : "📱"}</span>
          <span className="detail-text">
            {copiedField === "phone" ? "Copied!" : details.phone}
          </span>
          <span className="copy-hint">Click to copy</span>
        </div>

        <div className="detail-item" id="detail-location" title="Location" style={{ animationDelay: '0.34s' }}>
          <span className="detail-icon">📍</span>
          <span className="detail-text">
            {details.location} {details.flag}
          </span>
        </div>

      </div>
    </article>
  );
}
