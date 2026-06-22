/**
 * Dark Theme
 * Dark theme with dark backgrounds and light text
 */

import { colors, spacing, typography, borderRadius, shadows, transitions } from '../tokens/colors'

export const darkTheme = {
  colors: {
    // Background
    background: colors.dark.bg,
    surface: colors.dark.surface,
    surfaceHover: '#334155',
    surfaceActive: '#475569',

    // Text
    text: {
      primary: colors.neutral[50],
      secondary: colors.neutral[300],
      tertiary: colors.neutral[400],
      inverse: colors.neutral[900],
    },

    // Borders
    border: {
      light: colors.dark.border,
      base: '#475569',
      dark: colors.neutral[600],
    },

    // Primary
    primary: colors.primary[500],
    primaryHover: colors.primary[400],
    primaryActive: colors.primary[300],
    primaryLight: colors.primary[900],

    // Semantic
    success: colors.success[500],
    error: colors.error[500],
    warning: colors.warning[500],
    info: colors.info[500],

    // Interactive
    disabled: colors.neutral[600],
    placeholder: colors.neutral[500],
    focus: colors.primary[400],
  },
  spacing,
  typography,
  borderRadius,
  shadows,
  transitions,
}

export type DarkTheme = typeof darkTheme
