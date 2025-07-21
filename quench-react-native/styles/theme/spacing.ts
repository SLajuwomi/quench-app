export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,

  stackSpacing: 24,
  navigationSpacing: 16,
  textGroupSpacing: 12,

  screenHorizontal: 20,
  screenTop: 20,
  screenBottom: 34,

  buttonHeight: 50,
  progressBarScale: 0.8,
  borderRadius: 12,

  avatarWelcome: 180,
  avatarOther: 120,
} as const;

export const margin = {
  horizontal: (value: number) => ({ marginHorizontal: value }),
  vertical: (value: number) => ({ marginVertical: value }),
  top: (value: number) => ({ marginTop: value }),
  bottom: (value: number) => ({ marginBottom: value }),
  left: (value: number) => ({ marginLeft: value }),
  right: (value: number) => ({ marginRight: value }),
};

export const padding = {
  horizontal: (value: number) => ({ paddingHorizontal: value }),
  vertical: (value: number) => ({ paddingVertical: value }),
  top: (value: number) => ({ paddingTop: value }),
  bottom: (value: number) => ({ paddingBottom: value }),
  left: (value: number) => ({ paddingLeft: value }),
  right: (value: number) => ({ paddingRight: value }),
};

// Usage examples:
// import { spacing, margin, padding } from './spacing';

// <View style={[spacing.screenHorizontal, spacing.screenTop]}>
// <View style={[margin.horizontal(20), margin.top(20)]}>
// <View style={[padding.horizontal(20), padding.top(20)]}>

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: spacing.screenHorizontal,
//     paddingTop: spacing.screenTop,
//   },
// });
