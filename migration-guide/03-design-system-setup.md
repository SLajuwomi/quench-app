# Step 3: Design System Setup

## Objective
Create a comprehensive design system that matches the SwiftUI version exactly, including colors, typography, spacing, and reusable styled components. This foundation will ensure visual consistency across all onboarding screens.

## Prerequisites
- Completed Steps 1-2 (Project setup and understanding differences)
- Basic understanding of React Native StyleSheet
- Familiarity with the SwiftUI design specifications

## Key Concepts You'll Learn
- **Design Tokens**: Consistent values for colors, fonts, and spacing
- **Component-Based Styling**: Reusable styled components
- **Theme Architecture**: Organizing design system for maintainability
- **Responsive Design**: Handling different screen sizes

## Step-by-Step Instructions

### 1. Create Design System File Structure

Create the following files in your project:

```bash
# From your quench-react-native directory
mkdir styles/theme
touch styles/theme/colors.ts
touch styles/theme/typography.ts
touch styles/theme/spacing.ts
touch styles/theme/index.ts
touch styles/components.ts
```

**What this does**: Organizes your design system into logical modules that can be imported and reused throughout your app.

### 2. Set Up Color System

**File: `styles/theme/colors.ts`**

```typescript
// Convert SwiftUI RGB values to React Native hex values
// SwiftUI uses 0.0-1.0 range, React Native uses 0-255
// Formula: SwiftUI_value * 255 = React_Native_value

export const colors = {
  // Primary Colors (exact matches from SwiftUI)
  background: '#E5F2FF',        // Color(red: 0.9, green: 0.95, blue: 1.0)
  darkText: '#1C1C1E',          // Color(red: 0.11, green: 0.11, blue: 0.12)
  lightText: '#6E6E73',         // Color(red: 0.43, green: 0.43, blue: 0.45)
  blueAccent: '#007AFF',        // Color(red: 0.0, green: 0.48, blue: 1.0)
  
  // Additional colors for interactive states
  white: '#FFFFFF',
  gray: '#8E8E93',              // For back button icon
  
  // State colors (for avatar states and feedback)
  fullyHydrated: '#007AFF',     // Blue
  slightlyThirsty: '#007AFF',   // Blue
  gettingThirsty: '#FF9500',    // Orange  
  quiteThirsty: '#FF9500',      // Orange
  veryThirsty: '#FF3B30',       // Red
  severelyDehydrated: '#FF3B30', // Red
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
```

**What this does**: 
- Converts exact SwiftUI RGB values to React Native hex format
- Creates a consistent color palette that matches the original design
- Provides utility function for transparent colors

### 3. Set Up Typography System

**File: `styles/theme/typography.ts`**

```typescript
import { TextStyle } from 'react-native';

// Typography hierarchy matching SwiftUI specifications
export const typography = {
  // Main headings
  welcomeHeading: {
    fontSize: 32,
    fontWeight: 'bold' as TextStyle['fontWeight'],
    lineHeight: 38,               // fontSize * 1.2 for good spacing
    textAlign: 'center' as TextStyle['textAlign'],
  },
  
  heading: {
    fontSize: 28,
    fontWeight: 'bold' as TextStyle['fontWeight'],
    lineHeight: 34,
    textAlign: 'center' as TextStyle['textAlign'],
  },
  
  // Subtitles and body text
  subtitle: {
    fontSize: 17,
    fontWeight: 'normal' as TextStyle['fontWeight'],
    lineHeight: 22,
    textAlign: 'center' as TextStyle['textAlign'],
  },
  
  // Button text
  button: {
    fontSize: 17,
    fontWeight: '500' as TextStyle['fontWeight'],
    textAlign: 'center' as TextStyle['textAlign'],
  },
  
  // Small text (for progress indicators, hints)
  caption: {
    fontSize: 13,
    fontWeight: 'normal' as TextStyle['fontWeight'],
    lineHeight: 16,
    textAlign: 'center' as TextStyle['textAlign'],
  },
  
  // Large numbers (for current water intake display)
  largeNumber: {
    fontSize: 48,
    fontWeight: 'bold' as TextStyle['fontWeight'],
    textAlign: 'center' as TextStyle['textAlign'],
  },
} as const;

// Usage examples:
// <Text style={[typography.heading, { color: colors.darkText }]}>
// <Text style={[typography.subtitle, { color: colors.lightText }]}>
```

**What this does**:
- Matches exact font sizes from SwiftUI design
- Provides consistent line height for good readability
- Uses TypeScript for type safety with TextStyle

### 4. Set Up Spacing System

**File: `styles/theme/spacing.ts`**

