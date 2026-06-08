// UIUtilities.tsx
import { Platform, TextStyle, ViewStyle } from 'react-native';
import { useDeviceInfo } from '../hooks/useHooks';

export type FontKey =
  | 'noto-1'
  | 'noto-2'
  | 'noto-3'
  | 'noto-4'
  | 'noto-5'
  | 'noto-6'
  | 'noto-7'
  | 'noto-8'
  | 'noto-9'
  | 'mont-1'
  | 'mont-2'
  | 'mont-3'
  | 'mont-4'
  | 'mont-5'
  | 'mont-6'
  | 'mont-7'
  | 'mont-8'
  | 'mont-9'
  | 'open-1'
  | 'open-2'
  | 'open-3'
  | 'open-4'
  | 'open-5'
  | 'open-6'
  | 'open-7'
  | 'open-8'
  | 'open-9'
  | 'cherry'
  | 'banana';

export type FontSizeKey =
  | 'micro'
  | 'xTiny'
  | 'tiny'
  | 'xSmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xLarge'
  | 'giant'
  | 'massive'
  | 'gargantuan';

export type ButtonType = 'filled' | 'outline' | 'ghost';
export type ButtonSizeKey =
  | 'macro'
  | 'micro'
  | 'xTiny'
  | 'tiny'
  | 'small'
  | 'medium'
  | 'large'
  | 'xLarge'
  | 'giant'
  | 'massive'
  | 'gargantuan';

export type DeviceSizeKey = 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge';

type FontData = {
  ios: string;
  android?: string;
  androidItalic?: string;
  weight: TextStyle['fontWeight'];
  lineHeightFactor?: number;
};

type DeviceInfoShape = {
  system?: {
    deviceSize?: DeviceSizeKey;
  };
};

