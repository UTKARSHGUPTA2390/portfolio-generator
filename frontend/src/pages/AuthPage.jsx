import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/common/Card';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import Button from '../components/common/Button';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="auth-wrapper">
      <main className="auth-main">
        <div className="auth-content-left">
          <h1 className="auth-title">
            Design Your <br />
            <span>Digital Identity</span>
          </h1>
          <p className="auth-subtitle">
            Join the next generation of creators. Build, showcase, and inspire with a portfolio that defines you.
          </p>
          <div className="auth-stats">
            <div className="auth-stat-item">
              <strong>10K+</strong>
              <span>Portfolios</span>
            </div>
            <div className="auth-stat-item">
              <strong>50+</strong>
              <span>Templates</span>
            </div>
          </div>
        </div>

        <div className="auth-content-right">
          <Card className="auth-card">
            <div className="auth-tabs">
              <button 
                className={`auth-tab ${isLogin ? 'auth-tab-active' : ''}`}
                onClick={() => setIsLogin(true)}
              >
                Sign In
              </button>
              <button 
                className={`auth-tab ${!isLogin ? 'auth-tab-active' : ''}`}
                onClick={() => setIsLogin(false)}
              >
                Join Now
              </button>
            </div>

            <div className="auth-form-container">
               <h2 className="auth-form-title">
                {isLogin ? 'Welcome Back' : 'Get Started'}
               </h2>
               <p className="auth-form-subtitle">
                {isLogin ? 'Enter your details to access your account' : 'Start your journey with us today'}
               </p>
               
               <div className="animated-form">
                {isLogin ? <LoginForm /> : <SignupForm onSwitchToLogin={() => setIsLogin(true)} />}
               </div>
            </div>

            <div className="social-auth">
              <div className="auth-divider">
                <span>or continue with</span>
              </div>
              <div className="social-buttons">
                <Button variant="ghost" fullWidth>Google</Button>
                <Button variant="ghost" fullWidth>Github</Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;
