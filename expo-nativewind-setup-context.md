# Expo Router + NativeWind Setup Context & Troubleshooting Guide

## Overview
This document provides critical setup information and troubleshooting steps for setting up Expo Router with NativeWind to avoid common configuration issues that can prevent app startup.

## Critical Issue: "Unable to resolve ../../App" Error

### The Problem
When setting up a new Expo Router project, you may encounter this error:
```
iOS Bundling failed 545ms node_modules/expo/AppEntry.js (1 module)
Unable to resolve "../../App" from "node_modules/expo/AppEntry.js"
```

### Root Cause
This error occurs because the `package.json` file still contains the traditional Expo entry point instead of the Expo Router entry point, causing Expo to look for the old `App.tsx` file instead of using the file-based routing system.

### The Fix
**Change the main entry point in `package.json`:**

❌ **Incorrect (traditional Expo):**
```json
{
  "main": "node_modules/expo/AppEntry.js"
}
```

✅ **Correct (Expo Router):**
```json
{
  "main": "expo-router/entry"
}
```

## Complete Setup Checklist

### 1. Dependencies Installation
```bash
npx expo install expo-router expo-linking expo-constants expo-font
npm install expo-linear-gradient  # if needed
npm install nativewind tailwindcss  # if using NativeWind
```

### 2. Package.json Configuration
Ensure your `package.json` has:
```json
{
  "main": "expo-router/entry",
  "dependencies": {
    "expo-router": "~5.1.3",
    "expo-linking": "~7.1.7", 
    "expo-constants": "~17.1.7",
    "expo-font": "~13.3.2"
  }
}
```

### 3. App.json Configuration
```json
{
  "expo": {
    "scheme": "your-app-name",
    "plugins": [
      "expo-router",
      "expo-font"
    ],
    "experiments": {
      "tsconfigPaths": true
    }
  }
}
```

**Important:** The `scheme` field is required to prevent linking warnings and is necessary for production builds.

### 4. Metro.config.js (with NativeWind)
```javascript
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname, {
  // Enable CSS support for Expo Router
  isCSSEnabled: true,
});

module.exports = withNativeWind(config, { input: './global.css' });
```

### 5. Babel.config.js (with NativeWind)
```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }], 
      'nativewind/babel'
    ],
    plugins: [],
  };
};
```

### 6. Tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}'  // if you have a components dir
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### 7. File Structure
```
project/
├── app/
│   ├── _layout.tsx        # Root layout
│   ├── index.tsx          # Home screen
│   └── onboarding/
│       ├── _layout.tsx    # Nested layout
│       └── screen.tsx     # Screen files
├── assets/
├── global.css
├── package.json           # CRITICAL: main: "expo-router/entry"
├── app.json              # CRITICAL: plugins: ["expo-router"]
├── metro.config.js       # CRITICAL: isCSSEnabled: true
└── babel.config.js
```

### 8. Root Layout Template (app/_layout.tsx)
```typescript
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import '../global.css';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
```

## Common Troubleshooting Steps

### If you get the "Unable to resolve App" error:
1. **Check package.json main entry** - Must be `"expo-router/entry"`
2. **Verify expo-router plugin** in app.json
3. **Clear cache**: `npx expo start --clear`
4. **Reinstall dependencies**: `rm -rf node_modules && npm install`

### If styles aren't working:
1. **Check metro.config.js** has `isCSSEnabled: true`
2. **Verify global.css import** in root layout
3. **Check tailwind.config.js** content paths include your directories
4. **Check TypeScript configuration** - ensure `nativewind-env.d.ts` is included in tsconfig.json
5. **Clear Metro cache** - `npx expo start --clear` to refresh style transformations
6. **Verify babel.config.js** has proper NativeWind presets with `jsxImportSource: 'nativewind'`

### If navigation isn't working:
1. **Verify file structure** follows Expo Router conventions
2. **Check Stack.Screen names** match file names
3. **Ensure _layout.tsx files** are properly configured

## AI Assistant Instructions

When helping users set up Expo Router + NativeWind projects:

1. **Always verify package.json main entry** - This is the #1 cause of startup failures
2. **Check all configuration files** against the templates above
3. **Use the TodoWrite tool** to track setup progress systematically
4. **Verify dependencies** are installed with compatible versions
5. **Test file structure** follows Expo Router conventions
6. **Check web documentation** for latest patterns before implementing

## Critical Issue #2: NativeWind Styles Not Working (Blank Screens)

### The Problem
After navigation works, you may encounter blank screens where className styles aren't being applied, even though the components render with inline styles.

### Root Causes
1. **TypeScript Configuration** - Missing include paths for NativeWind type definitions
2. **Stale Metro Cache** - Outdated bundler cache preventing style transformations
3. **Babel Configuration** - Improper NativeWind preset setup

### The Fix
**Update tsconfig.json to include NativeWind types:**
```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts",
    "nativewind-env.d.ts"
  ]
}
```

**Clear Metro cache and restart:**
```bash
npx expo start --clear
```

## Key Takeaways

- **Package.json main entry** is critical - must be `"expo-router/entry"`
- **Metro config** needs `isCSSEnabled: true` for Expo Router + CSS
- **App.json** must include the `"expo-router"` plugin and `"scheme"` field
- **File structure** must follow exact Expo Router conventions
- **Dependencies** must include all required Expo Router packages
- **TypeScript config** must include `nativewind-env.d.ts` for className support
- **Cache clearing** often resolves NativeWind style issues

## Version Compatibility (as of 2025)

- Expo SDK: 53.x
- Expo Router: ~5.1.3
- NativeWind: 4.x (latest)
- React Native: 0.79.x
- Tailwind CSS: ^3.4.0

---

*This document was created based on troubleshooting a real "Unable to resolve App" error that occurred during Expo Router setup. Keep this reference handy for future projects.*