export const colorPalette = {
  black: '#000000',
  white: '#ffffff',

  //---
  primary05: '#eef6ff',
  primary10: '#d9e9ff',
  primary20: '#bcdaff',
  primary30: '#8ec3ff',
  primary40: '#59a1ff',
  primary50: '#2977ff',
  primary60: '#1b5cf5',
  primary70: '#1447e1',
  primary80: '#173ab6',
  primary90: '#19358f',
  primary95: '#142257',
  primary: '#2977ff',

  //---
  secondary05: '#f0fdfa',
  secondary10: '#ccfbf1',
  secondary20: '#99f6e4',
  secondary30: '#5eead4',
  secondary40: '#2dd4bf',
  secondary50: '#14b8a6',
  secondary60: '#0d9488',
  secondary70: '#0f766e',
  secondary80: '#115e59',
  secondary90: '#134e4a',
  secondary95: '#042f2e',
  secondary: '#14b8a6',

  //---
  tertiary05: '#eef2ff',
  tertiary10: '#e0e7ff',
  tertiary20: '#c7d2fe',
  tertiary30: '#a5b4fc',
  tertiary40: '#818cf8',
  tertiary50: '#6366f1',
  tertiary60: '#4f46e5',
  tertiary70: '#4338ca',
  tertiary80: '#3730a3',
  tertiary90: '#312e81',
  tertiary95: '#172554',
  tertiary: '#6366f1',

  //---
  dark05: '#263b73',
  dark10: '#1a2b55',
  dark20: '#111d3c',
  dark30: '#0b1328',
  dark40: '#060b18',
  dark50: '#03050a',
  dark60: '#020409',
  dark70: '#020308',
  dark80: '#010206',
  dark90: '#000000',
  dark95: '#000000',
  dark: '#03050a',

  //---
  gray05: '#f7f7f7',
  gray10: '#ededed',
  gray20: '#dfdfdf',
  gray30: '#c8c8c8',
  gray40: '#adadad',
  gray50: '#a1a1a1',
  gray60: '#888888',
  gray70: '#7b7b7b',
  gray80: '#676767',
  gray90: '#545454',
  gray: '#a1a1a1',

  //---
  light05: '#f5f5f6',
  light10: '#e5e6e8',
  light20: '#cdcfd4',
  light30: '#abafb5',
  light40: '#81858f',
  light50: '#6d727d',
  light60: '#575a63',
  light70: '#4a4d54',
  light80: '#424448',
  light90: '#3a3b3f',
  light95: '#363636',
  light: '#6d727d',

  //---
  success05: '#f0fdfa',
  success10: '#dcfce7',
  success20: '#bbf7d0',
  success30: '#86efac',
  success40: '#4ade80',
  success50: '#22d55e',
  success60: '#16a34a',
  success70: '#15803d',
  success80: '#166534',
  success90: '#14532d',
  success95: '#052e14',
  success: '#22c55e',

  //---
  warning05: '#fefce8',
  warning10: '#fef9c3',
  warning20: '#fef08a',
  warning30: '#fde047',
  warning40: '#facc15',
  warning50: '#eab308',
  warning60: '#ca8a04',
  warning70: '#a16207',
  warning80: '#854d0e',
  warning90: '#713f12',
  warning95: '#423306',
  warning: '#eab308',

  //---
  danger05: '#fef2f2',
  danger10: '#fee2e2',
  danger20: '#fecaca',
  danger30: '#fca5a5',
  danger40: '#f87171',
  danger50: '#ef4444',
  danger60: '#dc2626',
  danger70: '#b91c1c',
  danger80: '#991b1b',
  danger90: '#7f1d1d',
  danger95: '#450a0a',
  danger: '#ef4444',

  //---
  info05: '#eff6ff',
  info10: '#dbeafe',
  info20: '#bfebfe',
  info30: '#93c5fc',
  info40: '#60a5f6',
  info50: '#3b82f6',
  info60: '#2563eb',
  info70: '#1d4ed8',
  info80: '#1e40af',
  info90: '#1e3a8a',
  info95: '#172e54',
  info: '#3b82f6',

  //---
  orange10: '#ffc58d',
  orange30: '#f89656',
  orange: '#e5762e',
  orange70: '#bf5612',
  orange90: '#8c3b00',

  //---
  lilac10: '#dbd1ea',
  lilac30: '#beb2d5',
  lilac: '#9483b6',
  lilac70: '#6d5798',
  lilac90: '#4e3c75',

  //---
  basic: '#C4C4C4',
  gold: '#FFAE42',
  transparent: 'transparent',
} as const;

export type ColorPaletteKey = keyof typeof colorPalette;

export type ColorKey = ColorPaletteKey | (string & {});

export const useColors = (color: ColorKey = 'black'): string => {
  if (!color || typeof color !== 'string') return '#000000';

  const normalizedColor = color.trim();

  const paletteColor =
    colorPalette[normalizedColor as ColorPaletteKey] ||
    colorPalette[normalizedColor.toLowerCase() as ColorPaletteKey];

  if (paletteColor) {
    return paletteColor;
  }

  if (
    /^#([0-9A-F]{3}){1,2}$/i.test(color) ||
    color.startsWith('rgb') ||
    /^[a-zA-Z]+$/.test(color)
  ) {
    return color;
  }

  return '#000000';
};

