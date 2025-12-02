import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './ProfilePage.css';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    company: user?.userType === 'distributor' ? 'Sample Company Inc.' : '',
  });

  if (!user?.isAuthenticated) {
    return (
      <div className="profile-page">
        <div className="not-authenticated">
          <h2>Please log in to view your profile</h2>
          <button onClick={() => onNavigate('login')} className="login-btn">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log('Saving profile data:', profileData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    // Reset to original values
    setProfileData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: '',
      address: '',
      city: '',
      zipCode: '',
      company: user?.userType === 'distributor' ? 'Sample Company Inc.' : '',
    });
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>My Profile</h1>
        <div className="user-badge">
          {user.userType === 'distributor' && (
            <span className="distributor-badge">🎯 Distributor Account</span>
          )}
          {user.userType === 'customer' && (
            <span className="customer-badge">⭐ Customer Account</span>
          )}
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="card-header">
            <h2>Personal Information</h2>
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="edit-btn">
                Edit Profile
              </button>
            ) : (
              <div className="edit-actions">
                <button onClick={handleSave} className="save-btn">
                  Save
                </button>
                <button onClick={handleCancel} className="cancel-btn">
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleChange}
                  />
                ) : (
                  <div className="form-value">{profileData.firstName}</div>
                )}
              </div>
              <div className="form-group">
                <label>Last Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleChange}
                  />
                ) : (
                  <div className="form-value">{profileData.lastName}</div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                />
              ) : (
                <div className="form-value">{profileData.email}</div>
              )}
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              ) : (
                <div className="form-value">{profileData.phone || 'Not provided'}</div>
              )}
            </div>

            {user.userType === 'distributor' && (
              <div className="form-group">
                <label>Company Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="company"
                    value={profileData.company}
                    onChange={handleChange}
                    placeholder="Enter your company name"
                  />
                ) : (
                  <div className="form-value">{profileData.company || 'Not provided'}</div>
                )}
              </div>
            )}

            <div className="form-group">
              <label>Address</label>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={profileData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                />
              ) : (
                <div className="form-value">{profileData.address || 'Not provided'}</div>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="city"
                    value={profileData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                  />
                ) : (
                  <div className="form-value">{profileData.city || 'Not provided'}</div>
                )}
              </div>
              <div className="form-group">
                <label>ZIP Code</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="zipCode"
                    value={profileData.zipCode}
                    onChange={handleChange}
                    placeholder="Enter ZIP code"
                  />
                ) : (
                  <div className="form-value">{profileData.zipCode || 'Not provided'}</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="account-actions">
          <div className="action-card">
            <h3>Account Settings</h3>
            <div className="action-buttons">
              <button onClick={() => onNavigate('account')} className="settings-btn">
                Account Settings
              </button>
              <button onClick={() => onNavigate('orders')} className="orders-btn">
                Order History
              </button>
            </div>
          </div>

          <div className="action-card danger">
            <h3>Account Management</h3>
            <div className="action-buttons">
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;