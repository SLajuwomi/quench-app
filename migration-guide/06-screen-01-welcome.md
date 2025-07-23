# Screen 1: Welcome Screen Migration

## Objective
Migrate the SwiftUI Welcome screen to React Native, implementing the exact visual design and functionality. This screen serves as the entry point to the onboarding flow with a large avatar, welcome message, and continue button.

## Prerequisites
- Completed Steps 1-5 (Setup through component foundation)
- Avatar images copied to React Native assets folder
- Understanding of the ScreenTemplate component

## Key Concepts You'll Learn
- **Screen Implementation**: Building complete screens using foundation components
- **Asset Management**: Using images in React Native
- **Screen-Specific Styling**: Customizing components for specific screen needs
- **Navigation Integration**: Connecting screens with navigation actions

## SwiftUI Reference Analysis

**From `ContentView.swift`:**
```swift
VStack(spacing: 0) {
    // Navigation (back button + progress)
    HStack(spacing: 16) { ... }
    
    Spacer()
    
    // Center content
    VStack(spacing: 24) {
        Image("quench-transparent-default")
            .resizable()
            .aspectRatio(contentMode: .fit)
            .frame(width: 180, height: 180)
        
        VStack(spacing: 12) {
            Text("welcome to quench")
                .font(.system(size: 32, weight: .bold, design: .default))
                .foregroundStyle(Color(red: 0.11, green: 0.11, blue: 0.12))
            
            Text("Your hydration buddy is ready to help you stay healthy")
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

### 1. Copy Avatar Assets

First, copy your avatar images to the React Native project:

```bash
# From your quench-react-native directory
mkdir -p assets/avatar-states
cp ../assets/avatar-states/*.png assets/avatar-states/
```

**What this does**: Makes the SwiftUI avatar images available to your React Native project.

### 2. Update Avatar Component Image Paths

**Update: `components/Avatar.tsx`**

```typescript
// Update the AVATAR_IMAGES mapping to use correct paths
const AVATAR_IMAGES: Record<AvatarState, any> = {
  'fully-hydrated': require('../assets/avatar-states/quench-transparent-default.png'),
  'slightly-thirsty': require('../assets/avatar-states/quench-avatar-down-10.png'),
  'getting-thirsty': require('../assets/avatar-states/quench-avatar-down-20.png'),
  'quite-thirsty': require('../assets/avatar-states/quench-avatar-down-40.png'),
  'very-thirsty': require('../assets/avatar-states/quench-dehydrsted-down-80.png'),
  'severely-dehydrated': require('../assets/avatar-states/quench-avatar-60-dehydrated.png'),
};
```

### 3. Create Welcome Screen

**File: `screens/WelcomeScreen.tsx`**

```typescript
import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList, SCREEN_PROGRESS } from '../types/navigation';
import { ScreenTemplate, Avatar, Button } from '../components';
import { layouts, textStyles } from '../styles/components';

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
      showBackButton={false}  // First screen has no back button
    >
      {/* Center Content - matches SwiftUI VStack with Spacers */}
      <View style={layouts.centeredContent}>
        <View style={layouts.contentSection}>
          {/* Avatar - 180x180 for welcome screen */}
          <Avatar 
            state="fully-hydrated" 
            size="welcome"
          />
          
          {/* Text Group - matches SwiftUI VStack(spacing: 12) */}
          <View style={layouts.textGroup}>
            <Text style={textStyles.welcomeHeading}>welcome to quench</Text>
            <Text style={textStyles.subtitle}>
              Your hydration buddy is ready to help you stay healthy
            </Text>
          </View>
        </View>
      </View>

      {/* Continue Button - positioned at bottom */}
      <Button 
        title="continue"
        onPress={handleContinue}
        style={continueButtonStyle}
      />
    </ScreenTemplate>
  );
};

// Custom styling for this screen's continue button positioning
const continueButtonStyle = {
  marginHorizontal: 20,
  marginBottom: 34,
};

export default WelcomeScreen;
```

**What this code does**:
- Uses `ScreenTemplate` for consistent layout and navigation
- Implements the exact content structure from SwiftUI
- Uses `Avatar` component with "welcome" size (180x180)
- Applies consistent text styling from the design system
- Handles navigation to the next screen

### 4. Update Navigation to Include Welcome Screen

**Update: `navigation/OnboardingNavigator.tsx`**

```typescript
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../types/navigation';

