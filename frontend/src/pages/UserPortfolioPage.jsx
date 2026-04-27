// pages/UserPortfolioPage.jsx
// Public-facing portfolio page for a specific user

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPublicPortfolio } from '../services/portfolioService';
import PortfolioView from '../components/template/PortfolioView';
import '../styles/portfolio-form.css'; // Reusing some base styles for loader/error

const UserPortfolioPage = () => {
    const { publicSlug } = useParams();
    const [portfolioData, setPortfolioData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const result = await getPublicPortfolio(publicSlug);
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

        if (publicSlug) {
            fetchUserData();
        }
    }, [publicSlug]);

    const publicUrl = typeof window !== 'undefined' && publicSlug
        ? `${window.location.origin}/${publicSlug}`
        : '';

    const handleCopy = async () => {
        if (!publicUrl) return;
        try {
            await navigator.clipboard.writeText(publicUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    };

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
            <div
                style={{
                    maxWidth: '1200px',
                    margin: '6rem auto 0',
                    padding: '0 1rem',
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    position: 'relative',
                    zIndex: 5,
                }}
            >
                <span style={{ fontWeight: 700 }}>Public URL:</span>
                <code
                    style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#f0f0f5',
                        padding: '0.35rem 0.5rem',
                        borderRadius: '6px',
                    }}
                >
                    {publicUrl}
                </code>
                <button
                    type="button"
                    onClick={handleCopy}
                    style={{
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        background: 'rgba(255, 255, 255, 0.04)',
                        color: '#f0f0f5',
                        padding: '0.35rem 0.65rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                    }}
                >
                    {copied ? 'Copied' : 'Copy'}
                </button>
            </div>
            <PortfolioView data={portfolioData} />
        </div>
    );
};

export default UserPortfolioPage;
