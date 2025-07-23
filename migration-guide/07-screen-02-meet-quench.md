# Screen 2: Meet Quench Screen Migration

## Objective
Migrate the SwiftUI Meet Quench screen to React Native, implementing back button functionality, proper avatar sizing (120x120), and the hydration buddy introduction concept.

## Prerequisites
- Completed Screen 1 (Welcome Screen)
- Understanding of navigation between screens
- Familiarity with the ScreenTemplate component pattern

## Key Concepts You'll Learn
- **Back Button Integration**: Using navigation history for back functionality
- **Avatar Size Variants**: Implementing different avatar sizes across screens
- **Content Hierarchy**: Managing text content with proper typography
- **Screen Progress Tracking**: Implementing 2/8 progress indication

## SwiftUI Reference Analysis

**From `MeetQuenchView.swift`:**
```swift
VStack(spacing: 0) {
    // Navigation with back button and progress (2/8)
    HStack(spacing: 16) {
        Button(action: { navigationPath.removeLast() }) { ... }
        ProgressView(value: 2.0, total: 8.0) { ... }
    }
    
    Spacer()
    
    // Center content
    VStack(spacing: 24) {
        Image("quench-transparent-default")
            .resizable()
            .aspectRatio(contentMode: .fit)
            .frame(width: 120, height: 120)  // Smaller than welcome screen
        
        VStack(spacing: 12) {
            Text("meet quench")
                .font(.system(size: 28, weight: .bold, design: .default))
                .foregroundStyle(Color(red: 0.11, green: 0.11, blue: 0.12))
            
            Text("Your new hydration buddy will change based on how much water you drink")
                .font(.system(size: 17, weight: .regular, design: .default))
                .foregroundStyle(Color(red: 0.43, green: 0.43, blue: 0.45))
                .multilineTextAlignment(.center)
        }
    }
    
    Spacer()
    
    // Continue button
    VStack(spacing: 0) { ... }
}
```

## Step-by-Step Implementation

### 1. Create Meet Quench Screen

**File: `screens/MeetQuenchScreen.tsx`**

```typescript
import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList, SCREEN_PROGRESS } from '../types/navigation';
import { ScreenTemplate, Avatar, Button } from '../components';
import { layouts, textStyles } from '../styles/components';

type MeetQuenchScreenNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'MeetQuench'
>;

interface Props {
  navigation: MeetQuenchScreenNavigationProp;
}

const MeetQuenchScreen: React.FC<Props> = ({ navigation }) => {
  const handleContinue = () => {
    navigation.navigate('AvatarStates');
  };

  return (
    <ScreenTemplate 
      currentStep={SCREEN_PROGRESS.MeetQuench}
      showBackButton={true}  // Show back button (unlike Welcome screen)
    >
      {/* Center Content */}
      <View style={layouts.centeredContent}>
        <View style={layouts.contentSection}>
          {/* Avatar - 120x120 for non-welcome screens */}
          <Avatar 
            state="fully-hydrated" 
            size="other"  // Different from welcome screen
          />
          
          {/* Text Group */}
          <View style={layouts.textGroup}>
            <Text style={textStyles.heading}>meet quench</Text>
            <Text style={textStyles.subtitle}>
              Your new hydration buddy will change based on how much water you drink
            </Text>
          </View>
        </View>
      </View>

      {/* Continue Button */}
      <Button 
        title="continue"
        onPress={handleContinue}
        style={continueButtonStyle}
      />
    </ScreenTemplate>
  );
};

const continueButtonStyle = {
  marginHorizontal: 20,
  marginBottom: 34,
};

export default MeetQuenchScreen;
```

**What this code does**:
- Uses `ScreenTemplate` with `showBackButton={true}` to display navigation back button
- Uses `Avatar` with `size="other"` for 120x120 sizing (different from Welcome)
- Uses `textStyles.heading` (28pt) instead of `welcomeHeading` (32pt)
- Sets up navigation to the next screen (AvatarStates)

### 2. Update Navigation to Include Meet Quench Screen

**Update: `navigation/OnboardingNavigator.tsx`**

```typescript
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../types/navigation';

// Import screens
import WelcomeScreen from '../screens/WelcomeScreen';
import MeetQuenchScreen from '../screens/MeetQuenchScreen';
// AvatarStatesScreen will be added in next guide

const Stack = createStackNavigator<OnboardingStackParamList>();

const OnboardingNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="MeetQuench" component={MeetQuenchScreen} />
      {/* AvatarStates screen will be added next */}
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;
```

### 3. Test Navigation Flow

At this point, you should be able to:

1. **Navigation Forward**:
   - Start on Welcome screen
   - Tap "Continue" to go to Meet Quench screen
   - See progress bar update from 1/8 to 2/8

2. **Navigation Backward**:
   - Tap back button on Meet Quench screen
   - Return to Welcome screen
   - Progress bar shows 1/8 again

3. **Visual Differences**:
   - Meet Quench has back button, Welcome doesn't
   - Avatar is smaller (120x120 vs 180x180)
   - Heading is smaller (28pt vs 32pt)
   - Progress shows 2/8 instead of 1/8

### 4. Create Temporary Avatar States Placeholder

Since the Continue button tries to navigate to AvatarStates, create a temporary placeholder to prevent crashes:

**File: `screens/AvatarStatesScreen.tsx`**

