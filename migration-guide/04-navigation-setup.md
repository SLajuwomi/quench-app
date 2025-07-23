# Step 4: Navigation Setup

## Objective

Set up React Navigation to handle screen-to-screen navigation, matching the SwiftUI NavigationStack behavior. Create reusable navigation components and implement progress tracking across the 8 onboarding screens.

## Prerequisites

- Completed Steps 1-3 (Project setup, concepts, design system)
- React Navigation dependencies installed in Step 1
- Understanding of React Navigation vs SwiftUI NavigationStack

## Key Concepts You'll Learn

- **React Navigation Stack**: Screen navigation management
- **Navigation Parameters**: Passing data between screens
- **Custom Headers**: Hiding default headers and creating custom ones
- **Navigation State**: Managing navigation history and back button behavior
- **TypeScript with Navigation**: Type safety for screen parameters

## Step-by-Step Instructions

### 1. Create Navigation Types

First, create TypeScript types for your navigation structure:

**File: `types/navigation.ts`**

```typescript
// Define all the screens in your onboarding flow
export type OnboardingStackParamList = {
  Welcome: undefined; // No parameters needed
  MeetQuench: undefined;
  AvatarStates: undefined;
  ReasonSelection: undefined;
  DidYouKnow: undefined;
  CurrentWaterIntake: undefined;
  ImpactVisualization: undefined;
  GoalCalculation: undefined;
};

// Helper type for navigation prop
export type OnboardingScreenNames = keyof OnboardingStackParamList;

// Progress tracking (matches SwiftUI progress values)
export const SCREEN_PROGRESS: Record<OnboardingScreenNames, number> = {
  Welcome: 1,
  MeetQuench: 2,
  AvatarStates: 3,
  ReasonSelection: 4,
  DidYouKnow: 5,
  CurrentWaterIntake: 6,
  ImpactVisualization: 7,
  GoalCalculation: 8,
} as const;

export const TOTAL_SCREENS = 8;
```

**What this does**:

- Defines all screen names and their parameter types
- Creates progress tracking matching the SwiftUI version (1/8, 2/8, etc.)
- Provides type safety for navigation

### 2. Create Reusable Navigation Components

**File: `components/NavigationHeader.tsx`**

```typescript
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { layouts } from '../styles/components';
import { colors, spacing } from '../styles/theme';
import { OnboardingStackParamList } from '../types/navigation';
import ProgressBar from './ProgressBar';

type NavigationProps = StackNavigationProp<OnboardingStackParamList>;

interface NavigationHeaderProps {
  currentStep: number;
  totalSteps: number;
  showBackButton?: boolean;
}

const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  currentStep,
  totalSteps,
  showBackButton = true,
}) => {
  const navigation = useNavigation<NavigationProps>();

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View style={layouts.navigationContainer}>
      {/* Back Button - matches SwiftUI back button */}
      {showBackButton ? (
        <TouchableOpacity onPress={handleBackPress} style={backButtonStyle}>
          <Ionicons name="chevron-back" size={18} color={colors.gray} />
        </TouchableOpacity>
      ) : (
        <View style={backButtonStyle} />
      )}

      {/* Progress Bar - matches SwiftUI ProgressView */}
      <ProgressBar
        current={currentStep}
        total={totalSteps}
        style={{ flex: 1 }}
      />
    </View>
  );
};

const backButtonStyle = {
  width: 44, // Consistent touch target
  height: 44,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
};

export default NavigationHeader;
```

**What this does**:

- Creates a reusable header component matching SwiftUI's HStack layout
- Handles back button navigation automatically
- Integrates with the progress bar component
- Uses consistent styling from your design system

### 3. Create Progress Bar Component

**File: `components/ProgressBar.tsx`**

```typescript
import React from 'react';
import { View, ViewStyle } from 'react-native';
import { colors, spacing } from '../styles/theme';

interface ProgressBarProps {
  current: number;
  total: number;
  style?: ViewStyle;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, style }) => {
  const progress = current / total;

  return (
    <View style={[progressContainer, style]}>
      <View style={[progressBar, { width: `${progress * 100}%` }]} />
    </View>
  );
};

// Styles matching SwiftUI ProgressView
const progressContainer: ViewStyle = {
  height: 4,
  backgroundColor: `${colors.blueAccent}33`, // 20% opacity
  borderRadius: 2,
  overflow: 'hidden',
  // Scale effect matching SwiftUI .scaleEffect(x: 1, y: 0.8)
  transform: [{ scaleY: spacing.progressBarScale }],
};

const progressBar: ViewStyle = {
  height: '100%',
  backgroundColor: colors.blueAccent,
  borderRadius: 2,
};

export default ProgressBar;
```

**What this does**:

