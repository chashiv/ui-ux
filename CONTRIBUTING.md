# Contributing Guide

Guidelines for developing and extending the UI library.

## Development Workflow

### 1. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see changes in real-time.

### 2. Code Organization

```
src/
├── components/     # All UI components
├── design-system/  # Design tokens & themes
├── hooks/         # Custom React hooks
├── pages/         # Complete pages
├── services/      # API & state management
├── utils/         # Helper functions
├── types/         # TypeScript definitions
├── constants/     # Configuration
├── App.tsx        # Root component
└── main.tsx       # Entry point
```

## Component Development

### Creating a Button Variant

```tsx
// src/components/atoms/Button/Button.tsx
// Modify the buttonStyle based on variant
```

### Creating a Form Component

1. **Atom**: Create `src/components/atoms/Textarea/Textarea.tsx`
2. **Molecule**: Create `src/components/molecules/FormField/`
3. **Use in Organism**: Update `LoginForm.tsx` if needed

### Component Checklist

- [ ] Component has JSDoc comment
- [ ] Props interface is defined
- [ ] Component uses `useTheme()` hook
- [ ] Styling uses theme values
- [ ] Component is exported from index.ts
- [ ] Added to parent index.ts
- [ ] TypeScript compiles without errors

## Design System Modifications

### Adding a New Color

1. Add to `src/design-system/tokens/colors.ts`:

   ```tsx
   export const colors = {
     brand: {
       light: '#F0E5FF',
       base: '#9945FF',
       dark: '#6B1FFF',
     },
   }
   ```

2. Update both theme files:
   ```tsx
   export const lightTheme = {
     colors: {
       brand: colors.brand.base,
     },
   }
   ```

### Adding a New Spacing Value

1. Update `src/design-system/tokens/colors.ts`:

   ```tsx
   export const spacing = {
     32: '8rem', // 128px
   }
   ```

2. Use in components:
   ```tsx
   padding: theme.spacing[32]
   ```

### Adding a New Typography Style

1. Update `src/design-system/tokens/colors.ts`:

   ```tsx
   export const typography = {
     fontSize: {
       '5xl': '3rem', // 48px
     },
   }
   ```

2. Use in Text component or directly

## State Management

### Using Zustand Store

```tsx
import { useAuthStore } from '@services/authStore'

export function MyComponent() {
  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)

  return <div>{user?.name}</div>
}
```

### Creating a New Store

```tsx
// src/services/myStore.ts
import { create } from 'zustand'

export const useMyStore = create((set) => ({
  value: 0,
  increment: () => set((state) => ({ value: state.value + 1 })),
}))
```

## API Integration

### Adding a New Endpoint

1. Update `src/constants/config.ts`:

   ```tsx
   export const API_ENDPOINTS = {
     // ... existing
     MY_FEATURE: {
       GET: '/my-feature/get',
       CREATE: '/my-feature/create',
     },
   }
   ```

2. Create service in `src/services/`:

   ```tsx
   export const getMyFeature = async () => {
     const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.MY_FEATURE.GET}`)
     return response.json()
   }
   ```

3. Use in components:

   ```tsx
   import { getMyFeature } from '@services'

   const data = await getMyFeature()
   ```

## Type Safety

### Define Props Interface

```tsx
interface MyComponentProps {
  // Extend HTML attributes
  label: string
  value?: string
  onChange?: (value: string) => void
  error?: string
}
```

### Add Type Exports

```tsx
// src/types/myTypes.ts
export interface MyData {
  id: string
  name: string
}

export type MyStatus = 'pending' | 'success' | 'error'
```

## Testing

### Running Type Check

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

## Building

### Production Build

```bash
npm run build
```

Output goes to `dist/` directory.

### Preview Build

```bash
npm run preview
```

## Code Style

### Naming Conventions

- **Components**: PascalCase (`LoginForm.tsx`)
- **Files**: Same as component name
- **Folders**: kebab-case (`login-form/`)
- **Functions**: camelCase (`loginUser()`)
- **Constants**: UPPER_CASE (`API_URL`)
- **Types/Interfaces**: PascalCase (`UserData`)

### File Structure per Component

```
MyComponent/
├── MyComponent.tsx      # Main component
├── MyComponent.module.css # Styles (if needed)
└── index.ts             # Export
```

### Import Order

```tsx
// 1. React
import React from 'react'

// 2. External libraries
import { someLib } from 'external-lib'

// 3. Aliases (@ imports)
import { Button } from '@components/atoms'
import { useTheme } from '@hooks'

// 4. Local relative
import styles from './Component.module.css'
```

## Documentation

### JSDoc Comments

```tsx
/**
 * LoginForm Component
 * Complete login form with email/password and Google OAuth
 *
 * @param {LoginFormProps} props - Component props
 * @returns {React.ReactElement} Rendered form
 *
 * @example
 * <LoginForm onSubmit={handleLogin} onGoogleLogin={handleGoogle} />
 */
export const LoginForm: React.FC<LoginFormProps> = ({ ... }) => {
  // Implementation
}
```

### README Updates

Update README.md when:

- Adding new major features
- Changing API or setup
- Adding new dependencies
- Changing build process

## Performance Optimization

### Memoization

```tsx
import { memo } from 'react'

export const Button = memo(function Button(props: ButtonProps) {
  // Component
})
```

### Code Splitting

Future: Add lazy loading for pages

```tsx
const LoginPage = lazy(() => import('@pages/LoginPage'))
```

## Common Tasks

### Add a New Page

1. Create `src/pages/MyPage.tsx`
2. Add to `src/pages/index.ts`
3. Update routing/App.tsx
4. Add to navigation if needed

### Add a New Component

1. Determine level: Atom/Molecule/Organism
2. Create file structure
3. Implement with theme support
4. Add JSDoc
5. Export from component index
6. Use in parent component

### Add a New Hook

1. Create `src/hooks/useMyHook.ts`
2. Add to `src/hooks/index.ts`
3. Document usage in JSDoc
4. Add type definitions

### Add a New Utility

1. Create `src/utils/myUtil.ts`
2. Add to `src/utils/index.ts`
3. Add JSDoc with examples
4. Add tests if complex

## Debugging

### Enable React DevTools

Install Chrome extension for React DevTools to inspect:

- Component tree
- Props and state
- Performance profiling

### Debug Theme Issues

```tsx
const { theme } = useTheme()
console.log(theme) // See current theme values
```

### Debug Store Issues

```tsx
import { useAuthStore } from '@services/authStore'

// In component
console.log(useAuthStore.getState())
```

## Troubleshooting

### Import errors

- Check path aliases in `tsconfig.json`
- Verify file exists at import path
- Check capitalization

### Type errors

- Run `npm run type-check`
- Check interface definitions
- Ensure proper exports

### Style issues

- Use `useTheme()` for dynamic values
- Check theme token exists
- Verify CSS is applied

### Build errors

- Clear `node_modules` and reinstall
- Check for missing dependencies
- Verify all files have proper exports

## Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md` (when created)
3. Build: `npm run build`
4. Test: Verify dist/ output
5. Commit changes
6. Push to repository

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Atomic Design](https://atomicdesign.bradfrost.com)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Vite Guide](https://vitejs.dev)

## Getting Help

- Check existing components for patterns
- Review ARCHITECTURE.md for design patterns
- Read component JSDoc comments
- Check console for error messages