```typescript
import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList, SCREEN_PROGRESS } from '../types/navigation';
import { ScreenTemplate } from '../components';
import { layouts, textStyles } from '../styles/components';

type AvatarStatesScreenNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'AvatarStates'
>;

interface Props {
  navigation: AvatarStatesScreenNavigationProp;
}

const AvatarStatesScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScreenTemplate 
      currentStep={SCREEN_PROGRESS.AvatarStates}
      showBackButton={true}
    >
      <View style={layouts.centeredContent}>
        <Text style={textStyles.heading}>Avatar States Screen</Text>
        <Text style={textStyles.subtitle}>
          Coming soon in the next guide!
        </Text>
      </View>
    </ScreenTemplate>
  );
};

export default AvatarStatesScreen;
```

**Add to navigation:**

```typescript
// Update OnboardingNavigator.tsx
import AvatarStatesScreen from '../screens/AvatarStatesScreen';

// Add to Stack.Navigator:
<Stack.Screen name="AvatarStates" component={AvatarStatesScreen} />
```

### 5. Validate Screen Differences

Compare the Meet Quench screen with Welcome screen to verify correct differences:

**Welcome Screen:**
- No back button
- 180x180 avatar
- 32pt heading font
- Progress: 1/8
- Title: "welcome to quench"

**Meet Quench Screen:**
- Has back button
- 120x120 avatar  
- 28pt heading font
- Progress: 2/8
- Title: "meet quench"

## Troubleshooting Common Issues

### Issue: Back button not working
**Debug Steps**:
1. Check that `ScreenTemplate` receives `showBackButton={true}`
2. Verify `NavigationHeader` component is properly implemented
3. Test `navigation.canGoBack()` returns `true`

**Debug with this code:**
```typescript
// Add to MeetQuenchScreen for debugging
console.log('Can go back:', navigation.canGoBack());
console.log('Navigation state:', navigation.getState());
```

### Issue: Avatar appears same size as Welcome screen
**Solution**: Verify you're using `size="other"` prop on Avatar component, not `size="welcome"`.

### Issue: Progress bar not updating
**Solution**: Check that `SCREEN_PROGRESS.MeetQuench` returns `2` and the progress calculation in `ProgressBar` component is correct.

### Issue: Navigation crashes when tapping Continue
**Solution**: Make sure `AvatarStatesScreen` is created and added to the navigator, even as a placeholder.

## Question-Driven Prompts for AI Help

For screen-specific issues:

1. **Navigation Issues**:
   - "How do I debug React Navigation back button not working?"
   - "Why does navigation.navigate() throw an error in React Navigation?"
   - "How do I check if navigation can go back in React Navigation?"

2. **Component Sizing**:
   - "How do I implement different avatar sizes in the same React Native component?"
   - "Why isn't my conditional styling working based on component props?"
   - "How do I debug component size changes in React Native?"

3. **Screen Layout**:
   - "How do I ensure consistent spacing between different screens?"
   - "Why does my text look different between screens with same style?"
   - "How do I validate React Native screen layouts match SwiftUI design?"

4. **Progress Tracking**:
   - "How do I implement progress tracking across multiple screens?"
   - "Why isn't my progress bar updating between navigation screens?"
   - "How do I pass screen progress data to navigation components?"

## Google Search Queries

For additional help:
- "react navigation back button custom implementation"
- "react native avatar component different sizes same component"
- "react navigation screen progress tracking multiple screens"
- "react native conditional component props typescript"
- "react navigation debugging navigation state issues"

## Documentation Links

**Navigation References**:
- [React Navigation Back Button](https://reactnavigation.org/docs/custom-android-back-button-handling) - Custom back behavior
- [React Navigation Gestures](https://reactnavigation.org/docs/stack-navigator#gesturesenabled) - Gesture navigation
- [React Navigation State](https://reactnavigation.org/docs/navigation-state) - Navigation state management

**Component References**:
- [Conditional Rendering in React](https://reactjs.org/docs/conditional-rendering.html) - Conditional UI patterns
- [React Native Props](https://reactnative.dev/docs/props) - Component props patterns

## Visual Validation Checklist

Compare your Meet Quench screen with the SwiftUI version:

- [ ] **Background**: Same light blue (#E5F2FF) as Welcome
- [ ] **Progress**: Shows 2/8 (25%) with blue progress bar
- [ ] **Back Button**: Visible in top-left with gray chevron icon
- [ ] **Avatar**: 120x120 pixels (smaller than Welcome's 180x180)
- [ ] **Title**: "meet quench" in 28pt bold (smaller than Welcome's 32pt)
- [ ] **Subtitle**: Multi-line text about hydration buddy, properly centered
- [ ] **Spacing**: Same 24pt between avatar and text group, 12pt between title and subtitle
- [ ] **Button**: Identical styling to Welcome screen button
- [ ] **Navigation**: Back button works, Continue progresses forward

## Performance Notes

### Navigation Performance
- React Navigation stack navigator efficiently manages screen transitions
- Back button uses native navigation history, not custom state management
- Gesture navigation provides smooth user experience

### Component Reuse
- Avatar component efficiently handles size variants
- ScreenTemplate provides consistent structure without duplication
- Text styles are reused from design system

## What You've Accomplished

After completing this screen, you have:
- Implemented proper back button functionality
- Successfully used different avatar sizes on different screens
- Applied typography hierarchy correctly (28pt vs 32pt headings)
- Created smooth navigation between multiple screens
- Maintained exact visual consistency with SwiftUI design

## Next Steps

In the next guide (`08-screen-03-avatar-states.md`), you'll:
- Build an interactive screen with a slider component
- Implement real-time avatar state changes
- Handle dynamic content based on slider values
- Create color-coded feedback text
- Work with more complex state management

This Meet Quench screen establishes the pattern for all subsequent screens: proper navigation, consistent component usage, and exact SwiftUI visual matching.