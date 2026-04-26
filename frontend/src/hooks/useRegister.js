// hooks/useRegister.js
// Custom Hook — Interview concept: encapsulate async state logic
// Manages: loading, error, success states for registration
// Keeps SignupForm component clean (no API logic inside UI)

import { useState } from 'react';
import { registerUser } from '../services/authService';

const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const register = async (userData) => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(false);

            const data = await registerUser(userData);
            setSuccess(true);
            return data;

        } catch (err) {
            // Axios wraps server errors — err.response.data has our JSON
            const message = err.response?.data?.message || 'Something went wrong. Try again.';
            setError(message);
            return null;
        } finally {
            // Always runs — stops the loading spinner whether success or fail
            setLoading(false);
        }
    };

    return { register, loading, error, success };
};

export default useRegister;
