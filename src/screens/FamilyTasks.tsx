//* FamilyTasks.tsx

import React from 'react';
import { Text, View } from '../ui';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Button } from 'react-native';
import { NavParams } from '../navigation/types';
import { useFamilyTasks } from '../utilities/tasks/familyTasks';

const FamilyTasks = () => {
  const navigation = useNavigation<NavigationProp<NavParams>>();
  const familyTasks = useFamilyTasks();

  console.log('familyTasks in FamilyTasks', familyTasks);

  const handlePress = () => {
    console.log('Navigating to Landing');
    navigation.navigate('Landing');
  };

  return (
    <View flex centerVH>
      <Text size="medium" color="blue">
        Family Tasks
      </Text>
      <Button title="Back to Landing" onPress={handlePress} />
    </View>
  );
};

export default FamilyTasks;
