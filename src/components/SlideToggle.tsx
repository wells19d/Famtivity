//* SlideToggle.tsx

import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import { Text, View } from '../ui';
import { useColors } from '../ui/UIUtilities';

const options = ['hourly', 'today', 'all'] as const;

type ViewType = (typeof options)[number];

type Props = {
  value: ViewType;
  onChange: (value: ViewType) => void;
};

const SlideToggle = ({ value, onChange }: Props) => {
  const selectedIndex = options.indexOf(value);

  const translateX = useRef(new Animated.Value(selectedIndex * 100)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: selectedIndex * 80,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [selectedIndex, translateX]);

  return (
    <View style={[styles.container, value !== 'all' && { marginBottom: 0 }]}>
      <Animated.View
        style={[
          styles.slider,
          {
            transform: [{ translateX }],
          },
        ]}
      />

      {options.map((option, index) => {
        const active = option === value;

        return (
          <React.Fragment key={option}>
            <Pressable style={styles.button} onPress={() => onChange(option)}>
              <Text
                color={active ? ('white' as any) : ('dark' as any)}
                size="small"
              >
                {option === 'hourly'
                  ? 'Hour'
                  : option === 'today'
                    ? 'Day'
                    : 'All'}
              </Text>
            </Pressable>

            {index < options.length - 1 && <View style={styles.divider} />}
          </React.Fragment>
        );
      })}
    </View>
  );
};

export default SlideToggle;

const styles = StyleSheet.create({
  container: {
    width: 240,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#e5e5e5',
    flexDirection: 'row',
    position: 'relative',
    marginVertical: 8,
    marginBottom: 12,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: useColors('dark50'),
  },
  slider: {
    position: 'absolute',
    width: 70,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    top: 0,
    left: 0,
    margin: 4,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    width: 1,
    height: '70%',
    backgroundColor: useColors('dark50'),
    alignSelf: 'center',
  },
});
