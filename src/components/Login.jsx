import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export function Login({ onClose, onAuthSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) throw signInError;
      if (onAuthSuccess) onAuthSuccess(data.session);
      onClose();
    } catch (err) {
      setError(err.message || "Something went wrong. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-overlay" style={{ display: "flex", justifyContent: "center", alignItems: "center", zIndex: 10000 }}>
      <div 
        className="card" 
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "40px 30px",
          background: "rgba(14, 15, 22, 0.85)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
          position: "relative",
          animation: "fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
      >
        <button 
          onClick={onClose} 
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "none",
            border: "none",
            color: "var(--text-secondary)",
            fontSize: "24px",
            cursor: "pointer",
            transition: "color 0.2s"
          }}
          onMouseEnter={(e) => e.target.style.color = "var(--text-primary)"}
          onMouseLeave={(e) => e.target.style.color = "var(--text-secondary)"}
        >
          ✕
        </button>

        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div style={{
            fontSize: "40px",
            marginBottom: "10px",
            background: "var(--grad-violet)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block"
          }}>
            ⚡
          </div>
          <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#fff", marginBottom: "8px" }}>
            Admin Dashboard Sign In
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
            Enter your credentials to access the admin panel
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {error && (
            <div style={{
              background: "rgba(244, 63, 94, 0.1)",
              border: "1px solid var(--rose)",
              color: "#ff8296",
              padding: "12px 16px",
              borderRadius: "10px",
              fontSize: "14px",
              lineHeight: "1.4"
            }}>
              ⚠️ {error}
            </div>
          )}

          {message && (
            <div style={{
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid var(--emerald)",
              color: "#34d399",
              padding: "12px 16px",
              borderRadius: "10px",
              fontSize: "14px",
              lineHeight: "1.4"
            }}>
              ✉️ {message}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: "500" }}>
              Email Address
            </label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "var(--card-bg-2)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                color: "#fff",
                fontSize: "15px",
                transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--violet)"}
              onBlur={(e) => e.target.style.borderColor = "var(--border)"}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: "500" }}>
              Password
            </label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "var(--card-bg-2)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                color: "#fff",
                fontSize: "15px",
                transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--violet)"}
              onBlur={(e) => e.target.style.borderColor = "var(--border)"}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: "var(--grad-profile)",
              border: "none",
              borderRadius: "10px",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "transform 0.2s, opacity 0.2s",
              opacity: loading ? 0.7 : 1
            }}
            onMouseEnter={(e) => { if(!loading) e.target.style.transform = "scale(1.02)" }}
            onMouseLeave={(e) => { if(!loading) e.target.style.transform = "scale(1)" }}
          >
            {loading ? "Processing..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
