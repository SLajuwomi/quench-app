# Step 5: Component Foundation

## Objective

Create reusable UI components that will be used across all onboarding screens. This includes buttons, form inputs, sliders, radio buttons, cards, and avatar displays - all matching the SwiftUI design exactly.

## Prerequisites

- Completed Steps 1-4 (Setup, concepts, design system, navigation)
- Understanding of React Native component patterns
- Familiarity with TypeScript interfaces

## Key Concepts You'll Learn

- **Component Props Interface**: TypeScript interfaces for component props
- **Reusable Components**: Building components that can be used across screens
- **Interactive Components**: Handling user input and state changes
- **Component Composition**: Combining simple components into complex ones
- **Event Handling**: Managing user interactions consistently

## Step-by-Step Instructions

### 1. Create Avatar Component

**File: `components/Avatar.tsx`**

```typescript
import React from 'react';
import { Image, ImageStyle, View, ViewStyle } from 'react-native';
import { avatars } from '../styles/components';

// Avatar states matching SwiftUI implementation
export type AvatarState =
  | 'fully-hydrated' // 1.0
  | 'slightly-thirsty' // 0.8-0.9
  | 'getting-thirsty' // 0.6-0.7
  | 'quite-thirsty' // 0.4-0.5
  | 'very-thirsty' // 0.2-0.3
  | 'severely-dehydrated'; // 0.0-0.1

export type AvatarSize = 'welcome' | 'other';

interface AvatarProps {
  state?: AvatarState;
  size: AvatarSize;
  style?: ViewStyle;
}

// Avatar image mapping (you'll need to add these images to your assets)
const AVATAR_IMAGES: Record<AvatarState, any> = {
  'fully-hydrated': require('../assets/avatar-states/quench-transparent-default.png'),
  'slightly-thirsty': require('../assets/avatar-states/quench-avatar-down-10.png'),
  'getting-thirsty': require('../assets/avatar-states/quench-avatar-down-20.png'),
  'quite-thirsty': require('../assets/avatar-states/quench-avatar-down-40.png'),
  'very-thirsty': require('../assets/avatar-states/quench-dehydrsted-down-80.png'),
  'severely-dehydrated': require('../assets/avatar-states/quench-avatar-60-dehydrated.png'),
};

const Avatar: React.FC<AvatarProps> = ({
  state = 'fully-hydrated',
  size,
  style,
}) => {
  const avatarSize = size === 'welcome' ? avatars.welcome : avatars.other;

  return (
    <View style={[avatarContainer, avatarSize, style]}>
      <Image
        source={AVATAR_IMAGES[state]}
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

- Creates a reusable avatar component with different states and sizes
- Matches the SwiftUI avatar sizing (180px welcome, 120px others)
- Provides type safety for avatar states and sizes

### 2. Create Custom Button Component

**File: `components/Button.tsx`**

```typescript
import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import { buttons } from '../styles/components';
import { colors } from '../styles/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'disabled';
export type ButtonSize = 'large' | 'medium' | 'small';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'large',
  disabled = false,
  style,
  textStyle,
}) => {
  const buttonStyle = [
    getButtonStyle(variant, size),
    disabled && buttons.disabledButton,
    style,
  ];

  const buttonTextStyle = [getButtonTextStyle(variant), textStyle];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={buttonTextStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

// Helper functions for different button styles
const getButtonStyle = (
  variant: ButtonVariant,
  size: ButtonSize
): ViewStyle => {
  const baseStyle: ViewStyle = {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  };

  // Size styles
  const sizeStyles: Record<ButtonSize, ViewStyle> = {
    large: {
      height: 50,
      paddingHorizontal: 20,
    },
    medium: {
      height: 40,
      paddingHorizontal: 16,
    },
    small: {
      height: 32,
      paddingHorizontal: 12,
    },
  };

  // Variant styles
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
      backgroundColor: colors.gray,
      opacity: 0.6,
    },
  };

  return {
    ...baseStyle,
    ...sizeStyles[size],
    ...variantStyles[variant],
  };
};

const getButtonTextStyle = (variant: ButtonVariant): TextStyle => {
  const baseTextStyle: TextStyle = {
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'center',
  };

  const variantTextStyles: Record<ButtonVariant, TextStyle> = {
    primary: {
      color: colors.white,
    },
    secondary: {
      color: colors.blueAccent,
    },
    disabled: {
      color: colors.lightText,
    },
  };

  return {
    ...baseTextStyle,
    ...variantTextStyles[variant],
  };
};

