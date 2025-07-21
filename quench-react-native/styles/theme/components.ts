import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, typography, spacing, rgba } from './';

export const layouts = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  } as ViewStyle,

  mainContent: {
    flex: 1,
    flexDirection: 'column',
  } as ViewStyle,

  centeredContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.screenHorizontal,
  } as ViewStyle,

  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.navigationSpacing,
    paddingHorizontal: spacing.screenHorizontal,
    paddingTop: spacing.screenTop,
  } as ViewStyle,

  contentSection: {
    gap: spacing.stackSpacing,
    alignItems: 'center',
  } as ViewStyle,

  textGroup: {
    gap: spacing.textGroupSpacing,
    alignItems: 'center',
  } as ViewStyle,
});

export const buttons = StyleSheet.create({
  continueButton: {
    backgroundColor: colors.blueAccent,
    height: spacing.buttonHeight,
    borderRadius: spacing.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.screenHorizontal,
    marginHorizontal: spacing.screenHorizontal,
    marginBottom: spacing.screenBottom,
  } as ViewStyle,

  continueButtonText: {
    ...typography.button,
    color: colors.white,
  } as TextStyle,

  // Back button
  backButton: {
    padding: spacing.sm,
  } as ViewStyle,

  // Disabled state
  disabledButton: {
    backgroundColor: colors.gray,
    opacity: 0.6,
  } as ViewStyle,
});

export const avatars = StyleSheet.create({
  welcome: {
    width: spacing.avatarWelcome,
    height: spacing.avatarWelcome,
  } as ViewStyle,

  other: {
    width: spacing.avatarOther,
    height: spacing.avatarOther,
  } as ViewStyle,
});

export const progress = StyleSheet.create({
  container: {
    flex: 1,
    height: 4,
    backgroundColor: rgba(colors.blueAccent, 0.2),
    borderRadius: 2,
  } as ViewStyle,

  bar: {
    height: '100%',
    backgroundColor: colors.blueAccent,
    borderRadius: 2,
  } as ViewStyle,
});

export const textStyles = StyleSheet.create({
  welcomeHeading: {
    ...typography.welcomeHeading,
    color: colors.darkText,
  } as TextStyle,

  heading: {
    ...typography.heading,
    color: colors.darkText,
  } as TextStyle,

  subtitle: {
    ...typography.subtitle,
    color: colors.lightText,
  } as TextStyle,

  caption: {
    ...typography.caption,
    color: colors.lightText,
  } as TextStyle,
});
