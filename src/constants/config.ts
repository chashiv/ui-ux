/**
 * API Configuration
 */

export const API_BASE_URL = 'http://localhost:3000/api'

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    GOOGLE_LOGIN: '/auth/google',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE: '/user/update',
  },
}

/**
 * OAuth Configuration
 */

export const GOOGLE_OAUTH_CONFIG = {
  CLIENT_ID: '',
  REDIRECT_URI: 'http://localhost:5173',
  SCOPE: 'openid profile email',
}

/**
 * App Configuration
 */

export const APP_CONFIG = {
  APP_NAME: 'UI Library',
  VERSION: '1.0.0',
  TOKEN_STORAGE_KEY: 'authToken',
  USER_STORAGE_KEY: 'authUser',
  THEME_STORAGE_KEY: 'theme',
}
