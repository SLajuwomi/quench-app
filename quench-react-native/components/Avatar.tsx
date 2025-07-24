import { Image, ImageStyle, View, ViewStyle } from 'react-native';
import { avatars } from '../styles/theme/components';

// Avatar State Types
export type AvatarState =
  | 'fully-hydrated'
  | 'slightly-thirsty'
  | 'getting-thirsty'
  | 'quite-thirsty'
  | 'very-thirsty'
  | 'severely-dehydrated';

// Avatar Size Types
export type AvatarSize = 'welcome' | 'other';

// Avatar Props
interface AvatarProps {
  state?: AvatarState;
  hydrationLevel?: number; // New prop for numeric hydration level
  size: AvatarSize;
  style?: ViewStyle;
}

// Avatar Images
const AVATAR_IMAGES: Record<AvatarState, any> = {
  'fully-hydrated': require('../assets/avatar-states/quench-transparent-default.png'),
  'slightly-thirsty': require('../assets/avatar-states/quench-avatar-down-10.png'),
  'getting-thirsty': require('../assets/avatar-states/quench-avatar-down-20.png'),
  'quite-thirsty': require('../assets/avatar-states/quench-avatar-down-40.png'),
  'very-thirsty': require('../assets/avatar-states/quench-avatar-60-dehydrated.png'),
  'severely-dehydrated': require('../assets/avatar-states/quench-dehydrsted-down-80.png'),
};

// Range-based logic for hydration level (matching SwiftUI)
// In SwiftUI: 0.0 = fully hydrated, 1.0 = severely dehydrated
const getAvatarStateFromLevel = (level: number): AvatarState => {
  if (level <= 0.1) return 'fully-hydrated';
  if (level <= 0.3) return 'slightly-thirsty';
  if (level <= 0.5) return 'getting-thirsty';
  if (level <= 0.7) return 'quite-thirsty';
  if (level <= 0.9) return 'very-thirsty';
  return 'severely-dehydrated';
};

const Avatar = ({
  state = 'fully-hydrated',
  hydrationLevel,
  size,
  style,
}: AvatarProps) => {
  // Use hydrationLevel if provided, otherwise use state
  const avatarState =
    hydrationLevel !== undefined
      ? getAvatarStateFromLevel(hydrationLevel)
      : state;
  const avatarSize = size === 'welcome' ? avatars.welcome : avatars.other;

  return (
    <View style={[avatarContainer, avatarSize, style]}>
      <Image
        source={AVATAR_IMAGES[avatarState]}
        style={avatarImage}
        resizeMode="contain"
      />
    </View>
  );
};

const avatarContainer: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

const avatarImage: ImageStyle = {
  width: '100%',
  height: '100%',
};

export default Avatar;