// Import screens
import WelcomeScreen from '../screens/WelcomeScreen';
import MeetQuenchScreen from '../screens/MeetQuenchScreen';
// ... other imports will be added as we create screens

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
      {/* More screens will be added in subsequent guides */}
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;
```

### 5. Test Your Welcome Screen

At this point, you should be able to:

1. **Visual Verification**:
   - Light blue background matching SwiftUI
   - Avatar displays at 180x180 size
   - Welcome heading at 32pt with correct color
   - Subtitle text properly centered and styled
   - Continue button positioned at bottom with proper styling

2. **Functionality**:
   - No back button visible (first screen)
   - Progress bar shows 1/8 (12.5%)
   - Continue button navigates to Meet Quench screen
   - Screen layout matches SwiftUI spacing

3. **Compare with SwiftUI**:
   - Side-by-side comparison should show identical layouts
   - Colors should match exactly
   - Typography hierarchy should be consistent
   - Button styling should be identical

## Troubleshooting Common Issues

### Issue: Avatar image not displaying
**Solutions**:
1. Verify image files are in `assets/avatar-states/` directory
2. Check image file names match exactly (case-sensitive)
3. Try using a different image format (PNG recommended)
4. Check React Native packager has restarted after adding assets

**Debug with this code:**
```typescript
// Add this to see if images are loading
console.log('Avatar image:', AVATAR_IMAGES['fully-hydrated']);
```

### Issue: Text not centered properly
**Solution**: Check that `layouts.textGroup` includes `alignItems: 'center'` and text components use `textAlign: 'center'`.

### Issue: Continue button not positioned correctly
**Solution**: Verify the `ScreenTemplate` component positions the button at the bottom and applies proper margins.

### Issue: Colors don't match SwiftUI
**Solution**: Double-check RGB to hex conversion in your color system. Use a color picker to compare exact values.

## Question-Driven Prompts for AI Help

If you encounter specific issues:

1. **Image Loading**:
   - "How do I debug React Native image loading issues with require()?"
   - "Why aren't my local images showing up in React Native components?"
   - "What image formats work best with React Native require()?"

2. **Layout Issues**:
   - "How do I center content vertically in React Native like SwiftUI Spacer?"
   - "Why is my text not centering properly in React Native View?"
   - "How do I match exact spacing between components from SwiftUI design?"

3. **Styling Problems**:
   - "How do I apply multiple text styles in React Native components?"
   - "Why don't my React Native colors match my SwiftUI colors exactly?"
   - "How do I create consistent button positioning across screens?"

4. **Navigation**:
   - "How do I pass navigation props to screen components in React Navigation?"
   - "Why isn't my navigation.navigate() working in React Navigation?"
   - "How do I handle navigation without back button on first screen?"

## Google Search Queries

For additional help:
- "react native image require assets not loading"
- "react native center content vertically horizontally flexbox"
- "react navigation stack navigator screen props typescript"
- "react native text styling multiple fonts sizes"
- "react native button positioning bottom screen"

## Documentation Links

**Essential References**:
- [React Native Image](https://reactnative.dev/docs/image) - Image component documentation
- [React Native Text](https://reactnative.dev/docs/text) - Text styling options
- [React Native Flexbox](https://reactnative.dev/docs/flexbox) - Layout system
- [React Navigation Screen Props](https://reactnavigation.org/docs/screen-options) - Screen component props

## Visual Validation Checklist

Compare your React Native screen with the SwiftUI version:

- [ ] **Background**: Light blue (#E5F2FF) fills entire screen
- [ ] **Progress**: Shows 1/8 (12.5%) with blue color
- [ ] **No Back Button**: Navigation area shows progress bar only
- [ ] **Avatar**: 180x180 pixels, centered, fully hydrated state
- [ ] **Title**: "welcome to quench" in 32pt bold, dark text
- [ ] **Subtitle**: Properly wrapped, 17pt regular, light gray text
- [ ] **Spacing**: Avatar to text group is 24pt, title to subtitle is 12pt
- [ ] **Button**: Blue background, white text, proper bottom positioning
- [ ] **Safe Areas**: Content doesn't overlap with status bar or home indicator

## Performance Considerations

### Image Optimization
- Use PNG format for avatar images with transparency
- Keep image file sizes reasonable (under 100KB each)
- Consider using different image densities for different screen sizes

### Component Performance
- Avatar component is stateless and efficient
- Text components are lightweight
- Button uses TouchableOpacity for good performance

## What You've Accomplished

After completing this screen, you have:
- Successfully migrated your first SwiftUI screen to React Native
- Implemented proper image asset management
- Applied your design system consistently
- Created a pixel-perfect match of the SwiftUI layout
- Integrated navigation functionality

## Next Steps

In the next guide (`07-screen-02-meet-quench.md`), you'll:
- Build the second onboarding screen with back button functionality
- Implement 120x120 avatar sizing for non-welcome screens
- Practice using the screen template pattern
- Add more complex text content with proper formatting

This foundation screen serves as the template for all subsequent screens, ensuring consistency across your entire onboarding flow.