export default Button;
```

**What this does**:

- Creates a flexible button component matching SwiftUI button styling
- Supports different variants and sizes
- Handles disabled states properly
- Maintains the exact styling from your design system

### 3. Create Slider Component

**File: `components/Slider.tsx`**

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
  style,
}) => {
  const displayValue = formatValue ? formatValue(value) : value.toString();

  return (
    <View style={[sliderContainer, style]}>
      {label && <Text style={sliderLabel}>{label}</Text>}

      <Text style={sliderValue}>{displayValue}</Text>

      <SliderComponent
        style={sliderStyle}
        value={value}
        onValueChange={onValueChange}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        minimumTrackTintColor={colors.blueAccent}
        maximumTrackTintColor={`${colors.blueAccent}33`} // 20% opacity
        thumbTintColor={colors.blueAccent}
        trackStyle={trackStyle}
        thumbStyle={thumbStyle}
      />

      <View style={rangeLabels}>
        <Text style={rangeLabel}>{minimumValue}</Text>
        <Text style={rangeLabel}>{maximumValue}</Text>
      </View>
    </View>
  );
};

// First, you need to install the slider component:
// npm install @react-native-community/slider

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

const sliderValue: TextStyle = {
  fontSize: 48,
  fontWeight: 'bold',
  color: colors.darkText,
  textAlign: 'center',
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

**Installation Note**: You'll need to install the slider component:

```bash
npm install @react-native-community/slider
```

**What this does**:

- Creates an interactive slider matching SwiftUI slider behavior
- Supports custom value formatting (e.g., "5 cups" instead of "5")
- Includes range labels and dynamic value display

### 4. Create Radio Button Group Component

**File: `components/RadioButtonGroup.tsx`**

```typescript
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
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
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[optionContainer, selectedId === option.id && selectedOption]}
          onPress={() => onSelect(option.id)}
          activeOpacity={0.7}
        >
          <View style={radioContainer}>
            <View
              style={[
                radioButton,
                selectedId === option.id && selectedRadioButton,
              ]}
            >
              {selectedId === option.id && <View style={radioButtonInner} />}
            </View>

            <View style={textContainer}>
              <Text
                style={[optionLabel, selectedId === option.id && selectedLabel]}
              >
                {option.label}
              </Text>
              {option.description && (
                <Text style={optionDescription}>{option.description}</Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const groupContainer: ViewStyle = {
  gap: spacing.sm,
};

const optionContainer: ViewStyle = {
  backgroundColor: 'transparent',
  borderRadius: spacing.md,
  padding: spacing.lg,
  borderWidth: 1,
  borderColor: `${colors.lightText}33`, // 20% opacity
};

const selectedOption: ViewStyle = {
  backgroundColor: `${colors.blueAccent}10`, // 6% opacity
  borderColor: colors.blueAccent,
};

const radioContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'flex-start',
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
  marginTop: 2, // Align with text baseline
};

const selectedRadioButton: ViewStyle = {
  borderColor: colors.blueAccent,
};

const radioButtonInner: ViewStyle = {
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: colors.blueAccent,
};

const textContainer: ViewStyle = {
  flex: 1,
};

const optionLabel: TextStyle = {
  ...typography.subtitle,
  color: colors.darkText,
  fontWeight: '500',
};

const selectedLabel: TextStyle = {
  color: colors.blueAccent,
};

const optionDescription: TextStyle = {
  ...typography.caption,
  color: colors.lightText,
  marginTop: spacing.xs,
};

export default RadioButtonGroup;
```

**What this does**:

- Creates custom radio buttons matching the SwiftUI selection style
- Supports labels and descriptions
- Handles selection state with visual feedback

### 5. Create Card Component

**File: `components/Card.tsx`**

```typescript
import React from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, typography } from '../styles/theme';

interface CardProps {
  title: string;
  description?: string;
  icon?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  icon,
  children,
  style,
}) => {
  return (
    <View style={[cardContainer, style]}>
      {icon && <Text style={cardIcon}>{icon}</Text>}

      <Text style={cardTitle}>{title}</Text>

      {description && <Text style={cardDescription}>{description}</Text>}

      {children}
    </View>
  );
};

const cardContainer: ViewStyle = {
  backgroundColor: colors.white,
  borderRadius: spacing.md,
  padding: spacing.lg,
  alignItems: 'center',
  justifyContent: 'center',
  // Shadow matching iOS design
  shadowColor: colors.darkText,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 4, // Android shadow
  minHeight: 120,
};

const cardIcon: TextStyle = {
  fontSize: 32,
  marginBottom: spacing.sm,
};

const cardTitle: TextStyle = {
  ...typography.subtitle,
  color: colors.darkText,
  fontWeight: '600',
  textAlign: 'center',
  marginBottom: spacing.xs,
};

const cardDescription: TextStyle = {
  ...typography.caption,
  color: colors.lightText,
  textAlign: 'center',
  lineHeight: 18,
};

export default Card;
```

**What this does**:

- Creates reusable cards for the "Did You Know" facts and other content
- Includes shadow styling matching iOS design
- Supports icons, titles, descriptions, and custom content

### 6. Create Input Field Component

**File: `components/InputField.tsx`**

```typescript
import React from 'react';
import { View, Text, TextInput, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, typography } from '../styles/theme';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  suffix?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  style?: ViewStyle;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  suffix,
  keyboardType = 'default',
  style,
}) => {
  return (
    <View style={[inputContainer, style]}>
      <Text style={inputLabel}>{label}</Text>

      <View style={inputWrapper}>
        <TextInput
          style={[input, suffix && inputWithSuffix]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.lightText}
          keyboardType={keyboardType}
        />

        {suffix && <Text style={suffixText}>{suffix}</Text>}
      </View>
    </View>
  );
};

