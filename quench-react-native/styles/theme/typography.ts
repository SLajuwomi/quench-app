import { TextStyle } from 'react-native';

export const typography = {
  welcomeHeading: {
    fontSize: 32,
    fontWeight: 'bold' as TextStyle['fontWeight'],
    lineHeight: 38,
    textAlign: 'center' as TextStyle['textAlign'],
  },

  heading: {
    fontSize: 28,
    fontWeight: 'bold' as TextStyle['fontWeight'],
    lineHeight: 34,
    textAlign: 'center' as TextStyle['textAlign'],
  },

  subtitle: {
    fontSize: 17,
    fontWeight: 'normal' as TextStyle['fontWeight'],
    lineHeight: 22,
    textAlign: 'center' as TextStyle['textAlign'],
  },

  button: {
    fontSize: 17,
    fontWeight: '500' as TextStyle['fontWeight'],
    textAlign: 'center' as TextStyle['textAlign'],
  },

  caption: {
    fontSize: 13,
    fontWeight: 'normal' as TextStyle['fontWeight'],
    lineHeight: 16,
    textAlign: 'center' as TextStyle['textAlign'],
  },

  largeNumber: {
    fontSize: 48,
    fontWeight: 'bold' as TextStyle['fontWeight'],
    textAlign: 'center' as TextStyle['textAlign'],
  },
} as const;

// Usage examples:
// <Text style={[typography.heading, { color: colors.darkText }]}>
// <Text style={[typography.subtitle, { color: colors.lightText }]}>
