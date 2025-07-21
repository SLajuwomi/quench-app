import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity } from 'react-native';
import { layouts, textStyles, buttons } from './styles/theme/components';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={layouts.screenContainer}>
        <View style={layouts.centeredContent}>
          <View style={layouts.textGroup}>
            <Text style={textStyles.welcomeHeading}>welcome to quench</Text>
            <Text style={textStyles.subtitle}>
              Your hydration buddy is ready to help you stay healthy
            </Text>
          </View>
        </View>

        <TouchableOpacity style={buttons.continueButton}>
          <Text style={buttons.continueButtonText}>continue</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}
