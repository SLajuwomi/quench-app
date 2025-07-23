# Screen 3: Avatar States Screen Migration

## Objective
Migrate the SwiftUI Avatar States screen to React Native, implementing an interactive slider that changes the avatar's appearance in real-time based on hydration levels. This screen introduces complex state management and dynamic visual feedback.

## Prerequisites
- Completed Screens 1-2 (Welcome and Meet Quench)
- Understanding of React Native state management with useState
- Familiarity with the Slider component from foundation components

## Key Concepts You'll Learn
- **Interactive Sliders**: Implementing real-time value changes
- **Dynamic Avatar States**: Changing avatar based on numeric values
- **Range-Based State Logic**: Using ranges instead of exact values (avoiding floating-point precision issues)
- **Color-Coded Feedback**: Dynamic text colors based on hydration level
- **Complex State Management**: Managing slider value and derived states

## SwiftUI Reference Analysis

**From `AvatarStatesView.swift`:**
```swift
@State private var hydrationLevel: Double = 1.0

VStack(spacing: 24) {
    Image(avatarImageName)  // Dynamic based on hydrationLevel
        .resizable()
        .aspectRatio(contentMode: .fit)
        .frame(width: 120, height: 120)
    
    VStack(spacing: 12) {
        Text("avatar states")
            .font(.system(size: 28, weight: .bold, design: .default))
        
        Text(hydrationLevelText)  // Dynamic text based on level
            .font(.system(size: 17, weight: .regular, design: .default))
            .foregroundStyle(hydrationLevelColor)  // Dynamic color
    }
    
    VStack(spacing: 16) {
        Slider(value: $hydrationLevel, in: 0.0...1.0)
            .tint(Color(red: 0.0, green: 0.48, blue: 1.0))
        
        HStack {
            Text("0%").font(.system(size: 13))
            Spacer()
            Text("100%").font(.system(size: 13))
        }
    }
}

// Avatar state logic using ranges (not exact matches)
private var avatarImageName: String {
    switch hydrationLevel {
    case 0.9...1.0: return "quench-transparent-default"
    case 0.7..<0.9: return "quench-avatar-down-10"
    case 0.5..<0.7: return "quench-avatar-down-20"
    case 0.3..<0.5: return "quench-avatar-down-40"
    case 0.1..<0.3: return "quench-dehydrsted-down-80"
    default: return "quench-avatar-60-dehydrated"
    }
}
```

## Step-by-Step Implementation

### 1. Update Avatar Component for Range-Based States

First, update the Avatar component to handle numeric hydration levels:

**Update: `components/Avatar.tsx`**

```typescript
import React from 'react';
import { Image, ImageStyle, View, ViewStyle } from 'react-native';
import { avatars } from '../styles/components';

export type AvatarState = 
  | 'fully-hydrated'          // 0.9-1.0
  | 'slightly-thirsty'        // 0.7-0.89
  | 'getting-thirsty'         // 0.5-0.69
  | 'quite-thirsty'           // 0.3-0.49
  | 'very-thirsty'            // 0.1-0.29
  | 'severely-dehydrated';    // 0.0-0.09

export type AvatarSize = 'welcome' | 'other';

interface AvatarProps {
  state?: AvatarState;
  hydrationLevel?: number;  // New prop for numeric level
  size: AvatarSize;
  style?: ViewStyle;
}

// Avatar image mapping
const AVATAR_IMAGES: Record<AvatarState, any> = {
  'fully-hydrated': require('../assets/avatar-states/quench-transparent-default.png'),
  'slightly-thirsty': require('../assets/avatar-states/quench-avatar-down-10.png'),
  'getting-thirsty': require('../assets/avatar-states/quench-avatar-down-20.png'),
  'quite-thirsty': require('../assets/avatar-states/quench-avatar-down-40.png'),
  'very-thirsty': require('../assets/avatar-states/quench-dehydrsted-down-80.png'),
  'severely-dehydrated': require('../assets/avatar-states/quench-avatar-60-dehydrated.png'),
};

// Convert hydration level (0-1) to avatar state using ranges
const getAvatarStateFromLevel = (level: number): AvatarState => {
  if (level >= 0.9) return 'fully-hydrated';
  if (level >= 0.7) return 'slightly-thirsty';
  if (level >= 0.5) return 'getting-thirsty';
  if (level >= 0.3) return 'quite-thirsty';
  if (level >= 0.1) return 'very-thirsty';
  return 'severely-dehydrated';
};

const Avatar: React.FC<AvatarProps> = ({ 
  state,
  hydrationLevel,
  size, 
  style 
}) => {
  // Use hydrationLevel if provided, otherwise use state
  const avatarState = hydrationLevel !== undefined 
    ? getAvatarStateFromLevel(hydrationLevel)
    : (state || 'fully-hydrated');
    
  const avatarSize = size === 'welcome' ? avatars.welcome : avatars.other;
  
  return (
    <View style={[avatarContainer, avatarSize, style]}>
      <Image
        source={AVATAR_IMAGES[avatarState]}
        style={avatarImage}
        resizeMode="contain"
      />
    </View>
  );
};

const avatarContainer: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

const avatarImage: ImageStyle = {
  width: '100%',
  height: '100%',
};

export default Avatar;
```

