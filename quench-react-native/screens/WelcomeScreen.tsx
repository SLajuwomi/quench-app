import { View, Text, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList, SCREEN_PROGRESS } from '../types/navigation';
import ScreenTemplate from '../components/ScreenTemplate';
import { layouts, textStyles, buttons } from '../styles/theme/components';

type WelcomeScreenNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'Welcome'
>;

interface Props {
  navigation: WelcomeScreenNavigationProp;
}

const WelcomeScreen = ({ navigation }: Props) => {
  const handleContinue = () => {
    navigation.navigate('MeetQuench');
  };

  return (
    <ScreenTemplate
      currentStep={SCREEN_PROGRESS.Welcome}
      showBackButton={false}
    >
      <View style={layouts.centeredContent}>
        <View style={layouts.textGroup}>
          <Text style={textStyles.welcomeHeading}>welcome to quench</Text>
          <Text style={textStyles.subtitle}>
            Your hydration buddy is ready to help you stay healthy
          </Text>
        </View>
      </View>

      <TouchableOpacity style={buttons.continueButton} onPress={handleContinue}>
        <Text style={buttons.continueButtonText}>continue</Text>
      </TouchableOpacity>
    </ScreenTemplate>
  );
};

export default WelcomeScreen;
