import React, { useState, useEffect } from "react";
import { profileData } from "./data";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { PortfolioSection } from "./components/PortfolioSection";
import { SkillsSection } from "./components/SkillsSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { ServicesPage } from "./components/ServicesPage";
import { ProjectsPage } from "./components/ProjectsPage";
import { Footer } from "./components/Footer";
import { AdminDashboard } from "./components/AdminDashboard";
import { supabase } from "./supabaseClient";
import { Login } from "./components/Login";

function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [session, setSession] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // 1. Listen to Supabase Auth state changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Fetch profile data from Supabase on load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from("profile_data")
          .select("data")
          .limit(1)
          .maybeSingle();

        if (error) throw error;

        if (data && data.data) {
          const loadedData = data.data;
          // Migrate old placeholder projects if present in Supabase data
          if (loadedData.projects && loadedData.projects.some(p => ["proj1", "proj2", "proj3"].includes(p.id))) {
            loadedData.projects = profileData.projects;
          }
          // Enforce Instagram only if it contains old profiles or doesn't have Instagram
          if (!loadedData.socials || loadedData.socials.length > 1 || !loadedData.socials.some(s => s.name.toLowerCase() === "instagram")) {
            loadedData.socials = profileData.socials;
          }
          setProfile(loadedData);
        }
      } catch (err) {
        console.error("Error fetching profile from Supabase:", err.message);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Error logging out: " + error.message);
    } else {
      setSession(null);
      setShowAdmin(false);
    }
  };

  const [profile, setProfile] = useState(() => {
    // Check if custom data exists in localStorage
    const saved = localStorage.getItem("profileData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Migrate old avatar path if stored in localStorage
        if (parsed.avatar === "/avatar.png") {
          parsed.avatar = "/avatar.jpeg";
        }
        if (parsed.testimonials) {
          parsed.testimonials = parsed.testimonials.map(t => ({
            ...t,
            avatar: t.avatar === "/avatar.png" ? "/avatar.jpeg" : t.avatar
          }));
        }
        // Deep merge details & skills and supply default lists for newly controllable fields
        const merged = {
          ...profileData,
          ...parsed,
          details: { ...profileData.details, ...(parsed.details || {}) },
          skills: { ...profileData.skills, ...(parsed.skills || {}) },
          projects: (parsed.projects && !parsed.projects.some(p => ["proj1", "proj2", "proj3"].includes(p.id))) ? parsed.projects : profileData.projects,
          experience: parsed.experience || profileData.experience,
          education: parsed.education || profileData.education,
          services: parsed.services || profileData.services,
          testimonials: parsed.testimonials || profileData.testimonials,
          socials: parsed.socials || profileData.socials,
        };
        if (!merged.socials || merged.socials.length > 1 || !merged.socials.some(s => s.name.toLowerCase() === "instagram")) {
          merged.socials = profileData.socials;
        }
        return merged;
      } catch (e) {
        console.error("Error parsing saved profileData", e);
      }
    }
    return profileData;
  });

  useEffect(() => {
    if (showAdmin) return;
    const sections = document.querySelectorAll(".section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px -20px 0px" }
    );
    sections.forEach((sec) => observer.observe(sec));

    // Safety fallback: Force-reveal all sections after 600ms to guarantee visibility
    const timer = setTimeout(() => {
      sections.forEach((sec) => sec.classList.add("in-view"));
    }, 600);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [showAdmin, profile, currentPage]);

  const handleSaveProfile = async (updatedData) => {
    if (!session) return;
    setIsSaving(true);
    try {
      // Check if user already has profile data
      const { data: existing, error: fetchErr } = await supabase
        .from("profile_data")
        .select("id")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (fetchErr) throw fetchErr;

      if (existing) {
        // Update
        const { error: updateErr } = await supabase
          .from("profile_data")
          .update({ data: updatedData, updated_at: new Date() })
          .eq("user_id", session.user.id);

        if (updateErr) throw updateErr;
      } else {
        // Insert
        const { error: insertErr } = await supabase
          .from("profile_data")
          .insert({
            user_id: session.user.id,
            data: updatedData,
            updated_at: new Date()
          });

        if (insertErr) throw insertErr;
      }

      setProfile(updatedData);
      localStorage.setItem("profileData", JSON.stringify(updatedData));
      setShowAdmin(false);
    } catch (err) {
      alert("Error saving data to Supabase: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {/* Ambient background blobs */}
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>
      <div className="bg-blob blob-3"></div>

      {showAdmin ? (
        <AdminDashboard 
          data={profile}
          onSave={handleSaveProfile}
          onClose={() => setShowAdmin(false)}
          onLogout={handleLogout}
          isSaving={isSaving}
        />
      ) : (
        <>
          <div className="app-container">
            <Header 
              name={profile.name} 
              currentPage={currentPage}
              onNavigate={setCurrentPage}
            />
            
            {currentPage === "home" ? (
              <>
                <HeroSection 
                  name={profile.name}
                  title={profile.title}
                  bio={profile.bio}
                  avatar={profile.avatar}
                  details={profile.details}
                />

                <PortfolioSection 
                  projects={profile.projects} 
                  onSeeAllProjects={() => setCurrentPage("projects")}
                />

                <ServicesSection 
                  services={profile.services} 
                  onSeeAllServices={() => setCurrentPage("services")} 
                />

                <SkillsSection skills={profile.skills} />

                <TestimonialsSection testimonials={profile.testimonials} />
              </>
            ) : currentPage === "services" ? (
              <ServicesPage name={profile.name} services={profile.services} />
            ) : (
              <ProjectsPage projects={profile.projects} />
            )}
          </div>

          <Footer 
            name={profile.name} 
            details={profile.details} 
            socials={profile.socials} 
            currentPage={currentPage}
            onNavigate={setCurrentPage}
          />

          {/* Floating Admin Settings Trigger */}
          <button 
            type="button"
            className="floating-admin-btn" 
            onClick={() => {
              if (session) {
                setShowAdmin(true);
              } else {
                setShowLogin(true);
              }
            }}
            title="Open Admin Settings"
          >
            ⚙️
          </button>
        </>
      )}

      {showLogin && (
        <Login 
          onClose={() => setShowLogin(false)}
          onAuthSuccess={(session) => {
            setSession(session);
            setShowAdmin(true);
          }}
        />
      )}
    </>
  );
}

export default App;
