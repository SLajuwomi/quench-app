import { View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList, SCREEN_PROGRESS } from '../types/navigation';
import ScreenTemplate from '../components/ScreenTemplate';
import { Avatar, Button } from '../components';
import { layouts, textStyles } from '../styles/theme/components';

type MeetQuenchScreenNavigationProp = StackNavigationProp<
  OnboardingStackParamList,
  'MeetQuench'
>;

interface Props {
  navigation: MeetQuenchScreenNavigationProp;
}

const MeetQuenchScreen = ({ navigation }: Props) => {
  const handleContinue = () => {
    navigation.navigate('AvatarStates');
    console.log('Continue to Avatar States');
  };

  return (
    <ScreenTemplate
      currentStep={SCREEN_PROGRESS.MeetQuench}
      showBackButton={true}
    >
      <View style={layouts.centeredContent}>
        <View style={layouts.contentSection}>
          {/* Avatar - 120x120 for non-welcome screens */}
          <Avatar state="fully-hydrated" size="other" />
          {/* Text Group */}
          <View style={layouts.textGroup}>
            <Text style={textStyles.heading}>meet quench</Text>
            <Text style={textStyles.subtitle}>
              Your new hydration buddy will change based on how much water you
              drink
            </Text>
          </View>
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

export default MeetQuenchScreen;
