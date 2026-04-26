// pages/UserPortfolioPage.jsx
// Public-facing portfolio page for a specific user

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPublicPortfolio } from '../services/portfolioService';
import PortfolioView from '../components/template/PortfolioView';
import '../styles/portfolio-form.css'; // Reusing some base styles for loader/error

const UserPortfolioPage = () => {
    const { userId } = useParams();
    const [portfolioData, setPortfolioData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const result = await getPublicPortfolio(userId);
                if (result?.success) {
                    setPortfolioData(result.data);
                } else {
                    setError('Portfolio not found');
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load portfolio');
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    if (loading) {
        return (
            <div className="status-container">
                <div className="loader">✨ Loading Portfolio...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="status-container">
                <div className="error-card">
                    <h1>Oops! 🛸</h1>
                    <p>{error}</p>
                    <button onClick={() => window.location.href = '/'}>Go Home</button>
                </div>
            </div>
        );
    }

    return (
        <div className="user-portfolio-page">
            <PortfolioView data={portfolioData} />
        </div>
    );
};

export default UserPortfolioPage;
