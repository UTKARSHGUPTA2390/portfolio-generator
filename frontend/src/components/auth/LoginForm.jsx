// components/auth/LoginForm.jsx
// Interview concepts demonstrated:
// 1. Custom Hook (useLogin) — separates API logic from UI
// 2. Context API (useAuth) — updates global auth state on login
// 3. Controlled Inputs — React owns the form state
// 4. Optimistic UI — loading/error/success states
// 5. Client-side validation — runs before hitting the API

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../common/Input';
import Button from '../common/Button';
import useLogin from '../../hooks/useLogin';
import { useAuth } from '../../context/AuthContext';

const LoginForm = () => {
    const [formData, setFormData]     = useState({ email: '', password: '' });
    const [fieldErrors, setFieldErrors] = useState({});
    const navigate = useNavigate();

    // Custom hook handles: API call, loading, error, success states
    const { login, loading, error, success } = useLogin();

    // Global auth state — saves token + user after successful login
    const { saveAuth } = useAuth();

    // Controlled input handler — clears field error on change
    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        if (fieldErrors[e.target.name]) {
            setFieldErrors((prev) => ({ ...prev, [e.target.name]: '' }));
        }
    };

    // Client-side validation — runs before the API call
    const validate = () => {
        const errors = {};
        if (!formData.email.trim())    errors.email    = 'Email is required';
        if (!formData.password)        errors.password = 'Password is required';
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Step 1: Frontend validation (no API call if invalid)
        const errors = validate();
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        // Step 2: Call login API via custom hook
        const result = await login({
            email:    formData.email,
            password: formData.password,
        });

        // Step 3: On success, update global auth context
        if (result?.success) {
            saveAuth(result.data);
            navigate('/dashboard');
        }
    };

    // ── Success view ─────────────────────────────────────────────
    if (success) {
        return (
            <div className="register-success">
                <div className="register-success-icon">✅</div>
                <h3>Welcome Back!</h3>
                <p>You have been signed in successfully.</p>
            </div>
        );
    }

    // ── Login form ───────────────────────────────────────────────
    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* API Error — shown above the form */}
            {error && (
                <div className="form-api-error">
                    ⚠️ {error}
                </div>
            )}

            <Input
                label="Email Address"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                error={fieldErrors.email}
                autoComplete="email"
            />
            <Input
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                error={fieldErrors.password}
                autoComplete="current-password"
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <a
                    href="#"
                    style={{
                        color: 'var(--clr-primary)',
                        fontSize: '0.85rem',
                        textDecoration: 'none',
                        fontWeight: '600',
                    }}
                >
                    Forgot Password?
                </a>
            </div>

            {/* Button disabled + loading text during API call */}
            <Button type="submit" fullWidth disabled={loading}>
                {loading ? 'Signing In...' : 'SIGN IN'}
            </Button>
        </form>
    );
};

export default LoginForm;
