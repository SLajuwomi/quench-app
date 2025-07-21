// Central export for all theme values
import { colors, rgba } from './colors';
import { typography } from './typography';
import { spacing, margin, padding } from './spacing';

// Combined theme object for easy importing
export const theme = {
  colors,
  rgba,
  typography,
  spacing,
  margin,
  padding,
} as const;

// Usage: import { theme } from '../styles/theme';
// Or: import { colors, typography, spacing } from '../styles/theme';
