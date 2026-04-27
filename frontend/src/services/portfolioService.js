// services/portfolioService.js
// API layer for portfolio data management
// Interview concept: Data mapping and separation of concerns

import axios from 'axios';

const portfolioApi = axios.create({
    baseURL: '/api/portfolio',
    withCredentials: true,
});

/**
 * Get current user's portfolio
 */
export const getPortfolio = async () => {
    const response = await portfolioApi.get('');
    return response.data;
};

/**
 * Get a public portfolio by User ID
 * @param {string} userId 
 */
export const getPublicPortfolio = async (userId) => {
    const response = await portfolioApi.get(`/u/${userId}`);
    return response.data;
};

/**
 * Save or Update portfolio data
 * @param {Object} rawData - Original state from the React form
 */
export const savePortfolio = async (rawData) => {
    // Data Mapping: Convert frontend state to backend model format
    const formattedData = {
        fullName: rawData.personal.fullName,
        designation: rawData.personal.tagline, // backend uses 'designation'
        about: rawData.personal.bio,           // backend uses 'about'
        contactEmail: rawData.personal.email,
        phone: rawData.personal.phone,
        resumeUrl: rawData.personal.resumeUrl,
        githubUrl: rawData.socials.github,
        twitterUrl: rawData.socials.twitter,
        linkedinUrl: rawData.socials.linkedin,
        // Map lists to match model schema property names
        projects: rawData.projects.map(p => ({
            title: p.name,
            description: p.description,
            tech: p.techStack ? p.techStack.split(',').map(s => s.trim()).filter(Boolean) : [], // convert string to array, filter out empty values
            link: '' // can be added later if needed
        })),
        experience: rawData.experience.map(e => ({
            company: e.company,
            role: e.role,
            duration: e.duration,
            description: e.description
        }))
    };

    const response = await portfolioApi.post('', formattedData);
    return response.data;
};