**What this does**:
- Adds `hydrationLevel` prop that takes numeric values (0-1)
- Implements range-based state logic matching SwiftUI (avoids floating-point precision issues)
- Maintains backward compatibility with string-based `state` prop

### 2. Create Avatar States Screen

**File: `screens/AvatarStatesScreen.tsx`**

```typescript
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList, SCREEN_PROGRESS } from '../types/navigation';
import { ScreenTemplate, Avatar, Button, Slider } from '../components';
import { layouts, textStyles } from '../styles/components';
import { colors } from '../styles/theme';

type AvatarStatesScreenNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'AvatarStates'
>;

interface Props {
  navigation: AvatarStatesScreenNavigationProp;
}

const AvatarStatesScreen: React.FC<Props> = ({ navigation }) => {
  // State management - start at fully hydrated
  const [hydrationLevel, setHydrationLevel] = useState<number>(1.0);

  const handleContinue = () => {
    navigation.navigate('ReasonSelection');
  };

  // Get dynamic text based on hydration level
  const getHydrationText = (level: number): string => {
    if (level >= 0.9) return "Fully hydrated and feeling great!";
    if (level >= 0.7) return "Slightly thirsty, but doing well";
    if (level >= 0.5) return "Getting thirsty, time for some water";
    if (level >= 0.3) return "Quite thirsty, definitely need water";
    if (level >= 0.1) return "Very thirsty, please drink water soon";
    return "Severely dehydrated, drink water immediately!";
  };

  // Get dynamic color based on hydration level
  const getHydrationColor = (level: number): string => {
    if (level >= 0.7) return colors.blueAccent;    // Blue for good hydration
    if (level >= 0.3) return '#FF9500';            // Orange for moderate dehydration
    return '#FF3B30';                              // Red for severe dehydration
  };

  // Format slider value for display (0-100%)
  const formatSliderValue = (value: number): string => {
    return `${Math.round(value * 100)}%`;
  };

  return (
    <ScreenTemplate 
      currentStep={SCREEN_PROGRESS.AvatarStates}
      showBackButton={true}
    >
      {/* Center Content */}
      <View style={layouts.centeredContent}>
        <View style={layouts.contentSection}>
          {/* Dynamic Avatar based on hydration level */}
          <Avatar 
            hydrationLevel={hydrationLevel}
            size="other"
          />
          
          {/* Text Group with dynamic content */}
          <View style={layouts.textGroup}>
            <Text style={textStyles.heading}>avatar states</Text>
            <Text style={[
              textStyles.subtitle,
              { color: getHydrationColor(hydrationLevel) }  // Dynamic color
            ]}>
              {getHydrationText(hydrationLevel)}
            </Text>
          </View>
          
          {/* Interactive Slider */}
          <View style={sliderSection}>
            <Slider
              value={hydrationLevel}
              onValueChange={setHydrationLevel}
              minimumValue={0}
              maximumValue={1}
              step={0.01}  // Smooth sliding
              formatValue={formatSliderValue}
              style={sliderStyle}
            />
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

// Styles for slider section
const sliderSection = {
  width: '100%',
  paddingHorizontal: 20,
};

const sliderStyle = {
  marginTop: 16,
};

const continueButtonStyle = {
  marginHorizontal: 20,
  marginBottom: 34,
};

export default AvatarStatesScreen;
```

