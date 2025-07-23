# Screen 4: Reason Selection Screen Migration

## Objective
Migrate the SwiftUI Reason Selection screen to React Native, implementing radio button functionality for single-choice selection with form validation. The continue button should be disabled until a selection is made.

## Prerequisites
- Completed Screens 1-3 (Welcome through Avatar States)
- Understanding of React Native state management
- Familiarity with RadioButtonGroup component from foundation

## Key Concepts You'll Learn
- **Radio Button Groups**: Single-selection from multiple options
- **Form Validation**: Enabling/disabling buttons based on user input
- **Option Arrays**: Managing selectable options with data structures
- **Selection State**: Tracking user choices for later use

## SwiftUI Reference Analysis

**From `ReasonSelectionView.swift`:**
```swift
@State private var selectedReason: String?

let reasons = [
    "Improve my energy levels",
    "Better skin health", 
    "Reduce headaches",
    "Better focus and concentration",
    "Help with weight loss",
    "Just curious about the app"
]

VStack(spacing: 24) {
    VStack(spacing: 12) {
        Text("why do you want to drink more water?")
            .font(.system(size: 28, weight: .bold, design: .default))
        
        Text("Select your main motivation")
            .font(.system(size: 17, weight: .regular, design: .default))
    }
    
    VStack(spacing: 12) {
        ForEach(reasons, id: \.self) { reason in
            Button(action: { selectedReason = reason }) {
                HStack(spacing: 12) {
                    // Custom radio button
                    Circle()
                        .stroke(selectedReason == reason ? Color.blue : Color.gray, lineWidth: 2)
                        .fill(selectedReason == reason ? Color.blue : Color.clear)
                        .frame(width: 20, height: 20)
                        .overlay(
                            selectedReason == reason ? 
                            Circle().fill(Color.white).frame(width: 8, height: 8) : nil
                        )
                    
                    Text(reason)
                        .font(.system(size: 17, weight: .medium, design: .default))
                        .foregroundStyle(selectedReason == reason ? Color.blue : Color.primary)
                    
                    Spacer()
                }
            }
        }
    }
}

// Continue button disabled until selection made
Button("continue") { }
    .disabled(selectedReason == nil)
```

## Step-by-Step Implementation

### 1. Create Reason Selection Screen

**File: `screens/ReasonSelectionScreen.tsx`**

```typescript
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList, SCREEN_PROGRESS } from '../types/navigation';
import { ScreenTemplate, Button, RadioButtonGroup, RadioOption } from '../components';
import { layouts, textStyles } from '../styles/components';

type ReasonSelectionScreenNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'ReasonSelection'
>;

interface Props {
  navigation: ReasonSelectionScreenNavigationProp;
}

// Reasons matching SwiftUI version exactly
const HYDRATION_REASONS: RadioOption[] = [
  {
    id: 'energy',
    label: 'Improve my energy levels',
  },
  {
    id: 'skin',
    label: 'Better skin health',
  },
  {
    id: 'headaches',
    label: 'Reduce headaches',
  },
  {
    id: 'focus',
    label: 'Better focus and concentration',
  },
  {
    id: 'weight',
    label: 'Help with weight loss',
  },
  {
    id: 'curious',
    label: 'Just curious about the app',
  },
];

const ReasonSelectionScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedReasonId, setSelectedReasonId] = useState<string | undefined>();

  const handleContinue = () => {
    // In a real app, you might save the selection
    // For now, just navigate to the next screen
    navigation.navigate('DidYouKnow');
  };

  const handleReasonSelect = (reasonId: string) => {
    setSelectedReasonId(reasonId);
  };

  // Button is disabled until a selection is made
  const continueDisabled = !selectedReasonId;

  return (
    <ScreenTemplate 
      currentStep={SCREEN_PROGRESS.ReasonSelection}
      showBackButton={true}
    >
      {/* Center Content */}
      <View style={layouts.centeredContent}>
        <View style={layouts.contentSection}>
          {/* Header Text */}
          <View style={layouts.textGroup}>
            <Text style={textStyles.heading}>
              why do you want to drink more water?
            </Text>
            <Text style={textStyles.subtitle}>
              Select your main motivation
            </Text>
          </View>
          
          {/* Radio Button Group */}
          <RadioButtonGroup
            options={HYDRATION_REASONS}
            selectedId={selectedReasonId}
            onSelect={handleReasonSelect}
            style={radioGroupStyle}
          />
        </View>
      </View>

      {/* Continue Button - disabled until selection made */}
      <Button 
        title="continue"
        onPress={handleContinue}
        disabled={continueDisabled}
        variant={continueDisabled ? 'disabled' : 'primary'}
        style={continueButtonStyle}
      />
    </ScreenTemplate>
  );
};

const radioGroupStyle = {
  width: '100%',
  paddingHorizontal: 20,
  marginTop: 8,
};

const continueButtonStyle = {
  marginHorizontal: 20,
  marginBottom: 34,
};

export default ReasonSelectionScreen;
```