```typescript
// Spacing system matching SwiftUI specifications
export const spacing = {
  // Base spacing units (in points, same as SwiftUI)
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  
  // Specific spacing from SwiftUI design
  stackSpacing: 24,          // VStack(spacing: 24)
  navigationSpacing: 16,     // HStack(spacing: 16) for back button + progress
  textGroupSpacing: 12,      // Between title and subtitle
  
  // Screen padding
  screenHorizontal: 20,      // .padding(.horizontal, 20)
  screenTop: 20,             // .padding(.top, 20)
  screenBottom: 34,          // .padding(.bottom, 34)
  
  // Component specific
  buttonHeight: 50,          // .frame(height: 50)
  progressBarScale: 0.8,     // .scaleEffect(x: 1, y: 0.8)
  borderRadius: 12,          // .cornerRadius(12)
  
  // Avatar sizes
  avatarWelcome: 180,        // Welcome screen avatar
  avatarOther: 120,          // All other screens
} as const;

// Helper function for consistent margins
export const margin = {
  horizontal: (value: number) => ({ marginHorizontal: value }),
  vertical: (value: number) => ({ marginVertical: value }),
  top: (value: number) => ({ marginTop: value }),
  bottom: (value: number) => ({ marginBottom: value }),
  left: (value: number) => ({ marginLeft: value }),
  right: (value: number) => ({ marginRight: value }),
};

// Helper function for consistent padding
export const padding = {
  horizontal: (value: number) => ({ paddingHorizontal: value }),
  vertical: (value: number) => ({ paddingVertical: value }),
  top: (value: number) => ({ paddingTop: value }),
  bottom: (value: number) => ({ paddingBottom: value }),
  left: (value: number) => ({ paddingLeft: value }),
  right: (value: number) => ({ paddingRight: value }),
};
```

**What this does**:
- Provides consistent spacing values matching SwiftUI design
- Includes helper functions for common spacing patterns
- Makes it easy to maintain consistent layouts

### 5. Create Theme Index

**File: `styles/theme/index.ts`**

```typescript
// Central export for all theme values
export { colors, rgba } from './colors';
export { typography } from './typography';
export { spacing, margin, padding } from './spacing';

// Combined theme object for easy importing
export const theme = {
  colors,
  typography,
  spacing,
  margin,
  padding,
} as const;

// Usage: import { theme } from '../styles/theme';
// Or: import { colors, typography, spacing } from '../styles/theme';
```

### 6. Create Reusable Styled Components

**File: `styles/components.ts`**

```typescript
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, typography, spacing } from './theme';

// Layout components matching SwiftUI patterns
export const layouts = StyleSheet.create({
  // Screen container (like SwiftUI ZStack with background)
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  } as ViewStyle,
  
  // Main content area (like SwiftUI VStack)
  mainContent: {
    flex: 1,
    flexDirection: 'column',
  } as ViewStyle,
  
  // Centered content (like SwiftUI VStack with Spacers)
  centeredContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.screenHorizontal,
  } as ViewStyle,
  
  // Navigation area (like SwiftUI HStack with back button + progress)
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.navigationSpacing,
    paddingHorizontal: spacing.screenHorizontal,
    paddingTop: spacing.screenTop,
  } as ViewStyle,
  
  // Content section spacing
  contentSection: {
    gap: spacing.stackSpacing,
    alignItems: 'center',
  } as ViewStyle,
  
  // Text group (title + subtitle)
  textGroup: {
    gap: spacing.textGroupSpacing,
    alignItems: 'center',
  } as ViewStyle,
});

// Button styles matching SwiftUI button exactly
export const buttons = StyleSheet.create({
  // Main continue button
  continueButton: {
    backgroundColor: colors.blueAccent,
    height: spacing.buttonHeight,
    borderRadius: spacing.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.screenHorizontal,
    marginHorizontal: spacing.screenHorizontal,
    marginBottom: spacing.screenBottom,
  } as ViewStyle,
  
  continueButtonText: {
    ...typography.button,
    color: colors.white,
  } as TextStyle,
  
  // Back button
  backButton: {
    padding: spacing.sm,
  } as ViewStyle,
  
  // Disabled state
  disabledButton: {
    backgroundColor: colors.gray,
    opacity: 0.6,
  } as ViewStyle,
});

// Avatar styles
export const avatars = StyleSheet.create({
  welcome: {
    width: spacing.avatarWelcome,
    height: spacing.avatarWelcome,
  } as ViewStyle,
  
  other: {
    width: spacing.avatarOther,
    height: spacing.avatarOther,
  } as ViewStyle,
});

// Progress bar styles
export const progress = StyleSheet.create({
  container: {
    flex: 1,
    height: 4,
    backgroundColor: rgba(colors.blueAccent, 0.2),
    borderRadius: 2,
  } as ViewStyle,
  
  bar: {
    height: '100%',
    backgroundColor: colors.blueAccent,
    borderRadius: 2,
  } as ViewStyle,
});

// Text styles with colors applied
export const textStyles = StyleSheet.create({
  welcomeHeading: {
    ...typography.welcomeHeading,
    color: colors.darkText,
  } as TextStyle,
  
  heading: {
    ...typography.heading,
    color: colors.darkText,
  } as TextStyle,
  
  subtitle: {
    ...typography.subtitle,
    color: colors.lightText,
  } as TextStyle,
  
  caption: {
    ...typography.caption,
    color: colors.lightText,
  } as TextStyle,
});
```

