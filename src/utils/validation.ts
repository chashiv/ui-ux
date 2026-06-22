/**
 * Validation Utilities
 * Common validation functions
 */

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string, minLength = 6): boolean => {
  return password.length >= minLength;
};

export const validateRequired = (value: string | number | boolean): boolean => {
  return String(value).trim().length > 0;
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
