import { Product } from '../types';

// Mock product data - in a real app, this would come from an API
export const mockProducts: Product[] = [
  // Electronics
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-canceling wireless headphones with 30-hour battery life',
    price: 199.99,
    distributorPrice: 149.99,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    stock: 45,
    rating: 4.5,
    reviews: 128
  },
  {
    id: '2',
    name: 'Smart Watch Series X',
    description: 'Advanced smartwatch with health monitoring, GPS, and 7-day battery',
    price: 399.99,
    distributorPrice: 299.99,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    stock: 23,
    rating: 4.7,
    reviews: 89
  },
  {
    id: '3',
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices',
    price: 49.99,
    distributorPrice: 34.99,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400',
    stock: 67,
    rating: 4.2,
    reviews: 156
  },
  
  // Home & Garden
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    description: 'Premium ergonomic chair with lumbar support and adjustable height',
    price: 299.99,
    distributorPrice: 229.99,
    category: 'Home & Garden',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    stock: 15,
    rating: 4.6,
    reviews: 73
  },
  {
    id: '5',
    name: 'LED Desk Lamp',
    description: 'Adjustable LED desk lamp with wireless charging base and touch control',
    price: 89.99,
    distributorPrice: 64.99,
    category: 'Home & Garden',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    stock: 34,
    rating: 4.4,
    reviews: 91
  },
  {
    id: '6',
    name: 'Indoor Plant Set',
    description: 'Collection of 3 low-maintenance indoor plants perfect for home offices',
    price: 79.99,
    distributorPrice: 59.99,
    category: 'Home & Garden',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
    stock: 28,
    rating: 4.3,
    reviews: 45
  },
  
  // Sports & Outdoor
  {
    id: '7',
    name: 'Yoga Mat Premium',
    description: 'Non-slip premium yoga mat with carrying strap and alignment lines',
    price: 59.99,
    distributorPrice: 39.99,
    category: 'Sports & Outdoor',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
    stock: 56,
    rating: 4.5,
    reviews: 203
  },
  {
    id: '8',
    name: 'Water Bottle Insulated',
    description: 'Stainless steel insulated water bottle keeps drinks cold for 24 hours',
    price: 34.99,
    distributorPrice: 24.99,
    category: 'Sports & Outdoor',
    imageUrl: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400',
    stock: 89,
    rating: 4.6,
    reviews: 167
  },
  {
    id: '9',
    name: 'Resistance Bands Set',
    description: 'Professional resistance bands set with door anchor and workout guide',
    price: 29.99,
    distributorPrice: 19.99,
    category: 'Sports & Outdoor',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    stock: 73,
    rating: 4.4,
    reviews: 124
  },
  
  // Fashion
  {
    id: '10',
    name: 'Classic Leather Wallet',
    description: 'Genuine leather wallet with RFID blocking and multiple card slots',
    price: 69.99,
    distributorPrice: 49.99,
    category: 'Fashion',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    stock: 41,
    rating: 4.5,
    reviews: 87
  },
  {
    id: '11',
    name: 'Polarized Sunglasses',
    description: 'UV400 protection polarized sunglasses with lightweight titanium frame',
    price: 149.99,
    distributorPrice: 109.99,
    category: 'Fashion',
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
    stock: 32,
    rating: 4.7,
    reviews: 96
  },
  {
    id: '12',
    name: 'Canvas Backpack',
    description: 'Vintage canvas backpack with laptop compartment and multiple pockets',
    price: 89.99,
    distributorPrice: 64.99,
    category: 'Fashion',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    stock: 19,
    rating: 4.3,
    reviews: 54
  }
];

export const getProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProducts), 500);
  });
};

export const getProductById = (id: string): Promise<Product | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = mockProducts.find(p => p.id === id);
      resolve(product);
    }, 300);
  });
};

export const getProductsByCategory = (category: string): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = mockProducts.filter(p => p.category === category);
      resolve(products);
    }, 400);
  });
};

export const searchProducts = (query: string): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = mockProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      );
      resolve(products);
    }, 400);
  });
};

export const getCategories = (): string[] => {
  const categories = [...new Set(mockProducts.map(p => p.category))];
  return categories.sort();
};