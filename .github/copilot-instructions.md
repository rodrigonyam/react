# AI Coding Agent Instructions

## Project Overview
This is a React application workspace. The project follows modern React development practices with a focus on component-based architecture, TypeScript support, and developer experience.

## Project Structure & Architecture

### Recommended Directory Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Input, etc.)
│   └── layout/         # Layout components (Header, Footer, Sidebar)
├── pages/              # Page components (or use app/ for App Router)
├── hooks/              # Custom React hooks
├── utils/              # Utility functions and helpers
├── types/              # TypeScript type definitions
├── services/           # API calls and external service integrations
├── context/            # React Context providers
├── assets/             # Static assets (images, fonts, etc.)
└── styles/             # Global styles and theme files
```

## Development Conventions

### Component Patterns
- **Use functional components** with hooks instead of class components
- **Export components as default** from their files: `export default ComponentName`
- **Co-locate related files**: Place component-specific styles, tests, and types in the same directory
- **Use TypeScript interfaces** for props: `interface Props { ... }`

### File Naming
- **Components**: PascalCase (`UserProfile.tsx`, `NavigationMenu.tsx`)
- **Hooks**: camelCase with "use" prefix (`useLocalStorage.ts`, `useApiData.ts`)
- **Utilities**: camelCase (`formatDate.ts`, `validateEmail.ts`)
- **Types**: PascalCase with descriptive names (`UserData.ts`, `ApiResponse.ts`)

### Import Organization
Order imports as follows:
```typescript
// 1. React imports
import React, { useState, useEffect } from 'react';

// 2. Third-party libraries
import { Router } from 'express';
import axios from 'axios';

// 3. Internal imports (absolute paths preferred)
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { UserData } from '@/types/User';

// 4. Relative imports
import './Component.css';
```

## Development Workflow

### Getting Started Commands
```bash
# Install dependencies
npm install
# or
yarn install

# Start development server
npm run dev
# or
yarn dev

# Run tests
npm test
# or
yarn test

# Build for production
npm run build
# or
yarn build
```

### State Management
- **Local state**: Use `useState` and `useReducer` for component-level state
- **Shared state**: Use React Context for application-wide state
- **Server state**: Consider libraries like React Query or SWR for API data management

### Styling Approach
- **CSS Modules** or **Styled Components** for component-scoped styling
- **Tailwind CSS** for utility-first styling (if configured)
- **Global styles** in `src/styles/` directory

## Testing Strategy

### Test File Patterns
- Place test files adjacent to components: `Component.test.tsx`
- Use descriptive test names: `should render user profile with correct data`
- Test user interactions and component behavior, not implementation details

### Common Testing Libraries
- **Jest** for test runner and assertions
- **React Testing Library** for component testing
- **MSW (Mock Service Worker)** for API mocking

## Key Integration Points

### API Integration
- Centralize API calls in `src/services/` directory
- Use consistent error handling patterns
- Implement loading and error states in components

### Environment Configuration
- Use `.env.local` for local environment variables
- Prefix public variables with `REACT_APP_` (Create React App) or `NEXT_PUBLIC_` (Next.js)
- Never commit sensitive keys to version control

## Performance Considerations

### Code Splitting
- Use `React.lazy()` for route-based code splitting
- Implement `Suspense` boundaries for loading states

### Optimization Patterns
- Use `useMemo` and `useCallback` for expensive calculations and function references
- Implement proper `key` props for list rendering
- Consider `React.memo` for preventing unnecessary re-renders

## Debugging Workflow

### Development Tools
- **React Developer Tools** browser extension for component inspection
- **Redux DevTools** if using Redux for state management
- **Network tab** for API request debugging

### Common Debug Commands
```bash
# Check dependency versions
npm ls

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json && npm install

# Check for security vulnerabilities
npm audit
```

## Code Quality

### Linting & Formatting
- Use **ESLint** with React-specific rules
- Configure **Prettier** for consistent code formatting
- Set up **Husky** pre-commit hooks for automated checks

### TypeScript Best Practices
- Enable strict mode in `tsconfig.json`
- Avoid `any` type; use specific types or `unknown`
- Use type guards for runtime type checking

## Quick Reference

### Essential React Hooks
- `useState`: Local component state
- `useEffect`: Side effects and lifecycle
- `useContext`: Access React Context
- `useReducer`: Complex state logic
- `useMemo`: Expensive calculations
- `useCallback`: Function memoization

### Common Patterns to Follow
1. **Keep components small and focused** on a single responsibility
2. **Extract custom hooks** for reusable stateful logic
3. **Use composition over inheritance** for component reuse
4. **Implement proper error boundaries** for error handling
5. **Follow accessibility best practices** (ARIA labels, semantic HTML)

---

*This file should be updated as the project evolves and new patterns emerge.*