**What this code does**:
- Defines exact reason options matching SwiftUI version
- Uses `RadioButtonGroup` component for single selection
- Implements form validation - button disabled until selection made
- Handles selection state with `useState`
- Provides visual feedback with disabled button styling

### 2. Update RadioButtonGroup for Better Styling

**Update: `components/RadioButtonGroup.tsx`** (enhance the existing component)

```typescript
import React from 'react';
import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, typography } from '../styles/theme';

export interface RadioOption {
  id: string;
  label: string;
  description?: string;
}

interface RadioButtonGroupProps {
  options: RadioOption[];
  selectedId?: string;
  onSelect: (id: string) => void;
  style?: ViewStyle;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  options,
  selectedId,
  onSelect,
  style,
}) => {
  return (
    <View style={[groupContainer, style]}>
      {options.map((option, index) => {
        const isSelected = selectedId === option.id;
        
        return (
          <TouchableOpacity
            key={option.id}
            style={[
              optionContainer,
              isSelected && selectedOptionContainer,
              // Remove bottom border from last item
              index === options.length - 1 && { borderBottomWidth: 0 },
            ]}
            onPress={() => onSelect(option.id)}
            activeOpacity={0.7}
          >
            <View style={radioContainer}>
              {/* Custom Radio Button Circle */}
              <View style={[
                radioButton,
                isSelected && selectedRadioButton,
              ]}>
                {isSelected && (
                  <View style={radioButtonInner} />
                )}
              </View>
              
              {/* Text Content */}
              <View style={textContainer}>
                <Text style={[
                  optionLabel,
                  isSelected && selectedLabel,
                ]}>
                  {option.label}
                </Text>
                {option.description && (
                  <Text style={optionDescription}>{option.description}</Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// Enhanced styles for better visual hierarchy
const groupContainer: ViewStyle = {
  backgroundColor: colors.white,
  borderRadius: spacing.md,
  overflow: 'hidden',
  // iOS-style shadow
  shadowColor: colors.darkText,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  // Android shadow
  elevation: 4,
};

const optionContainer: ViewStyle = {
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.lg,
  borderBottomWidth: 1,
  borderBottomColor: `${colors.lightText}20`, // 12% opacity
  backgroundColor: 'transparent',
};

const selectedOptionContainer: ViewStyle = {
  backgroundColor: `${colors.blueAccent}08`, // 3% opacity
};

const radioContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  gap: spacing.md,
};

const radioButton: ViewStyle = {
  width: 20,
  height: 20,
  borderRadius: 10,
  borderWidth: 2,
  borderColor: colors.lightText,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'transparent',
};

const selectedRadioButton: ViewStyle = {
  borderColor: colors.blueAccent,
  backgroundColor: colors.blueAccent,
};

const radioButtonInner: ViewStyle = {
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: colors.white,
};

const textContainer: ViewStyle = {
  flex: 1,
};

const optionLabel: TextStyle = {
  ...typography.subtitle,
  color: colors.darkText,
  fontWeight: '500',
  lineHeight: 22,
};

const selectedLabel: TextStyle = {
  color: colors.blueAccent,
  fontWeight: '600',
};

const optionDescription: TextStyle = {
  ...typography.caption,
  color: colors.lightText,
  marginTop: spacing.xs,
  lineHeight: 16,
};

export default RadioButtonGroup;
```

**What this enhanced version adds**:
- Card-like appearance with shadow and rounded corners
- Better visual hierarchy with borders between options
- Selected state background highlighting
- Improved touch targets and visual feedback

### 3. Enhance Button Component for Disabled States

**Update: `components/Button.tsx`** (add better disabled styling)

```typescript
// Add to getButtonStyle function in Button.tsx
const variantStyles: Record<ButtonVariant, ViewStyle> = {
  primary: {
    backgroundColor: colors.blueAccent,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.blueAccent,
  },
  disabled: {
    backgroundColor: colors.lightText,  // More muted than gray
    opacity: 0.6,
  },
};

// Update getButtonTextStyle for disabled state
const variantTextStyles: Record<ButtonVariant, TextStyle> = {
  primary: {
    color: colors.white,
  },
  secondary: {
    color: colors.blueAccent,
  },
  disabled: {
    color: colors.white,
    opacity: 0.8,
  },
};
```

