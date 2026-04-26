// hooks/useLogin.js
// Custom Hook — mirrors useRegister pattern for login
// Manages: loading, error, success states for authentication
// Does NOT persist token — that's AuthContext's responsibility (single source of truth)

import { useState, useCallback } from 'react';
import { loginUser } from '../services/authService';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState(null);
    const [success, setSuccess] = useState(false);

    const login = useCallback(async (credentials) => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(false);

            const data = await loginUser(credentials);

            setSuccess(true);
            return data;

        } catch (err) {
            // Axios wraps server errors — err.response.data has our JSON
            const message = err.response?.data?.message || 'Invalid credentials. Please try again.';
            setError(message);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return { login, loading, error, success };
};

export default useLogin;
