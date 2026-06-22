/**
 * Button Component (Atom)
 * Reusable button with variants, sizes, and states
 */

import React from "react";
import { useTheme } from "@hooks/useTheme";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      disabled = false,
      children,
      className = "",
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();

    const buttonStyle: React.CSSProperties = {
      fontFamily: theme.typography.fontFamily.base,
      border: "none",
      cursor: disabled || isLoading ? "not-allowed" : "pointer",
      opacity: disabled || isLoading ? 0.6 : 1,
      transition: theme.transitions.base,
      borderRadius: theme.borderRadius.md,
      fontSize:
        size === "sm"
          ? theme.typography.fontSize.sm
          : size === "lg"
            ? theme.typography.fontSize.lg
            : theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.semibold,
      width: fullWidth ? "100%" : "auto",
      padding:
        size === "sm"
          ? `${theme.spacing[2]} ${theme.spacing[3]}`
          : size === "lg"
            ? `${theme.spacing[3]} ${theme.spacing[6]}`
            : `${theme.spacing[2]} ${theme.spacing[4]}`,

      ...(variant === "primary" && {
        backgroundColor: theme.colors.primary,
        color: theme.colors.text.inverse,
      }),
      ...(variant === "secondary" && {
        backgroundColor: theme.colors.surface,
        color: theme.colors.text.primary,
        border: `1px solid ${theme.colors.border.base}`,
      }),
      ...(variant === "tertiary" && {
        backgroundColor: theme.colors.primaryLight,
        color: theme.colors.primary,
      }),
      ...(variant === "ghost" && {
        backgroundColor: "transparent",
        color: theme.colors.primary,
      }),
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        style={buttonStyle}
        className={className}
        {...props}
      >
        {isLoading ? "..." : children}
      </button>
    );
  },
);

Button.displayName = "Button";
