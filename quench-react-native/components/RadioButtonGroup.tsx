import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, spacing, typography } from '../styles/theme';

export interface RadioOption {
  id: string;
  label: string;
  description?: string;
}

interface RadioButtonGroupProps {
  options: RadioOption[];
  selectedId?: string;
  onSelect: (id: string) => void;
  style?: ViewStyle;
}

function RadioButtonGroup({
  options,
  selectedId,
  onSelect,
  style,
}: RadioButtonGroupProps) {
  return (
    <View style={[groupContainer, style]}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[optionContainer, selectedId === option.id && selectedOption]}
          onPress={() => onSelect(option.id)}
          activeOpacity={0.7}
        >
          <View style={radioContainer}>
            <View
              style={[
                radioButton,
                selectedId === option.id && selectedRadioButton,
              ]}
            >
              {selectedId === option.id && <View style={radioButtonInner} />}
            </View>
            <View style={textContainer}>
              <Text
                style={[optionLabel, selectedId === option.id && selectedLabel]}
              >
                {option.label}
              </Text>
              {option.description && (
                <Text style={optionDescription}>{option.description}</Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const groupContainer: ViewStyle = {
  gap: spacing.sm,
};

const optionContainer: ViewStyle = {
  backgroundColor: 'transparent',
  borderRadius: spacing.md,
  padding: spacing.lg,
  borderWidth: 1,
  borderColor: `${colors.lightText}33`,
};

const selectedOption: ViewStyle = {
  backgroundColor: `${colors.blueAccent}10`,
  borderColor: colors.blueAccent,
};

const radioContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: spacing.md,
};

const radioButton: ViewStyle = {
  width: 20,
  height: 20,
  borderRadius: 10,
  borderWidth: 2,
  borderColor: colors.lightText,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 2,
};

const selectedRadioButton: ViewStyle = {
  borderColor: colors.blueAccent,
};

const radioButtonInner: ViewStyle = {
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: colors.blueAccent,
};

const textContainer: ViewStyle = {
  flex: 1,
};

const optionLabel: TextStyle = {
  ...typography.subtitle,
  color: colors.darkText,
  fontWeight: '500',
};

const selectedLabel: TextStyle = {
  color: colors.blueAccent,
};

const optionDescription: TextStyle = {
  ...typography.caption,
  color: colors.lightText,
  marginTop: spacing.xs,
};

export default RadioButtonGroup;
