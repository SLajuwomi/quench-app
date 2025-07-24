import { useState } from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList, SCREEN_PROGRESS } from '../types/navigation';
import { ScreenTemplate, Avatar, Button, Slider } from '../components';
import { layouts, textStyles } from '../styles/theme/components';
import { colors, spacing } from '../styles/theme';

type AvatarStatesScreenNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'AvatarStates'
>;

interface Props {
  navigation: AvatarStatesScreenNavigationProp;
}

const AvatarStatesScreen = ({ navigation }: Props) => {
  // Using proper 0.0-1.0 scale directly with the new slider
  const [hydrationLevel, setHydrationLevel] = useState<number>(0.0);

  const handleContinue = () => {
    navigation.navigate('ReasonSelection');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  // Map hydration level to avatar state and text
  const getAvatarStateAndText = (level: number) => {
    if (level >= 0.8) {
      return {
        state: 'fully-hydrated' as const,
        text: 'fully hydrated',
        color: colors.fullyHydrated,
      };
    } else if (level >= 0.6) {
      return {
        state: 'slightly-thirsty' as const,
        text: 'slightly thirsty',
        color: colors.slightlyThirsty,
      };
    } else if (level >= 0.4) {
      return {
        state: 'getting-thirsty' as const,
        text: 'getting thirsty',
        color: colors.gettingThirsty,
      };
    } else if (level >= 0.3) {
      return {
        state: 'quite-thirsty' as const,
        text: 'quite thirsty',
        color: colors.quiteThirsty,
      };
    } else if (level >= 0.1) {
      return {
        state: 'very-thirsty' as const,
        text: 'very thirsty',
        color: colors.veryThirsty,
      };
    } else {
      return {
        state: 'severely-dehydrated' as const,
        text: 'severely dehydrated',
        color: colors.severlyDehydrated,
      };
    }
  };

  const avatarData = getAvatarStateAndText(hydrationLevel);

  const contentStyle: ViewStyle = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: 40,
  };

  const textContainerStyle: ViewStyle = {
    alignItems: 'center',
    marginBottom: spacing.xl,
    marginTop: spacing.md, // Added spacing between avatar and text
  };

  const sliderBoxStyle: ViewStyle = {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 24, // Reduced from 24 to make more compact
    alignItems: 'center',
    shadowColor: colors.darkText,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    width: '90%',
    alignSelf: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  };

  return (
    <ScreenTemplate
      currentStep={SCREEN_PROGRESS.AvatarStates}
      showBackButton={true}
    >
      <View style={contentStyle}>
        <Avatar state={avatarData.state} size="other" />

        <View style={textContainerStyle}>
          <Text style={[textStyles.heading, { color: colors.darkText }]}>
            see for yourself
          </Text>
        </View>

        {/* Slider Box with state label and slider inside */}
        <View style={sliderBoxStyle}>
          <Text
            style={[
              textStyles.subtitle,
              {
                color: avatarData.color,
                fontWeight: '500',
                fontSize: 17,
                marginBottom: 16,
                textAlign: 'center',
              },
            ]}
          >
            {avatarData.text}
          </Text>
          <Slider
            value={hydrationLevel}
            onValueChange={setHydrationLevel}
            minimumValue={0.0}
            maximumValue={1.0}
            step={0.01}
            leftLabel="dehydrated"
            rightLabel="fully quenched"
            stateColor={avatarData.color}
          />
        </View>
      </View>
      {/* Continue Button */}
      <Button
        title="continue"
        onPress={handleContinue}
        style={{ marginHorizontal: 20, marginBottom: 34 }}
      />
    </ScreenTemplate>
  );
};

export default AvatarStatesScreen;
