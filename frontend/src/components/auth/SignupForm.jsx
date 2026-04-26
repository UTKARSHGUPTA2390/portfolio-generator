// components/auth/SignupForm.jsx
// Interview concepts demonstrated:
// 1. Custom Hook (useRegister) — separates API logic from UI
// 2. Controlled Inputs — React owns the form state
// 3. Optimistic UI — shows loading/success/error states
// 4. Error Boundary pattern — graceful error display

import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import useRegister from '../../hooks/useRegister';

const SignupForm = ({ onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [fieldErrors, setFieldErrors] = useState({});

    // Custom hook handles: API call, loading, error, success states
    const { register, loading, error, success } = useRegister();

    // Controlled input handler — clears field error on change
    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        if (fieldErrors[e.target.name]) {
            setFieldErrors((prev) => ({ ...prev, [e.target.name]: '' }));
        }
    };

    // Frontend validation runs before hitting the API
    const validate = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = 'Full name is required';
        if (!formData.email) errors.email = 'Email is required';
        if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
        if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Step 1: Run frontend validation first (no API call if invalid)
        const errors = validate();
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        // Step 2: Call the API via custom hook (no try/catch needed here)
        const result = await register({
            name: formData.name,
            email: formData.email,
            password: formData.password
        });

        // Step 3: On success, reset the form
        if (result?.success) {
            setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        }
    };

    // Show success message after registration
    if (success) {
        return (
            <div className="register-success">
                <div className="register-success-icon">🎉</div>
                <h3>Account Created!</h3>
                <p>Welcome aboard! Your account has been created successfully.</p>
                <button
                    className="register-success-btn"
                    onClick={onSwitchToLogin}
                >
                    Go to Sign In →
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* API Error — shown above the form */}
            {error && (
                <div className="form-api-error">
                    ⚠️ {error}
                </div>
            )}

            <Input
                label="Full Name"
                name="name"
                placeholder="Avery Doe"
                value={formData.name}
                onChange={handleChange}
                error={fieldErrors.name}
            />
            <Input
                label="Email Address"
                name="email"
                placeholder="avery@genz.io"
                value={formData.email}
                onChange={handleChange}
                error={fieldErrors.email}
            />
            <Input
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                error={fieldErrors.password}
            />
            <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={fieldErrors.confirmPassword}
            />

            <div style={{ marginTop: '0.5rem' }}>
                {/* Button is disabled and shows loading text during API call */}
                <Button type="submit" fullWidth disabled={loading}>
                    {loading ? 'Creating Account...' : 'CREATE ACCOUNT'}
                </Button>
            </div>
        </form>
    );
};

export default SignupForm;
