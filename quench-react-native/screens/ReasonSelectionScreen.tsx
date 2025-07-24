import { View, Text } from 'react-native';
import { ScreenTemplate } from '../components';
import { SCREEN_PROGRESS } from '../types/navigation';
import { layouts, textStyles } from '../styles/theme/components';

const ReasonSelectionScreen = () => {
  return (
    <ScreenTemplate
      currentStep={SCREEN_PROGRESS.ReasonSelection}
      showBackButton={true}
    >
      <View style={layouts.centeredContent}>
        <Text style={textStyles.heading}>Reason Selection</Text>
        <Text style={textStyles.subtitle}>Coming soon in next guide!</Text>
      </View>
    </ScreenTemplate>
  );
};

export default ReasonSelectionScreen;
