/**
 * Authentication Types
 */

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: "google" | "email";
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
  expiresIn: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface GoogleLoginResponse {
  code?: string;
  credential?: string;
}
