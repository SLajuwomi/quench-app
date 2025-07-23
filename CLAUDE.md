# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Quench** is a SwiftUI hydration tracking app with an interactive avatar that reflects the user's hydration level. The app features a complete 8-screen onboarding flow and is designed with a minimal, clean aesthetic inspired by the Brainrot app.

## Development Commands

### Build and Run

```bash
# Open in Xcode
open quench-swift/quench-swift.xcodeproj

# Build and run from Xcode (⌘+R)
# No command-line build tools configured - use Xcode for development
```

### Testing

```bash
# Run tests from Xcode (⌘+U)
# No command-line test runner configured
```

## Architecture

### Project Structure

- `quench-swift/` - Main SwiftUI application
  - `quench_swiftApp.swift` - App entry point, launches OnboardingFlow
  - `OnboardingFlow.swift` - Navigation controller managing 8-screen onboarding sequence
  - Individual view files for each onboarding screen
  - `Assets.xcassets/` - Avatar states and app icons

### Navigation System

- Uses `NavigationStack` with `NavigationPath` for state management
- `OnboardingScreen` enum defines all 8 screens
- Custom navigation with back buttons and progress indicators
- System navigation bar is hidden (`.navigationBarHidden(true)`)

### Onboarding Flow (8 Screens)

1. **Welcome** (`ContentView.swift`) - Welcome message with 180x180 avatar
2. **Meet Quench** (`MeetQuenchView.swift`) - Introduces hydration buddy concept
3. **Avatar States** (`AvatarStatesView.swift`) - Interactive slider showing 6 avatar states
4. **Reason Selection** (`ReasonSelectionView.swift`) - Motivation selection with radio buttons
5. **Did You Know** (`DidYouKnowView.swift`) - Educational facts in 2x2 grid
6. **Current Water Intake** (`CurrentWaterIntakeView.swift`) - Interactive slider with feedback
7. **Impact Visualization** (`ImpactVisualizationView.swift`) - Health impact breakdown
8. **Goal Calculation** (`GoalCalculationView.swift`) - Personal data input form

### Design System

#### Color Palette (Exact RGB Values)

- Background: `Color(red: 0.9, green: 0.95, blue: 1.0)`
- Dark text: `Color(red: 0.11, green: 0.11, blue: 0.12)`
- Light text: `Color(red: 0.43, green: 0.43, blue: 0.45)`
- Blue accent: `Color(red: 0.0, green: 0.48, blue: 1.0)`

#### Typography Standards

- Welcome heading: 32pt bold
- Other headings: 28pt bold
- Subtitles: 17pt regular
- Button text: 17pt medium
- All headings must be lowercase
- Use `.foregroundStyle()` not `.foregroundColor()`

#### Avatar Sizing

- Welcome screen: 180x180
- All other screens: 120x120

#### Button Implementation (EXACT)

```swift
VStack(spacing: 0) {
    Button(action: {}) {
        Text("continue")
            .font(.system(size: 17, weight: .medium, design: .default))
            .foregroundStyle(.white)
            .frame(maxWidth: .infinity)
            .frame(height: 50)
            .background(Color(red: 0.0, green: 0.48, blue: 1.0))
            .cornerRadius(12)
    }
    .padding(.horizontal, 20)
    .padding(.bottom, 34)
}
```

#### Progress Bar Implementation

```swift
ProgressView(value: SCREEN_NUMBER, total: 8.0)
    .progressViewStyle(.linear)
    .tint(Color(red: 0.0, green: 0.48, blue: 1.0))
    .scaleEffect(x: 1, y: 0.8)
```

### Technical Notes

#### Cursor Rules Integration

- Comprehensive UI consistency rules defined in `.cursor/rules/quench-onboarding.mdc`
- Exact styling specifications to maintain visual consistency
- Reference implementations in `ContentView.swift` and `MeetQuenchView.swift`

#### State Management

- Avatar states use range matching (0.5...0.7) instead of exact floating-point comparison
- Form validation disables continue buttons until required fields are completed
- Navigation state managed through `NavigationPath`

#### Key Components

- `FactCard` - Reusable component for educational content
- `InputField` - Custom input field with suffix labels
- Interactive sliders with real-time feedback and color-coded states

## Development Guidelines

### UI Consistency Rules

1. **NO DEVIATIONS** from button implementation - copy exact code from design system
2. **NO DEVIATIONS** from progress bar styling - use exact RGB values
3. **CONSISTENT** avatar sizing based on screen type (180px welcome, 120px others)
4. **CONSISTENT** spacing: main VStack (0), content VStack (24), text groups (12)
5. All text must use `.multilineTextAlignment(.center)` and `.lineLimit(nil)` for multi-line

### Navigation Pattern

```swift
// Continue action
navigationPath.append(OnboardingScreen.nextScreen)

// Back action
navigationPath.removeLast()
```

### Layout Template

```swift
ZStack {
    Color(red: 0.9, green: 0.95, blue: 1.0).ignoresSafeArea()

    VStack(spacing: 0) {
        // Top section (back button + progress)
        HStack(spacing: 16) { ... }
            .padding(.horizontal, 20)
            .padding(.top, 20)

        Spacer()

        // Center content
        VStack(spacing: 24) { ... }

        Spacer()

        // Bottom button
        VStack(spacing: 0) { ... }
    }
}
```

### Avatar States System

6 avatar states representing hydration levels:

- 1.0: Fully hydrated
- 0.8-0.9: Slightly thirsty
- 0.6-0.7: Getting thirsty
- 0.4-0.5: Quite thirsty
- 0.2-0.3: Very thirsty
- 0.0-0.1: Severely dehydrated

### React Function Component Typing (TypeScript)

**Always define your props type or interface and use it directly in the function signature for React function components. Do NOT use `React.FC<Props>` or `React.FunctionComponent<Props>`, unless you specifically need implicit `children` or other features.**

#### Example (Best Practice)

```typescript
type MyComponentProps = {
  foo: string;
  bar?: number;
};

function MyComponent({ foo, bar }: MyComponentProps) {
  // ...
}
```

#### Rationale

- This is the official recommendation from the React team as of 2024.
- It avoids implicit `children` and makes prop types explicit and clear.
- It improves maintainability and type safety.

#### References

- [React TypeScript Docs: Define React Component Props with Interface](https://github.com/reactjs/react.dev/blob/main/src/content/learn/typescript.md#_snippet_2)
- [React 19 Upgrade Guide: Migrate from PropTypes to TypeScript](https://github.com/reactjs/react.dev/blob/main/src/content/blog/2024/04/25/react-19-upgrade-guide.md#_snippet_6)

## Future Development

The onboarding flow is complete and functional. Next development phases should focus on:

1. Main app UI after onboarding completion
2. Data persistence for user selections
3. Actual hydration goal calculations
4. Main hydration tracking interface with real-time avatar updates
5. Calendar view for tracking history
6. Notification system
7. Optional user accounts with Supabase backend integration
