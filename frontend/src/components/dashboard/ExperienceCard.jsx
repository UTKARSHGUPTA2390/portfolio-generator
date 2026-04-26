// components/dashboard/ExperienceCard.jsx
// Selectable card for choosing experience level (Fresher / Experienced)

import React from 'react';

const ExperienceCard = ({ icon, title, description, isActive, onClick }) => {
    return (
        <div
            className={`experience-card ${isActive ? 'experience-card-active' : ''}`}
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onClick()}
            aria-pressed={isActive}
        >
            <div className="experience-card-icon">{icon}</div>
            <div className="experience-card-title">{title}</div>
            <div className="experience-card-desc">{description}</div>
            <div className="experience-card-check">✓</div>
        </div>
    );
};

export default ExperienceCard;
