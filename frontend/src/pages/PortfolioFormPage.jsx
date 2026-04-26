// pages/PortfolioFormPage.jsx
// Dynamic form for collecting portfolio data

import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { usePortfolio } from '../hooks/usePortfolio';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import '../styles/portfolio-form.css';

const PortfolioFormPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { handleSavePortfolio, fetchPortfolio, loading, error } = usePortfolio();
    const { showToast } = useToast();
    const { user } = useAuth(); // Import useAuth to get user id
    const userType = searchParams.get('type') || 'fresher'; // 'fresher' or 'experienced'
    const [formData, setFormData] = useState({
        personal: {
            fullName: '',
            tagline: '',
            email: '',
            phone: '',
            resumeUrl: '', // Added Resume Field
            bio: '',
        },
        socials: {
            github: '',
            linkedin: '',
            twitter: '',
        },
        projects: [
            { id: Date.now(), name: '', description: '', techStack: '' }
        ],
        experience: [
            { id: Date.now(), role: '', company: '', duration: '', description: '' }
        ]
    });

    // Handle nested state updates
    const handlePersonalChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            personal: { ...prev.personal, [name]: value }
        }));
    };

    const handleSocialChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            socials: { ...prev.socials, [name]: value }
        }));
    };

    // Dynamic Lists Handlers
    const updateListItem = (listName, id, field, value) => {
        setFormData(prev => ({
            ...prev,
            [listName]: prev[listName].map(item => 
                item.id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const addListItem = (listName) => {
        const newItem = listName === 'projects' 
            ? { id: Date.now(), name: '', description: '', techStack: '' }
            : { id: Date.now(), role: '', company: '', duration: '', description: '' };
        
        setFormData(prev => ({
            ...prev,
            [listName]: [...prev[listName], newItem]
        }));
    };

    const removeListItem = (listName, id) => {
        if (formData[listName].length <= 1) return; // Keep at least one
        setFormData(prev => ({
            ...prev,
            [listName]: prev[listName].filter(item => item.id !== id)
        }));
    };

    // Load existing data if available
    useEffect(() => {
        const loadPortfolio = async () => {
            const result = await fetchPortfolio();
            if (result && result.data) {
                const p = result.data;
                // Map backend format BACK to frontend state format
                setFormData({
                    personal: {
                        fullName: p.fullName || '',
                        tagline: p.designation || '',
                        email: p.contactEmail || '',
                        phone: p.phone || '',
                        resumeUrl: p.resumeUrl || '',
                        bio: p.about || '',
                    },
                    socials: {
                        github: p.githubUrl || '',
                        linkedin: p.linkedinUrl || '',
                        twitter: p.twitterUrl || '',
                    },
                    projects: p.projects.length > 0 
                        ? p.projects.map(proj => ({
                            id: Math.random(),
                            name: proj.title || '',
                            description: proj.description || '',
                            techStack: proj.tech?.join(', ') || ''
                        }))
                        : [{ id: Date.now(), name: '', description: '', techStack: '' }],
                    experience: p.experience.length > 0
                        ? p.experience.map(exp => ({
                            id: Math.random(),
                            role: exp.role || '',
                            company: exp.company || '',
                            duration: exp.duration || '',
                            description: exp.description || ''
                        }))
                        : [{ id: Date.now(), role: '', company: '', duration: '', description: '' }]
                });
            }
        };
        loadPortfolio();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleSavePortfolio(formData);
            showToast('Portfolio data saved successfully! ✨', 'success');
            
            // Redirect to the dynamic user portfolio page
            if (user?.id) {
                setTimeout(() => {
                    navigate(`/u/${user.id}`);
                }, 1500); // Small delay to let them see the success toast
            }
        } catch (err) {
            showToast(err.message, 'error');
        }
    };

    return (
        <div className="form-page-wrapper">
            <header className="form-header">
                <h1 className="form-title">Build Your Story</h1>
                <p className="form-subtitle">
                    Fill in your details to populate your {userType} portfolio.
                </p>
            </header>

            <div className="portfolio-form-container">
                {error && <div className="form-error-banner">⚠️ {error}</div>}
                
                <form id="portfolio-data-form" className="portfolio-form" onSubmit={handleSubmit}>
                    {/* 1. Basic Information */}
                    <section className="form-section">
                        <h2 className="form-section-title"><span>👤</span> Personal Info</h2>
                        <div className="form-grid">
                            <Input 
                                label="Full Name" 
                                name="fullName" 
                                placeholder="John Doe" 
                                value={formData.personal.fullName}
                                onChange={handlePersonalChange}
                            />
                            <Input 
                                label="Email Address" 
                                name="email" 
                                type="email"
                                placeholder="john@example.com" 
                                value={formData.personal.email}
                                onChange={handlePersonalChange}
                            />
                            <Input 
                                label="Phone Number" 
                                name="phone" 
                                type="tel"
                                placeholder="+1 (555) 000-0000" 
                                value={formData.personal.phone}
                                onChange={handlePersonalChange}
                            />
                            <Input 
                                label="Resume URL (G-Drive/DropBox)" 
                                name="resumeUrl" 
                                placeholder="https://drive.google.com/..." 
                                value={formData.personal.resumeUrl}
                                onChange={handlePersonalChange}
                            />
                            <Input 
                                label="Tagline" 
                                name="tagline" 
                                placeholder="Creative Developer & Designer" 
                                value={formData.personal.tagline}
                                onChange={handlePersonalChange}
                            />
                            <div className="full-width">
                                <Input 
                                    label="Short Bio" 
                                    name="bio" 
                                    placeholder="Tell us about yourself..." 
                                    value={formData.personal.bio}
                                    onChange={handlePersonalChange}
                                />
                            </div>
                        </div>
                    </section>

                    {/* 2. Social Links */}
                    <section className="form-section">
                        <h2 className="form-section-title"><span>🔗</span> Social Presence</h2>
                        <div className="form-grid">
                            <Input 
                                label="GitHub URL" 
                                name="github" 
                                placeholder="https://github.com/..." 
                                value={formData.socials.github}
                                onChange={handleSocialChange}
                            />
                            <Input 
                                label="LinkedIn URL" 
                                name="linkedin" 
                                placeholder="https://linkedin.com/in/..." 
                                value={formData.socials.linkedin}
                                onChange={handleSocialChange}
                            />
                            <Input 
                                label="Twitter URL" 
                                name="twitter" 
                                placeholder="https://twitter.com/..." 
                                value={formData.socials.twitter}
                                onChange={handleSocialChange}
                            />
                        </div>
                    </section>

                    {/* 3. Projects (Always Required) */}
                    <section className="form-section">
                        <h2 className="form-section-title"><span>🚀</span> Projects</h2>
                        <div className="dynamic-list">
                            {formData.projects.map((project, index) => (
                                <div key={project.id} className="list-item-wrapper">
                                    {index > 0 && (
                                        <button type="button" className="remove-btn" onClick={() => removeListItem('projects', project.id)}>×</button>
                                    )}
                                    <div className="form-grid">
                                        <Input 
                                            label={`Project ${index + 1} Name`} 
                                            placeholder="Project X" 
                                            value={project.name}
                                            onChange={(e) => updateListItem('projects', project.id, 'name', e.target.value)}
                                        />
                                        <Input 
                                            label="Tech Stack" 
                                            placeholder="React, Node.js, etc." 
                                            value={project.techStack}
                                            onChange={(e) => updateListItem('projects', project.id, 'techStack', e.target.value)}
                                        />
                                        <div className="full-width">
                                            <Input 
                                                label="Description" 
                                                placeholder="What did you build?" 
                                                value={project.description}
                                                onChange={(e) => updateListItem('projects', project.id, 'description', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {formData.projects.length < 3 && (
                                <button type="button" className="add-btn" onClick={() => addListItem('projects')}>
                                    + Add Another Project
                                </button>
                            )}
                        </div>
                    </section>

                    {/* 4. Experience (Conditional) */}
                    {userType === 'experienced' && (
                        <section className="form-section">
                            <h2 className="form-section-title"><span>💼</span> Experience</h2>
                            <div className="dynamic-list">
                                {formData.experience.map((exp, index) => (
                                    <div key={exp.id} className="list-item-wrapper">
                                        {index > 0 && (
                                            <button type="button" className="remove-btn" onClick={() => removeListItem('experience', exp.id)}>×</button>
                                        )}
                                        <div className="form-grid">
                                            <Input 
                                                label="Role" 
                                                placeholder="Senior Dev" 
                                                value={exp.role}
                                                onChange={(e) => updateListItem('experience', exp.id, 'role', e.target.value)}
                                            />
                                            <Input 
                                                label="Company" 
                                                placeholder="Google" 
                                                value={exp.company}
                                                onChange={(e) => updateListItem('experience', exp.id, 'company', e.target.value)}
                                            />
                                            <Input 
                                                label="Duration" 
                                                placeholder="2021 - Present" 
                                                value={exp.duration}
                                                onChange={(e) => updateListItem('experience', exp.id, 'duration', e.target.value)}
                                            />
                                            <div className="full-width">
                                                <Input 
                                                    label="Description" 
                                                    placeholder="Key contributions..." 
                                                    value={exp.description}
                                                    onChange={(e) => updateListItem('experience', exp.id, 'description', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button type="button" className="add-btn" onClick={() => addListItem('experience')}>
                                    + Add Experience Entry
                                </button>
                            </div>
                        </section>
                    )}
                </form>
            </div>

            {/* Form Actions (Fixed at Bottom) */}
            <div className="form-footer">
                <Button variant="outline" onClick={() => navigate('/dashboard')}>
                    Back
                </Button>
                <Button type="submit" form="portfolio-data-form" disabled={loading}>
                    {loading ? 'Saving...' : 'Generate Portfolio ✨'}
                </Button>
            </div>
        </div>
    );
};

export default PortfolioFormPage;
