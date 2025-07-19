# Step 1: React Native Project Setup

## Objective

Set up a new React Native project with Expo and TypeScript, configure the development environment, and create the basic project structure for the Quench onboarding flow.

## Prerequisites

- Node.js installed (version 16 or higher)
- VS Code or preferred code editor
- iOS Simulator (Mac) or Android Emulator
- Basic familiarity with terminal/command line

## Key Concepts You'll Learn

- **Expo**: Development platform for React Native that simplifies setup and deployment
- **TypeScript**: Adds type safety to JavaScript, helping catch errors during development
- **Project Structure**: How React Native projects are organized compared to SwiftUI
- **Metro Bundler**: The JavaScript bundler that powers React Native

## Step-by-Step Instructions

### 1. Install Expo CLI

First, install the Expo CLI globally on your machine:

```bash
npm install -g @expo/cli
```

**What this does**: Installs the Expo command-line tools that help create, develop, and deploy React Native apps.

### 2. Create New Project

Navigate to your parent directory (same level as your SwiftUI project) and create the new project:

```bash
# Navigate to your quench-app directory
cd /path/to/your/quench-app

# Create new React Native project with TypeScript
npx create-expo-app quench-react-native --template
```

When prompted, select: **Blank (TypeScript)**

**What this does**: Creates a new React Native project with TypeScript configuration, Expo setup, and all necessary dependencies.

### 3. Navigate and Start Project

```bash
cd quench-react-native
npm start
```

**What this does**: Starts the Metro bundler and Expo development server. You'll see a QR code and development options.

### 4. Test Your Setup

- Press `i` to open iOS Simulator
- Press `a` to open Android Emulator
- Or scan QR code with Expo Go app on your phone

**Expected Result**: You should see a basic "Open up App.tsx to start working..." screen.

### 5. Install Additional Dependencies

Install the navigation library we'll need:

```bash
npm install @react-navigation/native @react-navigation/stack react-native-screens react-native-safe-area-context
```

For Expo specifically, also install:

```bash
npx expo install react-native-screens react-native-safe-area-context
```

**What this does**: Installs React Navigation for screen-to-screen navigation, similar to SwiftUI's NavigationStack.

### 6. Project Structure Overview

Your new project should look like this:

```
quench-react-native/
├── App.tsx                 # Main app entry point (like quench_swiftApp.swift)
├── app.json               # Expo configuration
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── assets/                # Images and icons
├── components/            # Reusable UI components (create this)
├── screens/               # Individual screens (create this)
└── styles/                # Styling files (create this)
```

### 7. Create Project Folders

Create the folders you'll need for organization:

```bash
mkdir components screens styles types
```

**What this does**: Creates organized folders for different types of code:

- `components/` - Reusable UI pieces (buttons, progress bars)
- `screens/` - Individual onboarding screens
- `styles/` - Styling and design system files
- `types/` - TypeScript type definitions

### 8. Basic App.tsx Setup

Replace the contents of `App.tsx` with a basic setup:

```typescript
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text style={styles.text}>Quench React Native</Text>
        <Text style={styles.subtitle}>Onboarding Setup Complete</Text>
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5F2FF', // Light blue background like SwiftUI version
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 17,
    color: '#6E6E73',
  },
});
```

**What this code does**:

- `SafeAreaProvider`: Handles device-specific safe areas (like iPhone notch)
- `StyleSheet`: React Native's way of creating styles (similar to CSS)
- Uses the same colors as the SwiftUI version

### 9. Verify Setup

Save the file and check your app. You should see:

- Light blue background
- "Quench React Native" text in the center
- Proper colors matching the SwiftUI design

## Question-Driven Prompts for AI Help

If you get stuck, ask AI these specific questions:

1. **Setup Issues**:

   - "Why is my Expo CLI not installing properly on [your OS]?"
   - "How do I fix the Metro bundler connection refused error?"
   - "What's the difference between create-expo-app and react-native init?"

2. **Project Structure**:

   - "How should I organize files in a React Native project for reusable components?"
   - "What's the best way to structure a multi-screen React Native app?"

3. **Dependencies**:

   - "Why do I need both npm install and expo install for some packages?"
   - "How do I check if my React Navigation is properly installed?"

4. **TypeScript**:
   - "How do I fix TypeScript errors in my React Native project?"
   - "What are the basic TypeScript types I need for React Native components?"

## Google Search Queries

Use these search terms when you need more help:

- "expo create project with typescript tutorial"
- "react navigation setup expo"
- "react native project structure best practices"
- "expo ios simulator setup"
- "react native stylssheet vs styled components"

## Documentation Links

**Essential Reading**:

- [Expo Documentation](https://docs.expo.dev/) - Complete Expo guide
- [React Native Documentation](https://reactnative.dev/docs/getting-started) - Core React Native concepts
- [React Navigation](https://reactnavigation.org/docs/getting-started) - Navigation library docs
- [TypeScript with React Native](https://reactnative.dev/docs/typescript) - TypeScript integration

**Quick References**:

- [StyleSheet API](https://reactnative.dev/docs/stylesheet) - Styling in React Native
- [Core Components](https://reactnative.dev/docs/components-and-apis) - Built-in components like View, Text

## Common Issues and Solutions

### Issue: "Command not found: expo"

**Solution**: Make sure Node.js is installed and npm is working. Try `npm install -g @expo/cli` again.

### Issue: iOS Simulator won't open

**Solution**: Make sure Xcode is installed on Mac. Run `xcode-select --install` if needed.

### Issue: Metro bundler connection issues

**Solution**: Clear cache with `npx expo start --clear` or restart your terminal.

### Issue: TypeScript errors on save

**Solution**: Make sure your VS Code has TypeScript extension installed and is using the workspace TypeScript version.

## Validation Checklist

Before moving to the next step, make sure:

- [x] Expo project creates and runs successfully
- [x] You can see the app in iOS Simulator or Android Emulator
- [x] The background color matches the SwiftUI version (#E5F2FF)
- [x] Text displays correctly with proper fonts and colors
- [x] Hot reloading works (changes appear when you save files)
- [x] Project folders (components, screens, styles, types) are created

## What You've Learned

After completing this step, you now understand:

- How to create and run an Expo React Native project
- Basic project structure and organization
- How StyleSheet works for styling components
- The relationship between React Native components and SwiftUI views
- How to install and manage dependencies with npm/expo

## Next Steps

In the next guide (`02-understanding-differences.md`), you'll learn:

- Key differences between SwiftUI and React Native concepts
- How SwiftUI VStack/HStack translates to React Native View/Flexbox
- Component lifecycle and state management differences
- Navigation patterns comparison

This foundation will help you understand the conceptual differences before diving into actual screen implementation.
