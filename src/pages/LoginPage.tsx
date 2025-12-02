import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'customer' | 'distributor'>('customer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await login(email, password, userType);
      if (success) {
        onNavigate('home');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to RetailHub</h2>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Account Type</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  value="customer"
                  checked={userType === 'customer'}
                  onChange={(e) => setUserType(e.target.value as 'customer')}
                />
                Customer
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  value="distributor"
                  checked={userType === 'distributor'}
                  onChange={(e) => setUserType(e.target.value as 'distributor')}
                />
                Distributor
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading} className="auth-btn primary">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-links">
          <p>
            Don't have an account?{' '}
            <button onClick={() => onNavigate('register')} className="link-btn">
              Register here
            </button>
          </p>
          <p>
            <button onClick={() => onNavigate('guest')} className="link-btn">
              Continue as Guest
            </button>
          </p>
        </div>

        <div className="demo-accounts">
          <h4>Demo Accounts:</h4>
          <p><strong>Customer:</strong> customer@demo.com / password123</p>
          <p><strong>Distributor:</strong> distributor@demo.com / password123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;