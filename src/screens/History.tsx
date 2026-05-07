//* History.tsx

import React from 'react';
import { Text, View } from '../ui';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Button } from 'react-native';
import { NavParams } from '../navigation/types';
import { useTaskManager } from '../utilities/tasks/taskManager';

const History = () => {
  const navigation = useNavigation<NavigationProp<NavParams>>();
  const { historyTasks } = useTaskManager();
  console.log('historyTasks in History', historyTasks);

  const handlePress = () => {
    console.log('Navigating to Landing');
    navigation.navigate('Landing');
  };
  return (
    <View flex centerVH>
      <Text size="medium" color="blue">
        History
      </Text>
      <Button title="Back to Landing" onPress={handlePress} />
    </View>
  );
};

export default History;
