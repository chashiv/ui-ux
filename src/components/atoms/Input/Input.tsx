/**
 * Input Component (Atom)
 * Text input with label support and validation states
 */

import React from "react";
import { useTheme } from "@hooks/useTheme";

export type InputType =
  | "text"
  | "email"
  | "password"
  | "url"
  | "tel"
  | "number";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = true,
      placeholder = "",
      type = "text",
      disabled = false,
      className = "",
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();

    const containerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing[2],
      width: fullWidth ? "100%" : "auto",
    };

    const labelStyle: React.CSSProperties = {
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.medium,
      color: theme.colors.text.primary,
    };

    const inputStyle: React.CSSProperties = {
      fontFamily: theme.typography.fontFamily.base,
      fontSize: theme.typography.fontSize.base,
      padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
      borderRadius: theme.borderRadius.md,
      border: `1px solid ${error ? theme.colors.error : theme.colors.border.base}`,
      backgroundColor: theme.colors.surface,
      color: theme.colors.text.primary,
      transition: theme.transitions.fast,
      width: "100%",
      boxSizing: "border-box",
    };

    const helperStyle: React.CSSProperties = {
      fontSize: theme.typography.fontSize.xs,
      color: error ? theme.colors.error : theme.colors.text.secondary,
    };

    return (
      <div style={containerStyle}>
        {label && <label style={labelStyle}>{label}</label>}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          style={inputStyle}
          className={className}
          {...props}
        />
        {(error || helperText) && (
          <span style={helperStyle}>{error || helperText}</span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
