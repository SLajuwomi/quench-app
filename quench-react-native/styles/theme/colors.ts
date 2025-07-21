export const colors = {
  // Primary Colors
  background: '#E5F2FF',
  darkText: '#1C1C1E',
  lightText: '#6E6E73',
  blueAccent: '#007AFF',

  // Interactive State Colors
  white: '#FFFFFF',
  gray: '#8E8E93',

  // Avatar state colors (mainly text)
  fullyHydrated: '#007AFF',
  slightlyThirsty: '#007AFF',
  gettingThirsty: '#FF9500',
  quiteThirsty: '#FF9500',
  veryThirsty: '#FF3B30',
  severlyDehydrated: '#FF3B30',
} as const;

// Helper function to create rgba colors with opacity
export const rgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Color usage examples:
// backgroundColor: colors.background
// color: colors.darkText
// backgroundColor: rgba(colors.blueAccent, 0.1) // 10% opacity
