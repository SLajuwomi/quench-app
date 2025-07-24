import { View, Text, TextInput, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, typography } from '../styles/theme';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  suffix?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  style?: ViewStyle;
}

function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  suffix,
  keyboardType = 'default',
  style,
}: InputFieldProps) {
  return (
    <View style={[inputContainer, style]}>
      <Text style={inputLabel}>{label}</Text>
      <View style={inputWrapper}>
        <TextInput
          style={[input, suffix && inputWithSuffix]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.lightText}
          keyboardType={keyboardType}
        />
        {suffix && <Text style={suffixText}>{suffix}</Text>}
      </View>
    </View>
  );
}

const inputContainer: ViewStyle = {
  width: '100%',
};

const inputLabel: TextStyle = {
  ...typography.subtitle,
  color: colors.darkText,
  marginBottom: spacing.sm,
  fontWeight: '500',
};

const inputWrapper: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: colors.white,
  borderRadius: spacing.md,
  borderWidth: 1,
  borderColor: `${colors.lightText}33`,
  paddingHorizontal: spacing.lg,
  height: 50,
};

const input: TextStyle = {
  flex: 1,
  ...typography.subtitle,
  color: colors.darkText,
};

const inputWithSuffix: TextStyle = {
  paddingRight: spacing.sm,
};

const suffixText: TextStyle = {
  ...typography.subtitle,
  color: colors.lightText,
  fontWeight: '500',
};

export default InputField;
