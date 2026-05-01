import React, { useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollViewProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

type UIScrollViewProps = ScrollViewProps & {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  noBar?: boolean;
  hideBar?: boolean;
};

const UIScrollView = ({
  children,
  style,
  noBar = false,
  hideBar = false,
  contentContainerStyle,
  onScroll,
  ...props
}: UIScrollViewProps) => {
  const [scrollBarHeight, setScrollBarHeight] = useState(0);
  const [scrollBarTop, setScrollBarTop] = useState(0);
  const [layoutHeight, setLayoutHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (layoutHeight > 0 && contentHeight > layoutHeight) {
      const visibleRatio = layoutHeight / contentHeight;
      const calculatedHeight = layoutHeight * visibleRatio;
      const minHeight = 30;

      setScrollBarHeight(Math.max(calculatedHeight, minHeight));
      setScrollBarTop(0);
    } else {
      setScrollBarHeight(0);
      setScrollBarTop(0);
    }
  }, [layoutHeight, contentHeight]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    const scrollableHeight = contentSize.height - layoutMeasurement.height;

    if (scrollableHeight <= 0) {
      setScrollBarTop(0);
      return;
    }

    const scrollRatio = contentOffset.y / scrollableHeight;
    const calculatedTop =
      scrollRatio * (layoutMeasurement.height - scrollBarHeight);

    setScrollBarTop(calculatedTop);
  };

  const containerStyle: ViewStyle = {
    flex: 1,
    position: 'relative',
    // marginHorizontal: hideBar ? 0 : 0,
    // paddingHorizontal: hideBar ? 0 : 0,
    marginLeft: hideBar ? 2 : 3,
    marginRight: hideBar ? 2 : 2,
    paddingLeft: hideBar ? 0 : 0,
    paddingRight: hideBar ? 0 : 8,
  };

  const scrollContentStyle: ViewStyle = {
    flexGrow: 1,
    paddingRight: hideBar ? 0 : 0,
    paddingTop: hideBar ? 0 : 0,
    paddingBottom: hideBar ? 0 : 0,
  };

  return (
    <View style={[containerStyle, style]}>
      <ScrollView
        ref={scrollViewRef}
        onScroll={event => {
          handleScroll(event);
          onScroll?.(event);
        }}
        onLayout={event => {
          setLayoutHeight(event.nativeEvent.layout.height);
          props.onLayout?.(event);
        }}
        onContentSizeChange={(width, height) => {
          setContentHeight(height);
          props.onContentSizeChange?.(width, height);
        }}
        scrollEventThrottle={16}
        contentContainerStyle={[
          noBar ? styles.noBarContent : scrollContentStyle,
          contentContainerStyle,
        ]}
        showsVerticalScrollIndicator={false}
        {...props}
      >
        {children}
      </ScrollView>

      {!hideBar && scrollBarHeight > 0 && (
        <View style={styles.scrollBar}>
          <View
            style={[
              styles.scrollBarThumb,
              {
                height: scrollBarHeight,
                top: scrollBarTop,
              },
            ]}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  noBarContent: {
    flex: 1,
  },

  scrollBar: {
    position: 'absolute',
    right: 2,
    top: 2,
    bottom: 2,
    width: 4,
    backgroundColor: 'transparent',
    borderRadius: 2,
  },

  scrollBarThumb: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#373d4380',
    borderRadius: 3,
  },
});

export default UIScrollView;
