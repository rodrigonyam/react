import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { getProducts } from '../services/productService';
import ProductCard from '../components/ui/ProductCard';
import './HomePage.css';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const { addItem } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const allProducts = await getProducts();
      // Get top-rated products as featured
      const featured = allProducts
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 6);
      setFeaturedProducts(featured);
    } catch (error) {
      console.error('Failed to load featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addItem(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to RetailHub</h1>
          {user?.userType === 'distributor' ? (
            <div className="hero-text">
              <h2>Distributor Portal</h2>
              <p>Access wholesale pricing and bulk ordering options</p>
              <div className="hero-benefits">
                <div className="benefit">💰 Wholesale Pricing</div>
                <div className="benefit">📦 Bulk Ordering</div>
                <div className="benefit">🚚 Priority Shipping</div>
              </div>
            </div>
          ) : user?.userType === 'customer' ? (
            <div className="hero-text">
              <h2>Welcome back, {user.firstName}!</h2>
              <p>Discover amazing products at great prices</p>
              <div className="hero-benefits">
                <div className="benefit">🛍️ Wide Selection</div>
                <div className="benefit">⚡ Fast Shipping</div>
                <div className="benefit">💳 Secure Payment</div>
              </div>
            </div>
          ) : (
            <div className="hero-text">
              <h2>Guest Shopping Experience</h2>
              <p>Browse our amazing collection of products</p>
              <div className="hero-benefits">
                <div className="benefit">🔍 Easy Browse</div>
                <div className="benefit">🛒 Simple Checkout</div>
                <div className="benefit">📱 Mobile Friendly</div>
              </div>
              <button 
                onClick={() => onNavigate('register')} 
                className="cta-button"
              >
                Create Account for More Benefits
              </button>
            </div>
          )}
          <button 
            onClick={() => onNavigate('products')} 
            className="shop-now-btn"
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Account Type Info */}
      {user?.userType && (
        <section className="account-info-section">
          <div className="account-info">
            {user.userType === 'distributor' && (
              <div className="info-card distributor">
                <h3>🎯 Distributor Benefits</h3>
                <ul>
                  <li>Wholesale pricing on all products</li>
                  <li>Bulk ordering discounts</li>
                  <li>Priority customer support</li>
                  <li>Extended payment terms</li>
                  <li>Dedicated account manager</li>
                </ul>
              </div>
            )}
            {user.userType === 'customer' && (
              <div className="info-card customer">
                <h3>⭐ Customer Benefits</h3>
                <ul>
                  <li>Member-exclusive discounts</li>
                  <li>Loyalty reward points</li>
                  <li>Order tracking</li>
                  <li>Wishlist and favorites</li>
                  <li>Personalized recommendations</li>
                </ul>
              </div>
            )}
            {user.userType === 'guest' && (
              <div className="info-card guest">
                <h3>🚀 Upgrade Your Experience</h3>
                <p>Create an account to unlock:</p>
                <ul>
                  <li>Saved shopping cart</li>
                  <li>Order history</li>
                  <li>Faster checkout</li>
                  <li>Special member pricing</li>
                </ul>
                <button 
                  onClick={() => onNavigate('register')} 
                  className="upgrade-btn"
                >
                  Sign Up Now
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <p>Discover our top-rated and most popular items</p>
        </div>
        
        {loading ? (
          <div className="loading">Loading featured products...</div>
        ) : (
          <div className="featured-grid">
            {featuredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                showDistributorPrice={user?.userType === 'distributor'}
              />
            ))}
          </div>
        )}
        
        <div className="view-all-container">
          <button 
            onClick={() => onNavigate('products')} 
            className="view-all-btn"
          >
            View All Products →
          </button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          <div className="category-card" onClick={() => onNavigate('products')}>
            <div className="category-icon">📱</div>
            <h3>Electronics</h3>
            <p>Gadgets & Technology</p>
          </div>
          <div className="category-card" onClick={() => onNavigate('products')}>
            <div className="category-icon">🏠</div>
            <h3>Home & Garden</h3>
            <p>Furniture & Decor</p>
          </div>
          <div className="category-card" onClick={() => onNavigate('products')}>
            <div className="category-icon">⚽</div>
            <h3>Sports & Outdoor</h3>
            <p>Fitness & Recreation</p>
          </div>
          <div className="category-card" onClick={() => onNavigate('products')}>
            <div className="category-icon">👕</div>
            <h3>Fashion</h3>
            <p>Clothing & Accessories</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;