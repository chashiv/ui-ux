/**
 * useTheme Hook
 * Access current theme and theme-related utilities
 */

import { useContext } from "react";
import { ThemeContext } from "@design-system/themes/ThemeProvider";

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
