# Project Context: SwiftUI to React Native Migration

## Overview

This migration guide documents the process of converting the **Quench** hydration tracking app's onboarding flow from SwiftUI to React Native/Expo with TypeScript. The goal is to enable cross-platform development (iOS and Android) while maintaining the exact visual design and user experience.

## Original Project Details

### Current State
- **Platform**: SwiftUI (iOS only)
- **Status**: Complete 8-screen onboarding flow
- **Design**: Minimal, clean aesthetic inspired by Brainrot app
- **Navigation**: Custom navigation with progress tracking
- **Components**: Reusable UI components with exact styling specifications

### Architecture
- **Entry Point**: `quench_swiftApp.swift` → `OnboardingFlow.swift`
- **Navigation**: NavigationStack with NavigationPath state management
- **Design System**: Exact RGB color values, typography standards, consistent spacing
- **Components**: Custom buttons, progress bars, avatar states, interactive sliders

## Migration Goals

### Primary Objectives
1. **Learn React Native**: Hands-on learning through practical implementation
2. **Cross-Platform**: Enable iOS and Android development
3. **Visual Consistency**: Maintain exact design specifications from SwiftUI version
4. **UI-Only Focus**: No backend integration (Supabase) at this stage

### Learning Approach
- **Question-Driven Development**: Ask specific questions, find targeted solutions
- **Step-by-Step**: One screen at a time, building understanding progressively
- **Code Examples**: Reference implementations with explanations
- **Self-Implementation**: User writes code with guidance and examples

## Technical Decisions

### Framework Choices
- **React Native**: Cross-platform native development
- **Expo**: Development tooling and deployment
- **TypeScript**: Type safety and better development experience
- **React Navigation**: Screen navigation (NOT Expo Router due to previous issues)
- **StyleSheet**: Built-in styling for reliability (avoiding NativeWind due to compatibility concerns)

### Project Structure
- **New Project**: Separate React Native project alongside existing SwiftUI code
- **Reference**: Keep SwiftUI code for design and behavior reference
- **Incremental**: Build screen by screen, component by component

## Design System Migration

### Color Palette (Exact RGB Values)
```typescript
// SwiftUI: Color(red: 0.9, green: 0.95, blue: 1.0)
// React Native: { red: 229, green: 242, blue: 255 } // (0.9 * 255, 0.95 * 255, 1.0 * 255)
```

### Typography Hierarchy
- **Welcome Heading**: 32pt bold → fontSize: 32, fontWeight: 'bold'
- **Other Headings**: 28pt bold → fontSize: 28, fontWeight: 'bold'
- **Subtitles**: 17pt regular → fontSize: 17, fontWeight: 'normal'
- **Buttons**: 17pt medium → fontSize: 17, fontWeight: '500'

### Layout Standards
- **Spacing System**: 0, 8, 12, 16, 20, 24pt consistent spacing
- **Avatar Sizing**: Welcome (180x180), Others (120x120)
- **Button Specs**: 50pt height, 12pt border radius, specific padding

## Screen-by-Screen Migration Plan

### 8 Onboarding Screens
1. **Welcome** - Basic layout, large avatar, continue button
2. **Meet Quench** - Introduction concept, navigation patterns
3. **Avatar States** - Interactive slider, real-time state changes
4. **Reason Selection** - Radio button selection, form validation
5. **Did You Know** - Grid layout, educational content cards
6. **Current Water Intake** - Interactive slider with dynamic feedback
7. **Impact Visualization** - Complex calculations, multiple data displays
8. **Goal Calculation** - Form inputs, validation, final onboarding step

### Progressive Complexity
- **Screens 1-2**: Basic components and layouts
- **Screens 3-4**: Interactive components and state management
- **Screens 5-6**: Complex layouts and data presentation
- **Screens 7-8**: Form handling and advanced interactions

## Learning Resources Integration

### Question-Driven Development Approach
Each migration step includes:
- **Specific AI Prompts**: "How do I create X in React Native?"
- **Google Search Queries**: Targeted searches for specific problems
- **Documentation Links**: Official React Native, Expo, and React Navigation docs
- **Common Issues**: Anticipated problems and solutions

### Error-Driven Learning
- **Expect Errors**: Normal part of learning process
- **Debug Iteratively**: Fix issues as they arise
- **Refactor Later**: Focus on working solutions first, optimize after

## Success Criteria

### Functional Requirements
- [ ] All 8 screens render correctly
- [ ] Navigation between screens works smoothly
- [ ] Interactive elements (sliders, buttons, forms) function properly
- [ ] Visual design matches SwiftUI version exactly
- [ ] Runs on both iOS and Android

### Learning Outcomes
- [ ] Understanding of React Native fundamentals
- [ ] Experience with component-based architecture
- [ ] Knowledge of cross-platform development considerations
- [ ] Familiarity with React Navigation
- [ ] Proficiency with TypeScript in React Native context

## Future Development Path

### After Onboarding Completion
1. **Main App UI**: Home screen with avatar and tracking
2. **Data Persistence**: Local storage for user data
3. **Advanced Interactions**: Real-time avatar updates based on hydration
4. **Backend Integration**: Supabase setup for user accounts and sync
5. **Platform-Specific Features**: iOS/Android optimizations

## Files Created During Migration

This guide will generate the following files in the migration-guide folder:
- `01-react-native-setup.md` - Project initialization and environment setup
- `02-understanding-differences.md` - SwiftUI vs React Native concepts
- `03-design-system-setup.md` - Color, typography, and component foundations
- `04-navigation-setup.md` - React Navigation implementation
- `05-component-foundation.md` - Reusable UI components
- `06-screen-01-welcome.md` through `13-screen-08-goal-calc.md` - Individual screen implementations
- `14-testing-and-refinement.md` - Testing and debugging guide
- `15-next-steps.md` - Planning for main app features

## Notes for Future AI Assistance

### Context for Continuation
- User prefers learning-focused approach with explanations
- Step-by-step instructions with code examples are essential
- Question-driven development methodology should be maintained
- Visual consistency with SwiftUI version is critical
- No backend development at this stage - UI only

### User Preferences
- Wants to write code themselves with guidance
- Prefers reliable, well-documented solutions
- Previous issues with Expo Router and NativeWind
- Values understanding over just working code
- Appreciates detailed explanations of concepts

### Technical Constraints
- Must maintain exact visual design specifications
- Cross-platform compatibility required
- TypeScript preferred for type safety
- React Navigation for routing (not Expo Router)
- StyleSheet for styling (not CSS-in-JS libraries)