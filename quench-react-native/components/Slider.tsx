import { View, Text, ViewStyle, TextStyle } from 'react-native';
import SliderComponent from '@react-native-community/slider';
import { colors, spacing, typography } from '../styles/theme';

interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue: number;
  maximumValue: number;
  step?: number;
  label?: string;
  formatValue?: (value: number) => string;
  style?: ViewStyle;
}

function Slider({
  value,
  onValueChange,
  minimumValue,
  maximumValue,
  step = 1,
  label,
  formatValue,
  style,
}: SliderProps) {
  const displayValue = formatValue ? formatValue(value) : value.toString();

  return (
    <View style={[sliderContainer, style]}>
      {label && <Text style={sliderLabel}>{label}</Text>}
      <Text style={sliderValue}>{displayValue}</Text>
      <SliderComponent
        style={sliderStyle}
        value={value}
        onValueChange={onValueChange}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        minimumTrackTintColor={colors.blueAccent}
        maximumTrackTintColor={`${colors.blueAccent}33`}
        thumbTintColor={colors.blueAccent}
      />
      <View style={rangeLabels}>
        <Text style={rangeLabel}>{minimumValue}</Text>
        <Text style={rangeLabel}>{maximumValue}</Text>
      </View>
    </View>
  );
}

const sliderContainer: ViewStyle = {
  width: '100%',
  alignItems: 'center',
  gap: spacing.md,
};

const sliderLabel: TextStyle = {
  ...typography.subtitle,
  color: colors.darkText,
  marginBottom: spacing.xs,
};

const sliderValue: TextStyle = {
  ...typography.largeNumber,
  color: colors.blueAccent,
  marginBottom: spacing.xs,
};

const sliderStyle: ViewStyle = {
  width: '100%',
  height: 40,
};

const rangeLabels: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: spacing.xs,
};

const rangeLabel: TextStyle = {
  ...typography.caption,
  color: colors.lightText,
};

export default Slider;
