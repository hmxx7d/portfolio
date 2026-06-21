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

const migrateToBilingual = (data) => {
  if (!data) return profileData;
  
  const hasBilingual = data.en && data.ar;
  if (hasBilingual && data.en.name !== "Sunil Kumar") {
    return data;
  }

  // Source of truth for migration is either the ar version (if already bilingual) or the flat data itself
  const source = hasBilingual ? data.ar : data;

  const arVersion = {
    ...profileData.ar,
    ...source,
    details: { ...profileData.ar.details, ...(source.details || {}) },
    skills: { ...profileData.ar.skills, ...(source.skills || {}) },
    projects: source.projects || profileData.ar.projects,
    experience: source.experience || profileData.ar.experience,
    education: source.education || profileData.ar.education,
    services: source.services || profileData.ar.services,
    testimonials: source.testimonials || profileData.ar.testimonials,
    socials: source.socials || profileData.ar.socials,
  };

  const enVersion = {
    ...profileData.en,
    ...source,
    details: { ...profileData.en.details, ...(source.details || {}) },
    skills: { ...profileData.en.skills, ...(source.skills || {}) },
    projects: source.projects || profileData.en.projects,
    experience: source.experience || profileData.en.experience,
    education: source.education || profileData.en.education,
    services: source.services || profileData.en.services,
    testimonials: source.testimonials || source.testimonials || profileData.en.testimonials,
    socials: source.socials || profileData.en.socials,
  };

  return {
    en: enVersion,
    ar: arVersion
  };
};

function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [session, setSession] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem("lang") || "ar";
  });

  // Listen to language changes to update page layout direction
  useEffect(() => {
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = currentLang;
    localStorage.setItem("lang", currentLang);
  }, [currentLang]);

  const handleToggleLang = () => {
    setCurrentLang(prev => prev === "ar" ? "en" : "ar");
  };

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

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("profileData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return migrateToBilingual(parsed);
      } catch (e) {
        console.error("Error parsing saved profileData", e);
      }
    }
    return profileData;
  });

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
          const bilingualData = migrateToBilingual(loadedData);
          setProfile(bilingualData);
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

  const p = profile[currentLang];

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
          currentLang={currentLang}
        />
      ) : (
        <>
          <div className="app-container">
            <Header 
              name={p.name} 
              currentPage={currentPage}
              onNavigate={setCurrentPage}
              currentLang={currentLang}
              onToggleLang={handleToggleLang}
            />
            
            {currentPage === "home" ? (
              <>
                <HeroSection 
                  name={p.name}
                  title={p.title}
                  bio={p.bio}
                  avatar={p.avatar}
                  details={p.details}
                  resumeUrl={p.resumeUrl}
                  currentLang={currentLang}
                />

                <PortfolioSection 
                  projects={p.projects} 
                  onSeeAllProjects={() => setCurrentPage("projects")}
                  currentLang={currentLang}
                />

                <ServicesSection 
                  services={p.services} 
                  onSeeAllServices={() => setCurrentPage("services")} 
                  currentLang={currentLang}
                />

                <SkillsSection skills={p.skills} currentLang={currentLang} />

                <TestimonialsSection testimonials={p.testimonials} currentLang={currentLang} />
              </>
            ) : currentPage === "services" ? (
              <ServicesPage name={p.name} services={p.services} currentLang={currentLang} />
            ) : (
              <ProjectsPage projects={p.projects} currentLang={currentLang} />
            )}
          </div>

          <Footer 
            name={p.name} 
            details={p.details} 
            socials={p.socials} 
            currentPage={currentPage}
            onNavigate={setCurrentPage}
            currentLang={currentLang}
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
