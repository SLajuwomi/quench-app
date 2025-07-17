// Path: quench-app/app/onboarding/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function OnboardingLayout() {
  return (
    <Stack>
      <Stack.Screen name="01_problem_hook" options={{ headerShown: false }} />
    </Stack>
  );
}