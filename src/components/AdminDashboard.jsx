import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export function AdminDashboard({ data, onSave, onClose, onLogout, isSaving, currentLang }) {
  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState(data);
  const [uploading, setUploading] = useState({});
  const [editingLang, setEditingLang] = useState(currentLang || "ar");

  // Helper to upload images to Supabase Storage
  const handleImageUpload = async (e, type, id) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileExt = file.name.split(".").pop();
    const fileName = `${type}_${id || Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const uploadKey = `${type}_${id}`;
    setUploading((prev) => ({ ...prev, [uploadKey]: true }));

    try {
      // 1. Upload to Supabase Storage bucket 'portfolio'
      const { error: uploadError } = await supabase.storage
        .from("portfolio")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from("portfolio")
        .getPublicUrl(filePath);

      // 3. Update State
      if (type === "avatar") {
        handleFieldChange("avatar", publicUrl);
      } else if (type === "project") {
        handleProjectChange(id, "image", publicUrl);
      } else if (type === "service") {
        handleServiceChange(id, "image", publicUrl);
      } else if (type === "resume") {
        handleFieldChange("resumeUrl", publicUrl);
      }
    } catch (err) {
      alert("Error uploading image: " + err.message);
    } finally {
      setUploading((prev) => ({ ...prev, [uploadKey]: false }));
    }
  };

  // Helper to update flat fields
  const handleFieldChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [editingLang]: {
        ...prev[editingLang],
        [field]: value
      }
    }));
  };

  // Helper to update details fields
  const handleDetailChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [editingLang]: {
        ...prev[editingLang],
        details: {
          ...prev[editingLang].details,
          [field]: value
        }
      }
    }));
  };

  // Helper to update social links
  const handleSocialChange = (index, value) => {
    setFormData(prev => ({
      ...prev,
      [editingLang]: {
        ...prev[editingLang],
        socials: prev[editingLang].socials.map((soc, i) => i === index ? { ...soc, url: value } : soc)
      }
    }));
  };

  // Helper for Skills addition/deletion
  const handleAddSkill = (category, skill) => {
    if (!skill.trim()) return;
    setFormData(prev => ({
      ...prev,
      [editingLang]: {
        ...prev[editingLang],
        skills: {
          ...prev[editingLang].skills,
          [category]: [...(prev[editingLang].skills[category] || []), skill.trim()]
        }
      }
    }));
  };

  const handleRemoveSkill = (category, index) => {
    setFormData(prev => ({
      ...prev,
      [editingLang]: {
        ...prev[editingLang],
        skills: {
          ...prev[editingLang].skills,
          [category]: prev[editingLang].skills[category].filter((_, i) => i !== index)
        }
      }
    }));
  };

  // Helper for Projects adding/updating/deleting
  const handleProjectChange = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      [editingLang]: {
        ...prev[editingLang],
        projects: prev[editingLang].projects.map(proj => 
          proj.id === id ? { ...proj, [field]: value } : proj
        )
      }
    }));
  };

  const handleAddProject = () => {
    const newProj = {
      id: `proj_${Date.now()}`,
      name: editingLang === "ar" ? "مشروع جديد" : "New Project",
      desc: editingLang === "ar" ? "وصف المشروع..." : "Project description...",
      image: "/project1.png",
      techs: ["React"],
      category: "frontend",
      github: "https://github.com",
      live: "https://example.com"
    };
    setFormData(prev => ({
      ...prev,
      [editingLang]: {
        ...prev[editingLang],
        projects: [...prev[editingLang].projects, newProj]
      }
    }));
  };

  const handleRemoveProject = (id) => {
    setFormData(prev => ({
      ...prev,
      [editingLang]: {
        ...prev[editingLang],
        projects: prev[editingLang].projects.filter(proj => proj.id !== id)
      }
    }));
  };

  // Helper for Experience adding/updating/deleting
  const handleExpChange = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      [editingLang]: {
        ...prev[editingLang],
        experience: prev[editingLang].experience.map(exp => 
          exp.id === id ? { ...exp, [field]: value } : exp
        )
      }
    }));
  };

  const handleAddExp = () => {
    const newExp = {
      id: `exp_${Date.now()}`,
      company: editingLang === "ar" ? "شركة جديدة" : "New Company",
      role: editingLang === "ar" ? "مهندس برمجيات" : "Software Engineer",
      date: "2025 – 2026",
      points: editingLang === "ar" ? ["إنجاز مختصر 1", "إنجاز مختصر 2"] : ["Brief achievement 1", "Brief achievement 2"],
      accent: "violet"
    };
    setFormData(prev => ({
      ...prev,
      [editingLang]: {
        ...prev[editingLang],
        experience: [...prev[editingLang].experience, newExp]
      }
    }));
  };

  const handleRemoveExp = (id) => {
    setFormData(prev => ({
      ...prev,
      [editingLang]: {
        ...prev[editingLang],
        experience: prev[editingLang].experience.filter(exp => exp.id !== id)
      }
    }));
  };

  // Helper for Education adding/updating/deleting
  const handleEduChange = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      [editingLang]: {
        ...prev[editingLang],
        education: prev[editingLang].education.map(edu => 
          edu.id === id ? { ...edu, [field]: value } : edu
        )
      }
    }));
  };

  const handleAddEdu = () => {
    const newEdu = {
      id: `edu_${Date.now()}`,
      degree: editingLang === "ar" ? "عنوان الشهادة" : "Certificate / Degree Title",
      school: editingLang === "ar" ? "اسم المؤسسة التعليمية" : "School / Institution Name",
      year: "2024–2025"
    };
    setFormData(prev => ({
      ...prev,
      [editingLang]: {
        ...prev[editingLang],
        education: [...(prev[editingLang].education || []), newEdu]
      }
    }));
  };

  const handleRemoveEdu = (id) => {
    setFormData(prev => ({
      ...prev,
      [editingLang]: {
        ...prev[editingLang],
        education: prev[editingLang].education.filter(edu => edu.id !== id)
      }
    }));
  };

  // Helper for Services adding/updating/deleting
  const handleServiceChange = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      [editingLang]: {
        ...prev[editingLang],
        services: prev[editingLang].services.map(srv => 
          srv.id === id ? { ...srv, [field]: value } : srv
        )
      }
    }));
  };

  const handleAddService = () => {
    const newSrv = {
      id: `srv_${Date.now()}`,
      title: editingLang === "ar" ? "خدمة جديدة معروضة" : "New Service Offered",
      desc: editingLang === "ar" ? "وصف الخدمة هنا..." : "Service description goes here...",
      icon: "📐",
      image: "/project1.png",
      features: editingLang === "ar" ? ["ميزة رئيسية 1", "ميزة رئيسية 2"] : ["Key Feature 1", "Key Feature 2"]
    };
    setFormData(prev => ({
      ...prev,
      [editingLang]: {
        ...prev[editingLang],
        services: [...(prev[editingLang].services || []), newSrv]
      }
    }));
  };

  const handleRemoveService = (id) => {
    setFormData(prev => ({
      ...prev,
      [editingLang]: {
        ...prev[editingLang],
        services: prev[editingLang].services.filter(srv => srv.id !== id)
      }
    }));
  };

  // Helper for Testimonials adding/updating/deleting
  const handleTestimonialChange = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      [editingLang]: {
        ...prev[editingLang],
        testimonials: prev[editingLang].testimonials.map(t => 
          t.id === id ? { ...t, [field]: value } : t
        )
      }
    }));
  };

  const handleAddTestimonial = () => {
    const newT = {
      id: `t_${Date.now()}`,
      stars: 5,
      quote: editingLang === "ar" ? "عمل رائع! فاق المطور توقعاتنا..." : "Outstanding work! The developer exceeded our expectations...",
      name: editingLang === "ar" ? "اسم العميل" : "Client Name",
      title: editingLang === "ar" ? "المدير التنفيزي / مدير المشروع" : "CEO / Manager",
      avatar: "/avatar.jpeg"
    };
    setFormData(prev => ({
      ...prev,
      [editingLang]: {
        ...prev[editingLang],
        testimonials: [...(prev[editingLang].testimonials || []), newT]
      }
    }));
  };

  const handleRemoveTestimonial = (id) => {
    setFormData(prev => ({
      ...prev,
      [editingLang]: {
        ...prev[editingLang],
        testimonials: prev[editingLang].testimonials.filter(t => t.id !== id)
      }
    }));
  };

  // Handle saving the full data
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const currentData = formData[editingLang] || {};

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <span>⚙️</span> Control Panel
        </div>
        <div className="admin-tabs">
          <button 
            type="button"
            className={`admin-tab-btn ${activeTab === "general" ? "active" : ""}`}
            onClick={() => setActiveTab("general")}
          >
            👤 General & Socials
          </button>
          <button 
            type="button"
            className={`admin-tab-btn ${activeTab === "services" ? "active" : ""}`}
            onClick={() => setActiveTab("services")}
          >
            📐 Services Setup
          </button>
          <button 
            type="button"
            className={`admin-tab-btn ${activeTab === "projects" ? "active" : ""}`}
            onClick={() => setActiveTab("projects")}
          >
            🚀 Projects (Portfolio)
          </button>
          <button 
            type="button"
            className={`admin-tab-btn ${activeTab === "skills" ? "active" : ""}`}
            onClick={() => setActiveTab("skills")}
          >
            🛠️ Skills Setup
          </button>
          <button 
            type="button"
            className={`admin-tab-btn ${activeTab === "timeline" ? "active" : ""}`}
            onClick={() => setActiveTab("timeline")}
          >
            💼 Career & Education
          </button>
          <button 
            type="button"
            className={`admin-tab-btn ${activeTab === "testimonials" ? "active" : ""}`}
            onClick={() => setActiveTab("testimonials")}
          >
            💬 Testimonials
          </button>
        </div>
        <div className="admin-sidebar-footer" style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "15px" }}>
          <button type="button" className="btn-close-dash" onClick={onClose} style={{ width: "100%" }}>
            ← Back to Profile
          </button>
          {onLogout && (
            <button 
              type="button" 
              className="btn-close-dash" 
              onClick={onLogout} 
              style={{ 
                width: "100%",
                background: "rgba(244, 63, 94, 0.1)", 
                border: "1px solid var(--rose)", 
                color: "#ff8296" 
              }}
            >
              🔒 Logout
            </button>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="admin-content">
        <header className="admin-content-header">
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <h2>Editing Profile Settings</h2>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Editing Language:</span>
              <button 
                type="button" 
                onClick={() => setEditingLang("en")}
                style={{
                  padding: "4px 8px",
                  fontSize: "0.75rem",
                  borderRadius: "4px",
                  border: "1px solid " + (editingLang === "en" ? "var(--violet)" : "var(--border)"),
                  background: editingLang === "en" ? "var(--violet)" : "transparent",
                  color: "#fff",
                  cursor: "pointer"
                }}
              >
                🇺🇸 EN
              </button>
              <button 
                type="button" 
                onClick={() => setEditingLang("ar")}
                style={{
                  padding: "4px 8px",
                  fontSize: "0.75rem",
                  borderRadius: "4px",
                  border: "1px solid " + (editingLang === "ar" ? "var(--violet)" : "var(--border)"),
                  background: editingLang === "ar" ? "var(--violet)" : "transparent",
                  color: "#fff",
                  cursor: "pointer"
                }}
              >
                🇴🇲 AR
              </button>
            </div>
          </div>
          <div className="admin-actions">
            <button type="button" className="btn-secondary" onClick={onClose} disabled={isSaving}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </header>

        <div className="admin-tab-panel">
          {/* ───────────────── GENERAL & SOCIALS TAB ───────────────── */}
          {activeTab === "general" && (
            <div className="form-grid">
              <h3 className="full-width" style={{ color: "var(--violet)", marginBottom: "10px" }}>Personal Details</h3>
              
              <div className="form-group">
                <label>Name</label>
                <input 
                  type="text" 
                  value={currentData.name || ""} 
                  onChange={e => handleFieldChange("name", e.target.value)} 
                  required
                />
              </div>

              <div className="form-group">
                <label>Professional Title</label>
                <input 
                  type="text" 
                  value={currentData.title || ""} 
                  onChange={e => handleFieldChange("title", e.target.value)} 
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Bio Summary</label>
                <textarea 
                  rows="3" 
                  value={currentData.bio || ""} 
                  onChange={e => handleFieldChange("bio", e.target.value)} 
                  required
                />
              </div>

              <div className="form-group">
                <label>Avatar / Profile Image Path</label>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {currentData.avatar && (
                    <div className="image-preview-box" style={{ width: "80px", height: "80px", borderRadius: "50%", overflow: "hidden", border: "2px solid var(--violet)", background: "rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <img src={currentData.avatar} alt="Avatar Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  )}
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <input 
                      type="text" 
                      value={currentData.avatar || ""} 
                      onChange={e => handleFieldChange("avatar", e.target.value)} 
                      required
                      style={{ flex: 1 }}
                    />
                    <label className="btn-add-item" style={{ margin: 0, padding: "8px 12px", fontSize: "12px", cursor: "pointer", display: "inline-block", textAlign: "center", whiteSpace: "nowrap" }}>
                      {uploading["avatar_profile"] ? "Uploading..." : "📁 Upload"}
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={e => handleImageUpload(e, "avatar", "profile")} 
                        style={{ display: "none" }}
                        disabled={uploading["avatar_profile"]}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Age</label>
                <input 
                  type="text" 
                  value={currentData.details?.age || ""} 
                  onChange={e => handleDetailChange("age", e.target.value)} 
                  required
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input 
                  type="text" 
                  value={currentData.details?.location || ""} 
                  onChange={e => handleDetailChange("location", e.target.value)} 
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  value={currentData.details?.email || ""} 
                  onChange={e => handleDetailChange("email", e.target.value)} 
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input 
                  type="text" 
                  value={currentData.details?.phone || ""} 
                  onChange={e => handleDetailChange("phone", e.target.value)} 
                  required
                />
              </div>

              <div className="form-group">
                <label>Country Flag Emoji</label>
                <input 
                  type="text" 
                  value={currentData.details?.flag || "🇮🇳"} 
                  onChange={e => handleDetailChange("flag", e.target.value)} 
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Interests (comma separated)</label>
                <input 
                  type="text" 
                  value={currentData.interests ? currentData.interests.join(", ") : ""} 
                  onChange={e => handleFieldChange(
                    "interests", 
                    e.target.value.split(",").map(i => i.trim()).filter(Boolean)
                  )} 
                />
              </div>

              <div className="form-group full-width">
                <label>CV / Resume File (PDF or Word)</label>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <input 
                    type="text" 
                    value={currentData.resumeUrl || ""} 
                    onChange={e => handleFieldChange("resumeUrl", e.target.value)} 
                    placeholder="Upload your CV/Resume file or paste public URL"
                    style={{ flex: 1 }}
                  />
                  <label className="btn-add-item" style={{ margin: 0, padding: "8px 12px", fontSize: "12px", cursor: "pointer", display: "inline-block", textAlign: "center", whiteSpace: "nowrap" }}>
                    {uploading["resume_file"] ? "Uploading..." : "📁 Upload CV"}
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx" 
                      onChange={e => handleImageUpload(e, "resume", "file")} 
                      style={{ display: "none" }}
                      disabled={uploading["resume_file"]}
                    />
                  </label>
                </div>
              </div>

              <h3 className="full-width" style={{ color: "var(--violet)", marginTop: "20px", marginBottom: "10px" }}>Social Media Profiles</h3>
              
              {currentData.socials?.map((soc, idx) => (
                <div className="form-group" key={idx}>
                  <label>{soc.name} URL</label>
                  <input 
                    type="text" 
                    value={soc.url || ""} 
                    onChange={e => handleSocialChange(idx, e.target.value)} 
                  />
                </div>
              ))}
            </div>
          )}

          {/* ───────────────── SERVICES TAB ───────────────── */}
          {activeTab === "services" && (
            <div className="admin-list-section">
              <div className="section-action-header">
                <h3>Offered Services ({currentData.services ? currentData.services.length : 0})</h3>
                <button type="button" className="btn-add-item" onClick={handleAddService}>
                  + Add Service
                </button>
              </div>

              <div className="item-edit-list">
                {currentData.services?.map((srv, idx) => (
                  <div className="item-edit-card" key={srv.id || idx}>
                    <div className="item-card-header">
                      <h4>Service #{idx + 1}: {srv.title}</h4>
                      <button 
                        type="button" 
                        className="btn-delete"
                        onClick={() => handleRemoveService(srv.id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>

                    <div className="form-grid">
                      <div className="form-group">
                        <label>Service Title</label>
                        <input 
                          type="text" 
                          value={srv.title || ""} 
                          onChange={e => handleServiceChange(srv.id, "title", e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Icon / Emoji</label>
                        <input 
                          type="text" 
                          value={srv.icon || ""} 
                          onChange={e => handleServiceChange(srv.id, "icon", e.target.value)}
                        />
                      </div>
                      <div className="form-group full-width">
                        <label>Short Description</label>
                        <input 
                          type="text" 
                          value={srv.desc || ""} 
                          onChange={e => handleServiceChange(srv.id, "desc", e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Mockup Image Path</label>
                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                          <input 
                            type="text" 
                            value={srv.image || "/project1.png"} 
                            onChange={e => handleServiceChange(srv.id, "image", e.target.value)}
                            style={{ flex: 1 }}
                          />
                          <label className="btn-add-item" style={{ margin: 0, padding: "8px 12px", fontSize: "12px", cursor: "pointer", display: "inline-block", textAlign: "center", whiteSpace: "nowrap" }}>
                            {uploading[`service_${srv.id}`] ? "Uploading..." : "📁 Upload"}
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={e => handleImageUpload(e, "service", srv.id)} 
                              style={{ display: "none" }}
                              disabled={uploading[`service_${srv.id}`]}
                            />
                          </label>
                        </div>
                      </div>
                      <div className="form-group full-width">
                        <label>Service Features (one per line)</label>
                        <textarea 
                          rows="3" 
                          value={srv.features ? srv.features.join("\n") : ""} 
                          onChange={e => handleServiceChange(
                            srv.id, 
                            "features", 
                            e.target.value.split("\n").map(f => f.trim()).filter(Boolean)
                          )}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ───────────────── PROJECTS TAB ───────────────── */}
          {activeTab === "projects" && (
            <div className="admin-list-section">
              <div className="section-action-header">
                <h3>Projects List ({currentData.projects ? currentData.projects.length : 0})</h3>
                <button type="button" className="btn-add-item" onClick={handleAddProject}>
                  + Add Project
                </button>
              </div>

              <div className="item-edit-list">
                {currentData.projects?.map((proj, idx) => (
                  <div className="item-edit-card" key={proj.id || idx}>
                    <div className="item-card-header">
                      <h4>Project #{idx + 1}: {proj.name}</h4>
                      <button 
                        type="button" 
                        className="btn-delete"
                        onClick={() => handleRemoveProject(proj.id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>

                    <div className="form-grid">
                      <div className="form-group">
                        <label>Project Name</label>
                        <input 
                          type="text" 
                          value={proj.name || ""} 
                          onChange={e => handleProjectChange(proj.id, "name", e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Category</label>
                        <select 
                          value={proj.category || "frontend"} 
                          onChange={e => handleProjectChange(proj.id, "category", e.target.value)}
                        >
                          <option value="frontend">Frontend</option>
                          <option value="backend">Backend</option>
                          <option value="mobile">Mobile</option>
                        </select>
                      </div>
                      <div className="form-group full-width">
                        <label>Description</label>
                        <input 
                          type="text" 
                          value={proj.desc || ""} 
                          onChange={e => handleProjectChange(proj.id, "desc", e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>GitHub Link</label>
                        <input 
                          type="text" 
                          value={proj.github || ""} 
                          onChange={e => handleProjectChange(proj.id, "github", e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Live Demo Link</label>
                        <input 
                          type="text" 
                          value={proj.live || ""} 
                          onChange={e => handleProjectChange(proj.id, "live", e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Project Screenshot Path</label>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          {proj.image && (
                            <div className="image-preview-box" style={{ width: "100%", height: "120px", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--border)", background: "rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <img src={proj.image} alt="Preview" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                            </div>
                          )}
                          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                            <input 
                              type="text" 
                              value={proj.image || "/project1.png"} 
                              onChange={e => handleProjectChange(proj.id, "image", e.target.value)}
                              style={{ flex: 1 }}
                            />
                            <label className="btn-add-item" style={{ margin: 0, padding: "8px 12px", fontSize: "12px", cursor: "pointer", display: "inline-block", textAlign: "center", whiteSpace: "nowrap" }}>
                              {uploading[`project_${proj.id}`] ? "Uploading..." : "📁 Upload"}
                              <input 
                                type="file" 
                                accept="image/*" 
                                onChange={e => handleImageUpload(e, "project", proj.id)} 
                                style={{ display: "none" }}
                                disabled={uploading[`project_${proj.id}`]}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="form-group full-width">
                        <label>Tech tags (comma separated)</label>
                        <input 
                          type="text" 
                          value={proj.techs ? proj.techs.join(", ") : ""} 
                          onChange={e => handleProjectChange(
                            proj.id, 
                            "techs", 
                            e.target.value.split(",").map(t => t.trim()).filter(Boolean)
                          )}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ───────────────── SKILLS TAB ───────────────── */}
          {activeTab === "skills" && (
            <div className="skills-setup-container">
              {currentData.skills && Object.keys(currentData.skills).map(category => (
                <div className="skill-edit-group" key={category}>
                  <h4 className="skill-group-title">{category.toUpperCase()} SKILLS</h4>
                  <div className="skill-edit-tags">
                    {currentData.skills[category]?.map((skill, idx) => (
                      <span className="skill-edit-tag" key={idx}>
                        {skill}
                        <button 
                          type="button" 
                          onClick={() => handleRemoveSkill(category, idx)}
                          className="btn-remove-tag"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  
                  {/* Inline adding form */}
                  <div className="add-tag-inline">
                    <input 
                      type="text" 
                      placeholder={`Add to ${category}...`} 
                      id={`input-add-${category}`}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSkill(category, e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                    <button 
                      type="button"
                      onClick={() => {
                        const input = document.getElementById(`input-add-${category}`);
                        handleAddSkill(category, input.value);
                        input.value = '';
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ───────────────── TIMELINES TAB ───────────────── */}
          {activeTab === "timeline" && (
            <div className="timeline-editor-wrapper">
              {/* WORK EXPERIENCE */}
              <div className="admin-list-section" style={{ marginBottom: "40px" }}>
                <div className="section-action-header">
                  <h3>Work Experience ({currentData.experience ? currentData.experience.length : 0})</h3>
                  <button type="button" className="btn-add-item" onClick={handleAddExp}>
                    + Add Role
                  </button>
                </div>

                <div className="item-edit-list">
                  {currentData.experience?.map((exp, idx) => (
                    <div className="item-edit-card" key={exp.id || idx}>
                      <div className="item-card-header">
                        <h4>Role #{idx + 1}: {exp.company}</h4>
                        <button 
                          type="button" 
                          className="btn-delete"
                          onClick={() => handleRemoveExp(exp.id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>

                      <div className="form-grid">
                        <div className="form-group">
                          <label>Company Name</label>
                          <input 
                            type="text" 
                            value={exp.company || ""} 
                            onChange={e => handleExpChange(exp.id, "company", e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Role</label>
                          <input 
                            type="text" 
                            value={exp.role || ""} 
                            onChange={e => handleExpChange(exp.id, "role", e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Date Period</label>
                          <input 
                            type="text" 
                            value={exp.date || ""} 
                            onChange={e => handleExpChange(exp.id, "date", e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Accent Color</label>
                          <select 
                            value={exp.accent || "violet"} 
                            onChange={e => handleExpChange(exp.id, "accent", e.target.value)}
                          >
                            <option value="violet">Violet (Orange)</option>
                            <option value="cyan">Cyan (Red)</option>
                            <option value="emerald">Emerald (Green)</option>
                          </select>
                        </div>
                        <div className="form-group full-width">
                          <label>Key Responsibilities (one per line)</label>
                          <textarea 
                            rows="3" 
                            value={exp.points ? exp.points.join("\n") : ""} 
                            onChange={e => handleExpChange(exp.id, "points", e.target.value.split("\n").filter(Boolean))}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* EDUCATION */}
              <div className="admin-list-section">
                <div className="section-action-header">
                  <h3>Education Timeline ({currentData.education ? currentData.education.length : 0})</h3>
                  <button type="button" className="btn-add-item" onClick={handleAddEdu}>
                    + Add Education
                  </button>
                </div>

                <div className="item-edit-list">
                  {currentData.education?.map((edu, idx) => (
                    <div className="item-edit-card" key={edu.id || idx}>
                      <div className="item-card-header">
                        <h4>Credential #{idx + 1}: {edu.degree}</h4>
                        <button 
                          type="button" 
                          className="btn-delete"
                          onClick={() => handleRemoveEdu(edu.id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>

                      <div className="form-grid">
                        <div className="form-group">
                          <label>Degree / Certificate</label>
                          <input 
                            type="text" 
                            value={edu.degree || ""} 
                            onChange={e => handleEduChange(edu.id, "degree", e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>School / University</label>
                          <input 
                            type="text" 
                            value={edu.school || ""} 
                            onChange={e => handleEduChange(edu.id, "school", e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Year / Duration</label>
                          <input 
                            type="text" 
                            value={edu.year || ""} 
                            onChange={e => handleEduChange(edu.id, "year", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ───────────────── TESTIMONIALS TAB ───────────────── */}
          {activeTab === "testimonials" && (
            <div className="admin-list-section">
              <div className="section-action-header">
                <h3>Client Reviews ({currentData.testimonials ? currentData.testimonials.length : 0})</h3>
                <button type="button" className="btn-add-item" onClick={handleAddTestimonial}>
                  + Add Review
                </button>
              </div>

              <div className="item-edit-list">
                {currentData.testimonials?.map((t, idx) => (
                  <div className="item-edit-card" key={t.id || idx}>
                    <div className="item-card-header">
                      <h4>Review #{idx + 1}: {t.name}</h4>
                      <button 
                        type="button" 
                        className="btn-delete"
                        onClick={() => handleRemoveTestimonial(t.id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>

                    <div className="form-grid">
                      <div className="form-group">
                        <label>Client Name</label>
                        <input 
                          type="text" 
                          value={t.name || ""} 
                          onChange={e => handleTestimonialChange(t.id, "name", e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Client Title / Company</label>
                        <input 
                          type="text" 
                          value={t.title || ""} 
                          onChange={e => handleTestimonialChange(t.id, "title", e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Rating (1 to 5 Stars)</label>
                        <select 
                          value={t.stars || 5} 
                          onChange={e => handleTestimonialChange(t.id, "stars", parseInt(e.target.value))}
                        >
                          <option value="5">★★★★★ (5 Stars)</option>
                          <option value="4">★★★★ (4 Stars)</option>
                          <option value="3">★★★ (3 Stars)</option>
                          <option value="2">★★ (2 Stars)</option>
                          <option value="1">★ (1 Star)</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Client Avatar Image Path</label>
                        <input 
                          type="text" 
                          value={t.avatar || "/avatar.jpeg"} 
                          onChange={e => handleTestimonialChange(t.id, "avatar", e.target.value)}
                        />
                      </div>
                      <div className="form-group full-width">
                        <label>Review Quote</label>
                        <textarea 
                          rows="3" 
                          value={t.quote || ""} 
                          onChange={e => handleTestimonialChange(t.id, "quote", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
