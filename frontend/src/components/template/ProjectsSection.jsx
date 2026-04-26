// components/template/ProjectsSection.jsx
// Projects showcase with hover-animated cards

import React from 'react';

const projects = [
    {
        id: 1,
        name: 'Orbit Dashboard',
        description: 'A real-time analytics dashboard built with React and D3.js. Features live data streaming and interactive charts.',
        tags: ['React', 'D3.js', 'WebSocket'],
    },
    {
        id: 2,
        name: 'Pulse Commerce',
        description: 'Modern e-commerce platform with AI-powered product recommendations and seamless Stripe integration.',
        tags: ['Next.js', 'Stripe', 'AI/ML'],
    },
    {
        id: 3,
        name: 'Zenith Notes',
        description: 'Collaborative note-taking app with real-time sync, markdown support, and beautiful minimal design.',
        tags: ['Vue.js', 'Firebase', 'Markdown'],
    },
];

const ProjectsSection = ({ data }) => {
    // Falls back to hardcoded projects if data is not provided
    const displayProjects = data && data.length > 0 ? data : projects;

    return (
        <section className="tpl-section" id="tpl-projects">
            <div className="tpl-section-inner">
                <div className="tpl-projects-header">
                    <div className="tpl-projects-label">Selected Work</div>
                    <h2 className="tpl-projects-title">Featured Projects</h2>
                </div>

                <div className="tpl-projects-grid">
                    {displayProjects.map((project, index) => (
                        <div className="tpl-project-card" key={project.id || index}>
                            <div className="tpl-project-number">
                                {String(index + 1).padStart(2, '0')}
                            </div>
                            <h3 className="tpl-project-name">{project.name || project.title}</h3>
                            <p className="tpl-project-desc">{project.description}</p>
                            <div className="tpl-project-tags">
                                {(project.tags || project.tech || []).map((tag) => (
                                    <span className="tpl-project-tag" key={tag}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
