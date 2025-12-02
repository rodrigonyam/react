import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/layout/Header';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import AccountPage from './pages/AccountPage';
import GuestModePrompt from './components/ui/GuestModePrompt';
import './App.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
};

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const { user, switchToGuest } = useAuth();

  useEffect(() => {
    // If no user is set, prompt for guest mode or authentication
    if (!user) {
      setCurrentPage('guest-prompt');
    }
  }, [user]);

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
  };

  const handleGuestMode = () => {
    switchToGuest();
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'guest-prompt':
        return (
          <GuestModePrompt
            onLogin={() => setCurrentPage('login')}
            onRegister={() => setCurrentPage('register')}
            onGuestMode={handleGuestMode}
          />
        );
      case 'login':
        return <LoginPage onNavigate={handleNavigation} />;
      case 'register':
        return <RegisterPage onNavigate={handleNavigation} />;
      case 'products':
        return <ProductsPage onNavigate={handleNavigation} />;
      case 'cart':
        return <CartPage onNavigate={handleNavigation} />;
      case 'profile':
        return <ProfilePage onNavigate={handleNavigation} />;
      case 'account':
        return <AccountPage onNavigate={handleNavigation} />;
      case 'home':
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="App">
      {user && (
        <Header onNavigate={handleNavigation} currentPage={currentPage} />
      )}
      <main className="main-content">
        {renderPage()}
      </main>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>RetailHub</h4>
            <p>Your one-stop shopping destination for customers and distributors</p>
          </div>
          <div className="footer-section">
            <h4>Customer Service</h4>
            <p>📧 support@retailhub.com</p>
            <p>📞 1-800-RETAIL-1</p>
          </div>
          <div className="footer-section">
            <h4>Distributor Info</h4>
            <p>📧 wholesale@retailhub.com</p>
            <p>📞 1-800-WHOLE-SALE</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 RetailHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;