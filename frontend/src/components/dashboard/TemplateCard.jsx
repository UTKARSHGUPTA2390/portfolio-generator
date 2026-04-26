// components/dashboard/TemplateCard.jsx
// Card displaying a portfolio template with preview image, info, and action buttons

import React from 'react';

const TemplateCard = ({ name, description, tag, previewImage, onPreview, onUse }) => {
    return (
        <div className="template-card">
            <div className="template-card-preview">
                <img src={previewImage} alt={`${name} template preview`} loading="lazy" />
                <div className="template-card-overlay" />
            </div>

            <div className="template-card-body">
                {tag && <span className="template-card-tag">{tag}</span>}
                <h3 className="template-card-name">{name}</h3>
                <p className="template-card-desc">{description}</p>

                <div className="template-card-actions">
                    <button className="btn btn-outline" onClick={onPreview}>
                        <span className="btn-content">👁 Preview Demo</span>
                    </button>
                    <button className="btn btn-primary" onClick={onUse}>
                        <span className="btn-content">Use Template</span>
                        <div className="btn-flare" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TemplateCard;
