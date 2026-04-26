// components/template/AboutSection.jsx
// About Me section with bio and stats grid

import React from 'react';

const stats = [
    { number: '3+',  label: 'Years Exp.' },
    { number: '25+', label: 'Projects' },
    { number: '15+', label: 'Clients' },
    { number: '99%', label: 'On Time' },
];

const AboutSection = ({ data }) => {
    const { 
        about = `I'm a full-stack developer and UI/UX enthusiast based in San Francisco. I specialize in building beautiful, performant web applications that solve real problems. When I'm not coding, you'll find me exploring new design trends or contributing to open source.`
    } = data || {};

    return (
        <section className="tpl-section" id="tpl-about">
            <div className="tpl-section-inner">
                <div className="tpl-about-grid">
                    <div>
                        <span className="tpl-about-label">About Me</span>
                        <h2 className="tpl-about-heading">
                            Designing the future,<br />one pixel at a time.
                        </h2>
                        <p className="tpl-about-text">
                            {about}
                        </p>
                    </div>

                    <div className="tpl-about-stats">
                        {stats.map((stat) => (
                            <div className="tpl-stat-card" key={stat.label}>
                                <div className="tpl-stat-number">{stat.number}</div>
                                <div className="tpl-stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
