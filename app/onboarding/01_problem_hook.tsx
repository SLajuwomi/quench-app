// Path: quench-app/app/onboarding/01_problem_hook.tsx
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';

const BackButton = () => (
  <Link href="/" asChild>
    <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-lg bg-black/10">
      <Text className="text-xl font-bold text-slate-700">{'<'}</Text>
    </TouchableOpacity>
  </Link>
);

const RiseStyleButton = ({ text }: { text: string }) => (
  <View>
    {/* Shadow View */}
    <View className="absolute bottom-0 left-0 right-0 top-0 rounded-xl bg-blue-700" />
    {/* Main Button */}
    <TouchableOpacity className="h-14 items-center justify-center rounded-xl border-2 border-blue-300 bg-blue-500 px-8">
      <Text className="text-lg font-bold text-white">{text}</Text>
    </TouchableOpacity>
  </View>
);

export default function ProblemHookScreen() {
  return (
    <LinearGradient colors={['#E0F7FA', '#E8F5F7']} className="flex-1">
      <SafeAreaView className="flex-1">
        <View className="flex-1 px-6 pb-8 pt-4">
          {/* Header */}
          <View className="mb-4">
            {/* Progress Bar */}
            <View className="h-1.5 w-full rounded-full bg-black/10">
              <View className="h-1.5 w-[6.67%] rounded-full bg-blue-500" />
            </View>
            {/* Back Button */}
            <View className="mt-4">
              <BackButton />
            </View>
          </View>

          {/* Body Content */}
          <View className="flex-1 items-center justify-center">
            {/* Avatar */}
            <Image
              source={require('../../assets/images/quench-avatar-down-20.png')}
              className="h-48 w-48"
              resizeMode="contain"
            />
            {/* Text Content */}
            <View className="mt-10">
              <Text className="text-center text-3xl font-extrabold leading-tight text-slate-800">
                Most people are chronically dehydrated
              </Text>
              <Text className="mt-2 text-center text-lg text-slate-600">
                without even realizing it.
              </Text>
            </View>
          </View>

          {/* Footer Button */}
          <View>
            <RiseStyleButton text="Show me more" />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}