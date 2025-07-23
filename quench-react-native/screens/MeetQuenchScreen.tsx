import { View, Text, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList, SCREEN_PROGRESS } from '../types/navigation';
import ScreenTemplate from '../components/ScreenTemplate';
import { layouts, textStyles, buttons } from '../styles/theme/components';

type MeetQuenchScreenNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'MeetQuench'
>;

interface Props {
  navigation: MeetQuenchScreenNavigationProp;
}

const MeetQuenchScreen = ({ navigation }: Props) => {
  const handleContinue = () => {
    // navigation.navigate('AvatarStates');
    console.log('Continue to Avatar States');
  };

  return (
    <ScreenTemplate
      currentStep={SCREEN_PROGRESS.MeetQuench}
      showBackButton={true}
    >
      <View style={layouts.centeredContent}>
        <View style={layouts.textGroup}>
          <Text style={textStyles.heading}>meet quench</Text>
          <Text style={textStyles.subtitle}>
            Your new hydration buddy will change based on how much water you
            drink
          </Text>
        </View>
      </View>

      <TouchableOpacity style={buttons.continueButton} onPress={handleContinue}>
        <Text style={buttons.continueButtonText}>continue</Text>
      </TouchableOpacity>
    </ScreenTemplate>
  );
};

export default MeetQuenchScreen;