**What this code does**:
- Uses `useState` to manage slider value with real-time updates
- Implements dynamic avatar changes based on `hydrationLevel` prop
- Creates color-coded feedback text that changes with hydration level
- Uses smooth slider with percentage display
- Matches SwiftUI range-based logic for avatar state determination

### 3. Install Required Slider Dependency

Since we're using the community slider component:

```bash
# From your quench-react-native directory
npm install @react-native-community/slider
```

**If on iOS, also run:**
```bash
cd ios && pod install && cd ..
```

### 4. Update Slider Component for Better UX

**Update: `components/Slider.tsx`** (enhance the existing component)

```typescript
import React from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import SliderComponent from '@react-native-community/slider';
import { colors, spacing, typography } from '../styles/theme';

interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue: number;
  maximumValue: number;
  step?: number;
  label?: string;
  formatValue?: (value: number) => string;
  showRangeLabels?: boolean;
  style?: ViewStyle;
}

const Slider: React.FC<SliderProps> = ({
  value,
  onValueChange,
  minimumValue,
  maximumValue,
  step = 1,
  label,
  formatValue,
  showRangeLabels = true,
  style,
}) => {
  const displayValue = formatValue ? formatValue(value) : value.toString();

  return (
    <View style={[sliderContainer, style]}>
      {label && (
        <Text style={sliderLabel}>{label}</Text>
      )}
      
      <SliderComponent
        style={sliderStyle}
        value={value}
        onValueChange={onValueChange}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        minimumTrackTintColor={colors.blueAccent}
        maximumTrackTintColor={`${colors.blueAccent}33`}
        thumbTintColor={colors.blueAccent}
        trackStyle={trackStyle}
        thumbStyle={thumbStyle}
      />
      
      {showRangeLabels && (
        <View style={rangeLabels}>
          <Text style={rangeLabel}>{formatValue ? formatValue(minimumValue) : minimumValue}</Text>
          <Text style={rangeLabel}>{formatValue ? formatValue(maximumValue) : maximumValue}</Text>
        </View>
      )}
    </View>
  );
};

// Styles (same as before but with better spacing)
const sliderContainer: ViewStyle = {
  width: '100%',
  alignItems: 'center',
  gap: spacing.md,
};

const sliderLabel: TextStyle = {
  ...typography.subtitle,
  color: colors.darkText,
  marginBottom: spacing.sm,
};

const sliderStyle: ViewStyle = {
  width: '100%',
  height: 40,
};

const trackStyle: ViewStyle = {
  height: 4,
  borderRadius: 2,
};

const thumbStyle: ViewStyle = {
  width: 24,
  height: 24,
  borderRadius: 12,
  backgroundColor: colors.blueAccent,
  shadowColor: colors.darkText,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 4,
};

const rangeLabels: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  paddingHorizontal: spacing.sm,
};

const rangeLabel: TextStyle = {
  ...typography.caption,
  color: colors.lightText,
};

export default Slider;
```

### 5. Update Navigation and Create Placeholder

**Update: `navigation/OnboardingNavigator.tsx`**

```typescript
import AvatarStatesScreen from '../screens/AvatarStatesScreen';
// ... other imports

// Add to Stack.Navigator:
<Stack.Screen name="AvatarStates" component={AvatarStatesScreen} />
```

**Create placeholder for next screen:**

**File: `screens/ReasonSelectionScreen.tsx`**

```typescript
import React from 'react';
import { View, Text } from 'react-native';
import { ScreenTemplate } from '../components';
import { SCREEN_PROGRESS } from '../types/navigation';
import { layouts, textStyles } from '../styles/components';

const ReasonSelectionScreen: React.FC = () => {
  return (
    <ScreenTemplate 
      currentStep={SCREEN_PROGRESS.ReasonSelection}
      showBackButton={true}
    >
      <View style={layouts.centeredContent}>
        <Text style={textStyles.heading}>Reason Selection</Text>
        <Text style={textStyles.subtitle}>Coming soon in next guide!</Text>
      </View>
    </ScreenTemplate>
  );
};

export default ReasonSelectionScreen;
```

### 6. Test Interactive Functionality

Your Avatar States screen should now:

1. **Interactive Slider**:
   - Slide from 0% to 100%
   - Show percentage in range labels
   - Smooth movement with blue styling

2. **Dynamic Avatar**:
   - Start as fully hydrated (blue/healthy avatar)
   - Change to progressively more dehydrated states as you slide left
   - Use exact same state ranges as SwiftUI version