const fontLookup: Record<string, FontData> = {
  // NotoSans mappings
  'noto-1': {
    ios: 'NotoSans',
    android: 'NotoSans-Thin',
    androidItalic: 'NotoSans-ThinItalic',
    weight: '100',
  },
  'noto-2': {
    ios: 'NotoSans',
    android: 'NotoSans-ExtraLight',
    androidItalic: 'NotoSans-ExtraLightItalic',
    weight: '200',
  },
  'noto-3': {
    ios: 'NotoSans',
    android: 'NotoSans-Light',
    androidItalic: 'NotoSans-LightItalic',
    weight: '300',
  },
  'noto-4': {
    ios: 'NotoSans',
    android: 'NotoSans-Regular',
    androidItalic: 'NotoSans-Italic',
    weight: '400',
  },
  'noto-5': {
    ios: 'NotoSans',
    android: 'NotoSans-Medium',
    androidItalic: 'NotoSans-MediumItalic',
    weight: '500',
  },
  'noto-6': {
    ios: 'NotoSans',
    android: 'NotoSans-SemiBold',
    androidItalic: 'NotoSans-SemiBoldItalic',
    weight: '600',
  },
  'noto-7': {
    ios: 'NotoSans',
    android: 'NotoSans-Bold',
    androidItalic: 'NotoSans-BoldItalic',
    weight: '700',
  },
  'noto-8': {
    ios: 'NotoSans',
    android: 'NotoSans-ExtraBold',
    androidItalic: 'NotoSans-ExtraBoldItalic',
    weight: '800',
  },
  'noto-9': {
    ios: 'NotoSans',
    android: 'NotoSans-Black',
    androidItalic: 'NotoSans-BlackItalic',
    weight: '900',
  },

  // Montserrat mappings
  'mont-1': {
    ios: 'Montserrat',
    android: 'Montserrat-Thin',
    androidItalic: 'Montserrat-ThinItalic',
    weight: '100',
  },
  'mont-2': {
    ios: 'Montserrat',
    android: 'Montserrat-ExtraLight',
    androidItalic: 'Montserrat-ExtraLightItalic',
    weight: '200',
  },
  'mont-3': {
    ios: 'Montserrat',
    android: 'Montserrat-Light',
    androidItalic: 'Montserrat-LightItalic',
    weight: '300',
  },
  'mont-4': {
    ios: 'Montserrat',
    android: 'Montserrat-Regular',
    androidItalic: 'Montserrat-Italic',
    weight: '400',
  },
  'mont-5': {
    ios: 'Montserrat',
    android: 'Montserrat-Medium',
    androidItalic: 'Montserrat-MediumItalic',
    weight: '500',
  },
  'mont-6': {
    ios: 'Montserrat',
    android: 'Montserrat-SemiBold',
    androidItalic: 'Montserrat-SemiBoldItalic',
    weight: '600',
  },
  'mont-7': {
    ios: 'Montserrat',
    android: 'Montserrat-Bold',
    androidItalic: 'Montserrat-BoldItalic',
    weight: '700',
  },
  'mont-8': {
    ios: 'Montserrat',
    android: 'Montserrat-ExtraBold',
    androidItalic: 'Montserrat-ExtraBoldItalic',
    weight: '800',
  },
  'mont-9': {
    ios: 'Montserrat',
    android: 'Montserrat-Black',
    androidItalic: 'Montserrat-BlackItalic',
    weight: '900',
  },

  // OpenSans mappings
  'open-1': {
    ios: 'OpenSans',
    android: 'OpenSans-Light',
    androidItalic: 'OpenSans-LightItalic',
    weight: '100',
  },
  'open-2': {
    ios: 'OpenSans',
    android: 'OpenSans-Light',
    androidItalic: 'OpenSans-LightItalic',
    weight: '200',
  },
  'open-3': {
    ios: 'OpenSans',
    android: 'OpenSans-Light',
    androidItalic: 'OpenSans-LightItalic',
    weight: '300',
  },
  'open-4': {
    ios: 'OpenSans',
    android: 'OpenSans-Regular',
    androidItalic: 'OpenSans-Italic',
    weight: '400',
  },
  'open-5': {
    ios: 'OpenSans',
    android: 'OpenSans-Medium',
    androidItalic: 'OpenSans-MediumItalic',
    weight: '500',
  },
  'open-6': {
    ios: 'OpenSans',
    android: 'OpenSans-SemiBold',
    androidItalic: 'OpenSans-SemiBoldItalic',
    weight: '600',
  },
  'open-7': {
    ios: 'OpenSans',
    android: 'OpenSans-Bold',
    androidItalic: 'OpenSans-BoldItalic',
    weight: '700',
  },
  'open-8': {
    ios: 'OpenSans',
    android: 'OpenSans-ExtraBold',
    androidItalic: 'OpenSans-ExtraBoldItalic',
    weight: '800',
  },
  'open-9': {
    ios: 'OpenSans',
    android: 'OpenSans-ExtraBold',
    androidItalic: 'OpenSans-ExtraBoldItalic',
    weight: '900',
  },

  // Special cases
  cherry: {
    ios: 'CherryBlossom',
    android: 'Cherry-Blossom',
    weight: '500',
  },
  banana: {
    ios: 'BananaChips-Regular',
    android: 'BananaChips-Regular',
    weight: '500',
    lineHeightFactor: 0.8,
  },
  ios: {
    ios: 'SF Pro Text',
    android: 'SF Pro Text',
    weight: '400',
  },
};

