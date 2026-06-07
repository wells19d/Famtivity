//* NavHeader.tsx

import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { setHapticFeedback } from '../hooks/setHapticFeedback';
import { View, Text, Icons } from '.';
import { NavParams } from '../navigation/types';
import hapticFeedback from 'react-native-haptic-feedback';
import { useCoreInfo } from '../utilities/coreInfo';

type ButtonType = 'None' | 'Back' | 'Cancel' | 'Create' | 'Save' | 'Update';

type Props = {
  title?: string;
  createMode?: string;
  leftButton?: ButtonType;
  rightButton?: ButtonType;
  leftAction?: () => void;
  rightAction?: () => void;
};

type ButtonConfig = {
  label: string;
  icon?: React.ReactNode;
  action?: () => void;
};

const NavHeader = ({
  title = '',
  createMode,
  leftButton,
  rightButton,
  leftAction,
  rightAction,
}: Props) => {
  const navigation = useNavigation<NavigationProp<NavParams>>();
  const useHaptics = setHapticFeedback();
  const core = useCoreInfo();

  const resolvedLeftButton: ButtonType = leftButton ?? 'Back';
  const resolvedRightButton: ButtonType =
    rightButton ?? (createMode ? 'Create' : 'None');

  const getButtonConfig = (
    buttonType: ButtonType,
    side: 'left' | 'right',
  ): ButtonConfig | null => {
    switch (buttonType) {
      case 'None':
        return null;

      case 'Back':
        return {
          label: 'Back',
          icon: <Icons.Back size={20} />,
          action: leftAction || (() => navigation.goBack()),
        };

      case 'Cancel':
        return {
          label: 'Cancel',
          action: leftAction || (() => navigation.goBack()),
        };

      case 'Create':
        return {
          label: 'Create',
          icon: (
            <View pl5>
              <Icons.CirclePlus size={20} />
            </View>
          ),
          action:
            rightAction ||
            (() =>
              navigation.navigate('CreateTask', {
                createMode: createMode ?? 'mine',
              })),
        };

      case 'Save':
        return {
          label: 'Save',
          icon: (
            <View pl5>
              <Icons.Check size={20} />
            </View>
          ),
          action: rightAction,
        };

      case 'Update':
        return {
          label: 'Update',
          icon: (
            <View pl5>
              <Icons.Check size={20} />
            </View>
          ),
          action: rightAction,
        };

      default:
        return null;
    }
  };

  const renderButton = (buttonType: ButtonType, side: 'left' | 'right') => {
    const config = getButtonConfig(buttonType, side);

    if (!config) {
      return <View style={styles.side} />;
    }

    const handlePress = () => {
      useHaptics(core?.profile?.userSettings?.hapticStrength || hapticFeedback);
      config.action?.();
    };

    return (
      <TouchableOpacity style={styles.side} onPress={handlePress}>
        <View row centerH style={side === 'right' && styles.rightButton}>
          {side === 'left' && config.icon && <View pr5>{config.icon}</View>}

          <Text size="medium">{config.label}</Text>

          {side === 'right' && config.icon && <View pl5>{config.icon}</View>}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {renderButton(resolvedLeftButton, 'left')}

      <View flex centerH>
        <Text size="medium">{title}</Text>
      </View>

      {renderButton(resolvedRightButton, 'right')}
    </View>
  );
};

export default NavHeader;

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  side: {
    width: 90,
    justifyContent: 'center',
  },

  rightButton: {
    justifyContent: 'flex-end',
  },
});
