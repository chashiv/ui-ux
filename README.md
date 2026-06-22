# UI Library

A scalable, future-ready UI library with a modern design system, reusable components, and authentication pages.

## 🎯 Project Structure

```
src/
├── components/          # Component library (atoms → molecules → organisms)
│   ├── atoms/          # Basic building blocks (Button, Input, Text)
│   ├── molecules/      # Composite components (FormField)
│   └── organisms/      # Complex components (LoginForm)
├── design-system/      # Design tokens and theming
│   ├── tokens/         # Colors, spacing, typography, etc.
│   └── themes/         # Light/Dark themes and ThemeProvider
├── hooks/              # Custom React hooks (useTheme, useLocalStorage)
├── pages/              # Page components (LoginPage)
├── utils/              # Utility functions (validation, storage)
├── types/              # TypeScript type definitions
├── constants/          # App configuration and constants
├── App.tsx             # Root component
└── main.tsx            # Entry point
```

## ✨ Key Features

### Atomic Design System

- **Atoms**: Smallest building blocks (Button, Input, Text, etc.)
- **Molecules**: Combinations of atoms (FormField)
- **Organisms**: Complex, page-level components (LoginForm)
- Easy to understand and maintain

### Design System

- **Centralized Tokens**: Colors, spacing, typography, shadows defined once
- **Theme System**: Light/Dark themes with seamless switching
- **TypeScript Support**: Full type safety throughout
- **Scalable**: Easy to add new tokens or themes

### Reusable Components

- Button (multiple variants and sizes)
- Input (with validation and error states)
- Text (semantic typography)
- FormField (combines multiple atoms)
- LoginForm (complete login experience)

### Authentication Ready

- Email/password login
- Google OAuth integration
- Backend API integration
- Error handling and validation

### Developer Experience

- Path aliases for clean imports
- Custom hooks for common patterns
- Utility functions for validation and storage
- Clear separation of concerns

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` to see your app.

### Building

```bash
npm run build
```

### Type Checking

```bash
npm run type-check
```

## 📝 Environment Variables

Create a `.env.local` file:

```env
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_GOOGLE_REDIRECT_URI=http://localhost:5173
```

## 🎨 Usage Examples

### Using Components

```tsx
import { Button, Input, Text } from '@components'
import { useTheme } from '@hooks'

export function MyComponent() {
  const { theme } = useTheme()

  return (
    <div>
      <Text variant="h2">Hello</Text>
      <Input label="Email" type="email" />
      <Button>Submit</Button>
    </div>
  )
}
```

### Using Theme

```tsx
import { ThemeProvider } from '@design-system'

export function App() {
  return <ThemeProvider defaultMode="light">{/* Your app */}</ThemeProvider>
}
```

### Adding Custom Components

1. Create component in appropriate folder (atoms/molecules/organisms)
2. Export from component index
3. Use theme via `useTheme` hook
4. Follow existing patterns

## 🔧 Extending the Library

### Adding a New Token

1. Edit `src/design-system/tokens/colors.ts`
2. Add to both light and dark themes
3. Use via `useTheme()` hook

### Adding a New Component

1. Create folder in `atoms/`, `molecules/`, or `organisms/`
2. Create component file with TypeScript and JSDoc
3. Create index.ts for clean exports
4. Add to component index

### Adding a New Hook

1. Create in `src/hooks/`
2. Export from `src/hooks/index.ts`
3. Use in components

## 📦 Dependencies

- React 18
- TypeScript
- Vite
- Zustand (for state management, ready to use)

## 🛣️ Future Enhancements

- [ ] Storybook setup for component documentation
- [ ] Component testing with Vitest
- [ ] Animation library integration
- [ ] Accessibility audit and improvements
- [ ] Form handling library (React Hook Form)
- [ ] State management (Zustand setup)
- [ ] API client library
- [ ] More pre-built pages (Dashboard, Profile, etc.)
- [ ] Component variants and composition examples

## 📄 License

MIT
