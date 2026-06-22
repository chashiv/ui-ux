/**
 * Form Field Component (Molecule)
 * Combines Input with validation and error handling
 */

import React from "react";
import { Input } from "@components/atoms/Input";
import { useTheme } from "@hooks/useTheme";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, helperText, required = false, ...props }, ref) => {
    const { theme } = useTheme();

    const containerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing[1],
    };

    const labelStyle: React.CSSProperties = {
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.semibold,
      color: theme.colors.text.primary,
    };

    const requiredStyle: React.CSSProperties = {
      color: theme.colors.error,
    };

    return (
      <div style={containerStyle}>
        <label style={labelStyle}>
          {label}
          {required && <span style={requiredStyle}> *</span>}
        </label>
        <Input ref={ref} error={error} helperText={helperText} {...props} />
      </div>
    );
  },
);

FormField.displayName = "FormField";
