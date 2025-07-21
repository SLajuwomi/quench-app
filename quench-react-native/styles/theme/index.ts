export { colors, rgba } from './colors';
export { typography } from './typography';
export { spacing, margin, padding } from './spacing';

import { colors, rgba } from './colors';
import { typography } from './typography';
import { spacing, margin, padding } from './spacing';

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
