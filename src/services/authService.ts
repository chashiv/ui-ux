/**
 * Authentication Service
 * Handles API calls for authentication
 * Ready to integrate with your backend
 */

import { API_BASE_URL, API_ENDPOINTS } from '@constants/config'
import type { LoginCredentials, AuthResponse } from '@types/auth'

/**
 * Login with email and password
 * Assumes backend returns { user, token, expiresIn }
 */
export const loginWithEmail = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Login failed')
  }

  return response.json()
}

/**
 * Login with Google OAuth
 * Backend receives authorization code and returns tokens
 */
export const loginWithGoogle = async (authorizationCode: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.GOOGLE_LOGIN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code: authorizationCode }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Google login failed')
  }

  return response.json()
}

/**
 * Logout user
 */
export const logout = async (token: string): Promise<void> => {
  await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGOUT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}

/**
 * Refresh authentication token
 */
export const refreshToken = async (refreshToken: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.REFRESH}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  })

  if (!response.ok) {
    throw new Error('Token refresh failed')
  }

  return response.json()
}

/**
 * Get user profile
 */
export const getUserProfile = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.USER.PROFILE}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch profile')
  }

  return response.json()
}
