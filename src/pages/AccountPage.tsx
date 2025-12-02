import React from 'react';
import { useAuth } from '../context/AuthContext';

interface AccountPageProps {
  onNavigate: (page: string) => void;
}

const AccountPage: React.FC<AccountPageProps> = ({ onNavigate }) => {
  const { user, logout } = useAuth();

  if (!user?.isAuthenticated) {
    return (
      <div className="account-page">
        <div className="not-authenticated">
          <h2>Please log in to view your account</h2>
          <button onClick={() => onNavigate('login')} className="login-btn">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // In a real app, this would call an API to delete the account
      alert('Account deletion would be processed here.');
      logout();
      onNavigate('home');
    }
  };

  return (
    <div className="account-page" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '2rem' }}>Account Settings</h1>

      <div style={{ display: 'grid', gap: '2rem' }}>
        {/* Account Overview */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Account Overview</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <strong>Account Type:</strong> {user.userType === 'distributor' ? 'Distributor' : user.userType === 'customer' ? 'Customer' : 'Guest'}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Name:</strong> {user.firstName} {user.lastName}
            </div>
            <div>
              <strong>Account ID:</strong> {user.id}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Quick Actions</h2>
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <button 
              onClick={() => onNavigate('profile')}
              style={{
                padding: '1rem',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Edit Profile
            </button>
            <button 
              onClick={() => onNavigate('orders')}
              style={{
                padding: '1rem',
                backgroundColor: '#27ae60',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Order History
            </button>
            <button 
              onClick={() => onNavigate('cart')}
              style={{
                padding: '1rem',
                backgroundColor: '#f39c12',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              View Cart
            </button>
          </div>
        </div>

        {/* Account Security */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Security</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <button 
              onClick={() => alert('Password change functionality would be implemented here')}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#9b59b6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                justifySelf: 'start'
              }}
            >
              Change Password
            </button>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              Last login: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Distributor Features */}
        {user.userType === 'distributor' && (
          <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: '2px solid #e74c3c' }}>
            <h2 style={{ marginBottom: '1rem', color: '#e74c3c' }}>Distributor Features</h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: '#fef9e7', borderRadius: '6px' }}>
                <strong>Wholesale Pricing:</strong> Automatically applied to all products
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#fef9e7', borderRadius: '6px' }}>
                <strong>Bulk Ordering:</strong> Special discounts for large quantities
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#fef9e7', borderRadius: '6px' }}>
                <strong>Priority Support:</strong> Dedicated distributor support line
              </div>
            </div>
          </div>
        )}

        {/* Danger Zone */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: '2px solid #e74c3c' }}>
          <h2 style={{ marginBottom: '1rem', color: '#e74c3c' }}>Danger Zone</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <button 
              onClick={logout}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#f39c12',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                justifySelf: 'start'
              }}
            >
              Logout
            </button>
            <button 
              onClick={handleDeleteAccount}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                justifySelf: 'start'
              }}
            >
              Delete Account
            </button>
            <p style={{ color: '#e74c3c', fontSize: '0.9rem', fontWeight: '600' }}>
              ⚠️ Account deletion is permanent and cannot be undone
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;