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
    ...style,
  };

  const labelStyle: TextStyle = {
    fontSize: 13,
    color: colors.lightText,
    fontWeight: '500',
  };

  const sliderRowStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 24,
  };

  const sliderTrackContainerStyle: ViewStyle = {
    flex: 1,
    marginHorizontal: 8,
    height: 24,
    justifyContent: 'center',
  };

  return (
    <View style={containerStyle}>
      {(leftLabel || rightLabel) && (
        <View style={sliderRowStyle}>
          <Text style={[labelStyle, { color: colors.red }]}>{leftLabel}</Text>
          <View style={sliderTrackContainerStyle}>
            <SliderComponent
              value={[safeValue]}
              onValueChange={handleValueChange}
              minimumValue={minimumValue}
              maximumValue={maximumValue}
              step={step}
              thumbStyle={{
                backgroundColor: colors.white,
                width: 20,
                height: 20,
                borderRadius: 10,
                shadowColor: colors.darkText,
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
                elevation: 2,
              }}
              trackStyle={{
                height: 4,
                borderRadius: 2,
                backgroundColor: 'rgba(72, 69, 69, 0.1)',
              }}
              minimumTrackStyle={{
                backgroundColor: stateColor,
                height: 4,
                borderRadius: 2,
              }}
              animateTransitions={true}
              animationType="spring"
            />
          </View>
          <Text style={[labelStyle, { color: colors.green }]}>
            {rightLabel}
          </Text>
        </View>
      )}
    </View>
  );
}

export default Slider;
