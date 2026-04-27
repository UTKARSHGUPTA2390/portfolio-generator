import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/common/Button';
import { useToast } from '../context/ToastContext';
import '../styles/portfolio-ready.css';

const PortfolioReadyPage = () => {
    const { publicSlug } = useParams();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [copied, setCopied] = useState(false);

    const publicUrl = useMemo(() => {
        if (!publicSlug) return '';
        return `${window.location.origin}/${publicSlug}`;
    }, [publicSlug]);

    const handleCopy = async () => {
        if (!publicUrl) return;

        try {
            await navigator.clipboard.writeText(publicUrl);
            setCopied(true);
            showToast('Portfolio URL copied', 'success');
            setTimeout(() => setCopied(false), 2000);
        } catch {
            showToast('Unable to copy URL', 'error');
        }
    };

    const handleOpenPortfolio = () => {
        if (!publicUrl) return;
        window.open(publicUrl, '_blank', 'noopener,noreferrer');
    };

    if (!publicSlug) {
        return (
            <div className="portfolio-ready-page">
                <div className="portfolio-ready-card">
                    <h1 className="portfolio-ready-title">Portfolio Not Found</h1>
                    <p className="portfolio-ready-subtitle">
                        Generate your portfolio first to get a public URL.
                    </p>
                    <Button variant="outline" onClick={() => navigate('/dashboard')}>
                        Back to Dashboard
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="portfolio-ready-page">
            <div className="portfolio-ready-card">
                <span className="portfolio-ready-badge">Portfolio Generated</span>
                <h1 className="portfolio-ready-title">Your Public Portfolio Is Live</h1>
                <p className="portfolio-ready-subtitle">
                    Share this URL on your resume or with recruiters.
                </p>

                <div className="portfolio-ready-url-wrap">
                    <label className="portfolio-ready-url-label" htmlFor="generated-url">Public URL</label>
                    <input
                        id="generated-url"
                        className="portfolio-ready-url"
                        value={publicUrl}
                        readOnly
                    />
                </div>

                <div className="portfolio-ready-actions">
                    <Button onClick={handleOpenPortfolio}>
                        Open Portfolio
                    </Button>
                    <Button variant="outline" onClick={handleCopy}>
                        {copied ? 'Copied' : 'Copy URL'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PortfolioReadyPage;
