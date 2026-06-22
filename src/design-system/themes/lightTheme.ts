/**
 * Light Theme
 * Default theme with light backgrounds and dark text
 */

import { colors, spacing, typography, borderRadius, shadows, transitions } from '../tokens/colors'

export const lightTheme = {
  colors: {
    // Background
    background: colors.neutral[0],
    surface: colors.neutral[50],
    surfaceHover: colors.neutral[100],
    surfaceActive: colors.neutral[200],

    // Text
    text: {
      primary: colors.neutral[900],
      secondary: colors.neutral[600],
      tertiary: colors.neutral[500],
      inverse: colors.neutral[0],
    },

    // Borders
    border: {
      light: colors.neutral[200],
      base: colors.neutral[300],
      dark: colors.neutral[400],
    },

    // Primary
    primary: colors.primary[600],
    primaryHover: colors.primary[700],
    primaryActive: colors.primary[800],
    primaryLight: colors.primary[50],

    // Semantic
    success: colors.success[600],
    error: colors.error[600],
    warning: colors.warning[600],
    info: colors.info[600],

    // Interactive
    disabled: colors.neutral[400],
    placeholder: colors.neutral[400],
    focus: colors.primary[500],
  },
  spacing,
  typography,
  borderRadius,
  shadows,
  transitions,
}

export type LightTheme = typeof lightTheme
