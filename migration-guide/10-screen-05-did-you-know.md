# Screen 5: Did You Know Screen Migration

## Objective
Migrate the SwiftUI Did You Know screen to React Native, implementing a 2x2 grid layout of educational fact cards with emojis, titles, and descriptions. This screen introduces grid layouts and structured content presentation.

## Prerequisites
- Completed Screens 1-4 (Welcome through Reason Selection)
- Understanding of React Native flexbox grid layouts
- Familiarity with Card component from foundation

## Key Concepts You'll Learn
- **Grid Layouts**: Creating responsive 2x2 grids with flexbox
- **Card Components**: Using cards for structured content display
- **Educational Content**: Presenting facts in digestible formats
- **Emoji Integration**: Using emojis as visual icons in React Native
- **Responsive Design**: Handling different screen sizes with grid layouts

## SwiftUI Reference Analysis

**From `DidYouKnowView.swift`:**
```swift
let facts = [
    ("💧", "60% Water", "Your body is made up of about 60% water"),
    ("🧠", "Brain Power", "Your brain is 75% water and needs hydration to function properly"),
    ("😰", "Dehydration Effects", "Even 2% dehydration can affect your mood and cognitive function"),
    ("⚡", "Energy Boost", "Proper hydration can increase energy levels by up to 30%")
]

VStack(spacing: 24) {
    VStack(spacing: 12) {
        Text("did you know?")
            .font(.system(size: 28, weight: .bold, design: .default))
        
        Text("Here are some interesting facts about hydration")
            .font(.system(size: 17, weight: .regular, design: .default))
    }
    
    // 2x2 Grid Layout
    LazyVGrid(columns: [
        GridItem(.flexible()),
        GridItem(.flexible())
    ], spacing: 16) {
        ForEach(facts, id: \.0) { fact in
            FactCard(
                emoji: fact.0,
                title: fact.1, 
                description: fact.2
            )
        }
    }
    
    Text("Stay hydrated and keep learning!")
        .font(.system(size: 17, weight: .regular, design: .default))
        .foregroundStyle(Color(red: 0.0, green: 0.48, blue: 1.0))
}
```

## Step-by-Step Implementation

### 1. Create Fact Card Component

**File: `components/FactCard.tsx`**

```typescript
import React from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, typography } from '../styles/theme';

interface FactCardProps {
  emoji: string;
  title: string;
  description: string;
  style?: ViewStyle;
}

const FactCard: React.FC<FactCardProps> = ({ 
  emoji, 
  title, 
  description, 
  style 
}) => {
  return (
    <View style={[factCardContainer, style]}>
      <Text style={emojiIcon}>{emoji}</Text>
      <Text style={cardTitle}>{title}</Text>
      <Text style={cardDescription}>{description}</Text>
    </View>
  );
};

const factCardContainer: ViewStyle = {
  backgroundColor: colors.white,
  borderRadius: spacing.md,
  padding: spacing.lg,
  alignItems: 'center',
  justifyContent: 'flex-start',
  minHeight: 140,
  flex: 1, // Important for grid layout
  
  // iOS-style shadow matching SwiftUI cards
  shadowColor: colors.darkText,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  
  // Android shadow
  elevation: 4,
};

const emojiIcon: TextStyle = {
  fontSize: 32,
  marginBottom: spacing.sm,
  textAlign: 'center',
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
  lineHeight: 16,
  flex: 1, // Take remaining space
};

export default FactCard;
```

**What this does**:
- Creates a card specifically for educational facts
- Includes emoji, title, and description in vertical layout
- Applies consistent styling with shadows matching iOS design
- Uses flex: 1 for proper grid behavior

### 2. Create Did You Know Screen

**File: `screens/DidYouKnowScreen.tsx`**

