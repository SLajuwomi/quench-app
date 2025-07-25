import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../styles/theme';

export interface RadioOption {
  id: string;
  label: string;
  description?: string;
}

interface RadioButtonGroupProps {
  options: RadioOption[];
  /**
   * Array of selected option IDs for multi-select. If you want single-select, pass an array with one item.
   */
  selectedIds?: string[];
  onSelect: (id: string) => void;
  style?: ViewStyle;
}

function RadioButtonGroup({
  options,
  selectedIds,
  onSelect,
  style,
}: RadioButtonGroupProps) {
  return (
    <View style={[groupContainer, style]}>
      {options.map((option) => {
        const isSelected = selectedIds?.includes(option.id);
        return (
          <TouchableOpacity
            key={option.id}
            style={[
              optionContainer,
              isSelected ? selectedOption : unselectedOption,
            ]}
            onPress={() => onSelect(option.id)}
            activeOpacity={0.7}
          >
            <View style={radioRow}>
              <View style={textContainer}>
                <Text
                  style={[
                    optionLabel,
                    isSelected ? selectedLabel : unselectedLabel,
                  ]}
                >
                  {option.label}
                </Text>
                {option.description && (
                  <Text style={optionDescription}>{option.description}</Text>
                )}
              </View>
              <View style={radioIconContainer}>
                {isSelected ? (
                  <View style={selectedRadioOuter}>
                    <Ionicons
                      name="checkmark"
                      size={18}
                      color={colors.blueAccent}
                      style={{ alignSelf: 'center' }}
                    />
                  </View>
                ) : (
                  <View style={unselectedRadioOuter} />
                )}
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const groupContainer: ViewStyle = {
  gap: spacing.sm,
};

const optionContainer: ViewStyle = {
  borderRadius: spacing.md,
  paddingVertical: spacing.lg,
  paddingHorizontal: spacing.lg,
  flexDirection: 'row',
  alignItems: 'center',
  minWidth: '95%',
};

const selectedOption: ViewStyle = {
  backgroundColor: colors.blueAccent,
  borderWidth: 0,
};

const unselectedOption: ViewStyle = {
  backgroundColor: 'transparent',
  borderWidth: 1,
  borderColor: `${colors.lightText}33`,
};

const radioRow: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
};

const textContainer: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
};

const optionLabel: TextStyle = {
  ...typography.subtitle,
  fontWeight: '500',
};

const selectedLabel: TextStyle = {
  color: colors.white,
  fontWeight: '600',
};

const unselectedLabel: TextStyle = {
  color: colors.darkText,
  fontWeight: '500',
};

const optionDescription: TextStyle = {
  ...typography.caption,
  color: colors.lightText,
  marginTop: spacing.xs,
};

const radioIconContainer: ViewStyle = {
  marginLeft: spacing.lg,
  justifyContent: 'center',
  alignItems: 'center',
};

const selectedRadioOuter: ViewStyle = {
  width: 24,
  height: 24,
  borderRadius: 12,
  backgroundColor: colors.white,
  justifyContent: 'center',
  alignItems: 'center',
};

const unselectedRadioOuter: ViewStyle = {
  width: 24,
  height: 24,
  borderRadius: 12,
  borderWidth: 2,
  borderColor: colors.lightText,
  backgroundColor: 'transparent',
};

export default RadioButtonGroup;
