// components/template/PortfolioView.jsx
// Dynamic portfolio viewer that injects user data into the template sections

import React, { useState } from 'react';
import TemplateNavbar from './TemplateNavbar';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ProjectsSection from './ProjectsSection';
import ExperienceSection from './ExperienceSection';
import ContactSection from './ContactSection';
import '../../styles/template-preview.css';

const PortfolioView = ({ data }) => {
    const [currentView, setView] = useState('home');
    
    // Check if user has experience to show the tab
    const hasExperience = data?.experience && data.experience.length > 0;

    // Helper to render the active component with data injection
    const renderContent = () => {
        switch (currentView) {
            case 'home':
                return <HeroSection data={data} />;
            case 'about':
                return <AboutSection data={data} />;
            case 'projects':
                return <ProjectsSection data={data?.projects} />;
            case 'experience':
                return hasExperience ? <ExperienceSection data={data?.experience} /> : <HeroSection data={data} />;
            case 'contact':
                return <ContactSection data={{
                    email: data?.contactEmail,
                    phone: data?.phone,
                    socials: {
                        github: data?.githubUrl,
                        twitter: data?.twitterUrl,
                        linkedin: data?.linkedinUrl
                    }
                }} />;
            default:
                return <HeroSection data={data} />;
        }
    };

    return (
        <div className="tpl-preview public-view">
            {/* Top Navbar */}
            <TemplateNavbar 
                currentView={currentView} 
                setView={setView} 
                isExperienced={hasExperience} 
            />

            {/* Content Stage */}
            <main className="tpl-content-stage">
                {renderContent()}
            </main>

            {/* Footer / Credits */}
            <footer className="public-footer">
                <p>Generated with Portfolio Site Generator</p>
            </footer>
        </div>
    );
};

export default PortfolioView;
