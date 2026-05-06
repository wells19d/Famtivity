//* PendingTasks.tsx

import React from 'react';
import { Text, View } from '../ui';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Button } from 'react-native';
import { NavParams } from '../navigation/types';
import { usePendingTasks } from '../utilities/tasks/pendingTasks';

const PendingTasks = () => {
  const navigation = useNavigation<NavigationProp<NavParams>>();
  const pendingTasks = usePendingTasks();
  console.log('pendingTasks in PendingTasks', pendingTasks);

  const handlePress = () => {
    console.log('Navigating to Landing');
    navigation.navigate('Landing');
  };
  return (
    <View flex centerVH>
      <Text size="medium" color="blue">
        Pending Tasks
      </Text>
      <Button title="Back to Landing" onPress={handlePress} />
    </View>
  );
};

export default PendingTasks;
