// hooks/usePortfolio.js
// Custom hook to manage portfolio API state and actions
// Interview concepts: Custom hooks, UI state management (loading/error)

import { useState } from 'react';
import { savePortfolio, getPortfolio } from '../services/portfolioService';

export const usePortfolio = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSavePortfolio = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const result = await savePortfolio(formData);
            setLoading(false);
            return result;
        } catch (err) {
            setLoading(false);
            const errorMessage = err.response?.data?.message || 'Failed to save portfolio';
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };

    const fetchPortfolio = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getPortfolio();
            setLoading(false);
            return result;
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || 'Failed to fetch portfolio');
            return null;
        }
    };

    return {
        handleSavePortfolio,
        fetchPortfolio,
        loading,
        error
    };
};
