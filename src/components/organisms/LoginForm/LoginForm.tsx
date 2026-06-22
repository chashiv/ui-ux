/**
 * Login Form Component (Organism)
 * Complete login form with email/password and Google OAuth
 */

import React, { useState } from "react";
import { FormField } from "@components/molecules/FormField";
import { Button } from "@components/atoms/Button";
import { Text } from "@components/atoms/Text";
import { useTheme } from "@hooks/useTheme";
import { validateEmail } from "@utils/validation";

interface LoginFormProps {
  onSubmit?: (email: string, password: string) => Promise<void>;
  onGoogleLogin?: () => void;
  isLoading?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onGoogleLogin,
  isLoading = false,
}) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit?.(email, password);
    } catch (error) {
      setErrors({ submit: "Login failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing[6],
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
  };

  const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing[4],
  };

  const dividerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing[3],
    color: theme.colors.text.tertiary,
  };

  const lineStyle: React.CSSProperties = {
    flex: 1,
    height: "1px",
    backgroundColor: theme.colors.border.light,
  };

  const footerStyle: React.CSSProperties = {
    textAlign: "center" as const,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  };

  return (
    <div style={containerStyle}>
      <div>
        <Text variant="h2" style={{ marginBottom: theme.spacing[2] }}>
          Welcome Back
        </Text>
        <Text variant="body" color="secondary">
          Sign in to your account
        </Text>
      </div>

      <form style={formStyle} onSubmit={handleSubmit}>
        {errors.submit && (
          <div
            style={{
              padding: theme.spacing[3],
              backgroundColor: theme.colors.error,
              color: theme.colors.text.inverse,
              borderRadius: theme.borderRadius.md,
            }}
          >
            <Text variant="body" color="inverse">
              {errors.submit}
            </Text>
          </div>
        )}

        <FormField
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) {
              setErrors({ ...errors, email: "" });
            }
          }}
          error={errors.email}
          required
        />

        <FormField
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) {
              setErrors({ ...errors, password: "" });
            }
          }}
          error={errors.password}
          required
        />

        <Button
          type="submit"
          fullWidth
          isLoading={isSubmitting || isLoading}
          disabled={isSubmitting || isLoading}
        >
          Sign In
        </Button>
      </form>

      <div style={dividerStyle}>
        <div style={lineStyle} />
        <span>or</span>
        <div style={lineStyle} />
      </div>

      <Button
        variant="secondary"
        fullWidth
        onClick={onGoogleLogin}
        disabled={isSubmitting || isLoading}
      >
        🔷 Continue with Google
      </Button>

      <div style={footerStyle}>
        <Text variant="body" color="secondary">
          Don't have an account?{" "}
          <a
            href="#signup"
            style={{
              color: theme.colors.primary,
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Sign up
          </a>
        </Text>
      </div>
    </div>
  );
};
