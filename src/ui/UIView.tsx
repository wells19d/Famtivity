// UIView.tsx

import React, { useMemo } from 'react';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';

type UIViewProps = ViewProps & {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
} & Record<string, any>;

const spacingKeys = [
  'm',
  'ml',
  'mr',
  'mt',
  'mb',
  'mh',
  'mv',
  'p',
  'pl',
  'pr',
  'pt',
  'pb',
  'ph',
  'pv',
] as const;

const spacingValues = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50] as const;

const getSpacingProps = (props: Record<string, any>) => {
  const result: Partial<Record<(typeof spacingKeys)[number], number>> = {};

  spacingKeys.forEach(key => {
    spacingValues.forEach(value => {
      const propName = `${key}${value}`;
      if (props[propName]) {
        result[key] = value;
      }
    });
  });

  return result;
};

type SpacingValue = (typeof spacingValues)[number];

const parseSpacing = (prop: number | SpacingValue | undefined) => {
  if (typeof prop === 'number') return prop;

  if (prop !== undefined && spacingValues.includes(prop as SpacingValue)) {
    return prop;
  }

  return undefined;
};

const UIView = ({
  row,
  column,
  flex,
  centerV = false,
  centerH = false,
  centerVH = false,
  rightAlign = false,
  bottomAlign = false,
  topAlign = false,
  border = false,
  borderWidth = 0,
  borderBottomWidth = 0,
  borderTopWidth = 0,
  borderColor = 'black',

  // Margin and padding (numeric or shorthand)
  m,
  ml,
  mr,
  mt,
  mb,
  mh,
  mv,
  p,
  pl,
  pr,
  pt,
  pb,
  ph,
  pv,

  style,
  children,
  ...props
}: UIViewProps) => {
  const shorthand = getSpacingProps(props);

  const computedStyle = useMemo(() => {
    const s: ViewStyle = {};

    if (row) s.flexDirection = 'row';
    if (column) s.flexDirection = 'column';
    if (flex !== undefined) s.flex = flex === true ? 1 : flex;
    if (border) s.borderWidth = 1;
    if (borderWidth) s.borderWidth = borderWidth;
    if (borderBottomWidth !== 0) {
      s.borderBottomWidth = borderBottomWidth;
      s.borderWidth = 0;
    }
    if (borderTopWidth !== 0) {
      s.borderTopWidth = borderTopWidth;
      s.borderWidth = 0;
    }
    if (borderColor) s.borderColor = borderColor;

    if (centerVH) {
      s.justifyContent = 'center';
      s.alignItems = 'center';
    } else {
      if (centerV) s.justifyContent = 'center';
      if (centerH) {
        s.alignItems = 'center';
        s.alignContent = 'center';
      }
    }

    if (rightAlign) {
      s.alignItems = 'flex-end';
      s.alignContent = 'flex-end';
    }

    if (bottomAlign) {
      s.justifyContent = 'flex-end';
    }

    if (topAlign) {
      s.justifyContent = 'flex-start';
    }

    // Merge explicit + shorthand spacing
    const final = {
      m: m ?? shorthand.m,
      ml: ml ?? shorthand.ml,
      mr: mr ?? shorthand.mr,
      mt: mt ?? shorthand.mt,
      mb: mb ?? shorthand.mb,
      mh: mh ?? shorthand.mh,
      mv: mv ?? shorthand.mv,
      p: p ?? shorthand.p,
      pl: pl ?? shorthand.pl,
      pr: pr ?? shorthand.pr,
      pt: pt ?? shorthand.pt,
      pb: pb ?? shorthand.pb,
      ph: ph ?? shorthand.ph,
      pv: pv ?? shorthand.pv,
    };

    // Margin
    if (final.m !== undefined) s.margin = parseSpacing(final.m);
    if (final.ml !== undefined) s.marginLeft = parseSpacing(final.ml);
    if (final.mr !== undefined) s.marginRight = parseSpacing(final.mr);
    if (final.mt !== undefined) s.marginTop = parseSpacing(final.mt);
    if (final.mb !== undefined) s.marginBottom = parseSpacing(final.mb);
    if (final.mh !== undefined) {
      s.marginLeft = parseSpacing(final.mh);
      s.marginRight = parseSpacing(final.mh);
    }
    if (final.mv !== undefined) {
      s.marginTop = parseSpacing(final.mv);
      s.marginBottom = parseSpacing(final.mv);
    }

    // Padding
    if (final.p !== undefined) s.padding = parseSpacing(final.p);
    if (final.pl !== undefined) s.paddingLeft = parseSpacing(final.pl);
    if (final.pr !== undefined) s.paddingRight = parseSpacing(final.pr);
    if (final.pt !== undefined) s.paddingTop = parseSpacing(final.pt);
    if (final.pb !== undefined) s.paddingBottom = parseSpacing(final.pb);
    if (final.ph !== undefined) {
      s.paddingLeft = parseSpacing(final.ph);
      s.paddingRight = parseSpacing(final.ph);
    }
    if (final.pv !== undefined) {
      s.paddingTop = parseSpacing(final.pv);
      s.paddingBottom = parseSpacing(final.pv);
    }

    return s;
  }, [
    row,
    column,
    flex,
    centerV,
    centerH,
    centerVH,
    rightAlign,
    m,
    ml,
    mr,
    mt,
    mb,
    mh,
    mv,
    p,
    pl,
    pr,
    pt,
    pb,
    ph,
    pv,
    props,
  ]);

  return (
    <View style={[computedStyle, style]} {...props}>
      {children}
    </View>
  );
};

export default UIView;
