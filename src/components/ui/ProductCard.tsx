import React from 'react';
import { Product } from '../../types';
import { useAuth } from '../../context/AuthContext';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  showDistributorPrice?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  showDistributorPrice = false 
}) => {
  const { user } = useAuth();
  
  const getPrice = () => {
    if (showDistributorPrice && product.distributorPrice) {
      return product.distributorPrice;
    }
    return product.price;
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star full">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }
    
    return stars;
  };

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div className={`product-card ${isOutOfStock ? 'out-of-stock' : ''}`}>
      <div className="product-image">
        <img src={product.imageUrl} alt={product.name} />
        {showDistributorPrice && (
          <div className="distributor-badge">Wholesale</div>
        )}
        {isOutOfStock && (
          <div className="stock-overlay">Out of Stock</div>
        )}
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-description">{product.description}</p>
        
        <div className="product-rating">
          <div className="stars">
            {renderStars(product.rating)}
          </div>
          <span className="rating-text">
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>

        <div className="product-pricing">
          {showDistributorPrice && product.distributorPrice ? (
            <div className="distributor-pricing">
              <div className="current-price">${getPrice().toFixed(2)}</div>
              <div className="retail-price">Retail: ${product.price.toFixed(2)}</div>
              <div className="savings">
                Save ${(product.price - product.distributorPrice).toFixed(2)}
              </div>
            </div>
          ) : (
            <div className="regular-pricing">
              <div className="current-price">${getPrice().toFixed(2)}</div>
            </div>
          )}
        </div>

        <div className="product-stock">
          {isOutOfStock ? (
            <span className="stock-status out-of-stock">Out of Stock</span>
          ) : isLowStock ? (
            <span className="stock-status low-stock">Only {product.stock} left!</span>
          ) : (
            <span className="stock-status in-stock">In Stock ({product.stock} available)</span>
          )}
        </div>

        <button
          className={`add-to-cart-btn ${isOutOfStock ? 'disabled' : ''}`}
          onClick={() => onAddToCart(product)}
          disabled={isOutOfStock}
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;