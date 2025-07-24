import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, typography } from '../styles/theme';

interface CardProps {
  title: string;
  description?: string;
  icon?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
}

function Card({ title, description, icon, children, style }: CardProps) {
  return (
    <View style={[cardContainer, style]}>
      {icon && <Text style={cardIcon}>{icon}</Text>}
      <Text style={cardTitle}>{title}</Text>
      {description && <Text style={cardDescription}>{description}</Text>}
      {children}
    </View>
  );
}

const cardContainer: ViewStyle = {
  backgroundColor: colors.white,
  borderRadius: spacing.md,
  padding: spacing.lg,
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: colors.darkText,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 4,
  minHeight: 120,
};

const cardIcon: TextStyle = {
  fontSize: 32,
  marginBottom: spacing.sm,
};

const cardTitle: TextStyle = {
  ...typography.subtitle,
  color: colors.darkText,
  fontWeight: '600',
  textAlign: 'center',
  marginBottom: spacing.xs,
};

const cardDescription: TextStyle = {
  ...typography.caption,
  color: colors.lightText,
  textAlign: 'center',
  lineHeight: 18,
};

export default Card;
