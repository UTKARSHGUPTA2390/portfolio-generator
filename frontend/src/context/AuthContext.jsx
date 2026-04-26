// context/AuthContext.jsx
// React Context for global authentication state
// Interview concepts: Context API, Provider pattern, cookie-based session hydration
//
// How it works with httpOnly cookies:
// - The JWT lives in an httpOnly cookie (JS can never read it)
// - On app mount, we call GET /api/auth/me to check if the cookie is valid
// - If valid, the server returns the user data → we set it in React state
// - If invalid/expired, we get a 401 → user stays unauthenticated
// - No localStorage, no token in JS memory — all XSS-safe

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { getMe, logoutUser } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser]       = useState(null);
    const [loading, setLoading] = useState(true); // true while checking /me on mount

    /**
     * Hydrate auth state on app mount
     * Calls GET /api/auth/me — the browser automatically sends the httpOnly cookie
     * If cookie is valid → server returns user data
     * If cookie is missing/expired → 401 → user stays null
     */
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const data = await getMe();
                if (data?.success) {
                    setUser(data.data);
                }
            } catch {
                // 401 = not authenticated — this is expected, not an error
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    /**
     * Called after successful login — sets user in React state
     * (Token is already in the httpOnly cookie, set by the server)
     */
    const saveAuth = useCallback((userData) => {
        setUser({
            id:    userData.id,
            name:  userData.name,
            email: userData.email,
        });
    }, []);

    /**
     * Logout — calls server to clear the httpOnly cookie, then clears React state
     */
    const clearAuth = useCallback(async () => {
        try {
            await logoutUser();
        } catch {
            // Even if the API fails, clear local state
        }
        setUser(null);
    }, []);

    // Memoize to prevent unnecessary re-renders in consumers
    const value = useMemo(() => ({
        user,
        loading,
        isAuthenticated: !!user,
        saveAuth,
        clearAuth,
    }), [user, loading, saveAuth, clearAuth]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Custom hook to consume AuthContext
 * Throws a helpful error if used outside of AuthProvider
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an <AuthProvider>');
    }
    return context;
};

export default AuthContext;