const inputContainer: ViewStyle = {
  width: '100%',
};

const inputLabel: TextStyle = {
  ...typography.subtitle,
  color: colors.darkText,
  marginBottom: spacing.sm,
  fontWeight: '500',
};

const inputWrapper: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: colors.white,
  borderRadius: spacing.md,
  borderWidth: 1,
  borderColor: `${colors.lightText}33`, // 20% opacity
  paddingHorizontal: spacing.lg,
  height: 50,
};

const input: TextStyle = {
  flex: 1,
  ...typography.subtitle,
  color: colors.darkText,
};

const inputWithSuffix: TextStyle = {
  paddingRight: spacing.sm,
};

const suffixText: TextStyle = {
  ...typography.subtitle,
  color: colors.lightText,
  fontWeight: '500',
};

export default InputField;
```

**What this does**:

- Creates input fields matching SwiftUI TextField styling
- Supports suffixes (like "lbs", "years", "hours/day")
- Handles different keyboard types for numeric inputs

### 7. Export All Components

**File: `components/index.ts`**

```typescript
// Central export file for all components
export { default as Avatar, type AvatarState, type AvatarSize } from './Avatar';
export {
  default as Button,
  type ButtonVariant,
  type ButtonSize,
} from './Button';
export { default as Card } from './Card';
export { default as InputField } from './InputField';
export { default as NavigationHeader } from './NavigationHeader';
export { default as ProgressBar } from './ProgressBar';
export {
  default as RadioButtonGroup,
  type RadioOption,
} from './RadioButtonGroup';
export { default as ScreenTemplate } from './ScreenTemplate';
export { default as Slider } from './Slider';
```

**What this does**:

- Provides a single import location for all components
- Makes it easy to import multiple components: `import { Avatar, Button, Card } from '../components'`

## Question-Driven Prompts for AI Help

If you encounter issues building components, ask:

1. **Component Design**:

   - "How do I create a reusable button component with multiple variants in React Native?"
   - "What's the best way to handle optional props in TypeScript React Native components?"
   - "How do I create shadows in React Native that work on both iOS and Android?"

2. **Interactive Components**:

   - "How do I implement a custom slider component in React Native?"
   - "How do I create radio buttons with custom styling in React Native?"
   - "How do I handle form input validation in React Native components?"

3. **Styling Issues**:

   - "How do I apply conditional styling based on component props?"
   - "Why aren't my TouchableOpacity active states working properly?"
   - "How do I create consistent spacing between components?"

4. **TypeScript**:
   - "How do I properly type React Native component props with optional values?"
   - "What's the correct way to type style props in React Native components?"
   - "How do I create union types for component variants?"

## Google Search Queries

Use these for additional help:

- "react native reusable component typescript best practices"
- "react native slider component custom styling"
- "react native radio button group implementation"
- "react native shadow styling ios android differences"
- "react native textinput suffix label styling"
- "react native touchableopacity active opacity effects"

## Documentation Links

**Component Development**:

- [React Native Components](https://reactnative.dev/docs/components-and-apis) - Built-in components
- [TouchableOpacity](https://reactnative.dev/docs/touchableopacity) - Button interactions
- [TextInput](https://reactnative.dev/docs/textinput) - Input field component
- [React TypeScript](https://react-typescript-cheatsheet.netlify.app/) - TypeScript with React

**External Components**:

- [React Native Community Slider](https://github.com/callstack/react-native-slider) - Slider component
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons) - Icon libraries

## Common Issues and Solutions

### Issue: Slider component not found

**Solution**: Install the community slider: `npm install @react-native-community/slider`

### Issue: Shadows not showing on Android

**Solution**: Use `elevation` property alongside shadow properties for Android support.

### Issue: TypeScript errors with component props

**Solution**: Make sure all prop interfaces are properly defined with correct types.

### Issue: TouchableOpacity not responding

**Solution**: Check that `onPress` prop is provided and the component isn't disabled.

### Issue: Text input losing focus

**Solution**: Make sure the parent component isn't re-rendering unnecessarily.

## Validation Checklist

Before proceeding to screen implementation, verify:

- [x] Avatar component displays different states correctly
- [x] Button component works with different variants and sizes
- [x] Slider component handles value changes properly
- [x] Radio button group allows single selection
- [x] Card component displays content with proper styling
- [x] Input field component handles text input and suffixes
- [x] All components follow your design system colors and typography
- [x] TypeScript types are properly defined for all component props
- [x] Components can be imported from the central index file

## What You've Learned

After completing this step, you understand:

- How to create reusable React Native components with TypeScript
- Component prop interface design and type safety
- Interactive component patterns (buttons, sliders, form inputs)
- Styling consistency across components
- Component composition and reusability patterns

## Next Steps

In the next guides (`06-screen-01-welcome.md` through `13-screen-08-goal-calc.md`), you'll:

- Use these components to build each onboarding screen
- Implement screen-specific logic and interactions
- Handle state management for user selections
- Create the complete onboarding flow matching the SwiftUI version

With these foundation components, building individual screens will be much faster and more consistent.
