// UIText.tsx
import React from 'react';
import { Text, TextProps, StyleProp, TextStyle } from 'react-native';
import { useFontStyles } from './UIUtilities';
import type { FontKey, FontSizeKey } from './UIUtilities';

type UITextProps = TextProps & {
  children?: React.ReactNode;
  italic?: boolean;
  centered?: boolean;
  justified?: boolean;
  rightAlign?: boolean;
  style?: StyleProp<TextStyle>;
  size?: FontSizeKey;
  color?: string;
  font?: FontKey;
};

const UIText = ({
  children,
  italic = false,
  centered = false,
  justified = false,
  rightAlign = false,
  style,
  size = 'small',
  color = 'black',
  font = 'open-6',
  ...props
}: UITextProps) => {
  const fontStyles = useFontStyles(font, size, color, italic);

  return (
    <Text
      allowFontScaling={false}
      style={[
        fontStyles,
        {
          textAlign: justified
            ? 'justify'
            : rightAlign
              ? 'right'
              : centered
                ? 'center'
                : 'left',
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default __DEV__ ? UIText : React.memo(UIText);
