//* UnclaimedTasks.tsx

import React from 'react';
import { Text, View } from '../ui';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Button } from 'react-native';
import { NavParams } from '../navigation/types';
import { useTaskManager } from '../utilities/tasks/taskManager';

const UnclaimedTasks = () => {
  const navigation = useNavigation<NavigationProp<NavParams>>();
  const { unclaimedTasks } = useTaskManager();
  console.log('unclaimedTasks in UnclaimedTasks', unclaimedTasks);

  const handlePress = () => {
    console.log('Navigating to Landing');
    navigation.navigate('Landing');
  };
  return (
    <View flex centerVH>
      <Text size="medium" color="blue">
        Unclaimed Tasks
      </Text>
      <Button title="Back to Landing" onPress={handlePress} />
    </View>
  );
};

export default UnclaimedTasks;
