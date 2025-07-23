import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { layouts } from '../styles/theme/components';
import NavigationHeader from './NavigationHeader';
import { TOTAL_SCREENS } from '../types/navigation';

interface ScreenTemplateProps {
  currentStep: number;
  showBackButton?: boolean;
  children: React.ReactNode;
  scrollable?: boolean;
}

const ScreenTemplate = ({
  currentStep,
  showBackButton = true,
  children,
  scrollable = false,
}: ScreenTemplateProps) => {
  const ContentWrapper = scrollable ? ScrollView : View;

  return (
    <SafeAreaView style={layouts.screenContainer}>
      <NavigationHeader
        currentStep={currentStep}
        totalSteps={TOTAL_SCREENS}
        showBackButton={showBackButton}
      />

      <ContentWrapper
        style={layouts.mainContent}
        contentContainerStyle={scrollable ? { flexGrow: 1 } : undefined}
      >
        {children}
      </ContentWrapper>
    </SafeAreaView>
  );
};

export default ScreenTemplate;
