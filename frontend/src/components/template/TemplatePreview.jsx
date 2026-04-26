// components/template/TemplatePreview.jsx
// SPA-style portfolio preview wrapper (State-based view switching)

import React, { useState } from 'react';
import TemplateNavbar from './TemplateNavbar';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ProjectsSection from './ProjectsSection';
import ExperienceSection from './ExperienceSection';
import ContactSection from './ContactSection';
import '../../styles/template-preview.css';

const TemplatePreview = ({ isExperienced, onBack }) => {
    const [currentView, setView] = useState('home');

    // Helper to render the active component
    const renderContent = () => {
        switch (currentView) {
            case 'home':
                return <HeroSection />;
            case 'about':
                return <AboutSection />;
            case 'projects':
                return <ProjectsSection />;
            case 'experience':
                return isExperienced ? <ExperienceSection /> : <HeroSection />;
            case 'contact':
                return <ContactSection />;
            default:
                return <HeroSection />;
        }
    };

    return (
        <div className="tpl-preview">
            {/* Top Navbar */}
            <TemplateNavbar 
                currentView={currentView} 
                setView={setView} 
                isExperienced={isExperienced} 
            />

            {/* Content Stage */}
            <main className="tpl-content-stage">
                {renderContent()}
            </main>

            {/* Back to Dashboard Button (SPA Style) */}
            <button className="tpl-back-btn-spa" onClick={onBack}>
                ← Dashboard
            </button>
        </div>
    );
};

export default TemplatePreview;
