// components/template/HeroSection.jsx
// Intro / Hero section of the portfolio preview

import React from 'react';

const HeroSection = ({ data }) => {
    const { 
        fullName = 'Alex Chen', 
        designation = 'A creative developer crafting digital experiences that blend design thinking with clean code.' 
    } = data || {};

    return (
        <section className="tpl-section tpl-hero" id="tpl-intro">
            <div className="tpl-section-inner">
                <span className="tpl-hero-greeting">Hey there 👋</span>
                <h1 className="tpl-hero-name">
                    I'm <span className="tpl-hero-name-highlight">{fullName}</span>
                </h1>
                <p className="tpl-hero-tagline">
                    {designation}
                </p>
                <div className="tpl-hero-cta">
                    <button className="btn btn-primary" onClick={() => {
                        document.getElementById('tpl-projects')?.scrollIntoView({ behavior: 'smooth' });
                    }}>
                        <span className="btn-content">View Projects</span>
                        <div className="btn-flare" />
                    </button>
                    <button className="btn btn-outline" onClick={() => {
                        document.getElementById('tpl-contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}>
                        <span className="btn-content">Get In Touch</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
