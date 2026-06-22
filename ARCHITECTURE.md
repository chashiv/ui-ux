# Architecture Guide

This document explains the architecture and how to extend the UI library.

## 🏗️ Architecture Overview

### Atomic Design Methodology

We follow the Atomic Design methodology, breaking UI into composable layers:

```
Atoms (Basic) → Molecules (Combination) → Organisms (Complex) → Pages (Full)
```

#### Atoms (`src/components/atoms/`)

Smallest, most basic components. Cannot be broken down further without losing function.

- **Button**: Interactive elements
- **Input**: Form inputs with validation
- **Text**: Semantic typography

**When to create an atom:**

- It's a single, simple element
- It can't be broken down further
- It's reusable in multiple contexts

#### Molecules (`src/components/molecules/`)

Simple groups of atoms that function together as a unit.

- **FormField**: Combines Label + Input + Error + Helper Text
- Future: Card, Badge, etc.

**When to create a molecule:**

- It combines 2+ atoms with a specific purpose
- It has its own logic or props
- It's used multiple times in different organisms

#### Organisms (`src/components/organisms/`)

Complex, feature-rich components that combine molecules/atoms.

- **LoginForm**: Email input, password input, button, error handling
- Future: Dashboard, Navigation, Header, etc.

**When to create an organism:**

- It's a distinct feature or section
- It combines multiple molecules/atoms
- It has significant logic and state management

#### Pages (`src/pages/`)

Complete pages that combine organisms and other components.

- **LoginPage**: Full page with theme, layout, and LoginForm
- Future: DashboardPage, ProfilePage, etc.

### Design System

**Location:** `src/design-system/`

#### Tokens (`tokens/colors.ts`)

Single source of truth for all design values:

- Colors (primary, semantic, neutral, dark mode)
- Spacing (8px base unit)
- Typography (fonts, sizes, weights, line heights)
- Border radius
- Shadows
- Transitions
- Breakpoints
- Z-index

**Usage:**

```tsx
import { colors, spacing, typography } from '@design-system/tokens/colors'

const style = {
  color: colors.primary[600],
  padding: spacing[4],
}
```

#### Themes (`themes/`)

Light and dark theme implementations using tokens.

- **lightTheme.ts**: Light mode with semantic color assignments
- **darkTheme.ts**: Dark mode with semantic color assignments
- **ThemeProvider.tsx**: React context for theme management

**Usage:**

```tsx
import { ThemeProvider } from '@design-system'

;<ThemeProvider defaultMode="light">{children}</ThemeProvider>
```

### State Management

**Location:** `src/services/authStore.ts`

Uses Zustand with persistence:

```tsx
import { useAuthStore } from '@services/authStore'

const user = useAuthStore((state) => state.user)
const setUser = useAuthStore((state) => state.setUser)
```

### Services

**Location:** `src/services/`

- **authService.ts**: API calls for authentication
- **authStore.ts**: Zustand store for auth state

## 📋 Patterns & Best Practices

### Component Structure

```tsx
/**
 * Component JSDoc explaining purpose and usage
 */

import React from 'react'
import { useTheme } from '@hooks/useTheme'

interface ComponentProps {
  // Props documentation
}

export const Component: React.FC<ComponentProps> = (
  {
    // Props
  },
) => {
  const { theme } = useTheme()

  // Component logic

  return <div style={/* theme-aware styles */}>{/* JSX */}</div>
}

Component.displayName = 'Component'
```

### Using Theme in Components

Always use `useTheme()` hook for dynamic styling:

```tsx
const { theme } = useTheme()

const style: React.CSSProperties = {
  backgroundColor: theme.colors.primary,
  padding: theme.spacing[4],
  fontSize: theme.typography.fontSize.lg,
}
```

### Creating New Atoms

1. Create folder: `src/components/atoms/MyComponent/`
2. Create `MyComponent.tsx`:

   ```tsx
   import React from 'react'
   import { useTheme } from '@hooks/useTheme'

   export const MyComponent: React.FC<Props> = (props) => {
     const { theme } = useTheme()
     return <div>Component</div>
   }
   ```

3. Create `index.ts`:
   ```tsx
   export { MyComponent } from './MyComponent'
   ```
4. Update `src/components/atoms/index.ts`:
   ```tsx
   export { MyComponent } from './MyComponent'
   ```

### Creating New Molecules

Combine atoms with shared logic:

```tsx
export const MyMolecule: React.FC<Props> = (props) => {
  const [state, setState] = useState('')

  return (
    <div>
      <Text>Label</Text>
      <Input value={state} onChange={(e) => setState(e.target.value)} />
    </div>
  )
}
```

### Adding New Design Tokens

1. Add to `src/design-system/tokens/colors.ts`:
   ```tsx
   export const newTokens = {
     // values
   }
   ```
2. Update both `lightTheme` and `darkTheme`
3. Use via `useTheme()` hook

### Adding New Hooks

1. Create `src/hooks/useMyHook.ts`
2. Export from `src/hooks/index.ts`
3. Use in components:
   ```tsx
   import { useMyHook } from '@hooks'
   ```

### Adding New Utilities

1. Create `src/utils/myUtility.ts`
2. Export from `src/utils/index.ts`
3. Use in components:
   ```tsx
   import { myFunction } from '@utils'
   ```

## 🔌 API Integration

### Authentication Flow

1. User submits email/password or Google
2. LoginPage calls `authService` methods
3. Service sends request to backend
4. Response stored in Zustand store
5. User redirected to dashboard

**Implement in LoginPage.tsx:**

```tsx
const handleEmailLogin = async (email: string, password: string) => {
  const response = await loginWithEmail({ email, password })
  useAuthStore.setState({
    user: response.user,
    token: response.token,
    isAuthenticated: true,
  })
  // Redirect to dashboard
}
```

## 🚀 Scaling the Library

### Adding More Pages

Create new pages in `src/pages/`:

```tsx
export const DashboardPage: React.FC = () => {
  // Implementation
}
```

### Adding More Organisms

Combine molecules for complex features:

```tsx
export const NavigationBar: React.FC = () => {
  // Combines multiple molecules
}
```

### Adding More Molecules

Combine atoms for specific use cases:

```tsx
export const SearchBox: React.FC = () => {
  // Combines Input + Button
}
```

### Component Composition Example

```
Button (atom)
└─ Input (atom)
   └─ FormField (molecule)
      └─ LoginForm (organism)
         └─ LoginPage (page)
```

## 📦 Type Safety

All components are fully typed with TypeScript. Always define props interfaces:

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
}
```

## 🎨 Customization

### Adding a New Theme

1. Create `src/design-system/themes/customTheme.ts`:
   ```tsx
   export const customTheme = {
     /* theme values */
   }
   ```
2. Update `ThemeProvider` to support it

### Extending Components

Use composition over modification:

```tsx
export const CustomButton: React.FC<Props> = (props) => {
  return <Button {...props} variant="custom" />
}
```

## 🔄 Future Enhancement Path

1. **Testing**: Add Vitest + React Testing Library
2. **Storybook**: Document components visually
3. **More Components**: Modals, Dropdowns, Tables, etc.
4. **Form Library**: Integrate React Hook Form
5. **Animations**: Add Framer Motion
6. **Accessibility**: WCAG 2.1 compliance audit
7. **Performance**: Code splitting and lazy loading
8. **Documentation**: API reference and guides

## 💡 Tips

- Keep atoms simple and pure
- Molecules handle composition logic
- Organisms combine for full features
- Always use theme via `useTheme()` hook
- Type everything for better DX
- Use path aliases for clean imports
- Follow the established patterns
- Document components with JSDoc
