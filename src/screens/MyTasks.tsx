//* MyTasks.tsx

import React from 'react';
import { Text, View } from '../ui';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Button } from 'react-native';
import { NavParams } from '../navigation/types';
import { useMyTasks } from '../utilities/tasks/myTasks';

const MyTasks = () => {
  const navigation = useNavigation<NavigationProp<NavParams>>();
  const myTasks = useMyTasks();
  console.log('myTasks in MyTasks', myTasks);

  const handlePress = () => {
    console.log('Navigating to Landing');
    navigation.navigate('Landing');
  };

  return (
    <View flex centerVH>
      <Text size="medium" color="blue">
        My Tasks
      </Text>
      <Button title="Back to Landing" onPress={handlePress} />
    </View>
  );
};

export default MyTasks;
