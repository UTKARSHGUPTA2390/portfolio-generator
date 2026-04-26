// pages/DashboardPage.jsx
// Main landing page after login

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExperienceCard from '../components/dashboard/ExperienceCard';
import TemplateCard from '../components/dashboard/TemplateCard';
import TemplatePreview from '../components/template/TemplatePreview';
import neoMinimalPreview from '../assets/neo-minimal-preview.png';
import '../styles/dashboard.css';

const DashboardPage = () => {
    const [experience, setExperience] = useState('fresher'); // 'fresher' or 'experienced'
    const [showPreview, setShowPreview] = useState(false);
    const navigate = useNavigate();

    const handleUseTemplate = () => {
        // Redirect to create-portfolio with experience type as a query param
        navigate(`/create-portfolio?type=${experience}`);
    };

    if (showPreview) {
        return (
            <TemplatePreview 
                isExperienced={experience === 'experienced'} 
                onBack={() => setShowPreview(false)} 
            />
        );
    }

    return (
        <div className="dashboard-wrapper">
            {/* Welcome Section */}
            <section className="welcome-section">
                <div className="welcome-badge">
                    <span className="welcome-badge-dot" />
                    BETA ACCESS LIVE
                </div>
                <h1 className="welcome-heading">
                    Create your portfolio in <br />
                    <span className="welcome-heading-gradient">2 minutes.</span>
                </h1>
                <p className="welcome-sub">
                    Choose your experience level and get started instantly with our premium templates.
                </p>
            </section>

            {/* Experience Selection */}
            <section className="experience-section">
                <div className="experience-label">Selection your level</div>
                <div className="experience-cards">
                    <ExperienceCard 
                        icon="🎓"
                        title="Fresher"
                        description="Focus on projects & skills"
                        isActive={experience === 'fresher'}
                        onClick={() => setExperience('fresher')}
                    />
                    <ExperienceCard 
                        icon="💼"
                        title="Experienced"
                        description="Highlight your career path"
                        isActive={experience === 'experienced'}
                        onClick={() => setExperience('experienced')}
                    />
                </div>
            </section>

            {/* Template Selection */}
            <section className="template-section">
                <div className="template-section-header">
                    <h2 className="template-section-title">Available Templates</h2>
                    <p className="template-section-sub">Pick a starting point for your digital identity.</p>
                </div>

                <div className="template-grid">
                    <TemplateCard 
                        name="Neo Minimal"
                        description="A sleek, futuristic design with soft gradients and high-contrast typography. Perfect for developers and designers."
                        tag="Popular"
                        previewImage={neoMinimalPreview}
                        onPreview={() => setShowPreview(true)}
                        onUse={handleUseTemplate}
                    />
                </div>
            </section>
        </div>
    );
};

export default DashboardPage;
