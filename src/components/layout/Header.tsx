import React, { useState, useEffect, useRef } from 'react';
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
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowAccountDropdown(false);
      }
    };

    if (showAccountDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAccountDropdown]);

  const handleLogout = () => {
    logout();
    onNavigate('home');
    setShowAccountDropdown(false);
  };

  const handleSwitchToGuest = () => {
    switchToGuest();
    onNavigate('home');
    setShowAccountDropdown(false);
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

          {/* Account Menu */}
          <div className="account-menu" ref={dropdownRef}>
            <button 
              className="account-menu-btn"
              onClick={() => setShowAccountDropdown(!showAccountDropdown)}
            >
              {user?.isAuthenticated ? (
                <>
                  👤 {user.firstName}
                  <span className="dropdown-arrow">▼</span>
                </>
              ) : (
                <>
                  Account
                  <span className="dropdown-arrow">▼</span>
                </>
              )}
            </button>
            
            {showAccountDropdown && (
              <div className="account-dropdown-menu">
                {user?.isAuthenticated ? (
                  // Authenticated user menu
                  <>
                    <div className="menu-section">
                      <div className="menu-header">
                        Welcome, {user.firstName}!
                        {user.userType === 'distributor' && (
                          <span className="user-type-badge distributor">Distributor</span>
                        )}
                        {user.userType === 'customer' && (
                          <span className="user-type-badge customer">Customer</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="menu-divider"></div>
                    
                    <div className="menu-section">
                      <button onClick={() => { onNavigate('profile'); setShowAccountDropdown(false); }}>
                        📝 My Profile
                      </button>
                      <button onClick={() => { onNavigate('account'); setShowAccountDropdown(false); }}>
                        ⚙️ My Account
                      </button>
                      <button onClick={() => { onNavigate('orders'); setShowAccountDropdown(false); }}>
                        📦 My Orders
                      </button>
                    </div>
                    
                    {user.userType === 'distributor' && (
                      <>
                        <div className="menu-divider"></div>
                        <div className="menu-section">
                          <div className="menu-subtitle">Business Tools</div>
                          <button onClick={() => { onNavigate('business-documents'); setShowAccountDropdown(false); }}>
                            📄 Business Documents
                          </button>
                          <button onClick={() => { onNavigate('wholesale-catalog'); setShowAccountDropdown(false); }}>
                            🏪 Wholesale Catalog
                          </button>
                          <button onClick={() => { onNavigate('bulk-orders'); setShowAccountDropdown(false); }}>
                            📊 Bulk Orders
                          </button>
                          <button onClick={() => { onNavigate('distributor-analytics'); setShowAccountDropdown(false); }}>
                            📈 Analytics
                          </button>
                        </div>
                      </>
                    )}
                    
                    <div className="menu-divider"></div>
                    
                    <div className="menu-section">
                      <button onClick={() => { handleSwitchToGuest(); setShowAccountDropdown(false); }} className="guest-option">
                        🛒 Shop as Guest
                      </button>
                      <button onClick={() => { handleLogout(); setShowAccountDropdown(false); }} className="logout-option">
                        🚪 Sign Out
                      </button>
                    </div>
                  </>
                ) : (
                  // Non-authenticated user menu
                  <>
                    <div className="menu-section">
                      <button onClick={() => { onNavigate('login'); setShowAccountDropdown(false); }} className="sign-in-option">
                        🔐 Sign In
                      </button>
                    </div>
                    
                    <div className="menu-divider"></div>
                    
                    <div className="menu-section">
                      <div className="menu-subtitle">Create New Account</div>
                      <button onClick={() => { onNavigate('register-customer'); setShowAccountDropdown(false); }}>
                        👤 Register as Customer
                      </button>
                      <button onClick={() => { onNavigate('register-distributor'); setShowAccountDropdown(false); }}>
                        🏢 Register as Distributor
                      </button>
                    </div>
                    
                    <div className="menu-divider"></div>
                    
                    <div className="menu-section">
                      <button onClick={() => { onNavigate('guest'); setShowAccountDropdown(false); }} className="guest-option">
                        🛒 Continue as Guest
                      </button>
                    </div>
                    
                    <div className="menu-divider"></div>
                    
                    <div className="menu-section">
                      <div className="menu-subtitle">Learn More</div>
                      <button onClick={() => { onNavigate('distributor-info'); setShowAccountDropdown(false); }}>
                        ℹ️ Distributor Benefits
                      </button>
                      <button onClick={() => { onNavigate('business-registration'); setShowAccountDropdown(false); }}>
                        📋 Business Registration
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;