const DEFAULT_FONT: FontKey = 'open-5';

export const useFonts = (
  font: FontKey = DEFAULT_FONT,
  italic: boolean = false,
): TextStyle => {
  const normalizedFont = font.trim().toLowerCase();
  const fontData = fontLookup[normalizedFont] || fontLookup[DEFAULT_FONT];

  if (Platform.OS === 'ios') {
    return {
      fontFamily: fontData.ios,
      fontWeight: fontData.weight,
      fontStyle: italic ? 'italic' : 'normal',
    };
  }

  return {
    fontFamily:
      italic && fontData.androidItalic
        ? fontData.androidItalic
        : fontData.android,
  };
};

export const useFontSizes = (
  size: FontSizeKey = 'medium',
  font: string = 'OpenSans',
): TextStyle => {
  const device = useDeviceInfo() as DeviceInfoShape | null;

  const getSizes = (deviceSize: DeviceSizeKey) => {
    const factorMap: Record<DeviceSizeKey, number> = {
      xSmall: 0.875,
      small: 0.9,
      medium: 0.925,
      large: 0.975,
      xLarge: 1,
    };

    const factor = factorMap[deviceSize] || 1;

    return {
      micro: 8 * factor,
      xTiny: 10 * factor,
      tiny: 12 * factor,
      xSmall: 14 * factor,
      small: 16 * factor,
      medium: 18 * factor,
      large: 20 * factor,
      xLarge: 24 * factor,
      giant: 28 * factor,
      massive: 36 * factor,
      gargantuan: 48 * factor,
    };
  };

  const deviceSize = device?.system?.deviceSize || 'xLarge';
  const sizes = getSizes(deviceSize);

  const fontScale: Record<string, number> = {
    cherry: 1.1,
    banana: 2,
  };

  const baseSize = sizes[size] || sizes.medium;
  const scaleFactor = fontScale[font.toLowerCase()] || 1;

  return { fontSize: baseSize * scaleFactor };
};

export const useFontStyles = (
  font: FontKey = 'open-5',
  size: FontSizeKey = 'medium',
  color: ColorKey = 'black',
  italic: boolean = false,
): TextStyle => {
  return {
    ...useFonts(font, italic),
    ...useFontSizes(size, font),
    color: useColors(color),
  };
};

export const useButtonStyles = (
  type: ButtonType = 'filled',
  color: ColorKey = 'primary',
): ViewStyle => {
  const statusColor = useColors(color);

  const styles: Record<ButtonType, ViewStyle> = {
    filled: {
      backgroundColor: statusColor,
      elevation: 4,
      shadowColor: '#373d43',
      shadowOffset: { width: 0.5, height: 1 },
      shadowOpacity: 0.3,
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: statusColor,
      borderWidth: 2,
    },
    ghost: {
      backgroundColor: 'transparent',
    },
  };

  return styles[type] || styles.filled;
};

export const useButtonSizes = (size: ButtonSizeKey = 'medium'): ViewStyle => {
  const sizes: Record<ButtonSizeKey, number> = {
    macro: 15,
    micro: 20,
    xTiny: 25,
    tiny: 30,
    small: 35,
    medium: 40,
    large: 50,
    xLarge: 60,
    giant: 70,
    massive: 80,
    gargantuan: 90,
  };

  return {
    height: sizes[size] ?? sizes.medium,
    paddingHorizontal: 12,
  };
};