- Matches SwiftUI ProgressView styling exactly
- Calculates progress percentage automatically
- Applies the same scale transform as SwiftUI version

### 4. Create Screen Template Component

**File: `components/ScreenTemplate.tsx`**

```typescript
import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { layouts } from '../styles/components';
import NavigationHeader from './NavigationHeader';
import { TOTAL_SCREENS } from '../types/navigation';

interface ScreenTemplateProps {
  currentStep: number;
  showBackButton?: boolean;
  children: React.ReactNode;
  scrollable?: boolean;
}

const ScreenTemplate: React.FC<ScreenTemplateProps> = ({
  currentStep,
  showBackButton = true,
  children,
  scrollable = false,
}) => {
  const ContentWrapper = scrollable ? ScrollView : View;

  return (
    <SafeAreaView style={layouts.screenContainer}>
      {/* Navigation Header */}
      <NavigationHeader
        currentStep={currentStep}
        totalSteps={TOTAL_SCREENS}
        showBackButton={showBackButton}
      />

      {/* Screen Content */}
      <ContentWrapper
        style={layouts.mainContent}
        contentContainerStyle={scrollable ? { flexGrow: 1 } : undefined}
      >
        {children}
      </ContentWrapper>
    </SafeAreaView>
  );
};

export default ScreenTemplate;
```

**What this does**:

- Provides consistent layout structure for all screens
- Handles safe area automatically
- Supports both scrollable and fixed layouts
- Includes navigation header automatically

### 5. Set Up Navigation Container

**File: `navigation/OnboardingNavigator.tsx`**

```typescript
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../types/navigation';

// Import screens (we'll create these in the next guides)
import WelcomeScreen from '../screens/WelcomeScreen';
import MeetQuenchScreen from '../screens/MeetQuenchScreen';
// ... other imports will be added as we create screens

const Stack = createStackNavigator<OnboardingStackParamList>();

const OnboardingNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false, // Hide default header (matches SwiftUI .navigationBarHidden(true))
        gestureEnabled: true, // Enable swipe back gesture
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="MeetQuench" component={MeetQuenchScreen} />
      {/* More screens will be added as we create them */}
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;
```

**What this does**:

- Creates the main navigation structure
- Hides default headers (matching SwiftUI behavior)
- Enables gesture navigation for better UX

### 6. Update App.tsx with Navigation

**File: `App.tsx`**

```typescript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import OnboardingNavigator from './navigation/OnboardingNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <OnboardingNavigator />
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
```

**What this does**:

- Wraps the app with navigation context
- Provides safe area handling
- Sets up the main navigation flow

### 7. Create Placeholder Welcome Screen

**File: `screens/WelcomeScreen.tsx`**

```typescript
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList, SCREEN_PROGRESS } from '../types/navigation';
import ScreenTemplate from '../components/ScreenTemplate';
import { layouts, textStyles, buttons } from '../styles/components';

type WelcomeScreenNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'Welcome'
>;

interface Props {
  navigation: WelcomeScreenNavigationProp;
}

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const handleContinue = () => {
    navigation.navigate('MeetQuench');
  };

  return (
    <ScreenTemplate
      currentStep={SCREEN_PROGRESS.Welcome}
      showBackButton={false} // First screen has no back button
    >
      <View style={layouts.centeredContent}>
        <View style={layouts.textGroup}>
          <Text style={textStyles.welcomeHeading}>welcome to quench</Text>
          <Text style={textStyles.subtitle}>
            Your hydration buddy is ready to help you stay healthy
          </Text>
        </View>
      </View>

      <TouchableOpacity style={buttons.continueButton} onPress={handleContinue}>
        <Text style={buttons.continueButtonText}>continue</Text>
      </TouchableOpacity>
    </ScreenTemplate>
  );
};

export default WelcomeScreen;
```

**What this does**:

- Creates a basic welcome screen using your components
- Demonstrates navigation between screens
- Shows how to use the screen template

### 8. Create Placeholder Meet Quench Screen

**File: `screens/MeetQuenchScreen.tsx`**

```typescript
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList, SCREEN_PROGRESS } from '../types/navigation';
import ScreenTemplate from '../components/ScreenTemplate';
import { layouts, textStyles, buttons } from '../styles/components';

type MeetQuenchScreenNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'MeetQuench'
>;

interface Props {
  navigation: MeetQuenchScreenNavigationProp;
}

const MeetQuenchScreen: React.FC<Props> = ({ navigation }) => {
  const handleContinue = () => {
    // navigation.navigate('AvatarStates');  // Will add this screen next
    console.log('Continue to Avatar States');
  };

  return (
    <ScreenTemplate
      currentStep={SCREEN_PROGRESS.MeetQuench}
      showBackButton={true} // Has back button
    >
      <View style={layouts.centeredContent}>
        <View style={layouts.textGroup}>
          <Text style={textStyles.heading}>meet quench</Text>
          <Text style={textStyles.subtitle}>
            Your new hydration buddy will change based on how much water you
            drink
          </Text>
        </View>
      </View>

      <TouchableOpacity style={buttons.continueButton} onPress={handleContinue}>
        <Text style={buttons.continueButtonText}>continue</Text>
      </TouchableOpacity>
    </ScreenTemplate>
  );
};

export default MeetQuenchScreen;
```