**What this does**:
- Creates reusable style objects that match SwiftUI patterns
- Combines theme values into practical component styles
- Provides exact button styling matching the SwiftUI version

### 7. Test Your Design System

Update your `App.tsx` to test the design system:

```typescript
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity } from 'react-native';
import { layouts, textStyles, buttons } from './styles/components';
import { colors } from './styles/theme';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={layouts.screenContainer}>
        <View style={layouts.centeredContent}>
          <View style={layouts.textGroup}>
            <Text style={textStyles.welcomeHeading}>welcome to quench</Text>
            <Text style={textStyles.subtitle}>
              Your hydration buddy is ready to help you stay healthy
            </Text>
          </View>
        </View>
        
        <TouchableOpacity style={buttons.continueButton}>
          <Text style={buttons.continueButtonText}>continue</Text>
        </TouchableOpacity>
        
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}
```

**Expected Result**: 
- Light blue background matching SwiftUI
- Properly sized and colored text
- Button that looks identical to SwiftUI version
- Consistent spacing and layout

## Question-Driven Prompts for AI Help

If you encounter issues, ask these specific questions:

1. **Color Conversion**:
   - "How do I convert SwiftUI Color(red: 0.9, green: 0.95, blue: 1.0) to React Native hex?"
   - "Why do my colors look different between React Native and SwiftUI?"
   - "How do I create transparent colors in React Native StyleSheet?"

2. **Typography Issues**:
   - "How do I match exact font weights between SwiftUI and React Native?"
   - "Why is my line height not spacing text properly in React Native?"
   - "How do I center text both horizontally and vertically?"

3. **Layout Problems**:
   - "How do I recreate SwiftUI VStack spacing in React Native flexbox?"
   - "Why isn't my flex: 1 behaving like SwiftUI Spacer()?"
   - "How do I make a button stretch full width like SwiftUI .frame(maxWidth: .infinity)?"

4. **Component Styling**:
   - "How do I create reusable styled components in React Native?"
   - "What's the best way to organize styles in a React Native project?"
   - "How do I apply multiple styles to one component?"

## Google Search Queries

Use these when you need additional help:
- "react native design system setup best practices"
- "swiftui colors to react native hex conversion"
- "react native typography system font weights"
- "react native flexbox center content vertically horizontally"
- "react native stylesheet organization patterns"
- "react native button styling touchableopacity custom"

## Documentation Links

**Design System Resources**:
- [React Native StyleSheet API](https://reactnative.dev/docs/stylesheet) - Core styling documentation
- [React Native Flexbox](https://reactnative.dev/docs/flexbox) - Layout system guide
- [Typography in React Native](https://reactnative.dev/docs/text#style) - Text styling options

**Color and Theme**:
- [React Native Colors](https://reactnative.dev/docs/colors) - Color format options
- [Design Systems Guide](https://www.designsystems.com/) - General design system principles

## Common Issues and Solutions

### Issue: Colors don't match SwiftUI exactly
**Solution**: Use the conversion formula: SwiftUI_RGB_value × 255 = React_Native_RGB_value. Double-check hex conversion.

### Issue: Fonts look different sizes
**Solution**: React Native and SwiftUI may have different default line heights. Explicitly set lineHeight in your typography.

### Issue: Button doesn't stretch full width
**Solution**: Use `flex: 1` or `width: '100%'` combined with proper container styling.

### Issue: Spacing inconsistent across screens
**Solution**: Always use spacing constants from your theme instead of hard-coded values.

## Validation Checklist

Before moving to navigation setup, verify:
- [ ] Background color matches SwiftUI exactly (#E5F2FF)
- [ ] Text colors and sizes look identical to SwiftUI version
- [ ] Button styling matches exactly (height, radius, colors)
- [ ] Spacing values are consistent with SwiftUI design
- [ ] Design system files are properly organized and importable
- [ ] Test component renders without errors

## What You've Learned

After completing this step, you understand:
- How to convert SwiftUI design tokens to React Native
- Component-based styling organization
- Creating reusable styled components
- Color, typography, and spacing systems
- Best practices for maintainable React Native styling

## Next Steps

In the next guide (`04-navigation-setup.md`), you'll:
- Set up React Navigation for screen-to-screen movement
- Create a navigation structure matching the SwiftUI flow
- Implement progress tracking across screens
- Build reusable navigation components (back button, progress bar)

This design system foundation will ensure all your screens look consistent and match the original SwiftUI design perfectly.