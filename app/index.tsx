// Path: quench-app/app/index.tsx
import { Link } from 'expo-router';
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export default function WelcomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-cyan-50">
      <Link href="/onboarding/01_problem_hook" asChild>
        <TouchableOpacity className="rounded-full bg-blue-500 px-8 py-4">
          <Text className="text-lg font-bold text-white">Start Onboarding</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}