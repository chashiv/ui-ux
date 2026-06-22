/**
 * Main App Component
 * Root component with theme provider and routing setup
 */

import React from "react";
import { ThemeProvider } from "@design-system/themes/ThemeProvider";
import { LoginPage } from "@pages/LoginPage";

export const App: React.FC = () => {
  return (
    <ThemeProvider defaultMode="light">
      <LoginPage />
    </ThemeProvider>
  );
};
