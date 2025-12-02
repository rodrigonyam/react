export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'guest' | 'customer' | 'distributor';
  isAuthenticated: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  distributorPrice?: number;
  category: string;
  imageUrl: string;
  stock: number;
  rating: number;
  reviews: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType?: 'customer' | 'distributor') => Promise<boolean>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<boolean>;
  switchToGuest: () => void;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userType: 'customer' | 'distributor';
}

export interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}