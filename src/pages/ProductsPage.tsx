import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { getProducts, getCategories, searchProducts } from '../services/productService';
import ProductCard from '../components/ui/ProductCard';
import './ProductsPage.css';

interface ProductsPageProps {
  onNavigate: (page: string) => void;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ onNavigate }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  
  const { user } = useAuth();
  const { addItem } = useCart();
  
  const categories = ['All', ...getCategories()];

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, selectedCategory, searchQuery, sortBy]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLoading(true);
      try {
        const results = await searchProducts(searchQuery);
        setProducts(results);
        setSelectedCategory('All');
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setLoading(false);
      }
    } else {
      loadProducts();
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    loadProducts();
  };

  const handleAddToCart = (product: Product) => {
    addItem(product);
    // Show a brief success message (you could implement a toast notification here)
    alert(`${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="products-page">
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Our Products</h1>
        {user?.userType === 'distributor' && (
          <div className="distributor-notice">
            🎯 Distributor pricing is automatically applied
          </div>
        )}
        {user?.userType === 'guest' && (
          <div className="guest-notice">
            🛍️ Shopping as guest - <button onClick={() => onNavigate('login')} className="link-btn">Login</button> for personalized experience
          </div>
        )}
      </div>

      {/* Search and Filters */}
      <div className="filters-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">Search</button>
          {searchQuery && (
            <button type="button" onClick={clearSearch} className="clear-btn">
              Clear
            </button>
          )}
        </form>

        <div className="filter-controls">
          <div className="filter-group">
            <label>Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              showDistributorPrice={user?.userType === 'distributor'}
            />
          ))
        ) : (
          <div className="no-products">
            <h3>No products found</h3>
            <p>Try adjusting your filters or search terms</p>
            {searchQuery && (
              <button onClick={clearSearch} className="clear-search-btn">
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;