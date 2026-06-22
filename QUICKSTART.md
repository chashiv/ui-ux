# Quick Start Guide

Get the UI library running in 5 minutes.

## Prerequisites

- Node.js 18+
- npm or yarn

## Installation

```bash
# 1. Navigate to project
cd /path/to/ui-ux

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env.local

# 4. Add your configuration to .env.local
# REACT_APP_GOOGLE_CLIENT_ID=your_client_id
# REACT_APP_API_URL=http://localhost:3000/api
```

## Running Locally

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

## Building for Production

```bash
npm run build
npm run preview
```

## Project Structure at a Glance

```
src/
├── components/          # UI Components (atoms → molecules → organisms)
├── design-system/       # Theming and design tokens
├── pages/              # Full pages
├── services/           # API calls and state management
├── hooks/              # Custom React hooks
├── utils/              # Helper functions
└── types/              # TypeScript definitions
```

## First Steps

### 1. Explore Components

Look at existing components in `src/components/`:

- **Atoms**: `Button`, `Input`, `Text` - Simple, reusable
- **Molecules**: `FormField` - Combinations of atoms
- **Organisms**: `LoginForm` - Complex features

### 2. Understand Theme

Open `src/design-system/` to see:

- **tokens/colors.ts**: Design tokens (colors, spacing, typography)
- **themes/lightTheme.ts**: Light theme implementation
- **themes/darkTheme.ts**: Dark theme implementation

### 3. Add a New Component

1. Create folder: `src/components/atoms/MyComponent/`
2. Create file: `MyComponent.tsx`
3. Use `useTheme()` hook for styling
4. Export from `index.ts`

Example:

```tsx
import React from 'react'
import { useTheme } from '@hooks/useTheme'

export const MyComponent: React.FC = () => {
  const { theme } = useTheme()

  return <div style={{ color: theme.colors.text.primary }}>Hello</div>
}
```

### 4. Use Components

In `LoginPage.tsx`:

```tsx
import { Button, Input } from '@components'

export function MyPage() {
  return (
    <>
      <Input label="Email" type="email" />
      <Button>Submit</Button>
    </>
  )
}
```

## Common Commands

```bash
# Development
npm run dev           # Start dev server

# Quality
npm run type-check   # Check TypeScript errors
npm run lint         # Run ESLint
npm run format       # Format code with Prettier

# Production
npm run build        # Build for production
npm run preview      # Preview production build
```

## Next Steps

- Read [ARCHITECTURE.md](./ARCHITECTURE.md) to understand design patterns
- Read [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines
- Review existing components for code style examples
- Check `.env.example` for environment configuration
- Set up Google OAuth in `src/constants/config.ts`

## Documentation Files

- **README.md** - Project overview
- **ARCHITECTURE.md** - Design patterns and structure
- **CONTRIBUTING.md** - Development guidelines
- **QUICKSTART.md** - This file

## Environment Variables

See `.env.example` for available options:

```env
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_GOOGLE_CLIENT_ID=your_client_id_here
REACT_APP_GOOGLE_REDIRECT_URI=http://localhost:5173
```

## Troubleshooting

**Port already in use?**

```bash
# Kill process on port 5173
lsof -i :5173
kill -9 <PID>

# Or use different port
npm run dev -- --port 3000
```

**Dependencies issues?**

```bash
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors?**

```bash
npm run type-check
```

## Support

- Check existing components for patterns
- Review JSDoc comments in components
- Read ARCHITECTURE.md for design patterns
- Check console for helpful error messages

## What's Next?

1. **Set up backend** - Update `API_BASE_URL` in `.env.local`
2. **Configure Google OAuth** - Add your `GOOGLE_CLIENT_ID`
3. **Create more pages** - Add to `src/pages/`
4. **Build features** - Use atoms/molecules to create organisms
5. **Deploy** - Build and deploy to your hosting

Enjoy building! 🚀
