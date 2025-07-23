import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../types/navigation';

import WelcomeScreen from '../screens/WelcomeScreen';
import MeetQuenchScreen from '../screens/MeetQuenchScreen';

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
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;
