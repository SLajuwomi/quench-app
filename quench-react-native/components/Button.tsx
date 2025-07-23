import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import { buttons } from '../styles/theme/components';
import { colors } from '../styles/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'disabled';
export type ButtonSize = 'large' | 'medium' | 'small';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'large',
  disabled = false,
  style,
  textStyle,
}: ButtonProps) => {
  const buttonStyle = [
    getButtonStyle(variant, size),
    disabled && buttons.disabledButton,
    style,
  ];

  const buttonTextStyle = [getButtonTextStyle(variant), textStyle];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={buttonTextStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const getButtonStyle = (
  variant: ButtonVariant,
  size: ButtonSize
): ViewStyle => {
  const baseStyle: ViewStyle = {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  };

  const sizeStyles: Record<ButtonSize, ViewStyle> = {
    large: {
      height: 50,
      paddingHorizontal: 20,
    },
    medium: {
      height: 40,
      paddingHorizontal: 16,
    },
    small: {
      height: 32,
      paddingHorizontal: 12,
    },
  };

  const variantStyles: Record<ButtonVariant, ViewStyle> = {
    primary: {
      backgroundColor: colors.blueAccent,
    },
    secondary: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.blueAccent,
    },
    disabled: {
      backgroundColor: colors.gray,
      opacity: 0.6,
    },
  };

  return {
    ...baseStyle,
    ...sizeStyles[size],
    ...variantStyles[variant],
  };
};

const getButtonTextStyle = (variant: ButtonVariant): TextStyle => {
  const baseTextStyle: TextStyle = {
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'center',
  };

  const variantTextStyles: Record<ButtonVariant, TextStyle> = {
    primary: {
      color: colors.white,
    },
    secondary: {
      color: colors.blueAccent,
    },
    disabled: {
      color: colors.lightText,
    },
  };

  return {
    ...baseTextStyle,
    ...variantTextStyles[variant],
  };
};

export default Button;
