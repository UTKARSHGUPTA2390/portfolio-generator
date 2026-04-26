// components/template/ContactSection.jsx
// Contact section for the portfolio preview

import React from 'react';

const ContactSection = ({ data }) => {
    const {
        email = 'hello@alexchen.dev',
        phone = '+1 (555) 000-0000',
        socials = {
            github: '#',
            twitter: '#',
            linkedin: '#'
        }
    } = data || {};

    return (
        <section className="tpl-section tpl-contact" id="tpl-contact">
            <div className="tpl-section-inner">
                <span className="tpl-contact-label">Get In Touch</span>
                <h2 className="tpl-contact-heading">Let's build something <br /> amazing together.</h2>
                <p className="tpl-contact-text">
                    I'm always open to new opportunities, collaborations, or just a friendly chat about design and tech.
                </p>
                <div className="tpl-contact-links">
                    <a href={`mailto:${email}`} className="tpl-contact-link">
                        <span>✉️</span> {email}
                    </a>
                    {phone && (
                        <a href={`tel:${phone}`} className="tpl-contact-link">
                            <span>📞</span> {phone}
                        </a>
                    )}
                    {socials.github && (
                        <a href={socials.github} target="_blank" rel="noopener noreferrer" className="tpl-contact-link">
                            <span>🐙</span> GitHub
                        </a>
                    )}
                    {socials.twitter && (
                        <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="tpl-contact-link">
                            <span>🐦</span> Twitter
                        </a>
                    )}
                    {socials.linkedin && (
                        <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="tpl-contact-link">
                            <span>💼</span> LinkedIn
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