### 4. Update Navigation and Create Next Placeholder

**Update: `navigation/OnboardingNavigator.tsx`**

```typescript
import ReasonSelectionScreen from '../screens/ReasonSelectionScreen';

// Add to Stack.Navigator:
<Stack.Screen name="ReasonSelection" component={ReasonSelectionScreen} />
```

**Create placeholder for next screen:**

**File: `screens/DidYouKnowScreen.tsx`**

```typescript
import React from 'react';
import { View, Text } from 'react-native';
import { ScreenTemplate } from '../components';
import { SCREEN_PROGRESS } from '../types/navigation';
import { layouts, textStyles } from '../styles/components';

const DidYouKnowScreen: React.FC = () => {
  return (
    <ScreenTemplate 
      currentStep={SCREEN_PROGRESS.DidYouKnow}
      showBackButton={true}
    >
      <View style={layouts.centeredContent}>
        <Text style={textStyles.heading}>Did You Know?</Text>
        <Text style={textStyles.subtitle}>Coming soon in next guide!</Text>
      </View>
    </ScreenTemplate>
  );
};

export default DidYouKnowScreen;
```

### 5. Test Selection Functionality

Your Reason Selection screen should now:

1. **Radio Button Selection**:
   - Tap any option to select it
   - Only one option can be selected at a time
   - Visual feedback shows selected state (blue styling)
   - Cards have proper shadows and visual hierarchy

2. **Form Validation**:
   - Continue button starts disabled (gray appearance)
   - Button becomes enabled (blue) after making selection
   - Button press only works when selection is made

3. **Visual Design**:
   - Options displayed in card format with shadows
   - Selected option has blue accent color and background tint
   - Typography matches SwiftUI sizing and weights

## Troubleshooting Common Issues

### Issue: Radio buttons not showing selection state
**Debug Steps**:
1. Add `console.log('Selected ID:', selectedReasonId)` in component
2. Verify `onSelect` function is being called
3. Check that `selectedId` prop is passed to RadioButtonGroup

### Issue: Continue button not enabling after selection
**Solution**: Verify the disabled logic: `const continueDisabled = !selectedReasonId;`

### Issue: Radio button styling not matching design
**Solution**: Check that your color constants are correct and shadow properties are properly applied for your platform.

## Question-Driven Prompts for AI Help

For form validation and selection:

1. **Selection Logic**:
   - "How do I implement single-selection radio buttons in React Native?"
   - "Why isn't my button enabling when form state changes in React Native?"
   - "How do I manage selection state across multiple components?"

2. **Styling Issues**:
   - "How do I create card-like styling with shadows in React Native?"
   - "Why aren't my TouchableOpacity components showing active states properly?"
   - "How do I create proper visual hierarchy in React Native lists?"

3. **Form Validation**:
   - "How do I disable buttons based on form validation in React Native?"
   - "What's the best way to handle form state in React Native functional components?"
   - "How do I provide visual feedback for disabled states?"

## Google Search Queries

For additional help:
- "react native radio button group single selection"
- "react native button disabled state styling"
- "react native form validation enable disable buttons"
- "react native touchableopacity card styling shadows"
- "react native selection state management best practices"

## Visual Validation Checklist

Compare with SwiftUI ReasonSelectionView:

- [ ] **Progress**: Shows 4/8 (50%)
- [ ] **Title**: "why do you want to drink more water?" in 28pt bold
- [ ] **Subtitle**: "Select your main motivation" in 17pt regular
- [ ] **Options**: All 6 reasons listed in card format
- [ ] **Radio Buttons**: Circle with blue fill when selected, empty when not
- [ ] **Selection State**: Only one option selectable at a time
- [ ] **Text Colors**: Selected option shows blue text, others show default
- [ ] **Button State**: Disabled (gray) until selection made, enabled (blue) after
- [ ] **Card Styling**: Options in card with subtle shadows and borders

## What You've Accomplished

After completing this screen, you have:
- Implemented single-selection radio button functionality
- Created form validation with conditional button enabling
- Built card-based UI with proper visual hierarchy
- Handled complex selection state management
- Applied consistent styling matching SwiftUI design

## Next Steps

In the next guide (`10-screen-05-did-you-know.md`), you'll:
- Create grid layouts for multiple content cards
- Implement educational content display
- Work with emoji icons and structured data
- Build reusable card components
- Handle responsive grid layouts

This Reason Selection screen demonstrates important form patterns that apply to many app interfaces beyond onboarding flows.