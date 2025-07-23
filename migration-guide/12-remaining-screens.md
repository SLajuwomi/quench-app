# Screens 7-8: Remaining Screens Implementation Guide

## Overview
This guide covers the implementation of the final two onboarding screens: Impact Visualization (Screen 7) and Goal Calculation (Screen 8). These screens complete the onboarding flow with data display and form collection.

## Screen 7: Impact Visualization

### Objective
Display calculated impact data in a 2x2 grid showing daily, weekly, monthly intake, and recommended amounts with color-coded highlighting.

### Key Implementation Points

**File: `screens/ImpactVisualizationScreen.tsx`**

```typescript
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList, SCREEN_PROGRESS } from '../types/navigation';
import { ScreenTemplate, Button, Card } from '../components';
import { layouts, textStyles } from '../styles/components';
import { colors, spacing } from '../styles/theme';

const ImpactVisualizationScreen: React.FC<Props> = ({ navigation }) => {
  // In real app, this would come from previous screen or context
  const dailyIntake = 5; // cups per day
  
  const calculatedData = {
    daily: dailyIntake,
    weekly: dailyIntake * 7,
    monthly: dailyIntake * 30,
    recommended: 8, // standard recommendation
  };

  const handleContinue = () => {
    navigation.navigate('GoalCalculation');
  };

  return (
    <ScreenTemplate 
      currentStep={SCREEN_PROGRESS.ImpactVisualization}
      showBackButton={true}
    >
      <View style={layouts.centeredContent}>
        <View style={layouts.contentSection}>
          <View style={layouts.textGroup}>
            <Text style={textStyles.heading}>your hydration impact</Text>
            <Text style={textStyles.subtitle}>
              Here's how your current intake adds up
            </Text>
          </View>
          
          {/* 2x2 Grid of Impact Cards */}
          <View style={impactGrid}>
            <View style={gridRow}>
              <Card 
                title={`${calculatedData.daily} cups`} 
                description="Daily intake"
                style={cardStyle}
              />
              <Card 
                title={`${calculatedData.weekly} cups`} 
                description="Weekly intake"
                style={cardStyle}
              />
            </View>
            <View style={gridRow}>
              <Card 
                title={`${calculatedData.monthly} cups`} 
                description="Monthly intake"
                style={cardStyle}
              />
              <Card 
                title={`${calculatedData.recommended} cups`} 
                description="Recommended daily"
                style={[cardStyle, highlightedCard]}
              />
            </View>
          </View>
        </View>
      </View>

      <Button title="continue" onPress={handleContinue} style={continueButtonStyle} />
    </ScreenTemplate>
  );
};

const impactGrid = { width: '100%', paddingHorizontal: 20, gap: 16 };
const gridRow = { flexDirection: 'row' as const, gap: 16 };
const cardStyle = { flex: 1 };
const highlightedCard = { backgroundColor: `${colors.blueAccent}10` };
const continueButtonStyle = { marginHorizontal: 20, marginBottom: 34 };
```

## Screen 8: Goal Calculation

### Objective
Collect user data (weight, activity level, age) through form inputs with validation. Enable continue button only when all fields are completed.

### Key Implementation Points

**File: `screens/GoalCalculationScreen.tsx`**