3. **Color-Coded Text**:
   - Blue text for good hydration (70%+)
   - Orange text for moderate dehydration (30-69%)
   - Red text for severe dehydration (0-29%)

4. **Real-Time Updates**:
   - Avatar, text, and colors change instantly as you drag slider
   - No lag or performance issues

## Troubleshooting Common Issues

### Issue: Slider not installing properly
**Solutions**:
1. Run `npm install @react-native-community/slider` again
2. For iOS: `cd ios && pod install && cd ..`
3. Restart Metro bundler: `npx expo start --clear`
4. Restart your simulator/device

### Issue: Avatar not changing with slider
**Debug Steps**:
1. Add `console.log('Hydration level:', hydrationLevel)` in component
2. Verify `getAvatarStateFromLevel` function logic
3. Check that Avatar component receives `hydrationLevel` prop

### Issue: Colors not matching SwiftUI
**Solution**: Verify your color constants match the SwiftUI RGB values exactly:
- Blue: `#007AFF` (SwiftUI blue accent)
- Orange: `#FF9500` (iOS orange)  
- Red: `#FF3B30` (iOS red)

### Issue: Slider thumb not visible
**Solution**: Add explicit `backgroundColor` and shadow styling to `thumbStyle` in Slider component.

## Question-Driven Prompts for AI Help

For complex interactive components:

1. **State Management**:
   - "How do I handle real-time state updates with React Native sliders?"
   - "Why isn't my React component re-rendering when state changes?"
   - "How do I optimize React Native performance with frequent state updates?"

2. **Dynamic Components**:
   - "How do I change React Native Image source based on numeric values?"
   - "How do I implement range-based logic in React Native components?"
   - "Why are my conditional styles not updating in React Native?"

3. **Slider Issues**:
   - "How do I fix React Native Community Slider installation issues?"
   - "Why isn't my React Native slider thumb visible or styled correctly?"
   - "How do I format slider values for display in React Native?"

4. **Performance**:
   - "How do I prevent performance issues with high-frequency React Native updates?"
   - "Should I debounce React Native slider onChange events?"
   - "How do I optimize React Native image switching performance?"

## Google Search Queries

For additional help:
- "react native community slider installation troubleshooting"
- "react native dynamic image source based on state value"
- "react native slider real time state updates performance"
- "react native conditional styling based on numeric values"
- "react native avatar component state management best practices"

## Documentation Links

**Interactive Components**:
- [React Native Community Slider](https://github.com/callstack/react-native-slider) - Slider component docs
- [React State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html) - State management patterns
- [React Native Performance](https://reactnative.dev/docs/performance) - Optimization techniques

**Component Updates**:
- [React Native Image](https://reactnative.dev/docs/image) - Dynamic image sources
- [React Conditional Rendering](https://reactjs.org/docs/conditional-rendering.html) - Conditional UI patterns

## Visual Validation Checklist

Compare with SwiftUI AvatarStatesView:

- [ ] **Progress**: Shows 3/8 (37.5%) 
- [ ] **Avatar**: 120x120 size, changes based on slider position
- [ ] **Title**: "avatar states" in 28pt bold
- [ ] **Subtitle**: Dynamic text with color-coded feedback
- [ ] **Slider**: Blue styling, smooth movement, 0-100% labels
- [ ] **State Ranges**: 
  - 90-100%: Fully hydrated (blue text, healthy avatar)
  - 70-89%: Slightly thirsty (blue text, slight dehydration)
  - 50-69%: Getting thirsty (orange text, moderate dehydration)
  - 30-49%: Quite thirsty (orange text, more dehydration)
  - 10-29%: Very thirsty (red text, severe dehydration)
  - 0-9%: Severely dehydrated (red text, most dehydrated avatar)

## What You've Accomplished

After completing this screen, you have:
- Implemented complex interactive state management
- Created real-time visual feedback with dynamic content
- Handled range-based logic avoiding floating-point precision issues  
- Built a sophisticated UI matching SwiftUI interactivity
- Successfully integrated community slider component

## Next Steps

In the next guide (`09-screen-04-reason-selection.md`), you'll:
- Implement radio button selection functionality
- Handle single-choice option selection
- Create custom radio button styling
- Manage form validation (continue button disabled until selection)
- Work with array-based options and selection state

This Avatar States screen demonstrates advanced React Native patterns that will be valuable for all remaining interactive screens.