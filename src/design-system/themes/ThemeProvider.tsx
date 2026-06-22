/**
 * Theme Context Provider
 * Manages theme switching and provides theme values to components
 */

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { lightTheme, type LightTheme } from "./lightTheme";
import { darkTheme, type DarkTheme } from "./darkTheme";

export type Theme = LightTheme | DarkTheme;
export type ThemeMode = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

interface ThemeProviderProps {
  children: ReactNode;
  defaultMode?: ThemeMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultMode = "light",
}) => {
  const [mode, setMode] = useState<ThemeMode>(defaultMode);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check system preference on mount
    if (!mounted) {
      const savedTheme = localStorage.getItem("theme") as ThemeMode | null;
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;

      if (savedTheme) {
        setMode(savedTheme);
      } else if (prefersDark) {
        setMode("dark");
      }
      setMounted(true);
    }
  }, [mounted]);

  const theme = mode === "dark" ? darkTheme : lightTheme;

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  const setThemeMode = (newMode: ThemeMode) => {
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  const value: ThemeContextType = {
    theme,
    mode,
    toggleTheme,
    setTheme: setThemeMode,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
