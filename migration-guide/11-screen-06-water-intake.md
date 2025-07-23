# Screen 6: Current Water Intake Screen Migration

## Objective
Migrate the SwiftUI Current Water Intake screen to React Native, implementing an interactive slider with dynamic large number display, proper grammar handling (singular/plural), and color-coded encouraging feedback based on intake levels.

## Prerequisites
- Completed Screens 1-5 (Welcome through Did You Know)
- Understanding of dynamic text formatting and conditional rendering
- Familiarity with Slider component and state management

## Key Concepts You'll Learn
- **Large Number Display**: Prominent numeric feedback (48pt font)
- **Dynamic Text Formatting**: Handling singular/plural grammar ("1 cup" vs "2 cups")
- **Color-Coded Feedback**: Dynamic colors and messages based on numeric ranges
- **Non-Judgmental Messaging**: Encouraging feedback regardless of current intake
- **Precise Slider Control**: Integer steps with range 0-12

## SwiftUI Reference Analysis

**From `CurrentWaterIntakeView.swift`:**
```swift
@State private var currentIntake: Double = 2.0

VStack(spacing: 24) {
    VStack(spacing: 12) {
        Text("how much water do you drink daily?")
            .font(.system(size: 28, weight: .bold, design: .default))
        
        Text("Be honest - this helps us personalize your experience")
            .font(.system(size: 17, weight: .regular, design: .default))
    }
    
    VStack(spacing: 16) {
        // Large number display
        Text("\(Int(currentIntake)) \(currentIntake == 1 ? "cup" : "cups")")
            .font(.system(size: 48, weight: .bold, design: .default))
            .foregroundStyle(intakeColor)
        
        // Dynamic encouraging message
        Text(intakeMessage)
            .font(.system(size: 17, weight: .regular, design: .default))
            .foregroundStyle(intakeColor)
        
        // Slider (0-12 range)
        Slider(value: $currentIntake, in: 0...12, step: 1)
            .tint(Color(red: 0.0, green: 0.48, blue: 1.0))
    }
}

// Dynamic feedback based on intake level (non-judgmental)
private var intakeMessage: String {
    switch Int(currentIntake) {
    case 0: return "Every journey starts with a single sip"
    case 1...3: return "A great start - every drop counts!"
    case 4...6: return "You're on your way to better hydration"
    case 7...9: return "Excellent hydration habits!"
    default: return "Wow! You're a hydration champion!"
    }
}

// Color coding: gray -> blue transition
private var intakeColor: Color {
    return currentIntake >= 4 ? 
        Color(red: 0.0, green: 0.48, blue: 1.0) : 
        Color(red: 0.43, green: 0.43, blue: 0.45)
}
```

## Step-by-Step Implementation

### 1. Create Typography Style for Large Numbers

First, add a large number style to your typography system:

**Update: `styles/theme/typography.ts`**

```typescript
export const typography = {
  // ... existing styles ...
  
  // Large numbers (for current water intake display)
  largeNumber: {
    fontSize: 48,
    fontWeight: 'bold' as TextStyle['fontWeight'],
    textAlign: 'center' as TextStyle['textAlign'],
    lineHeight: 56, // Slightly larger line height for big numbers
  },
} as const;
```

### 2. Create Current Water Intake Screen

**File: `screens/CurrentWaterIntakeScreen.tsx`**

