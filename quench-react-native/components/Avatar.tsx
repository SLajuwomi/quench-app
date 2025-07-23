import { Image, ImageStyle, View, ViewStyle } from 'react-native';
import { avatars } from '../styles/theme/components';

export type AvatarState =
  | 'fully-hydrated'
  | 'slightly-thirsty'
  | 'getting-thirsty'
  | 'quite-thirsty'
  | 'very-thirsty'
  | 'severely-dehydrated';

export type AvatarSize = 'welcome' | 'other';

interface AvatarProps {
  state?: AvatarState;
  size: AvatarSize;
  style?: ViewStyle;
}

const AVATAR_IMAGES: Record<AvatarState, any> = {
  'fully-hydrated': require('../assets/avatar-states/quench-transparent-default.png'),
  'slightly-thirsty': require('../assets/avatar-states/quench-avatar-down-10.png'),
  'getting-thirsty': require('../assets/avatar-states/quench-avatar-down-20.png'),
  'quite-thirsty': require('../assets/avatar-states/quench-avatar-down-40.png'),
  'very-thirsty': require('../assets/avatar-states/quench-dehydrsted-down-80.png'),
  'severely-dehydrated': require('../assets/avatar-states/quench-avatar-60-dehydrated.png'),
};

const Avatar = ({ state = 'fully-hydrated', size, style }: AvatarProps) => {
  const avatarSize = size === 'welcome' ? avatars.welcome : avatars.other;

  return (
    <View style={[avatarContainer, avatarSize, style]}>
      <Image
        source={AVATAR_IMAGES[state]}
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
