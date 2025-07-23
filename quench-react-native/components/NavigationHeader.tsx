import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { layouts } from '../styles/theme/components';
import { colors } from '../styles/theme';
import { OnboardingStackParamList } from '../types/navigation';
import ProgressBar from '../components/ProgressBar';

type NavigationProps = StackNavigationProp<OnboardingStackParamList>;

interface NavigationHeaderProps {
  currentStep: number;
  totalSteps: number;
  showBackButton?: boolean;
}

const NavigationHeader = ({
  currentStep,
  totalSteps,
  showBackButton = true,
}: NavigationHeaderProps) => {
  const navigation = useNavigation<NavigationProps>();

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return showBackButton ? (
    <View style={layouts.navigationContainer}>
      <TouchableOpacity onPress={handleBackPress} style={backButtonStyle}>
        <Ionicons name="chevron-back" size={18} color={colors.gray} />
      </TouchableOpacity>
      <ProgressBar
        current={currentStep}
        total={totalSteps}
        style={{ flex: 1 }}
      />
    </View>
  ) : (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20, // matches spacing.screenHorizontal
        paddingTop: 20, // matches spacing.screenTop
      }}
    >
      <ProgressBar
        current={currentStep}
        total={totalSteps}
        style={{ flex: 1, maxWidth: 400 }} // maxWidth for large screens
      />
    </View>
  );
};

const backButtonStyle = {
  width: 44,
  height: 44,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
};

export default NavigationHeader;
