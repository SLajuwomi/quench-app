# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a React Native hydration tracking app called "Quench" built with Expo Router and NativeWind (Tailwind CSS for React Native). The app features a sophisticated onboarding flow with premium UI design patterns.

## Development Commands

### Essential Commands
- `npm start` - Start the Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run on web browser

### Code Quality
- `npm run lint` - Run ESLint and Prettier checks
- `npm run format` - Auto-fix ESLint issues and format code with Prettier
- `npm run prebuild` - Generate native code for production builds

## Technology Stack & Architecture

### Core Technologies
- **Expo SDK**: 53.x with Expo Router (~5.1.3) for file-based routing
- **NativeWind**: 4.x for Tailwind CSS styling in React Native
- **TypeScript**: 5.8.3 with strict mode enabled
- **React Native**: 0.79.5 with React 19.0.0
- **Expo Linear Gradient**: 14.1.5 for gradient backgrounds

### Key Configuration Files
- **package.json**: `"main": "expo-router/entry"` (critical for Expo Router)
- **app.json**: Contains `"scheme": "quench-app"` and expo-router plugin
- **metro.config.js**: Configured with `isCSSEnabled: true` and NativeWind integration
- **babel.config.js**: Uses `babel-preset-expo` with `jsxImportSource: 'nativewind'`
- **tailwind.config.js**: Content paths include `./app/**/*.{js,jsx,ts,tsx}`

### App Architecture
The app uses Expo Router's file-based routing system:

```
app/
├── _layout.tsx              # Root layout with Stack navigation
├── index.tsx                # Welcome screen with onboarding CTA
└── onboarding/
    ├── _layout.tsx          # Nested onboarding layout
    └── 01_problem_hook.tsx  # First onboarding screen
```

### Routing Structure
- **Root Layout** (`app/_layout.tsx`): SafeAreaProvider wrapper with Stack navigation
- **Welcome Screen** (`app/index.tsx`): Entry point with "Start Onboarding" button
- **Onboarding Flow** (`app/onboarding/`): Nested stack with individual screens

### Styling Approach
- **NativeWind**: Primary styling using `className` prop with Tailwind utilities
- **Custom Components**: Reusable UI components like `RiseStyleButton` with layered shadow effects
- **LinearGradient**: Used for premium background effects
- **Design System**: Consistent color palette (blue-500, cyan-50, slate-800)

## Critical Configuration Requirements

### Metro Configuration
Must include `isCSSEnabled: true` for Expo Router + NativeWind compatibility:
```javascript
const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
});
```

### Babel Configuration
Requires NativeWind-specific JSX import source:
```javascript
presets: [
  ['babel-preset-expo', { jsxImportSource: 'nativewind' }], 
  'nativewind/babel'
]
```

### TypeScript Configuration
Must include `nativewind-env.d.ts` for type definitions:
```json
{
  "include": ["**/*.ts", "**/*.tsx", "nativewind-env.d.ts"]
}
```

## Development Guidelines

### File Organization
- Use descriptive names for screens (e.g., `01_problem_hook.tsx`)
- Follow Expo Router conventions (`_layout.tsx` for navigation)
- Keep assets organized in `assets/images/` directory

### Component Patterns
- Import required React Native components explicitly
- Use `SafeAreaView` for screen-level components
- Leverage NativeWind's `className` prop for all styling
- Create reusable UI components with consistent design patterns

### Navigation
- Use Expo Router's `Link` component for navigation
- Implement proper back button functionality
- Configure `headerShown: false` for custom headers

## Common Issues & Solutions

### "Unable to resolve ../../App" Error
- **Cause**: Incorrect package.json main entry
- **Fix**: Ensure `"main": "expo-router/entry"` in package.json

### NativeWind Styles Not Applying
- **Cause**: Missing TypeScript types or stale cache
- **Fix**: Verify `nativewind-env.d.ts` is included in tsconfig.json, clear cache with `npx expo start --clear`

### Build Issues
- **Cause**: Missing scheme configuration
- **Fix**: Add `"scheme": "quench-app"` to app.json

## Asset Management
- Avatar images stored in `assets/images/` with descriptive names
- Use `require()` for local image imports
- Implement `resizeMode="contain"` for proper image scaling

## Code Quality Standards
- ESLint configuration extends `eslint-config-expo`
- Prettier with Tailwind plugin for consistent formatting
- TypeScript strict mode enabled
- Custom rule: `'react/display-name': 'off'`

## Current Implementation Status
- ✅ Basic app structure with Expo Router
- ✅ Welcome screen with navigation
- ✅ First onboarding screen with premium UI
- ✅ NativeWind styling system functional
- ✅ Linear gradient backgrounds
- ✅ Custom button components with shadow effects
- ✅ Progress bar implementation
- ✅ Responsive layout with SafeAreaView