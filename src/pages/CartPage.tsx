import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './CartPage.css';

interface CartPageProps {
  onNavigate: (page: string) => void;
}

const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    // Simulate checkout process
    alert('Checkout functionality would be implemented here!');
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
          <button 
            onClick={() => onNavigate('products')} 
            className="shop-btn"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        {user?.userType === 'distributor' && (
          <div className="distributor-notice">
            🎯 Distributor pricing applied
          </div>
        )}
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {items.map(item => {
            const price = user?.userType === 'distributor' && item.product.distributorPrice
              ? item.product.distributorPrice
              : item.product.price;
            
            return (
              <div key={item.product.id} className="cart-item">
                <div className="item-image">
                  <img src={item.product.imageUrl} alt={item.product.name} />
                </div>
                
                <div className="item-details">
                  <h3>{item.product.name}</h3>
                  <p className="item-category">{item.product.category}</p>
                  <p className="item-description">{item.product.description}</p>
                </div>
                
                <div className="item-price">
                  <div className="unit-price">${price.toFixed(2)} each</div>
                  {user?.userType === 'distributor' && item.product.distributorPrice && (
                    <div className="savings">
                      Retail: ${item.product.price.toFixed(2)}
                    </div>
                  )}
                </div>
                
                <div className="item-quantity">
                  <label>Qty:</label>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="item-total">
                  ${(price * item.quantity).toFixed(2)}
                </div>
                
                <button 
                  className="remove-btn"
                  onClick={() => removeItem(item.product.id)}
                  aria-label="Remove item"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>

        <div className="cart-summary">
          <div className="summary-card">
            <h3>Order Summary</h3>
            
            <div className="summary-line">
              <span>Items ({items.reduce((sum, item) => sum + item.quantity, 0)}):</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            
            {user?.userType === 'distributor' && (
              <div className="summary-line distributor-savings">
                <span>Distributor Savings:</span>
                <span>
                  ${items.reduce((savings, item) => {
                    if (item.product.distributorPrice) {
                      return savings + ((item.product.price - item.product.distributorPrice) * item.quantity);
                    }
                    return savings;
                  }, 0).toFixed(2)}
                </span>
              </div>
            )}
            
            <div className="summary-line">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            
            <hr />
            
            <div className="summary-line total">
              <span>Total:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>

            <div className="checkout-actions">
              <button 
                onClick={handleCheckout}
                className="checkout-btn"
              >
                Proceed to Checkout
              </button>
              
              <button 
                onClick={() => onNavigate('products')}
                className="continue-shopping-btn"
              >
                Continue Shopping
              </button>
              
              <button 
                onClick={clearCart}
                className="clear-cart-btn"
              >
                Clear Cart
              </button>
            </div>

            {!user?.isAuthenticated && (
              <div className="auth-prompt">
                <p>💡 <strong>Tip:</strong> Create an account for faster checkout and order tracking</p>
                <button 
                  onClick={() => onNavigate('register')}
                  className="auth-prompt-btn"
                >
                  Create Account
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;