```typescript
import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList, SCREEN_PROGRESS } from '../types/navigation';
import { ScreenTemplate, Button } from '../components';
import FactCard from '../components/FactCard';
import { layouts, textStyles } from '../styles/components';
import { colors, spacing } from '../styles/theme';

type DidYouKnowScreenNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'DidYouKnow'
>;

interface Props {
  navigation: DidYouKnowScreenNavigationProp;
}

// Hydration facts matching SwiftUI version exactly
const HYDRATION_FACTS = [
  {
    emoji: '💧',
    title: '60% Water',
    description: 'Your body is made up of about 60% water',
  },
  {
    emoji: '🧠',
    title: 'Brain Power',
    description: 'Your brain is 75% water and needs hydration to function properly',
  },
  {
    emoji: '😰',
    title: 'Dehydration Effects',
    description: 'Even 2% dehydration can affect your mood and cognitive function',
  },
  {
    emoji: '⚡',
    title: 'Energy Boost',
    description: 'Proper hydration can increase energy levels by up to 30%',
  },
];

const DidYouKnowScreen: React.FC<Props> = ({ navigation }) => {
  const handleContinue = () => {
    navigation.navigate('CurrentWaterIntake');
  };

  return (
    <ScreenTemplate 
      currentStep={SCREEN_PROGRESS.DidYouKnow}
      showBackButton={true}
      scrollable={true}  // Enable scrolling for content
    >
      {/* Center Content */}
      <View style={layouts.centeredContent}>
        <View style={layouts.contentSection}>
          {/* Header Text */}
          <View style={layouts.textGroup}>
            <Text style={textStyles.heading}>did you know?</Text>
            <Text style={textStyles.subtitle}>
              Here are some interesting facts about hydration
            </Text>
          </View>
          
          {/* 2x2 Grid of Fact Cards */}
          <View style={factsGridContainer}>
            <View style={gridRow}>
              <FactCard {...HYDRATION_FACTS[0]} style={cardStyle} />
              <FactCard {...HYDRATION_FACTS[1]} style={cardStyle} />
            </View>
            <View style={gridRow}>
              <FactCard {...HYDRATION_FACTS[2]} style={cardStyle} />
              <FactCard {...HYDRATION_FACTS[3]} style={cardStyle} />
            </View>
          </View>
          
          {/* Encouraging Bottom Text */}
          <Text style={encouragingText}>
            Stay hydrated and keep learning!
          </Text>
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

// Grid layout styles
const factsGridContainer: ViewStyle = {
  width: '100%',
  paddingHorizontal: spacing.screenHorizontal,
  gap: spacing.lg,
};

const gridRow: ViewStyle = {
  flexDirection: 'row',
  gap: spacing.lg,
  justifyContent: 'space-between',
};

const cardStyle: ViewStyle = {
  // Cards will flex to fill available space equally
  flex: 1,
};

const encouragingText: TextStyle = {
  ...textStyles.subtitle,
  color: colors.blueAccent,
  textAlign: 'center',
  fontWeight: '500',
  marginTop: spacing.md,
};

const continueButtonStyle = {
  marginHorizontal: 20,
  marginBottom: 34,
};

export default DidYouKnowScreen;
```

**What this code does**:
- Defines exact hydration facts from SwiftUI version
- Creates 2x2 grid using flexbox rows and columns
- Uses scrollable ScreenTemplate for content that might overflow
- Applies consistent spacing and styling
- Includes encouraging text in blue accent color

### 3. Update Component Exports

**Update: `components/index.ts`**

```typescript
// Add FactCard to exports
export { default as FactCard } from './FactCard';

// Complete export list:
export { default as Avatar, type AvatarState, type AvatarSize } from './Avatar';
export { default as Button, type ButtonVariant, type ButtonSize } from './Button';
export { default as Card } from './Card';
export { default as FactCard } from './FactCard';
export { default as InputField } from './InputField';
export { default as NavigationHeader } from './NavigationHeader';
export { default as ProgressBar } from './ProgressBar';
export { default as RadioButtonGroup, type RadioOption } from './RadioButtonGroup';
export { default as ScreenTemplate } from './ScreenTemplate';
export { default as Slider } from './Slider';
```

### 4. Alternative Grid Implementation (Optional)

For more complex responsive layouts, you could also use FlatList:

**Alternative grid implementation:**

```typescript
// Alternative using FlatList for more complex layouts
import { FlatList } from 'react-native';

const renderFactCard = ({ item }: { item: typeof HYDRATION_FACTS[0] }) => (
  <FactCard 
    {...item} 
    style={[cardStyle, { width: cardWidth }]} 
  />
);

// In your component:
const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 60) / 2; // 60 = padding + gap

<FlatList
  data={HYDRATION_FACTS}
  renderItem={renderFactCard}
  numColumns={2}
  columnWrapperStyle={gridRow}
  contentContainerStyle={factsGridContainer}
  scrollEnabled={false}
  keyExtractor={(item, index) => index.toString()}
/>
```

This is more complex but handles dynamic screen sizes better.

### 5. Update Navigation and Create Placeholder

**Update: `navigation/OnboardingNavigator.tsx`**

```typescript
import DidYouKnowScreen from '../screens/DidYouKnowScreen';

// Add to Stack.Navigator:
<Stack.Screen name="DidYouKnow" component={DidYouKnowScreen} />
```

**Create placeholder for next screen:**

**File: `screens/CurrentWaterIntakeScreen.tsx`**

