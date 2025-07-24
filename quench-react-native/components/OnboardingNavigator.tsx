import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../types/navigation';

import WelcomeScreen from '../screens/WelcomeScreen';
import MeetQuenchScreen from '../screens/MeetQuenchScreen';
import AvatarStatesScreen from '../screens/AvatarStatesScreen';
import ReasonSelectionScreen from '../screens/ReasonSelectionScreen';

const Stack = createStackNavigator<OnboardingStackParamList>();

const OnboardingNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="MeetQuench" component={MeetQuenchScreen} />
      <Stack.Screen name="AvatarStates" component={AvatarStatesScreen} />
      <Stack.Screen name="ReasonSelection" component={ReasonSelectionScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;
