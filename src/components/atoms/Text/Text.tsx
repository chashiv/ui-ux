/**
 * Text Component (Atom)
 * Semantic typography component
 */

import React from "react";
import { useTheme } from "@hooks/useTheme";

export type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body"
  | "caption"
  | "code";
export type TextColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "inverse"
  | "error"
  | "success";

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  color?: TextColor;
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
  children: React.ReactNode;
}

const variantMap: Record<TextVariant, keyof React.JSX.IntrinsicElements> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "p",
  caption: "span",
  code: "code",
};

export const Text: React.FC<TextProps> = ({
  variant = "body",
  color = "primary",
  weight,
  children,
  style = {},
  ...props
}) => {
  const { theme } = useTheme();
  const Component = variantMap[variant];

  const getFontSize = () => {
    switch (variant) {
      case "h1":
        return theme.typography.fontSize["4xl"];
      case "h2":
        return theme.typography.fontSize["3xl"];
      case "h3":
        return theme.typography.fontSize["2xl"];
      case "h4":
        return theme.typography.fontSize.xl;
      case "caption":
        return theme.typography.fontSize.xs;
      case "code":
        return theme.typography.fontSize.sm;
      default:
        return theme.typography.fontSize.base;
    }
  };

  const getColor = () => {
    switch (color) {
      case "secondary":
        return theme.colors.text.secondary;
      case "tertiary":
        return theme.colors.text.tertiary;
      case "inverse":
        return theme.colors.text.inverse;
      case "error":
        return theme.colors.error;
      case "success":
        return theme.colors.success;
      default:
        return theme.colors.text.primary;
    }
  };

  const textStyle: React.CSSProperties = {
    fontFamily:
      variant === "code"
        ? theme.typography.fontFamily.mono
        : theme.typography.fontFamily.base,
    fontSize: getFontSize(),
    color: getColor(),
    fontWeight: weight
      ? theme.typography.fontWeight[weight]
      : variant.startsWith("h")
        ? theme.typography.fontWeight.bold
        : theme.typography.fontWeight.normal,
    margin: 0,
    lineHeight: theme.typography.lineHeight.normal,
    ...style,
  };

  return (
    <Component style={textStyle} {...props}>
      {children}
    </Component>
  );
};
