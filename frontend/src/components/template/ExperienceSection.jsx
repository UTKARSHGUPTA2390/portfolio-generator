// components/template/ExperienceSection.jsx
// Work experience timeline — only shown when user selects "Experienced"

import React from 'react';

const experiences = [
    {
        id: 1,
        role: 'Senior Frontend Developer',
        company: 'Nebula Labs',
        date: '2023 — Present',
        description: 'Leading the frontend architecture for a SaaS platform serving 50K+ users. Built the design system from scratch.',
    },
    {
        id: 2,
        role: 'Full Stack Developer',
        company: 'Pixel Studio',
        date: '2021 — 2023',
        description: 'Developed client-facing web apps for agencies and startups. Reduced load times by 60% through optimization.',
    },
    {
        id: 3,
        role: 'Junior Developer',
        company: 'CodeForge Inc.',
        date: '2020 — 2021',
        description: 'Built REST APIs and contributed to the React dashboard. Shipped 12 features in the first 6 months.',
    },
];

const ExperienceSection = ({ data }) => {
    // Falls back to hardcoded experiences if data is not provided
    const displayExperiences = data && data.length > 0 ? data : experiences;

    return (
        <section className="tpl-section" id="tpl-experience">
            <div className="tpl-section-inner">
                <div className="tpl-exp-header">
                    <div className="tpl-exp-label">Career Path</div>
                    <h2 className="tpl-exp-title">Experience</h2>
                </div>

                <div className="tpl-timeline">
                    {displayExperiences.map((exp, index) => (
                        <div className="tpl-timeline-item" key={exp.id || index}>
                            <div className="tpl-timeline-dot" />
                            <div className="tpl-timeline-date">{exp.date || exp.duration}</div>
                            <div className="tpl-timeline-card">
                                <div className="tpl-timeline-role">{exp.role}</div>
                                <div className="tpl-timeline-company">{exp.company}</div>
                                <p className="tpl-timeline-desc">{exp.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;
