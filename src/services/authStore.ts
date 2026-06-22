/**
 * Authentication Store
 * Global state management for authentication using Zustand
 * Ready to use - just import and use in components
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthUser } from '@types/auth'
import { APP_CONFIG } from '@constants/config'

interface AuthStore {
  // State
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean

  // Actions
  setUser: (user: AuthUser | null) => void
  setToken: (token: string | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
  reset: () => void
}

/**
 * Create authentication store with persistence
 * Automatically saves to localStorage under 'auth-store' key
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      // Actions
      setUser: (user) =>
        set({
          user,
          isAuthenticated: user !== null,
        }),

      setToken: (token) =>
        set({
          token,
        }),

      setLoading: (loading) =>
        set({
          isLoading: loading,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),

      reset: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        }),
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)

/**
 * Example Usage in Components:
 *
 * import { useAuthStore } from '@services/authStore'
 *
 * export function MyComponent() {
 *   const user = useAuthStore((state) => state.user)
 *   const setUser = useAuthStore((state) => state.setUser)
 *
 *   return <div>{user?.name}</div>
 * }
 */