### 9. Test Your Navigation

At this point, you should be able to:

1. See the Welcome screen with no back button and 1/8 progress
2. Tap Continue to go to Meet Quench screen
3. See the Meet Quench screen with back button and 2/8 progress
4. Tap the back button to return to Welcome screen
5. Navigation gestures should work (swipe from left edge)

## Question-Driven Prompts for AI Help

If you encounter issues, ask these specific questions:

1. **Navigation Setup**:

   - "How do I fix 'NavigationContainer' not found error in React Navigation?"
   - "Why is my Stack Navigator not showing screens properly?"
   - "How do I pass TypeScript types to React Navigation screens?"

2. **Component Issues**:

   - "How do I make a reusable header component with back button in React Navigation?"
   - "Why is my progress bar not updating when navigating between screens?"
   - "How do I hide the default header in React Navigation Stack?"

3. **Navigation Behavior**:

   - "How do I prevent going back on the first screen in React Navigation?"
   - "Why isn't my back button working in React Navigation Stack?"
   - "How do I enable swipe-to-go-back gestures?"

4. **TypeScript Issues**:
   - "How do I type React Navigation screen props with TypeScript?"
   - "What's the correct way to type navigation.navigate() parameters?"
   - "How do I fix TypeScript errors with React Navigation hooks?"

## Google Search Queries

Use these when you need additional help:

- "react navigation stack navigator setup typescript"
- "react navigation hide header custom header component"
- "react navigation back button custom implementation"
- "react navigation progress bar between screens"
- "react navigation gesture enabled swipe back"
- "react navigation typescript screen props types"

## Documentation Links

**React Navigation**:

- [React Navigation Getting Started](https://reactnavigation.org/docs/getting-started) - Basic setup
- [Stack Navigator](https://reactnavigation.org/docs/stack-navigator) - Stack navigation guide
- [Navigation Prop](https://reactnavigation.org/docs/navigation-prop) - Navigation methods and properties
- [TypeScript Guide](https://reactnavigation.org/docs/typescript) - TypeScript with React Navigation

**Component Documentation**:

- [SafeAreaView](https://reactnative.dev/docs/safeareaview) - Safe area handling
- [TouchableOpacity](https://reactnative.dev/docs/touchableopacity) - Button interactions
- [Ionicons](https://icons.expo.fyi/) - Icon library for Expo

## Common Issues and Solutions

### Issue: "NavigationContainer" not found

**Solution**: Make sure you imported `NavigationContainer` from `@react-navigation/native` and wrapped your navigator.

### Issue: Back button not working

**Solution**: Check that `navigation.canGoBack()` returns true and you're calling `navigation.goBack()` properly.

### Issue: Progress bar not updating

**Solution**: Ensure you're passing the correct `currentStep` prop and that `SCREEN_PROGRESS` values are correct.

### Issue: TypeScript errors with navigation props

**Solution**: Make sure your screen components receive the proper navigation prop type from `StackNavigationProp`.

### Issue: Screens not showing

**Solution**: Verify that all screen components are properly imported and added to the Stack.Navigator.

## Validation Checklist

Before proceeding to component foundation, verify:

- [x] Navigation between Welcome and Meet Quench screens works
- [x] Back button appears on Meet Quench but not Welcome
- [x] Progress bar shows 1/8 on Welcome, 2/8 on Meet Quench
- [x] Progress bar styling matches SwiftUI version
- [x] Swipe-back gesture works on supported devices
- [x] No TypeScript errors in navigation code
- [x] Screen template component layouts correctly

## What You've Learned

After completing this step, you understand:

- How to set up React Navigation Stack Navigator
- Creating reusable navigation components
- Progress tracking across multiple screens
- TypeScript integration with React Navigation
- Custom header implementation
- Navigation state management and back button handling

## Next Steps

In the next guide (`05-component-foundation.md`), you'll:

- Build reusable UI components (buttons, form inputs, cards)
- Create interactive components (sliders, radio buttons)
- Implement avatar display components
- Set up component prop interfaces with TypeScript

These foundation components will be used across all onboarding screens, ensuring consistency and reusability.
