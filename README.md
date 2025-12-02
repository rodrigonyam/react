# RetailHub - React Retail Website

A modern, full-featured retail website built with React 19.2.0 and TypeScript. Features guest shopping, customer accounts, and special distributor access with wholesale pricing.

## 🚀 Features

### Authentication & User Management
- **Multi-User System**: Supports guests, customers, and distributors
- **Secure Authentication**: Login/register with form validation
- **Profile Management**: Users can view and edit their personal information
- **Account Dashboard**: Access to settings, order history, and account details
- **Guest Mode**: Shop without creating an account

### Shopping Experience
- **Product Catalog**: Browse extensive product inventory with search and filtering
- **Smart Search**: Find products by name, category, or description
- **Shopping Cart**: Add, remove, and modify items with real-time updates
- **Distributor Pricing**: Special wholesale rates for verified distributors
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Technical Features
- **React 19.2.0**: Latest React with modern hooks and functional components
- **TypeScript**: Full type safety for robust development
- **Context API**: Efficient state management for authentication and cart
- **Local Storage**: Persistent user sessions and cart data
- **CSS Modules**: Component-scoped styling with responsive design
- **Mock Services**: Realistic API simulation with sample data

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Quick Start
```bash
# Clone or navigate to the project directory
cd react-retail-website

# Install dependencies
npm install

# Start development server
npm start

# Open your browser to http://localhost:3000
```

### Available Scripts
```bash
npm start          # Start development server
npm test           # Run test suite
npm run build      # Build for production
npm run eject      # Eject from Create React App (irreversible)
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── layout/
│   │   └── Header.tsx          # Navigation bar with user menu
│   └── ui/
│       ├── GuestModePrompt.tsx # Welcome screen for new visitors
│       └── ProductCard.tsx     # Individual product display
├── context/
│   ├── AuthContext.tsx         # User authentication state
│   └── CartContext.tsx         # Shopping cart management
├── pages/
│   ├── AccountPage.tsx         # Account dashboard
│   ├── CartPage.tsx            # Shopping cart view
│   ├── LoginPage.tsx           # User login form
│   ├── ProductsPage.tsx        # Main product catalog
│   ├── ProfilePage.tsx         # User profile management
│   └── RegisterPage.tsx        # User registration form
├── services/
│   └── productService.ts       # Product data and API calls
├── types/
│   └── index.ts               # TypeScript type definitions
└── styles/                    # Component-specific CSS files
```

## 👥 User Types & Features

### 🛒 Guest Users
- Browse full product catalog
- Add items to cart
- View product details
- No account required
- Option to create account at checkout

### 👤 Registered Customers
- All guest features plus:
- Save favorite items
- Order history tracking
- Profile management
- Faster checkout process
- Exclusive member discounts

### 🏢 Distributors
- All customer features plus:
- Wholesale pricing access
- Bulk order discounts
- Special distributor dashboard
- Priority customer support
- Volume-based pricing tiers

## 🎨 Design & User Experience

### Responsive Design
- Mobile-first approach
- Breakpoints: 768px (tablet), 1024px (desktop)
- Touch-friendly interface
- Optimized loading performance

### Accessibility
- ARIA labels and semantic HTML
- Keyboard navigation support
- Screen reader compatibility
- High contrast color scheme
- Focus management

### UI/UX Features
- Smooth animations and transitions
- Loading states for better feedback
- Error handling with user-friendly messages
- Intuitive navigation and breadcrumbs
- Search suggestions and filtering

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:
```
REACT_APP_API_URL=your_api_endpoint
REACT_APP_STRIPE_KEY=your_stripe_public_key
```

### Build Configuration
The project uses Create React App configuration. To customize:
- Modify `public/index.html` for meta tags and title
- Update `package.json` for dependencies and scripts
- Use `src/index.css` for global styles

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

### Test Structure
- Component tests using React Testing Library
- Unit tests for utility functions
- Integration tests for user workflows
- Mock services for API testing

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deployment Options
- **Netlify**: Connect GitHub repo for automatic deployments
- **Vercel**: Zero-config deployment with Git integration
- **GitHub Pages**: Free hosting for static sites
- **AWS S3 + CloudFront**: Scalable cloud deployment

### Performance Optimization
- Code splitting with React.lazy()
- Image optimization and lazy loading
- Service worker for caching
- Bundle analysis with webpack-bundle-analyzer

## 🔒 Security

### Authentication Security
- JWT token validation
- Secure password hashing
- Session timeout management
- CSRF protection

### Data Protection
- Input sanitization
- XSS prevention
- Secure API communication
- User data encryption

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use functional components with hooks
- Write tests for new features
- Follow existing code style
- Update documentation for changes

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Common Issues
- **Port 3000 in use**: Change port with `PORT=3001 npm start`
- **Node modules issues**: Delete `node_modules` and run `npm install`
- **Build failures**: Clear cache with `npm start -- --reset-cache`

### Getting Help
- Check the [Issues](../../issues) page for common problems
- Create a new issue for bugs or feature requests
- Review the React documentation for framework questions

## 🚧 Roadmap

### Upcoming Features
- [ ] Payment processing integration
- [ ] Order management system
- [ ] Inventory tracking
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Progressive Web App features

---

Built with ❤️ using React, TypeScript, and modern web technologies.