```typescript
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList, SCREEN_PROGRESS } from '../types/navigation';
import { ScreenTemplate, Button, Slider } from '../components';
import { layouts, textStyles } from '../styles/components';
import { colors, typography } from '../styles/theme';

type CurrentWaterIntakeScreenNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'CurrentWaterIntake'
>;

interface Props {
  navigation: CurrentWaterIntakeScreenNavigationProp;
}

const CurrentWaterIntakeScreen: React.FC<Props> = ({ navigation }) => {
  // State management - start at 2 cups (reasonable default)
  const [currentIntake, setCurrentIntake] = useState<number>(2);

  const handleContinue = () => {
    navigation.navigate('ImpactVisualization');
  };

  // Format intake display with proper grammar
  const formatIntakeDisplay = (intake: number): string => {
    if (intake === 1) {
      return `${intake} cup`;
    }
    return `${intake} cups`;
  };

  // Get encouraging message based on intake level (non-judgmental)
  const getIntakeMessage = (intake: number): string => {
    switch (intake) {
      case 0:
        return "Every journey starts with a single sip";
      case 1:
      case 2:
      case 3:
        return "A great start - every drop counts!";
      case 4:
      case 5:
      case 6:
        return "You're on your way to better hydration";
      case 7:
      case 8:
      case 9:
        return "Excellent hydration habits!";
      default: // 10, 11, 12
        return "Wow! You're a hydration champion!";
    }
  };

  // Get color based on intake level (gray -> blue transition)
  const getIntakeColor = (intake: number): string => {
    return intake >= 4 ? colors.blueAccent : colors.lightText;
  };

  const intakeColor = getIntakeColor(currentIntake);
  const intakeMessage = getIntakeMessage(currentIntake);
  const intakeDisplay = formatIntakeDisplay(currentIntake);

  return (
    <ScreenTemplate 
      currentStep={SCREEN_PROGRESS.CurrentWaterIntake}
      showBackButton={true}
    >
      {/* Center Content */}
      <View style={layouts.centeredContent}>
        <View style={layouts.contentSection}>
          {/* Header Text */}
          <View style={layouts.textGroup}>
            <Text style={textStyles.heading}>
              how much water do you drink daily?
            </Text>
            <Text style={textStyles.subtitle}>
              Be honest - this helps us personalize your experience
            </Text>
          </View>
          
          {/* Interactive Display Section */}
          <View style={intakeDisplaySection}>
            {/* Large Number Display */}
            <Text style={[largeNumberStyle, { color: intakeColor }]}>
              {intakeDisplay}
            </Text>
            
            {/* Dynamic Encouraging Message */}
            <Text style={[encouragingMessageStyle, { color: intakeColor }]}>
              {intakeMessage}
            </Text>
            
            {/* Interactive Slider */}
            <Slider
              value={currentIntake}
              onValueChange={(value) => setCurrentIntake(Math.round(value))}
              minimumValue={0}
              maximumValue={12}
              step={1}
              showRangeLabels={true}
              formatValue={(value) => `${Math.round(value)}`}
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

// Styles for the intake display section
const intakeDisplaySection = {
  width: '100%',
  alignItems: 'center' as const,
  gap: 16,
  paddingHorizontal: 20,
};

const largeNumberStyle = {
  ...typography.largeNumber,
  // Color will be applied dynamically
};

const encouragingMessageStyle = {
  ...textStyles.subtitle,
  textAlign: 'center' as const,
  fontWeight: '500' as const,
  // Color will be applied dynamically
};

const sliderStyle = {
  marginTop: 8,
  width: '100%',
};

const continueButtonStyle = {
  marginHorizontal: 20,
  marginBottom: 34,
};

export default CurrentWaterIntakeScreen;
```

**What this code does**:
- Implements large 48pt number display with proper singular/plural grammar
- Provides non-judgmental, encouraging feedback for all intake levels
- Uses color transition from gray (low intake) to blue (good hydration)
- Handles slider with integer steps from 0-12 cups
- Maintains encouraging messaging regardless of current intake level

### 3. Enhanced Slider Component for Integer Display

**Update: `components/Slider.tsx`** (optimize for integer values)

```typescript
// Update the Slider component to handle integer rounding better
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
  // Handle value changes with proper rounding for integer steps
  const handleValueChange = (newValue: number) => {
    if (step >= 1) {
      // For integer steps, round to nearest integer
      onValueChange(Math.round(newValue));
    } else {
      onValueChange(newValue);
    }
  };

  const displayValue = formatValue ? formatValue(value) : value.toString();

  return (
    <View style={[sliderContainer, style]}>
      {label && (
        <Text style={sliderLabel}>{label}</Text>
      )}
      
      <SliderComponent
        style={sliderStyle}
        value={value}
        onValueChange={handleValueChange}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        minimumTrackTintColor={colors.blueAccent}
        maximumTrackTintColor={`${colors.blueAccent}33`}
        thumbTintColor={colors.blueAccent}
        trackStyle={trackStyle}
        thumbStyle={enhancedThumbStyle} // Enhanced thumb for better UX
      />
      
      {showRangeLabels && (
        <View style={rangeLabels}>
          <Text style={rangeLabel}>
            {formatValue ? formatValue(minimumValue) : `${minimumValue}`}
          </Text>
          <Text style={rangeLabel}>
            {formatValue ? formatValue(maximumValue) : `${maximumValue}+`}
          </Text>
        </View>
      )}
    </View>
  );
};

// Enhanced thumb style for better user experience
const enhancedThumbStyle: ViewStyle = {
  width: 28, // Slightly larger for better touch target
  height: 28,
  borderRadius: 14,
  backgroundColor: colors.blueAccent,
  shadowColor: colors.darkText,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 4,
};
```

### 4. Update Navigation and Create Placeholder

**Update: `navigation/OnboardingNavigator.tsx`**

```typescript
import CurrentWaterIntakeScreen from '../screens/CurrentWaterIntakeScreen';

// Add to Stack.Navigator:
<Stack.Screen name="CurrentWaterIntake" component={CurrentWaterIntakeScreen} />
```

**Create placeholder for next screen:**

**File: `screens/ImpactVisualizationScreen.tsx`**

