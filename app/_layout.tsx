import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import '../global.css';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <RootNavigator />
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}

function RootNavigator() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
    </Stack>
  );
}