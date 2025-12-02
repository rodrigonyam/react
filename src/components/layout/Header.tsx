import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Header.css';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const { user, logout, switchToGuest } = useAuth();
  const { getItemCount } = useCart();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    onNavigate('home');
    setShowUserMenu(false);
  };

  const handleSwitchToGuest = () => {
    switchToGuest();
    onNavigate('home');
    setShowUserMenu(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo and Brand */}
        <div className="logo-section">
          <h1 className="logo" onClick={() => onNavigate('home')}>
            RetailHub
          </h1>
          {user?.userType === 'distributor' && (
            <span className="distributor-badge">Distributor Portal</span>
          )}
          {user?.userType === 'guest' && (
            <span className="guest-badge">Guest Mode</span>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="nav-links">
          <button 
            className={currentPage === 'home' ? 'active' : ''}
            onClick={() => onNavigate('home')}
          >
            Home
          </button>
          <button 
            className={currentPage === 'products' ? 'active' : ''}
            onClick={() => onNavigate('products')}
          >
            Products
          </button>
          {user?.userType === 'distributor' && (
            <button 
              className={currentPage === 'distributor' ? 'active' : ''}
              onClick={() => onNavigate('distributor')}
            >
              Distributor Hub
            </button>
          )}
        </nav>

        {/* User Actions */}
        <div className="user-actions">
          {/* Cart */}
          <button 
            className="cart-btn"
            onClick={() => onNavigate('cart')}
          >
            🛒 Cart ({getItemCount()})
          </button>

          {/* User Menu */}
          {user?.isAuthenticated ? (
            <div className="user-menu">
              <button 
                className="user-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                👤 {user.firstName}
              </button>
              {showUserMenu && (
                <div className="dropdown-menu">
                  <button onClick={() => { onNavigate('profile'); setShowUserMenu(false); }}>
                    My Profile
                  </button>
                  <button onClick={() => { onNavigate('account'); setShowUserMenu(false); }}>
                    My Account
                  </button>
                  <button onClick={() => { onNavigate('orders'); setShowUserMenu(false); }}>
                    My Orders
                  </button>
                  <div className="menu-divider"></div>
                  <button onClick={handleSwitchToGuest}>
                    Switch to Guest
                  </button>
                  <button onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              {user?.userType === 'guest' ? (
                <>
                  <button onClick={() => onNavigate('login')}>Login</button>
                  <button onClick={() => onNavigate('register')} className="primary">
                    Register
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => onNavigate('login')}>Login</button>
                  <button onClick={() => onNavigate('register')} className="primary">
                    Register
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;