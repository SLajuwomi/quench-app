import React from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { Slider as SliderComponent } from '@miblanchard/react-native-slider';
import { colors, rgba, spacing, typography } from '../styles/theme';

interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue: number;
  maximumValue: number;
  step?: number;
  leftLabel?: string;
  rightLabel?: string;
  stateColor?: string;
  style?: ViewStyle;
}

function Slider({
  value,
  onValueChange,
  minimumValue,
  maximumValue,
  step = 0.01, // Now safe to use small step values
  leftLabel = '',
  rightLabel = '',
  stateColor = colors.blueAccent,
  style,
}: SliderProps) {
  // Ensure value is always a valid number and within bounds
  const safeValue = Math.max(
    minimumValue,
    Math.min(maximumValue, value || minimumValue)
  );

  const handleValueChange = (values: number[]) => {
    // @miblanchard/react-native-slider returns an array
    const newValue = values[0];
    if (typeof newValue === 'number' && !isNaN(newValue)) {
      onValueChange(newValue);
    }
  };

  const containerStyle: ViewStyle = {
    width: '100%',
    paddingHorizontal: spacing.md,
    ...style,
  };

  const labelContainerStyle: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  };

  const labelStyle: TextStyle = {
    fontSize: 15, // Using a specific size instead of typography.sizes.sm
    color: colors.lightText, // Changed from colors.textSecondary to colors.lightText
    fontWeight: '500', // Using specific weight instead of typography.weights.medium
  };

  const sliderContainerStyle: ViewStyle = {
    height: 40,
    justifyContent: 'center',
  };

  return (
    <View style={containerStyle}>
      <View style={sliderContainerStyle}>
        <SliderComponent
          value={[safeValue]} // @miblanchard expects array format
          onValueChange={handleValueChange}
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          step={step}
          thumbStyle={{
            backgroundColor: colors.white,
            width: 24,
            height: 24,
            borderRadius: 12,
            shadowColor: colors.darkText,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 4,
          }}
          trackStyle={{
            height: 6,
            borderRadius: 3,
            backgroundColor: 'rgba(72, 69, 69, 0.1)',
          }}
          minimumTrackStyle={{
            backgroundColor: stateColor,
            height: 6,
            borderRadius: 3,
          }}
          animateTransitions={true}
          animationType="spring"
        />
      </View>
      {(leftLabel || rightLabel) && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: 8,
          }}
        >
          <Text style={{ color: colors.red, fontSize: 15, fontWeight: '500' }}>
            {leftLabel}
          </Text>
          <Text
            style={{
              color: colors.green,
              fontSize: 15,
              fontWeight: '500',
            }}
          >
            {rightLabel}
          </Text>
        </View>
      )}
    </View>
  );
}

export default Slider;
