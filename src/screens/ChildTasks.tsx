//* ChildTasks.tsx

import React from 'react';
import { Text, View } from '../ui';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Button } from 'react-native';
import { NavParams } from '../navigation/types';
import { useChildTasks } from '../utilities/tasks/childTasks';

const ChildTasks = () => {
  const navigation = useNavigation<NavigationProp<NavParams>>();
  const childTasks = useChildTasks();
  console.log('childTasks in ChildTasks', childTasks);

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
