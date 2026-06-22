/**
 * Login Page
 * Complete login page with Google OAuth integration
 */

import React, { useState } from "react";
import { LoginForm } from "@components/organisms/LoginForm";
import { Text } from "@components/atoms/Text";
import { useTheme } from "@hooks/useTheme";
import {
  API_BASE_URL,
  API_ENDPOINTS,
  GOOGLE_OAUTH_CONFIG,
} from "@constants/config";
import type { LoginCredentials, GoogleLoginResponse } from "@types/auth";

export const LoginPage: React.FC = () => {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handle email/password login
   * In production, call your backend API
   */
  const handleEmailLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const credentials: LoginCredentials = { email, password };

      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        },
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      // Store token and user data (handle in your auth service)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle Google OAuth login
   * Initiates Google login flow
   */
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // If using Google OAuth 2.0 Authorization Code flow
      const params = new URLSearchParams({
        client_id: GOOGLE_OAUTH_CONFIG.CLIENT_ID,
        redirect_uri: GOOGLE_OAUTH_CONFIG.REDIRECT_URI,
        response_type: "code",
        scope: GOOGLE_OAUTH_CONFIG.SCOPE,
      });

      // Redirect to Google login
      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

      // Alternative: If using Google Sign-In library (uncomment below)
      // window.google?.accounts.id.initialize({
      //   client_id: GOOGLE_OAUTH_CONFIG.CLIENT_ID,
      //   callback: handleGoogleLoginCallback,
      // })
      // window.google?.accounts.id.renderButton(
      //   document.getElementById('google-signin-button'),
      //   { theme: 'outline', size: 'large' }
      // )
    } catch (error) {
      console.error("Google login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    backgroundColor: theme.colors.background,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing[4],
  };

  const containerStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: "500px",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing[8],
    boxShadow: theme.shadows.lg,
  };

  const headerStyle: React.CSSProperties = {
    textAlign: "center" as const,
    marginBottom: theme.spacing[8],
  };

  const logoStyle: React.CSSProperties = {
    fontSize: "32px",
    marginBottom: theme.spacing[3],
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <div style={logoStyle}>🎨</div>
          <Text variant="h1">Welcome</Text>
          <Text variant="body" color="secondary">
            to UI Library
          </Text>
        </div>

        <LoginForm
          onSubmit={handleEmailLogin}
          onGoogleLogin={handleGoogleLogin}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
