import React from 'react';
import './GuestModePrompt.css';

interface GuestModePromptProps {
  onLogin: () => void;
  onRegister: () => void;
  onGuestMode: () => void;
}

const GuestModePrompt: React.FC<GuestModePromptProps> = ({
  onLogin,
  onRegister,
  onGuestMode
}) => {
  return (
    <div className="guest-prompt-container">
      <div className="guest-prompt-card">
        <div className="welcome-section">
          <h1>Welcome to RetailHub</h1>
          <p className="tagline">Your One-Stop Shopping Destination</p>
          <div className="features">
            <div className="feature">
              <span className="icon">🛍️</span>
              <span>Wide Range of Products</span>
            </div>
            <div className="feature">
              <span className="icon">👥</span>
              <span>Customer & Distributor Accounts</span>
            </div>
            <div className="feature">
              <span className="icon">💰</span>
              <span>Competitive Wholesale Pricing</span>
            </div>
          </div>
        </div>

        <div className="action-section">
          <h2>How would you like to shop?</h2>
          
          <div className="account-types">
            <div className="account-type">
              <h3>🎯 Registered User</h3>
              <p>Access personalized features, order history, and special pricing for distributors</p>
              <div className="account-buttons">
                <button onClick={onLogin} className="btn primary">
                  Sign In
                </button>
                <button onClick={onRegister} className="btn secondary">
                  Create Account
                </button>
              </div>
            </div>

            <div className="divider">
              <span>OR</span>
            </div>

            <div className="account-type">
              <h3>🛒 Guest Shopping</h3>
              <p>Browse and shop without an account. You can always create one later!</p>
              <button onClick={onGuestMode} className="btn guest">
                Continue as Guest
              </button>
            </div>
          </div>

          <div className="benefits">
            <h4>Why create an account?</h4>
            <ul>
              <li>Save your favorite items</li>
              <li>Track your order history</li>
              <li>Access distributor wholesale pricing</li>
              <li>Faster checkout process</li>
              <li>Exclusive member discounts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestModePrompt;