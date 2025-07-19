# Step 2: Understanding SwiftUI vs React Native Differences

## Objective

Learn the key conceptual differences between SwiftUI and React Native to help you translate the Quench onboarding screens effectively. This will build your mental model for converting SwiftUI code patterns to React Native.

## Prerequisites

- Completed Step 1 (React Native project setup)
- Basic familiarity with the SwiftUI Quench code
- Understanding of component-based architecture

## Key Concepts You'll Learn

- **Layout Systems**: SwiftUI Stacks vs React Native Flexbox
- **State Management**: @State vs useState/setState
- **Component Structure**: SwiftUI Views vs React Native Components
- **Styling Approaches**: SwiftUI modifiers vs StyleSheet
- **Navigation**: NavigationStack vs React Navigation

## SwiftUI to React Native Translation Guide

### 1. Layout Components

#### SwiftUI VStack/HStack/ZStack → React Native View + Flexbox

**SwiftUI Pattern:**

```swift
VStack(spacing: 24) {
    Text("Welcome to Quench")
    Text("Your hydration buddy")
}
```

**React Native Equivalent:**

```typescript
<View style={styles.verticalContainer}>
  <Text style={styles.title}>Welcome to Quench</Text>
  <Text style={styles.subtitle}>Your hydration buddy</Text>
</View>;

const styles = StyleSheet.create({
  verticalContainer: {
    flexDirection: 'column', // VStack behavior
    gap: 24, // spacing: 24
  },
});
```

**Key Differences:**

- SwiftUI: Built-in stack containers with automatic layout
- React Native: Uses Flexbox layout system, more like CSS
- Spacing in SwiftUI is automatic; in RN you control it with gap/margin/padding

#### HStack Translation

**SwiftUI:**

```swift
HStack(spacing: 16) {
    Button("Back") { }
    ProgressView(value: 1.0, total: 8.0)
}
```

**React Native:**

```typescript
<View style={styles.horizontalContainer}>
  <Button title="Back" onPress={() => {}} />
  <ProgressView progress={1 / 8} />
</View>;

const styles = StyleSheet.create({
  horizontalContainer: {
    flexDirection: 'row', // HStack behavior
    gap: 16, // spacing: 16
    alignItems: 'center', // Vertical alignment
  },
});
```

#### ZStack Translation

**SwiftUI:**

```swift
ZStack {
    Color.blue.ignoresSafeArea()
    VStack {
        Text("Content")
    }
}
```

**React Native:**

```typescript
<View style={styles.stackContainer}>
  <View style={styles.background} />
  <View style={styles.content}>
    <Text>Content</Text>
  </View>
</View>;

const styles = StyleSheet.create({
  stackContainer: {
    position: 'relative',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'blue',
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
});
```

### 2. Text and Typography

#### SwiftUI Text Modifiers → React Native Text Styles

**SwiftUI:**

```swift
Text("welcome to quench")
    .font(.system(size: 32, weight: .bold))
    .foregroundStyle(Color(red: 0.11, green: 0.11, blue: 0.12))
    .multilineTextAlignment(.center)
```

**React Native:**

```typescript
<Text style={styles.welcomeText}>welcome to quench</Text>;

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1C1C1E', // RGB converted to hex
    textAlign: 'center',
    lineHeight: 38, // Usually fontSize * 1.2 for good spacing
  },
});
```

**Key Differences:**

- SwiftUI: Chained modifiers
- React Native: Style object properties
- Colors: SwiftUI RGB values → React Native hex/rgba

### 3. Images and Assets

#### SwiftUI Image → React Native Image

**SwiftUI:**

```swift
Image("quench-transparent-default")
    .resizable()
    .aspectRatio(contentMode: .fit)
    .frame(width: 180, height: 180)
```

**React Native:**

```typescript
<Image
  source={require('../assets/quench-transparent-default.png')}
  style={styles.avatar}
  resizeMode="contain"
/>;

const styles = StyleSheet.create({
  avatar: {
    width: 180,
    height: 180,
  },
});
```

**Key Differences:**

- SwiftUI: References image by name in bundle
- React Native: Uses require() for local images or uri for remote
- ResizeMode: 'contain' = .fit, 'cover' = .fill, 'stretch' = no aspect ratio

### 4. Buttons and Interactions

#### SwiftUI Button → React Native TouchableOpacity/Pressable

**SwiftUI:**

```swift
Button(action: {
    // Continue action
}) {
    Text("continue")
        .font(.system(size: 17, weight: .medium))
        .foregroundStyle(.white)
        .frame(maxWidth: .infinity)
        .frame(height: 50)
        .background(Color(red: 0.0, green: 0.48, blue: 1.0))
        .cornerRadius(12)
}
.padding(.horizontal, 20)
```

**React Native:**

```typescript
import { TouchableOpacity } from 'react-native';

<TouchableOpacity
  style={styles.continueButton}
  onPress={() => {
    // Continue action
  }}
>
  <Text style={styles.continueButtonText}>continue</Text>
</TouchableOpacity>;

const styles = StyleSheet.create({
  continueButton: {
    backgroundColor: '#007AFF', // RGB converted
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    width: '100%',
  },
  continueButtonText: {
    fontSize: 17,
    fontWeight: '500', // medium weight
    color: 'white',
    textAlign: 'center',
  },
});
```

### 5. State Management

#### SwiftUI @State → React Native useState

**SwiftUI:**

```swift
struct ReasonSelectionView: View {
    @State private var selectedReason: String?

    var body: some View {
        // UI that uses selectedReason
    }
}
```

**React Native:**

```typescript
import React, { useState } from 'react';

const ReasonSelectionScreen: React.FC = () => {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  return (
    // UI that uses selectedReason
  );
};
```

**Key Differences:**

- SwiftUI: @State property wrapper automatically triggers re-renders
- React Native: useState hook returns value and setter function
- Both trigger component re-renders when state changes

### 6. Navigation

#### SwiftUI NavigationStack → React Navigation

**SwiftUI:**

```swift
NavigationStack(path: $navigationPath) {
    ContentView()
        .navigationDestination(for: OnboardingScreen.self) { screen in
            // Screen routing
        }
}
```

**React Native:**

```typescript
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="MeetQuench" component={MeetQuenchScreen} />
        {/* More screens */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
```

### 7. Color and Styling Conversions

#### RGB to React Native Colors

**SwiftUI RGB Values:**

```swift
Color(red: 0.9, green: 0.95, blue: 1.0)    // Light blue background
Color(red: 0.11, green: 0.11, blue: 0.12)  // Dark text
Color(red: 0.0, green: 0.48, blue: 1.0)    // Blue accent
```

**React Native Equivalents:**

```typescript
const colors = {
  lightBlue: '#E5F2FF', // rgb(229, 242, 255)
  darkText: '#1C1C1E', // rgb(28, 28, 30)
  blueAccent: '#007AFF', // rgb(0, 122, 255)
};

// Or using rgba:
const colorsRGBA = {
  lightBlue: 'rgba(229, 242, 255, 1)',
  darkText: 'rgba(28, 28, 30, 1)',
  blueAccent: 'rgba(0, 122, 255, 1)',
};
```

**Conversion Formula:**

- SwiftUI RGB (0.0-1.0) → React Native RGB (0-255)
- Multiply each value by 255: `0.9 * 255 = 229`

## Common Patterns Comparison

### Conditional Rendering

**SwiftUI:**

```swift
if selectedReason != nil {
    Button("Continue") { }
}
```

**React Native:**

```typescript
{
  selectedReason && (
    <TouchableOpacity onPress={handleContinue}>
      <Text>Continue</Text>
    </TouchableOpacity>
  );
}
```

### List/Grid Layouts

**SwiftUI:**

```swift
LazyVGrid(columns: columns, spacing: 16) {
    ForEach(facts, id: \.self) { fact in
        FactCard(fact: fact)
    }
}
```

**React Native:**

```typescript
<View style={styles.grid}>
  {facts.map((fact, index) => (
    <FactCard key={index} fact={fact} />
  ))}
</View>

// Or using FlatList for performance:
<FlatList
  data={facts}
  numColumns={2}
  renderItem={({ item }) => <FactCard fact={item} />}
  keyExtractor={(item, index) => index.toString()}
/>
```

## Question-Driven Prompts for AI Help

When you're stuck translating SwiftUI concepts, ask:

1. **Layout Questions**:

   - "How do I recreate SwiftUI VStack spacing behavior in React Native?"
   - "What's the React Native equivalent of SwiftUI .frame(maxWidth: .infinity)?"
   - "How do I center content vertically and horizontally like SwiftUI Spacer()?"

2. **Styling Questions**:

   - "How do I convert SwiftUI Color(red: X, green: Y, blue: Z) to React Native?"
   - "What's the React Native equivalent of SwiftUI .foregroundStyle()?"
   - "How do I create rounded corners like SwiftUI .cornerRadius()?"

3. **Component Questions**:

   - "How do I make a reusable component in React Native like SwiftUI Views?"
   - "What's the difference between TouchableOpacity and Pressable for buttons?"
   - "How do I handle button press states like SwiftUI button highlighting?"

4. **State Questions**:
   - "How do I share state between components in React Native?"
   - "What's the React Native equivalent of SwiftUI @Binding?"
   - "How do I trigger re-renders when state changes?"

## Google Search Queries

Use these when you need specific help:

- "swiftui vstack react native equivalent flexbox"
- "react native button custom styling touchableopacity"
- "swiftui color rgb to react native conversion"
- "react native navigation stack navigator setup"
- "flexbox justify content align items react native"
- "react native image resize mode fit contain"

## Documentation Links

**Core Concepts**:

- [React Native Flexbox](https://reactnative.dev/docs/flexbox) - Layout system
- [React Native StyleSheet](https://reactnative.dev/docs/stylesheet) - Styling guide
- [React Hooks](https://reactjs.org/docs/hooks-intro.html) - State management
- [React Native Components](https://reactnative.dev/docs/components-and-apis) - Built-in components

**Specific Components**:

- [View Component](https://reactnative.dev/docs/view) - Basic container
- [Text Component](https://reactnative.dev/docs/text) - Text display
- [Image Component](https://reactnative.dev/docs/image) - Image display
- [TouchableOpacity](https://reactnative.dev/docs/touchableopacity) - Button interactions

## Mental Model Summary

Think of the translation this way:

1. **SwiftUI Stacks → React Native Views with Flexbox**
2. **SwiftUI Modifiers → React Native Style Properties**
3. **SwiftUI @State → React Native useState**
4. **SwiftUI Navigation → React Navigation Screens**
5. **SwiftUI Colors → React Native Hex/RGBA Values**

## Validation Checklist

Make sure you understand:

- [x] How VStack/HStack translates to flexDirection
- [x] How to convert SwiftUI colors to React Native format
- [x] The difference between SwiftUI @State and React Native useState
- [x] How button interactions work with TouchableOpacity
- [x] Basic Flexbox layout properties (justifyContent, alignItems)

## What You've Learned

After this step, you understand:

- The conceptual mapping between SwiftUI and React Native
- How layout systems differ and translate
- State management patterns in both frameworks
- Basic component structure and styling approaches
- Navigation pattern differences

## Next Steps

In the next guide (`03-design-system-setup.md`), you'll:

- Create a comprehensive design system with exact color values
- Build reusable styled components
- Set up typography and spacing standards
- Create the foundation components you'll use for all screens

This knowledge will let you build consistent, maintainable components that match the SwiftUI design exactly.
