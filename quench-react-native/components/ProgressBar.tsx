import { View, ViewStyle } from 'react-native';
import { colors, spacing } from '../styles/theme';

interface ProgressBarProps {
  current: number;
  total: number;
  style?: ViewStyle;
}

const ProgressBar = ({ current, total, style }: ProgressBarProps) => {
  const progress = current / total;

  return (
    <View style={style}>
      <View style={progressContainer}>
        <View style={[progressBar, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
};

const progressContainer: ViewStyle = {
  height: 4,
  backgroundColor: `${colors.blueAccent}33`,
  borderRadius: 2,
  overflow: 'hidden',
  transform: [{ scaleY: spacing.progressBarScale }],
};

const progressBar: ViewStyle = {
  height: '100%',
  backgroundColor: colors.blueAccent,
  borderRadius: 2,
};

export default ProgressBar;