```typescript
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList, SCREEN_PROGRESS } from '../types/navigation';
import { ScreenTemplate, Button, InputField } from '../components';
import { layouts, textStyles } from '../styles/components';

const GoalCalculationScreen: React.FC<Props> = ({ navigation }) => {
  const [weight, setWeight] = useState<string>('');
  const [activityLevel, setActivityLevel] = useState<string>('');
  const [age, setAge] = useState<string>('');

  const handleGetStarted = () => {
    // In real app, calculate goal and save data
    // For now, onboarding is complete
    console.log('Onboarding completed!');
    // Navigate to main app or show completion message
  };

  // Form validation - all fields must be filled
  const isFormValid = weight.trim() !== '' && 
                     activityLevel.trim() !== '' && 
                     age.trim() !== '';

  return (
    <ScreenTemplate 
      currentStep={SCREEN_PROGRESS.GoalCalculation}
      showBackButton={true}
      scrollable={true}
    >
      <View style={layouts.centeredContent}>
        <View style={layouts.contentSection}>
          <View style={layouts.textGroup}>
            <Text style={textStyles.heading}>let's calculate your goal</Text>
            <Text style={textStyles.subtitle}>
              We'll use this information to personalize your hydration target
            </Text>
          </View>
          
          <View style={formContainer}>
            <InputField
              label="Weight"
              value={weight}
              onChangeText={setWeight}
              placeholder="150"
              suffix="lbs"
              keyboardType="numeric"
              style={inputStyle}
            />
            
            <InputField
              label="Activity Level"
              value={activityLevel}
              onChangeText={setActivityLevel}
              placeholder="1"
              suffix="hours/day"
              keyboardType="numeric"
              style={inputStyle}
            />
            
            <InputField
              label="Age"
              value={age}
              onChangeText={setAge}
              placeholder="25"
              suffix="years"
              keyboardType="numeric"
              style={inputStyle}
            />
          </View>
        </View>
      </View>

      <Button 
        title="get started"
        onPress={handleGetStarted}
        disabled={!isFormValid}
        variant={isFormValid ? 'primary' : 'disabled'}
        style={continueButtonStyle}
      />
    </ScreenTemplate>
  );
};

const formContainer = { width: '100%', paddingHorizontal: 20, gap: 20 };
const inputStyle = { width: '100%' };
const continueButtonStyle = { marginHorizontal: 20, marginBottom: 34 };
```

## Quick Implementation Tips

### For Both Screens:

1. **Update Navigation**:
```typescript
// Add to OnboardingNavigator.tsx
<Stack.Screen name="ImpactVisualization" component={ImpactVisualizationScreen} />
<Stack.Screen name="GoalCalculation" component={GoalCalculationScreen} />
```

2. **Use Existing Components**:
- Both screens leverage components you've already built
- Impact Visualization uses Card components in grid layout
- Goal Calculation uses InputField components with validation

3. **Form Validation Pattern**:
```typescript
const isValid = field1 !== '' && field2 !== '' && field3 !== '';
<Button disabled={!isValid} variant={isValid ? 'primary' : 'disabled'} />
```

4. **Grid Layout Pattern**:
```typescript
const gridContainer = { width: '100%', paddingHorizontal: 20, gap: 16 };
const gridRow = { flexDirection: 'row', gap: 16 };
const cardStyle = { flex: 1 };
```

## Testing Your Complete Flow

After implementing both screens, test the complete onboarding:

1. **Navigation Flow**: Welcome → Meet Quench → Avatar States → Reason Selection → Did You Know → Current Water Intake → Impact Visualization → Goal Calculation

2. **Progress Tracking**: Verify progress bar shows 1/8 through 8/8 correctly

3. **Back Navigation**: Test back button functionality on all screens except Welcome

4. **Form Validation**: Verify buttons are disabled when inputs are incomplete

5. **Visual Consistency**: All screens should match SwiftUI design exactly

## Question-Driven Prompts

For quick implementation help:

- "How do I create a 2x2 grid with highlighted cards in React Native?"
- "How do I implement form validation with multiple input fields?"
- "How do I handle numeric input validation in React Native forms?"
- "Why isn't my button enabling when form fields are filled?"

## What These Screens Accomplish

**Impact Visualization**:
- Demonstrates data calculation and display patterns
- Shows grid layout with highlighted important information
- Provides user feedback on their current habits

**Goal Calculation**:
- Completes user data collection for personalization
- Demonstrates form validation patterns
- Provides satisfying completion of onboarding flow

## Next Steps After Implementation

Once you've built these final screens:

1. **Complete Navigation**: Ensure all screens are connected properly
2. **Test Full Flow**: Run through entire onboarding multiple times
3. **Visual Polish**: Compare every screen with SwiftUI version
4. **Form Handling**: Consider how you'll persist user data
5. **Completion Action**: Decide what happens after "Get Started"

These final screens complete your SwiftUI to React Native migration, demonstrating the full range of patterns needed for modern app onboarding flows.