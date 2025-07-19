# Quench Product Requirements Document (PRD)

## Goals and Background Context

### Goals

- To create a simple, beautiful, and engaging mobile application that helps users track their daily water intake.
- To motivate users to drink more water by providing a real-time, visual representation of their hydration level through an interactive avatar.
- To provide a clear history of the user's hydration progress to encourage consistency.

### Background Context

Quench is a mobile app designed to make hydration tracking easy and enjoyable. The core concept is centered around a "digital pet" or avatar whose appearance reflects the user's daily water consumption. The less water a user has consumed, the more dehydrated the avatar will look, and vice-versa. This provides immediate, visual feedback and a compelling reason to stay hydrated. The app's design will be minimal and clean, heavily inspired by the aesthetic of the Brainrot app, focusing on a simple, intuitive user experience.

### Change Log

| Date       | Version | Description       | Author    |
| :--------- | :------ | :---------------- | :-------- |
| 2025-07-15 | 1.0     | Initial PRD draft | John (PM) |

## Requirements

### Functional

- FR1: Users must be able to log their consumption of different beverage types (Water, Tea, Coffee, Soda).
- FR2: The application must calculate the hydration value for each logged beverage.
- FR3: The user's avatar must change its appearance in real-time to reflect their current hydration level.
- FR4: The application must have an onboarding flow that introduces the app, calculates a suggested daily water goal.
- FR5: Users must be able to view their hydration history on a calendar.
- FR6: The application must send notifications to remind users to log their water intake.
- FR7: Users can create an optional account to back up and sync their data.
- FR8: Users can log in using Google, Apple, or email/password.
- FR9: The app must function offline.

### Non Functional

- NFR1: The frontend will be built with SwiftUI.
- NFR2: The backend must be powered by Supabase.
- NFR3: The application should be intuitive and easy to use, with a minimal and clean UI.
- NFR4: The application should be responsive and performant. Avatar updates should feel instantaneous, ideally under 100ms.
- NFR5: All user data must be encrypted at rest and in transit.

## User Interface Design Goals

### Overall UX Vision

The UX vision is to create a delightful and effortless experience that makes tracking hydration a joy rather than a chore. The app should feel like a companion, not a tool. The primary interaction will be with the avatar, creating an emotional connection that motivates the user.

### Key Interaction Paradigms

- **Direct Manipulation:** Users will directly interact with elements to log their drinks, such as tapping on a beverage icon and sliding to adjust the amount.
- **Visual Feedback:** The app will provide immediate and clear visual feedback for all actions, most notably the real-time change in the avatar's appearance.

### Core Screens and Views

- **Onboarding Screens:** A series of screens to introduce the app, calculate the user's goal, and introduce the avatar.
- **Home Screen:** The main screen displaying the avatar, the user's current hydration level, and buttons to log drinks.
- **Logging Screen:** A screen where the user can select the amount of the beverage they consumed.
- **Calendar Screen:** A screen displaying a calendar view of the user's hydration history.
- **Settings Screen:** A screen for managing account settings, notification preferences, and the daily goal.

### Accessibility: WCAG

### Branding

The branding will be clean, modern, and friendly. The color palette will be soft and inviting, similar to the Brainrot app. The avatar will be the central element of the brand.

### Target Device and Platforms

iOS and Android mobile devices.

### Service Architecture

The application will use a serverless architecture with Supabase for the backend, database, and authentication.

### Testing requirements

Unit tests for all critical business logic. Integration tests for the main user flows. E2E tests for the core functionality.

### Additional Technical Assumptions and Requests

- The app will be developed using an offline-first approach.
- User data will be stored locally on the device and can be optionally synced to Supabase.

## Epics

- Epic1 Foundation & Onboarding: Establish project setup, and basic user management, and deliver the initial piece of functionality.
- Epic2 Core Hydration Loop: Implement the full logging functionality and the real-time avatar updates.
- Epic3 Progress & Engagement: Build the calendar view and notification system.

## Epic 1 Foundation & Onboarding

Establish the foundational project structure, implement the user onboarding flow, and create the basic home screen with a static avatar.

### Story 1.1 Setup Project

As a developer,
I want to set up a new React Native project with Expo,
so that we have a foundation to build the application on.

#### Acceptance Criteria

- 1: A new React Native project is created using Expo.
- 2: The project is structured with a clear directory layout for components, screens, and assets.
- 3: The project can be successfully built and run on both iOS and Android simulators.

### Story 1.2 Implement Onboarding Flow

As a new user,
I want to be guided through an onboarding process,
so that I understand the app's purpose and how to use it.

#### Acceptance Criteria

- 1: The onboarding flow consists of a welcome screen, a goal calculation screen, and an avatar introduction screen.
- 2: The goal calculation screen takes user input (e.g., weight) to suggest a daily water goal.
- 3: The user can accept the suggested goal or set their own.
- 4: The onboarding flow is visually appealing and easy to navigate.

### Story 1.3 Create Home Screen

As a user,
I want to see my avatar and current hydration progress on the home screen,
so that I can quickly check my status.

#### Acceptance Criteria

- 1: The home screen displays the user's avatar in its default state.
- 2: The home screen displays the user's daily water goal and current progress (initially 0).
- 3: The home screen has buttons for logging different beverage types.

## Epic 2 Core Hydration Loop

Implement the full functionality for logging drinks and updating the avatar's appearance in real-time.

### Story 2.1 Implement Drink Logging

As a user,
I want to log the beverages I drink,
so that the app can track my hydration.

#### Acceptance Criteria

- 1: Tapping a beverage button on the home screen navigates to the logging screen.
- 2: The logging screen displays a larger version of the beverage icon.
- 3: The user can slide the liquid level in the icon to select the amount consumed.
- 4: The app calculates the hydration value based on the beverage type and amount.
- 5: The user's hydration progress is updated after logging a drink.

### Story 2.2 Implement Real-time Avatar Updates

As a user,
I want to see my avatar change in real-time as I log my drinks,
so that I get immediate visual feedback.

#### Acceptance Criteria

- 1: The avatar's appearance changes based on the user's hydration level.
- 2: The app has a set of avatar states representing different levels of hydration (e.g., dehydrated, partially hydrated, fully hydrated).
- 3: The avatar transitions smoothly between states.

## Epic 3 Progress & Engagement

Build the calendar view for tracking history and implement notifications to keep users engaged.

### Story 3.1 Implement Calendar View

As a user,
I want to see my hydration history on a calendar,
so that I can track my consistency over time.

#### Acceptance Criteria

- 1: The calendar screen displays a monthly view.
- 2: Each day on the calendar shows the user's hydration status for that day (e.g., using the avatar's state or a color code).
- 3: The user can navigate between months.

### Story 3.2 Implement Notifications

As a user,
I want to receive reminders to drink water,
so that I can stay on track with my hydration goals.

#### Acceptance Criteria

- 1: The user can enable or disable notifications in the settings.
- 2: The app sends a notification if the user has not logged any water for a configurable period.
- 3: The notification text is friendly and encouraging.

### Story 3.3 Implement Optional User Accounts

As a user,
I want to be able to create an account,
so that my data is backed up and can be synced across devices.

#### Acceptance Criteria

- 1: The user can create an account using Google, Apple, or email/password.
- 2: The app works fully offline if the user chooses not to create an account.
- 3: If an account is created, data is synced with Supabase.

## Checklist Results Report

I will now run the `pm-checklist` and populate the results in this section.

## Next Steps

### Architect Prompt

Please review the PRD and create a technical architecture and implementation plan.