```typescript
import React from 'react';
import { View, Text } from 'react-native';
import { ScreenTemplate } from '../components';
import { SCREEN_PROGRESS } from '../types/navigation';
import { layouts, textStyles } from '../styles/components';

const ImpactVisualizationScreen: React.FC = () => {
  return (
    <ScreenTemplate 
      currentStep={SCREEN_PROGRESS.ImpactVisualization}
      showBackButton={true}
    >
      <View style={layouts.centeredContent}>
        <Text style={textStyles.heading}>Impact Visualization</Text>
        <Text style={textStyles.subtitle}>Coming soon in next guide!</Text>
      </View>
    </ScreenTemplate>
  );
};

export default ImpactVisualizationScreen;
```

### 5. Test Dynamic Feedback

Your Current Water Intake screen should demonstrate:

1. **Large Number Display**:
   - Prominent 48pt display of current intake
   - Proper grammar: "1 cup" vs "2 cups", "3 cups", etc.
   - Color changes from gray (0-3 cups) to blue (4+ cups)

2. **Dynamic Messages**:
   - 0 cups: "Every journey starts with a single sip"
   - 1-3 cups: "A great start - every drop counts!"
   - 4-6 cups: "You're on your way to better hydration"
   - 7-9 cups: "Excellent hydration habits!"
   - 10-12 cups: "Wow! You're a hydration champion!"

3. **Interactive Slider**:
   - Range 0-12 with integer steps
   - Smooth sliding with immediate feedback
   - Range labels show "0" to "12+"
   - Blue styling matching design system

4. **Color Coordination**:
   - Both number and message use same color
   - Smooth transition at 4 cups threshold
   - Maintains readability at all levels

## Troubleshooting Common Issues

### Issue: Slider not snapping to integer values
**Solution**: Verify `step={1}` prop and that `handleValueChange` uses `Math.round()`.

### Issue: Grammar not working properly
**Debug**: Add `console.log('Intake:', currentIntake, 'Display:', formatIntakeDisplay(currentIntake))` to verify logic.

### Issue: Color not changing at threshold
**Solution**: Check that `getIntakeColor` function uses `intake >= 4` comparison and color constants are correct.

### Issue: Large number not displaying prominently
**Solution**: Verify `typography.largeNumber` has `fontSize: 48` and proper `fontWeight: 'bold'`.

## Question-Driven Prompts for AI Help

For dynamic feedback and formatting:

1. **Text Formatting**:
   - "How do I handle singular/plural grammar in React Native text display?"
   - "What's the best way to format dynamic numbers in React Native?"
   - "How do I create responsive large text displays in React Native?"

2. **Dynamic Styling**:
   - "How do I apply dynamic colors to React Native text based on numeric values?"
   - "Why isn't my conditional styling updating in real-time with React Native?"
   - "How do I create smooth color transitions in React Native components?"

3. **User Experience**:
   - "How do I create encouraging, non-judgmental messaging in apps?"
   - "What's the best way to provide real-time feedback with React Native sliders?"
   - "How do I make large numbers prominent and readable in React Native?"

## Visual Validation Checklist

Compare with SwiftUI CurrentWaterIntakeView:

- [ ] **Progress**: Shows 6/8 (75%)
- [ ] **Title**: "how much water do you drink daily?" in 28pt bold
- [ ] **Subtitle**: Explanation about personalization
- [ ] **Large Number**: 48pt display with proper grammar (cup/cups)
- [ ] **Message**: Encouraging feedback based on intake level
- [ ] **Color Coding**: Gray for 0-3 cups, blue for 4+ cups
- [ ] **Slider**: 0-12 range with integer steps, blue styling
- [ ] **Range Labels**: Shows "0" to "12+"
- [ ] **Real-time Updates**: All elements update as slider moves

## Performance and UX Considerations

### Smooth Interactions
- Integer rounding prevents fractional cup displays
- Immediate visual feedback creates responsive feel
- Color transitions provide clear visual cues

### Encouraging Design
- Non-judgmental messaging supports all intake levels
- Positive reinforcement encourages honest input
- Visual progression motivates improvement

## What You've Accomplished

After completing this screen, you have:
- Implemented dynamic large number displays with proper formatting
- Created real-time feedback systems with color coding
- Handled complex conditional logic for user messaging
- Built encouraging, non-judgmental user experiences
- Applied sophisticated typography and visual hierarchy

## Next Steps

In the remaining guides, you'll complete:
- **Impact Visualization** (Screen 7): Complex calculations and data display
- **Goal Calculation** (Screen 8): Form inputs with validation
- **Testing and Refinement**: Comprehensive testing across all screens
- **Next Steps**: Planning for main app development

This Current Water Intake screen demonstrates advanced interaction patterns essential for health and wellness apps that collect user data sensitively and encouragingly.