//* ChildTasks.tsx

import React from 'react';
import { Text, View, Icons } from '../ui';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useTestData } from '../../z-sandbox/useTestData';
import { Button } from 'react-native';
import { NavParams } from '../navigation/types';

const ChildTasks = () => {
  const navigation = useNavigation<NavigationProp<NavParams>>();

  const handlePress = () => {
    console.log('Navigating to Landing');
    navigation.navigate('Landing');
  };
  return (
    <View flex centerVH>
      <Text size="medium" color="blue">
        Child Tasks
      </Text>
      <Button title="Back to Landing" onPress={handlePress} />
    </View>
  );
};

export default ChildTasks;
