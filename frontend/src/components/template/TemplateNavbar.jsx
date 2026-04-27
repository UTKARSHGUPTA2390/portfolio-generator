// components/template/TemplateNavbar.jsx
// SPA-style top navigation bar for the portfolio preview

import React from 'react';

const getLogoText = (fullName) => {
    if (!fullName?.trim()) return 'ALEX.DEV';

    const firstName = fullName.trim().split(/\s+/)[0];
    return `${firstName}.DEV`.toUpperCase();
};

const TemplateNavbar = ({ currentView, setView, isExperienced, fullName, resumeUrl }) => {
    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'projects', label: 'Projects' },
        ...(isExperienced ? [{ id: 'experience', label: 'Experience' }] : []),
        { id: 'contact', label: 'Contact' },
    ];

    return (
        <nav className="tpl-navbar">
            <div className="tpl-nav-logo" title={fullName || 'Alex Chen'}>
                {getLogoText(fullName)}
            </div>
            
            <div className="tpl-nav-links">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        className={`tpl-nav-link ${currentView === item.id ? 'tpl-nav-link-active' : ''}`}
                        onClick={() => setView(item.id)}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            <div className="tpl-nav-actions">
                <a 
                    href={resumeUrl || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-outline" 
                    style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem', textDecoration: 'none' }}
                >
                    Resume
                </a>
            </div>
        </nav>
    );
};

export default TemplateNavbar;