```typescript
import React from 'react';
import { View, Text } from 'react-native';
import { ScreenTemplate } from '../components';
import { SCREEN_PROGRESS } from '../types/navigation';
import { layouts, textStyles } from '../styles/components';

const CurrentWaterIntakeScreen: React.FC = () => {
  return (
    <ScreenTemplate 
      currentStep={SCREEN_PROGRESS.CurrentWaterIntake}
      showBackButton={true}
    >
      <View style={layouts.centeredContent}>
        <Text style={textStyles.heading}>Current Water Intake</Text>
        <Text style={textStyles.subtitle}>Coming soon in next guide!</Text>
      </View>
    </ScreenTemplate>
  );
};

export default CurrentWaterIntakeScreen;
```

### 6. Test Grid Layout

Your Did You Know screen should now display:

1. **Header Section**:
   - "did you know?" title
   - Explanatory subtitle about hydration facts

2. **2x2 Grid**:
   - Four cards arranged in two rows of two columns
   - Cards equally sized and spaced
   - Each card shows emoji, title, and description
   - Proper shadows matching iOS design

3. **Encouraging Text**:
   - Blue-colored motivational text below grid
   - Proper spacing and alignment

4. **Responsive Behavior**:
   - Grid adapts to different screen widths
   - Cards maintain proper aspect ratios
   - Content scrolls if needed on smaller screens

## Troubleshooting Common Issues

### Issue: Cards not displaying in proper grid
**Solution**: Verify that:
- `flexDirection: 'row'` is applied to row containers
- Cards have `flex: 1` to fill available space equally
- Gap spacing is properly applied between rows and columns

### Issue: Emojis not displaying properly
**Solution**: 
- Make sure emoji characters are properly encoded in UTF-8
- Test on both iOS and Android as emoji rendering can differ
- Consider using emoji fonts if consistency is critical

### Issue: Cards different heights in same row
**Solution**: Set `alignItems: 'stretch'` on row containers, or use `minHeight` on cards for consistent sizing.

### Issue: Content overflowing screen
**Solution**: Use `scrollable={true}` prop on ScreenTemplate, or wrap content in ScrollView.

## Question-Driven Prompts for AI Help

For grid layouts and structured content:

1. **Grid Layout Issues**:
   - "How do I create a responsive 2x2 grid in React Native with flexbox?"
   - "Why aren't my React Native cards the same size in a grid layout?"
   - "How do I handle different screen sizes with React Native grid layouts?"

2. **Card Styling**:
   - "How do I create consistent card shadows in React Native for both iOS and Android?"
   - "Why do my React Native cards look different on iOS vs Android?"
   - "How do I align content within React Native cards properly?"

3. **Content Layout**:
   - "How do I handle text overflow in React Native card components?"
   - "What's the best way to create educational content layouts in React Native?"
   - "How do I make React Native cards responsive to content length?"

4. **Emoji and Icons**:
   - "How do I ensure emoji display consistency across React Native platforms?"
   - "What's the best practice for using emojis as icons in React Native?"
   - "How do I handle emoji sizing in React Native text components?"

## Google Search Queries

For additional help:
- "react native 2x2 grid layout flexbox responsive"
- "react native card component shadows ios android"
- "react native emoji display consistency platform"
- "react native content grid layouts best practices"
- "react native scrollview with grid components performance"

## Visual Validation Checklist

Compare with SwiftUI DidYouKnowView:

- [ ] **Progress**: Shows 5/8 (62.5%)
- [ ] **Title**: "did you know?" in 28pt bold, lowercase
- [ ] **Subtitle**: Explanation about hydration facts
- [ ] **Grid Layout**: 2x2 arrangement with equal spacing
- [ ] **Card Content**: All 4 facts with correct emojis, titles, descriptions
- [ ] **Card Styling**: White background, shadows, rounded corners
- [ ] **Card Sizing**: All cards same size within rows
- [ ] **Spacing**: 16pt gaps between cards, proper margins
- [ ] **Bottom Text**: Blue-colored encouraging message
- [ ] **Scrolling**: Content scrolls if needed on smaller screens

## Performance Considerations

### Grid Performance
- Using flexbox is more performant than FlatList for small grids (4 items)
- FlatList is better for larger datasets or dynamic content
- Consider screen size variations and content overflow

### Image Loading
- Emojis render efficiently as text, no image loading needed
- Card shadows are lightweight and render efficiently
- Consider content length variations in production

## What You've Accomplished

After completing this screen, you have:
- Created responsive grid layouts using React Native flexbox
- Built reusable card components for structured content
- Implemented educational content presentation patterns
- Handled emoji integration and consistent styling
- Applied proper spacing and visual hierarchy for information display

## Next Steps

In the next guide (`11-screen-06-water-intake.md`), you'll:
- Build another interactive slider screen with dynamic feedback
- Implement dynamic text and color changes based on numeric input
- Handle plural/singular text formatting ("1 cup" vs "2 cups")
- Create encouraging feedback messages based on user input
- Apply color-coded feedback similar to the Avatar States screen

This Did You Know screen demonstrates important content presentation patterns useful for educational apps, dashboards, and information displays.