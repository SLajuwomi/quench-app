export type OnboardingStackParamList = {
  Welcome: undefined;
  MeetQuench: undefined;
  AvatarStates: undefined;
  ReasonSelection: undefined;
  DidYouKnow: undefined;
  CurrentWaterIntake: undefined;
  ImpactVisualization: undefined;
  GoalCalculation: undefined;
};

export type OnboardingScreenNames = keyof OnboardingStackParamList;

export const SCREEN_PROGRESS: Record<OnboardingScreenNames, number> = {
  Welcome: 1,
  MeetQuench: 2,
  AvatarStates: 3,
  ReasonSelection: 4,
  DidYouKnow: 5,
  CurrentWaterIntake: 6,
  ImpactVisualization: 7,
  GoalCalculation: 8,
};

export const TOTAL_SCREENS = 8;
