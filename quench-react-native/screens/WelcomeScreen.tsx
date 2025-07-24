import { View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList, SCREEN_PROGRESS } from '../types/navigation';
import ScreenTemplate from '../components/ScreenTemplate';
import { Avatar, Button } from '../components';
import { layouts, textStyles } from '../styles/theme/components';

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
        <View style={layouts.contentSection}>
          {/* Avatar - 180x180 for welcome screen */}
          <Avatar state="fully-hydrated" size="welcome" />
          {/* Text Group - matches SwiftUI VStack(spacing: 12) */}
          <View style={layouts.textGroup}>
            <Text style={textStyles.welcomeHeading}>welcome to quench</Text>
            <Text style={textStyles.subtitle}>
              Your hydration buddy is ready to help you stay healthy
            </Text>
          </View>
        </View>
      </View>
      {/* Continue Button - positioned at bottom */}
      <Button
        title="continue"
        onPress={handleContinue}
        style={{ marginHorizontal: 20, marginBottom: 34 }}
      />
    </ScreenTemplate>
  );
};

export default WelcomeScreen;
